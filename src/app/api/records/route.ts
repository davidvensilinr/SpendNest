import { NextRequest, NextResponse } from "next/server";
import { getSqlite } from "@/lib/db";
import { RouteItem } from "@/lib/types";

// dynamic handled by Next.js

export async function GET(request: NextRequest) {
  try {
    const sqlite = getSqlite();
    const searchParams = request.nextUrl.searchParams;
    
    const typeFilter = searchParams.get("type"); // call | meeting | all
    const personFilter = searchParams.get("person"); // email
    const routeFilter = searchParams.get("route"); // sales_coaching | deal_next_steps ...
    const reviewStatusFilter = searchParams.get("review_status"); // pending | reviewed
    const hasTranscriptFilter = searchParams.get("has_transcript"); // yes | no
    const isOverriddenFilter = searchParams.get("is_overridden"); // yes | no
    const isUpdatedFilter = searchParams.get("is_updated"); // yes | no
    const searchQuery = searchParams.get("search")?.toLowerCase().trim();

    const rows = sqlite.prepare(`
      SELECT 
        s.id,
        s.source_type,
        s.source_id,
        s.record_ref,
        s.applied_revision,
        s.batch_id,
        s.has_usable_transcript,
        s.rep_email,
        s.rep_name,
        s.organizer_email,
        s.activity_at,
        s.created_at,
        s.updated_at,
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
      ORDER BY 
        CASE WHEN r.priority = 'urgent' THEN 1 WHEN r.priority = 'high' THEN 2 WHEN r.priority = 'normal' THEN 3 ELSE 4 END ASC,
        s.activity_at DESC
    `).all() as any[];

    const results = rows.map(r => {
      let suggestedRoutes: RouteItem[] = [];
      let manualRoutes: RouteItem[] | null = null;
      try {
        suggestedRoutes = JSON.parse(r.suggested_routes_json || "[]");
      } catch (e) {}
      if (r.manual_routes_json) {
        try {
          manualRoutes = JSON.parse(r.manual_routes_json);
        } catch (e) {}
      }

      const effectiveRoutes = manualRoutes || suggestedRoutes;
      let analysis: any = {};
      try {
        analysis = JSON.parse(r.analysis_json || "{}");
      } catch (e) {}

      return {
        id: r.id,
        source_type: r.source_type,
        source_id: r.source_id,
        record_ref: r.record_ref,
        applied_revision: r.applied_revision,
        batch_id: r.batch_id,
        has_usable_transcript: Boolean(r.has_usable_transcript),
        rep_email: r.rep_email,
        rep_name: r.rep_name,
        organizer_email: r.organizer_email,
        activity_at: r.activity_at,
        suggested_routes: suggestedRoutes,
        manual_routes: manualRoutes,
        effective_routes: effectiveRoutes,
        is_manually_overridden: Boolean(r.manual_routes_json),
        manual_override_note: r.manual_override_note,
        review_status: r.review_status || "pending",
        priority: r.priority || "normal",
        priority_reason: r.priority_reason,
        is_stale: Boolean(r.is_stale),
        analysis_revision: r.analysis_revision || 1,
        summary: analysis.summary || "No transcript supplied.",
        customer_signals: analysis.customer_signals || [],
        recommended_action: analysis.recommended_action || "Pending intake."
      };
    });

    // Filtering logic
    const filtered = results.filter(item => {
      if (typeFilter && typeFilter !== "all" && item.source_type !== typeFilter) return false;
      if (personFilter && personFilter !== "all") {
        const matchesRep = item.rep_email?.toLowerCase() === personFilter.toLowerCase();
        const matchesOrg = item.organizer_email?.toLowerCase() === personFilter.toLowerCase();
        if (!matchesRep && !matchesOrg) return false;
      }
      if (routeFilter && routeFilter !== "all") {
        const hasRoute = item.effective_routes.some(r => r.category === routeFilter);
        if (!hasRoute) return false;
      }
      if (reviewStatusFilter && reviewStatusFilter !== "all" && item.review_status !== reviewStatusFilter) return false;
      if (hasTranscriptFilter && hasTranscriptFilter !== "all") {
        if (hasTranscriptFilter === "yes" && !item.has_usable_transcript) return false;
        if (hasTranscriptFilter === "no" && item.has_usable_transcript) return false;
      }
      if (isOverriddenFilter && isOverriddenFilter !== "all") {
        if (isOverriddenFilter === "yes" && !item.is_manually_overridden) return false;
        if (isOverriddenFilter === "no" && item.is_manually_overridden) return false;
      }
      if (isUpdatedFilter && isUpdatedFilter !== "all") {
        if (isUpdatedFilter === "yes" && item.applied_revision <= 1) return false;
        if (isUpdatedFilter === "no" && item.applied_revision > 1) return false;
      }
      if (searchQuery) {
        const inRef = item.record_ref?.toLowerCase().includes(searchQuery);
        const inId = item.source_id.toLowerCase().includes(searchQuery);
        const inSummary = item.summary.toLowerCase().includes(searchQuery);
        const inRep = item.rep_email?.toLowerCase().includes(searchQuery) || item.rep_name?.toLowerCase().includes(searchQuery);
        const inOrg = item.organizer_email?.toLowerCase().includes(searchQuery);
        if (!inRef && !inId && !inSummary && !inRep && !inOrg) return false;
      }
      return true;
    });

    return NextResponse.json({
      total: results.length,
      filtered_count: filtered.length,
      records: filtered
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
