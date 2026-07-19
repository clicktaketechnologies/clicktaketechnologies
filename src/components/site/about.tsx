'use client'

import { Cpu, Globe, Shield, Zap } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { SectionReveal } from "./scroll-animations";

const PILLARS = [
  {
    icon: Cpu,
    title: "AI-native engineering",
    desc: "We embed AI into every product we ship — from copilots to fully autonomous workflows — so your business compounds leverage, not headcount.",
  },
  {
    icon: Globe,
    title: "Four-region coverage",
    desc: "With teams in Birmingham, Lahore, Austin and Dubai, we deliver 24-hour development cycles and on-the-ground insight in every market we serve.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade security",
    desc: "SOC 2-aligned processes, role-based access, and rigorous code reviews are the default — not an upsell.",
  },
  {
    icon: Zap,
    title: "Ship in weeks, not quarters",
    desc: "Our AI-assisted delivery pipeline compresses timelines. Most MVPs go live in 8–12 weeks; most marketing sites in 2–4.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: narrative */}
          <div>
            <SectionReveal variant="fadeUp">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9]" />
                About ClickTake
              </div>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.1}>
              <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight">
                A global team built to{" "}
                <span className="gradient-text">take ideas to market.</span>
              </h2>
            </SectionReveal>

            <SectionReveal variant="fadeUp" delay={0.2}>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed">
                ClickTake Technologies was founded to close the gap between strategy, design and
                engineering. Too many agencies split those disciplines across silos; we built one team
                that owns the full lifecycle — from the first whiteboard sketch to the post-launch
                growth experiment that lifts your north-star metric.
              </p>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.3}>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Today we operate from <strong className="text-foreground">Birmingham (UK)</strong>,
                <strong className="text-foreground"> Lahore (Pakistan)</strong>,
                <strong className="text-foreground"> Austin (USA)</strong> and
                <strong className="text-foreground"> Dubai (UAE)</strong>, serving everyone from
                venture-backed startups to publicly listed groups. Wherever you are in the world,
                there's a ClickTake office in your timezone.
              </p>
            </SectionReveal>

            <SectionReveal variant="fadeUp" delay={0.4}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {SITE.locations.map((loc) => (
                  <div
                    key={loc.country}
                    className="rounded-2xl glass p-4 hover:border-white/20 transition hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{loc.flag}</span>
                      <span className="text-sm font-bold">{loc.city}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{loc.country}</div>
                    <div className="mt-2 text-xs text-muted-foreground/80 leading-relaxed">
                      {loc.note}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right: pillars */}
          <div className="grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <SectionReveal
                key={p.title}
                variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
                delay={i * 0.08}
              >
                <div className="h-full rounded-2xl glass p-6 hover:border-white/20 transition hover:-translate-y-1 transition-transform">
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-bg shadow-lg">
                    <p.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 text-base font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
