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
import { SERVICES, type ServiceItem } from "@/lib/site-data";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Brain, Bot, Wand2, Eye, Workflow,
  Server, Layers, Shield, Cloud, Layout, ShoppingCart, Code2, Wrench, RefreshCw, Globe,
  Megaphone, PenTool, TrendingUp, Search, Share2,
  Palette, Video,
  Rocket: Sparkles,
  Sparkles,
};

type TabId = "marketing" | "web" | "ai" | "creative" | "essentials";

const TABS: { id: TabId; label: string; icon: string; color: string }[] = [
  { id: "marketing",  label: "Digital Marketing",  icon: "Megaphone",  color: "#10B981" },
  { id: "web",        label: "Web & Software",     icon: "Code2",      color: "#3B82F6" },
  { id: "ai",         label: "AI & Automation",    icon: "Brain",      color: "#FF6B35" },
  { id: "creative",   label: "Creative & Brand",   icon: "Palette",    color: "#EC4899" },
  { id: "essentials", label: "Business Essentials",icon: "Rocket",     color: "#F59E0B" },
];

function matchesTab(s: ServiceItem, tab: TabId): boolean {
  if (tab === "essentials") {
    return (
      s.category === "starter-kit" ||
      s.slug === "web/maintenance" ||
      s.slug === "web/redesign" ||
      s.slug === "web/domain-hosting"
    );
  }
  return s.category === tab;
}

/* NEW SERVICES — bento grid with hover lift (Index.dev / Vention pattern).
 * Big colored category tabs at top, then a 3-column grid of service cards.
 * First card in each tab is highlighted (spans 2 rows) for visual rhythm. */
export function NxServices() {
  const [active, setActive] = useState<TabId>("marketing");
  const filtered = SERVICES.filter((s) => matchesTab(s, active));
  const activeMeta = TABS.find((t) => t.id === active)!;

  return (
    <section id="services" className="py-24 sm:py-32 nx-surface-muted">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 nx-eyebrow text-[var(--nx-orange)]"
          >
            <span className="h-1 w-8 rounded-full bg-[var(--nx-orange)]" />
            What we do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight nx-text"
          >
            Five practices.{" "}
            <span className="nx-text-orange-grad">One delivery engine.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-base sm:text-lg nx-text-soft leading-relaxed"
          >
            Browse by category to see exactly what we ship — from SEO and paid
            ads to AI automation and full-stack web builds. Each service comes
            with a fixed-scope sprint plan, dedicated PM, and weekly demos.
          </motion.p>
        </div>

        {/* Category tab bar — pill chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {TABS.map((t) => {
            const TabIcon = SERVICE_ICONS[t.icon] ?? Sparkles;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all border ${
                  isActive
                    ? "text-white border-transparent shadow-lg scale-105"
                    : "nx-text-soft nx-bd nx-surface hover:border-[var(--nx-border-strong)] hover:text-[var(--nx-ink)]"
                }`}
                style={isActive ? { background: t.color, boxShadow: `0 10px 30px -10px ${t.color}66` } : undefined}
              >
                <TabIcon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </motion.div>

        {/* Service cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filtered.slice(0, 9).map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon_name] ?? Sparkles;
              const href = s.slug ? `/services/${s.slug}` : "/services";
              const isFeatured = i === 0;
              return (
                <motion.div
                  key={s.slug || s.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={isFeatured ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                >
                  <Link
                    href={href}
                    className={`group h-full p-6 flex flex-col rounded-2xl border nx-bd nx-surface hover:shadow-xl hover:-translate-y-1 hover:border-[#FF6B35]/40 transition-all ${
                      isFeatured ? "min-h-[280px]" : ""
                    }`}
                  >
                    {/* Icon block */}
                    <div
                      className="h-12 w-12 rounded-xl grid place-items-center mb-5 group-hover:scale-110 transition-transform"
                      style={{ background: `${activeMeta.color}1a`, color: activeMeta.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold nx-text ${isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm nx-text-soft leading-relaxed line-clamp-3 flex-1">
                      {s.description}
                    </p>

                    {/* Footer row with "Learn more" arrow */}
                    <div className="mt-5 flex items-center justify-between pt-4 border-t nx-bd">
                      <span className="text-xs font-semibold nx-text-muted nx-eyebrow">
                        Learn more
                      </span>
                      <span
                        className="h-8 w-8 rounded-full grid place-items-center transition-all group-hover:rotate-12"
                        style={{ background: `${activeMeta.color}1a`, color: activeMeta.color }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* "See all services" CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--nx-orange)] hover:text-[var(--nx-orange-deep)] transition"
          >
            See all services
            <ArrowUpRight className="h-4 w-4 nx-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
