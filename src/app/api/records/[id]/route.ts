import { NextRequest, NextResponse } from "next/server";
import { getSqlite } from "@/lib/db";
import { RouteItem } from "@/lib/types";

// dynamic handled by Next.js

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sqlite = getSqlite();

    // id can be source_id or record_ref
    const rec = sqlite.prepare(`
      SELECT 
        s.*,
        r.suggested_routes_json,
        r.manual_routes_json,
        r.manual_override_note,
        r.manual_override_at,
        r.review_status,
        r.reviewed_at,
        r.priority,
        r.priority_reason,
        a.analysis_json,
        a.is_stale,
        a.processing_method,
        a.analysis_revision,
        a.source_revision_at_analysis,
        a.processed_at
      FROM source_records s
      LEFT JOIN routing_records r ON s.source_type = r.source_type AND s.source_id = r.source_id
      LEFT JOIN analysis_records a ON s.source_type = a.source_type AND s.source_id = a.source_id
      WHERE s.source_id = ? OR s.record_ref = ?
    `).get(id, id) as any;

    if (!rec) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    let payload = {};
    let transcriptPayload = null;
    let suggestedRoutes: RouteItem[] = [];
    let manualRoutes: RouteItem[] | null = null;
    let analysis = {};

    try { payload = JSON.parse(rec.payload_json || "{}"); } catch (e) {}
    try { transcriptPayload = rec.transcript_payload_json ? JSON.parse(rec.transcript_payload_json) : null; } catch (e) {}
    try { suggestedRoutes = JSON.parse(rec.suggested_routes_json || "[]"); } catch (e) {}
    if (rec.manual_routes_json) {
      try { manualRoutes = JSON.parse(rec.manual_routes_json); } catch (e) {}
    }
    try { analysis = JSON.parse(rec.analysis_json || "{}"); } catch (e) {}

    return NextResponse.json({
      id: rec.id,
      source_type: rec.source_type,
      source_id: rec.source_id,
      record_ref: rec.record_ref,
      applied_revision: rec.applied_revision,
      batch_id: rec.batch_id,
      has_usable_transcript: Boolean(rec.has_usable_transcript),
      rep_email: rec.rep_email,
      rep_name: rec.rep_name,
      organizer_email: rec.organizer_email,
      activity_at: rec.activity_at,
      created_at: rec.created_at,
      updated_at: rec.updated_at,
      payload,
      transcript_payload: transcriptPayload,
      routing: {
        suggested_routes: suggestedRoutes,
        manual_routes: manualRoutes,
        effective_routes: manualRoutes || suggestedRoutes,
        is_manually_overridden: Boolean(rec.manual_routes_json),
        manual_override_note: rec.manual_override_note,
        manual_override_at: rec.manual_override_at,
        review_status: rec.review_status,
        reviewed_at: rec.reviewed_at,
        priority: rec.priority,
        priority_reason: rec.priority_reason
      },
      analysis: {
        analysis_json: analysis,
        is_stale: Boolean(rec.is_stale),
        analysis_revision: rec.analysis_revision,
        source_revision_at_analysis: rec.source_revision_at_analysis,
        processing_method: rec.processing_method,
        processed_at: rec.processed_at
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
