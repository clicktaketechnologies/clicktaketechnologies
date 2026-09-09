'use client'

/**
 * DesignRefresh — site-wide enhancement layer (mounted once in root layout).
 *
 * Activates three runtime behaviors that complement the static CSS in
 * globals.css → "DESIGN REFRESH v2":
 *
 *   1. Scroll reveal — IntersectionObserver watches every [data-nx-reveal]
 *      element and toggles the `.is-visible` class when it enters the
 *      viewport (one-shot, unobserves after first reveal).
 *
 *   2. Card spotlight — for every .nx-card / .nx-card-dark, updates the
 *      --mx / --my CSS custom properties on mousemove so the radial
 *      spotlight overlay (defined in CSS) follows the cursor.
 *
 *   3. Smooth anchor scroll — intercepts clicks on in-page anchor links
 *      (#...) and uses window.scrollTo with smooth behavior + the
 *      scroll-margin-top defined in CSS, so the sticky navbar never
 *      covers the section heading.
 *
 * All three behaviors respect prefers-reduced-motion (reveal elements
 * stay visible; spotlight + smooth scroll are skipped).
 *
 * This component renders nothing to the DOM — it only attaches listeners.
 *
 * Re-runs on every route change because Next.js App Router reuses the
 * root layout but content below it changes — new [data-nx-reveal]
 * elements appear and need to be observed.
 */
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function DesignRefresh() {
  const pathname = usePathname()

  // ─── Scroll reveal + card spotlight ───
  // Re-run on every pathname change so newly-mounted content gets observed.
  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const cleanups: Array<() => void> = []

    /* ─── 1. Scroll reveal ─── */
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nx-reveal]")
    )

    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add("is-visible"))
    } else if (revealEls.length > 0) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              el.classList.add("is-visible")
              io.unobserve(el)
            }
          })
        },
        {
          // Trigger when 12% of the element is visible — early enough that
          // the animation completes by the time the user finishes scrolling.
          threshold: 0.12,
          // Pre-reveal elements 80px before they enter the viewport, so the
          // animation starts smoothly instead of "popping in".
          rootMargin: "0px 0px -80px 0px",
        }
      )

      revealEls.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    /* ─── 2. Card spotlight ─── */
    if (!prefersReduced) {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>(".nx-card, .nx-card-dark")
      )

      cards.forEach((card) => {
        const handler = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          card.style.setProperty("--mx", `${x}%`)
          card.style.setProperty("--my", `${y}%`)
        }
        card.addEventListener("mousemove", handler)
        cleanups.push(() => card.removeEventListener("mousemove", handler))
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [pathname])

  // ─── Smooth anchor scroll ───
  // Attach once — this listener works for any anchor link anywhere on the site.
  useEffect(() => {
    if (typeof window === "undefined") return
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href")
      if (!href || href === "#" || href.length < 2) return

      const dest = document.querySelector(href)
      if (!dest) return

      e.preventDefault()
      dest.scrollIntoView({ behavior: "smooth", block: "start" })
      // Update URL hash without jumping.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", href)
      }
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}
