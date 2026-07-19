'use client'

import { PROCESS_STEPS } from "@/lib/site-data";
import { SectionReveal, SectionDivider } from "./scroll-animations";

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9]" />
              How we work
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight">
              A proven five-step <span className="gradient-text">delivery model.</span>
            </h2>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              From the first workshop to post-launch growth, every engagement follows the same
              transparent, milestone-driven process — so you always know what's next.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-5">
          {PROCESS_STEPS.map((s, i) => (
            <SectionReveal
              key={s.n}
              variant="zoomIn"
              delay={i * 0.08}
            >
              <div className="group relative h-full rounded-2xl glass p-6 hover:border-white/20 transition hover:-translate-y-1 transition-transform">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black gradient-text">{s.n}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.description}</p>

                {/* Connector arrow */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:grid absolute top-1/2 -right-3 z-10 h-6 w-6 place-items-center rounded-full border border-white/10 bg-card/80 -translate-y-1/2">
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

        <div className="mt-20">
          <SectionDivider />
        </div>
      </div>
    </section>
  );
}
