'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import { NxNavbar } from "./nx-navbar"
import { NxFooter } from "./nx-footer"
import { ScrollProgressBar, ScrollToTop } from "./scroll-animations"
import { Nx3DCharacter } from "./nx-3d-character"
import { Nx3DScene } from "./nx-3d-scene"
import dynamic from "next/dynamic"

/* Three.js ambient background for inner pages — lighter than the homepage
 * version: torus knot is hidden (would clutter), only particles + icosahedron
 * + wireframe spheres drift in the background. Lazy-loaded, client-only. */
const NxThreeScene = dynamic(
  () => import("./nx-three-scene").then((m) => m.NxThreeScene),
  { ssr: false }
)

/* NX PAGE LAYOUT — wraps every inner page with the new competitor-inspired
 * design system. Provides:
 *  - .theme-nx scope (so --nx-* tokens flip correctly under html.dark)
 *  - NxNavbar (dark navy sticky bar with mega menus)
 *  - main content slot
 *  - NxFooter (dark navy multi-column)
 *  - ScrollProgressBar + ScrollToTop (existing scroll utilities)
 *
 * Light/dark mode:
 *  - In light mode: white page bg, dark navy navbar/footer (intentional contrast)
 *  - In dark mode: navy page bg, navbar/footer remain dark (consistent)
 *  - All adaptive surfaces/text use .nx-surface / .nx-text utility classes
 */

type NxPageLayoutProps = {
  children: React.ReactNode
  /** Optional className for the <main> element */
  mainClassName?: string
}

export function NxPageLayout({ children, mainClassName = "" }: NxPageLayoutProps) {
  return (
    <div className="theme-nx min-h-screen nx-surface nx-text relative">
      {/* Three.js ambient background — particles + icosahedron + wireframe spheres only
          (torus knot hidden to avoid clutter on inner pages). */}
      <NxThreeScene hideTorusKnot particleCount={600} />
      <NxNavbar />
      <main className={`relative z-10 ${mainClassName}`}>{children}</main>
      <NxFooter />
      <ScrollProgressBar />
      <ScrollToTop />
    </div>
  )
}

/* NX PAGE HERO — consistent hero header for every inner page.
 * Pattern: dark band (consistent with homepage hero) with breadcrumb,
 * eyebrow pill, big headline, optional subtext, optional CTAs.
 *
 * Uses the new ClickTake brand design — pink/blue gradient accents,
 * tri-stop dark background with radial glows.
 *
 * Use on: About, Services, Solutions, Careers, Case Studies, Blog, Contact,
 * Pricing, Portfolio, Resources, Team, Legal pages.
 */

type NxPageHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  crumbs?: { label: string; href?: string }[]
  ctas?: React.ReactNode
  /** Center-aligned hero (default) or left-aligned */
  align?: "center" | "left"
  /** Optional stats row below hero text */
  stats?: { value: string; label: string }[]
  /**
   * 3D character variant — when set, the hero splits into a 2-col layout
   * (text + character). Choose the variant to match the page topic:
   *   "about" | "services" | "solutions" | "careers" | "case-studies" |
   *   "blog" | "contact" | "pricing" | "portfolio" | "team" | "resources" |
   *   "legal" | "service-detail" | "solution-detail" | "blog-post" | "default"
   */
  character?:
    | "about"
    | "services"
    | "solutions"
    | "careers"
    | "case-studies"
    | "blog"
    | "contact"
    | "pricing"
    | "portfolio"
    | "team"
    | "resources"
    | "legal"
    | "service-detail"
    | "solution-detail"
    | "blog-post"
    | "default"
  /** Show the floating-3D-shapes scene behind the hero (default: true) */
  scene?: boolean
}

export function NxPageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  ctas,
  align = "center",
  stats,
  character,
  scene = true,
}: NxPageHeroProps) {
  const isCenter = align === "center"
  const hasChar = Boolean(character)
  // If a character is set, force left-align so we have room for the visual
  const effectiveAlign = hasChar ? "left" : align
  const isEffCenter = effectiveAlign === "center"
  return (
    <section className="relative overflow-hidden nx-hero-bg pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20">
      {/* Subtle dot grid + orbs (matches homepage hero) */}
      <div className="absolute inset-0 nx-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-[#FF53A9]/15 blur-3xl nx-orb pointer-events-none" />
      <div
        className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[#136DFF]/20 blur-3xl nx-orb pointer-events-none"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-72 w-72 rounded-full bg-[#9B3DFF]/15 blur-3xl nx-orb pointer-events-none"
        style={{ animationDelay: "6s" }}
      />
      {/* 3D scene — floating geometric accents */}
      {scene && <Nx3DScene density="low" />}

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className={hasChar ? "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" : ""}>
          {/* ─── Copy column ─── */}
          <div>
            {/* Breadcrumbs */}
            {crumbs && crumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className={`flex items-center gap-1.5 text-xs text-white/60 ${isEffCenter ? "justify-center" : ""}`}
              >
                {crumbs.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3 w-3 text-white/30" />}
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white transition">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-white/80">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {/* Eyebrow */}
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`mt-4 inline-flex items-center gap-2 rounded-full border border-[#FF53A9]/30 bg-[#FF53A9]/10 px-3 py-1.5 text-xs font-mono uppercase tracking-[2px] text-[#FF8AC4] backdrop-blur ${
                  isEffCenter ? "flex mx-auto" : ""
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9] animate-pulse" />
                {eyebrow}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`mt-5 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] ${
                isEffCenter ? "text-center mx-auto max-w-4xl" : "max-w-3xl"
              }`}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className={`mt-5 text-base sm:text-lg text-white/70 leading-relaxed ${
                  isEffCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"
                }`}
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTAs */}
            {ctas && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className={`mt-8 flex flex-col sm:flex-row gap-3 ${
                  isEffCenter ? "justify-center" : ""
                }`}
              >
                {ctas}
              </motion.div>
            )}

            {/* Stats row */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className={`mt-12 grid grid-cols-2 ${stats.length >= 4 ? "lg:grid-cols-4" : stats.length === 3 ? "lg:grid-cols-3" : ""} gap-4`}
              >
                {stats.map((s, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="nx-stat-num text-3xl sm:text-4xl lg:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-white/60 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* ─── 3D character column ─── */}
          {hasChar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center min-h-[400px]"
            >
              <Nx3DCharacter variant={character} size="lg" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

/* NX PAGE SECTION — consistent inner-page section wrapper.
 * Light/dark adaptive background, standard vertical padding, container width.
 */

type NxPageSectionProps = {
  children: React.ReactNode
  /** Background variant — defaults to "surface" (white in light / navy in dark) */
  variant?: "surface" | "surface-alt" | "surface-muted" | "transparent" | "navy"
  /** Container width */
  width?: "default" | "narrow" | "wide" | "full"
  /** Vertical padding */
  padding?: "default" | "tight" | "loose" | "none"
  className?: string
  id?: string
}

export function NxPageSection({
  children,
  variant = "surface",
  width = "default",
  padding = "default",
  className = "",
  id,
}: NxPageSectionProps) {
  const bg =
    variant === "surface"
      ? "nx-surface"
      : variant === "surface-alt"
        ? "nx-surface-alt"
        : variant === "surface-muted"
          ? "nx-surface-muted"
          : variant === "navy"
            ? "nx-hero-bg"
            : ""
  const pad =
    padding === "default"
      ? "py-16 sm:py-20 lg:py-24"
      : padding === "tight"
        ? "py-10 sm:py-12"
        : padding === "loose"
          ? "py-24 sm:py-32"
          : ""
  const w =
    width === "narrow"
      ? "max-w-3xl"
      : width === "wide"
        ? "max-w-7xl"
        : width === "full"
          ? "max-w-full"
          : "max-w-6xl"

  return (
    <section id={id} className={`${bg} ${pad} ${className}`}>
      <div className={`mx-auto ${w} px-4 lg:px-8`}>{children}</div>
    </section>
  )
}

/* NX SECTION HEADER — consistent section heading block (eyebrow + title + subtitle).
 * Use inside NxPageSection. */

type NxSectionHeaderProps = {
  eyebrow?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  align?: "center" | "left"
  className?: string
}

export function NxSectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: NxSectionHeaderProps) {
  const isCenter = align === "center"
  return (
    <div className={`${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 nx-eyebrow text-[var(--nx-orange)] ${isCenter ? "" : ""}`}
        >
          <span className="h-1 w-8 rounded-full bg-[var(--nx-orange)]" />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight nx-text"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base sm:text-lg nx-text-soft leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

/* NX BUTTON — orange primary or outline secondary. For use in NxPageHero ctas. */

type NxButtonProps = {
  href: string
  children: React.ReactNode
  variant?: "orange" | "outline" | "dark"
  className?: string
}

/* NX BUTTON — orange primary, light outline, or dark secondary.
 * For use in NxPageHero ctas (always-dark hero bg) and deep-dive final CTA
 * section (solid brand-gradient bg).
 *
 * NOTE: The "outline" variant uses `nx-btn-outline-light` (white text/border)
 * which is correct for the dark hero / gradient CTA contexts where it's used.
 * Do NOT use the outline variant on light page sections — use "orange" or
 * "dark" instead.
 */
export function NxButton({ href, children, variant = "orange", className = "" }: NxButtonProps) {
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className={`nx-btn-outline-light inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base ${className}`}
      >
        {children}
        <ArrowRight className="h-4 w-4 nx-arrow" />
      </Link>
    )
  }
  if (variant === "dark") {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold rounded-full bg-[#0A0612] text-white hover:bg-[#1E1640] transition shadow-lg ${className}`}
      >
        {children}
        <ArrowRight className="h-4 w-4 nx-arrow" />
      </Link>
    )
  }
  return (
    <Link
      href={href}
      className={`nx-btn-orange inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 nx-arrow" />
    </Link>
  )
}
