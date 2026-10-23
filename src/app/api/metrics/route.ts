import { NextResponse } from "next/server";
import { getDashboardMetrics } from "@/lib/metrics";

// dynamic handled by Next.js

export async function GET() {
  try {
    const metrics = getDashboardMetrics();
    return NextResponse.json(metrics);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
