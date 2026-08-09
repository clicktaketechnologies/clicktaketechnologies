'use client'

import Link from "next/link";
import{
  NxPageLayout, NxPageHero, NxPageSection, NxSectionHeader, NxButton} from "../nx-page-layout";
import { Nx3DScene } from "../nx-3d-scene";
import { Nx3DCharacter } from "../nx-3d-character";
import { NxStoryScene } from "../nx-story-scene";
import { TiltCard } from "@/components/site/tilt-card";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Building2, Store, ShoppingBag, Wrench, Globe, Users } from "lucide-react";
import { SOLUTIONS } from "@/lib/site-data";

const ICONS: Record<string, any> = {
  Building2, Store, ShoppingBag, Wrench, Globe, Users, Sparkles,
};

const SLUG_ICON: Record<string, string> = {
  startups: "Building2",
  "local-businesses": "Store",
  "ecommerce-brands": "ShoppingBag",
  "repair-shops": "Wrench",
  "uk-businesses": "Globe",
  agencies: "Users",
};

export function SolutionsIndexPage() {
  return (
    <NxPageLayout>
        {/* 3D character — floats in hero area, lg+ only */}
{/* Per-page 3D Story Scene — solutions variant. Sits behind hero content. */}
        <NxStoryScene variant="solutions" />
                <div className="pointer-events-none absolute right-0 top-24 lg:top-32 xl:top-40 z-[5] hidden lg:block" aria-hidden="true">
          <Nx3DCharacter variant="solutions" size="md" />
        </div>
        {/* 3D floating geometric accents */}
        <Nx3DScene density="low" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#EC4899]">
              Solutions
            </div>
            <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F5F0]">
              Built for your business type — not a generic pitch.
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              ClickTake Technologies ships tailored solutions for six audience types across the UK,
              Pakistan, USA and Dubai. Each solution combines the right mix of services — web,
              AI, marketing and creative — into a fixed-scope, fixed-timeline engagement with
              measurable outcomes.
            </p>
          </motion.div>

          {/* Solutions grid */}
          <div className="mt-12 sm:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => {
              const Icon = ICONS[SLUG_ICON[s.slug] || "Sparkles"];
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <TiltCard
                    className="group/tilt block h-full rounded-2xl border border-border bg-[#14141A] p-6 hover:border-primary/40 transition-colors"
                    glow={true}
                    shine={true}
                    maxTilt={10}
                  >
                    <Link href={`/solutions/${s.slug}`} className="contents">
                      <div className="flex items-start justify-between mb-4">
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover/tilt:text-foreground transition" />
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {s.audience}
                      </div>
                      <h3 className="mt-1 text-lg font-bold leading-tight">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {s.hero}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.outcomes.slice(0, 3).map((o) => (
                          <span
                            key={o.label}
                            className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[10px] font-medium"
                          >
                            <span className="text-muted-foreground">{o.label}:</span>&nbsp;
                            <span className="text-foreground">{o.value}</span>
                          </span>
                        ))}
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-[#EC4899] shrink-0" />
                Not sure which solution fits?
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Book a free 30-minute consultation — we will scope it together and recommend the right path.
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition shrink-0"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
    </NxPageLayout>
  );
}
