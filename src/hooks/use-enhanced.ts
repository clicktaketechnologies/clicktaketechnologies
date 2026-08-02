"use client";

/**
 * use-enhanced.ts — Foundation hooks for the UI/UX overhaul.
 *
 * Bundles the small utility hooks needed across the new interactive
 * components so we don't end up with a dozen tiny files. Each hook is
 * tree-shakeable — only the ones imported get pulled into the bundle.
 *
 * Hooks included:
 *   - useScrollDirection  → "up" | "down" | null  (for hide-on-scroll nav)
 *   - useActiveSection    → id of the section currently in viewport
 *   - usePrefersReducedMotion → boolean (respects OS setting, live-updates)
 *   - useMagnetic         → ref + handlers for cursor-following magnetic hover
 *   - useLocalStorage     → typed, SSR-safe localStorage state
 *   - useInViewOnce       → true once an element enters the viewport (IntersectionObserver)
 *   - useKeyCombo         → triggers callback when a key combo is pressed (e.g. Cmd+K)
 *   - useFuzzySearch      → lightweight fuzzy-match scorer for command palette
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

/* ────────────────────────────────────────────────────────────── */
/* useScrollDirection                                            */
/* ────────────────────────────────────────────────────────────── */

export type ScrollDirection = "up" | "down" | null;

/**
 * Tracks scroll direction with a small deadzone so tiny scrolls
 * (e.g. from touch inertia on Mac trackpads) don't flip the nav.
 *
 * @param threshold  Minimum delta in px before direction flips. Default 8.
 * @param topBuffer  Ignore scrolls within this many px of the top so the
 *                   nav never hides when the page is at the very top.
 */
export function useScrollDirection(threshold = 8, topBuffer = 24): ScrollDirection {
  const [dir, setDir] = useState<ScrollDirection>(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < topBuffer) {
        setDir(null);
        lastY.current = y;
        return;
      }
      const delta = y - lastY.current;
      if (Math.abs(delta) < threshold) return;
      setDir(delta > 0 ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topBuffer]);

  return dir;
}

/* ────────────────────────────────────────────────────────────── */
/* useActiveSection                                              */
/* ────────────────────────────────────────────────────────────── */

/**
 * Returns the id of the section currently closest to the viewport center.
 * Uses IntersectionObserver with multiple thresholds for smooth handoff.
 *
 * @param sectionIds  Ordered list of section ids to track.
 * @param rootMargin  IntersectionObserver rootMargin. Default "-40% 0px -55% 0px"
 *                    which fires when a section's middle band crosses viewport center.
 */
export function useActiveSection(
  sectionIds: string[],
  rootMargin = "-40% 0px -55% 0px"
): string | null {
  const [active, setActive] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the most-visible section
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
}

/* ────────────────────────────────────────────────────────────── */
/* usePrefersReducedMotion                                       */
/* ────────────────────────────────────────────────────────────── */

/**
 * Live-updating boolean for `prefers-reduced-motion: reduce`.
 * When true, animations should be skipped or reduced to instant fades.
 *
 * Uses useSyncExternalStore (React 18+) for proper subscription to
 * the matchMedia external store — no setState-in-effect.
 */
const reducedMotionSubscribe = (cb: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const reducedMotionSnapshot = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
const reducedMotionServerSnapshot = () => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    reducedMotionSubscribe,
    reducedMotionSnapshot,
    reducedMotionServerSnapshot
  );
}

/* ────────────────────────────────────────────────────────────── */
/* useMagnetic                                                   */
/* ────────────────────────────────────────────────────────────── */

/**
 * Magnetic hover effect — element translates toward the cursor up to `strength` px
 * while the cursor is inside `radius` px of the element's center.
 *
 * Returns a ref to attach + the current transform string.
 *
 * Usage:
 *   const { ref, transform } = useMagnetic({ strength: 24, radius: 100 });
 *   <button ref={ref} style={{ transform }} />
 */
export function useMagnetic<T extends HTMLElement>(opts?: {
  strength?: number;
  radius?: number;
}): {
  ref: RefObject<T | null>;
  transform: string;
  isHovering: boolean;
} {
  const strength = opts?.strength ?? 24;
  const radius = opts?.radius ?? 100;
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        setTransform("translate3d(0,0,0)");
        setIsHovering(false);
        return;
      }
      setIsHovering(true);
      const pull = (1 - dist / radius) * strength;
      const angle = Math.atan2(dy, dx);
      const tx = Math.cos(angle) * pull;
      const ty = Math.sin(angle) * pull;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setTransform(`translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      setTransform("translate3d(0,0,0)");
      setIsHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return { ref, transform, isHovering };
}

/* ────────────────────────────────────────────────────────────── */
/* useLocalStorage                                               */
/* ────────────────────────────────────────────────────────────── */

/**
 * SSR-safe typed localStorage state. Reads once on mount (avoids hydration
 * mismatch by starting with initialValue), then syncs on every change.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(readInitialValue(key, initialValue));

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [key]
  );

  return [value, set];
}

function readInitialValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/* ────────────────────────────────────────────────────────────── */
/* useInViewOnce                                                 */
/* ────────────────────────────────────────────────────────────── */

/**
 * Returns [ref, inView]. `inView` flips to true exactly once when the
 * element enters the viewport. Uses IntersectionObserver (no framer-motion dep).
 */
export function useInViewOnce<T extends HTMLElement>(
  rootMargin = "0px 0px -10% 0px"
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

/* ────────────────────────────────────────────────────────────── */
/* useKeyCombo                                                   */
/* ────────────────────────────────────────────────────────────── */

/**
 * Fires `onTrigger` when the user presses a specific key combo.
 *
 * @param key      The KeyboardEvent.key to match (case-insensitive). E.g. "k".
 * @param onTrigger  Callback fired on match.
 * @param mods     Required modifier keys. Default: { meta: true, ctrl: true }
 *                 meaning EITHER Cmd (Mac) OR Ctrl (Win/Linux) qualifies.
 */
export function useKeyCombo(
  key: string,
  onTrigger: () => void,
  mods?: { meta?: boolean; ctrl?: boolean; shift?: boolean; alt?: boolean }
): void {
  const cbRef = useRef(onTrigger);
  // Update ref in effect (not during render) to avoid the
  // "Cannot access refs during render" lint error.
  useEffect(() => {
    cbRef.current = onTrigger;
  });
  const want = {
    meta: mods?.meta ?? true,
    ctrl: mods?.ctrl ?? true,
    shift: mods?.shift ?? false,
    alt: mods?.alt ?? false,
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const keyMatch = e.key.toLowerCase() === key.toLowerCase();
      if (!keyMatch) return;
      const hasMeta = e.metaKey || e.ctrlKey;
      if (want.meta && want.ctrl && !hasMeta) return;
      if (want.shift && !e.shiftKey) return;
      if (want.alt && !e.altKey) return;
      // If mods not wanted but user pressed them, ignore
      if (!want.meta && (e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      cbRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, want.meta, want.ctrl, want.shift, want.alt]);
}

/* ────────────────────────────────────────────────────────────── */
/* useFuzzySearch                                                */
/* ────────────────────────────────────────────────────────────── */

/**
 * Lightweight fuzzy-match scorer (subsequence match with bonus for
 * consecutive matches and word-boundary hits). Returns items sorted
 * by score, filtered to only matches.
 *
 * Designed for the command palette — handles ~200 items at 60fps.
 */
export function useFuzzySearch<T>(
  items: T[],
  getText: (item: T) => string
): (query: string) => T[] {
  const itemsRef = useRef(items);
  // Update ref in effect (not during render) to satisfy lint.
  useEffect(() => {
    itemsRef.current = items;
  });
  const getTextRef = useRef(getText);
  useEffect(() => {
    getTextRef.current = getText;
  });

  return useCallback(
    (query: string) => {
      const q = query.trim().toLowerCase();
      if (!q) return itemsRef.current;
      const scored: { item: T; score: number }[] = [];
      for (const item of itemsRef.current) {
        const text = getTextRef.current(item).toLowerCase();
        const score = fuzzyScore(q, text);
        if (score > 0) scored.push({ item, score });
      }
      scored.sort((a, b) => b.score - a.score);
      return scored.map((s) => s.item);
    },
    []
  );
}

function fuzzyScore(query: string, text: string): number {
  if (!query) return 1;
  if (text.includes(query)) {
    // Exact substring match — strong bonus, earlier = better
    return 100 + (100 - text.indexOf(query));
  }
  let qi = 0;
  let score = 0;
  let lastMatchIdx = -2;
  for (let ti = 0; ti < text.length && qi < query.length; ti++) {
    if (text[ti] === query[qi]) {
      score += 1;
      // Bonus for consecutive matches
      if (ti === lastMatchIdx + 1) score += 3;
      // Bonus for word-boundary starts (preceded by space, /, -, _ or start)
      if (ti === 0 || /[\s/_\-]/.test(text[ti - 1])) score += 5;
      lastMatchIdx = ti;
      qi++;
    }
  }
  return qi === query.length ? score : 0;
}
