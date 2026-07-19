'use client'

import Link from "next/link";
import { Mail, Phone, Globe, ArrowUpRight } from "lucide-react";
import { SITE, NAV_LINKS, SERVICE_CATEGORIES } from "@/lib/site-data";
import { SocialIcons } from "./social-icons";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-card/30 backdrop-blur-xl">
      {/* Top accent line */}
      <div className="h-px gradient-bg opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/clicktake-logo.png"
                  alt="ClickTake Technologies"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#136DFF]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight">ClickTake</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
              An AI-powered digital agency engineering websites, SaaS platforms, mobile apps and
              growth systems for ambitious brands across the UK, Pakistan, USA and Dubai.
            </p>

            <div className="mt-6 space-y-2">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <Mail className="h-4 w-4 text-[#136DFF]" />
                {SITE.email}
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {SITE.phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    <Phone className="h-4 w-4 text-[#FF53A9]" />
                    <span>{p.value}</span>
                    <span className="text-[10px] uppercase tracking-widest">({p.label})</span>
                  </a>
                ))}
              </div>
              <a
                href={SITE.url}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                <Globe className="h-4 w-4 text-[#136DFF]" />
                {SITE.domain}
              </a>
            </div>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Follow us
              </div>
              <SocialIcons />
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICE_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.tagline}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Our offices
            </h4>
            <ul className="mt-4 space-y-3">
              {SITE.locations.map((l) => (
                <li
                  key={l.country}
                  className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="text-sm font-bold">
                    {l.flag} {l.city}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {l.country} · {l.coords}
                  </div>
                  <div className="text-[11px] text-muted-foreground/80 mt-1 leading-relaxed">
                    {l.note}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ClickTake Technologies. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link href="/legal/privacy" className="hover:text-foreground transition">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-foreground transition">Terms of Service</Link>
            <Link href="/legal/cookies" className="hover:text-foreground transition">Cookie Policy</Link>
            <a
              href={SITE.url}
              className="inline-flex items-center gap-1 hover:text-foreground transition"
            >
              www.clicktaketech.com <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
