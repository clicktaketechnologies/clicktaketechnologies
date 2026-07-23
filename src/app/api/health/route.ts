// /api/health — liveness probe for Render / uptime monitors.
// No auth required. Returns 200 if the process is up.
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "clicktake-api",
    timestamp: new Date().toISOString(),
    runtime: typeof process !== "undefined" ? "node" : "edge",
  });
}
