'use client'

import { useEffect, useRef } from "react"

/**
 * ScrollProgress — thin gradient bar pinned to the top of the viewport that
 * fills as the user scrolls down. Matches the clicktake-3d-v3 reference.
 *
 * Brand gradient: --ct-pink → --ct-purple (linear-gradient 135deg).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    // Respect reduced motion — render the bar but never animate it.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let ticking = false
    const update = () => {
      const t = document.documentElement.scrollTop
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? (t / h) * 100 : 0
      bar.style.width = `${pct}%`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div ref={barRef} className="ct-scroll-progress" aria-hidden="true" />
}

export default ScrollProgress
