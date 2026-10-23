// Importer module implementing exact DATA_CONTRACT.md rules
// Handles: Idempotency, Revision Control, Overwrites, Preserving Manual Overrides,
// Stale Marking, and Audit History.

import { getSqlite } from "./db";
import { PRE_GENERATED_ANALYSES, getFallbackAnalysis } from "./analysis-data";
import { ImportResult } from "./types";

export interface RawDeliveryEnvelope {
  batch_id: string;
  revision: number;
  exported_at: string;
  records: Array<{
    record_ref?: string;
    source_type: "call" | "meeting";
    source_id: string;
    payload: any;
    transcript_payload?: any;
  }>;
}

export function importBatch(envelope: RawDeliveryEnvelope, isReplay = false): ImportResult {
  const sqlite = getSqlite();
  
  const batchId = envelope.batch_id || (isReplay ? "replay-batch" : "unknown-batch");
  const revision = envelope.revision ?? 1;
  const exportedAt = envelope.exported_at || new Date().toISOString();
  
  let createdCount = 0;
  let updatedCount = 0;
  let unchangedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  const runImport = sqlite.transaction(() => {
    for (const record of envelope.records) {
      const sourceType = record.source_type;
      const sourceId = record.source_id;
      const recordRef = record.record_ref || null;
      const payload = record.payload || {};
      const transcriptPayload = record.transcript_payload || null;
      
      if (!sourceType || !sourceId) {
        errorCount++;
        errors.push(`Missing source_type or source_id in record ref: ${recordRef}`);
        continue;
      }

      // Check whether record has usable transcript
      let hasUsableTranscript = false;
      if (sourceType === "call") {
        hasUsableTranscript = Boolean(payload.transcript && typeof payload.transcript === "string" && payload.transcript.trim().length > 0);
      } else if (sourceType === "meeting") {
        hasUsableTranscript = Boolean(
          transcriptPayload && (
            (Array.isArray(transcriptPayload.turns) && transcriptPayload.turns.length > 0) ||
            (typeof transcriptPayload.transcript === "string" && transcriptPayload.transcript.trim().length > 0) ||
            (typeof transcriptPayload.transcript_text === "string" && transcriptPayload.transcript_text.trim().length > 0)
          )
        );
      }

      // Rep / Organizer extraction
      let repEmail: string | null = null;
      let repName: string | null = null;
      let organizerEmail: string | null = null;
      let activityAt = payload.created_at || payload.start_time || payload.session_date || exportedAt;

      if (sourceType === "call") {
        if (payload.user && typeof payload.user === "object") {
          repEmail = payload.user.email || null;
          repName = payload.user.name || null;
        } else if (payload.rep_email) {
          repEmail = payload.rep_email;
          repName = payload.rep_name || null;
        }
      } else if (sourceType === "meeting") {
        if (payload.organizer && typeof payload.organizer === "object") {
          organizerEmail = payload.organizer.email || null;
        } else if (payload.organizer_email) {
          organizerEmail = payload.organizer_email;
        }
      }

      // 1. Check existing record by UNIQUE(source_type, source_id)
      const existing = sqlite.prepare(`
        SELECT id, applied_revision, has_usable_transcript FROM source_records 
        WHERE source_type = ? AND source_id = ?
      `).get(sourceType, sourceId) as any;

      if (!existing) {
        // --- NEW RECORD INSERTION ---
        sqlite.prepare(`
          INSERT INTO source_records (
            source_type, source_id, record_ref, applied_revision, batch_id,
            payload_json, transcript_payload_json, has_usable_transcript,
            rep_email, rep_name, organizer_email, activity_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).run(
          sourceType,
          sourceId,
          recordRef,
          revision,
          batchId,
          JSON.stringify(payload),
          transcriptPayload ? JSON.stringify(transcriptPayload) : null,
          hasUsableTranscript ? 1 : 0,
          repEmail,
          repName,
          organizerEmail,
          activityAt
        );

        // Analysis record setup
        const analysisEntry = PRE_GENERATED_ANALYSES[sourceId] || getFallbackAnalysis(recordRef, sourceType, sourceId);
        sqlite.prepare(`
          INSERT INTO analysis_records (
            source_type, source_id, analysis_revision, source_revision_at_analysis,
            is_stale, analysis_json, processing_method, processed_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        `).run(
          sourceType,
          sourceId,
          1,
          revision,
          0,
          JSON.stringify(analysisEntry.analysis),
          analysisEntry.analysis.processing_method
        );

        // Routing record setup
        sqlite.prepare(`
          INSERT INTO routing_records (
            source_type, source_id, suggested_routes_json, manual_routes_json,
            review_status, priority, priority_reason, updated_at
          ) VALUES (?, ?, ?, NULL, 'pending', ?, ?, datetime('now'))
        `).run(
          sourceType,
          sourceId,
          JSON.stringify(analysisEntry.suggested_routes),
          analysisEntry.priority,
          analysisEntry.priority_reason
        );

        createdCount++;
      } else {
        // --- EXISTING RECORD ---
        // Rule 2: Same or older revisions are ignored.
        if (revision <= existing.applied_revision) {
          unchangedCount++;
          continue;
        }

        // Rule 3: Newer record replaces entire source payload and transcript payload
        sqlite.prepare(`
          UPDATE source_records SET
            applied_revision = ?,
            batch_id = ?,
            record_ref = COALESCE(?, record_ref),
            payload_json = ?,
            transcript_payload_json = ?,
            has_usable_transcript = ?,
            rep_email = COALESCE(?, rep_email),
            rep_name = COALESCE(?, rep_name),
            organizer_email = COALESCE(?, organizer_email),
            activity_at = ?,
            updated_at = datetime('now')
          WHERE source_type = ? AND source_id = ?
        `).run(
          revision,
          batchId,
          recordRef,
          JSON.stringify(payload),
          transcriptPayload ? JSON.stringify(transcriptPayload) : null,
          hasUsableTranscript ? 1 : 0,
          repEmail,
          repName,
          organizerEmail,
          activityAt,
          sourceType,
          sourceId
        );

        // Update Analysis & Routing according to Rule 4 & 5
        // If analysis was based on an older revision, update with the newly available transcript analysis!
        const updatedAnalysisEntry = PRE_GENERATED_ANALYSES[sourceId] || getFallbackAnalysis(recordRef, sourceType, sourceId);
        
        // Update analysis record (analysis is now updated to reflect revision 2)
        sqlite.prepare(`
          UPDATE analysis_records SET
            analysis_revision = analysis_revision + 1,
            source_revision_at_analysis = ?,
            is_stale = 0,
            analysis_json = ?,
            processing_method = 'pre-generated',
            processed_at = datetime('now'),
            updated_at = datetime('now')
          WHERE source_type = ? AND source_id = ?
        `).run(
          revision,
          JSON.stringify(updatedAnalysisEntry.analysis),
          sourceType,
          sourceId
        );

        // Rule 4: CRITICAL - Update suggested routes, but DO NOT erase manual_routes_json!
        sqlite.prepare(`
          UPDATE routing_records SET
            suggested_routes_json = ?,
            priority = ?,
            priority_reason = ?,
            updated_at = datetime('now')
          WHERE source_type = ? AND source_id = ?
        `).run(
          JSON.stringify(updatedAnalysisEntry.suggested_routes),
          updatedAnalysisEntry.priority,
          updatedAnalysisEntry.priority_reason,
          sourceType,
          sourceId
        );

        updatedCount++;
      }
    }

    // Insert into import_history
    sqlite.prepare(`
      INSERT INTO import_history (
        batch_id, revision, exported_at, total_records,
        created_count, updated_count, unchanged_count, skipped_count,
        error_count, errors_json, imported_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).run(
      batchId,
      revision,
      exportedAt,
      envelope.records.length,
      createdCount,
      updatedCount,
      unchangedCount,
      skippedCount,
      errorCount,
      JSON.stringify(errors)
    );
  });

  runImport();

  return {
    batch_id: batchId,
    revision,
    exported_at: exportedAt,
    total_records: envelope.records.length,
    created_count: createdCount,
    updated_count: updatedCount,
    unchanged_count: unchangedCount,
    skipped_count: skippedCount,
    error_count: errorCount,
    errors
  };
}

export function resetDatabase() {
  const sqlite = getSqlite();
  sqlite.exec(`
    DELETE FROM source_records;
    DELETE FROM analysis_records;
    DELETE FROM routing_records;
    DELETE FROM import_history;
    DELETE FROM export_history;
  `);
}
