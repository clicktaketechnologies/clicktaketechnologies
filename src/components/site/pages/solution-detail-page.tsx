'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, Sparkles, CheckCircle2, AlertTriangle,
  TrendingUp, MapPin, Phone, Clock, ChevronRight, Building2, Store,
  ShoppingBag, Wrench, Globe, Users,
} from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { SERVICES, type Solution } from "@/lib/site-data";

interface Props { solution: Solution; }

const ICONS: Record<string, any> = {
  Building2, Store, ShoppingBag, Wrench, Globe, Users, Sparkles,
  CheckCircle2, AlertTriangle, TrendingUp, MapPin, Phone, Clock,
};

const SLUG_ICON: Record<string, string> = {
  startups: "Building2",
  "local-businesses": "Store",
  "ecommerce-brands": "ShoppingBag",
  "repair-shops": "Wrench",
  "uk-businesses": "Globe",
  agencies: "Users",
};

export function SolutionDetailPage({ solution }: Props) {
  const Icon = ICONS[SLUG_ICON[solution.slug] || "Sparkles"];
  const relatedServices = SERVICES.filter((s) => solution.services.includes(s.slug));

  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 sm:pt-44 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── HERO ─────────────────────────────────────────── */}
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Solutions
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-brand-blue">
                {solution.audience}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              {solution.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-semibold text-foreground/80">
              {solution.hero}
            </p>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {solution.summary}
            </p>

            {/* Outcomes strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {solution.outcomes.map((o) => (
                <div
                  key={o.label}
                  className="rounded-xl border border-border bg-card/50 backdrop-blur-md p-4"
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {o.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{o.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── PAIN POINTS ──────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">The challenges you face</h2>
            </div>
            <div className="space-y-3 max-w-3xl">
              {solution.pain_points.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-md p-4"
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── OUR SOLUTION ─────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">How ClickTake solves it</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {solution.our_solution.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-md p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue mt-0.5" />
                  <span className="text-sm leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── SERVICES USED ────────────────────────────────── */}
          {relatedServices.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mt-12 sm:mt-16"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 sm:mb-6">
                Services bundled in this solution
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-border bg-card/40 backdrop-blur-md p-4 hover:border-primary/40 hover:bg-card/60 transition"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-cyan text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold leading-tight group-hover:text-foreground text-foreground/90">
                        {s.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {s.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* ─── CTA ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 sm:mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-brand-blue shrink-0" />
                {solution.cta}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Free 30-minute discovery call. No obligation, no hard sell — just expert advice on the right path for you.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
