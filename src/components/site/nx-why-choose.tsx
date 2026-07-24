'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

/* WHY CHOOSE — interactive split-view panel (Future Processing pattern).
 * Left: list of priorities user can click. Right: live-updating content
 * panel showing the matching benefits. */
const PRIORITIES = [
  {
    id: "delivery",
    title: "Faster Delivery",
    short: "Ship in weeks, not quarters",
    color: "#FF6B35",
    headline: "From kickoff to launch in 30 days.",
    body: "Sprint-based delivery with weekly demos. Senior engineers only — no juniors learning on your dime. We use reusable starter kits (auth, billing, admin) so 60% of the boilerplate is already done before we write a single line of your business logic.",
    points: [
      "Dedicated PM + Slack channel from day 1",
      "Weekly sprint demos with working software",
      "Reusable Next.js + Supabase starter kit",
      "Average MVP launch: 30 days",
    ],
  },
  {
    id: "ai",
    title: "AI-First Engineering",
    short: "Automation built into the stack",
    color: "#3B82F6",
    headline: "Every project ships with AI baked in.",
    body: "We don't bolt on a chatbot at the end. Our default stack includes RAG pipelines, vector search, LLM-powered content workflows and agentic automations — so your product is ready for the next decade, not the last one.",
    points: [
      "RAG + vector search out of the box",
      "OpenAI / Anthropic / open-source LLMs",
      "Custom agentic workflows with n8n / LangGraph",
      "AI-powered content + SEO pipelines",
    ],
  },
  {
    id: "value",
    title: "Transparent Pricing",
    short: "Fixed scope · No surprises",
    color: "#10B981",
    headline: "Fixed-scope sprints. Weekly invoices. No retainer lock-in.",
    body: "You see every line item before we start. Pay per sprint, pause anytime, keep all the code. We publish our rates publicly and quote in writing within 48 hours of the discovery call — no sales funnels, no SDR sequences.",
    points: [
      "Public rate card — $45–$95/hr depending on seniority",
      "Fixed-scope sprints with written deliverables",
      "Pause or cancel anytime, keep all IP",
      "Weekly invoices, no upfront retainer",
    ],
  },
  {
    id: "global",
    title: "Global Delivery",
    short: "UK PM · Pakistan engineering",
    color: "#EC4899",
    headline: "UK-based PMs. Pakistan-based engineers. 24/7 progress.",
    body: "You get a Birmingham-based account manager who speaks your timezone and a Multan-based engineering team that ships while you sleep. Four offices across UK, Pakistan, USA and Dubai mean there's always someone awake on your project.",
    points: [
      "Birmingham (UK) HQ — client-facing PMs",
      "Multan engineering hub — 40+ senior devs",
      "Austin, TX desk for North American clients",
      "Dubai office for MENA business",
    ],
  },
];

export function NxWhyChoose() {
  const [active, setActive] = useState("delivery");
  const current = PRIORITIES.find((p) => p.id === active)!;

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 nx-eyebrow text-[var(--nx-orange)]"
          >
            <span className="h-1 w-8 rounded-full bg-[var(--nx-orange)]" />
            Why teams choose us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A1124]"
          >
            Pick your priority.{" "}
            <span className="nx-text-orange-grad">See how we deliver it.</span>
          </motion.h2>
        </div>

        {/* Split panel */}
        <div className="mt-12 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left — priority selector */}
          <div className="lg:col-span-5 space-y-2">
            {PRIORITIES.map((p) => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all group ${
                    isActive
                      ? "border-transparent shadow-lg"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                  }`}
                  style={isActive
                    ? { background: `${p.color}0d`, borderColor: `${p.color}66`, boxShadow: `0 16px 40px -16px ${p.color}33` }
                    : undefined
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg grid place-items-center shrink-0 transition-transform group-hover:scale-110"
                        style={{ background: `${p.color}1a`, color: p.color }}
                      >
                        <span className="font-black text-sm">{String(PRIORITIES.indexOf(p) + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <div className={`font-bold text-base ${isActive ? "text-[#0A1124]" : "text-[#0A1124]"}`}>
                          {p.title}
                        </div>
                        <div className="text-xs text-[#94A3B8] mt-0.5">
                          {p.short}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      className={`h-5 w-5 transition-transform ${
                        isActive ? `translate-x-0` : "-translate-x-2 opacity-0"
                      }`}
                      style={{ color: p.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — live content panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="nx-card p-8 sm:p-10"
                style={{ borderColor: `${current.color}33`, background: 'white' }}
              >
                {/* Eyebrow with color dot */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: current.color }}
                  />
                  <span className="nx-eyebrow text-[#94A3B8]">
                    {current.title}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A1124] leading-tight">
                  {current.headline}
                </h3>

                {/* Body */}
                <p className="mt-5 text-base text-[#475569] leading-relaxed">
                  {current.body}
                </p>

                {/* Points list */}
                <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                  {current.points.map((point, i) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-[#0A1124]"
                    >
                      <span
                        className="mt-0.5 h-5 w-5 shrink-0 rounded-full grid place-items-center"
                        style={{ background: `${current.color}1a`, color: current.color }}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="leading-snug">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-bold transition"
                    style={{ color: current.color }}
                  >
                    Discuss your project
                    <ArrowRight className="h-4 w-4 nx-arrow" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
