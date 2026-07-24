'use client'

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowUpRight, ChevronDown, ChevronRight, Phone, Sparkles,
  Brain, Bot, Wand2, Eye, Workflow,
  Server, Layers, Shield, Cloud, Layout, ShoppingCart, Code2, Wrench, RefreshCw, Globe,
  Megaphone, PenTool, TrendingUp, Search, Share2,
  Palette, Video,
  Building2, Store, ShoppingBag, Wrench as WrenchIcon, Globe as GlobeIcon, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NAV_LINKS, SERVICES, STARTER_KIT, CATEGORY_STYLES, SOLUTIONS, type ServiceItem } from "@/lib/site-data";
import { ThemeToggle } from "./theme-toggle";

/* ───────────────── ICON MAPS ───────────────── */
/* Maps the `icon_name` field from SERVICES[] to actual lucide components so the
   mega menu can render a real icon next to each service entry. Centralized
   here (and in services-page.tsx) so the two stay in sync. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Brain, Bot, Wand2, Eye, Workflow,
  Server, Layers, Shield, Cloud, Layout, ShoppingCart, Code2, Wrench, RefreshCw, Globe,
  Megaphone, PenTool, TrendingUp, Search, Share2,
  Palette, Video,
  Rocket: Sparkles,
  Sparkles,
};

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  startups: Building2,
  "local-businesses": Store,
  "ecommerce-brands": ShoppingBag,
  "repair-shops": WrenchIcon,
  "uk-businesses": GlobeIcon,
  agencies: Users,
};

/* Map solution slug → brand accent gradient for the icon chip */
const SOLUTION_ACCENTS: Record<string, { chip: string; text: string }> = {
  startups:          { chip: "from-amber-500 to-brand-pink",        text: "text-amber-400" },
  "local-businesses":{ chip: "from-emerald-500 to-teal-600",       text: "text-emerald-400" },
  "ecommerce-brands":{ chip: "from-brand-cyan to-brand-blue",       text: "text-brand-cyan" },
  "repair-shops":    { chip: "from-brand-magenta to-brand-blue",    text: "text-brand-magenta" },
  "uk-businesses":   { chip: "from-brand-blue to-brand-cyan",       text: "text-brand-blue" },
  agencies:          { chip: "from-brand-pink to-brand-magenta",    text: "text-brand-pink" },
};

/* ───────────────── CATEGORY DISPLAY CONFIG ───────────────── */
const CATEGORY_DISPLAY: Record<string, { group: string; accentColor: string }> = {
  ai:           { group: "AI & Machine Learning", accentColor: "text-brand-magenta" },
  web:          { group: "Web Development",       accentColor: "text-brand-cyan" },
  marketing:    { group: "Digital Marketing",     accentColor: "text-emerald-400" },
  creative:     { group: "Creative Services",     accentColor: "text-brand-pink" },
};

type NavLink = { label: string; href: string; mega?: boolean };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // megaOpen now tracks WHICH mega menu is open ("services" | "solutions" | null)
  // instead of just a boolean — so hovering from Services directly to Solutions
  // properly swaps the content rather than briefly showing nothing.
  const [megaOpen, setMegaOpen] = useState<"services" | "solutions" | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const megaTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // rAF-throttled scroll listener — without this, `scroll` fires hundreds of
    // times per second during a single wheel swipe, each one calling setState
    // and triggering a Navbar re-render. The rAF coalesces them to one update
    // per frame, which is the maximum useful rate anyway.
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setScrolled(window.scrollY > 20);
      });
    };
    // passive: true — tells the browser we won't preventDefault, so it can
    // scroll on the compositor thread without waiting for our handler.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Close mobile menu + mega menu on route change
  useEffect(() => {
    setOpen(false);
    setMegaOpen(null);
    setExpandedCategory(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open — uses position:fixed trick
  // to prevent iOS Safari rubber-band scroll bleed.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      // Restore scroll position (position:fixed resets it)
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /* ── Group services by category (excluding starter-kit) ── */
  const serviceGroups = useMemo(() => {
    const map = new Map<string, ServiceItem[]>();
    for (const s of SERVICES) {
      if (s.category === "starter-kit") continue;
      const g = map.get(s.category);
      if (g) g.push(s);
      else map.set(s.category, [s]);
    }
    return map;
  }, []);

  // Track whether the user's pointer is actually inside the mega-menu trigger
  // container. We use this to keep the menu open when moving the pointer from
  // the trigger down into the menu (which would otherwise fire onMouseLeave on
  // the trigger and close the menu mid-transit).
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = (which: "services" | "solutions") => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(which);
  };
  const closeMegaSoon = () => {
    // Delay close by 120ms — gives the pointer time to cross the gap between
    // the trigger and the menu panel without the menu flickering closed.
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(null), 120);
  };
  useEffect(() => () => { if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current); }, []);

  // Keyboard accessibility: Escape closes any open mega menu + blurs focus
  // back to the trigger. Click-outside also closes. This matters for screen
  // reader + keyboard-only users who can't hover.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(null);
        megaTriggerRef.current?.querySelector("a")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!megaTriggerRef.current?.contains(e.target as Node)) {
        setMegaOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const handleSectionClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      // In-page anchor — works only on home
      if (pathname !== "/") {
        window.location.href = "/" + href;
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        {/* will-change: transform promotes this container to its own GPU layer.
            Without this, the .glass backdrop-filter has to re-sample the
            scrolling content underneath on every frame — the #1 cause of
            scroll jank on this site. With its own layer, the compositor can
            scroll the page content and the blurred navbar independently. */}
        <div
          className="flex items-center justify-between rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 transition-all duration-500 glass"
          style={{ willChange: "transform" }}
        >
          {/* Logo — real ClickTake logo (200×200 transparent PNG) */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 min-w-0" aria-label="ClickTake Technologies — Home">
            {/* Next.js Image would over-optimize the brand mark; use plain img with explicit size to avoid CLS */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clicktake-logo.webp"
              alt="ClickTake Technologies"
              width={40}
              height={40}
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain drop-shadow-[0_2px_8px_rgba(19,109,255,0.35)] group-hover:scale-105 transition-transform duration-300 shrink-0"
            />
            <div className="flex flex-col leading-none min-w-0">
              <span className="text-sm sm:text-base font-bold tracking-tight truncate">ClickTake</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Technologies</span>
            </div>
          </Link>

          {/* Desktop nav — visible on lg+, but link density adapts to viewport */}
          <nav className="hidden lg:flex items-center gap-0.5 rounded-full border ct-divider ct-surface px-1.5 py-1.5 backdrop-blur-xl whitespace-nowrap max-w-[58vw] xl:max-w-none overflow-hidden">
            {NAV_LINKS.map((l: NavLink) => {
              const isAnchor = l.href.startsWith("#") || l.href.includes("#");
              const isMega = !!l.mega;

              // Secondary anchors (Process / Testimonials) only show on xl+
              const isSecondaryAnchor = l.href === "/#process" || l.href === "/#testimonials";
              if (isSecondaryAnchor) {
                return (
                  <span key={l.href} className="hidden xl:contents">
                    <Link
                      href={l.href}
                      onClick={() => handleSectionClick(l.href)}
                      className="group relative rounded-full px-3 xl:px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition whitespace-nowrap"
                    >
                      {l.label}
                      <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-magenta transition-all group-hover:w-8" />
                    </Link>
                  </span>
                );
              }

              if (isMega) {
                const isSolutions = l.href === "/solutions";
                const which = isSolutions ? "solutions" : "services";
                const isThisOpen = megaOpen === which;
                return (
                  <div
                    key={l.href}
                    ref={megaTriggerRef}
                    className="relative"
                    onMouseEnter={() => openMega(which)}
                    onMouseLeave={closeMegaSoon}
                  >
                    <Link
                      href={l.href}
                      aria-expanded={isThisOpen}
                      aria-haspopup="true"
                      onClick={(e) => {
                        // Click toggles the menu on touch devices (where hover
                        // doesn't exist). On desktop, allow normal nav to /services
                        // or /solutions index page unless the menu is closed —
                        // in which case preventDefault so the menu opens first.
                        if (!isThisOpen) {
                          e.preventDefault();
                          openMega(which);
                        } else {
                          setMegaOpen(null);
                        }
                      }}
                      className="group relative rounded-full px-3 xl:px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition whitespace-nowrap flex items-center"
                    >
                      {l.label}
                      <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-magenta transition-all group-hover:w-8" />
                      <ChevronDown className={`ml-1 inline h-4 w-4 transition-transform ${isThisOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* MEGA MENU — only renders the panel matching the open menu */}
                    <AnimatePresence>
                      {isThisOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
                          onMouseEnter={() => openMega(which)}
                          onMouseLeave={closeMegaSoon}
                          role="menu"
                          aria-label={`${l.label} menu`}
                        >
                          {isSolutions ? (
                            /* ─── SOLUTIONS MEGA MENU ───
                               Two-column grid with brand-tinted icon chips per
                               solution. Each row is a hover-able Link with title +
                               audience subtitle. Footer CTA links to the index page. */
                            <div className="w-[min(760px,calc(100vw-2rem))] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5">
                              <div className="mb-3 flex items-center justify-between px-1">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">
                                  Solutions by audience
                                </div>
                                <div className="text-[10px] text-muted-foreground">
                                  {SOLUTIONS.length} tailored offers
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                {SOLUTIONS.map((sol) => {
                                  const Icon = SOLUTION_ICONS[sol.slug] || Sparkles;
                                  const accent = SOLUTION_ACCENTS[sol.slug] || { chip: "from-brand-blue to-brand-cyan", text: "text-brand-blue" };
                                  return (
                                    <Link
                                      key={sol.slug}
                                      href={`/solutions/${sol.slug}`}
                                      onClick={() => setMegaOpen(null)}
                                      className="group/sol flex items-start gap-3 rounded-xl px-2.5 py-2.5 hover:bg-secondary transition"
                                    >
                                      <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${accent.chip} text-white shadow-sm group-hover/sol:scale-110 transition-transform`}>
                                        <Icon className="h-4 w-4" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold leading-snug text-foreground/95 group-hover/sol:text-foreground">
                                          {sol.title}
                                        </div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
                                          {sol.hero}
                                        </div>
                                      </div>
                                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover/sol:opacity-100 transition-opacity shrink-0 mt-1" />
                                    </Link>
                                  );
                                })}
                              </div>
                              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between px-1">
                                <span className="text-[11px] text-muted-foreground">
                                  Not sure? Get a free 30-min scoping call.
                                </span>
                                <Link
                                  href="/solutions"
                                  onClick={() => setMegaOpen(null)}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                                >
                                  View all solutions <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          ) : (
                            /* ─── SERVICES MEGA MENU ───
                               4-column grid grouped by category (AI / Web / Marketing /
                               Creative), each item with a brand-tinted icon. Bottom CTA
                               row links to the Starter Kit flagship offering. */
                            <div className="w-[min(960px,calc(100vw-2rem))] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5">
                              <div className="mb-3 flex items-center justify-between px-1">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">
                                  Services by category
                                </div>
                                <div className="text-[10px] text-muted-foreground">
                                  {SERVICES.length - (STARTER_KIT ? 1 : 0)} services · 4 categories
                                </div>
                              </div>
                              {/* 4-column grid → collapses to 2 columns on smaller laptop screens */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
                                {Array.from(serviceGroups.entries()).map(([cat, items]) => {
                                  const cfg = CATEGORY_DISPLAY[cat];
                                  if (!cfg) return null;
                                  return (
                                    <div key={cat} className="min-w-0">
                                      <div className={`mb-2 text-[10px] font-bold uppercase tracking-widest ${cfg.accentColor} px-1`}>
                                        {cfg.group}
                                      </div>
                                      <div className="space-y-0.5">
                                        {items.map((item) => {
                                          const Icon = SERVICE_ICONS[item.icon_name] || Sparkles;
                                          return (
                                            <Link
                                              key={item.slug}
                                              href={`/services/${item.slug}`}
                                              className="group/item flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary transition"
                                              onClick={() => setMegaOpen(null)}
                                            >
                                              <Icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${cfg.accentColor} opacity-70 group-hover/item:opacity-100`} />
                                              <div className="min-w-0 flex-1">
                                                <div className="text-[12px] font-semibold leading-snug text-foreground/90 group-hover/item:text-foreground line-clamp-1">
                                                  {item.title}
                                                </div>
                                                <div className="text-[10.5px] text-muted-foreground mt-0.5 leading-tight line-clamp-1">
                                                  {item.description}
                                                </div>
                                              </div>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Flagship CTA — Starter Kit */}
                              {STARTER_KIT && (
                                <Link
                                  href="/services/starter-kit"
                                  onClick={() => setMegaOpen(null)}
                                  className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-brand-pink/15 border border-amber-500/30 p-3 sm:p-3.5 hover:from-amber-500/25 hover:to-brand-pink/25 transition group/flagship"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-500 to-brand-pink text-white shadow-sm group-hover/flagship:scale-110 transition-transform">
                                      <Sparkles className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 text-sm font-bold flex-wrap">
                                        <span className="truncate">{STARTER_KIT.title}</span>
                                        <span className="text-[10px] rounded-full bg-gradient-to-r from-amber-500 to-brand-pink px-2 py-0.5 text-white shrink-0 font-bold uppercase tracking-wider">
                                          Flagship
                                        </span>
                                      </div>
                                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                                        {STARTER_KIT.description}
                                      </div>
                                    </div>
                                  </div>
                                  <ArrowUpRight className="h-4 w-4 text-amber-400 shrink-0 group-hover/flagship:translate-x-0.5 group-hover/flagship:-translate-y-0.5 transition-transform" />
                                </Link>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (isAnchor) {
                return (
                  <button
                    key={l.label}
                    onClick={() => handleSectionClick(l.href.includes("#") ? "#" + l.href.split("#")[1] : l.href)}
                    className="group relative rounded-full px-3 xl:px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition whitespace-nowrap"
                  >
                    {l.label}
                    <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-magenta transition-all group-hover:w-8" />
                  </button>
                );
              }

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative rounded-full px-3 xl:px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition whitespace-nowrap"
                >
                  {l.label}
                  <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-magenta transition-all group-hover:w-8" />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <a
              href="tel:+447391653377"
              className="hidden 2xl:inline-flex items-center gap-2 rounded-full border ct-divider ct-surface px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
            >
              <Phone className="h-4 w-4" />
              +44 7391 653377
            </a>
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full gradient-bg px-4 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-sm font-semibold text-white shadow-lg hover:scale-[1.03] transition"
            >
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border ct-divider bg-card/80 lg:hidden shrink-0"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — full-screen overlay with scroll */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
              {/* Full-height slide-down panel — fills viewport below the header bar.
                  Uses dynamic viewport height (100dvh) so mobile browser chrome
                  (address bar) doesn't cause overflow on iOS Safari. */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed left-0 right-0 top-[64px] sm:top-[72px] bottom-0 z-50 lg:hidden flex flex-col"
              >
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain glass-strong border-t border-border mx-2 mb-2 rounded-2xl">
                  <div className="p-3 space-y-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-xl ct-hover font-semibold text-base"
                    >
                      Home
                    </Link>

                    {/* Services — accordion-style, collapsed by default to save space */}
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === "__services" ? null : "__services")}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl ct-hover font-semibold text-base"
                    >
                      <span>Services</span>
                      <ChevronDown className={`h-5 w-5 transition-transform ${expandedCategory === "__services" ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {expandedCategory === "__services" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-3 pr-1 pb-2 space-y-3">
                            {Array.from(serviceGroups.entries()).map(([cat, items]) => {
                              const cfg = CATEGORY_DISPLAY[cat];
                              if (!cfg) return null;
                              return (
                                <div key={cat}>
                                  <div className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${cfg.accentColor}`}>
                                    {cfg.group}
                                  </div>
                                  {items.map((item) => (
                                    <Link
                                      key={item.slug}
                                      href={`/services/${item.slug}`}
                                      onClick={() => setOpen(false)}
                                      className="flex items-start gap-2 px-3 py-2 rounded-lg ct-hover text-sm leading-tight"
                                    >
                                      <ChevronRight className="h-3 w-3 mt-1 shrink-0 text-muted-foreground" />
                                      <div className="min-w-0 flex-1">
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{item.description}</div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {STARTER_KIT && (
                      <Link
                        href="/services/starter-kit"
                        onClick={() => setOpen(false)}
                        className="mt-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-brand-pink/15 border border-amber-500/30 text-sm font-semibold"
                      >
                        <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                        <span className="truncate flex-1">{STARTER_KIT.title}</span>
                        <span className="text-[10px] rounded-full bg-gradient-to-r from-amber-500 to-brand-pink px-2 py-0.5 text-white shrink-0">
                          FLAGSHIP
                        </span>
                      </Link>
                    )}

                    <div className="border-t border-border mt-2 pt-2 space-y-0.5">
                      <Link href="/solutions" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Solutions</Link>
                      <Link href="/portfolio" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Work</Link>
                      <Link href="/case-studies" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Case Studies</Link>
                      <Link href="/pricing" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Pricing</Link>
                      <Link href="/blog" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Blog</Link>
                      <Link href="/resources" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Resources</Link>
                      <Link href="/about" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">About</Link>
                      <Link href="/team" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Team</Link>
                      <Link href="/careers" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Careers</Link>
                      <Link href="/contact" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl ct-hover text-base">Contact</Link>
                    </div>

                    {/* Mobile contact block */}
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <a
                        href="tel:+447391653377"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border ct-divider ct-surface text-sm"
                      >
                        <Phone className="h-4 w-4 text-brand-blue shrink-0" />
                        <span className="truncate">+44 7391 653377 (UK)</span>
                      </a>
                      <a
                        href="tel:+923069753003"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border ct-divider ct-surface text-sm"
                      >
                        <Phone className="h-4 w-4 text-brand-pink shrink-0" />
                        <span className="truncate">+92 306 9753003 (PK)</span>
                      </a>
                    </div>

                    <div className="mt-2 flex items-center justify-between rounded-xl border ct-divider ct-surface px-4 py-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Theme</span>
                      <ThemeToggle />
                    </div>

                    <a
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="mt-2 flex items-center justify-center gap-2 rounded-full gradient-bg py-3.5 font-semibold text-white text-base"
                    >
                      Book a Call <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
