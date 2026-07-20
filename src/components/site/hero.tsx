'use client'

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowUpRight, Sparkles, Globe2, Star } from "lucide-react";
import { STATS, SITE } from "@/lib/site-data";
import { SectionReveal, CountUp } from "./scroll-animations";

// Three.js canvas — must be client-only and lazy-loaded
const Hero3D = dynamic(() => import("./hero-3d").then(m => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-[#136DFF]/30 to-[#FF53A9]/30 blur-2xl animate-pulse-glow" />
    </div>
  ),
});

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Hero gradient layers — blur radius reduced from 120px → 60px to avoid
          GPU memory pressure on integrated graphics / low-end devices. */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#136DFF]/20 blur-[60px] animate-pulse-glow" />
        <div
          className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-[#FF53A9]/20 blur-[60px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12">
        {/* Left: copy */}
        <div className="relative z-10 text-center lg:text-left">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF53A9] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF53A9]" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#FF53A9]" />
              <span className="truncate">AI-powered agency · UK · Pakistan · USA · Dubai</span>
            </div>
          </SectionReveal>

          <SectionReveal variant="fadeUp" delay={0.1}>
            <h1 className="mt-6 sm:mt-8 text-[2rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] lg:text-7xl font-black tracking-tight">
              <span className="block">We build</span>
              <span className="block gradient-text animate-gradient">AI-powered products</span>
              <span className="block">that ship value.</span>
            </h1>
          </SectionReveal>

          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              ClickTake Technologies is a full-stack digital agency engineering websites, SaaS platforms,
              mobile apps and growth systems for ambitious brands in{" "}
              <span className="text-foreground font-semibold">Birmingham</span>,
              <span className="text-foreground font-semibold"> Lahore</span>,
              <span className="text-foreground font-semibold"> Austin</span> and
              <span className="text-foreground font-semibold"> Dubai</span>.
            </p>
          </SectionReveal>

          <SectionReveal variant="fadeUp" delay={0.3}>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-bg px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-xl hover:scale-[1.03] transition glow-brand"
              >
                Start your project <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold backdrop-blur-xl hover:bg-white/[0.07] transition"
              >
                <Globe2 className="h-4 w-4" /> View our work
              </a>
            </div>
          </SectionReveal>

          <SectionReveal variant="fadeUp" delay={0.4}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#FF53A9] text-[#FF53A9]" />
                ))}
                <span className="ml-2 text-foreground">5.0 from 80+ clients</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div><span className="text-foreground font-semibold">120+</span> projects shipped</div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div><span className="text-foreground font-semibold">4</span> global offices</div>
            </div>
          </SectionReveal>
        </div>

        {/* Right: 3D scene */}
        <SectionReveal variant="zoomIn" delay={0.3} className="relative h-[280px] sm:h-[420px] lg:h-[600px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#136DFF]/20 to-[#FF53A9]/20 blur-3xl opacity-60" />
          <div className="absolute inset-0">
            <Hero3D />
          </div>
        </SectionReveal>
      </div>

      {/* Stats strip with CountUp */}
      <SectionReveal variant="fadeUp" delay={0.2} className="mt-12 sm:mt-16 lg:mt-24 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s) => {
            const num = parseInt(s.value.replace(/\D/g, ""), 10) || 0;
            const suffix = s.value.replace(/[0-9]/g, "");
            return (
              <div
                key={s.label}
                className="rounded-2xl glass p-4 sm:p-6 text-center hover:border-white/20 transition"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text">
                  <CountUp to={num} suffix={suffix} />
                </div>
                <div className="mt-1 text-[11px] sm:text-xs lg:text-sm text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>
      </SectionReveal>

      {/* Locations marquee */}
      <div className="relative mt-12 sm:mt-16 overflow-hidden border-y border-white/5 py-4">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 sm:gap-12 whitespace-nowrap"
        >
          {[...SITE.locations, ...SITE.locations, ...SITE.locations].map((l, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="text-base">{l.flag}</span>
              <span className="font-semibold text-foreground">{l.city}</span>
              <span>· {l.country}</span>
              <span className="text-muted-foreground/40">—</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
