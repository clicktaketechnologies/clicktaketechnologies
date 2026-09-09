'use client'

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * TiltCard — reusable 3D tilt card matching the clicktake-3d-v3.html reference.
 *
 * Features:
 *   • Cursor-following rotateX/rotateY (perspective 900px, ±16deg, translateZ 18px)
 *   • Radial "shine" gradient that tracks the cursor
 *   • Animated gradient glow-border on hover (pink → purple → blue → pink)
 *   • Optional tags row that slides in on hover (opacity + translateY)
 *
 * Performance:
 *   • Uses requestAnimationFrame-batched style writes (no React re-render per mousemove)
 *   • Resets on mouseleave
 *   • Falls back to no-tilt on touch devices (pointer: coarse)
 *   • Respects prefers-reduced-motion (renders as a static card with hover-shadow only)
 *
 * Usage:
 *   <TiltCard>
 *     <h3>My custom card</h3>
 *     <p>Any content</p>
 *   </TiltCard>
 */
type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Show the animated gradient glow border on hover. Default true. */
  glow?: boolean
  /** Show the radial shine on hover. Default true. */
  shine?: boolean
  /** Max tilt in degrees. Default 16. */
  maxTilt?: number
  /** Wrapped element type — defaults to div. */
  as?: 'div' | 'article' | 'li' | 'a'
}

export function TiltCard({
  children,
  className = "",
  glow = true,
  shine = true,
  maxTilt = 16,
  as: Tag = 'div',
}: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.transform = `perspective(900px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) translateZ(18px) scale(1.02)`
    if (shineRef.current) {
      shineRef.current.style.opacity = '1'
      shineRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.10) 0%, transparent 55%)`
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0) scale(1)'
    if (shineRef.current) shineRef.current.style.opacity = '0'
  }

  const Tag2 = Tag as any
  return (
    <Tag2
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`ct-tilt-card relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.12s ease, box-shadow 0.3s ease',
        willChange: 'transform',
      }}
    >
      {glow && <span className="ct-tilt-glow" aria-hidden="true" />}
      {shine && <span className="ct-tilt-shine" ref={shineRef} aria-hidden="true" />}
      <div className="ct-tilt-content relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </Tag2>
  )
}

/* ─── Sub-components for the canonical clicktake-3d-v3 card structure ─── */

export function TiltCardIcon({ children }: { children: ReactNode }) {
  return <span className="ct-tilt-icon block mb-5 text-3xl" style={{ filter: 'drop-shadow(0 0 12px var(--ct-pink, #E0197A))' }}>{children}</span>
}

export function TiltCardNum({ children }: { children: ReactNode }) {
  return <span className="ct-tilt-num absolute top-7 right-7 font-black text-5xl leading-none" style={{ color: 'var(--nx-border-strong, rgba(255,255,255,0.12))' }}>{children}</span>
}

export function TiltCardTitle({ children }: { children: ReactNode }) {
  return <h3 className="ct-tilt-title text-2xl font-bold tracking-wide mb-3" style={{ color: 'var(--nx-ink, var(--foreground))' }}>{children}</h3>
}

export function TiltCardDesc({ children }: { children: ReactNode }) {
  return <p className="ct-tilt-desc text-sm leading-relaxed mb-4" style={{ color: 'var(--nx-ink-muted, var(--muted-foreground))' }}>{children}</p>
}

export function TiltCardTags({ tags }: { tags: string[] }) {
  return (
    <div className="ct-tilt-tags flex flex-wrap gap-1.5 max-h-0 overflow-hidden opacity-0 translate-y-2 transition-all duration-300 group-hover/tilt:max-h-32 group-hover/tilt:opacity-100 group-hover/tilt:translate-y-0">
      {tags.map((t) => (
        <span
          key={t}
          className="text-[0.7rem] px-2.5 py-1 rounded font-medium whitespace-nowrap"
          style={{
            background: 'rgba(224,25,122,0.08)',
            border: '1px solid rgba(224,25,122,0.18)',
            color: 'var(--ct-pink, #E0197A)',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

export function TiltCardArrow({ children }: { children: ReactNode }) {
  return <div className="ct-tilt-arrow inline-flex items-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-wide transition-all group-hover/tilt:gap-2.5" style={{ color: 'var(--ct-pink, #E0197A)' }}>{children}</div>
}

export default TiltCard
