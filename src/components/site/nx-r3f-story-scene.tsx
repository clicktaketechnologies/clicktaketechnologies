'use client'

/**
 * NxR3FStoryScene — per-page 3D storytelling layer powered by R3F.
 *
 * Replaces / complements the legacy CSS-only NxStoryScene with a real
 * WebGL scene that mounts a procedural 3D character (via NxR3FCharacter)
 * plus ambient floating shapes + brand-colored orbs.
 *
 * Each page picks a `variant` that ties the character to the page topic:
 *
 *   - home        → solutions orb with orbiting rings (the ClickTake hub)
 *   - services    → services cube with code symbol
 *   - about       → about hex shield with checkmark
 *   - contact     → contact chat bubble
 *   - blog        → blog open book
 *   - pricing     → pricing price tag
 *   - case-studies → case-studies trophy
 *   - careers     → careers rocket
 *   - portfolio   → services cube (creative variant)
 *   - solutions   → solutions orb
 *   - team        → team hex with dots
 *   - resources   → resources cube stack
 *   - legal       → legal shield
 *   - service-detail → service-detail gear
 *   - solution-detail → solution-detail lightbulb
 *   - blog-post   → blog-post scroll
 *   - default     → default cube mascot
 *
 * The scene also renders:
 *   • Three ambient glow orbs (CSS blurred radial gradients)
 *   • A Canvas with the R3F character (click-to-spin)
 *   • Three small floating wireframe shapes for depth
 *
 * Performance:
 *   • The R3F Canvas is lazy-loaded via React.lazy + next/dynamic
 *   • Respects prefers-reduced-motion (renders CSS orbs only)
 *   • Hidden on mobile (< md) to save battery
 *   • pointer-events: none except on the character itself
 */

import dynamic from 'next/dynamic'
import { type ComponentType } from 'react'
import type { StoryVariant } from './nx-story-scene'
import type { CharacterVariant } from './nx-r3f-character'

// Lazy-load the R3F character so the Three.js bundle only loads when
// a story scene is actually mounted on a page.
const NxR3FCharacter = dynamic(
  () => import('./nx-r3f-character').then((m) => m.NxR3FCharacter),
  { ssr: false, loading: () => null },
)

// Map NxStoryScene variants to NxR3FCharacter variants.
// Some story variants reuse the same character archetype.
const STORY_TO_CHARACTER: Record<StoryVariant, CharacterVariant> = {
  home: 'solutions',
  services: 'services',
  about: 'about',
  contact: 'contact',
  blog: 'blog',
  pricing: 'pricing',
  'case-studies': 'case-studies',
  careers: 'careers',
  portfolio: 'portfolio',
  solutions: 'solutions',
  team: 'team',
  resources: 'resources',
  default: 'default',
}

type Props = {
  variant?: StoryVariant
  /** Show / hide the three ambient glow orbs (default: true) */
  showOrbs?: boolean
  /** Show / hide the 3D character (default: true) */
  showCharacter?: boolean
  /** Show / hide the floating wireframe shapes (default: true) */
  showFloaters?: boolean
  className?: string
}

export function NxR3FStoryScene({
  variant = 'default',
  showOrbs = true,
  showCharacter = true,
  showFloaters = true,
  className = '',
}: Props) {
  const characterVariant = STORY_TO_CHARACTER[variant] || 'default'

  return (
    <div
      className={`ct-story-scene ct-story-r3f ct-story-${variant} ${className}`}
      aria-hidden="true"
    >
      {/* Ambient glow orbs — same look as the legacy CSS-only story scene */}
      {showOrbs && (
        <>
          <div className="ct-story-orb ct-story-orb-1" />
          <div className="ct-story-orb ct-story-orb-2" />
          <div className="ct-story-orb ct-story-orb-3" />
        </>
      )}

      {/* Floating wireframe shapes — small decorative geometry */}
      {showFloaters && (
        <div className="ct-story-floaters">
          <div className="ct-story-floater ct-story-floater-1" />
          <div className="ct-story-floater ct-story-floater-2" />
          <div className="ct-story-floater ct-story-floater-3" />
        </div>
      )}

      {/* The R3F character — click-to-spin, floating animation */}
      {showCharacter && (
        <div className="ct-story-character-r3f">
          <NxR3FCharacter
            variant={characterVariant}
            size="lg"
            interactive={true}
          />
        </div>
      )}
    </div>
  )
}

export default NxR3FStoryScene

// Helper for consumers that want to opt into the R3F story scene via
// dynamic import. Usage:
//   const NxR3FStoryScene = dynamic(() => import('./nx-r3f-story-scene').then(m => m.NxR3FStoryScene), { ssr: false })
export const NxR3FStorySceneDynamic: ComponentType<Props> = NxR3FStoryScene
