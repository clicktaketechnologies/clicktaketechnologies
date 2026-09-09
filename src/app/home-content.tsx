'use client'

import { NxNavbar } from "@/components/site/nx-navbar";
import { NxHero } from "@/components/site/nx-hero";
import { NxFooter } from "@/components/site/nx-footer";
import dynamic from "next/dynamic";

/* Particle background network — same one used by NxPageLayout on inner
   pages. Mounted on the homepage so the particle canvas is visible across
   every page on the site, per v5 spec. */
const NxThreeScene = dynamic(
  () => import("@/components/site/nx-three-scene").then((m) => m.NxThreeScene),
  { ssr: false }
);
import { ScrollProgress } from "@/components/site/scroll-progress";
import { ScrollToTop } from "@/components/site/scroll-animations";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cloud,
  Brain,
  ShieldCheck,
  Mail,
  MessageCircle,
  TrendingUp,
  Users,
  Globe,
  Activity,
  Zap,
  Server,
  Bot,
  Workflow,
  Search,
  Star,
  Rocket,
  PenTool,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { METRICS, metricFormatters } from "@/lib/metrics";
import { TESTIMONIALS } from "@/lib/site-data";

/* CLICKTAKE HOMEPAGE — "Engineering Tomorrow's Intelligence" design.
 * Matches user-uploaded screenshots: hero with 3D robot, stats bar,
 * Four Pillars grid, Numbers That Compounded, CTA with mini robot.
 *
 * Section order:
 *  1. Hero (split layout, dark navy + 3D robot character)
 *  2. Stats Bar (4 oversized metrics)
 *  3. Four Pillars (2x2 grid of service cards)
 *  4. Numbers That Compounded (3 case study cards)
 *  5. CTA (Book a Demo + email + WhatsApp)
 *  6. Tech Stack marquee
 *  7. Footer
 */
export default function HomeContent() {
  return (
    <div className="theme-nx min-h-screen nx-surface nx-text relative">
      <ScrollProgress />
      {/* Particle background network — ambient Three.js canvas with 600 particles.
          Same one used by NxPageLayout on inner pages. */}
      <NxThreeScene hideTorusKnot particleCount={600} />
      <NxNavbar />
      <main id="main-content" className="relative z-10">
        <NxHero />
        <StatsBar />
        <ServicesGrid />
        <ProcessStrip />
        <NumbersThatCompounded />
        <Testimonials />
        <CtaSection />
        <TechStrip />
      </main>
      <NxFooter />
      <ScrollToTop />
    </div>
  );
}

/* ─── STATS BAR ─── 4 oversized metrics in a horizontal row.
 *
 * Every value comes from `@/lib/metrics` — the single source of truth
 * shared with <NxHero /> and <NxFooter />. Changing a metric there
 * propagates here automatically; this component no longer owns any
 * number, only the visual presentation.
 */
function StatsBar() {
  const stats = [
    {
      num: metricFormatters.percent(METRICS.UPTIME_SLA_PERCENT),
      label: "Uptime SLA",
      sub: "Across all production environments",
    },
    {
      num: metricFormatters.plus(METRICS.PROJECTS_SHIPPED),
      label: "Enterprise Apps",
      sub: `Shipped to production since ${METRICS.FOUNDED_YEAR}`,
    },
    {
      num: metricFormatters.percent(METRICS.AI_EFFICIENCY_LIFT_PERCENT),
      label: "AI Workflow Efficiency",
      sub: "Avg. lift across client base",
    },
    {
      num: METRICS.API_REQUESTS_PER_DAY,
      label: "API Requests / Day",
      sub: `Served at p99 <${METRICS.API_P99_LATENCY_MS}ms`,
    },
  ];
  return (
    <section className="relative py-16 px-4 lg:px-8" style={{ background: "#03000D" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 sm:p-8 text-center"
              style={{ background: "#070018" }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FF8AC4]">
                {s.num}
              </div>
              <div className="mt-2 text-sm font-bold text-white">{s.label}</div>
              <div className="mt-1 text-[11px] text-white/50 leading-relaxed">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ICON GRID ─── 6-card category grid (Gadget Doctor pattern).
 * Each card = icon-in-circle + category name + 1-line desc + arrow link.
 * Hover lifts card + border-glow + icon scale. Reads from existing
 * SERVICES constant in site-data.ts so the grid stays in sync with the
 * /services index page.
 */
function ServicesGrid() {
  const services = [
    {
      icon: Code2,
      title: "Custom Software",
      desc: "Multi-tenant SaaS, dashboards, internal tools. Next.js + Postgres + Stripe.",
      href: "/services/web/full-stack",
      color: "pink" as const,
    },
    {
      icon: Bot,
      title: "AI Agents",
      desc: "Autonomous goal-pursuing agents with tool-use, memory, and planning.",
      href: "/services/ai/agents",
      color: "purple" as const,
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      desc: "AWS · GCP · Azure. Terraform IaC, K8s autoscaling, p99 < 120ms SLAs.",
      href: "/services",
      color: "blue" as const,
    },
    {
      icon: Rocket,
      title: "Web & Mobile",
      desc: "Next.js 16 + React Native. Production apps with CI/CD from day one.",
      href: "/services",
      color: "pink" as const,
    },
    {
      icon: ShieldCheck,
      title: "Security Systems",
      desc: "Zero-trust, SOC 2 Type II audit prep, SAST/DAST in CI, pen-test remediation.",
      href: "/services",
      color: "blue" as const,
    },
    {
      icon: TrendingUp,
      title: "Growth Systems",
      desc: "SEO, paid, CRO. Data-led marketing that compounds qualified pipeline.",
      href: "/services",
      color: "purple" as const,
    },
  ];
  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8" style={{ background: "#03000D" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="gd-eyebrow">Core Capabilities</span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Six practices. One{" "}
            <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
              delivery engine.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
            Every ClickTake engagement is structured around six tightly-integrated practices.
            They share the same design system, the same observability stack, and the same
            engineering bar — so your roadmap ships as one coherent product, not six vendor
            handoffs.
          </p>
        </div>

        {/* 3x2 grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={s.href}
                  className="gd-card gd-hover group block p-6 h-full"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`gd-icon-circle ${s.color === "blue" ? "gd-icon-blue" : s.color === "purple" ? "gd-icon-purple" : ""}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-[#FF8AC4] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 transition-colors group-hover:text-[#FF8AC4]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA — dual CTA pattern (Gadget Doctor) */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/services" className="gd-btn-primary group">
            Explore all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/contact" className="gd-btn-secondary">
            Talk to an engineer
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS STRIP ─── 4-step "How we work" section (Gadget Doctor pattern).
 * Numbered cards: 01 Discover → 02 Architect → 03 Build → 04 Deploy.
 * Each card has a large faded number top-right + icon-circle + title + 2-line desc.
 * Horizontal on desktop, stacked on mobile.
 */
function ProcessStrip() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Discover",
      desc: "30-min architecture review. We map your roadmap, identify highest-ROI automation, and scope a fixed-price PoC.",
      color: "pink" as const,
    },
    {
      num: "02",
      icon: PenTool,
      title: "Architect",
      desc: "Senior engineers (not juniors) design the system — schema, API contracts, infra topology, observability stack.",
      color: "blue" as const,
    },
    {
      num: "03",
      icon: Code2,
      title: "Build",
      desc: "Sprint-based delivery with weekly demos. CI/CD from day one. E2E Playwright suite + design system in Storybook.",
      color: "purple" as const,
    },
    {
      num: "04",
      icon: Rocket,
      title: "Deploy",
      desc: "Production launch with runbooks, on-call rotation, and 30-day post-launch hypercare. Then we hand over the keys.",
      color: "pink" as const,
    },
  ];
  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8" style={{ background: "#03000D" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="gd-eyebrow">How We Work</span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            From discovery to{" "}
            <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
              deployment.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
            A repeatable 4-step engagement model. No vague "discovery phases" that drag on
            for months — each step has a fixed deliverable, a fixed timeline, and a fixed exit
            criterion.
          </p>
        </div>

        {/* 4-column grid (stacks to 2x2 on tablet, 1-col on mobile) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gd-card gd-step-card p-6"
              >
                <div className="gd-step-number">{step.num}</div>
                <div
                  className={`gd-icon-circle ${step.color === "blue" ? "gd-icon-blue" : step.color === "purple" ? "gd-icon-purple" : ""} mb-5`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── NUMBERS THAT COMPOUNDED ─── 3 case study metric cards */
function NumbersThatCompounded() {
  const cases = [
    {
      cat: "FINTECH · LATENCY",
      metric: "-72%",
      detail: "p99 API latency",
      barColor: "linear-gradient(90deg, #FF8AC4, #9B3DFF, #136DFF)",
      pct: "72%",
    },
    {
      cat: "E-COMMERCE · CVR",
      metric: "+38%",
      detail: "Checkout conversion",
      barColor: "linear-gradient(90deg, #FF8AC4, #9B3DFF, #136DFF)",
      pct: "38%",
    },
    {
      cat: "HEALTHCARE · COST",
      metric: "-$1.4M",
      detail: "Annual cloud spend",
      barColor: "linear-gradient(90deg, #FF8AC4, #9B3DFF, #136DFF)",
      pct: "58%",
    },
  ];
  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8" style={{ background: "#03000D" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: text */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[2px] text-white/70">
              <span className="h-1 w-1 rounded-full bg-[#FF8AC4]" />
              Production Impact
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Numbers that{" "}
              <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
                compounded.
              </span>
            </h2>
            <p className="mt-5 text-base text-white/60 leading-relaxed">
              Three real client outcomes from the past 18 months. Each metric is measured
              against the client's pre-engagement baseline and verified by their analytics team.
            </p>
            <Link
              href="/case-studies"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
              style={{ background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)" }}
            >
              Read full case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: 3 cards */}
          <div className="lg:col-span-3 grid gap-4">
            {cases.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:border-[#9B3DFF]/30 hover:bg-white/[0.05] hover:shadow-[0_8px_30px_-12px_rgba(155,61,255,0.2)] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/50">
                    {c.cat}
                  </div>
                  <TrendingUp className="h-4 w-4 text-white/30 group-hover:text-[#9B3DFF] transition-colors" />
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <div className="text-4xl font-black text-white transition-transform group-hover:scale-105 origin-left">{c.metric}</div>
                  <div className="text-sm text-white/60">{c.detail}</div>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: c.pct }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: c.barColor }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── 3-column testimonial card grid (Gadget Doctor pattern).
 * Each card = avatar circle with initials (no photos) + name + role/company
 * + 5 yellow stars + quote + project tag pill. Reads from the existing
 * TESTIMONIALS constant in site-data.ts so the grid stays in sync with
 * the /case-studies page + JSON-LD review schema.
 */
function Testimonials() {
  // Avatar gradient palette — deterministic per testimonial (hash by name
  // so the same person always gets the same color). Picks from the 3 brand
  // colors so avatars feel on-brand.
  const avatarGradients = [
    "linear-gradient(135deg, #FF53A9, #9B3DFF)",
    "linear-gradient(135deg, #136DFF, #4A90D9)",
    "linear-gradient(135deg, #9B3DFF, #7B2FBE)",
    "linear-gradient(135deg, #FF8AC4, #FF53A9)",
  ];
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Project tag pills — derived from the testimonial's role + location
  // so each card has a unique tag without needing a schema change.
  const getTag = (t: { role: string; location: string }) => {
    if (/commerce|retail|shop/i.test(t.role)) return "E-commerce";
    if (/cto|tech|engineer/i.test(t.role)) return "SaaS Platform";
    if (/marketing|growth/i.test(t.role)) return "Growth Systems";
    if (/hospitality|coo|operations/i.test(t.role)) return "Operations";
    return "Web Build";
  };

  // Take first 6 testimonials (2 rows of 3 on desktop)
  const testimonials = TESTIMONIALS.slice(0, 6);

  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8" style={{ background: "#03000D" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="gd-eyebrow">Client Outcomes</span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            What clients{" "}
            <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
              say.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
            Real outcomes from real clients across {METRICS.CONTINENTS_SERVED} continents.
            Each quote is verbatim — no marketing edits. Read the full case studies for
            the metrics behind each story.
          </p>
        </div>

        {/* 3-column grid (3 on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="gd-card gd-testimonial p-6"
            >
              {/* Header: avatar + name/role + stars */}
              <div className="flex items-center gap-3">
                <div
                  className="gd-avatar"
                  style={{ background: avatarGradients[i % avatarGradients.length] }}
                  aria-hidden
                >
                  {getInitials(t.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white text-sm truncate">{t.name}</div>
                  <div className="text-xs text-white/60 truncate">{t.role}</div>
                </div>
                <div className="gd-stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-white/80 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Footer: project tag + location */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                <span className="gd-tag-pill">
                  <CheckCircle2 className="h-3 w-3" />
                  {getTag(t)}
                </span>
                <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">
                  {t.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA — dual CTA pattern */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/case-studies" className="gd-btn-primary group">
            Read full case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/contact" className="gd-btn-secondary">
            Start your project
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION ─── Book a Demo + email + WhatsApp with mini robot */
function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8 overflow-hidden" style={{ background: "#03000D" }}>
      {/* Purple radial gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-8 sm:p-12 lg:p-16 overflow-hidden relative">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Left: text + buttons */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Ready to deploy your{" "}
                <span className="text-[#FF8AC4]">AI</span>{" "}
                <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
                  workforce?
                </span>
              </h2>
              <p className="mt-5 text-base text-white/60 leading-relaxed max-w-xl">
                Book a 30-minute architecture review. We'll map your roadmap, identify the
                highest-ROI automation, and ship a working PoC within 6 weeks.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="gd-btn-primary group"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:info@clicktaketech.com"
                  className="gd-btn-secondary"
                >
                  <Mail className="h-4 w-4" />
                  Email us
                </a>
                <a
                  href="https://wa.link/qz8eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gd-btn-secondary"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right: mini robot */}
            <div className="hidden lg:flex justify-center">
              <MiniRobot />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Mini robot for CTA section — simpler version */
function MiniRobot() {
  return (
    <div className="relative" style={{ width: "180px", height: "220px" }}>
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,83,169,0.2) 0%, transparent 70%)" }}
      />
      {/* Body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[40px] rounded-b-[30px]"
        style={{
          width: "110px",
          height: "120px",
          background: "linear-gradient(180deg, #1E3A8A, #1E1B4B)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full grid place-items-center"
          style={{ background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)" }}
        >
          <span className="text-white text-[10px]">♥</span>
        </div>
      </div>
      {/* Head */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "0",
          width: "90px",
          height: "85px",
          background: "linear-gradient(180deg, #F5C9A6, #D4A574)",
        }}
      >
        {/* Goggles */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-xl"
          style={{
            top: "25px",
            width: "72px",
            height: "28px",
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
          }}
        >
          <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full" style={{ background: "#1E1B4B" }}>
            <div className="absolute inset-1 rounded-full" style={{ background: "#FF8AC4" }} />
          </div>
          <div className="absolute right-1.5 top-1.5 w-5 h-5 rounded-full" style={{ background: "#1E1B4B" }}>
            <div className="absolute inset-1 rounded-full" style={{ background: "#136DFF" }} />
          </div>
        </div>
      </div>
      {/* Floating particles */}
      {[
        { top: "10%", left: "-10%", color: "#FF53A9" },
        { top: "40%", right: "-10%", color: "#136DFF" },
        { bottom: "20%", left: "-15%", color: "#9B3DFF" },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute rounded-full"
          style={{
            top: p.top,
            bottom: p.bottom,
            left: p.left,
            right: p.right,
            width: "6px",
            height: "6px",
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── TECH STRIP ─── horizontal scrolling tech logos */
function TechStrip() {
  const techs = [
    "Python", "OpenAI", "Docker", "PostgreSQL", "AWS", "Vercel",
    "Terraform", "Next.js 16", "LangGraph", "Anthropic", "Kubernetes", "Redis",
  ];
  return (
    <section className="py-12 border-y border-white/5" style={{ background: "#03000D" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-6">
          <div className="text-[10px] font-mono uppercase tracking-[2px] text-white/60">
            Production Stack
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {techs.map((t) => (
            <span
              key={t}
              className="text-sm font-mono text-white/60 hover:text-[#FF8AC4] hover:scale-110 transition-all cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
