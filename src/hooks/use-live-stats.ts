"use client";

/**
 * useLiveStats — client hook for the live engineering-metrics badges.
 *
 * ────────────────────────────────────────────────────────────────────────
 * RESPONSIBILITIES
 * ────────────────────────────────────────────────────────────────────────
 *   1. Fetch `/api/stats/github` once on mount.
 *   2. Re-fetch when the browser tab regains focus (so a returning
 *      visitor sees fresh numbers without manually reloading).
 *   3. Re-fetch every 5 minutes while the tab stays open (so a long-
 *      running session doesn't show stale data).
 *   4. Gracefully handle every failure mode — the hook NEVER throws.
 *      On network error, 5xx, malformed JSON, or abort, it returns
 *      `LIVE_STATS_FALLBACK` and sets `error` so the UI can render a
 *      "(cached)" indicator.
 *   5. Hydration-safe — initial render returns the fallback synchronously
 *      (matches the SSR HTML), then the live value arrives client-side.
 *
 * ────────────────────────────────────────────────────────────────────────
 * WHY NOT SWR / TANSTACK QUERY?
 * ────────────────────────────────────────────────────────────────────────
 * The ClickTake codebase doesn't use either library — every existing
 * client fetch is an ad-hoc `fetch()` in `useEffect`. Adding a new
 * dependency for one hook is overkill. This hook replicates the small
 * subset of SWR features we actually need (focus revalidation, polling,
 * error state, deduplication via the AbortController).
 *
 * ────────────────────────────────────────────────────────────────────────
 * DEDUPLICATION
 * ────────────────────────────────────────────────────────────────────────
 * If two `<LiveStatBadge>` instances mount on the same page (the Hero
 * has two — commits + coverage), each one calls `useLiveStats()`. They
 * share the same `/api/stats/github` response via the browser's HTTP
 * cache (the route sets `s-maxage=3600`), so only one network request
 * actually hits the wire. The second caller just reads the same
 * cached response. No client-side singleton store needed.
 */

import { useEffect, useRef, useState } from "react";
import { LIVE_STATS_FALLBACK, type LiveStats } from "@/lib/metrics";

/** How often to refetch while the tab is open and focused. */
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * The shape returned to consumers. `data` is always defined — it
 * starts as the fallback and gets replaced when the live fetch lands.
 * `isLoading` is true only on the very first render (before the first
 * fetch resolves); subsequent refetches flip `isStale` instead, so
 * the UI can keep showing the previous value.
 */
export type UseLiveStatsResult = {
  data: LiveStats;
  isLoading: boolean;
  isStale: boolean;
  error: Error | null;
};

/**
 * Fetch + parse the live-stats endpoint with full error containment.
 * Returns a `LiveStats` on success or throws on any failure (the caller
 * catches). Type-narrowed so the catch handler doesn't need to know
 * what kind of error it was.
 */
async function fetchLiveStats(signal: AbortSignal): Promise<LiveStats> {
  const res = await fetch("/api/stats/github", {
    signal,
    // Always hit the browser cache first; the route's Cache-Control
    // headers govern freshness. `no-store` would force a network round
    // trip on every mount, defeating the edge cache.
    cache: "default",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`/api/stats/github returned ${res.status}`);
  }

  const json = (await res.json()) as Partial<LiveStats>;

  // Validate the payload shape — never trust the wire.
  if (
    typeof json.commitsThisWeek !== "number" ||
    typeof json.testCoveragePct !== "number" ||
    typeof json.generatedAt !== "string"
  ) {
    throw new Error("Malformed LiveStats payload");
  }

  return {
    commitsThisWeek: json.commitsThisWeek,
    testCoveragePct: json.testCoveragePct,
    generatedAt: json.generatedAt,
    source: json.source === "github" ? "github" : "fallback",
    stale: Boolean(json.stale),
  };
}

export function useLiveStats(): UseLiveStatsResult {
  // Initial state = fallback. This is what SSR renders, and what the
  // client renders before the first fetch resolves. Keeping it stable
  // prevents hydration mismatch warnings.
  const [data, setData] = useState<LiveStats>(() => ({
    commitsThisWeek: LIVE_STATS_FALLBACK.commitsThisWeek,
    testCoveragePct: LIVE_STATS_FALLBACK.testCoveragePct,
    generatedAt: new Date(0).toISOString(),
    source: "fallback",
    stale: false,
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Ref to the in-flight AbortController so we can cancel on unmount
  // or when a new refetch supersedes the previous one.
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Cancel any previous in-flight request.
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const stats = await fetchLiveStats(controller.signal);
        if (cancelled) return;

        setData(stats);
        setError(null);
        setIsStale(stats.source === "fallback" || stats.stale);
      } catch (err) {
        if (cancelled || controller.signal.aborted) return;

        // Don't clear `data` — keep the previous value visible and
        // just mark as stale so the UI shows "(cached)".
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsStale(true);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    // Initial fetch on mount.
    run();

    // Refetch when the tab regains focus. `visibilitychange` is more
    // reliable than `focus` because it catches alt-tab and dock clicks.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        run();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Refetch every POLL_INTERVAL_MS. setInterval (not setTimeout chain)
    // is intentional here — we want the next tick to be N ms after the
    // *previous tick*, not after the previous fetch resolved.
    const intervalId = window.setInterval(run, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearInterval(intervalId);
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  return { data, isLoading, isStale, error };
}
