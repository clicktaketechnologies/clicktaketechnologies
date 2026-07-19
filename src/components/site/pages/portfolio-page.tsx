'use client'

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { WORK_CASES } from "@/lib/site-data";

export function PortfolioPage() {
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 pb-32">
        <section className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-1.5 text-xs backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Selected Work
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Case studies from{" "}
              <span className="gradient-text">four continents.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Headless e-commerce, AI dashboards, brand systems and growth campaigns —
              shipped for ambitious brands across the UK, Pakistan, USA and Dubai.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {WORK_CASES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-card/70 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${p.glow}`}
              >
                {/* Image / gradient placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${
                        i % 4 === 0 ? "rgba(0,200,255,0.25), rgba(59,130,246,0.4)" :
                        i % 4 === 1 ? "rgba(99,102,241,0.25), rgba(168,85,247,0.4)" :
                        i % 4 === 2 ? "rgba(139,92,246,0.25), rgba(236,72,153,0.4)" :
                        "rgba(217,70,239,0.25), rgba(245,158,11,0.4)"
                      })`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_40%)]" />

                  {/* shine */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute -left-40 top-0 h-full w-32 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />
                  </div>

                  {/* external button */}
                  <a
                    href={p.url}
                    className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:rotate-12 hover:bg-white hover:text-black"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {/* metric */}
                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {p.metric}
                  </div>

                  {/* bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                      {p.category}
                    </div>
                    <div className="mt-2 font-display text-2xl font-bold text-white">
                      {p.title}
                    </div>
                    <div className="mt-1 text-[11px] text-white/60">
                      {p.location}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm leading-7 text-muted-foreground">{p.description}</p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-secondary/50 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.url}
                      className="group/btn inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                    >
                      View project
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-white/5" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
