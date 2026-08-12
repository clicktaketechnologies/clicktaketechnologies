'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Brain, Bot, Wand2, Eye, Workflow,
  Server, Layers, Shield, Cloud, Layout, ShoppingCart, Code2, Wrench, RefreshCw, Globe,
  Megaphone, PenTool, TrendingUp, Search, Share2,
  Palette, Video,
} from "lucide-react";
import { SERVICES, CATEGORY_STYLES, STARTER_KIT, type ServiceItem } from "@/lib/site-data";
import { SectionReveal } from "./scroll-animations";

/* SERVICE_ICONS — maps the `icon_name` field on ServiceItem to a real lucide
 * component. Kept in sync with the same map in navbar.tsx + services-page.tsx. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Brain, Bot, Wand2, Eye, Workflow,
  Server, Layers, Shield, Cloud, Layout, ShoppingCart, Code2, Wrench, RefreshCw, Globe,
  Megaphone, PenTool, TrendingUp, Search, Share2,
  Palette, Video,
  Rocket: Sparkles,
  Sparkles,
};

/* Category tab config. The `id` matches a CATEGORY_STYLES key where possible.
 * "Business Essentials" is a custom grouping that bundles the Starter Kit
 * flagship + maintenance + redesign + domain-hosting add-ons. */
type TabId = "marketing" | "web" | "ai" | "creative" | "essentials";

const TABS: { id: TabId; label: string; accent: string }[] = [
  { id: "marketing",  label: "Digital Marketing", accent: "from-emerald-500 to-teal-600" },
  { id: "web",        label: "Web & Software",    accent: "from-brand-cyan to-brand-blue" },
  { id: "ai",         label: "AI Automation",     accent: "from-brand-magenta to-brand-blue" },
  { id: "creative",   label: "Creative",          accent: "from-brand-pink to-orange-500" },
  { id: "essentials", label: "Business Essentials", accent: "from-amber-500 to-brand-pink" },
];

function matchesTab(s: ServiceItem, tab: TabId): boolean {
  if (tab === "essentials") {
    // Bundle flagship Starter Kit + the 3 "operate your site" services.
    return (
      s.category === "starter-kit" ||
      s.slug === "web/maintenance" ||
      s.slug === "web/redesign" ||
      s.slug === "web/domain-hosting"
    );
  }
  return s.category === tab;
}

export function Services() {
  const [active, setActive] = useState<TabId>("marketing");

  const filtered = SERVICES.filter((s) => matchesTab(s, active));

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header — centered, single column */}
        <div className="max-w-3xl mx-auto text-center">
          <SectionReveal variant="fadeUp">
            <div className="inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
              What we do
            </div>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.1}>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Everything You Need to{" "}
              <span className="gradient-text">Grow Online</span>
            </h2>
          </SectionReveal>
          <SectionReveal variant="fadeUp" delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Five practices, one delivery engine. Browse by category to see exactly what we ship —
              from SEO and paid ads to AI automation and full-stack web builds.
            </p>
          </SectionReveal>
        </div>

        {/* Category tab bar */}
        <SectionReveal variant="fadeUp" delay={0.2}>
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`relative rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition border ${
                    isActive
                      ? "text-white border-transparent shadow-lg"
                      : "text-muted-foreground hover:text-foreground ct-divider ct-surface"
                  }`}
                >
                  {isActive && (
                    <span
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${t.accent}`}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Services grid — 3 columns on desktop, animated when tab changes. */}
        <div className="mt-10 sm:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((s, i) => {
                const Icon = SERVICE_ICONS[s.icon_name] || Sparkles;
                // For the "essentials" tab we lean on the starter-kit style; for
                // every other tab we use the matching CATEGORY_STYLES accent.
                const styleKey =
                  s.category === "starter-kit" ? "ai" : s.category;
                const style = CATEGORY_STYLES[styleKey as keyof typeof CATEGORY_STYLES];
                const accentColor = style?.accentColor ?? "text-brand-blue";
                const accentBg = style?.accentBg ?? "bg-brand-blue/10";
                const borderHover = style?.borderHover ?? "hover:border-brand-blue/40";

                return (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={`/services/${s.slug}`}
                      className={`group relative block h-full rounded-2xl ct-card p-6 sm:p-7 ${borderHover} hover:-translate-y-1 transition`}
                    >
                      {/* hover glow */}
                      <div className={`absolute -top-16 -right-16 h-32 w-32 rounded-full ${accentBg} blur-3xl opacity-0 group-hover:opacity-100 transition`} />

                      <div className="relative flex items-start gap-4">
                        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${accentBg} ${accentColor} group-hover:scale-110 transition-transform`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold leading-snug">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {s.description}
                          </p>
                          <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue group-hover:gap-2 transition-all">
                            Learn More
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Starter Kit flagship CTA — only shown on the essentials tab */}
          {active === "essentials" && STARTER_KIT && (
            <SectionReveal variant="zoomIn" delay={0.1} className="mt-8">
              <Link
                href="/services/starter-kit"
                className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-amber-500/15 to-brand-pink/15 border border-amber-500/30 p-6 sm:p-8 hover:from-amber-500/25 hover:to-brand-pink/25 transition"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-brand-pink text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-base sm:text-lg font-bold flex-wrap">
                      <span className="truncate">{STARTER_KIT.title}</span>
                      <span className="text-[10px] rounded-full bg-gradient-to-r from-amber-500 to-brand-pink px-2 py-0.5 text-white shrink-0 font-bold uppercase tracking-wider">
                        Flagship
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                      {STARTER_KIT.description}
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white text-amber-600 px-5 py-2.5 text-sm font-bold shadow-md group-hover:scale-[1.03] transition shrink-0">
                  Explore the kit <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            </SectionReveal>
          )}
        </div>

        {/* CTA strip removed in new design — section ends with the grid + Starter Kit card */}
      </div>
    </section>
  );
}
