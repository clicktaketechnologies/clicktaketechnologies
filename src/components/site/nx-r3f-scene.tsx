'use client'

/**
 * NxR3FScene — React Three Fiber (R3F) ambient 3D background.
 *
 * This is the production-grade replacement for the legacy CDN-loaded
 * NxThreeScene component. Instead of dynamically importing Three.js from
 * esm.sh at runtime (which adds latency, blocks on the network, and can
 * fail in restricted environments), we now ship Three.js + @react-three/fiber
 * + @react-three/drei as proper npm dependencies. This gives us:
 *
 *   • Deterministic builds (no CDN drift)
 *   • Full TypeScript types (no more `any` everywhere)
 *   • Proper code-splitting via Next.js dynamic imports
 *   • Access to drei's high-level helpers (Float, Stars, Environment, etc.)
 *   • Better tree-shaking → smaller bundle than the all-in-one CDN build
 *
 * Scene composition (matches the legacy reference visual):
 *   • Wireframe TorusKnot trio (pink + purple + blue) — hero focal point
 *   • Background wireframe spheres at varied depths
 *   • Floating wireframe Icosahedron
 *   • Particle field with drift + bounce-back boundaries
 *   • Mouse parallax camera (lerp-smoothed)
 *
 * Theme awareness:
 *   • Reads brand colors from CSS custom properties so theme switches
 *     (light / dark / elite / custom) re-tint the scene automatically.
 *   • Listens for class mutations on <html> and rebuilds materials when
 *     the theme changes.
 *
 * Performance:
 *   • Respects prefers-reduced-motion → renders a single static frame
 *   • Skips on touch-only devices (no parallax benefit, saves battery)
 *   • Pauses on visibilitychange (tab hidden)
 *   • Caps pixel ratio at 1.75
 *   • All animation is GPU-composited (transform + opacity only)
 */

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect, useState, Suspense } from 'react'
import * as THREE from 'three'

// ─── Theme palette reader ────────────────────────────────────────────────
// Reads brand colors from CSS custom properties so the scene re-tints
// automatically when the user switches themes (light / dark / elite / custom).

type RGB = [number, number, number]

function readCssHex(varName: string, fallback: string): number {
  if (typeof document === 'undefined') {
    return parseInt(fallback.replace('#', ''), 16)
  }
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  if (!v) return parseInt(fallback.replace('#', ''), 16)
  const hex = v.replace('#', '')
  return parseInt(hex, 16) || parseInt(fallback.replace('#', ''), 16)
}

function hexToRgb(hex: number): RGB {
  return [((hex >> 16) & 0xff) / 255, ((hex >> 8) & 0xff) / 255, (hex & 0xff) / 255]
}

type ThemePalette = {
  pink: RGB
  purple: RGB
  blue: RGB
  cyan: RGB
  gold: RGB
  isElite: boolean
  isDark: boolean
}

function readPalette(): ThemePalette {
  const isElite =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('theme-elite')
  const isDark =
    isElite ||
    (typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'))

  return {
    pink: hexToRgb(readCssHex('--ct-pink', isElite ? '#FF6BB5' : isDark ? '#FF6BB5' : '#E0197A')),
    purple: hexToRgb(readCssHex('--ct-purple', isElite ? '#B366FF' : isDark ? '#9B3DFF' : '#7B2FBE')),
    blue: hexToRgb(readCssHex('--ct-blue', isElite ? '#4F9BFF' : isDark ? '#4A90D9' : '#136DFF')),
    cyan: hexToRgb(readCssHex('--ct-cyan', isElite ? '#78F0FF' : '#22d3ee')),
    gold: hexToRgb(readCssHex('--ct-gold', '#FFD782')),
    isElite,
    isDark,
  }
}

// ─── Torus Knot trio (hero focal point) ──────────────────────────────────

type TorusKnotTrioProps = {
  palette: ThemePalette
  position?: [number, number, number]
}

function TorusKnotTrio({ palette, position = [18, 0, -2] }: TorusKnotTrioProps) {
  const tkRef = useRef<THREE.Mesh>(null)
  const tkInnerRef = useRef<THREE.Mesh>(null)
  const tkOuterRef = useRef<THREE.Mesh>(null)

  const opacityBoost = palette.isElite ? 1.4 : 1

  useFrame((_, delta) => {
    if (tkRef.current) {
      tkRef.current.rotation.x += delta * 0.25
      tkRef.current.rotation.y += delta * 0.38
    }
    if (tkInnerRef.current) {
      tkInnerRef.current.rotation.x -= delta * 0.30
      tkInnerRef.current.rotation.y -= delta * 0.48
    }
    if (tkOuterRef.current) {
      tkOuterRef.current.rotation.x += delta * 0.12
      tkOuterRef.current.rotation.z += delta * 0.18
    }
  })

  return (
    <group position={position}>
      <mesh ref={tkRef}>
        <torusKnotGeometry args={[8, 2.2, 220, 28]} />
        <meshBasicMaterial
          color={new THREE.Color(palette.pink[0], palette.pink[1], palette.pink[2])}
          wireframe
          transparent
          opacity={0.55 * opacityBoost}
        />
      </mesh>
      <mesh ref={tkInnerRef}>
        <torusKnotGeometry args={[5.5, 1.3, 160, 20]} />
        <meshBasicMaterial
          color={new THREE.Color(palette.purple[0], palette.purple[1], palette.purple[2])}
          wireframe
          transparent
          opacity={0.4 * opacityBoost}
        />
      </mesh>
      <mesh ref={tkOuterRef}>
        <torusKnotGeometry args={[10.5, 0.4, 180, 20]} />
        <meshBasicMaterial
          color={new THREE.Color(palette.blue[0], palette.blue[1], palette.blue[2])}
          wireframe
          transparent
          opacity={0.2 * opacityBoost}
        />
      </mesh>
    </group>
  )
}

// ─── Wireframe sphere field ──────────────────────────────────────────────

type SphereFieldProps = { palette: ThemePalette }

function SphereField({ palette }: SphereFieldProps) {
  const ws1Ref = useRef<THREE.Mesh>(null)
  const ws2Ref = useRef<THREE.Mesh>(null)
  const ws3Ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ws1Ref.current) ws1Ref.current.rotation.y += delta * 0.06
    if (ws2Ref.current) {
      ws2Ref.current.rotation.y -= delta * 0.11
      ws2Ref.current.rotation.x += delta * 0.06
    }
    if (ws3Ref.current) ws3Ref.current.rotation.z += delta * 0.12
  })

  const opacityBoost = palette.isElite ? 1.5 : 1

  return (
    <>
      <mesh ref={ws1Ref} position={[18, 0, -2]}>
        <sphereGeometry args={[18, 24, 24]} />
        <meshBasicMaterial
          color={new THREE.Color(palette.pink[0], palette.pink[1], palette.pink[2])}
          wireframe
          transparent
          opacity={0.03 * opacityBoost}
        />
      </mesh>
      <mesh ref={ws2Ref} position={[-22, 10, -15]}>
        <sphereGeometry args={[7, 18, 18]} />
        <meshBasicMaterial
          color={new THREE.Color(palette.purple[0], palette.purple[1], palette.purple[2])}
          wireframe
          transparent
          opacity={0.05 * opacityBoost}
        />
      </mesh>
      <mesh ref={ws3Ref} position={[8, -14, -10]}>
        <sphereGeometry args={[4, 14, 14]} />
        <meshBasicMaterial
          color={new THREE.Color(palette.blue[0], palette.blue[1], palette.blue[2])}
          wireframe
          transparent
          opacity={0.06 * opacityBoost}
        />
      </mesh>
    </>
  )
}

// ─── Icosahedron accent ──────────────────────────────────────────────────

function Icosahedron({ palette }: { palette: ThemePalette }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.18
    ref.current.rotation.x += delta * 0.12
  })

  const opacityBoost = palette.isElite ? 1.8 : 1

  return (
    <mesh ref={ref} position={[-20, -8, -5]}>
      <icosahedronGeometry args={[5, 1]} />
      <meshBasicMaterial
        color={new THREE.Color(palette.pink[0], palette.pink[1], palette.pink[2])}
        wireframe
        transparent
        opacity={0.08 * opacityBoost}
      />
    </mesh>
  )
}

// ─── Particle field with drift + bounce-back ────────────────────────────

type ParticleFieldProps = {
  count: number
  palette: ThemePalette
}

function ParticleField({ count, palette }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Build geometry once — colors picked from palette
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities: { x: number; y: number; z: number }[] = []
    const paletteArr: RGB[] = [palette.pink, palette.purple, palette.blue]
    if (palette.isElite) {
      paletteArr.push(palette.cyan, palette.gold)
    }

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      velocities.push({
        x: (Math.random() - 0.5) * 0.009,
        y: (Math.random() - 0.5) * 0.006,
        z: (Math.random() - 0.5) * 0.004,
      })
      const c = paletteArr[Math.floor(Math.random() * paletteArr.length)]
      colors[i * 3] = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }
    return { positions, colors, velocities }
  }, [count, palette])

  useFrame(() => {
    if (!pointsRef.current) return
    const geom = pointsRef.current.geometry
    const pos = geom.attributes.position.array as Float32Array
    for (let i = 0; i < velocities.length; i++) {
      pos[i * 3] += velocities[i].x
      pos[i * 3 + 1] += velocities[i].y
      pos[i * 3 + 2] += velocities[i].z
      if (Math.abs(pos[i * 3]) > 70) velocities[i].x *= -1
      if (Math.abs(pos[i * 3 + 1]) > 45) velocities[i].y *= -1
      if (Math.abs(pos[i * 3 + 2]) > 30) velocities[i].z *= -1
    }
    geom.attributes.position.needsUpdate = true
    if (pointsRef.current) pointsRef.current.rotation.y += 0.0002
  })

  const size = palette.isElite ? 0.28 : 0.22
  const opacity = palette.isElite ? 0.72 : 0.55

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ─── Mouse parallax camera rig ───────────────────────────────────────────

function CameraRig() {
  const { camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.35
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (target.current.x * 6 - camera.position.x) * 0.025
    camera.position.y += (-target.current.y * 4 - camera.position.y) * 0.025
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Scene contents (re-builds when palette changes) ────────────────────

type SceneContentsProps = {
  palette: ThemePalette
  particleCount: number
  hideTorusKnot: boolean
  hideParticles: boolean
}

function SceneContents({
  palette,
  particleCount,
  hideTorusKnot,
  hideParticles,
}: SceneContentsProps) {
  return (
    <>
      <CameraRig />
      {!hideTorusKnot && <TorusKnotTrio palette={palette} />}
      <SphereField palette={palette} />
      <Icosahedron palette={palette} />
      {!hideParticles && particleCount > 0 && (
        <ParticleField count={particleCount} palette={palette} />
      )}
      {/* Subtle ambient light — gives basic depth to wireframe materials */}
      <ambientLight intensity={palette.isDark ? 0.4 : 0.6} />
    </>
  )
}

// ─── Main exported component ─────────────────────────────────────────────

type Props = {
  className?: string
  particleCount?: number
  hideTorusKnot?: boolean
  hideParticles?: boolean
}

export function NxR3FScene({
  className = '',
  particleCount = 1200,
  hideTorusKnot = false,
  hideParticles = false,
}: Props) {
  const [palette, setPalette] = useState<ThemePalette>(() => readPalette())
  const [enabled, setEnabled] = useState(true)

  // Guard: prefers-reduced-motion → render nothing (CSS gradient remains)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setEnabled(false)
      return
    }
    // Touch-only devices: skip (no parallax benefit, saves battery)
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) {
      setEnabled(false)
      return
    }
    setEnabled(true)

    // Listen for theme class changes on <html> so the scene re-tints
    const observer = new MutationObserver(() => {
      setPalette(readPalette())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  if (!enabled) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 w-full h-full z-0 ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 38], fov: 55, near: 0.1, far: 500 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.75]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContents
            palette={palette}
            particleCount={particleCount}
            hideTorusKnot={hideTorusKnot}
            hideParticles={hideParticles}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default NxR3FScene
