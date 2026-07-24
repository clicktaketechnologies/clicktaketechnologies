'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles, Shield, Zap, Clock } from "lucide-react";
import { SITE } from "@/lib/site-data";

/* NEW HERO — competitor-inspired redesign.
 * Pattern: Split layout (Vention) + Navy bg with orange CTA (Index.dev)
 *          + floating value-prop cards (Vention) + bold heavy type (Brocoders).
 * Left: badge → headline → subtext → 2 CTAs → trust row.
 * Right: floating glass cards over a dark navy gradient with subtle orbs. */
export function NxHero() {
  return (
    <section className="relative overflow-hidden nx-hero-bg pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28">
      {/* Subtle dot grid texture */}
      <div className="absolute inset-0 nx-dot-grid opacity-40 pointer-events-none" />

      {/* Floating glow orbs */}
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-[#FF6B35]/20 blur-3xl nx-orb pointer-events-none" />
      <div
        className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#3B82F6]/25 blur-3xl nx-orb pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT: copy column ─── */}
          <div className="text-center lg:text-left">
            {/* Trust pill — G2/Clutch style (Index.dev pattern) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-[#FF6B35] text-[#FF6B35]" />
                ))}
              </div>
              <span className="text-white/40">|</span>
              <span>Rated 5.0 by 120+ clients on Clutch &amp; GoodFirms</span>
            </motion.div>

            {/* Headline — bold, tight, with orange gradient highlight */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.02]"
            >
              Build, Market &amp;{" "}
              <span className="nx-text-orange-grad">Scale</span>{" "}
              Your Business with AI-Powered Engineering.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 mx-auto lg:mx-0 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
            >
              We design, ship and grow websites, SaaS platforms, mobile apps and AI
              automation systems for ambitious brands across the UK, Pakistan, USA &amp; Dubai —
              120+ projects delivered since {SITE.founded}.
            </motion.p>

            {/* CTAs — orange primary + outline secondary (Index.dev pattern) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="group nx-btn-orange inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4 nx-arrow" />
              </Link>
              <Link
                href="/contact"
                className="nx-btn-outline-light inline-flex items-center justify-center gap-2 px-7 py-4 text-sm sm:text-base"
              >
                Get Free Audit
              </Link>
            </motion.div>

            {/* Trust row — no upfront cost / 7-day kickoff / senior engineers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-sm text-white/60"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                No upfront cost
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
                7-day kickoff
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                Senior engineers only
              </span>
            </motion.div>
          </div>

          {/* ─── RIGHT: floating value cards (Vention pattern) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main visual frame */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative rotating ring */}
              <div
                className="absolute inset-0 rounded-full border border-white/10"
                style={{ animation: "spin 30s linear infinite" }}
              />
              <div className="absolute inset-8 rounded-full border border-white/5" />

              {/* Central glowing orb */}
              <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-[#FF6B35]/40 via-[#3B82F6]/30 to-transparent blur-2xl animate-pulse-glow" />

              {/* Center icon */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#E55319] grid place-items-center shadow-2xl">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Floating cards — positioned around the ring */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 -left-4 nx-card-dark p-4 w-44"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-[#FF6B35]/20 grid place-items-center">
                    <Zap className="h-4 w-4 text-[#FF6B35]" />
                  </div>
                  <span className="text-xs font-semibold text-white">Fast Delivery</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  MVP in 30 days · Sprint-based shipping
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-12 -right-6 nx-card-dark p-4 w-44"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-[#3B82F6]/20 grid place-items-center">
                    <Shield className="h-4 w-4 text-[#3B82F6]" />
                  </div>
                  <span className="text-xs font-semibold text-white">Secure &amp; Scalable</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  SOC2-grade · Cloud-native architecture
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 -left-6 nx-card-dark p-4 w-44"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-[#10B981]/20 grid place-items-center">
                    <Clock className="h-4 w-4 text-[#10B981]" />
                  </div>
                  <span className="text-xs font-semibold text-white">24/7 Support</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Dedicated PM + Slack channel
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-4 right-0 nx-card-dark p-4 w-44"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-8 w-8 rounded-lg bg-[#EC4899]/20 grid place-items-center">
                    <Star className="h-4 w-4 text-[#EC4899]" />
                  </div>
                  <span className="text-xs font-semibold text-white">Top Rated</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Clutch 5.0 · 120+ projects shipped
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
