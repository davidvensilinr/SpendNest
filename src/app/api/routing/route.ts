import { NextRequest, NextResponse } from "next/server";
import { getSqlite } from "@/lib/db";
import { RouteItem } from "@/lib/types";

// dynamic handled by Next.js

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { source_type, source_id, action, manual_routes, manual_override_note, review_status } = body;

    if (!source_type || !source_id) {
      return NextResponse.json({ error: "Missing source_type or source_id" }, { status: 400 });
    }

    const sqlite = getSqlite();

    if (action === "override") {
      sqlite.prepare(`
        UPDATE routing_records SET
          manual_routes_json = ?,
          manual_override_note = ?,
          manual_override_at = datetime('now'),
          review_status = COALESCE(?, review_status),
          updated_at = datetime('now')
        WHERE source_type = ? AND source_id = ?
      `).run(
        JSON.stringify(manual_routes || []),
        manual_override_note || "Manager manual route correction applied.",
        review_status || "reviewed",
        source_type,
        source_id
      );
    } else if (action === "reset") {
      sqlite.prepare(`
        UPDATE routing_records SET
          manual_routes_json = NULL,
          manual_override_note = NULL,
          manual_override_at = NULL,
          updated_at = datetime('now')
        WHERE source_type = ? AND source_id = ?
      `).run(source_type, source_id);
    } else if (action === "mark_reviewed") {
      sqlite.prepare(`
        UPDATE routing_records SET
          review_status = 'reviewed',
          reviewed_at = datetime('now'),
          updated_at = datetime('now')
        WHERE source_type = ? AND source_id = ?
      `).run(source_type, source_id);
    }

    return NextResponse.json({ success: true, message: "Routing updated successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
