/**
 * GET /api/stats/github
 *
 * Returns live engineering metrics for the homepage Hero badges:
 *   - commitsThisWeek  — commits across the org's repos in trailing 7 days
 *   - testCoveragePct — aggregate line coverage from CI
 *
 * ────────────────────────────────────────────────────────────────────────
 * CACHING STRATEGY (the whole point of this route)
 * ────────────────────────────────────────────────────────────────────────
 * GitHub's unauthenticated rate limit is 60 requests/hour per IP. A
 * popular homepage burns through that in minutes. We solve this with
 * a three-layer cache:
 *
 *   1. `export const revalidate = 3600`  — Next.js ISR. The route
 *      handler runs at most once per hour per deployment, even if
 *      thousands of visitors hit it.
 *
 *   2. `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`
 *      — Vercel's edge cache serves the same response globally for
 *      an hour. After that, the next request triggers a background
 *      revalidation; the visitor still gets the (slightly stale)
 *      cached response instantly while the new one is being built.
 *
 *   3. `fetchGitHubStats()` itself falls back to `LIVE_STATS_FALLBACK`
 *      on any upstream error, so even if GitHub is completely down the
 *      route still returns a 200 with sensible values.
 *
 * Net effect: GitHub sees at most ~24 requests per day per deployment,
 * which is comfortably inside even the 60/hr unauthenticated limit.
 *
 * ────────────────────────────────────────────────────────────────────────
 * SECURITY
 * ────────────────────────────────────────────────────────────────────────
 * This route is PUBLIC (no auth). The only data it exposes is:
 *   - a count of public commits (already visible on github.com)
 *   - a coverage percentage (already visible on codecov.io)
 * No private repo data, no user info, no tokens in the response.
 */

import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github-stats";
import { LIVE_STATS_FALLBACK } from "@/lib/metrics";

// ISR — recompute at most once per hour.
export const revalidate = 3600;

// Force the route to be cacheable. Without this, Next.js may treat
// dynamic data fetches as "force-dynamic" and bypass the cache.
export const dynamic = "force-static";

export async function GET() {
  try {
    const stats = await fetchGitHubStats();

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        // Edge cache for 1 hour; serve stale for up to a day while revalidating.
        "Cache-Control":
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    // Defensive: fetchGitHubStats is designed to never throw (it catches
    // everything internally and returns the fallback). But if something
    // truly unexpected happens (e.g. JSON serialization of an unhandled
    // error type), we still want to return a valid payload so the
    // client hook doesn't crash.
    console.error("[/api/stats/github] unhandled error:", error);

    return NextResponse.json(
      {
        commitsThisWeek: LIVE_STATS_FALLBACK.commitsThisWeek,
        testCoveragePct: LIVE_STATS_FALLBACK.testCoveragePct,
        generatedAt: new Date().toISOString(),
        source: "fallback" as const,
        stale: true,
      },
      {
        status: 200, // 200, not 5xx — the badge still renders with the fallback.
        headers: {
          "Cache-Control":
            "public, max-age=60, s-maxage=300, stale-while-revalidate=3600",
        },
      },
    );
  }
}
