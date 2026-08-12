'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { SectionReveal } from "./scroll-animations";

// Three.js canvas — must be client-only and lazy-loaded. Kept from the
// previous hero so the floating geometric scene stays part of the brand
// identity. It renders behind the new centered hero copy.
const Hero3D = dynamic(() => import("./hero-3d").then(m => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="h-32 w-32 rounded-full bg-gradient-to-tr from-[#136DFF]/30 to-[#FF53A9]/30 blur-2xl animate-pulse-glow" />
    </div>
  ),
});

/* Hero — new centered design (VLM analysis of the new preview URL).
 * Layout: badge pill → 3-line headline → subtext → 2 CTA buttons → 3 trust
 * indicators. All centered, max-w-4xl. Theme-aware via .glass + .ct-* tokens. */
export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-20">
      {/* Background gradient layers + faint grid + the brand 3D scene behind
          the centered copy. Reduced blur radius (60px) to avoid GPU memory
          pressure on integrated graphics. */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#136DFF]/20 blur-[60px] animate-pulse-glow" />
        <div
          className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-[#FF53A9]/20 blur-[60px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        {/* Floating 3D geometric scene — sits behind the copy as ambient brand
            texture. Pointer-events disabled so it never blocks the CTAs. */}
        <div className="absolute inset-0 opacity-60">
          <Hero3D />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Badge pill — small blue dot + text, glass pill */}
        <SectionReveal variant="fadeUp">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-blue" />
            </span>
            <span>UK &amp; Pakistan Based Digital Growth Partner</span>
          </div>
        </SectionReveal>

        {/* Headline — 3 lines, ultra-bold, centered. Lines 1-2 foreground,
            line 3 cyan-blue gradient text. */}
        <SectionReveal variant="fadeUp" delay={0.1}>
          <h1 className="mt-6 sm:mt-8 text-4xl leading-[1.05] sm:text-6xl sm:leading-[1.05] lg:text-7xl lg:leading-[1.02] font-black tracking-tight">
            <span className="block text-foreground">Build, Market &amp; Scale</span>
            <span className="block text-foreground">Your Business with</span>
            <span className="block bg-gradient-to-r from-brand-cyan via-brand-blue to-[#136DFF] bg-clip-text text-transparent animate-gradient">
              ClickTake Technologies
            </span>
          </h1>
        </SectionReveal>

        {/* Subtext */}
        <SectionReveal variant="fadeUp" delay={0.2}>
          <p className="mt-6 sm:mt-8 mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            We are a full-stack digital agency that combines strategy, design, development, and AI
            to help businesses grow online. From startups to enterprises, we deliver measurable results.
          </p>
        </SectionReveal>

        {/* Two CTAs side by side, centered */}
        <SectionReveal variant="fadeUp" delay={0.3}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl glow-brand hover:scale-[1.03] transition"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border ct-divider ct-surface px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-foreground backdrop-blur-xl hover:bg-foreground/[0.06] transition"
            >
              Get Free Audit
            </Link>
          </div>
        </SectionReveal>

        {/* Trust indicators — 3 items, small icons + text */}
        <SectionReveal variant="fadeUp" delay={0.4}>
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs sm:text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-blue" />
              <span>Founded {SITE.founded}</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-pink" />
              <span>UK &amp; Pakistan</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-border" />
            <div className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-cyan" />
              <span>Full-Stack Digital Team</span>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Locations marquee — kept from the previous hero so the brand's global
          presence is reinforced at the bottom of the section. */}
      <div className="relative mt-16 sm:mt-24 overflow-hidden border-y ct-divider py-4">
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
