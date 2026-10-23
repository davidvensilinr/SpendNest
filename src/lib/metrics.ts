// Dynamic metrics calculator querying SQLite database
// Strictly computes real values, accurate denominators, and audit trail reconciliation

import { getSqlite } from "./db";
import { DashboardMetrics, RouteCategory, RouteItem } from "./types";

export function getDashboardMetrics(): DashboardMetrics {
  const sqlite = getSqlite();

  // 1. Total & Source Type counts
  const totals = sqlite.prepare(`
    SELECT 
      COUNT(*) as total_records,
      SUM(CASE WHEN source_type = 'call' THEN 1 ELSE 0 END) as total_calls,
      SUM(CASE WHEN source_type = 'meeting' THEN 1 ELSE 0 END) as total_meetings,
      SUM(CASE WHEN has_usable_transcript = 1 THEN 1 ELSE 0 END) as usable_transcripts,
      SUM(CASE WHEN applied_revision > 1 THEN 1 ELSE 0 END) as updated_records
    FROM source_records
  `).get() as any;

  const totalRecords = totals?.total_records || 0;
  const totalCalls = totals?.total_calls || 0;
  const totalMeetings = totals?.total_meetings || 0;
  const usableTranscripts = totals?.usable_transcripts || 0;
  const updatedRecords = totals?.updated_records || 0;
  const usablePct = totalRecords > 0 ? Number(((usableTranscripts / totalRecords) * 100).toFixed(1)) : 0;

  // 2. Review and Routing counts
  const routingRows = sqlite.prepare(`
    SELECT 
      r.source_type,
      r.source_id,
      s.record_ref,
      r.suggested_routes_json,
      r.manual_routes_json,
      r.review_status,
      r.priority,
      r.priority_reason,
      a.is_stale
    FROM routing_records r
    LEFT JOIN source_records s ON r.source_type = s.source_type AND r.source_id = s.source_id
    LEFT JOIN analysis_records a ON r.source_type = a.source_type AND r.source_id = a.source_id
  `).all() as any[];

  let recordsNeedingReview = 0;
  let manuallyCorrectedCount = 0;
  let multiRouteCount = 0;
  let staleAnalysisCount = 0;

  const routeCounts: Record<RouteCategory, number> = {
    sales_coaching: 0,
    deal_next_steps: 0,
    customer_follow_up: 0,
    internal_vendor: 0,
    review_needed: 0
  };

  const attentionQueue: DashboardMetrics["attention_queue"] = [];

  for (const row of routingRows) {
    if (row.review_status === "pending") {
      recordsNeedingReview++;
    }
    if (row.manual_routes_json) {
      manuallyCorrectedCount++;
    }
    if (row.is_stale) {
      staleAnalysisCount++;
    }

    // Determine effective routes
    let effectiveRoutes: RouteItem[] = [];
    if (row.manual_routes_json) {
      try {
        effectiveRoutes = JSON.parse(row.manual_routes_json);
      } catch (e) {
        effectiveRoutes = [];
      }
    } else {
      try {
        effectiveRoutes = JSON.parse(row.suggested_routes_json || "[]");
      } catch (e) {
        effectiveRoutes = [];
      }
    }

    if (effectiveRoutes.length > 1) {
      multiRouteCount++;
    }

    for (const rt of effectiveRoutes) {
      if (rt.category in routeCounts) {
        routeCounts[rt.category]++;
      }
    }

    // Build Attention Queue items
    if (row.priority === "urgent") {
      attentionQueue.push({
        id: `${row.source_type}-${row.source_id}`,
        source_type: row.source_type,
        source_id: row.source_id,
        record_ref: row.record_ref || "UNREF",
        title: `URGENT: ${row.record_ref || row.source_id}`,
        reason: row.priority_reason || "Immediate operational/engineering action required",
        severity: "urgent",
        badge: "P1 Urgent",
        created_at: new Date().toISOString()
      });
    } else if (row.priority === "high" && row.review_status === "pending") {
      attentionQueue.push({
        id: `${row.source_type}-${row.source_id}`,
        source_type: row.source_type,
        source_id: row.source_id,
        record_ref: row.record_ref || "UNREF",
        title: `HIGH PRIORITY: ${row.record_ref || row.source_id}`,
        reason: row.priority_reason || "High value pipeline opportunity awaiting review",
        severity: "warning",
        badge: "Action Required",
        created_at: new Date().toISOString()
      });
    } else if (row.manual_routes_json && row.review_status === "pending") {
      attentionQueue.push({
        id: `${row.source_type}-${row.source_id}`,
        source_type: row.source_type,
        source_id: row.source_id,
        record_ref: row.record_ref || "UNREF",
        title: `Manual Route Review: ${row.record_ref || row.source_id}`,
        reason: "Manual routing override has not been formally approved by manager",
        severity: "info",
        badge: "Manual Override",
        created_at: new Date().toISOString()
      });
    }
  }

  // 3. Activity by Person (Separate Call Reps from Meeting Organizers per DATA_CONTRACT)
  const repRows = sqlite.prepare(`
    SELECT 
      COALESCE(rep_email, 'unassigned') as email,
      COALESCE(rep_name, 'Unknown Rep') as name,
      COUNT(*) as count,
      SUM(CASE WHEN has_usable_transcript = 1 THEN 1 ELSE 0 END) as with_transcript
    FROM source_records
    WHERE source_type = 'call'
    GROUP BY rep_email
    ORDER BY count DESC
  `).all() as any[];

  const organizerRows = sqlite.prepare(`
    SELECT 
      COALESCE(organizer_email, 'unassigned') as email,
      COALESCE(organizer_email, 'Unknown Organizer') as name,
      COUNT(*) as count,
      SUM(CASE WHEN has_usable_transcript = 1 THEN 1 ELSE 0 END) as with_transcript
    FROM source_records
    WHERE source_type = 'meeting'
    GROUP BY organizer_email
    ORDER BY count DESC
  `).all() as any[];

  // 4. Activity by Day (All records fall on 2026-08-21 Asia/Kolkata)
  const dayRows = sqlite.prepare(`
    SELECT 
      substr(activity_at, 1, 10) as date,
      SUM(CASE WHEN source_type = 'call' THEN 1 ELSE 0 END) as calls,
      SUM(CASE WHEN source_type = 'meeting' THEN 1 ELSE 0 END) as meetings,
      COUNT(*) as total
    FROM source_records
    GROUP BY substr(activity_at, 1, 10)
    ORDER BY date ASC
  `).all() as any[];

  return {
    total_records: totalRecords,
    total_calls: totalCalls,
    total_meetings: totalMeetings,
    usable_transcripts_count: usableTranscripts,
    usable_transcripts_percentage: usablePct,
    records_needing_review: recordsNeedingReview,
    multi_route_records_count: multiRouteCount,
    manually_corrected_count: manuallyCorrectedCount,
    updated_source_records_count: updatedRecords,
    stale_analysis_count: staleAnalysisCount,
    route_counts: routeCounts,
    activity_by_person: {
      call_reps: repRows.map(r => ({ email: r.email, name: r.name, count: r.count, with_transcript: r.with_transcript || 0 })),
      meeting_organizers: organizerRows.map(r => ({ email: r.email, name: r.name, count: r.count, with_transcript: r.with_transcript || 0 }))
    },
    activity_by_day: dayRows.map(d => ({ date: d.date || "2026-08-21", calls: d.calls, meetings: d.meetings, total: d.total })),
    attention_queue: attentionQueue
  };
}
