import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { importBatch, RawDeliveryEnvelope } from "@/lib/importer";
import { getSqlite } from "@/lib/db";

// dynamic handled by Next.js

export async function GET() {
  try {
    const sqlite = getSqlite();
    const history = sqlite.prepare(`
      SELECT * FROM import_history ORDER BY id DESC LIMIT 20
    `).all();
    return NextResponse.json({ history });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || "initial"; // initial | update | replay

    let targetFile = path.resolve(process.cwd(), "data", "01_initial.json");
    if (!fs.existsSync(targetFile)) {
      targetFile = path.resolve(process.cwd(), "..", "candidate", "data", "01_initial.json");
    }
    let isReplay = false;

    if (action === "update") {
      targetFile = path.resolve(process.cwd(), "data", "02_update.json");
      if (!fs.existsSync(targetFile)) {
        targetFile = path.resolve(process.cwd(), "..", "candidate", "data", "02_update.json");
      }
    } else if (action === "replay") {
      targetFile = path.resolve(process.cwd(), "data", "01_initial.json");
      if (!fs.existsSync(targetFile)) {
        targetFile = path.resolve(process.cwd(), "..", "candidate", "data", "01_initial.json");
      }
      isReplay = true;
    }

    if (!fs.existsSync(targetFile)) {
      return NextResponse.json({ error: `File not found at ${targetFile}` }, { status: 404 });
    }

    const rawData = fs.readFileSync(targetFile, "utf-8");
    const envelope: RawDeliveryEnvelope = JSON.parse(rawData);

    if (isReplay) {
      // Scramble records order to prove order independence (DATA_CONTRACT Test 3)
      envelope.records = [...envelope.records].reverse();
    }

    const result = importBatch(envelope, isReplay);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
