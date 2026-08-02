'use client'

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, FileText, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import{
  NxPageLayout, NxPageHero, NxPageSection, NxSectionHeader, NxButton} from "../nx-page-layout";
import { Nx3DScene } from "../nx-3d-scene";
import { Nx3DCharacter } from "../nx-3d-character";
import { NxStoryScene } from "../nx-story-scene";
import { TiltCard } from "@/components/site/tilt-card";
import { RESOURCES } from "@/lib/site-data";

export function ResourcesPage() {
  return (
    <NxPageLayout>
        {/* 3D character — floats in hero area, lg+ only */}
{/* Per-page 3D Story Scene — resources variant. Sits behind hero content. */}
        <NxStoryScene variant="resources" />
                <div className="pointer-events-none absolute right-0 top-24 lg:top-32 xl:top-40 z-[5] hidden lg:block" aria-hidden="true">
          <Nx3DCharacter variant="resources" size="md" />
        </div>
        {/* 3D floating geometric accents */}
        <Nx3DScene density="low" />

              <section className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider bg-card/60 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Resources
            </div>
            <h1 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Playbooks & guides for{" "}
              <span className="gradient-text">ambitious founders.</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              Practical frameworks on AI adoption, SEO, headless commerce, hiring and market entry —
              written from our experience shipping across the UK (Birmingham), Pakistan (Multan),
              USA (Austin) and Dubai.
            </p>
          </motion.div>

          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r, i) => (
              <motion.article
                key={r.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <TiltCard
                  className="group/tilt h-full overflow-hidden rounded-2xl border ct-divider bg-card/60 backdrop-blur-xl p-5 sm:p-6 transition-colors duration-300 hover:border-primary/30"
                  glow={true}
                  shine={true}
                  maxTilt={10}
                  as="article"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="rounded-full border ct-divider ct-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {r.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {r.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-base sm:text-lg font-bold leading-snug group-hover/tilt:text-primary transition">
                    {r.title}
                  </h2>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {r.excerpt}
                  </p>
                  <div className="mt-4 sm:mt-5 flex items-center justify-between">
                    <Link
                      href={`/resources/${r.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover/tilt:gap-2 transition-all"
                    >
                      Read article <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </div>
        </section>
    </NxPageLayout>
  );
}

// ─── Detail page ──────────────────────────────────────────────────────────────

export function ResourceDetailPage({
  resource,
  learnPoints,
  related,
}: {
  resource: { title: string; excerpt: string; category: string; readTime: string; slug: string };
  learnPoints: string[];
  related: { title: string; excerpt: string; category: string; readTime: string; slug: string }[];
}) {
  return (
    <NxPageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
        >
          ← Back to Resources
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-blue">
              {resource.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {resource.readTime}
            </span>
          </div>
          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
            {resource.title}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {resource.excerpt}
          </p>
        </motion.div>

        {learnPoints.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-10 sm:mt-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-brand-blue shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                What you&apos;ll learn
              </h2>
            </div>
            <ul className="space-y-3">
              {learnPoints.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 sm:mt-16 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6 sm:p-8"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-brand-blue shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Get the full guide
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                We&apos;re publishing the full version of this guide as a series of
                articles on our blog. Want it early — or want to talk to a ClickTake
                strategist about applying it to your business? Book a free 30-minute
                consult. No sales pitch, no commitment.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
                >
                  Book a free consult <Send className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-5 py-2.5 text-sm font-semibold hover:border-primary/40 hover:bg-secondary transition"
                >
                  Read the blog <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-4">
              Related resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/resources/${r.slug}`}
                  className="group rounded-2xl border border-border bg-card/40 backdrop-blur-md p-5 hover:border-primary/40 hover:bg-card/60 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {r.category}
                    </span>
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-bold leading-snug group-hover:text-primary transition">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {r.excerpt}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </NxPageLayout>
  );
}
