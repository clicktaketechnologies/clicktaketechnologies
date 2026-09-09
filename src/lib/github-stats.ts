/**
 * Server-side GitHub stats fetcher.
 *
 * ────────────────────────────────────────────────────────────────────────
 * CONTRACT
 * ────────────────────────────────────────────────────────────────────────
 * One async function — `fetchGitHubStats()` — returns the two live metrics
 * the homepage Hero needs:
 *
 *   1. `commitsThisWeek`  — number of commits across the org's repos in
 *      the trailing 7 days.
 *   2. `testCoveragePct` — aggregate line coverage from the most recent
 *      CI run.
 *
 * Both values come with an explicit `source` field — either "github"
 * (live data) or "fallback" (the static defaults from `LIVE_STATS_FALLBACK`).
 * Callers must respect this so the UI can render the right label.
 *
 * ────────────────────────────────────────────────────────────────────────
 * RATE-LIMIT & ERROR STRATEGY
 * ────────────────────────────────────────────────────────────────────────
 * GitHub unauthenticated requests are capped at 60/hr per IP. A homepage
 * that gets thousands of visitors an hour would burn through that in
 * minutes. Three defences:
 *
 *   1. **ISR caching at the route layer.** `/api/stats/github/route.ts`
 *      exports `revalidate = 3600` (1 hour) and sets
 *      `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`.
 *      Vercel's edge cache serves the same response to all visitors for
 *      an hour, so the upstream GitHub API only gets hit once per hour
 *      globally.
 *
 *   2. **Optional GITHUB_TOKEN.** If the env var is set, requests are
 *      authenticated and the rate limit jumps to 5,000/hr. This is
 *      belt-and-braces: with caching, even 60/hr is plenty.
 *
 *   3. **Static fallback.** On ANY error — 403 rate-limit, 5xx, network
 *      timeout, malformed JSON, missing fields — we return the static
 *      `LIVE_STATS_FALLBACK` values with `source: "fallback"`. The
 *      visitor never sees a broken badge.
 *
 * Codecov coverage is fetched separately and has its own fallback path
 * — if the CODECOV_TOKEN or repo slug isn't configured, we skip the
 * network call and use the fallback percentage.
 *
 * ────────────────────────────────────────────────────────────────────────
 * SECURITY
 * ────────────────────────────────────────────────────────────────────────
 * This module is server-only. It must never be imported from a client
 * component — the GITHUB_TOKEN would leak into the bundle. The Next.js
 * App Router enforces this automatically because the file is only
 * imported by `src/app/api/stats/github/route.ts`, which runs server-side.
 */

import { LIVE_STATS_FALLBACK, type LiveStats } from "@/lib/metrics";

// ─── Configuration ──────────────────────────────────────────────────────

/**
 * The GitHub org we report stats for. Pulls from env so a fork or staging
 * deploy can point at a different org without a code change. Defaults to
 * the production org.
 */
const GITHUB_ORG =
  process.env.GITHUB_STATS_ORG ?? "clicktaketechnologies";

/**
 * Optional PAT or GitHub App installation token. When set, requests are
 * authenticated (5,000/hr instead of 60/hr). The token only needs
 * `public_repo` read scope — coverage stats are public on Codecov.
 */
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Codecov configuration. The badge shows a single coverage number that
 * aggregates the org's repos — Codecov's "org" dashboard URL gives
 * exactly this. When the env vars aren't set, we skip the network call
 * and return the static fallback.
 */
const CODECOV_API_URL = process.env.CODECOV_API_URL ?? "https://codecov.io/api/v2";
const CODECOV_SERVICE = process.env.CODECOV_SERVICE ?? "github";
const CODECOV_OWNER =
  process.env.CODECOV_OWNER ?? GITHUB_ORG;
const CODECOV_TOKEN = process.env.CODECOV_TOKEN;

/**
 * Network budget. We never wait longer than this for any single upstream
 * call — the visitor sees the fallback faster than they'd see a spinner.
 */
const FETCH_TIMEOUT_MS = 4_000;

// ─── Types ──────────────────────────────────────────────────────────────

/** Internal helper type for the GitHub commits search response. */
type GitHubEventsResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<{ id: string }>;
};

/**
 * Internal helper type for the Codecov coverage response. The actual
 * payload is much larger; we only type the fields we read.
 */
type CodecovCoverageResponse = {
  totals?: {
    coverage?: string | number;
  };
};

// ─── Helpers ────────────────────────────────────────────────────────────

/**
 * Fetch with an AbortController-based timeout. The default `fetch`
 * timeout in Node is ~300s, which is far too long for a hot badge —
 * 4 seconds is the upper bound before we fall back to static values.
 */
async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Build the standard GitHub REST headers. Auth is optional — when the
 * token is unset, requests go out unauthenticated and rely on the 60/hr
 * rate limit + ISR caching.
 */
function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    // Identify the bot so GitHub's rate-limit dashboard shows what's hitting them.
    "User-Agent": "clicktaketechnologies.com stats fetcher",
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

// ─── Fetchers ───────────────────────────────────────────────────────────

/**
 * Fetch the number of commits across the org's repos in the trailing
 * 7 days. Uses the GitHub search API (`/search/commits`) which supports
 * an `org:` qualifier + a date range.
 *
 * Returns the fallback on ANY error — callers don't need to know what
 * went wrong, only that the live value is unavailable.
 */
async function fetchCommitsThisWeek(): Promise<number> {
  // Compute the ISO timestamp 7 days ago. We round down to the start
  // of the day so the search query is deterministic and cacheable.
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);
  sevenDaysAgo.setUTCHours(0, 0, 0, 0);
  const since = sevenDaysAgo.toISOString().slice(0, 10); // YYYY-MM-DD

  const url =
    `https://api.github.com/search/commits` +
    `?q=org:${GITHUB_ORG}+author-date:>=${since}` +
    `&sort=author-date&order=desc&per_page=1`;

  const res = await fetchWithTimeout(url, { headers: githubHeaders() });

  if (!res.ok) {
    // 403 = rate-limited; 401 = bad token; 422 = malformed query.
    // All three: fall back silently. The route layer logs the status.
    throw new Error(
      `GitHub commits search returned ${res.status} ${res.statusText}`,
    );
  }

  const body = (await res.json()) as GitHubEventsResponse;
  if (typeof body.total_count !== "number") {
    throw new Error("GitHub commits search: missing total_count");
  }
  return body.total_count;
}

/**
 * Fetch aggregate line-coverage percent from Codecov's v2 API. Returns
 * the fallback when CODECOV_TOKEN is unset, when the network call fails,
 * or when the response shape is unexpected.
 */
async function fetchTestCoverage(): Promise<number> {
  if (!CODECOV_TOKEN) {
    // No token configured → don't even try the network call.
    throw new Error("CODECOV_TOKEN not configured");
  }

  // Codecov v2 exposes an org-level totals endpoint. We pin a single
  // branch (main) so the value is deterministic across cache hits.
  const url =
    `${CODECOV_API_URL}/git/${CODECOV_SERVICE}/${CODECOV_OWNER}` +
    `/totals?branch=main`;

  const res = await fetchWithTimeout(url, {
    headers: {
      Authorization: `Bearer ${CODECOV_TOKEN}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(
      `Codecov totals returned ${res.status} ${res.statusText}`,
    );
  }

  const body = (await res.json()) as CodecovCoverageResponse;
  const raw = body.totals?.coverage;
  if (raw === undefined || raw === null) {
    throw new Error("Codecov totals: missing coverage field");
  }
  const num = typeof raw === "string" ? parseFloat(raw) : raw;
  if (!Number.isFinite(num) || num < 0 || num > 100) {
    throw new Error(`Codecov coverage out of range: ${num}`);
  }
  // Round to the nearest whole percent — the badge doesn't need decimals.
  return Math.round(num);
}

// ─── Public entry point ─────────────────────────────────────────────────

/**
 * Fetch the two live stats, gracefully degrading to static fallbacks
 * on any error.
 *
 * @returns a `LiveStats` payload ready to be JSON-stringified by the
 *          API route. The `source` field is `"github"` only when BOTH
 *          upstream calls succeeded; if either fell back, the whole
 *          payload is marked `"fallback"` so the UI can render a
 *          "(cached)" indicator.
 */
export async function fetchGitHubStats(): Promise<LiveStats> {
  // Run both fetches concurrently — they're independent. Each catches
  // its own errors so a GitHub outage doesn't poison the Codecov value
  // (and vice versa).
  const [commitsResult, coverageResult] = await Promise.allSettled([
    fetchCommitsThisWeek(),
    fetchTestCoverage(),
  ]);

  const commitsOk = commitsResult.status === "fulfilled";
  const coverageOk = coverageResult.status === "fulfilled";

  const commitsThisWeek = commitsOk
    ? commitsResult.value
    : LIVE_STATS_FALLBACK.commitsThisWeek;
  const testCoveragePct = coverageOk
    ? coverageResult.value
    : LIVE_STATS_FALLBACK.testCoveragePct;

  // If we have non-fallback values, log the failed upstream so the
  // operator can investigate — but don't throw. The visitor still sees
  // a populated badge.
  if (process.env.NODE_ENV !== "production") {
    if (!commitsOk) {
      console.warn(
        "[github-stats] commits fetch failed, using fallback:",
        (commitsResult as PromiseRejectedResult).reason,
      );
    }
    if (!coverageOk) {
      console.warn(
        "[github-stats] coverage fetch failed, using fallback:",
        (coverageResult as PromiseRejectedResult).reason,
      );
    }
  }

  return {
    commitsThisWeek,
    testCoveragePct,
    generatedAt: new Date().toISOString(),
    source: commitsOk && coverageOk ? "github" : "fallback",
    stale: false,
  };
}
