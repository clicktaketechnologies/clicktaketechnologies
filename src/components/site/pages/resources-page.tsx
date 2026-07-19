'use client'

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { RESOURCES } from "@/lib/site-data";

export function ResourcesPage() {
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-32 pb-24 sm:pb-32">
        <section className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Resources
            </div>
            <h1 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Playbooks & guides for{" "}
              <span className="gradient-text">ambitious founders.</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              Practical frameworks on AI adoption, SEO, headless commerce, hiring and market entry —
              written from our experience shipping across the UK (Birmingham), Pakistan (Multan),
              USA (Austin) and Dubai.
            </p>
          </motion.div>

          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r, i) => (
              <motion.article
                key={r.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {r.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {r.readTime}
                  </span>
                </div>
                <h2 className="font-display text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition">
                  {r.title}
                </h2>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {r.excerpt}
                </p>
                <div className="mt-4 sm:mt-5 flex items-center justify-between">
                  <Link
                    href={`/resources/${r.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2 transition-all"
                  >
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
