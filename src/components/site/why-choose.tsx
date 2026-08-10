'use client'

import { Globe2, Users, BarChart3, Eye, TrendingUp, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionReveal } from "./scroll-animations";

/* Why Choose ClickTake — 6 feature cards in a 3-column grid.
 * Each card: gradient icon chip + title + description. Theme-aware via .ct-card. */
type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: string; // gradient chip classes
};

const FEATURES: Feature[] = [
  {
    icon: Globe2,
    title: "UK & Pakistan Presence",
    desc: "Two delivery hubs, 12 hours of overlapping work time, and a UK-registered entity for trust.",
    accent: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    icon: Users,
    title: "Full-Stack Digital Team",
    desc: "Strategy, design, engineering, marketing and AI under one roof — no handoffs.",
    accent: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Approach",
    desc: "Every decision backed by analytics, user research and A/B tests — not vibes.",
    accent: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    desc: "Fixed-scope sprints, weekly demos, Notion docs you own. No black boxes.",
    accent: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    icon: TrendingUp,
    title: "Measurable Results",
    desc: "We report on revenue, rankings, and conversion — not vanity metrics.",
    accent: "bg-[#EC4899]/15 text-[#EC4899]",
  },
  {
    icon: Heart,
    title: "Long-Term Partnership",
    desc: "Average client retention 2.4 years. We're built to grow with you.",
    accent: "bg-[#EC4899]/15 text-[#EC4899]",
  },
];

export function WhyChoose() {
  return (
    <section id="why-choose" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              Why teams pick us
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Why Choose{" "}
              <span className="gradient-text">ClickTake Technologies</span>
            </h2>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Six reasons founders, marketing leads and CTOs across the UK, Pakistan, USA and Dubai
              keep us on speed dial.
            </p>
          </SectionReveal>
        </div>

        {/* 3-column feature grid */}
        <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <SectionReveal
              key={f.title}
              variant="fadeUp"
              delay={(i % 3) * 0.06}
            >
              <div className="group relative h-full rounded-2xl ct-card p-6 sm:p-7 hover:-translate-y-1 transition-transform">
                {/* hover glow */}
                <div className="hidden" />

                <div className="relative">
                  {/* Gradient icon chip */}
                  <div className={`grid h-12 w-12 place-items-center rounded-xl ${f.accent} shadow-sm group-hover:scale-110 transition-transform`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg sm:text-xl font-bold leading-snug">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
