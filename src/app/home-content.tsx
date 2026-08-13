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
} from "lucide-react";

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
        <FourPillars />
        <NumbersThatCompounded />
        <CtaSection />
        <TechStrip />
      </main>
      <NxFooter />
      <ScrollToTop />
    </div>
  );
}

/* ─── STATS BAR ─── 4 oversized metrics in a horizontal row */
function StatsBar() {
  const stats = [
    { num: "99.9%", label: "Uptime SLA", sub: "Across all production environments" },
    { num: "150+", label: "Enterprise Apps", sub: "Shipped to production since 2019" },
    { num: "40%", label: "AI Workflow Efficiency", sub: "Avg. lift across client base" },
    { num: "10M+", label: "API Requests / Day", sub: "Served at p99 <120ms" },
  ];
  return (
    <section className="relative py-16 px-4 lg:px-8" style={{ background: "#030014" }}>
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
              style={{ background: "#0A0A14" }}
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

/* ─── FOUR PILLARS ─── 2x2 grid of service capability cards */
function FourPillars() {
  const pillars = [
    {
      icon: Code2,
      title: "Custom Web & Mobile",
      desc: "Next.js 16, React Native, Flutter. Production apps with design systems, observability, and CI/CD baked in from day one.",
      tags: ["Next.js 16 · React 19", "Design system + Storybook", "E2E Playwright suite"],
      bg: "#1E3A8A",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      desc: "AWS, GCP, Azure, IaC with Terraform, GitOps with ArgoCD, observability with OpenTelemetry + Grafana stack.",
      tags: ["Terraform · ArgoCD", "K8s autoscaling", "p99 < 120ms SLAs"],
      bg: "#831843",
    },
    {
      icon: Brain,
      title: "AI / ML Pipelines",
      desc: "Multi-agent orchestration, RAG over your enterprise data, custom LLM fine-tuning. From PoC to production in 6 weeks.",
      tags: ["LangGraph · OpenAI · Anthropic", "Pinecone · Weaviate · pgvector", "VLLM serving"],
      bg: "#581C87",
    },
    {
      icon: ShieldCheck,
      title: "Security Systems",
      desc: "Zero-trust architectures, SOC 2 Type II audit prep, SAST/DAST in CI, pen-test remediation. Compliance as code.",
      tags: ["SOC 2 · HIPAA · GDPR", "Semgrep · Snyk · OWASP", "WAF + Bot defense"],
      bg: "#1E3A8A",
    },
  ];
  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8" style={{ background: "#050510" }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono uppercase tracking-[2px] text-white/70">
            <span className="h-1 w-1 rounded-full bg-[#FF53A9]" />
            Core Capabilities
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Four pillars. One delivery{" "}
            <span className="bg-gradient-to-r from-[#FF8AC4] via-[#9B3DFF] to-[#136DFF] bg-clip-text text-transparent">
              engine.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
            Every ClickTake engagement is structured around four tightly-integrated practices.
            They share the same design system, the same observability stack, and the same
            engineering bar — so your roadmap ships as one coherent product, not four vendor
            handoffs.
          </p>
        </div>

        {/* 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl mb-5"
                  style={{ background: p.bg }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-5">{p.desc}</p>
                <div className="space-y-1.5">
                  {p.tags.map((t) => (
                    <div key={t} className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                      · {t}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom button */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
          >
            Explore all services
            <ArrowRight className="h-4 w-4" />
          </Link>
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
    <section className="relative py-24 sm:py-32 px-4 lg:px-8" style={{ background: "#030014" }}>
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
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/50">
                    {c.cat}
                  </div>
                  <TrendingUp className="h-4 w-4 text-white/30" />
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <div className="text-4xl font-black text-white">{c.metric}</div>
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

/* ─── CTA SECTION ─── Book a Demo + email + WhatsApp with mini robot */
function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 lg:px-8 overflow-hidden" style={{ background: "#050510" }}>
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
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
                  style={{ background: "linear-gradient(135deg, #FF8AC4 0%, #9B3DFF 50%, #136DFF 100%)" }}
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="mailto:info@clicktaketech.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  info@clicktaketech.com
                </a>
                <a
                  href="https://wa.link/qz8eg"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
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
    <section className="py-12 border-y border-white/5" style={{ background: "#030014" }}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-6">
          <div className="text-[10px] font-mono uppercase tracking-[2px] text-white/40">
            Production Stack
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {techs.map((t) => (
            <span key={t} className="text-sm font-mono text-white/40 hover:text-white/70 transition-colors">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
