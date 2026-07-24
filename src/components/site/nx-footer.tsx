'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site-data";

/* NEW FOOTER — dark navy multi-column (Itransition + Index.dev pattern).
 * Columns: Brand+blurb+socials | Services | Solutions | Company | Contact.
 * Bottom bar: copyright + legal links. Sits on deep navy with hairline borders. */

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const FOOTER_LINKS = {
  services: [
    { label: "Digital Marketing", href: "/services" },
    { label: "Web & Software", href: "/services" },
    { label: "AI & Automation", href: "/services" },
    { label: "Creative & Brand", href: "/services" },
    { label: "Business Essentials", href: "/services" },
  ],
  solutions: [
    { label: "For Startups", href: "/solutions/startups" },
    { label: "For Local Businesses", href: "/solutions/local-businesses" },
    { label: "For E-commerce Brands", href: "/solutions/ecommerce-brands" },
    { label: "For Repair Shops", href: "/solutions/repair-shops" },
    { label: "For UK Businesses", href: "/solutions/uk-businesses" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
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
    <footer className="relative bg-[#0A1124] text-white overflow-hidden">
      {/* Top decorative gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 nx-dot-grid opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 py-16 sm:py-20">
        {/* Main grid */}
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg nx-orange-gradient grid place-items-center font-black text-white">
                C
              </div>
              <span className="text-xl font-black tracking-tight">
                ClickTake
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-sm">
              Full-stack digital agency shipping AI-powered websites, SaaS
              platforms, mobile apps and growth systems for ambitious brands
              across the UK, Pakistan, USA &amp; Dubai. 120+ projects delivered
              since {SITE.founded}.
            </p>

            {/* Socials */}
            <div className="mt-6 flex flex-wrap gap-2">
              {SITE.socials.slice(0, 4).map((s) => {
                const Icon = SOCIAL_ICONS[s.icon] ?? ArrowUpRight;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition"
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
                    className="text-sm text-white/70 hover:text-[#FF8A5C] transition"
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
                    className="text-sm text-white/70 hover:text-[#FF8A5C] transition"
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
                    className="text-sm text-white/70 hover:text-[#FF8A5C] transition"
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
                  <Mail className="h-4 w-4 text-[#FF8A5C] mt-0.5 shrink-0" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              {SITE.phones.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    className="group flex items-start gap-3 text-sm text-white/70 hover:text-white transition"
                  >
                    <Phone className="h-4 w-4 text-[#FF8A5C] mt-0.5 shrink-0" />
                    <span>
                      <span className="block text-xs text-white/40">{p.label}</span>
                      {p.value}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-[#FF8A5C] mt-0.5 shrink-0" />
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

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            <span className="hidden sm:inline"> · Built in-house with Next.js + Supabase.</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-white/50">
            <Link href="/legal" className="hover:text-white transition">Privacy</Link>
            <Link href="/legal" className="hover:text-white transition">Terms</Link>
            <Link href="/legal" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
