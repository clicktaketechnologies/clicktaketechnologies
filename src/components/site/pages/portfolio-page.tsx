'use client'

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Wrench,
  Users,
  Truck,
  Eye,
  Smartphone,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Users2,
  School,
  Globe,
  MapPin,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import{
  NxPageLayout, NxPageHero, NxPageSection, NxSectionHeader, NxButton} from "../nx-page-layout";
import { Nx3DScene } from "../nx-3d-scene";
import { Nx3DCharacter } from "../nx-3d-character";
import { NxStoryScene } from "../nx-story-scene";
import { TiltCard } from "@/components/site/tilt-card";
import { CLIENT_PORTFOLIO, type ClientPortfolio } from "@/lib/site-data";

const ICONS: Record<string, LucideIcon> = {
  Wrench,
  Users,
  Truck,
  Eye,
  Smartphone,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Users2,
  School,
};

const CATEGORY_COUNT: Record<string, number> = CLIENT_PORTFOLIO.reduce(
  (acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const CATEGORY_GRADIENT: Record<string, string> = {
  "SaaS Platform": "from-cyan-500 to-blue-600",
  "Education": "from-emerald-500 to-teal-600",
  "Gadget Repair": "from-fuchsia-500 to-pink-600",
};

export function PortfolioPage() {
  return (
    <NxPageLayout>
        {/* 3D character — floats in hero area, lg+ only */}
{/* Per-page 3D Story Scene — portfolio variant. Sits behind hero content. */}
        <NxStoryScene variant="portfolio" />
                <div className="pointer-events-none absolute right-0 top-24 lg:top-32 xl:top-40 z-[5] hidden lg:block" aria-hidden="true">
          <Nx3DCharacter variant="portfolio" size="md" />
        </div>
        {/* 3D floating geometric accents */}
        <Nx3DScene density="low" />

              <section className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider bg-card/60 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              12 Live Client Sites — Real Production Deployments
            </div>
            <h1 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              Production work, {" "}
              <span className="gradient-text">live right now.</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              Twelve client platforms built and maintained by ClickTake Technologies —
              SaaS products, education portals, and e-commerce stores across the UK and globally.
              Every link below is a live deployment, not a mockup.
            </p>
          </motion.div>

          {/* Category overview cards */}
          <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-3">
            {Object.entries(CATEGORY_COUNT).map(([cat, count], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border ct-divider bg-card/60 backdrop-blur-md p-5"
              >
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${CATEGORY_GRADIENT[cat]} text-white text-xs font-bold`}>
                  {count}
                </div>
                <div className="mt-3 text-sm font-semibold">{cat}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {cat === "SaaS Platform" && "Multi-tenant products & dashboards"}
                  {cat === "Education" && "Learning platforms & academy systems"}
                  {cat === "Gadget Repair" && "Repair-shop commerce & booking sites"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Grid — 12 entries */}
          <div className="mt-10 sm:mt-14 grid gap-5 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
            {CLIENT_PORTFOLIO.map((p, i) => (
              <PortfolioCard key={p.slug} p={p} index={i} />
            ))}
          </div>

          {/* Admin panel note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border ct-divider bg-card/40 backdrop-blur-md p-5 sm:p-6 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-brand-blue" />
              New projects added weekly via the ClickTake admin panel
            </div>
            <p className="mt-2 text-xs text-muted-foreground max-w-2xl mx-auto">
              The portfolio above is a curated snapshot of 12 live client deployments.
              Our team ships new SaaS products, e-commerce stores, and growth platforms every month —
              the live list grows on the production site as new case studies are published.
            </p>
          </motion.div>
        </section>
    </NxPageLayout>
  );
}

function PortfolioCard({ p, index }: { p: ClientPortfolio; index: number }) {
  const Icon = ICONS[p.icon] || Globe;
  const gradient = CATEGORY_GRADIENT[p.category] || "from-brand-blue to-brand-cyan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 6) * 0.06 }}
    >
      <TiltCard
        className="group/tilt relative overflow-hidden rounded-[24px] border ct-divider bg-card/70 backdrop-blur-xl hover:shadow-cyan-500/10"
        glow={true}
        shine={false}
        maxTilt={6}
      >
        {/* Top gradient tile with icon + Live badge */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className={`h-full w-full bg-gradient-to-br ${p.color} transition-transform duration-700 group-hover/tilt:scale-110`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_45%)]" />

          {/* Live badge top-right */}
          <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border ct-divider bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </div>

          {/* Category chip bottom-left */}
          <div className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-md">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
            {p.category}
          </div>

          {/* Big icon center */}
          <div className="absolute inset-0 grid place-items-center">
            <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white`}>
              <Icon className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="font-display text-lg font-bold leading-tight">{p.name}</div>
            <div className="text-[10px] text-muted-foreground shrink-0 mt-1">since {p.year}</div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {p.blurb}
          </p>

          {/* Tech chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border ct-divider bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Region + Visit link */}
          <div className="mt-4 flex items-center justify-between gap-3 border-t ct-divider pt-3">
            <div className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {p.region}
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-magenta px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
            >
              Visit live site
              <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/5" />
      </TiltCard>
    </motion.div>
  );
}
