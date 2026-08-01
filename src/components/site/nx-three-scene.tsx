'use client'

/**
 * NxThreeScene — legacy compatibility shim.
 *
 * Originally this component dynamically imported Three.js from a CDN
 * (esm.sh/three@0.128.0) at runtime and built the scene imperatively.
 * That approach had three problems:
 *
 *   1. CDN dependency — adds a network round-trip and can fail in
 *      restricted environments (CSP, offline, corporate proxies).
 *   2. No TypeScript types — everything was `any`, breaking type safety.
 *   3. No code-splitting — the full Three.js bundle loaded even on
 *      pages that didn't use the scene.
 *
 * This file now re-exports the new R3F-based implementation (NxR3FScene)
 * so all existing imports keep working:
 *
 *   import { NxThreeScene } from "@/components/site/nx-three-scene"
 *
 * Internally, the actual scene lives in `./nx-r3f-scene` and uses
 * @react-three/fiber + @react-three/drei for declarative, typed 3D.
 *
 * If you're writing new code, prefer importing NxR3FScene directly.
 */

export { NxR3FScene as NxThreeScene } from './nx-r3f-scene'
export { NxR3FScene as default } from './nx-r3f-scene'
