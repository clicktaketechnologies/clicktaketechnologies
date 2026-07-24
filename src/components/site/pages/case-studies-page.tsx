'use client'

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Sparkles, MapPin, Clock, TrendingUp, CheckCircle2,
  AlertCircle, ExternalLink,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { CASE_STUDIES, type CaseStudy } from "@/lib/site-data";

const SERVICE_LABELS: Record<string, string> = {
  "seo": "SEO",
  "digital-marketing/content-strategy": "Content Strategy",
  "web/redesign": "Website Redesign",
  "creative/web-design": "Web Design",
  "creative/graphic-design": "Graphic Design",
  "web/ecommerce": "E-commerce",
  "web/full-stack": "Web Dev",
  "ai/automation": "AI Automation",
  "digital-marketing/social-media": "Social Media",
  "creative/video-production": "Video Editing",
  "digital-marketing/paid-advertising": "Paid Ads",
  "web/custom-software": "Custom Software",
  "web/saas": "SaaS",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  shipped: { label: "Shipped", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  "in-progress": { label: "In progress", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  pending: { label: "Coming soon", color: "text-muted-foreground bg-muted border-border" },
};

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const status = STATUS_LABELS[cs.result_status] || STATUS_LABELS.pending;
  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/40 hover:bg-card/60 transition"
    >
      <div className="h-40 bg-gradient-to-br from-brand-blue via-brand-magenta to-brand-pink relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
            {cs.industry}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-sm font-bold text-white leading-tight">{cs.client}</div>
          <div className="text-[11px] text-white/80 mt-0.5 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {cs.location}
          </div>
        </div>
      </div>
      <div className="flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold leading-tight group-hover:text-foreground text-foreground/90 line-clamp-2">
          {cs.challenge.split(".")[0]}.
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cs.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[10px] font-medium"
            >
              {SERVICE_LABELS[s] || s}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {cs.metrics.slice(0, 2).map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border bg-secondary/30 px-2.5 py-1.5"
            >
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{m.label}</div>
              <div className="text-sm font-bold leading-tight">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function CaseStudiesIndexPage() {
  const [filter, setFilter] = useState<string | "all">("all");
  const allServices = Array.from(new Set(CASE_STUDIES.flatMap((c) => c.services)));
  const filtered = filter === "all"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.services.includes(filter));

  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-blue">
              Case Studies
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Real engagements. Real numbers. No fake case studies.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We publish case studies only when there are real, verifiable results to share. Engagements
              in progress are labeled as such — we will not invent metrics for marketing. ClickTake
              Technologies ships work across the UK, Pakistan, USA and Dubai.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filter === "all"
                  ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                  : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
              }`}
            >
              All ({CASE_STUDIES.length})
            </button>
            {allServices.map((s) => {
              const count = CASE_STUDIES.filter((c) => c.services.includes(s)).length;
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    filter === s
                      ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
                      : "border border-border bg-secondary/50 text-foreground hover:border-primary/40"
                  }`}
                >
                  {SERVICE_LABELS[s] || s} ({count})
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
              >
                <CaseStudyCard cs={c} />
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/80 leading-relaxed">
                <strong className="text-foreground">No fake results.</strong> Some clients are
                confidential — we publish real metrics but redact names. Engagements in progress
                are labeled &quot;In progress&quot; with preliminary metrics; full case studies are
                published at the 6-month mark. We never invent testimonials, never fabricate
                metrics, and never publish a case study without the client&apos;s written consent.
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
                Want to be our next case study?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a free 30-minute consultation. We&apos;ll scope it together.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

// ─── Detail page ──────────────────────────────────────────────────────────────

export function CaseStudyDetailPage({ cs }: { cs: CaseStudy }) {
  const status = STATUS_LABELS[cs.result_status] || STATUS_LABELS.pending;
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
          >
            ← Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-blue">
                {cs.industry}
              </span>
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
                {status.label}
              </span>
            </div>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {cs.client}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {cs.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {cs.timeline}
              </span>
            </div>
          </motion.div>

          {/* Hero image */}
          <div className="mt-8 h-48 sm:h-72 rounded-2xl bg-gradient-to-br from-brand-blue via-brand-magenta to-brand-pink relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 right-4">
              <Sparkles className="h-8 w-8 text-white/80" />
            </div>
          </div>

          {/* Metrics strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cs.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card/50 backdrop-blur-md p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-base sm:text-lg font-bold">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">The challenge</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{cs.challenge}</p>
          </motion.section>

          {/* Solution */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Our solution</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{cs.solution}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {cs.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1.5 text-xs font-medium text-brand-blue"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Results */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-emerald-400 shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Results</h2>
            </div>
            <div className={`rounded-2xl border p-5 ${
              cs.result_status === "shipped"
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-amber-500/30 bg-amber-500/5"
            }`}>
              {cs.result_status === "shipped" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mb-3" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-400 mb-3" />
              )}
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{cs.result_summary}</p>
            </div>

            {cs.live_url && (
              <a
                href={cs.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
              >
                Visit live site <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
                Want results like these?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a free 30-minute consultation. We&apos;ll scope your engagement together.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
