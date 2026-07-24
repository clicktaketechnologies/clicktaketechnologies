'use client'

import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { SectionReveal } from "./scroll-animations";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#FF53A9]/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[#136DFF]" />
              Client stories
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight">
              Trusted by founders &{" "}
              <span className="gradient-text">enterprise teams alike.</span>
            </h2>
          </SectionReveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <SectionReveal
              key={t.name}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={i * 0.08}
            >
              <figure className="relative h-full rounded-3xl glass p-8 hover:ct-divider transition">
                <Quote className="h-8 w-8 text-[#FF53A9]/60" />
                <blockquote className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full gradient-bg text-sm font-bold text-white shadow-lg">
                    {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.location}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
