'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Activity } from "lucide-react"
import { SITE } from "@/lib/site-data"
import { NeuralNetworkCanvas } from "./enhanced/neural-network-canvas"
import { ScrollIndicator } from "./enhanced/scroll-indicator"

/* CLICKTAKE HERO — 3D floating dashboard card design.
 * Inspired by clicktake-final.html — deep purple-black background with
 * particle canvas, gradient orbs, 3D floating dashboard card with mini
 * chart bars, two floating pill cards (live stats + expertise bars),
 * orbit rings around the central visual.
 *
 * Left: badge → headline (gradient) → subtext → 2 CTAs → trust row.
 * Right: 3D floating dashboard card + 2 floating pills + orbit rings.
 *
 * Brand colors: #FF53A9 pink, #136DFF blue, #9B3DFF purple.
 * Background: #0A0612 → #100820 tri-stop dark with radial glows.
 */
export function NxHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const dashRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* Particle canvas — matches the clicktake-final.html particle effect */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0, H = 0
    let raf = 0
    const PCOLS = ["rgba(255,83,169,", "rgba(19,109,255,", "rgba(155,61,255,"]

    type Particle = {
      x: number; y: number; vx: number; vy: number; r: number
      c: string; a: number; life: number; age: number
      reset: () => void
      step: () => void
      draw: () => void
    }
    const particles: Particle[] = []
    let mx = 0, my = 0

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener("mousemove", onMove)

    const makeParticle = (): Particle => {
      const p = {
        x: 0, y: 0, vx: 0, vy: 0, r: 0,
        c: PCOLS[0], a: 0, life: 0, age: 0,
        reset() {
          p.x = Math.random() * W
          p.y = Math.random() * H
          p.vx = (Math.random() - 0.5) * 0.4
          p.vy = (Math.random() - 0.5) * 0.4
          p.r = Math.random() * 1.8 + 0.4
          p.c = PCOLS[Math.floor(Math.random() * PCOLS.length)]
          p.a = Math.random() * 0.4 + 0.07
          p.life = Math.random() * 300 + 100
          p.age = 0
        },
        step() {
          p.x += p.vx; p.y += p.vy; p.age++
          const dx = mx - p.x, dy = my - p.y
          const d = Math.hypot(dx, dy)
          if (d < 120) { p.vx += dx / d * 0.012; p.vy += dy / d * 0.012 }
          p.vx *= 0.993; p.vy *= 0.993
          if (p.age > p.life || p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset()
        },
        draw() {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = p.c + p.a + ")"
          ctx.fill()
        },
      } as Particle
      p.reset()
      return p
    }
    for (let i = 0; i < 80; i++) particles.push(makeParticle())

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d < 88) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,83,169,${(1 - d / 88) * 0.09})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const anim = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.step(); p.draw() })
      drawLines()
      raf = requestAnimationFrame(anim)
    }
    anim()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  /* 3D mouse tilt for dashboard card — pauses the floating animation
     while the user hovers, and applies a rotateX/rotateY transform
     based on cursor position relative to the hero center. */
  useEffect(() => {
    const hero = heroRef.current
    const dash = dashRef.current
    if (!hero || !dash) return

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const rx = (e.clientY - cy) / cy * 8
      const ry = (e.clientX - cx) / cx * 8
      dash.style.animationPlayState = "paused"
      dash.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => {
      dash.style.animationPlayState = "running"
      dash.style.transform = ""
    }
    hero.addEventListener("mousemove", onMove)
    hero.addEventListener("mouseleave", onLeave)
    return () => {
      hero.removeEventListener("mousemove", onMove)
      hero.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden nx-hero-bg pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ zIndex: 0 }}
      />

      {/* Neural network overlay — mouse-reactive nodes forming connections
          with data packets flowing along edges. Sits above the base particle
          canvas but below the glow orbs and content. pointer-events-none so
          it doesn't block hero clicks (we read mousemove globally). */}
      <NeuralNetworkCanvas
        className="absolute inset-0 opacity-60"
        style={{ zIndex: 1 }}
        density="medium"
        linkRadius={150}
        cursorRadius={220}
        colors={{
          nodeA: "255, 83, 169",
          nodeB: "19, 109, 255",
          nodeC: "155, 61, 255",
          edge: "255, 83, 169",
          packet: "255, 255, 255",
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#FF53A9]/20 blur-3xl nx-orb pointer-events-none" />
      <div
        className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#136DFF]/25 blur-3xl nx-orb pointer-events-none"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 h-80 w-80 rounded-full bg-[#9B3DFF]/15 blur-3xl nx-orb pointer-events-none"
        style={{ animationDelay: "6s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT: copy column ─── */}
          <div className="text-center lg:text-left">
            {/* Badge — Space-Mono style tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#FF53A9]/30 bg-[#FF53A9]/10 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[2px] text-[#FF53A9]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9] animate-pulse" />
              Connecting in a Better Way
            </motion.div>

            {/* Headline — bold gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05]"
            >
              <span className="block nx-text-hero-grad">Web Design Services</span>
              <span className="block nx-text-brand-grad animate-gradient">That Build, Market</span>
              <span className="block nx-text-hero-grad">&amp; Scale Ambitious Brands.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
              style={{ color: "rgba(255, 255, 255, 0.75)" }}
            >
              We design, ship and grow websites, SaaS platforms, mobile apps and AI
              automation systems for ambitious brands across the UK, Pakistan, USA &amp; Dubai —
              120+ projects delivered since {SITE.founded}.
            </motion.p>

            {/* CTAs — pink primary + outline secondary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="group nx-btn-orange inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4 nx-arrow" />
              </Link>
              <Link
                href="/portfolio"
                className="nx-btn-outline-light inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Trust row — stats inline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black nx-stat-num">120+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">Projects Shipped</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black nx-stat-num">5.0★</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">Clutch Rating</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black nx-stat-num">6+ Yrs</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">Excellence</div>
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT: 3D floating dashboard card ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
            style={{ perspective: "1000px" }}
          >
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Orbit rings — decorative rotating rings around the card */}
              <div
                className="absolute inset-0 rounded-full border border-[#FF53A9]/15 pointer-events-none"
                style={{
                  width: "480px",
                  height: "480px",
                  animation: "spin 30s linear infinite",
                  transform: "rotateX(72deg)",
                }}
              >
                <div className="absolute top-0 left-1/2 -ml-1 h-2 w-2 rounded-full bg-[#FF53A9] shadow-[0_0_14px_#FF53A9,0_0_28px_#FF53A9]" />
              </div>
              <div
                className="absolute inset-0 rounded-full border border-[#136DFF]/12 pointer-events-none"
                style={{
                  width: "560px",
                  height: "560px",
                  animation: "spin 25s linear infinite reverse",
                  transform: "rotateX(72deg)",
                }}
              >
                <div className="absolute bottom-0 left-1/2 -ml-1 h-1.5 w-1.5 rounded-full bg-[#136DFF] shadow-[0_0_12px_#136DFF,0_0_22px_#136DFF]" />
              </div>

              {/* Main 3D dashboard card */}
              <div
                ref={dashRef}
                className="relative w-[340px] h-[410px]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: "dashFloat 7s ease-in-out infinite",
                }}
              >
                <style>{`
                  @keyframes dashFloat {
                    0%, 100% { transform: translateY(0) rotateX(3deg) rotateY(-4deg); }
                    33% { transform: translateY(-14px) rotateX(-2deg) rotateY(4deg); }
                    66% { transform: translateY(-7px) rotateX(4deg) rotateY(-2deg); }
                  }
                `}</style>

                <div
                  className="absolute w-[320px] h-[380px] top-[30px] left-[10px] rounded-2xl p-7 z-[3]"
                  style={{
                    background: "linear-gradient(145deg, rgba(22,16,42,0.95), rgba(12,8,24,0.98))",
                    border: "1px solid rgba(255,83,169,0.3)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,83,169,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Card header — logo + live dot */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="h-8 w-8 rounded-lg grid place-items-center font-black text-white text-xs nx-brand-gradient">
                      C
                    </div>
                    <span className="text-sm font-black nx-text-brand-grad">ClickTake</span>
                    <div className="ml-auto h-2 w-2 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676] animate-pulse" />
                  </div>

                  {/* Label */}
                  <div className="text-[10px] font-mono uppercase tracking-[2px] text-[#FF53A9] opacity-80 mb-3.5">
                    GROWTH ANALYTICS
                  </div>

                  {/* Big number */}
                  <div className="text-[2.4rem] font-black leading-none nx-stat-num mb-1">
                    +340%
                  </div>
                  <div className="text-xs text-white/60 mb-5">Organic growth — last 90 days</div>

                  {/* Mini chart bars */}
                  <div className="flex items-end gap-1.5 h-12 mb-5" id="dchart">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${i % 2 === 0 ? "" : "blue"}`}
                        style={{
                          height: `${h}%`,
                          background:
                            i % 2 === 0
                              ? "linear-gradient(180deg, #FF53A9, rgba(255,83,169,0.3))"
                              : "linear-gradient(180deg, #136DFF, rgba(19,109,255,0.3))",
                        }}
                      />
                    ))}
                  </div>

                  {/* 2x2 stat grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className="rounded-lg p-3"
                      style={{
                        background: "rgba(255,83,169,0.07)",
                        border: "1px solid rgba(255,83,169,0.12)",
                      }}
                    >
                      <div className="text-xl font-black text-[#FF53A9]">98%</div>
                      <div className="text-[10px] text-white/50 mt-0.5">Retention</div>
                    </div>
                    <div
                      className="rounded-lg p-3"
                      style={{
                        background: "rgba(19,109,255,0.07)",
                        border: "1px solid rgba(19,109,255,0.12)",
                      }}
                    >
                      <div className="text-xl font-black text-[#136DFF]">2.4x</div>
                      <div className="text-[10px] text-white/50 mt-0.5">ROI Avg</div>
                    </div>
                  </div>
                </div>

                {/* Floating pill 1 — top right (blue border) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 -right-3 z-[4] rounded-xl p-3.5 backdrop-blur-md"
                  style={{
                    background: "rgba(16,8,32,0.92)",
                    border: "1px solid rgba(19,109,255,0.3)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-6 w-6 rounded-md bg-[#136DFF]/20 grid place-items-center">
                      <TrendingUp className="h-3.5 w-3.5 text-[#4A90D9]" />
                    </div>
                    <span className="text-xs font-semibold text-white">Live Traffic</span>
                  </div>
                  <p className="text-[10px] text-white/60 leading-relaxed">
                    12,840 visitors today · +18%
                  </p>
                </motion.div>

                {/* Floating pill 2 — bottom right (pink border) — expertise bars */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-8 -right-5 z-[4] rounded-xl p-3.5 backdrop-blur-md min-w-[150px]"
                  style={{
                    background: "rgba(16,8,32,0.92)",
                    border: "1px solid rgba(255,83,169,0.3)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-[#FF53A9] mb-2.5">
                    EXPERTISE
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: "SEO", pct: 94, color: "linear-gradient(90deg,#FF53A9,#9B3DFF)" },
                      { name: "Web", pct: 91, color: "linear-gradient(90deg,#136DFF,#9B3DFF)" },
                      { name: "AI",  pct: 96, color: "linear-gradient(90deg,#9B3DFF,#FF53A9)" },
                    ].map(s => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="text-[10px] text-white/60 w-7">{s.name}</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating pill 3 — bottom left (green dot) — activity */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-0 -left-5 z-[4] rounded-xl p-3.5 backdrop-blur-md"
                  style={{
                    background: "rgba(16,8,32,0.92)",
                    border: "1px solid rgba(0,230,118,0.3)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-6 w-6 rounded-md bg-[#00e676]/20 grid place-items-center">
                      <Activity className="h-3.5 w-3.5 text-[#00e676]" />
                    </div>
                    <span className="text-xs font-semibold text-white">24/7 Live</span>
                  </div>
                  <p className="text-[10px] text-white/60 leading-relaxed">
                    All systems operational
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust row — partner badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-20 pt-8 border-t border-white/10"
        >
          <div className="text-center text-[10px] font-mono uppercase tracking-[3px] text-white/40 mb-4">
            Trusted Partners &amp; Platforms
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {["META PARTNER", "GOOGLE PARTNER", "SHOPIFY", "TIKTOK", "CLUTCH VERIFIED", "TRUSTPILOT ★★★★★"].map(p => (
              <span
                key={p}
                className="text-xs sm:text-sm font-semibold text-white/40 hover:text-[#FF53A9] transition-colors cursor-default tracking-wide"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — bounce-animated mouse cue at the bottom-center.
          Clicking scrolls to the next section. Hidden on small screens to
          avoid crowding the hero CTAs. */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <ScrollIndicator />
      </div>
    </section>
  )
}
