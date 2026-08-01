"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Menu, X, List } from "lucide-react"
import { NxPageLayout, NxButton } from "../nx-page-layout"
import { Nx3DCharacter } from "../nx-3d-character"
import { Nx3DCharacterInteractive } from "../nx-3d-character-interactive"
import { NxStoryScene, type StoryVariant } from "../nx-story-scene"
import {
  Accordion,
  ComparisonTable,
  PullQuote,
  StarCaseStudy,
  UseCaseCard,
  MethodologyStep,
  FeatureGrid,
  PillList,
} from "./deep-dive-blocks"
import type {
  DeepDiveContent,
  DeepDiveHero,
} from "./deep-dive-types"
import {
  PillarContextBanner,
  RelatedResources,
} from "./hub-spoke-blocks"
import { getHubSpokeEntry } from "@/lib/seo/hub-spoke-map"
import {
  resolveCharacter,
  shouldOverrideCharacter,
} from "./service-character-map"

/* ─── Helpers ─────────────────────────────────────────────────────── */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

/** Sections list auto-built from content — drives the sticky ToC. */
function useTocEntries(content: DeepDiveContent) {
  return useMemo(() => {
    const entries: { id: string; label: string }[] = []
    const push = (title?: string) => {
      if (!title) return
      entries.push({ id: slugify(title), label: title })
    }
    push(content.problem?.title)
    push(content.deepDive?.title)
    push(content.techStack?.title)
    push(content.methodology?.title)
    push(content.useCases?.title)
    push(content.comparison?.title)
    push(content.businessImpact?.title)
    push(content.integrations?.title)
    push(content.caseStudies?.title)
    push(content.faq?.title)
    return entries
  }, [content])
}

/* ─── Reading Progress Bar ──────────────────────────────────────────
 * A thin gradient bar at the very top of the viewport that fills as the
 * user scrolls through the article. Distinct from the site-wide
 * ScrollProgressBar (which lives in NxPageLayout and tracks whole-page
 * scroll). This one tracks scroll within the article body only. */

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("deep-dive-article")
      if (!article) return
      const rect = article.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return (
    <div className="fixed top-0 inset-x-0 z-[55] h-1 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#FF53A9] via-[#9B3DFF] to-[#136DFF] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/* ─── Sticky Table of Contents ──────────────────────────────────────
 * Desktop: fixed left sidebar that highlights the active section.
 * Mobile: floating button bottom-right that opens a sheet. */

function StickyToc({ entries }: { entries: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? "")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      let current = entries[0]?.id ?? ""
      for (const e of entries) {
        const el = document.getElementById(e.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 140) current = e.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [entries])

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
    setMobileOpen(false)
  }

  if (entries.length === 0) return null

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider nx-text-muted">
            <List className="h-3.5 w-3.5" />
            On this page
          </div>
          <nav className="space-y-1 border-l nx-bd">
            {entries.map((e) => {
              const isActive = active === e.id
              return (
                <a
                  key={e.id}
                  href={`#${e.id}`}
                  onClick={(ev) => handleClick(ev, e.id)}
                  className={`block border-l-2 -ml-px px-3 py-1.5 text-sm transition ${
                    isActive
                      ? "border-[#FF53A9] nx-text font-medium"
                      : "border-transparent nx-text-muted hover:nx-text"
                  }`}
                >
                  {e.label}
                </a>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile FAB */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF53A9] to-[#136DFF] text-white shadow-lg shadow-[#FF53A9]/30"
        aria-label="Open table of contents"
      >
        <List className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-[#0A0612] border-l border-[#FF53A9]/20 overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono uppercase tracking-wider text-white/60">
                  On this page
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {entries.map((e) => (
                  <a
                    key={e.id}
                    href={`#${e.id}`}
                    onClick={(ev) => handleClick(ev, e.id)}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      active === e.id
                        ? "bg-white/10 text-white font-medium"
                        : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {e.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Section Wrapper ───────────────────────────────────────────────
 * Every section is wrapped with: scroll-mt for sticky-ToC offset, an
 * id matching the ToC entry, and a 3D character divider between major
 * sections to provide visual breathing room (Rule #2 of UX rules). */

function Section({
  id,
  children,
  divider,
}: {
  id: string
  children: React.ReactNode
  divider?: boolean
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 py-14 sm:py-16 lg:py-20 border-t border-white/5 first:border-t-0"
    >
      {divider && (
        <div className="flex justify-center mb-12 opacity-50">
          <div className="h-12 w-12">
            <Nx3DCharacter variant="default" size="sm" />
          </div>
        </div>
      )}
      {children}
    </section>
  )
}

/* ─── Section heading ─────────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string
  title: string
  intro?: string[]
}) {
  return (
    <header className="mb-10 max-w-3xl">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[2px] text-[var(--nx-brand-pink-deep)]">
          <span className="h-1 w-8 rounded-full bg-[#FF53A9]" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight nx-text">
        {title}
      </h2>
      {intro?.map((p, i) => (
        <p
          key={i}
          className="mt-4 text-base sm:text-[17px] nx-text-soft leading-relaxed"
        >
          {p}
        </p>
      ))}
    </header>
  )
}

/* ─── HERO ────────────────────────────────────────────────────────── */

function DeepDiveHeroBlock({
  hero,
  hubSpokeSlug,
  hubSpokeCluster,
  storyVariant,
}: {
  hero: DeepDiveHero
  hubSpokeSlug?: string
  hubSpokeCluster?: string
  storyVariant?: StoryVariant
}) {
  // Resolve the 3D character: if the content used the generic
  // "service-detail" / "solution-detail" placeholder, override it with
  // a cluster- or slug-specific character from the service-character-map.
  // This gives every cluster a distinct visual identity without touching
  // any of the 32 content files.
  const resolvedCharacter =
    hubSpokeSlug && shouldOverrideCharacter(hero.character)
      ? resolveCharacter(hubSpokeSlug, hubSpokeCluster)
      : hero.character
  const hasChar = Boolean(resolvedCharacter)
  return (
    <section className="relative overflow-hidden nx-hero-bg pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20">
      {/* Per-page 3D Story Scene — content-tied character + ambient orbs.
          Sits behind all hero content (z-0). */}
      {storyVariant && <NxStoryScene variant={storyVariant} />}
      <div className="absolute inset-0 nx-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-[#FF53A9]/15 blur-3xl nx-orb pointer-events-none" />
      <div
        className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[#136DFF]/20 blur-3xl nx-orb pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className={hasChar ? "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" : ""}>
          <div>
            {hero.crumbs && hero.crumbs.length > 0 && (
              <nav className="flex items-center gap-1.5 text-xs text-white/60">
                {hero.crumbs.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    {i > 0 && <span className="text-white/30">/</span>}
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white transition">{c.label}</Link>
                    ) : (
                      <span className="text-white/80">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FF53A9]/30 bg-[#FF53A9]/10 px-3 py-1.5 text-xs font-mono uppercase tracking-[2px] text-[#FF8AC4] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9] animate-pulse" />
              {hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-5 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] max-w-3xl"
            >
              {hero.title}
            </motion.h1>

            {hero.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl"
              >
                {hero.subtitle}
              </motion.p>
            )}

            {/* GEO definition — encyclopedic 3-sentence definition. Styled
                as a callout so AI engines + users can identify it. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 max-w-2xl"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-[#FF8AC4] mb-2">
                What this is
              </div>
              <p className="text-[15px] text-white/80 leading-relaxed">
                {hero.geoDefinition}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              {hero.ctas.map((cta, i) => (
                <NxButton key={i} href={cta.href} variant={cta.variant ?? "orange"}>
                  {cta.label}
                </NxButton>
              ))}
            </motion.div>

            {hero.stats && hero.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {hero.stats.map((s, i) => (
                  <div key={i}>
                    <div className="nx-stat-num text-3xl sm:text-4xl">{s.value}</div>
                    <div className="mt-1 text-xs text-white/60 uppercase tracking-wider">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {hasChar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center min-h-[400px]"
            >
              <Nx3DCharacterInteractive
                variant={resolvedCharacter!}
                size="lg"
                showClickHint={true}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── MAIN LAYOUT ─────────────────────────────────────────────────── */

export function DeepDiveLayout({
  content,
  hubSpokeSlug,
  storyVariant,
}: {
  content: DeepDiveContent
  /**
   * Slug matching an entry in HUB_SPOKE_MAP. When provided, the layout
   * auto-renders the PillarContextBanner (Cluster-to-Pillar link within
   * first 200 words) and the RelatedResources footer (Blogs/Case Studies/
   * Pricing + Sibling cross-links). If omitted, both sections are skipped.
   */
  hubSpokeSlug?: string
  /**
   * Per-page 3D story variant — mounts a <NxStoryScene> layer inside the
   * hero with a content-tied 3D character + ambient orbs.
   */
  storyVariant?: StoryVariant
}) {
  const tocEntries = useTocEntries(content)
  const hubSpokeEntry = hubSpokeSlug ? getHubSpokeEntry(hubSpokeSlug) : undefined

  return (
    <NxPageLayout mainClassName="">
      <ReadingProgress />
      <DeepDiveHeroBlock
        hero={content.hero}
        hubSpokeSlug={hubSpokeSlug}
        hubSpokeCluster={hubSpokeEntry?.cluster}
        storyVariant={storyVariant}
      />

      <div id="deep-dive-article" className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex gap-12">
          <StickyToc entries={tocEntries} />

          {/* Main content column */}
          <article className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0">
            {/* ── Hub & Spoke: Cluster-to-Pillar banner (within first 200 words) ── */}
            <PillarContextBanner entry={hubSpokeEntry} />

            {/* ── Section 2: Problem & Paradigm Shift ─────────────────── */}
            {content.problem && (
              <Section id={slugify(content.problem.title)}>
                <SectionHeading
                  eyebrow="The Problem"
                  title={content.problem.title}
                  intro={content.problem.intro}
                />
                <div className="grid gap-4 sm:grid-cols-2 mb-10">
                  {content.problem.painPoints.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500 dark:text-red-300">
                          {i + 1}
                        </span>
                        <h4 className="text-sm font-bold nx-text">{p.title}</h4>
                      </div>
                      <p className="text-sm nx-text-soft leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
                <PullQuote attribution="The ClickTake Approach">
                  {content.problem.paradigmShift.map((p, i) => (
                    <span key={i} className="block mb-2 last:mb-0">{p}</span>
                  ))}
                </PullQuote>
              </Section>
            )}

            {/* ── Section 3: Deep Dive ───────────────────────────────── */}
            {content.deepDive && (
              <Section id={slugify(content.deepDive.title)} divider>
                <SectionHeading
                  eyebrow="Deep Dive"
                  title={content.deepDive.title}
                  intro={content.deepDive.intro}
                />
                <div className="space-y-10">
                  {content.deepDive.subsections.map((sub, i) => (
                    <div key={i}>
                      <h3 className="text-xl font-bold nx-text mb-3 flex items-baseline gap-3">
                        <span className="text-sm font-mono text-[var(--nx-brand-pink-deep)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {sub.heading}
                      </h3>
                      {sub.body.map((p, j) => (
                        <p
                          key={j}
                          className="text-[15px] sm:text-base nx-text-soft leading-relaxed mb-3"
                        >
                          {p}
                        </p>
                      ))}
                      {sub.jargon && sub.jargon.length > 0 && (
                        <dl className="mt-4 grid sm:grid-cols-2 gap-3">
                          {sub.jargon.map((t) => (
                            <div
                              key={t.term}
                              className="rounded-xl border nx-bd nx-surface-alt p-4"
                            >
                              <dt className="text-sm font-bold text-[var(--nx-brand-pink-deep)] mb-1">
                                {t.term}
                              </dt>
                              <dd className="text-xs nx-text-muted leading-relaxed">
                                {t.def}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── Section 4: Tech Stack ──────────────────────────────── */}
            {content.techStack && (
              <Section id={slugify(content.techStack.title)} divider>
                <SectionHeading
                  eyebrow="Tech Stack"
                  title={content.techStack.title}
                  intro={content.techStack.intro}
                />
                <FeatureGrid categories={content.techStack.categories} />
                {content.techStack.comparisonTable && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold nx-text mb-4">
                      Feature comparison
                    </h3>
                    <ComparisonTable
                      headers={content.techStack.comparisonTable.headers}
                      rows={content.techStack.comparisonTable.rows}
                    />
                  </div>
                )}
              </Section>
            )}

            {/* ── Section 5: Methodology ─────────────────────────────── */}
            {content.methodology && (
              <Section id={slugify(content.methodology.title)} divider>
                <SectionHeading
                  eyebrow="Methodology"
                  title={content.methodology.title}
                  intro={content.methodology.intro}
                />
                <div className="space-y-2">
                  {content.methodology.steps.map((s, i) => (
                    <MethodologyStep
                      key={i}
                      index={i + 1}
                      phase={s.phase}
                      title={s.title}
                      duration={s.duration}
                      deliverables={s.deliverables}
                      description={s.description}
                      isLast={i === content.methodology!.steps.length - 1}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* ── Section 6: Use Cases ───────────────────────────────── */}
            {content.useCases && (
              <Section id={slugify(content.useCases.title)} divider>
                <SectionHeading
                  eyebrow="Use Cases"
                  title={content.useCases.title}
                  intro={content.useCases.intro}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  {content.useCases.cases.map((c, i) => (
                    <UseCaseCard key={i} {...c} />
                  ))}
                </div>
              </Section>
            )}

            {/* ── Section 7: Comparative Analysis ────────────────────── */}
            {content.comparison && (
              <Section id={slugify(content.comparison.title)} divider>
                <SectionHeading
                  eyebrow="Comparative Analysis"
                  title={content.comparison.title}
                  intro={content.comparison.intro}
                />
                <div className="space-y-8">
                  {content.comparison.tables.map((t, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold nx-text mb-4">{t.title}</h3>
                      <ComparisonTable headers={t.headers} rows={t.rows} />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── Section 8: Business Impact ─────────────────────────── */}
            {content.businessImpact && (
              <Section id={slugify(content.businessImpact.title)} divider>
                <SectionHeading
                  eyebrow="Business Impact"
                  title={content.businessImpact.title}
                  intro={content.businessImpact.intro}
                />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {content.businessImpact.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border nx-bd bg-gradient-to-br from-[#FF53A9]/10 to-transparent p-5 text-center"
                    >
                      <div className="text-3xl sm:text-4xl font-black nx-text nx-stat-num">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs font-mono uppercase tracking-wider text-[var(--nx-brand-pink-deep)]">
                        {m.label}
                      </div>
                      <div className="mt-2 text-xs nx-text-muted leading-relaxed">
                        {m.description}
                      </div>
                    </div>
                  ))}
                </div>
                {content.businessImpact.body.map((p, i) => (
                  <p
                    key={i}
                    className="text-[15px] sm:text-base nx-text-soft leading-relaxed mb-3"
                  >
                    {p}
                  </p>
                ))}
              </Section>
            )}

            {/* ── Section 9: Integrations ────────────────────────────── */}
            {content.integrations && (
              <Section id={slugify(content.integrations.title)} divider>
                <SectionHeading
                  eyebrow="Ecosystem"
                  title={content.integrations.title}
                  intro={content.integrations.intro}
                />
                <div className="space-y-6">
                  {content.integrations.categories.map((cat) => (
                    <div key={cat.name}>
                      <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--nx-brand-pink-deep)] mb-3">
                        {cat.name}
                      </h3>
                      <PillList items={cat.items} />
                    </div>
                  ))}
                </div>
                {content.integrations.compliance && content.integrations.compliance.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                    <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-300 mb-3">
                      Security &amp; Compliance
                    </h3>
                    <PillList items={content.integrations.compliance} />
                  </div>
                )}
              </Section>
            )}

            {/* ── Section 10: Case Studies ───────────────────────────── */}
            {content.caseStudies && (
              <Section id={slugify(content.caseStudies.title)} divider>
                <SectionHeading
                  eyebrow="Proof"
                  title={content.caseStudies.title}
                  intro={content.caseStudies.intro}
                />
                <div className="space-y-6">
                  {content.caseStudies.studies.map((s, i) => (
                    <StarCaseStudy key={i} {...s} />
                  ))}
                </div>
              </Section>
            )}

            {/* ── Section 11: FAQ ────────────────────────────────────── */}
            {content.faq && (
              <Section id={slugify(content.faq.title)} divider>
                <SectionHeading
                  eyebrow="FAQ"
                  title={content.faq.title}
                  intro={content.faq.intro}
                />
                <div className="space-y-8">
                  {content.faq.categories.map((cat) => (
                    <div key={cat.name}>
                      <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--nx-brand-pink-deep)] mb-3">
                        {cat.name}
                      </h3>
                      <Accordion items={cat.questions} />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* ── Section 12: Final CTA ────────────────────────────────
                Uses a SOLID brand gradient (pink → purple → blue) so white
                text always passes WCAG AA, regardless of light/dark mode.
                Previously a low-opacity tint that washed out in light mode. */}
            <Section id={slugify(content.finalCta.title)} divider>
              <div className="relative overflow-hidden rounded-3xl nx-brand-gradient p-8 sm:p-12 text-center shadow-2xl">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                    {content.finalCta.title}
                  </h2>
                  <p className="mt-4 text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
                    {content.finalCta.subtitle}
                  </p>
                  <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {content.finalCta.steps.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-sm p-5 text-left"
                      >
                        <div className="text-xs font-mono text-white/90 mb-2">
                          Step {s.step}
                        </div>
                        <div className="text-sm font-bold text-white mb-1">
                          {s.title}
                        </div>
                        <div className="text-xs text-white/80 leading-relaxed">
                          {s.description}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                    <NxButton href={content.finalCta.primaryCta.href} variant="orange">
                      {content.finalCta.primaryCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </NxButton>
                    {content.finalCta.secondaryCta && (
                      <NxButton
                        href={content.finalCta.secondaryCta.href}
                        variant="outline"
                      >
                        {content.finalCta.secondaryCta.label}
                      </NxButton>
                    )}
                  </div>
                </div>
              </div>
            </Section>

            {/* ── Hub & Spoke: Related Resources footer ──────────────
                Mandatory on every DeepDive page per the design brief.
                Renders Related Services (siblings), Blogs & Guides,
                Case Studies, and Pricing columns. For solution pages,
                shows the Solution-to-Service bridge instead of siblings.
                Non-destructive: renders nothing if hubSpokeEntry is missing. */}
            <RelatedResources entry={hubSpokeEntry} />
          </article>
        </div>
      </div>
    </NxPageLayout>
  )
}
