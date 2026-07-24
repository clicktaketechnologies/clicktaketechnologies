'use client'

import { useEffect, useRef } from "react";

/**
 * NxThreeScene — full Three.js ambient background matching the clicktake-3d-v3.html reference.
 *
 * Renders:
 *   • Wireframe TorusKnot trio (pink + purple + blue) as the hero focal point
 *   • Three wireframe spheres scattered at varied depths
 *   • Floating wireframe Icosahedron
 *   • Particle field with drift velocities + bounce-back boundaries
 *   • Mouse parallax camera movement (lerp-smoothed)
 *
 * Performance guardrails:
 *   • Lazy-loads three.js from CDN (no npm dep, no SSR bundle impact)
 *   • Respects prefers-reduced-motion → renders nothing (CSS gradient remains)
 *   • Pauses on visibilitychange (tab hidden)
 *   • Skips on touch-only devices (no mouse parallax benefit)
 *   • Caps pixel ratio at 1.75
 *   • All colors come from CSS custom properties (--ct-pink etc.) so the
 *     scene re-tints automatically when the theme switches.
 *
 * Brand colors (from globals.css):
 *   --ct-pink:   #E0197A
 *   --ct-purple: #7B2FBE
 *   --ct-blue:   #4A90D9
 */
type Props = {
  /** Optional className for the wrapping div (rarely needed). */
  className?: string
  /** Particle count — default 1200 (slightly less than reference's 1400 to keep mobile smooth). */
  particleCount?: number
  /** Disable the torus knot (e.g. for inner pages where it would clutter). */
  hideTorusKnot?: boolean
  /** Disable the particle field (for very low-end devices). */
  hideParticles?: boolean
}

// Read a CSS variable on <html> and parse as a hex int (0xRRGGBB).
function readCssHex(varName: string, fallback: number): number {
  if (typeof document === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  if (!v) return fallback
  const hex = v.replace('#', '')
  return parseInt(hex, 16) || fallback
}

export function NxThreeScene({
  className = "",
  particleCount = 1200,
  hideTorusKnot = false,
  hideParticles = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect prefers-reduced-motion — render nothing (the CSS gradient body
    // background already provides a beautiful ambient base).
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    // Skip on touch-only devices — no mouse parallax benefit, battery drain.
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return

    let destroyed = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let THREE: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scene: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let camera: any = null
    let running = true

    // Dynamic import — three.js from CDN. This keeps the Next.js bundle small
    // and matches the reference implementation exactly.
    const loadAndInit = async (): Promise<(() => void) | null> => {
      try {
        // three.js r128 — same version as the reference HTML.
        // Using dynamic import() of an ESM CDN URL (esm.sh) for reliability.
        // @ts-ignore — esm.sh URL has no type declarations in this project.
        THREE = await import(/* @vite-ignore */ ('https://esm.sh/three@0.128.0' as any))
        if (destroyed) return null

        // Read brand colors from CSS so theme switches re-tint the scene.
        const pink = readCssHex('--ct-pink', 0xE0197A)
        const purple = readCssHex('--ct-purple', 0x7B2FBE)
        const blue = readCssHex('--ct-blue', 0x4A90D9)

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
        renderer.setSize(window.innerWidth, window.innerHeight)

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          0.1,
          500
        )
        camera.position.set(0, 0, 38)

        // ─── Torus Knot trio (hero focal point, right side) ───────────────
        let tk: any = null, tkInner: any = null, tkOuter: any = null
        if (!hideTorusKnot) {
          tk = new THREE.Mesh(
            new THREE.TorusKnotGeometry(8, 2.2, 220, 28),
            new THREE.MeshBasicMaterial({ color: pink, wireframe: true, transparent: true, opacity: 0.55 })
          )
          tk.position.set(18, 0, -2)
          scene.add(tk)

          tkInner = new THREE.Mesh(
            new THREE.TorusKnotGeometry(5.5, 1.3, 160, 20),
            new THREE.MeshBasicMaterial({ color: purple, wireframe: true, transparent: true, opacity: 0.4 })
          )
          tkInner.position.set(18, 0, -2)
          scene.add(tkInner)

          tkOuter = new THREE.Mesh(
            new THREE.TorusKnotGeometry(10.5, 0.4, 180, 20),
            new THREE.MeshBasicMaterial({ color: blue, wireframe: true, transparent: true, opacity: 0.2 })
          )
          tkOuter.position.set(18, 0, -2)
          scene.add(tkOuter)
        }

        // ─── Background wireframe spheres ─────────────────────────────────
        const mkWireSphere = (r: number, segs: number, color: number, opacity: number, pos: [number, number, number]) => {
          const m = new THREE.Mesh(
            new THREE.SphereGeometry(r, segs, segs),
            new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity })
          )
          m.position.set(...pos)
          return m
        }
        const ws1 = mkWireSphere(18, 24, pink, 0.03, [18, 0, -2])
        const ws2 = mkWireSphere(7, 18, purple, 0.05, [-22, 10, -15])
        const ws3 = mkWireSphere(4, 14, blue, 0.06, [8, -14, -10])
        scene.add(ws1, ws2, ws3)

        // ─── Particle field ───────────────────────────────────────────────
        let pGeo: any = null, pts: any = null
        const pVel: { x: number; y: number; z: number }[] = []
        if (!hideParticles && particleCount > 0) {
          const pPos = new Float32Array(particleCount * 3)
          const pCol = new Float32Array(particleCount * 3)
          const palette: [number, number, number][] = [
            [((pink >> 16) & 0xff) / 255, ((pink >> 8) & 0xff) / 255, (pink & 0xff) / 255],
            [((purple >> 16) & 0xff) / 255, ((purple >> 8) & 0xff) / 255, (purple & 0xff) / 255],
            [((blue >> 16) & 0xff) / 255, ((blue >> 8) & 0xff) / 255, (blue & 0xff) / 255],
          ]
          for (let i = 0; i < particleCount; i++) {
            pPos[i * 3]     = (Math.random() - 0.5) * 140
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 90
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 60
            pVel.push({
              x: (Math.random() - 0.5) * 0.009,
              y: (Math.random() - 0.5) * 0.006,
              z: (Math.random() - 0.5) * 0.004,
            })
            const c = palette[Math.floor(Math.random() * 3)]
            pCol[i * 3] = c[0]; pCol[i * 3 + 1] = c[1]; pCol[i * 3 + 2] = c[2]
          }
          pGeo = new THREE.BufferGeometry()
          pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
          pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
          const pMat = new THREE.PointsMaterial({
            size: 0.22,
            vertexColors: true,
            transparent: true,
            opacity: 0.55,
            sizeAttenuation: true,
          })
          pts = new THREE.Points(pGeo, pMat)
          scene.add(pts)
        }

        // ─── Floating Icosahedron ─────────────────────────────────────────
        const ico = new THREE.Mesh(
          new THREE.IcosahedronGeometry(5, 1),
          new THREE.MeshBasicMaterial({ color: pink, wireframe: true, transparent: true, opacity: 0.08 })
        )
        ico.position.set(-20, -8, -5)
        scene.add(ico)

        // ─── Mouse parallax ───────────────────────────────────────────────
        let pmx = 0, pmy = 0
        const onMouseMove = (e: MouseEvent) => {
          pmx = (e.clientX / window.innerWidth - 0.5) * 0.5
          pmy = (e.clientY / window.innerHeight - 0.5) * 0.35
        }
        document.addEventListener('mousemove', onMouseMove, { passive: true })

        // ─── Animation loop ───────────────────────────────────────────────
        const loop = () => {
          if (!running) return
          rafRef.current = requestAnimationFrame(loop)

          if (tk) { tk.rotation.x += 0.004; tk.rotation.y += 0.006 }
          if (tkInner) { tkInner.rotation.x -= 0.005; tkInner.rotation.y -= 0.008 }
          if (tkOuter) { tkOuter.rotation.x += 0.002; tkOuter.rotation.z += 0.003 }
          ws1.rotation.y += 0.001
          ws2.rotation.y -= 0.0018; ws2.rotation.x += 0.001
          ws3.rotation.z += 0.002
          ico.rotation.y += 0.003; ico.rotation.x += 0.002
          if (pts) pts.rotation.y += 0.0002

          // Particle drift with bounce-back at boundaries.
          if (pGeo && pVel.length) {
            const pp = pGeo.attributes.position.array
            for (let i = 0; i < pVel.length; i++) {
              pp[i * 3]     += pVel[i].x
              pp[i * 3 + 1] += pVel[i].y
              pp[i * 3 + 2] += pVel[i].z
              if (Math.abs(pp[i * 3]) > 70)     pVel[i].x *= -1
              if (Math.abs(pp[i * 3 + 1]) > 45) pVel[i].y *= -1
              if (Math.abs(pp[i * 3 + 2]) > 30) pVel[i].z *= -1
            }
            pGeo.attributes.position.needsUpdate = true
          }

          // Lerp camera for smooth parallax.
          camera.position.x += (pmx * 6 - camera.position.x) * 0.025
          camera.position.y += (-pmy * 4 - camera.position.y) * 0.025
          camera.lookAt(scene.position)
          renderer.render(scene, camera)
        }
        rafRef.current = requestAnimationFrame(loop)

        // ─── Resize handler ───────────────────────────────────────────────
        const onResize = () => {
          if (!renderer || !camera) return
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize)

        // ─── Visibility — pause when tab hidden ───────────────────────────
        const onVisibility = () => {
          if (document.hidden) {
            running = false
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
          } else if (!running) {
            running = true
            rafRef.current = requestAnimationFrame(loop)
          }
        }
        document.addEventListener('visibilitychange', onVisibility)

        // Cleanup
        return () => {
          running = false
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          document.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('resize', onResize)
          document.removeEventListener('visibilitychange', onVisibility)
          // Dispose three.js resources
          try {
            scene?.traverse((obj: any) => {
              if (obj.geometry) obj.geometry.dispose?.()
              if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.())
                else obj.material.dispose?.()
              }
            })
            renderer?.dispose?.()
          } catch {}
        }
      } catch (err) {
        // CDN failure or WebGL unavailable — fail silently, CSS gradient remains.
        if (typeof console !== "undefined") console.warn('[NxThreeScene] init failed:', err)
        return null
      }
    }

    let cleanupFn: (() => void) | null = null
    loadAndInit().then((fn) => { if (fn) cleanupFn = fn })

    return () => {
      destroyed = true
      if (cleanupFn) cleanupFn()
      else if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [particleCount, hideTorusKnot, hideParticles])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 w-full h-full z-0 ${className}`}
    />
  )
}

export default NxThreeScene
