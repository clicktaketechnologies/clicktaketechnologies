'use client'

// ─────────────────────────────────────────────────────────────────────────────
// <AbTest> — client-side A/B test variant renderer.
//
// USAGE:
//   <AbTest experimentKey="hero-cta-text" variants={{
//     A: <Link href="/contact">Book Free Consultation</Link>,
//     B: <Link href="/contact">Get Your Free Audit →</Link>,
//   }} />
//
// BEHAVIOR:
//   1. On server render (SSG / SSR), the component renders the CONTROL
//      variant (the `A` key, or the variant flagged with isControl). This
//      guarantees that React's hydration tree matches the server HTML —
//      no hydration mismatch warnings.
//
//   2. On mount (client-only), the component:
//        a. Reads the ct_visitor cookie via getVisitorIdFromBrowser().
//        b. If no cookie — bail out, show control. The middleware should
//           have set the cookie on the first request, but if JS runs
//           before the cookie is set we just show control (safe default).
//        c. Fetches the experiment config from /api/ab-test/bootstrap
//           (cached — one fetch per page load covers all <AbTest>
//           instances on the page).
//        d. Computes the deterministic variant via getVariantForVisitor().
//        e. If the variant differs from control, swaps the rendered JSX
//           in place (with a brief fade-in to mask the swap).
//        f. Fires a POST /api/ab-test/expose (fire-and-forget, beacon on
//           unload if possible) so the server records the exposure.
//
//   3. Reduced-motion users get the control variant with no animation.
//
//   4. If the experiment key isn't found in the bootstrap response (e.g.
//      it was paused in admin), the control variant renders and no
//      exposure is recorded.
//
// HYDRATION SAFETY:
//   The component deliberately renders control on the server, then
//   conditionally swaps on the client. This means there is a brief
//   flash of control before variant B appears. We mitigate this with:
//     - An opacity-0 → opacity-100 transition on the swapped content
//     - A short 150ms delay before swap (waits for bootstrap fetch)
//   For most CTAs this is invisible to the user. For above-the-fold
//   hero CTAs where flash would be unacceptable, use `waitForHydration`
//   to render an invisible placeholder until the variant is ready.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react'
import {
  getVisitorIdFromBrowser,
  getVariantForVisitor,
  type WeightedVariant,
} from '@/lib/ab-testing/client'

// ─── Types ───────────────────────────────────────────────────────────────────

type VariantMap = Record<string, ReactNode>

type Props = {
  /** Unique experiment key (matches ab_experiments.key). */
  experimentKey: string
  /** Map of variant key → JSX. The `A` key (or the one flagged as control) renders on the server. */
  variants: VariantMap
  /**
   * If true, render nothing until the variant is determined client-side.
   * Eliminates flash-of-control-variant at the cost of an empty paint
   * for ~50–150ms. Use for above-the-fold hero CTAs where flash matters.
   */
  waitForHydration?: boolean
  /** Optional className on the wrapper div. */
  className?: string
}

// ─── Bootstrap cache (module-scoped singleton) ───────────────────────────────
// One fetch per page load covers every <AbTest> on the page. The response
// is a map of experimentKey → { experimentId, variants: [{ key, id, weight, isControl }] }.

type BootstrapEntry = {
  experimentId: string
  variants: Array<{ key: string; id: string; weight: number; isControl: boolean }>
}

type BootstrapResponse = Record<string, BootstrapEntry>

let bootstrapPromise: Promise<BootstrapResponse> | null = null

function fetchBootstrap(): Promise<BootstrapResponse> {
  if (bootstrapPromise) return bootstrapPromise
  bootstrapPromise = fetch('/api/ab-test/bootstrap', {
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => {
      // Network failure → return empty map, all AbTests render control.
      return {} as BootstrapResponse
    })
    .then((data: BootstrapResponse) => {
      // Cache for 60 seconds. After that, re-fetch on next mount.
      // This lets admins pause experiments and have it take effect
      // within a minute on returning visitors.
      setTimeout(() => { bootstrapPromise = null }, 60_000)
      return data
    })
  return bootstrapPromise
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AbTest({
  experimentKey,
  variants,
  waitForHydration = false,
  className = '',
}: Props) {
  const [assignedKey, setAssignedKey] = useState<string | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Detect prefers-reduced-motion once on mount.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  // Compute the control key: prefer the `A` key, otherwise the first key
  // in the variants map. (We don't know which variant isControl until the
  // bootstrap response arrives — but on the server we need a stable pick.)
  const controlKey = useMemo(() => {
    if ('A' in variants) return 'A'
    const keys = Object.keys(variants)
    return keys[0]
  }, [variants])

  useEffect(() => {
    if (reducedMotion) return // Honor reduced-motion: keep control variant

    let cancelled = false
    const visitorId = getVisitorIdFromBrowser()
    if (!visitorId) return

    fetchBootstrap().then((data) => {
      if (cancelled) return
      const entry = data[experimentKey]
      if (!entry) return // Experiment is paused or doesn't exist — render control

      // Compute deterministic variant.
      const weighted: WeightedVariant[] = entry.variants.map((v) => ({
        key: v.key,
        weight: v.weight,
      }))
      const computed = getVariantForVisitor(visitorId, entry.experimentId, weighted)

      // If the computed variant isn't in our local map (admin added a new
      // variant we didn't ship code for), fall back to control.
      if (!(computed in variants)) return

      setAssignedKey(computed)

      // Fire-and-forget exposure recording. Use sendBeacon if available
      // so the request survives page navigation. Otherwise plain fetch.
      const payload = JSON.stringify({
        experimentId: entry.experimentId,
        variantId: entry.variants.find((v) => v.key === computed)?.id,
        visitorId,
        path: typeof window !== 'undefined' ? window.location.pathname : null,
      })
      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: 'application/json' })
          navigator.sendBeacon('/api/ab-test/expose', blob)
        } else {
          void fetch('/api/ab-test/expose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          })
        }
      } catch {
        // Best-effort — exposure tracking failure is non-fatal.
      }
    })

    return () => { cancelled = true }
  }, [experimentKey, variants, reducedMotion])

  // Decide which variant to render.
  const renderKey = assignedKey ?? controlKey
  const showContent = !waitForHydration || assignedKey !== null || reducedMotion

  // If we're swapping from control to a different variant post-hydration,
  // fade in the new content to mask the swap.
  const isSwapped = assignedKey !== null && assignedKey !== controlKey

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        opacity: showContent ? 1 : 0,
        transition: reducedMotion ? 'none' : 'opacity 150ms ease-out',
      }}
      data-ab-test={experimentKey}
      data-ab-variant={renderKey}
    >
      {variants[renderKey] ?? variants[controlKey]}
      {/* Hidden marker for dev tools — lets us verify which variant rendered. */}
      {process.env.NODE_ENV === 'development' && isSwapped && (
        <span
          aria-hidden
          style={{ position: 'absolute', left: -9999, fontSize: 0 }}
        >
          [AB:{experimentKey}:{renderKey}]
        </span>
      )}
    </span>
  )
}
