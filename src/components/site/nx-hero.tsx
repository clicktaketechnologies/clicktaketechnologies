'use client'

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Users, Globe, Activity, Zap } from "lucide-react"
import { SITE } from "@/lib/site-data"
import { METRICS, metricFormatters } from "@/lib/metrics"
import { LiveStatBadge } from "@/components/site/live-stat-badge"
import { ClickTakeMascot } from "@/components/site/clicktake-mascot"

/* CLICKTAKE HERO — Engineering Tomorrow's Intelligence design.
 * Gadget Doctor-inspired layout: split hero with 3D robot character
 * on the right, 4-column trust badge row + dual CTA on the left.
 *
 * Left: badge → headline → subtext → 2 CTAs → 4-col trust metric grid → compliance badges
 * Right: 3D robot character (CSS/SVG-based) + 2 floating glass widgets
 *
 * Brand colors: #FF53A9 pink, #136DFF blue, #9B3DFF purple.
 * Background: deep navy with radial gradient atmosphere.
 *
 * METRIC SOURCING — every number in this component comes from
 * `@/lib/metrics`, the single source of truth for platform metrics.
 * The two LIVE badges (commits + coverage) are fetched at runtime via
 * `/api/stats/github` and rendered by `<LiveStatBadge>`; all other
 * numbers (teams, continents, uptime, API req/day) come from `METRICS`
 * so the Hero stays consistent with the StatsBar and Footer.
 *
 * GADGET DOCTOR DESIGN PATTERNS ADOPTED:
 *   • 4-column compact trust badge row (icon + value + label)
 *   • Dual CTA pattern (primary gradient + secondary outline)
 *   • Glassmorphism surfaces via .gd-card-compact / .gd-icon-circle
 */
export function NxHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  // 4-column trust metric grid — Gadget Doctor pattern. Each badge has
  // an icon, a big value, and a tiny uppercase label. Reads from METRICS
  // so the numbers stay consistent with StatsBar + Footer.
  const trustBadges = [
    {
      icon: Users,
      value: metricFormatters.plus(METRICS.TEAMS_SERVED),
      label: "Teams served",
      color: "pink" as const,
    },
    {
      icon: Globe,
      value: String(METRICS.CONTINENTS_SERVED),
      label: "Continents",
      color: "blue" as const,
    },
    {
      icon: Activity,
      value: metricFormatters.percent(METRICS.UPTIME_SLA_PERCENT),
      label: "Uptime SLA",
      color: "purple" as const,
    },
    {
      icon: Zap,
      value: METRICS.API_REQUESTS_PER_DAY,
      label: "API / day",
      color: "pink" as const,
    },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden nx-surface nx-hero-bg"
      // `overflow-hidden` on the section catches any absolutely-positioned
      // decorative children (orbs, gradients) that extend past the viewport
      // so they don't trigger horizontal scroll on mobile.
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

      {/* Floating orbs — pointer-events-none + hidden on mobile to prevent
          horizontal overflow from the -left-20 / -right-20 offsets. The orbs
          are purely decorative; on small screens they'd cause a 4px horizontal
          scroll because their absolutely-positioned bounds extend past the
          viewport. We clamp with `inset-x-0` parent + `overflow-hidden` on the
          section, AND hide the orbs below `sm:` as a belt-and-braces measure. */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#9B3DFF]/20 blur-3xl nx-orb pointer-events-none hidden sm:block" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#FF53A9]/15 blur-3xl nx-orb pointer-events-none hidden sm:block" style={{ animationDelay: "3s" }} />

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
              agents, and cloud architecture for global enterprises — trusted by{" "}
              <strong className="font-semibold text-white">
                {metricFormatters.plus(METRICS.TEAMS_SERVED)} teams
              </strong>{" "}
              across{" "}
              <strong className="font-semibold text-white">
                {METRICS.CONTINENTS_SERVED} continents
              </strong>{" "}
              with{" "}
              <strong className="font-semibold text-white">
                {metricFormatters.percent(METRICS.UPTIME_SLA_PERCENT)} uptime
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-white">
                {METRICS.API_REQUESTS_PER_DAY} API requests served
              </strong>{" "}
              every day.
            </motion.p>

            {/* CTAs — Dual CTA pattern (Gadget Doctor style):
                primary gradient "Start Your Project" + secondary outline "View Case Studies".
                Both buttons share the same height + rounded-full so they stack cleanly. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="gd-btn-primary group text-sm sm:text-base"
                style={{ padding: "1rem 2rem" }}
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/case-studies"
                className="gd-btn-secondary gd-btn-on-dark text-sm sm:text-base"
                style={{ padding: "1rem 2rem" }}
              >
                View Case Studies
              </Link>
            </motion.div>

            {/* ─── 4-COLUMN TRUST BADGE ROW (Gadget Doctor pattern) ───────
                Compact stat cards with icon-circle + value + label.
                Reads from METRICS so the numbers stay consistent with
                StatsBar + Footer. 2x2 on mobile, 4-col on sm+. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0"
            >
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <div
                    key={i}
                    className="gd-card-compact gd-trust-badge"
                  >
                    <div
                      className={`gd-icon-circle ${badge.color === "blue" ? "gd-icon-blue" : badge.color === "purple" ? "gd-icon-purple" : ""}`}
                      style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem" }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="gd-trust-value text-base sm:text-lg">
                        {badge.value}
                      </div>
                      <div className="gd-trust-label">{badge.label}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* Compliance badges — SOC 2 / AWS / GDPR row. Kept separate
                from the metric trust badges above because these are
                certification badges, not performance metrics. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-3"
            >
              {["SOC 2 Type II", "AWS · GCP · Azure", "99.9% SLA", "GDPR · CCPA"].map(
                (badge) => (
                  <div
                    key={badge}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/60"
                  >
                    <Shield className="h-3.5 w-3.5 text-[#60A5FA]" />
                    {badge}
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* ─── RIGHT: 3D Mascot + Floating HUD Widgets ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ minHeight: "500px" }}
          >
            {/* Glow behind mascot */}
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 60%)",
              }}
            />

            {/* 3D Mascot — detailed SVG from reference design (VR headset + tablet) */}
            <ClickTakeMascot variant="dev" className="relative z-10 w-full max-w-md" />

            {/* Floating Widget 1 — Top Right: BUILD PIPELINE (live test coverage)
                Backed by /api/stats/github. Falls back to LIVE_STATS_FALLBACK
                when the API is unreachable or rate-limited — the visitor
                always sees a populated widget. Wrapped in <ErrorBoundary>
                internally so a render-time exception in the hook degrades to
                a static value instead of crashing the Hero. */}
            <LiveStatBadge
              statKey="coverage"
              className="absolute top-4 -right-4 z-20"
            />

            {/* Floating Widget 2 — Bottom Left: LIVE DEPLOY (commits this week)
                Backed by /api/stats/github. Same resilience contract as the
                coverage badge — see comment above. */}
            <LiveStatBadge
              statKey="commits"
              className="absolute bottom-8 -left-4 z-20"
            />
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

