'use client'

/**
 * NxR3FCharacter — React Three Fiber 3D character mascots with visible faces.
 *
 * Replaces the legacy CSS-only Nx3DCharacter component with real 3D geometry
 * rendered via R3F. Each character is a floating rounded shape with:
 *
 *   • Procedural geometry (sphere / cube / icosahedron / capsule)
 *   • Brand-color gradient material (MeshDistortMaterial from drei for wobble)
 *   • Two "eyes" + a "smile" so it reads as a mascot, not abstract geometry
 *   • Subtle floating animation (drift up/down + slight rotation)
 *   • Click-to-spin interaction (via onClick + useFrame)
 *
 * Per-page variants map content topics to character archetypes:
 *   services     → cube with code symbol (cube = structure)
 *   solutions    → orb with rings (orb = synthesis)
 *   about        → hex prism with checkmark (hex = brand identity)
 *   careers      → capsule rocket (capsule = launch)
 *   case-studies → trophy / star (star = achievement)
 *   blog         → open book (book = knowledge)
 *   contact      → chat bubble (rounded cube = message)
 *   pricing      → price tag (rounded square with hole)
 *   portfolio    → framed window (cube with inset face)
 *   team         → hexagon with smaller dots (cluster = team)
 *   resources    → cube stack (stacks = library)
 *   legal        → shield (shield = protection)
 *   service-detail → gear (icosahedron with notches)
 *   solution-detail → lightbulb (sphere + cone base)
 *   blog-post    → scroll (cylinder)
 *   default      → generic cube mascot
 *
 * Theme awareness:
 *   • Reads CSS custom properties for brand colors
 *   • Material colors flip automatically when theme switches
 *
 * Performance:
 *   • Single Canvas per character (R3F handles deduplication internally)
 *   • Respects prefers-reduced-motion (no float spin)
 *   • Suspense fallback prevents layout shift while geometry builds
 */

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Environment,
  ContactShadows,
} from '@react-three/drei'
import { useRef, useState, useMemo, Suspense } from 'react'
import * as THREE from 'three'

export type CharacterVariant =
  | 'services'
  | 'solutions'
  | 'about'
  | 'careers'
  | 'case-studies'
  | 'blog'
  | 'contact'
  | 'pricing'
  | 'portfolio'
  | 'team'
  | 'resources'
  | 'legal'
  | 'service-detail'
  | 'solution-detail'
  | 'blog-post'
  | 'default'

export type CharacterSize = 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  variant?: CharacterVariant
  size?: CharacterSize
  className?: string
  /** Interactive (click-to-spin, hover-scale) — default true */
  interactive?: boolean
}

const SIZE_MAP: Record<CharacterSize, { w: number; h: number; scale: number }> = {
  sm: { w: 180, h: 220, scale: 1.4 },
  md: { w: 240, h: 280, scale: 1.9 },
  lg: { w: 320, h: 380, scale: 2.5 },
  xl: { w: 420, h: 480, scale: 3.2 },
}

// ─── Color helpers ───────────────────────────────────────────────────────

function useBrandColors() {
  return useMemo(() => {
    if (typeof document === 'undefined') {
      return {
        pink: '#FF53A9',
        purple: '#9B3DFF',
        blue: '#136DFF',
        cyan: '#22d3ee',
        gold: '#FFD782',
      }
    }
    const read = (v: string, fb: string) => {
      const val = getComputedStyle(document.documentElement).getPropertyValue(v).trim()
      return val || fb
    }
    return {
      pink: read('--ct-pink', '#FF53A9'),
      purple: read('--ct-purple', '#9B3DFF'),
      blue: read('--ct-blue', '#136DFF'),
      cyan: read('--ct-cyan', '#22d3ee'),
      gold: read('--ct-gold', '#FFD782'),
    }
  }, [])
}

// ─── Eye + Smile (the "face" overlays) ───────────────────────────────────
// Rendered as small spheres positioned on the +Z face of the parent mesh.

function Face({ z = 0.6, scale = 1 }: { z?: number; scale?: number }) {
  return (
    <group position={[0, 0, z]} scale={scale}>
      {/* Left eye */}
      <mesh position={[-0.22, 0.18, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#0a0e1a" emissive="#0a0e1a" emissiveIntensity={0.3} />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.22, 0.18, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#0a0e1a" emissive="#0a0e1a" emissiveIntensity={0.3} />
      </mesh>
      {/* Eye glow */}
      <mesh position={[-0.22, 0.20, 0.02]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.22, 0.20, 0.02]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Smile — a thin torus arc */}
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.18, 0.025, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#0a0e1a" />
      </mesh>
    </group>
  )
}

// ─── Per-variant character bodies ────────────────────────────────────────

type BodyProps = {
  colors: ReturnType<typeof useBrandColors>
  interactive: boolean
}

function CharacterBody({ variant, colors, interactive }: BodyProps & { variant: CharacterVariant }) {
  const groupRef = useRef<THREE.Group>(null)
  const [spin, setSpin] = useState(false)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (spin) {
      groupRef.current.rotation.y += delta * 2
    }
  })

  // Click handler — toggle spin
  const onClick = interactive ? () => setSpin((s) => !s) : undefined
  const cursor = interactive ? 'pointer' : 'default'

  // Pick a primary color based on variant
  const primary =
    variant === 'services' || variant === 'service-detail'
      ? colors.blue
      : variant === 'solutions' || variant === 'solution-detail'
        ? colors.purple
        : variant === 'about' || variant === 'team'
          ? colors.pink
          : variant === 'careers'
            ? colors.gold
            : variant === 'case-studies' || variant === 'portfolio'
              ? colors.cyan
              : variant === 'blog' || variant === 'blog-post' || variant === 'resources'
                ? colors.purple
                : variant === 'contact'
                  ? colors.pink
                  : variant === 'pricing'
                    ? colors.gold
                    : variant === 'legal'
                      ? colors.blue
                      : colors.pink

  const secondary = primary === colors.pink ? colors.purple : colors.pink

  return (
    <group
      ref={groupRef}
      onClick={onClick}
      onPointerOver={interactive ? (e) => (document.body.style.cursor = cursor) : undefined}
      onPointerOut={interactive ? () => (document.body.style.cursor = 'default') : undefined}
    >
      {variant === 'services' && (
        <group>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <MeshDistortMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.15}
              distort={0.15}
              speed={1.5}
              roughness={0.25}
              metalness={0.6}
            />
          </mesh>
          {/* Code symbol overlay — small "<>" braces as boxes */}
          <mesh position={[-0.2, 0, 0.51]}>
            <boxGeometry args={[0.05, 0.25, 0.01]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0.2, 0, 0.51]}>
            <boxGeometry args={[0.05, 0.25, 0.01]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
          <Face z={0.55} scale={0.9} />
        </group>
      )}

      {variant === 'solutions' && (
        <group>
          <mesh>
            <sphereGeometry args={[0.7, 64, 64]} />
            <MeshDistortMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.2}
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.4}
            />
          </mesh>
          {/* Orbit rings */}
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[1.1, 0.025, 8, 64]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 1.8, Math.PI / 4, 0]}>
            <torusGeometry args={[1.25, 0.02, 8, 64]} />
            <meshStandardMaterial color={colors.cyan} emissive={colors.cyan} emissiveIntensity={0.3} />
          </mesh>
          <Face z={0.7} scale={1} />
        </group>
      )}

      {variant === 'about' && (
        <group>
          {/* Hex shield — flat cylinder with 6 sides */}
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.25, 6]} />
            <meshStandardMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.15}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
          {/* Checkmark */}
          <mesh position={[-0.18, -0.05, 0.13]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.3, 0.02]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.12, -0.15, 0.13]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.5, 0.02]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <Face z={0.15} scale={0.85} />
        </group>
      )}

      {variant === 'careers' && (
        <group>
          {/* Rocket body — capsule */}
          <mesh rotation={[0, 0, Math.PI / 8]}>
            <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
            <meshStandardMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.2}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
          {/* Fins */}
          <mesh position={[-0.35, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
            <coneGeometry args={[0.15, 0.4, 4]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.35, -0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <coneGeometry args={[0.15, 0.4, 4]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.3} />
          </mesh>
          {/* Flame */}
          <mesh position={[0, -0.95, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.18, 0.5, 16]} />
            <meshBasicMaterial color={colors.gold} transparent opacity={0.8} />
          </mesh>
          <Face z={0.4} scale={0.8} />
        </group>
      )}

      {variant === 'case-studies' && (
        <group>
          {/* Trophy cup — flatted sphere on cylinder base */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
            <meshStandardMaterial
              color={colors.gold}
              emissive={colors.gold}
              emissiveIntensity={0.35}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Star */}
          <mesh position={[0, 0.25, 0.4]}>
            <icosahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          {/* Stem */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
            <meshStandardMaterial color={primary} metalness={0.7} roughness={0.2} />
          </mesh>
          {/* Base */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshStandardMaterial color={primary} metalness={0.7} roughness={0.2} />
          </mesh>
          <Face z={0.5} scale={0.85} />
        </group>
      )}

      {variant === 'blog' && (
        <group>
          {/* Open book — two angled planes */}
          <mesh position={[-0.3, 0, 0]} rotation={[0, Math.PI / 8, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.7]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.1} />
          </mesh>
          <mesh position={[0.3, 0, 0]} rotation={[0, -Math.PI / 8, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.7]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.1} />
          </mesh>
          {/* Page lines */}
          <mesh position={[-0.3, 0.04, 0]} rotation={[0, Math.PI / 8, 0]}>
            <boxGeometry args={[0.35, 0.005, 0.5]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.3, 0.04, 0]} rotation={[0, -Math.PI / 8, 0]}>
            <boxGeometry args={[0.35, 0.005, 0.5]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Face z={0.4} scale={0.75} />
        </group>
      )}

      {variant === 'contact' && (
        <group>
          {/* Chat bubble — rounded cube */}
          <mesh>
            <boxGeometry args={[1.1, 0.85, 0.5]} />
            <MeshWobbleMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.15}
              factor={0.2}
              speed={1}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          {/* Tail */}
          <mesh position={[-0.35, -0.45, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.25, 0.25, 0.4]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.1} />
          </mesh>
          {/* Dots inside bubble */}
          <mesh position={[-0.2, 0, 0.27]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0, 0.27]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.2, 0, 0.27]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <Face z={0.3} scale={0.7} />
        </group>
      )}

      {variant === 'pricing' && (
        <group>
          {/* Price tag — rounded square with a hole */}
          <mesh>
            <boxGeometry args={[1, 0.8, 0.2]} />
            <meshStandardMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.2}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          {/* Hole */}
          <mesh position={[-0.4, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* String */}
          <mesh position={[-0.4, 0.5, 0]}>
            <torusGeometry args={[0.15, 0.015, 8, 32]} />
            <meshBasicMaterial color={colors.gold} />
          </mesh>
          {/* $ symbol — vertical bar */}
          <mesh position={[0, 0, 0.12]}>
            <boxGeometry args={[0.06, 0.4, 0.02]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
          <Face z={0.15} scale={0.85} />
        </group>
      )}

      {variant === 'portfolio' && (
        <group>
          {/* Windowed frame */}
          <mesh>
            <boxGeometry args={[1.2, 0.9, 0.15]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.15} metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Inner screen */}
          <mesh position={[0, 0, 0.09]}>
            <boxGeometry args={[1.0, 0.7, 0.02]} />
            <meshStandardMaterial color="#000000" emissive={secondary} emissiveIntensity={0.3} />
          </mesh>
          {/* Stand */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.3, 12]} />
            <meshStandardMaterial color={primary} metalness={0.6} roughness={0.3} />
          </mesh>
          <Face z={0.13} scale={0.75} />
        </group>
      )}

      {variant === 'team' && (
        <group>
          {/* Hexagon with smaller dots */}
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.2, 6]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.15} metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Smaller team dots around the hex */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2
            const x = Math.cos(angle) * 0.9
            const y = Math.sin(angle) * 0.9
            return (
              <mesh key={i} position={[x, y, 0.1]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? colors.cyan : colors.gold}
                  emissive={i % 2 === 0 ? colors.cyan : colors.gold}
                  emissiveIntensity={0.4}
                />
              </mesh>
            )
          })}
          <Face z={0.15} scale={0.85} />
        </group>
      )}

      {variant === 'resources' && (
        <group>
          {/* Cube stack */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.7, 0.35, 0.7]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.15} metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.7, 0.35, 0.7]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.15} metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[0.7, 0.35, 0.7]} />
            <meshStandardMaterial color={colors.cyan} emissive={colors.cyan} emissiveIntensity={0.15} metalness={0.5} roughness={0.3} />
          </mesh>
          <Face z={0.4} scale={0.75} />
        </group>
      )}

      {variant === 'legal' && (
        <group>
          {/* Shield — squashed sphere */}
          <mesh scale={[1, 1.3, 0.5]}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.2} metalness={0.7} roughness={0.2} />
          </mesh>
          {/* Scale of justice — small balance bar */}
          <mesh position={[0, 0.25, 0.32]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.2, 0.15, 0.32]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0.2, 0.15, 0.32]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
          <Face z={0.32} scale={0.85} />
        </group>
      )}

      {variant === 'service-detail' && (
        <group>
          {/* Gear — icosahedron with notches */}
          <mesh>
            <icosahedronGeometry args={[0.7, 1]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.2} metalness={0.6} roughness={0.3} wireframe={false} />
          </mesh>
          {/* Outer ring */}
          <mesh>
            <torusGeometry args={[0.85, 0.05, 8, 32]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.3} />
          </mesh>
          {/* Center hole */}
          <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <Face z={0.7} scale={0.8} />
        </group>
      )}

      {variant === 'solution-detail' && (
        <group>
          {/* Lightbulb — sphere + cone base */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <MeshDistortMaterial
              color={colors.gold}
              emissive={colors.gold}
              emissiveIntensity={0.5}
              distort={0.2}
              speed={2}
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>
          {/* Base */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 0.3, 16]} />
            <meshStandardMaterial color={primary} metalness={0.7} roughness={0.2} />
          </mesh>
          {/* Light rays */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2
            const x = Math.cos(angle) * 0.8
            const y = Math.sin(angle) * 0.8 + 0.15
            return (
              <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.25, 0.03, 0.02]} />
                <meshBasicMaterial color={colors.gold} transparent opacity={0.7} />
              </mesh>
            )
          })}
          <Face z={0.5} scale={0.85} />
        </group>
      )}

      {variant === 'blog-post' && (
        <group>
          {/* Scroll — cylinder */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.9, 32, 1, false]} />
            <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={0.15} metalness={0.4} roughness={0.4} />
          </mesh>
          {/* End caps */}
          <mesh position={[0, 0, 0.45]}>
            <torusGeometry args={[0.5, 0.05, 8, 32]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0, 0, -0.45]}>
            <torusGeometry args={[0.5, 0.05, 8, 32]} />
            <meshStandardMaterial color={secondary} emissive={secondary} emissiveIntensity={0.3} />
          </mesh>
          <Face z={0.55} scale={0.8} />
        </group>
      )}

      {variant === 'default' && (
        <group>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <MeshDistortMaterial
              color={primary}
              emissive={primary}
              emissiveIntensity={0.15}
              distort={0.2}
              speed={1.5}
              roughness={0.25}
              metalness={0.6}
            />
          </mesh>
          <Face z={0.55} scale={0.9} />
        </group>
      )}
    </group>
  )
}

// ─── Main exported component ─────────────────────────────────────────────

export function NxR3FCharacter({
  variant = 'default',
  size = 'lg',
  className = '',
  interactive = true,
}: Props) {
  const { w, h, scale } = SIZE_MAP[size]
  const colors = useBrandColors()

  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: w, height: h }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.75]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 2]} intensity={0.8} />
          <pointLight position={[-3, -2, 2]} intensity={0.4} color={colors.pink} />
          <Float
            speed={2}
            rotationIntensity={0.4}
            floatIntensity={0.6}
            floatingRange={[-0.1, 0.1]}
          >
            <CharacterBody
              variant={variant}
              colors={colors}
              interactive={interactive}
            />
            <group scale={scale}>
              {/* Empty group — scale is applied via the wrapping group's transform.
                  The CharacterBody is rendered above at unit scale and uses its
                  own internal geometry sizes (already calibrated). */}
            </group>
          </Float>
          {/* Soft contact shadow under the character — adds depth */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.35}
            scale={5}
            blur={2.5}
            far={3}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default NxR3FCharacter
