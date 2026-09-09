'use client'

import { motion } from "framer-motion";
import {
  MapPin, Mail, Phone, Globe, Clock, Users, Award, Zap,
  ArrowUpRight, Building2, Star, TrendingUp, Code2, Megaphone,
} from "lucide-react";
import Link from "next/link";
import{
  NxPageLayout, NxPageHero, NxPageSection, NxSectionHeader, NxButton} from "../nx-page-layout";
import { TiltCard } from "@/components/site/tilt-card";
import { Nx3DScene } from "../nx-3d-scene";
import { ABOUT_STATS, ABOUT_VALUES, SITE } from "@/lib/site-data";

const ICONS: Record<string, any> = {
  Code2, Users, Star, TrendingUp, Zap, Award, Globe, MapPin, Mail, Phone, Clock, Building2, Megaphone,
};

export function AboutPage() {
  return (
    <NxPageLayout>
      <NxPageHero
        character="about"
        storyVariant="about"
        eyebrow="About ClickTake"
        title={<>We connect ambitious brands <span className="nx-text-orange-grad">in a better way.</span></>}
        subtitle={
          <>
            ClickTake Technologies is an AI-powered digital agency founded in {SITE.founded}.
            We engineer websites, SaaS platforms, mobile apps and growth systems for brands across
            the UK (Birmingham), Pakistan (Multan), USA (Austin) and Dubai — with a single team
            that spans four time zones and ships like one.
          </>
        }
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        ctas={
          <>
            <NxButton href="/contact">Start a project</NxButton>
            <NxButton href="/services" variant="outline">Explore services</NxButton>
          </>
        }
        stats={ABOUT_STATS.map((s) => ({ value: s.val, label: s.label }))}
      />

      {/* VALUES */}
      <NxPageSection variant="surface-muted" width="wide">
        <NxSectionHeader
          eyebrow="What we believe"
          title="Three principles that govern every engagement."
          align="left"
        />
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
                className="group relative overflow-hidden rounded-2xl border nx-bd nx-surface p-6 transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${v.glowRaw}, transparent 70%)` }}
                />
                <div className={`relative mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${v.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="relative font-semibold text-base nx-text">{v.title}</h4>
                <p className="relative mt-2 text-sm leading-relaxed nx-text-soft">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </NxPageSection>

      {/* OFFICES */}
      <NxPageSection variant="surface" width="wide">
        <NxSectionHeader
          eyebrow="Where we work"
          title="Four offices, one team."
          subtitle={
            <>
              Our distributed setup gives us 18-hour development coverage and on-the-ground
              context in every market we serve — from Birmingham&apos;s startup scene to Dubai&apos;s enterprise landscape.
            </>
          }
          align="left"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.locations.map((l, i) => (
            <motion.div
              key={l.country}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <TiltCard
                className="group/tilt h-full rounded-2xl border nx-bd nx-surface p-5 transition-colors duration-300 hover:border-[#FF53A9]/40"
                glow={true}
                shine={true}
                maxTilt={10}
              >
                <div className="text-3xl mb-3">{l.flag}</div>
                <div className="text-lg font-bold nx-text">{l.city}</div>
                <div className="text-xs nx-text-muted">{l.country}</div>
                <div className="mt-3 text-xs leading-relaxed nx-text-soft">{l.note}</div>
                <div className="mt-3 text-[10px] font-mono nx-text-muted">{l.coords}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </NxPageSection>

      {/* CTA */}
      <NxPageSection variant="surface-muted" width="wide">
        <div className="relative overflow-hidden rounded-3xl nx-orange-gradient p-10 sm:p-14 text-center">
          <div className="absolute inset-0 nx-dot-grid opacity-20 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
              Want to build with us?
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8">
              We&apos;re always looking for ambitious clients and senior engineers who want to ship work that matters.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-[#E0197A] shadow-xl hover:scale-105 transition"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3.5 font-bold text-white hover:bg-white/10 transition"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </NxPageSection>
    </NxPageLayout>
  );
}
