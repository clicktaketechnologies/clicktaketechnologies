'use client'

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site-data";
import { SectionReveal } from "./scroll-animations";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF53A9]" />
              What we do
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight">
              Four practices.{" "}
              <span className="gradient-text">One delivery engine.</span>
            </h2>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Whether you need a custom AI assistant, a high-converting website, a SaaS platform or a
              full growth programme, our cross-functional teams in the UK, Pakistan, USA and Dubai plug
              into your business and ship like an in-house squad.
            </p>
          </SectionReveal>
        </div>

        {/* Service categories grid */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {SERVICE_CATEGORIES.map((cat, i) => (
            <SectionReveal
              key={cat.id}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={i * 0.05}
            >
              <div className="group relative h-full rounded-3xl glass p-8 hover:border-white/20 transition overflow-hidden">
                {/* hover glow */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#136DFF]/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#FF53A9]/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {cat.group}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-bold text-muted-foreground group-hover:text-foreground group-hover:border-white/20 transition">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">{cat.title}</h3>
                  <p className="mt-2 text-sm text-[#FF53A9] font-medium">{cat.tagline}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{cat.description}</p>

                  <ul className="mt-6 space-y-2">
                    {cat.services.map((s, j) => (
                      <motion.li
                        key={s.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05 }}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05] transition"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full gradient-bg">
                          <Check className="h-3 w-3 text-white" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold">{s.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* CTA strip */}
        <SectionReveal variant="zoomIn" delay={0.1} className="mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl gradient-bg p-8 sm:p-10 text-white shadow-2xl glow-brand">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">Not sure where to start?</h3>
              <p className="mt-2 text-white/80 max-w-xl">
                Book a free 30-minute consultation. We'll map your goals to the right practice and
                give you a clear, no-obligation roadmap.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#136DFF] hover:scale-[1.03] transition shrink-0"
            >
              Book a free call <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
