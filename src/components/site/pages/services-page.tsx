'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain, Bot, Wand2, Eye,
  Server, Layers, Shield, Cloud,
  Search, PenTool, Megaphone, TrendingUp,
  Palette, Video, Sparkles, ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import{
  NxPageLayout, NxPageHero, NxPageSection, NxButton} from "../nx-page-layout";
import { Nx3DScene } from "../nx-3d-scene";
import { TiltCard } from "@/components/site/tilt-card";
import {
  SERVICES,
  STARTER_KIT,
  CATEGORY_STYLES,
  groupServicesByCategory,
} from "@/lib/site-data";

const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Bot, Wand2, Eye,
  Server, Layers, Shield, Cloud,
  Search, PenTool, Megaphone, TrendingUp,
  Palette, Video,
  Rocket: Sparkles,
  Sparkles,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ServicesPage() {
  const dbServices = SERVICES;
  const starterKit = STARTER_KIT;

  const groups = Object.entries(CATEGORY_STYLES).map(([key, style]) => {
    const items = dbServices
      .filter((s) => s.category === key && s.slug !== "starter-kit")
      .map((s) => ({
        label: s.title,
        desc: s.description,
        to: `/services/${s.slug}`,
        icon: ICON_MAP[s.icon_name] || Sparkles,
      }));
    return { id: key, ...style, items };
  }).filter((g) => g.items.length > 0);

  const stats = [
    { value: "150+", label: "Brands served" },
    { value: "90 days", label: "Avg. time to revenue" },
    { value: "5★", label: "Average client rating" },
    { value: `${dbServices.length}`, label: "Service offerings" },
  ];

  return (
    <NxPageLayout>
      <NxPageHero
        character="services"
        storyVariant="services"
        eyebrow="What We Do"
        title={<>Services built for <span className="nx-text-orange-grad">modern brands.</span></>}
        subtitle={
          <>
            From AI and full-stack development to brand, video, and growth marketing —
            every service is built around one objective: measurable business outcomes for
            brands in the UK, Pakistan, USA and Dubai.
          </>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        ctas={
          <>
            <NxButton href="/contact">Book a free discovery call</NxButton>
            <NxButton href="/pricing" variant="outline">View pricing</NxButton>
          </>
        }
        stats={stats}
      />

      {/* FLAGSHIP STARTER KIT BANNER */}
      {starterKit && (
        <NxPageSection variant="surface" width="wide" padding="tight">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/services/starter-kit"
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 rounded-3xl border border-[#FF53A9]/30 nx-surface-alt p-5 sm:p-8 transition-all duration-300 hover:border-[#FF53A9]/60 overflow-hidden"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#FF53A9]/8 blur-3xl" />

              <div className="relative flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
                <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 grid place-items-center rounded-2xl nx-orange-gradient shadow-lg shadow-[#FF53A9]/25">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FF53A9]">Flagship Offering</span>
                    <span className="rounded-full bg-[#FF53A9]/20 border border-[#FF53A9]/30 px-2 py-0.5 text-[10px] font-semibold text-[#FF53A9] uppercase tracking-wider">Most Popular</span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight nx-text">{starterKit.title}</div>
                  <div className="text-xs sm:text-sm nx-text-soft mt-1 line-clamp-2">
                    {starterKit.detailed_description || starterKit.description}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <div className="hidden sm:flex flex-col gap-1 text-right">
                  <div className="text-xs nx-text-muted">Typically live in</div>
                  <div className="text-sm font-bold text-[#FF53A9]">90 days</div>
                </div>
                <div className="h-10 w-10 rounded-full border border-[#FF53A9]/40 bg-[#FF53A9]/10 grid place-items-center transition-all group-hover:bg-[#FF53A9]/20 group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5 text-[#FF53A9]" />
                </div>
              </div>
            </Link>
          </motion.div>
        </NxPageSection>
      )}

      {/* SERVICE GROUPS */}
      <NxPageSection variant="surface" width="wide">
        <div className="space-y-16 sm:space-y-24">
          {groups.map((g) => (
            <motion.section
              key={g.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="min-w-0">
                  <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${g.accentColor} mb-2`}>
                    {g.eyebrow}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight nx-text">{g.title}</h2>
                  <p className="mt-2 text-sm sm:text-base nx-text-soft max-w-xl leading-relaxed">{g.description}</p>
                </div>
              </div>

              <div className={`grid sm:grid-cols-2 ${g.items.length === 4 ? "lg:grid-cols-4" : g.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 max-w-2xl"} gap-3 sm:gap-4`}>
                {g.items.map((item, ii) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ii * 0.08, duration: 0.45 }}
                    >
                      <TiltCard
                        className={`group/tilt flex flex-col h-full rounded-2xl border nx-bd nx-surface p-6 transition-colors duration-300 hover:border-[#FF53A9]/40`}
                        glow={true}
                        shine={true}
                      >
                        <Link href={item.to} className="contents">
                          <div className={`h-0.5 w-10 rounded-full bg-gradient-to-r ${g.gradient} mb-5 transition-all duration-300 group-hover/tilt:w-16`} />

                          <div className={`h-11 w-11 grid place-items-center rounded-xl ${g.accentBg} border ${g.accentBorder} mb-4 transition-transform duration-300 group-hover/tilt:scale-110`}>
                            <Icon className={`h-5 w-5 ${g.accentColor}`} />
                          </div>

                          <div className="font-bold text-base mb-2 leading-snug nx-text">{item.label}</div>
                          <div className="text-sm nx-text-soft leading-relaxed flex-1">{item.desc}</div>

                          <div className="mt-5 flex items-center justify-between">
                            <span className={`text-xs font-semibold ${g.accentColor} opacity-0 group-hover/tilt:opacity-100 transition-opacity`}>
                              Learn more
                            </span>
                            <ArrowUpRight className={`h-4 w-4 ${g.accentColor} opacity-30 group-hover/tilt:opacity-100 transition-all group-hover/tilt:translate-x-0.5 group-hover/tilt:-translate-y-0.5`} />
                          </div>
                        </Link>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>
      </NxPageSection>

      {/* BOTTOM CTA */}
      <NxPageSection variant="surface-muted" width="wide">
        <div className="relative overflow-hidden rounded-3xl nx-orange-gradient p-8 sm:p-12 md:p-16 text-center">
          <div className="absolute inset-0 nx-dot-grid opacity-20 pointer-events-none" />
          <div className="relative">
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80 mb-3 sm:mb-4">Not sure where to start?</div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-white mb-3 sm:mb-4">
              Let&apos;s figure out what<br />
              your business actually needs.
            </h2>
            <p className="text-sm sm:text-lg text-white/85 max-w-xl mx-auto mb-6 sm:mb-8">
              Book a free 30-minute discovery call. We&apos;ll understand your goals, gaps, and budget —
              then tell you exactly which services will move the needle fastest.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-[#E0197A] shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
              >
                Book a free discovery call <ArrowUpRight className="h-4 sm:h-5 w-4 sm:w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-6 sm:px-8 py-3 sm:py-4 font-bold text-white hover:bg-white/10 transition text-sm sm:text-base"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </NxPageSection>
    </NxPageLayout>
  );
}
