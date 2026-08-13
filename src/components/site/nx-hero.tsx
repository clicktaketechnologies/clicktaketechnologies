'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Activity, Shield } from "lucide-react"
import { SITE } from "@/lib/site-data"

/* CLICKTAKE HERO — Engineering Tomorrow's Intelligence design.
 * Matches user-uploaded screenshot: split layout with 3D robot character
 * on the right, floating glass widgets, trust badges row.
 *
 * Left: badge → headline (gradient on "Intelligence,") → subtext → 2 CTAs → trust badges
 * Right: 3D robot character (CSS/SVG-based) + 2 floating glass widgets
 *
 * Brand colors: #FF53A9 pink, #136DFF blue, #9B3DFF purple.
 * Background: deep navy with radial gradient atmosphere.
 */
export function NxHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden nx-surface nx-hero-bg"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 50%, rgba(19,109,255,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,83,169,0.08) 0%, transparent 50%), #050510",
      }}
    >
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#9B3DFF]/20 blur-3xl nx-orb pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#FF53A9]/15 blur-3xl nx-orb pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT: copy column ─── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#FF53A9]/30 bg-[#FF53A9]/10 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[2px] text-[#FF53A9]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9] animate-pulse" />
              Multi-Agent AI Platform Live
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-[-0.04em] leading-[1.02] text-white"
            >
              <span className="block">Engineering</span>
              <span className="block">Tomorrow's</span>
              <span className="block bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
                Intelligence,
              </span>
              <span className="block">Today.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
            >
              ClickTake Technologies ships production-grade software, autonomous AI
              agents, and cloud architecture for global enterprises — trusted by 150+
              teams across 4 continents with 99.9% uptime and 10M+ API requests served
              every day.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm sm:text-base font-bold text-white shadow-[0_8px_30px_rgba(155,61,255,0.35)] transition-all hover:shadow-[0_8px_40px_rgba(155,61,255,0.55)] hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)",
                }}
              >
                Book a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-7 py-4 text-sm sm:text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/30"
              >
                View Case Studies
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3"
            >
              {["SOC 2 Type II", "AWS · GCP · Azure", "99.9% SLA", "GDPR · CCPA"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/60"
                  >
                    <Shield className="h-3.5 w-3.5 text-[#60A5FA]" />
                    {badge}
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* ─── RIGHT: 3D Robot Character + Floating Widgets ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ minHeight: "500px" }}
          >
            {/* Glow behind character */}
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 60%)",
              }}
            />

            {/* 3D Robot Character — CSS/SVG-based stylized representation */}
            <RobotCharacter />

            {/* Floating Widget 1 — Top Right: BUILD PIPELINE */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 -right-4 z-20 rounded-2xl p-4 backdrop-blur-md border border-white/15"
              style={{
                background: "rgba(16,8,32,0.85)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-[#136DFF]/20 grid place-items-center">
                  <TrendingUp className="h-4 w-4 text-[#4A90D9]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/60">
                  Build Pipeline
                </span>
              </div>
              <div className="text-2xl font-black text-white">98%</div>
              <div className="text-[10px] text-white/50 mb-2">Test coverage</div>
              <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "98%",
                    background: "linear-gradient(90deg, #FF53A9, #9B3DFF)",
                  }}
                />
              </div>
            </motion.div>

            {/* Floating Widget 2 — Bottom Left: LIVE DEPLOY */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 -left-4 z-20 rounded-2xl p-4 backdrop-blur-md border border-white/15"
              style={{
                background: "rgba(16,8,32,0.85)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-7 w-7 rounded-lg bg-[#00e676]/20 grid place-items-center">
                  <Activity className="h-4 w-4 text-[#00e676]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/60">
                  Live Deploy
                </span>
              </div>
              <div className="text-2xl font-black text-white">+1,284</div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                commits this week
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] font-mono uppercase tracking-[2px]">Scroll</span>
          <div className="h-10 w-6 rounded-full border border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-white/60"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── 3D Robot Character (CSS/SVG-based) ───
 * Stylized cute robot with VR goggles holding a tablet.
 * Uses CSS shapes + gradients to approximate the 3D render from the screenshot. */
function RobotCharacter() {
  return (
    <div className="relative z-10" style={{ width: "320px", height: "400px" }}>
      {/* Body shadow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-md"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />

      {/* Body — dark blue outfit */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[60px] rounded-b-[40px]"
        style={{
          width: "200px",
          height: "220px",
          background: "linear-gradient(180deg, #1E3A8A 0%, #1E1B4B 100%)",
          boxShadow:
            "inset 0 -20px 40px rgba(0,0,0,0.3), inset 0 4px 8px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Heart emblem on chest */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2">
          <div
            className="w-10 h-10 rounded-full grid place-items-center"
            style={{
              background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)",
              boxShadow: "0 0 20px rgba(155,61,255,0.6)",
            }}
          >
            <span className="text-white text-lg">♥</span>
          </div>
        </div>
      </div>

      {/* Tablet — held at chest level */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-xl p-2 backdrop-blur-md"
        style={{
          bottom: "120px",
          width: "140px",
          height: "90px",
          background: "rgba(15,10,30,0.9)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* Tablet UI — bar chart */}
        <div className="flex items-end justify-between h-full gap-1 px-1">
          {[40, 65, 50, 80, 70, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h}%`, `${h + 10}%`, `${h}%`] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, #FF53A9, #9B3DFF)"
                    : "linear-gradient(180deg, #136DFF, #4A90D9)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Arms — holding tablet */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: "140px",
          left: "40px",
          width: "60px",
          height: "20px",
          background: "linear-gradient(180deg, #1E3A8A, #1E1B4B)",
          transform: "rotate(15deg)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          bottom: "140px",
          right: "40px",
          width: "60px",
          height: "20px",
          background: "linear-gradient(180deg, #1E3A8A, #1E1B4B)",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Head — round, peach/tan tone */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "20px",
          width: "160px",
          height: "150px",
          background:
            "linear-gradient(180deg, #F5C9A6 0%, #E8B88C 60%, #D4A574 100%)",
          boxShadow:
            "inset 0 -10px 20px rgba(0,0,0,0.15), inset 0 8px 12px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* VR Goggles — purple/blue frames */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-2xl"
          style={{
            top: "40px",
            width: "130px",
            height: "50px",
            background: "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
            boxShadow: "0 4px 12px rgba(79,70,229,0.4), inset 0 2px 4px rgba(255,255,255,0.2)",
          }}
        >
          {/* Left eye lens */}
          <div
            className="absolute rounded-full grid place-items-center"
            style={{
              left: "10px",
              top: "8px",
              width: "42px",
              height: "34px",
              background: "linear-gradient(135deg, #1E1B4B, #0F0A1E)",
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: "16px",
                height: "16px",
                background: "radial-gradient(circle at 30% 30%, #60A5FA, #3B82F6)",
                boxShadow: "0 0 8px rgba(96,165,250,0.6)",
              }}
            />
          </div>
          {/* Right eye lens */}
          <div
            className="absolute rounded-full grid place-items-center"
            style={{
              right: "10px",
              top: "8px",
              width: "42px",
              height: "34px",
              background: "linear-gradient(135deg, #1E1B4B, #0F0A1E)",
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: "16px",
                height: "16px",
                background: "radial-gradient(circle at 30% 30%, #F472B6, #EC4899)",
                boxShadow: "0 0 8px rgba(244,114,182,0.6)",
              }}
            />
          </div>
        </div>

        {/* Smile */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            bottom: "30px",
            width: "40px",
            height: "12px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: "0 0 20px 20px",
          }}
        />

        {/* Antenna */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-15px",
            width: "3px",
            height: "20px",
            background: "rgba(255,255,255,0.3)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -left-1.5 rounded-full"
            style={{
              width: "8px",
              height: "8px",
              background: "#FF53A9",
              boxShadow: "0 0 12px rgba(255,83,169,0.8)",
            }}
          />
        </div>
      </div>

      {/* Floating particles around character */}
      {[
        { top: "10%", left: "-5%", color: "#FF53A9", delay: 0 },
        { top: "30%", right: "-5%", color: "#136DFF", delay: 1 },
        { bottom: "20%", left: "-8%", color: "#9B3DFF", delay: 2 },
        { bottom: "10%", right: "-3%", color: "#EC4899", delay: 0.5 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: p.delay }}
          className="absolute rounded-full"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
            width: "8px",
            height: "8px",
            background: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}
