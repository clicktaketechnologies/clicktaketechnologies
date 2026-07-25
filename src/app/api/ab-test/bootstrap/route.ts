// GET /api/ab-test/bootstrap
// ─────────────────────────────────────────────────────────────────────────────
// Returns the configuration of all RUNNING experiments (key, variants,
// weights, control flag). Called once per page load by the <AbTest>
// client component (module-scoped singleton fetch).
//
// Response shape:
//   {
//     "hero-cta-text": {
//       experimentId: "ck...",
//       variants: [
//         { key: "A", id: "ck...", weight: 50, isControl: true },
//         { key: "B", id: "ck...", weight: 50, isControl: false }
//       ]
//     },
//     ...
//   }
//
// Auth: NONE. The response contains no PII, no secrets — only the
// experiment definitions that are needed to render variants client-side.
// We deliberately do NOT include the payloadJson (rendered copy/HTML)
// because that's already in the React bundle — the bootstrap response
// only tells the client which variant to pick.
//
// Caching: response is Cache-Control: public, max-age=60, s-maxage=300.
// The CDN/browser caches it for 60s; the server caches it for 5min.
// This keeps the bootstrap fetch cheap even on high-traffic pages.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const runtime = 'nodejs'

// Always dynamic — we hit the DB for live experiment status. Even with
// revalidate=60, Cloudflare/Vercel edge caching handles the CDN layer.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const experiments = await prisma.abExperiment.findMany({
      where: { status: 'running' },
      include: { variants: true },
    })

    const response: Record<string, any> = {}
    for (const exp of experiments) {
      response[exp.key] = {
        experimentId: exp.id,
        variants: exp.variants.map((v: any) => ({
          key: v.key,
          id: v.id,
          weight: v.weight,
          isControl: v.isControl,
        })),
      }
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    // DB might not be migrated yet, or transient DB issue. Return empty
    // map so <AbTest> renders control variant gracefully.
    console.error('[ab-test/bootstrap] failed:', err)
    return NextResponse.json({}, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    })
  }
}
