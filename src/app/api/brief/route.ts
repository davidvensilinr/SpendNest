import { NextResponse } from "next/server";
import { MANAGER_BRIEF_21_AUG_2026 } from "@/lib/brief-data";

// dynamic handled by Next.js

export async function GET() {
  return NextResponse.json(MANAGER_BRIEF_21_AUG_2026);
}
