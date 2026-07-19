'use client'

import { motion } from "framer-motion";
import {
  MapPin, Mail, Phone, Globe, Clock, Users, Award, Zap,
  ArrowUpRight, Building2, Star, TrendingUp, Code2, Megaphone,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { BackgroundScene } from "../background-scene";
import { CustomCursor } from "../custom-cursor";
import { ScrollProgressBar, ScrollToTop } from "../scroll-animations";
import { ABOUT_STATS, ABOUT_VALUES, SITE } from "@/lib/site-data";

const ICONS: Record<string, any> = {
  Code2, Users, Star, TrendingUp, Zap, Award, Globe, MapPin, Mail, Phone, Clock, Building2, Megaphone,
};

export function AboutPage() {
  return (
    <>
      <BackgroundScene />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />

      <main className="relative z-10 pt-32 pb-32">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-1.5 text-xs backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              About ClickTake
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              We connect ambitious brands{" "}
              <span className="gradient-text">in a better way.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              ClickTake Technologies is an AI-powered digital agency founded in {SITE.founded}.
              We engineer websites, SaaS platforms, mobile apps and growth systems for brands across
              the UK (Birmingham), Pakistan (Multan), USA (Austin) and Dubai — with a single team
              that spans four time zones and ships like one.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_STATS.map((s, i) => {
              const Icon = ICONS[s.icon] || Code2;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-3xl font-black gradient-text">{s.val}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* VALUES */}
        <section className="mx-auto max-w-7xl px-4 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-1.5 text-xs backdrop-blur-xl uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              What we believe
            </div>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Three principles that govern every engagement.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ABOUT_VALUES.map((v, i) => {
              const Icon = ICONS[v.icon] || Zap;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${v.glowRaw}, transparent 70%)` }}
                  />
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-base">{v.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* OFFICES */}
        <section className="mx-auto max-w-7xl px-4 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-1.5 text-xs backdrop-blur-xl uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Where we work
            </div>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Four offices, one team.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our distributed setup gives us 18-hour development coverage and on-the-ground
              context in every market we serve — from Birmingham&apos;s startup scene to Dubai&apos;s enterprise landscape.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SITE.locations.map((l, i) => {
              return (
                <motion.div
                  key={l.country}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl border border-white/10 bg-card/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{l.flag}</div>
                  <div className="text-lg font-bold">{l.city}</div>
                  <div className="text-xs text-muted-foreground">{l.country}</div>
                  <div className="mt-3 text-xs leading-relaxed text-muted-foreground">{l.note}</div>
                  <div className="mt-3 text-[10px] font-mono text-muted-foreground/60">{l.coords}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-12 text-center overflow-hidden relative"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 left-1/4 h-48 w-48 bg-brand-cyan/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 right-1/4 h-48 w-48 bg-brand-magenta/10 blur-3xl rounded-full" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Want to build with us?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                We&apos;re always looking for ambitious clients and senior engineers who want to ship work that matters.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-7 py-3 font-semibold text-white shadow-lg hover:scale-105 transition"
                >
                  Start a project <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3 font-semibold backdrop-blur hover:bg-secondary transition"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
