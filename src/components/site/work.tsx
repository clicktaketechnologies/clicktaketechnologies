'use client'

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { WORK_CASES } from "@/lib/site-data";
import { SectionReveal } from "./scroll-animations";

export function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-[#136DFF]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[#FF53A9]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionReveal variant="fadeUp">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#136DFF]" />
                Featured work
              </div>
            </SectionReveal>
            <SectionReveal variant="fadeUp" delay={0.1}>
              <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight">
                Selected <span className="gradient-text">case studies.</span>
              </h2>
            </SectionReveal>
          </div>
          <SectionReveal variant="slideRight" delay={0.15}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:border-[#136DFF]/30 hover:bg-white/[0.06]"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </SectionReveal>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {WORK_CASES.map((p, i) => (
            <SectionReveal
              key={p.title}
              variant={i % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={i * 0.08}
            >
              <article
                className={`group relative h-full overflow-hidden rounded-3xl glass hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${p.glow}`}
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_40%)]" />

                  {/* animated shine on hover */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute -left-40 top-0 h-full w-32 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />
                  </div>

                  {/* floating orb */}
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                  {/* external button */}
                  <Link
                    href={p.url}
                    aria-label={`View ${p.title} case study`}
                    className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:rotate-12 hover:bg-white hover:text-black"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>

                  {/* metric pill */}
                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {p.metric}
                  </div>

                  {/* bottom title block */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                      {p.category}
                    </div>
                    <div className="mt-2 text-2xl font-bold text-white">
                      {p.title}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    {p.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={p.url}
                      className="group/btn inline-flex shrink-0 items-center gap-1.5 rounded-full gradient-bg px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      View project
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* subtle border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
