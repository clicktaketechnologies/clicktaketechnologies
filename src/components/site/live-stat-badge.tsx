"use client";

/**
 * <LiveStatBadge> — animated live metric badge for the homepage Hero.
 *
 * ────────────────────────────────────────────────────────────────────────
 * WHAT IT RENDERS
 * ────────────────────────────────────────────────────────────────────────
 * A small glassmorphic floating widget showing ONE live engineering
 * metric. Two variants are supported via the `statKey` prop:
 *
 *   statKey="coverage"  →  "98%  Test coverage"   (Build Pipeline widget)
 *   statKey="commits"    →  "+1,284  commits this week"  (Live Deploy widget)
 *
 * ────────────────────────────────────────────────────────────────────────
 * STATE MACHINE
 * ────────────────────────────────────────────────────────────────────────
 *
 *   mount
 *     │
 *     │   SSR HTML shipped with LIVE_STATS_FALLBACK value (instant paint)
 *     ▼
 *   isLoading=true ─────────►  skeleton placeholder animates in
 *     │
 *     │   useLiveStats() resolves
 *     ▼
 *   data arrives ───────────►  count-up animation from previous value → new value
 *     │
 *     │   tab loses focus, regains focus, 5-min poll tick
 *     ▼
 *   refetch ────────────────►  if new value: animate; if same: no-op
 *
 * On ANY error in the hook OR in this component's own render, the
 * outer <ErrorBoundary> renders <StaticBadge> with the fallback value.
 * The visitor never sees a broken widget.
 *
 * ────────────────────────────────────────────────────────────────────────
 * A11Y
 * ────────────────────────────────────────────────────────────────────────
 * The badge is a presentational element, not a button — it has no
 * interactive behaviour. `aria-label` exposes the current value to
 * screen readers, and `aria-live="polite"` announces updates when the
 * count-up animation finishes (so screen-reader users aren't bombarded
 * mid-animation).
 *
 * ────────────────────────────────────────────────────────────────────────
 * VISUAL DESIGN CONTRACT
 * ────────────────────────────────────────────────────────────────────────
 * The badge is intentionally a "floating glass" aesthetic to match
 * the existing Hero widgets — semi-transparent dark surface, 1px white
 * border, big drop shadow, slight float animation. The icon container
 * and accent color are passed in as props so the two badges can stay
 * visually distinct (blue TrendingUp for coverage, green Activity for
 * commits) without this component hardcoding them.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, type LucideIcon } from "lucide-react";
import { useLiveStats } from "@/hooks/use-live-stats";
import { ErrorBoundary } from "@/components/site/error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LIVE_STATS_FALLBACK,
  LIVE_STATS_LABELS,
  metricFormatters,
} from "@/lib/metrics";

type StatKey = "coverage" | "commits";

type Props = {
  statKey: StatKey;
  /** Container className — position the badge absolutely on the Hero. */
  className?: string;
};

/**
 * Per-variant presentation config. Lives here (not in metrics.ts) because
 * these are purely UI concerns — icon, accent colors, progress-bar fill.
 */
const VARIANT_CONFIG: Record<
  StatKey,
  {
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    /** Whether to render the trailing progress bar (coverage only). */
    showProgress: boolean;
    /** Float animation timing for the badge container. */
    floatDuration: number;
    floatDelay: number;
  }
> = {
  coverage: {
    icon: TrendingUp,
    iconBg: "rgba(19, 109, 255, 0.20)",
    iconColor: "#4A90D9",
    showProgress: true,
    floatDuration: 8,
    floatDelay: 0,
  },
  commits: {
    icon: Activity,
    iconBg: "rgba(0, 230, 118, 0.20)",
    iconColor: "#00e676",
    showProgress: false,
    floatDuration: 9,
    floatDelay: 1,
  },
};

/**
 * Pick the live value out of the LiveStats payload for the given key.
 */
function pickValue(stats: { commitsThisWeek: number; testCoveragePct: number }, key: StatKey): number {
  return key === "coverage" ? stats.testCoveragePct : stats.commitsThisWeek;
}

/**
 * Format the value for display. Coverage → "98%"; commits → "+1,284".
 */
function formatValue(value: number, key: StatKey): string {
  if (key === "coverage") return metricFormatters.percent(value);
  return metricFormatters.signed(value);
}

/**
 * Count-up animation — animates a number from `from` to `to` over
 * `durationMs`, calling `onFrame` with each intermediate value.
 *
 * Uses `requestAnimationFrame` with an ease-out curve so the animation
 * feels springy without a heavy animation library. Cancelled cleanly
 * on unmount or when a new value supersedes the previous animation.
 */
function animateCountUp(
  from: number,
  to: number,
  durationMs: number,
  onFrame: (v: number) => void,
): () => void {
  if (from === to) {
    onFrame(to);
    return () => {};
  }

  let rafId = 0;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / durationMs, 1);
    // ease-out cubic — starts fast, decelerates.
    const eased = 1 - Math.pow(1 - t, 3);
    const current = Math.round(from + (to - from) * eased);
    onFrame(current);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    }
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}

/**
 * Inner component that actually consumes the hook. This is split out
 * so the outer <LiveStatBadge> can wrap it in <ErrorBoundary> — if
 * the inner render throws, the boundary renders <StaticBadge> instead.
 */
function LiveStatBadgeInner({ statKey, className }: Props) {
  const { data, isLoading } = useLiveStats();
  const config = VARIANT_CONFIG[statKey];
  const labels = LIVE_STATS_LABELS[statKey];
  const Icon = config.icon;

  // Local state for the animated value. Initial = fallback so SSR HTML
  // matches the first client render (no hydration mismatch).
  const [displayValue, setDisplayValue] = useState(() =>
    pickValue(LIVE_STATS_FALLBACK, statKey),
  );

  // Ref to the latest value the hook has emitted — used to chain
  // animations when a refetch lands a new value.
  const lastValueRef = useRef<number>(displayValue);

  useEffect(() => {
    const newValue = pickValue(data, statKey);
    if (newValue === lastValueRef.current) return;

    // Cancel any in-flight animation implicitly by starting a new one —
    // animateCountUp returns a cancel function we store.
    const stop = animateCountUp(
      lastValueRef.current,
      newValue,
      900, // ~1s — long enough to feel intentional, short enough not to drag.
      (v) => setDisplayValue(v),
    );
    lastValueRef.current = newValue;
    return stop;
  }, [data, statKey]);

  const formatted = formatValue(displayValue, statKey);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: config.floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: config.floatDelay,
      }}
      className={`rounded-2xl p-4 backdrop-blur-md border border-white/15 ${className ?? ""}`}
      style={{
        background: "rgba(16,8,32,0.85)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
      }}
      aria-label={`${labels.ariaLabel}: ${formatted}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="h-7 w-7 rounded-lg grid place-items-center"
          style={{ background: config.iconBg }}
        >
          <Icon className="h-4 w-4" style={{ color: config.iconColor }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/60">
          {labels.title}
        </span>
      </div>

      {isLoading ? (
        // Skeleton — same dimensions as the final number so layout
        // doesn't shift when the value arrives.
        <Skeleton className="h-8 w-24 bg-white/15" />
      ) : (
        <div
          className="text-2xl font-black text-white"
          aria-live="polite"
        >
          {formatted}
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[10px] text-white/50 mt-1">
        {statKey === "commits" && (
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        )}
        {labels.caption}
      </div>

      {/* Progress bar — only for the coverage badge (the commits badge
          has no natural "progress" representation). Width animates with
          the count-up so the bar fills in sync with the number. */}
      {config.showProgress && (
        <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden mt-2">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{
              width: `${Math.min(displayValue, 100)}%`,
              background: "linear-gradient(90deg, #FF53A9, #9B3DFF)",
            }}
          />
        </div>
      )}

      {/* Tiny "(cached)" indicator when the data is stale or came from
          the fallback path. Surfaces API health without taking space. */}
      {data.source === "fallback" && !isLoading && (
        <div className="mt-2 text-[9px] font-mono uppercase tracking-wider text-white/30">
          cached
        </div>
      )}
    </motion.div>
  );
}

/**
 * Static fallback rendered by <ErrorBoundary> when the live badge
 * throws during render. Uses the same visual shell but with the
 * hardcoded LIVE_STATS_FALLBACK value, so a visitor who would have
 * seen a broken widget instead sees a populated one.
 */
function StaticBadge({ statKey, className }: Props) {
  const config = VARIANT_CONFIG[statKey];
  const labels = LIVE_STATS_LABELS[statKey];
  const Icon = config.icon;
  const value = pickValue(LIVE_STATS_FALLBACK, statKey);
  const formatted = formatValue(value, statKey);

  return (
    <div
      className={`rounded-2xl p-4 backdrop-blur-md border border-white/15 ${className ?? ""}`}
      style={{
        background: "rgba(16,8,32,0.85)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
      }}
      aria-label={`${labels.ariaLabel}: ${formatted}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="h-7 w-7 rounded-lg grid place-items-center"
          style={{ background: config.iconBg }}
        >
          <Icon className="h-4 w-4" style={{ color: config.iconColor }} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/60">
          {labels.title}
        </span>
      </div>
      <div className="text-2xl font-black text-white">{formatted}</div>
      <div className="flex items-center gap-1.5 text-[10px] text-white/50 mt-1">
        {statKey === "commits" && (
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        )}
        {labels.caption}
      </div>
      {config.showProgress && (
        <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden mt-2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(value, 100)}%`,
              background: "linear-gradient(90deg, #FF53A9, #9B3DFF)",
            }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Public component. Wraps the live badge in an error boundary so any
 * render-time exception in the inner component degrades to the static
 * fallback instead of crashing the Hero.
 */
export function LiveStatBadge(props: Props) {
  return (
    <ErrorBoundary fallback={<StaticBadge {...props} />}>
      <LiveStatBadgeInner {...props} />
    </ErrorBoundary>
  );
}
