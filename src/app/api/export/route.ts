import { NextResponse } from "next/server";
import { generateExportZip } from "@/lib/export";

// dynamic handled by Next.js

export async function GET() {
  try {
    const { buffer, manifest } = await generateExportZip();
    
    return new NextResponse(buffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="revenue-intelligence-export.zip"',
        "X-Manifest-Count": String(manifest.length)
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
