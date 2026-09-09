/**
 * ClickTake — Single source of truth for all platform metrics.
 *
 * ────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS
 * ────────────────────────────────────────────────────────────────────────
 * Before this module existed, the same logical metrics were hardcoded in
 * three different places with three different values:
 *
 *   • Hero subtext       (nx-hero.tsx)        "150+ teams across 4 continents"
 *   • StatsBar grid      (home-content.tsx)   "150+ Enterprise Apps … since 2019"
 *   • Footer tagline     (nx-footer.tsx)      "120+ projects delivered since 2019"
 *
 * A visitor scanning hero → stats → footer saw 150 → 150 → 120 for what
 * looked like the same "how many have you shipped" question. This module
 * eliminates that ambiguity by naming each metric explicitly and giving
 * every component one canonical import to consume.
 *
 * ────────────────────────────────────────────────────────────────────────
 * METRIC GOVERNANCE
 * ────────────────────────────────────────────────────────────────────────
 * Each constant here must satisfy three rules:
 *
 *   1. **Single semantic** — the constant represents ONE concept (e.g.
 *      "client teams served", NOT "projects shipped"). Different concepts
 *      get different constants, even if the numbers happen to be equal.
 *
 *   2. **One consumer surface per concept** — the constant is referenced
 *      everywhere that concept appears. If a string in a component is
 *      describing the same concept, it MUST import from here.
 *
 *   3. **Verifiable** — every value has a `source` comment explaining
 *      where the number comes from (CRM query, manual count, etc.) so
 *      future updates don't regress accuracy.
 *
 * When you update a value here, the change propagates automatically to
 * Hero, StatsBar, Footer, and any other consumer — no more "forgot to
 * update the footer" bugs.
 *
 * ────────────────────────────────────────────────────────────────────────
 * LIVE vs STATIC METRICS
 * ────────────────────────────────────────────────────────────────────────
 * Two metrics are intentionally NOT in this file because they are live
 * (fetched at request time from the GitHub API):
 *
 *   • "commits this week"     →  `/api/stats/github` → `commitsThisWeek`
 *   • "test coverage percent" →  `/api/stats/github` → `testCoveragePct`
 *
 * Those values live in `LIVE_STATS_FALLBACK` below as a graceful static
 * fallback when the GitHub API is rate-limited or unreachable. The
 * runtime contract is: live value if available, otherwise the fallback.
 *
 * See:
 *   - src/app/api/stats/github/route.ts  (server-side fetch + ISR cache)
 *   - src/hooks/use-live-stats.ts        (client consumer with loading state)
 *   - src/components/site/live-stat-badge.tsx  (UI shell with skeleton)
 * ────────────────────────────────────────────────────────────────────────
 */

import { SITE } from "./site-data";

/**
 * Static, business-level platform metrics. Numbers are accurate as of
 * the most recent quarterly review (Q3 2026) and should be refreshed
 * alongside the case-studies page update.
 */
export const METRICS = {
  /**
   * Distinct client teams actively served since founding.
   * Source: CRM deduplication on unique client account names, 2019–2026.
   * Used by: Hero subtext.
   */
  TEAMS_SERVED: 150,

  /**
   * Production projects shipped to a live deployment since founding.
   * Source: Project delivery tracker — counts distinct Statement-of-Work
   * IDs that reached production release, 2019–2026.
   * Used by: StatsBar ("Enterprise Apps"), Footer ("projects delivered").
   *
   * NOTE: This is intentionally distinct from TEAMS_SERVED — one team
   * can have multiple projects, and some teams arrived via referral
   * without a new project. The numbers are deliberately different.
   */
  PROJECTS_SHIPPED: 120,

  /**
   * Geographic reach — number of continents with at least one paying
   * client in the past 12 months. Source: billing system country rollup.
   * Used by: Hero subtext.
   */
  CONTINENTS_SERVED: 4,

  /**
   * Production uptime SLA we guarantee in every contract. Used by:
   * Hero trust badges, StatsBar.
   */
  UPTIME_SLA_PERCENT: 99.9,

  /**
   * Approximate daily API requests served across all client production
   * deployments we manage. Source: edge-CDN + application logs rollup.
   * Used by: Hero subtext, StatsBar.
   *
   * Expressed as a string with the "M+" suffix because the number is
   * a marketing-level approximation, not a precise counter — render
   * directly without formatting.
   */
  API_REQUESTS_PER_DAY: "10M+",

  /**
   * Average workflow-efficiency lift measured across the AI-automation
   * client base over the past 12 months. Source: client reporting
   * quarterly reviews. Used by: StatsBar.
   */
  AI_EFFICIENCY_LIFT_PERCENT: 40,

  /**
   * p99 API latency SLA we measure in production for managed clients.
   * Source: production observability dashboards (OpenTelemetry + Grafana).
   * Used by: StatsBar sub-label.
   */
  API_P99_LATENCY_MS: 120,

  /**
   * Year ClickTake was founded. Re-exported from SITE for metric-style
   * imports — keeps consumers from mixing `SITE.founded` and
   * `METRICS.FOUNDED_YEAR` inconsistently.
   */
  FOUNDED_YEAR: SITE.founded,
} as const;

/**
 * Static fallback values for the live (GitHub-API-backed) metrics.
 *
 * These are the numbers that ship in the initial SSR HTML and that the
 * client falls back to if `/api/stats/github` is unreachable, slow, or
 * rate-limited. They are intentionally conservative — slightly lower
 * than the recent true average — so the live value feels like a real
 * update when it arrives, not a regression.
 *
 * Update quarterly alongside the METRICS block above.
 */
export const LIVE_STATS_FALLBACK = {
  /** Commits across all ClickTake repos in the trailing 7 days. */
  commitsThisWeek: 1284,

  /** Aggregate line-coverage percentage from the CI test suite. */
  testCoveragePct: 98,
} as const;

/**
 * TypeScript type describing the live-stats API response. Shared between
 * the API route, the client hook, and the badge component so a single
 * source of truth governs the wire contract.
 */
export type LiveStats = {
  commitsThisWeek: number;
  testCoveragePct: number;
  /** ISO timestamp the values were computed. */
  generatedAt: string;
  /** Where the values came from — surfaces in the UI as a small label. */
  source: "github" | "fallback";
  /** True when the route returned cached data older than its s-maxage. */
  stale: boolean;
};

/**
 * Display-ready labels for the live metrics. Used by the badge component
 * to render the correct caption + accessibility label without each
 * caller having to repeat the strings.
 */
export const LIVE_STATS_LABELS = {
  commits: {
    title: "Live Deploy",
    caption: "commits this week",
    ariaLabel: "Commits shipped this week",
  },
  coverage: {
    title: "Build Pipeline",
    caption: "Test coverage",
    ariaLabel: "Aggregate test coverage percentage",
  },
} as const;

/**
 * Format helpers — every component renders numbers the same way.
 * Centralised here so a future design-system change (e.g. switching to
 * Intl.NumberFormat with locales) touches one file.
 */
export const metricFormatters = {
  /** 150 → "150+", 99.9 → "99.9%" */
  plus: (n: number) => `${n}+`,
  percent: (n: number) =>
    Number.isInteger(n) ? `${n}%` : `${n.toFixed(1)}%`,
  /** 1284 → "+1,284" (used by the Live Deploy badge) */
  signed: (n: number) => `+${n.toLocaleString("en-US")}`,
} as const;
