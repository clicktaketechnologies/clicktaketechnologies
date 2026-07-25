'use client'

/**
 * Nx3DCharacterInteractive — Phase 3 #1 micro-interaction wrapper.
 *
 * Wraps the CSS-only Nx3DCharacter with four motion layers:
 *
 *  1. Cursor parallax — spring-smoothed tilt + translate toward the cursor.
 *     Uses useMotionValue + useSpring so the character "looks at" the
 *     pointer with inertia (not 1:1, feels alive).
 *
 *  2. Click "talk" — each character variant has a unique personality
 *     animation triggered on click/tap/Enter. The cube does a happy
 *     360° spin, the shield does a protective pulse, the rocket does
 *     an eager lift, etc. Implemented with useAnimationControls so we
 *     can sequence the talk animation and then return to idle.
 *
 *  3. Scroll parallax — subtle vertical drift as the character scrolls
 *     through the viewport (useScroll + useTransform, ±40px range).
 *
 *  4. Hover scale — gentle 1.04× scale on hover, 0.97× on tap.
 *
 * Reduced-motion users get the static character with NO parallax, NO
 * talk animation, NO scroll drift. Cursor tracking is disabled too
 * (we honor the user's preference strictly).
 *
 * The original CSS keyframes (float / spin loops) keep running inside
 * the inner Nx3DCharacter — this wrapper is additive, not replacing.
 *
 * Used in:
 *   - deep-dive-layout.tsx — hero character (lg+ only)
 *   - nx-page-layout.tsx — page hero character (lg+ only)
 *
 * Not used on:
 *   - Section dividers (keep the plain Nx3DCharacter — too small)
 *   - Mobile (hero character is hidden on < lg anyway)
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useAnimationControls,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion'
import { Nx3DCharacter, type Variant, type Size } from './nx-3d-character'

// ─── Personality map ────────────────────────────────────────────────────────
// Each character variant gets a "personality" — a unique click animation
// that expresses the character's role. Cube = curious (spins to "think"),
// Shield = guard (pulses protectively), Rocket = eager (lifts), etc.

type Personality =
  | 'curious'    // cube / services / default
  | 'wise'       // orb / solutions
  | 'friendly'   // hex / about
  | 'eager'      // rocket / careers
  | 'proud'      // trophy / case-studies
  | 'thoughtful' // book / blog
  | 'attentive'  // chat / contact
  | 'playful'    // tag / pricing
  | 'creative'   // frame / portfolio
  | 'social'     // people hex / team
  | 'stacked'    // cube stack / resources
  | 'guard'      // shield / legal

const PERSONALITY_MAP: Record<Variant, Personality> = {
  'services': 'curious',
  'service-detail': 'curious',
  'solutions': 'wise',
  'solution-detail': 'wise',
  'about': 'friendly',
  'careers': 'eager',
  'case-studies': 'proud',
  'blog': 'thoughtful',
  'blog-post': 'thoughtful',
  'contact': 'attentive',
  'pricing': 'playful',
  'portfolio': 'creative',
  'team': 'social',
  'resources': 'stacked',
  'legal': 'guard',
  'default': 'curious',
}

// ─── Per-personality "talk" keyframes ───────────────────────────────────────
// These are framer-motion `animate` targets. Each is a keyframe array —
// framer interpolates through them in sequence using the `times` array
// in the transition. Total duration ~900ms.

type TalkKeyframes = {
  rotate?: number[]
  rotateY?: number[]
  rotateX?: number[]
  scale?: number[]
  y?: number[]
  x?: number[]
  filter?: string[]
}

const TALK_ANIMATIONS: Record<Personality, TalkKeyframes> = {
  curious:    { rotate: [0, -12, 12, -6, 0], scale: [1, 1.08, 1.04, 1.04, 1] },
  wise:       { scale: [1, 1.12, 1], filter: ['brightness(1)', 'brightness(1.35)', 'brightness(1)'] },
  friendly:   { rotate: [0, 6, -6, 4, 0], y: [0, -6, 0, -3, 0] },
  eager:      { y: [0, -16, 0], scale: [1, 1.06, 1] },
  proud:      { rotate: [0, 360], scale: [1, 1.1, 1] },
  thoughtful: { rotateY: [0, 25, -25, 0], rotateX: [0, -8, 8, 0] },
  attentive:  { scale: [1, 1.18, 0.94, 1.12, 1] },
  playful:    { rotate: [0, -18, 18, -8, 0], y: [0, -4, 0, -2, 0] },
  creative:   { rotate: [0, -8, 8, -4, 0], scale: [1, 1.06, 0.98, 1.02, 1] },
  social:     { y: [0, -4, 0, -4, 0], rotate: [0, 3, -3, 3, 0] },
  stacked:    { y: [0, 6, 0, -3, 0], scale: [1, 0.97, 1.03, 1] },
  guard:      { scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] },
}

const TALK_DURATION = 0.9

// ─── Component ──────────────────────────────────────────────────────────────

type Props = {
  variant?: Variant
  size?: Size
  className?: string
  floatSpeed?: number
  /** Disable scroll parallax (use in short hero sections where it'd be jumpy). */
  disableScrollParallax?: boolean
  /** Show a subtle "click me" hint pill on first hover. Default true. */
  showClickHint?: boolean
}

export function Nx3DCharacterInteractive({
  variant = 'default',
  size = 'lg',
  className = '',
  floatSpeed,
  disableScrollParallax = false,
  showClickHint = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // ─── Cursor parallax (spring-smoothed) ─────────────────────────────────
  // mouseX / mouseY are normalized to [-0.5, 0.5] within the container.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 80, damping: 18, mass: 0.4 }
  const sx = useSpring(mouseX, springConfig)
  const sy = useSpring(mouseY, springConfig)

  // Tilt toward cursor — ±14° on each axis.
  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -14])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14])
  // Subtle translate — ±10px horizontal, ±8px vertical.
  const cursorTranslateX = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const cursorTranslateY = useTransform(sy, [-0.5, 0.5], [-8, 8])

  // ─── Scroll parallax (optional) ────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const scrollDrift = useTransform(scrollYProgress, [0, 1], [40, -40])

  // Combine cursor Y translate + scroll drift into a single Y MotionValue.
  // We always call the hook (rules of hooks), then conditionally pick which
  // value to use in the style prop.
  const combinedY: MotionValue<number> = useTransform(
    [cursorTranslateY, scrollDrift] as MotionValue<number>[],
    ([cy, sd]: number[]) => cy + sd,
  )

  // ─── Reduced-motion detection ──────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  // ─── Cursor tracking ───────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [reducedMotion, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovering(false)
  }, [mouseX, mouseY])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  // ─── Click "talk" ──────────────────────────────────────────────────────
  const personality = PERSONALITY_MAP[variant] || 'curious'
  const talkAnim = TALK_ANIMATIONS[personality]

  const triggerTalk = useCallback(() => {
    if (reducedMotion) return
    setHasInteracted(true)
    // Compute times array based on the longest keyframe array in the talk anim.
    const firstKey = Object.keys(talkAnim)[0] as keyof TalkKeyframes
    const keyframeLen = talkAnim[firstKey]?.length || 4
    const times = Array.from({ length: keyframeLen }, (_, i) => i / (keyframeLen - 1))
    controls.start({
      ...talkAnim,
      transition: {
        duration: TALK_DURATION,
        times,
        ease: 'easeInOut',
      },
    })
  }, [reducedMotion, controls, talkAnim])

  const handleClick = useCallback(() => {
    triggerTalk()
  }, [triggerTalk])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      triggerTalk()
    }
  }, [triggerTalk])

  // ─── Pick the final Y motion value based on flags ──────────────────────
  // (Cannot be conditional hooks — so we compute the style value here.)
  const finalY = reducedMotion
    ? 0
    : disableScrollParallax
      ? cursorTranslateY
      : combinedY

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${personality} 3D character — click to animate`}
    >
      <motion.div
        animate={controls}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          x: reducedMotion ? 0 : cursorTranslateX,
          y: finalY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.04 }}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <Nx3DCharacter variant={variant} size={size} floatSpeed={floatSpeed} />
      </motion.div>

      {/* Click-hint pill — appears on first hover, dismisses on first interaction */}
      {showClickHint && !hasInteracted && isHovering && !reducedMotion && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-brand-pink/40 bg-background/90 px-3 py-1 text-[10px] font-medium text-brand-pink shadow-lg backdrop-blur-sm"
          >
            Click to interact
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
