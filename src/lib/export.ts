// Export generator module
// Generates actual downloadable ZIP containing organized folder taxonomy,
// markdown reports for every route, manager-brief.md, and validated manifest (JSON & CSV).

import JSZip from "jszip";
import { getSqlite } from "./db";
import { RouteItem } from "./types";
import { MANAGER_BRIEF_21_AUG_2026 } from "./brief-data";

export interface ManifestEntry {
  source_type: "call" | "meeting";
  source_id: string;
  record_ref: string;
  applied_revision: number;
  has_usable_transcript: boolean;
  assigned_routes: string[];
  output_paths: string[];
  review_status: string;
  is_manually_overridden: boolean;
  manual_override_note: string | null;
  priority: string;
  analysis_provenance: string;
  is_stale: boolean;
  exported_at: string;
}

export async function generateExportZip(): Promise<{ buffer: Buffer; manifest: ManifestEntry[] }> {
  const sqlite = getSqlite();
  const zip = new JSZip();

  const records = sqlite.prepare(`
    SELECT 
      s.source_type,
      s.source_id,
      s.record_ref,
      s.applied_revision,
      s.has_usable_transcript,
      s.rep_email,
      s.organizer_email,
      s.activity_at,
      s.payload_json,
      s.transcript_payload_json,
      r.suggested_routes_json,
      r.manual_routes_json,
      r.manual_override_note,
      r.review_status,
      r.priority,
      r.priority_reason,
      a.analysis_json,
      a.is_stale,
      a.processing_method,
      a.analysis_revision
    FROM source_records s
    LEFT JOIN routing_records r ON s.source_type = r.source_type AND s.source_id = r.source_id
    LEFT JOIN analysis_records a ON s.source_type = a.source_type AND s.source_id = a.source_id
    ORDER BY s.source_type ASC, s.record_ref ASC
  `).all() as any[];

  const exportedAt = new Date().toISOString();
  const manifest: ManifestEntry[] = [];

  const categoryFolders: Record<string, string> = {
    sales_coaching: "sales-coaching",
    deal_next_steps: "deal-next-steps",
    customer_follow_up: "customer-follow-up",
    internal_vendor: "internal-vendor",
    review_needed: "review-needed"
  };

  for (const rec of records) {
    const isManuallyOverridden = Boolean(rec.manual_routes_json);
    let effectiveRoutes: RouteItem[] = [];
    
    if (isManuallyOverridden) {
      try {
        effectiveRoutes = JSON.parse(rec.manual_routes_json);
      } catch (e) {
        effectiveRoutes = [];
      }
    } else {
      try {
        effectiveRoutes = JSON.parse(rec.suggested_routes_json || "[]");
      } catch (e) {
        effectiveRoutes = [];
      }
    }

    if (effectiveRoutes.length === 0) {
      effectiveRoutes = [{
        category: "review_needed",
        label: "Human Review",
        reason: "No active routes assigned. Defaulted to intake review."
      }];
    }

    let analysis: any = {};
    try {
      analysis = JSON.parse(rec.analysis_json || "{}");
    } catch (e) {
      analysis = {};
    }

    const outputPaths: string[] = [];
    const assignedRoutes = effectiveRoutes.map(r => r.category);

    for (const rt of effectiveRoutes) {
      const folderName = categoryFolders[rt.category] || "review-needed";
      const fileName = `${rec.source_type}_${rec.record_ref || rec.source_id}_${rt.category}.md`;
      const relativePath = `${folderName}/${fileName}`;
      outputPaths.push(relativePath);

      const mdContent = `# Revenue Intelligence Record - ${rec.record_ref || rec.source_id}
**Destination Category:** ${rt.label} (${rt.category})  
**Source Type:** ${rec.source_type}  
**Source ID:** \`${rec.source_id}\`  
**Applied Source Revision:** ${rec.applied_revision}  
**Analysis Revision:** ${rec.analysis_revision || 1}  
**Usable Transcript Present:** ${rec.has_usable_transcript ? "Yes" : "No"}  
**Manual Override Active:** ${isManuallyOverridden ? "Yes" : "No"}  
**Review Status:** ${rec.review_status}  
**Priority:** ${rec.priority}  

---

## Routing Justification
- **Route Reason:** ${rt.reason || "Standard routing rules applied."}
- **Supporting Passage:** ${rt.evidence_passage || "None provided."}
${isManuallyOverridden ? `\n> **Manager Correction Note:** ${rec.manual_override_note || "Manual routing correction applied by reviewer."}\n` : ""}

---

## Executive Summary
${analysis.summary || "No substantive summary available."}

### What Happened
${analysis.what_happened || "Awaiting source evidence."}

### Why It Matters
${analysis.why_it_matters || "Awaiting source evidence."}

### Recommended Action
- **Next Step:** ${analysis.recommended_action || "Pending intake."}
- **Stated Owner:** ${analysis.action_owner || "Unspecified in evidence"}
- **Timing:** ${analysis.action_deadline || "As required"}

### Supporting Evidence Passages
${Array.isArray(analysis.evidence_passages) && analysis.evidence_passages.length > 0 
  ? analysis.evidence_passages.map((p: any) => `- **Turn ${p.turn_number || "N/A"}${p.speaker ? ` (${p.speaker})` : ""}:** "${p.quote}"\n  *Context:* ${p.context}`).join("\n")
  : "_No verbatim quotes available._"}

### Limitations & Caveats
${analysis.limitations || "None noted."}

---
*Generated by SpendNest Revenue Intelligence Inbox on ${exportedAt}*
`;

      zip.file(relativePath, mdContent);
    }

    manifest.push({
      source_type: rec.source_type,
      source_id: rec.source_id,
      record_ref: rec.record_ref || "UNREF",
      applied_revision: rec.applied_revision,
      has_usable_transcript: Boolean(rec.has_usable_transcript),
      assigned_routes: assignedRoutes,
      output_paths: outputPaths,
      review_status: rec.review_status,
      is_manually_overridden: isManuallyOverridden,
      manual_override_note: rec.manual_override_note,
      priority: rec.priority,
      analysis_provenance: analysis.processing_method || "pre-generated",
      is_stale: Boolean(rec.is_stale),
      exported_at: exportedAt
    });
  }

  // 1. Add manifest.json
  zip.file("manifest.json", JSON.stringify(manifest, null, 2));

  // 2. Add manifest.csv
  const csvHeaders = [
    "source_type",
    "source_id",
    "record_ref",
    "applied_revision",
    "has_usable_transcript",
    "assigned_routes",
    "output_paths",
    "review_status",
    "is_manually_overridden",
    "manual_override_note",
    "priority",
    "is_stale",
    "exported_at"
  ];

  const csvRows = manifest.map(m => [
    m.source_type,
    m.source_id,
    m.record_ref,
    m.applied_revision,
    m.has_usable_transcript ? "true" : "false",
    `"${m.assigned_routes.join(";")}"`,
    `"${m.output_paths.join(";")}"`,
    m.review_status,
    m.is_manually_overridden ? "true" : "false",
    `"${(m.manual_override_note || "").replace(/"/g, '""')}"`,
    m.priority,
    m.is_stale ? "true" : "false",
    m.exported_at
  ].join(","));

  zip.file("manifest.csv", [csvHeaders.join(","), ...csvRows].join("\n"));

  // 3. Add README.md
  const readmeContent = `# Revenue Intelligence Inbox - Export Archive
Generated on: ${exportedAt}  
Total Logical Source Records: ${manifest.length}  

## Folder Structure
- \`manifest.json\`: Machine-readable JSON manifest linking every source record to its outputs.
- \`manifest.csv\`: Tabular manifest for spreadsheet review.
- \`manager-brief.md\`: Executive synthesis of all 18 active conversations for 21 August 2026.
- \`sales-coaching/\`: Transcripts and coaching recommendations for rep pitch improvement.
- \`deal-next-steps/\`: Qualified enterprise opportunities and commercial action items.
- \`customer-follow-up/\`: Customer success, migration support, and onboarding touchpoints.
- \`internal-vendor/\`: Critical software bugs, logistics escalations, and billing engine enhancements.
- \`review-needed/\`: Records pending intake review or lacking usable transcripts.

## Data Contract Validation
1. Every path listed in \`manifest.json\` corresponds to an existing file in this archive.
2. Multi-route records are represented in all target folders without duplicating source record count.
3. Records with manual overrides retain their manager-assigned paths and custom notes.
`;
  zip.file("README.md", readmeContent);

  // 4. Add manager-brief.md
  const brief = MANAGER_BRIEF_21_AUG_2026;
  let briefMd = `# SpendNest Revenue Intelligence - Manager Brief
**Date:** ${brief.brief_date} (${brief.timezone})  
**Generated At:** ${brief.generated_at}  

## Executive Summary
${brief.executive_summary}

> **Scope Caveat:** ${brief.scope_description}

---

`;

  for (const sec of brief.sections) {
    briefMd += `## ${sec.title}\n\n`;
    for (const it of sec.items) {
      briefMd += `### [${it.conversation_ref}] ${it.title}\n`;
      briefMd += `- **Evidence:** ${it.evidence_passage}\n`;
      briefMd += `- **Analysis:** ${it.description}\n`;
      briefMd += `- **Action:** ${it.actionable_takeaway}\n\n`;
    }
  }

  zip.file("manager-brief.md", briefMd);

  // Record into export_history
  sqlite.prepare(`
    INSERT INTO export_history (record_count, manifest_json, exported_at)
    VALUES (?, ?, datetime('now'))
  `).run(manifest.length, JSON.stringify(manifest));

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  return { buffer, manifest };
}
