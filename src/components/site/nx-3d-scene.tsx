'use client'

/**
 * Nx3DScene — floating geometric accents for any section.
 *
 * Renders floating 3D shapes (cubes, spheres, pyramids, hexes) at the
 * edges/corners of a section to give it a 3D feel. Pure CSS, no JS animation
 * loop, no Three.js. Designed to sit at z-0 behind content (set pointer-events
 * none so it never blocks clicks).
 *
 * Brand colors: pink #FF53A9, blue #136DFF, purple #9B3DFF
 *
 * Usage:
 *   <section className="relative ...">
 *     <Nx3DScene density="low" />
 *     <div className="relative z-10">content</div>
 *   </section>
 */

type Density = 'low' | 'medium' | 'high'

type Props = {
  density?: Density
  /** Restrict shapes to one corner (default = scatter all corners) */
  corner?: 'all' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

const SHAPE_COUNT: Record<Density, number> = {
  low: 4,
  medium: 7,
  high: 10,
}

type ShapeKind = 'cube' | 'sphere' | 'pyramid' | 'hex' | 'ring' | 'plus'

type ShapeDef = {
  kind: ShapeKind
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  color: string
  opacity: number
  animation: string
  animationDuration: string
  animationDelay: string
}

const COLORS = ['#FF53A9', '#136DFF', '#9B3DFF', '#FF8AC4', '#4A90D9', '#7B2FBE']

function pseudoRandom(seed: number): number {
  // Deterministic pseudo-random so SSR + CSR match (no hydration warnings).
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateShapes(seed: number, count: number, corner: Props['corner']): ShapeDef[] {
  const shapes: ShapeDef[] = []
  const kinds: ShapeKind[] = ['cube', 'sphere', 'pyramid', 'hex', 'ring', 'plus']

  for (let i = 0; i < count; i++) {
    const r1 = pseudoRandom(seed + i * 7)
    const r2 = pseudoRandom(seed + i * 13)
    const r3 = pseudoRandom(seed + i * 17)
    const r4 = pseudoRandom(seed + i * 23)
    const r5 = pseudoRandom(seed + i * 29)

    const kind = kinds[Math.floor(r1 * kinds.length)]
    const size = 18 + Math.floor(r2 * 36) // 18-54px
    const color = COLORS[Math.floor(r3 * COLORS.length)]
    const opacity = 0.15 + r4 * 0.35 // 0.15 - 0.5
    const animationDuration = `${8 + Math.floor(r5 * 10)}s`
    const animationDelay = `${Math.floor(r5 * 5)}s`

    // Position based on corner
    let pos: Partial<ShapeDef> = {}
    const tl = corner === 'all' || corner === 'top-left'
    const tr = corner === 'all' || corner === 'top-right'
    const bl = corner === 'all' || corner === 'bottom-left'
    const br = corner === 'all' || corner === 'bottom-right'
    const positions: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = []
    if (tl) positions.push('top-left')
    if (tr) positions.push('top-right')
    if (bl) positions.push('bottom-left')
    if (br) positions.push('bottom-right')
    const posChoice = positions[Math.floor(r4 * positions.length)] || 'top-left'

    const offset = 4 + Math.floor(r1 * 14) // 4-18%
    if (posChoice === 'top-left') {
      pos = { top: `${offset}%`, left: `${offset}%` }
    } else if (posChoice === 'top-right') {
      pos = { top: `${offset}%`, right: `${offset}%` }
    } else if (posChoice === 'bottom-left') {
      pos = { bottom: `${offset}%`, left: `${offset}%` }
    } else {
      pos = { bottom: `${offset}%`, right: `${offset}%` }
    }

    shapes.push({
      kind,
      size,
      ...pos,
      color,
      opacity,
      animation: 'ctSceneFloat',
      animationDuration,
      animationDelay,
    })
  }

  return shapes
}

function Shape({ shape }: { shape: ShapeDef }) {
  const common = {
    position: 'absolute' as const,
    width: shape.size,
    height: shape.size,
    opacity: shape.opacity,
    animation: `${shape.animation} ${shape.animationDuration} ease-in-out infinite`,
    animationDelay: shape.animationDelay,
    filter: `drop-shadow(0 8px 16px ${shape.color}66)`,
    ...(shape.top !== undefined && { top: shape.top }),
    ...(shape.left !== undefined && { left: shape.left }),
    ...(shape.right !== undefined && { right: shape.right }),
    ...(shape.bottom !== undefined && { bottom: shape.bottom }),
  }

  switch (shape.kind) {
    case 'cube':
      return (
        <div style={common}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${shape.color}, ${shape.color}aa)`,
              borderRadius: 6,
              transform: 'rotate(45deg) skew(15deg, 15deg)',
              border: `1px solid ${shape.color}`,
            }}
          />
        </div>
      )
    case 'sphere':
      return (
        <div
          style={{
            ...common,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${shape.color}, ${shape.color}55)`,
            boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.2), 0 0 20px ${shape.color}33`,
          }}
        />
      )
    case 'pyramid':
      return (
        <div style={common}>
          <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 L36 32 L4 32 Z" fill={shape.color} stroke={shape.color} strokeWidth="1" />
            <path d="M20 4 L36 32 L20 24 Z" fill={`${shape.color}aa`} />
            <path d="M20 4 L4 32 L20 24 Z" fill={`${shape.color}66`} />
          </svg>
        </div>
      )
    case 'hex':
      return (
        <div style={common}>
          <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
            <polygon
              points="20,2 36,12 36,28 20,38 4,28 4,12"
              fill={`${shape.color}33`}
              stroke={shape.color}
              strokeWidth="2"
            />
          </svg>
        </div>
      )
    case 'ring':
      return (
        <div
          style={{
            ...common,
            borderRadius: '50%',
            border: `2px solid ${shape.color}`,
            background: 'transparent',
          }}
        />
      )
    case 'plus':
      return (
        <div style={common}>
          <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
            <rect x="18" y="6" width="4" height="28" rx="1" fill={shape.color} />
            <rect x="6" y="18" width="28" height="4" rx="1" fill={shape.color} />
          </svg>
        </div>
      )
  }
}

export function Nx3DScene({ density = 'low', corner = 'all', className = '' }: Props) {
  // Deterministic seed so SSR/CSR match
  const seed = 42 + density.charCodeAt(0) + (corner || 'all').charCodeAt(0)
  const shapes = generateShapes(seed, SHAPE_COUNT[density], corner)

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {shapes.map((shape, i) => (
        <Shape key={i} shape={shape} />
      ))}
      <style>{`
        @keyframes ctSceneFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(8deg); }
          66% { transform: translateY(10px) rotate(-6deg); }
        }
      `}</style>
    </div>
  )
}

export default Nx3DScene
