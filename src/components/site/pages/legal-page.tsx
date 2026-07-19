'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";

export interface LegalSection {
  num: string;
  title: string;
  body: React.ReactNode;
}

interface Props {
  icon: React.ReactNode;
  title: string;
  lastUpdated: string;
  badge: string;
  accentClass?: string; // e.g. "bg-brand-cyan/20"
  sections: LegalSection[];
}

export function LegalPage({ icon, title, lastUpdated, badge, accentClass = "bg-brand-cyan/20", sections }: Props) {
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-28 pb-24">
        <section className="mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-b border-border/50 pb-8 mb-8 text-center sm:text-left relative"
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-32 h-32 ${accentClass} blur-[50px] -z-10 rounded-full`} />

            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow mb-4">
              {icon}
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 bg-secondary/50 border border-border px-3 py-1.5 rounded-full backdrop-blur-sm">
                Last Updated: {lastUpdated}
              </span>
              <span className="flex items-center gap-1.5 bg-secondary/50 border border-border px-3 py-1.5 rounded-full backdrop-blur-sm">
                {badge}
              </span>
            </div>
          </motion.div>

          {/* Sections */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
            className="space-y-6 text-sm leading-7 text-muted-foreground"
          >
            {sections.map((s) => (
              <motion.div
                key={s.num}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md shadow-sm transition-colors hover:bg-card/60 hover:border-border/80"
              >
                <h2 className="text-lg font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-primary text-xs">{s.num}</span> {s.title}
                </h2>
                <div className="space-y-3">{s.body}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="text-base font-bold">Questions about this policy?</div>
              <div className="text-sm text-muted-foreground">Email us at Info@clicktaketech.com — we respond within 24 hours.</div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
            >
              Contact us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
