'use client'

/**
 * NxStoryScene — per-page 3D storytelling layer.
 *
 * Each page mounts a <NxStoryScene variant="..." /> in its hero / header
 * region. The variant controls which CSS-only 3D character + ambient
 * orbs render. The character ties visually to the page content:
 *
 *   - home       → orbiting spheres + pulsing core (the ClickTake hub)
 *   - services   → rotating tetrahedron (multi-faceted capabilities)
 *   - about      → floating cube + rings (the brand identity)
 *   - contact    → concentric pulse waves (reaching out)
 *   - blog       → floating book (knowledge artifact)
 *   - pricing    → price tag (commerce / value)
 *   - case-studies → floating cube (project showcase)
 *   - careers    → orbiting spheres (opportunity hub)
 *   - portfolio  → rotating tetrahedron (creative work)
 *   - default    → generic floating shape
 *
 * Pure CSS 3D — no WebGL, no CDN, no JS animation loop. Animations are
 * driven by keyframes defined in globals.css (.ct-story-* classes).
 *
 * Theme awareness:
 *   - In dark/elite mode: orbs use screen blend mode for additive glow.
 *   - In light mode: orbs use multiply blend mode and are dimmed.
 *   - In Elite Mode (.theme-elite): the BackgroundScene canvas renders
 *     richer particles, and the StoryScene orbs gain extra saturation
 *     via the global Elite overrides.
 *
 * Performance:
 *   - Respects prefers-reduced-motion (CSS handles it via @media query).
 *   - All animation is GPU-composited (transform + opacity only).
 *   - pointer-events: none so it never blocks clicks.
 *
 * Usage:
 *   <section className="relative ...">
 *     <NxStoryScene variant="services" />
 *     <div className="relative z-10">…content…</div>
 *   </section>
 */

export type StoryVariant =
  | "home"
  | "services"
  | "about"
  | "contact"
  | "blog"
  | "pricing"
  | "case-studies"
  | "careers"
  | "portfolio"
  | "solutions"
  | "team"
  | "resources"
  | "default"

type Props = {
  variant?: StoryVariant
  /** Show / hide the three ambient glow orbs (default: true) */
  showOrbs?: boolean
  /** Show / hide the floating character (default: true) */
  showCharacter?: boolean
  className?: string
}

// Map variants that don't have a unique character to the closest sibling.
// This keeps the API expressive without requiring 12 unique 3D scenes.
const VARIANT_ALIAS: Record<StoryVariant, StoryVariant> = {
  home: "home",
  services: "services",
  about: "about",
  contact: "contact",
  blog: "blog",
  pricing: "pricing",
  "case-studies": "about", // reuse cube
  careers: "home",         // reuse orbits
  portfolio: "services",   // reuse tetrahedron
  solutions: "services",   // reuse tetrahedron
  team: "about",           // reuse cube
  resources: "blog",       // reuse book
  default: "default",
}

export function NxStoryScene({
  variant = "default",
  showOrbs = true,
  showCharacter = true,
  className = "",
}: Props) {
  // Resolve aliased variant — e.g. "careers" → "home"
  const resolved = VARIANT_ALIAS[variant] || "default"

  // SSR-safety: render the same structure on server + client to avoid
  // hydration mismatch. The CSS handles all visual variation.

  return (
    <div
      className={`ct-story-scene ct-story-${resolved} ${className}`}
      aria-hidden="true"
    >
      {/* Ambient glow orbs — three soft blurred blobs in brand colors.
          Together they create a halo around the character + content. */}
      {showOrbs && (
        <>
          <div className="ct-story-orb ct-story-orb-1" />
          <div className="ct-story-orb ct-story-orb-2" />
          <div className="ct-story-orb ct-story-orb-3" />
        </>
      )}

      {/* The page-specific 3D character. Structure varies by variant. */}
      {showCharacter && (
        <div className="ct-story-character">
          {resolved === "home" && (
            <>
              <div className="ct-story-orbit" />
              <div className="ct-story-orbit" />
              <div className="ct-story-orbit" />
              <div className="ct-story-core" />
            </>
          )}

          {resolved === "services" && (
            <div className="ct-story-tetra">
              <div className="ct-story-tetra-face" />
              <div className="ct-story-tetra-face" />
              <div className="ct-story-tetra-face" />
              <div className="ct-story-tetra-face" />
            </div>
          )}

          {resolved === "about" && (
            <>
              <div className="ct-story-ring" />
              <div className="ct-story-ring" />
              <div className="ct-story-cube" />
            </>
          )}

          {resolved === "contact" && (
            <>
              <div className="ct-story-pulse-ring" />
              <div className="ct-story-pulse-ring" />
              <div className="ct-story-pulse-ring" />
              <div className="ct-story-core" />
            </>
          )}

          {resolved === "blog" && (
            <div className="ct-story-book" />
          )}

          {resolved === "pricing" && (
            <div className="ct-story-tag" />
          )}

          {resolved === "default" && (
            <div className="ct-story-shape" />
          )}
        </div>
      )}
    </div>
  )
}

export default NxStoryScene
