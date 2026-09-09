'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site-data";
import { METRICS, metricFormatters } from "@/lib/metrics";

/* NEW FOOTER — multi-column (Itransition + Index.dev pattern).
 * Columns: Brand+blurb+socials | Services | Solutions | Company | Contact.
 * Bottom bar: copyright + legal links.
 *
 * THEME-AWARE (light + dark):
 *  - In dark mode: deep navy surface (original look).
 *  - In light mode: dark footer stays as an intentional contrast block
 *    (common SaaS pattern: white page → dark footer for visual weight).
 *    All text uses white on the dark footer, so contrast is guaranteed
 *    regardless of the page theme mode.
 *  - Uses hardcoded dark palette intentionally — this is a design choice,
 *    not a bug. The footer is the visual anchor at the bottom of every page. */

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

/**
 * Footer link taxonomy — enterprise-first ordering.
 *
 * SERVICES column: reordered to lead with the engineering + AI work
 * the Hero positions us for ("AI & Automation" → "Custom Software" →
 * "Cloud & DevOps"), then the supporting practices. "Digital Marketing"
 * drops to the bottom — it's still a real revenue line but no longer
 * the first thing a visitor scrolling the footer sees, which would
 * undermine the "Engineering Tomorrow's Intelligence" headline at the
 * top of the page.
 *
 * SOLUTIONS column: reframed to audience-segment language that reads
 * as enterprise-ready rather than small-business-legacy. Routes are
 * unchanged (so existing pages keep working), but labels are renamed:
 *   "For Local Businesses"  →  "Multi-Location Brands"
 *   "For Repair Shops"     →  "Field Service & Logistics"
 *   "For UK Businesses"     →  "UK & EMEA Enterprise"
 *   "For Startups"          →  "Startups & Scale-ups"
 *   "For E-commerce Brands" →  "E-commerce & Retail"
 * Added "Agency Partnerships" (route already exists per SOLUTIONS list).
 */
const FOOTER_LINKS = {
  services: [
    { label: "AI & Automation", href: "/services" },
    { label: "Custom Software", href: "/services" },
    { label: "Cloud & DevOps", href: "/services" },
    { label: "Web & Mobile", href: "/services" },
    { label: "Growth Systems", href: "/services" },
  ],
  solutions: [
    { label: "Startups & Scale-ups", href: "/solutions/startups" },
    { label: "Multi-Location Brands", href: "/solutions/local-businesses" },
    { label: "E-commerce & Retail", href: "/solutions/ecommerce-brands" },
    { label: "Field Service & Logistics", href: "/solutions/repair-shops" },
    { label: "UK & EMEA Enterprise", href: "/solutions/uk-businesses" },
    { label: "Agency Partnerships", href: "/solutions/agencies" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "Cities We Serve", href: "/cities" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Team", href: "/team" },
    { label: "Legal", href: "/legal" },
  ],
};

export function NxFooter() {
  return (
    <footer className="relative bg-[#0A0612] text-white overflow-hidden">
      {/* Top decorative gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF53A9]/50 to-transparent" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 nx-dot-grid opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-16 sm:py-20">
          {/* CTA strip — high-visibility conversion band ABOVE the footer
              link grid. Placed here per UX audit: users who scroll to the
              bottom of any page have signaled intent, but the previous footer
              had no CTA — only passive links. This band captures that intent
              with a single, prominent offer.
              Uses brand gradient for max visibility in both light + dark modes. */}
          <div className="mb-12 rounded-2xl p-6 sm:p-8 nx-brand-gradient flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Ready to start your project?
              </h3>
              <p className="mt-1 text-sm sm:text-base text-white/90">
                Free 30-minute consultation. No commitment, no sales pitch.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0A0612] font-bold text-sm hover:bg-white/90 transition shadow-lg shrink-0"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Main grid */}
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo — v5: sharper container + perfect baseline alignment with header */}
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl nx-brand-gradient font-black text-white text-lg leading-none shadow-[0_0_20px_rgba(255,83,169,0.3),0_0_40px_rgba(19,109,255,0.15)] ring-1 ring-white/10">
                C
              </div>
              <span className="text-xl font-black tracking-tight nx-text-brand-grad leading-none">
                ClickTake
              </span>
            </div>

            {/* Tagline — enterprise-aligned per brand-positioning audit.
                Previously: "Full-stack digital agency shipping AI-powered
                websites, SaaS platforms, mobile apps and growth systems…"
                Conflicted with the Hero's "Engineering Tomorrow's Intelligence"
                enterprise/AI-agent positioning. Now uses engineering-first
                language, and pulls live values from `METRICS` so the
                project count stays consistent with the StatsBar above. */}
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-sm">
              AI-native software engineering firm shipping production-grade
              autonomous agents, multi-tenant SaaS platforms and cloud
              architecture for enterprises across{" "}
              <strong className="font-semibold text-white">
                {METRICS.CONTINENTS_SERVED} continents
              </strong>
              .{" "}
              {metricFormatters.plus(METRICS.PROJECTS_SHIPPED)} production
              deployments shipped since {METRICS.FOUNDED_YEAR}.
            </p>

            {/* Socials — v5: 44px touch targets with 12px gap (WCAG 2.5.5) */}
            <div className="mt-6 flex flex-wrap gap-3">
              {SITE.socials.slice(0, 4).map((s) => {
                const Icon = SOCIAL_ICONS[s.icon] ?? ArrowUpRight;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-[#FF53A9] hover:text-white hover:border-[#FF53A9] hover:scale-110 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-2">
            <h4 className="nx-eyebrow text-white/40 mb-4">Services</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-[#FF8AC4] transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="nx-eyebrow text-white/40 mb-4">Solutions</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.solutions.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-[#FF8AC4] transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="nx-eyebrow text-white/40 mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-[#FF8AC4] transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="nx-eyebrow text-white/40 mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-3 text-sm text-white/70 hover:text-white transition"
                >
                  <Mail className="h-4 w-4 text-[#FF8AC4] mt-0.5 shrink-0" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              {SITE.phones.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="group flex items-start gap-3 text-sm text-white/70 hover:text-white transition"
                  >
                    <Phone className="h-4 w-4 text-[#FF8AC4] mt-0.5 shrink-0" />
                    <span>
                      <span className="block text-xs text-white/40">{p.label}</span>
                      {p.value}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-[#FF8AC4] mt-0.5 shrink-0" />
                  <span>
                    {SITE.locations.map((l) => (
                      <span key={l.city} className="block text-xs">
                        {l.flag} {l.city}, {l.country}
                      </span>
                    ))}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — v5: bumped text to /70 for AA on dark footer */}
        <div className="mt-14 pt-8 border-t border-[#FF53A9]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/70 text-center sm:text-left">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            <span className="hidden sm:inline"> · Built in-house with Next.js + Supabase.</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-white/70">
            <Link href="/legal/privacy" className="hover:text-[#FF8AC4] transition">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-[#FF8AC4] transition">Terms</Link>
            <Link href="/legal/cookies" className="hover:text-[#FF8AC4] transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
