'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { NxPageLayout, NxPageHero } from "../nx-page-layout";

/* CASE STUDIES PAGE — "Real clients. Real numbers." design.
 * Matches user-uploaded screenshot: hero, vertical list of detailed case
 * study cards with 3-metric grids, character CTA at bottom.
 */
export function CaseStudiesPage() {
  return (
    <NxPageLayout>
      <NxPageHero
        eyebrow="Case Studies"
        title={
          <>
            Real clients.{" "}
            <span className="bg-gradient-to-r from-[#EC4899] via-[#9B3DFF] to-[#6366F1] bg-clip-text text-transparent">
              Real numbers.
            </span>
          </>
        }
        subtitle="Four engagements from the past 18 months. Every metric is measured against the client's pre-engagement baseline and verified by their analytics team. Tech tags reflect the actual production stack — not what we wanted to use, what we shipped."
      />

      {/* Case study cards — vertical list */}
      <section className="py-16 px-4 lg:px-8" style={{ background: "#050510" }}>
        <div className="mx-auto max-w-5xl space-y-8">
          {CASES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 hover:border-white/20 transition-all"
            >
              {/* Top row: category + year/duration + tech tags */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/80"
                  >
                    {c.emoji} {c.category}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-[1.5px] text-white/40">
                    {c.year} · {c.duration}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title + description */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">{c.desc}</p>

              {/* 3-metric grid */}
              <div className="grid sm:grid-cols-3 gap-3">
                {c.metrics.map((m, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-[1.5px] text-white/40 mb-2">
                      {m.label}
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-xs text-white/40 line-through">{m.before}</span>
                      <ArrowRight className="h-3 w-3 text-white/30" />
                      <span className="text-lg font-black text-white">{m.after}</span>
                    </div>
                    <div
                      className={`text-xs font-bold ${
                        m.change.startsWith("-") && !m.change.startsWith("-$")
                          ? "text-[#00e676]"
                          : "text-[#EC4899]"
                      }`}
                    >
                      {m.change}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA: Your case study is next */}
      <section className="py-24 px-4 lg:px-8" style={{ background: "#030014" }}>
        <div className="mx-auto max-w-5xl">
          <div
            className="rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden relative"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(124,58,237,0.12) 0%, transparent 60%), rgba(255,255,255,0.02)",
            }}
          >
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Left: text + buttons */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Your case study is{" "}
                  <span className="bg-gradient-to-r from-[#EC4899] to-[#F472B6] bg-clip-text text-transparent">
                    next.
                  </span>
                </h2>
                <p className="mt-4 text-base text-white/60 leading-relaxed">
                  Book a 30-minute architecture review. We'll whiteboard your highest-ROI
                  automation and ship a working PoC within 6 weeks.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:scale-[1.02] transition-all"
                    style={{ background: "linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)" }}
                  >
                    Book a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  >
                    See services
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right: character illustration */}
              <div className="hidden lg:flex justify-center">
                <CharacterWithLaptop />
              </div>
            </div>
          </div>
        </div>
      </section>
    </NxPageLayout>
  );
}

/* Character with laptop — CSS-based stylized illustration */
function CharacterWithLaptop() {
  return (
    <div className="relative" style={{ width: "160px", height: "200px" }}>
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,83,169,0.15) 0%, transparent 70%)" }}
      />
      {/* Body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[40px] rounded-b-[30px]"
        style={{
          width: "100px",
          height: "110px",
          background: "linear-gradient(180deg, #1E3A8A, #1E1B4B)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />
      {/* Head */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "0",
          width: "80px",
          height: "75px",
          background: "linear-gradient(180deg, #F5C9A6, #D4A574)",
        }}
      >
        {/* Glasses */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-xl"
          style={{ top: "22px", width: "64px", height: "20px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)" }}
        >
          <div className="absolute left-1 top-1 w-4 h-4 rounded-full" style={{ background: "#1E1B4B" }}>
            <div className="absolute inset-1 rounded-full" style={{ background: "#60A5FA" }} />
          </div>
          <div className="absolute right-1 top-1 w-4 h-4 rounded-full" style={{ background: "#1E1B4B" }}>
            <div className="absolute inset-1 rounded-full" style={{ background: "#F472B6" }} />
          </div>
        </div>
        {/* Smile */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: "15px", width: "24px", height: "6px", background: "rgba(0,0,0,0.25)", borderRadius: "0 0 12px 12px" }}
        />
      </div>
      {/* Laptop */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-lg p-1.5"
        style={{
          bottom: "20px",
          width: "80px",
          height: "50px",
          background: "rgba(15,10,30,0.9)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* Chart on screen */}
        <div className="flex items-end justify-between h-full gap-0.5">
          {[30, 50, 40, 70, 60, 85, 75].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: [`${h}%`, `${h + 8}%`, `${h}%`] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background: i % 2 === 0
                  ? "linear-gradient(180deg, #FF53A9, #9B3DFF)"
                  : "linear-gradient(180deg, #136DFF, #4A90D9)",
              }}
            />
          ))}
        </div>
      </div>
      {/* Floating particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute rounded-full"
          style={{
            top: `${15 + i * 25}%`,
            left: i % 2 === 0 ? "-8%" : "auto",
            right: i % 2 === 1 ? "-8%" : "auto",
            width: "6px",
            height: "6px",
            background: ["#FF53A9", "#136DFF", "#9B3DFF"][i],
            boxShadow: `0 0 8px ${["#FF53A9", "#136DFF", "#9B3DFF"][i]}`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── DATA ─── */
const CASES = [
  {
    emoji: "🏦",
    category: "FinTech · B2B",
    year: "2024",
    duration: "14 weeks",
    tech: ["Next.js 16", "Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "Terraform"],
    title: "Real-time Payments API — p99 latency cut 72%",
    desc: "A Series-C fintech processing $4.2B/yr in B2B payments needed to bring p99 API latency under 200ms to qualify for tier-1 bank partnerships. We rebuilt the request hot-path, replaced synchronous compliance calls with an event-driven sidecar, and migrated to a multi-region active-active Postgres+Redis topology.",
    metrics: [
      { label: "P99 Latency", before: "720ms", after: "200ms", change: "-72%" },
      { label: "Throughput", before: "8K rps", after: "22K rps", change: "+175%" },
      { label: "Infra Cost / Mo", before: "$48K", after: "$31K", change: "-35%" },
    ],
  },
  {
    emoji: "🛒",
    category: "E-commerce · D2C",
    year: "2024",
    duration: "10 weeks",
    tech: ["Next.js 16", "Python", "OpenAI", "LangGraph", "Pinecone", "PostgreSQL", "Vercel"],
    title: "AI Shopping Assistant — +38% checkout conversion",
    desc: "A 9-figure D2C skincare brand deployed a RAG-grounded shopping assistant across PDP pages and cart. We built the retrieval pipeline over 14K SKUs + 280K reviews, integrated a multi-agent orchestrator for product-match + ingredient-safety checks, and A/B-tested against the static chatbot for 8 weeks.",
    metrics: [
      { label: "Checkout CVR", before: "2.6%", after: "3.6%", change: "+38%" },
      { label: "Avg. Order Value", before: "$42", after: "$54", change: "+29%" },
      { label: "Returns Rate", before: "12.4%", after: "8.1%", change: "-35%" },
    ],
  },
  {
    emoji: "🏥",
    category: "Healthcare · HIPAA",
    year: "2023",
    duration: "22 weeks",
    tech: ["Python", "FastAPI", "Weaviate", "OpenAI", "BGE-Reranker", "PostgreSQL", "Docker", "GCP"],
    title: "Clinical Notes RAG — $1.4M annual cloud savings",
    desc: "A regional hospital network (1,200 beds, 14 facilities) needed to make 18M anonymized clinical notes searchable for clinical research. We built a hybrid RAG pipeline with per-patient ACLs, replaced a $2.4M/yr third-party search contract with a self-hosted stack, and gave researchers sub-second retrieval across the full corpus.",
    metrics: [
      { label: "Annual Cloud Spend", before: "$2.4M", after: "$1.0M", change: "-$1.4M / yr" },
      { label: "Retrieval P99", before: "4.8s", after: "112ms", change: "-98%" },
      { label: "Researcher NPS", before: "+8", after: "+72", change: "+64 pts" },
    ],
  },
  {
    emoji: "🚚",
    category: "Logistics · Enterprise",
    year: "2024",
    duration: "18 weeks",
    tech: ["Python", "LangGraph", "Anthropic", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "AWS"],
    title: "Fleet Orchestration Agents — 31% fewer empty miles",
    desc: "A national last-mile logistics operator (1,800 trucks, 40 hubs) needed to reduce deadhead miles. We deployed a multi-agent orchestrator that runs every 90 seconds: a forecast agent predicts demand, a matcher agent proposes load pairings, a validator agent checks DOT compliance, and a human-in-loop dispatcher approves exceptions.",
    metrics: [
      { label: "Empty Miles", before: "21.4%", after: "14.8%", change: "-31%" },
      { label: "Fuel Spend / Mo", before: "$2.8M", after: "$2.1M", change: "-25%" },
      { label: "On-Time Delivery", before: "91.2%", after: "96.4%", change: "+5.2 pts" },
    ],
  },
];

/* Alias for route import compatibility */
export const CaseStudiesIndexPage = CaseStudiesPage;

/* Re-export detail page for /case-studies/[slug] route */
export { CaseStudyDetailPage } from "./case-study-detail-page";
