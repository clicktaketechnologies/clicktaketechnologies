'use client'

import { motion } from "framer-motion";
import { Search, Brain, Pencil, Cog, Rocket, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionReveal } from "./scroll-animations";

/* Process — 6-step horizontal timeline (3-col grid on desktop).
 * Step content is inlined here to match the new design exactly, rather than
 * reusing PROCESS_STEPS from site-data.ts (which has the older 5-step list). */
type Step = {
  n: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string; // gradient
  glow: string;   // shadow color
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discover",
    desc: "Audit, user interviews, competitor analysis",
    icon: Search,
    color: "from-brand-cyan to-brand-blue",
    glow: "shadow-cyan-500/25",
  },
  {
    n: "02",
    title: "Strategy",
    desc: "Roadmap, KPIs, scope, sprint plan",
    icon: Brain,
    color: "from-brand-blue to-sky-600",
    glow: "shadow-blue-500/25",
  },
  {
    n: "03",
    title: "Design",
    desc: "Wireframes, UI, brand, prototype",
    icon: Pencil,
    color: "from-brand-cyan to-teal-500",
    glow: "shadow-sky-500/25",
  },
  {
    n: "04",
    title: "Develop",
    desc: "Build, integrate, test, document",
    icon: Cog,
    color: "from-teal-500 to-brand-cyan",
    glow: "shadow-teal-500/25",
  },
  {
    n: "05",
    title: "Launch",
    desc: "Deploy, monitor, train, hand over",
    icon: Rocket,
    color: "from-brand-magenta to-brand-blue",
    glow: "shadow-fuchsia-500/25",
  },
  {
    n: "06",
    title: "Grow",
    desc: "Optimize, A/B test, scale, repeat",
    icon: TrendingUp,
    color: "from-amber-500 to-brand-pink",
    glow: "shadow-amber-500/25",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" />
              How we work
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              From Discovery to{" "}
              <span className="gradient-text">Growth</span>
            </h2>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every engagement follows the same transparent, milestone-driven six-step process —
              so you always know what&apos;s next, from kickoff to compounding growth.
            </p>
          </SectionReveal>
        </div>

        {/* 6-step grid — 3 columns on desktop, 2 on tablet, 1 on mobile.
            Each card has a gradient step number, lucide icon, title, desc,
            and a connector arrow on desktop (hidden on the last column). */}
        <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <SectionReveal
              key={s.n}
              variant="zoomIn"
              delay={(i % 3) * 0.08}
            >
              <div className="group relative h-full rounded-2xl glass p-6 sm:p-7 hover:ct-divider hover:-translate-y-1 transition">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black gradient-text">{s.n}</span>
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg ${s.glow} group-hover:scale-110 transition-transform`}>
                    <s.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

                {/* Connector arrow — shown on desktop between cards in the
                    first 2 columns of each row (so not on the last column). */}
                {i < STEPS.length - 1 && (i + 1) % 3 !== 0 && (
                  <div className="hidden lg:grid absolute top-1/2 -right-3 z-10 h-6 w-6 place-items-center rounded-full border ct-divider bg-card/80 -translate-y-1/2">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-muted-foreground" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Bottom CTA strip — keeps continuity with the rest of the page */}
        <SectionReveal variant="fadeUp" delay={0.1} className="mt-12 sm:mt-16">
          <div className="rounded-2xl border ct-divider ct-surface p-6 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">Average sprint length:</span> 2 weeks.
              <span className="mx-2 text-muted-foreground/40">·</span>
              <span className="font-semibold text-foreground">Demo cadence:</span> weekly.
              <span className="mx-2 text-muted-foreground/40">·</span>
              <span className="font-semibold text-foreground">Docs you own:</span> from day one.
            </p>
          </div>
        </SectionReveal>

        <motion.div aria-hidden className="mt-20">
          {/* Spacer — replaced the old SectionDivider that lived inside Process
              (SectionDivider is now rendered between sections at the page level). */}
        </motion.div>
      </div>
    </section>
  );
}
