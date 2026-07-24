'use client'

/**
 * Marquee — horizontal scrolling brand band matching the clicktake-3d-v3 reference.
 *
 * Renders the supplied items twice in a flex row with a CSS keyframe animation
 * translating the row by -50%. Pause-on-hover via CSS.
 *
 * Usage:
 *   <Marquee items={['Web Development', 'SEO', 'AI Solutions']} />
 *   <Marquee items={[...]} separator="✦" />
 */
type MarqueeProps = {
  items: string[]
  separator?: string
  className?: string
}

export function Marquee({ items, separator = "✦", className = "" }: MarqueeProps) {
  // Duplicate the items so the loop is seamless.
  const doubled = [...items, ...items]

  return (
    <div className={`ct-marquee ${className}`} aria-hidden="true">
      <div className="ct-marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span className="ct-marquee-item">{item}</span>
            <span className="ct-marquee-sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
