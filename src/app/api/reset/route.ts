import { NextResponse } from "next/server";
import { resetDatabase } from "@/lib/importer";

// dynamic handled by Next.js

export async function POST() {
  try {
    resetDatabase();
    return NextResponse.json({ success: true, message: "Database reset to clean state." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
