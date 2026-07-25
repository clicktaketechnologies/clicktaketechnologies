// POST /api/ab-test/expose
// ─────────────────────────────────────────────────────────────────────────────
// Records an exposure: visitor X saw variant Y of experiment Z.
//
// Body: { experimentId, variantId, visitorId, path? }
//
// Idempotent — repeated fires from the same visitor only create the row
// once (the unique index on (visitor_id, experiment_id) is the safety net,
// recordExposure's findFirst is the fast path).
//
// Auth: NONE. This is a public endpoint called from <AbTest> on the client.
// We trust the visitorId from the cookie (set by middleware) — it's not a
// secret, just a stable identifier. A malicious actor could spam fake
// exposures, but they'd only pollute their own data (and could be filtered
// out by IP rate-limiting if it becomes a problem).
//
// Returns 200 always — even on error. Exposure tracking is best-effort.
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { recordExposure } from '@/lib/ab-testing'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    // Malformed body — silently return 200. Best-effort.
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const { experimentId, variantId, visitorId, path } = body || {}

  // Minimal validation — bail silently if missing required fields.
  if (!experimentId || !variantId || !visitorId) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Basic shape check — must look like a cuid (long base36 string).
  // This prevents garbage data from polluting the table.
  if (
    typeof experimentId !== 'string' ||
    typeof variantId !== 'string' ||
    typeof visitorId !== 'string' ||
    experimentId.length < 20 ||
    variantId.length < 20 ||
    visitorId.length < 20
  ) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // Fire-and-forget — do NOT await. The client doesn't care about the
  // result, and we want the request to complete ASAP.
  void recordExposure({ experimentId, variantId, visitorId, path })

  return NextResponse.json({ ok: true }, { status: 200 })
}
