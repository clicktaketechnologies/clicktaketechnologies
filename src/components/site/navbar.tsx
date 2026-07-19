'use client'

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, Phone, Sparkles } from "lucide-react";
import { NAV_LINKS, SERVICES, STARTER_KIT, CATEGORY_STYLES, type ServiceItem } from "@/lib/site-data";
import { ThemeToggle } from "./theme-toggle";

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
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 glass">
          {/* Logo — real ClickTake logo (200×200 transparent PNG) */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="ClickTake Technologies — Home">
            {/* Next.js Image would over-optimize the brand mark; use plain img with explicit size to avoid CLS */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clicktake-logo.png"
              alt="ClickTake Technologies"
              width={44}
              height={44}
              className="h-11 w-11 object-contain drop-shadow-[0_2px_8px_rgba(19,109,255,0.35)] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight">ClickTake</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Technologies</span>
            </div>
          </Link>

          {/* Desktop nav — visible on lg+, but link density adapts to viewport */}
          <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5 backdrop-blur-xl whitespace-nowrap max-w-[62vw] xl:max-w-none overflow-hidden">
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
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      href={l.href}
                      className="group relative rounded-full px-3 xl:px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition whitespace-nowrap flex items-center"
                    >
                      {l.label}
                      <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-magenta transition-all group-hover:w-8" />
                      <ChevronDown className={`ml-1 inline h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* MEGA MENU — responsive 4-column grid */}
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
                        >
                          <div className="w-[min(920px,calc(100vw-2rem))] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6">
                            {/* 4-column grid → collapses to 2 columns on smaller laptop screens */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                              {Array.from(serviceGroups.entries()).map(([cat, items]) => {
                                const cfg = CATEGORY_DISPLAY[cat];
                                if (!cfg) return null;
                                return (
                                  <div key={cat} className="min-w-0">
                                    <div className={`mb-2.5 text-[10px] font-bold uppercase tracking-widest ${cfg.accentColor} px-1`}>
                                      {cfg.group}
                                    </div>
                                    <div className="space-y-0.5">
                                      {items.map((item) => (
                                        <Link
                                          key={item.slug}
                                          href={`/services/${item.slug}`}
                                          className="group/item block rounded-lg px-2.5 py-1.5 hover:bg-secondary transition"
                                          onClick={() => setMegaOpen(false)}
                                        >
                                          <div className="text-[13px] font-semibold leading-snug group-hover/item:text-foreground text-foreground/90 line-clamp-2">
                                            {item.title}
                                          </div>
                                          <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
                                            {item.description}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Flagship CTA */}
                            {STARTER_KIT && (
                              <Link
                                href="/services/starter-kit"
                                onClick={() => setMegaOpen(false)}
                                className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-brand-pink/15 border border-amber-500/30 p-3 sm:p-4 hover:from-amber-500/25 hover:to-brand-pink/25 transition"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 text-sm font-bold flex-wrap">
                                    <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                                    <span className="truncate">{STARTER_KIT.title}</span>
                                    <span className="text-[10px] rounded-full bg-gradient-to-r from-amber-500 to-brand-pink px-2 py-0.5 text-white shrink-0">
                                      FLAGSHIP
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                    {STARTER_KIT.description}
                                  </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-amber-400 shrink-0" />
                              </Link>
                            )}
                          </div>
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
            <ThemeToggle />
            <a
              href="tel:+447391653377"
              className="hidden 2xl:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
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
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-card/80 lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 rounded-2xl glass-strong p-3 lg:hidden max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <Link href="/" className="block px-4 py-3 rounded-xl hover:bg-white/5 font-semibold text-sm">
                Home
              </Link>

              {/* Mobile: services grouped by category — accordion-style */}
              {Array.from(serviceGroups.entries()).map(([cat, items]) => {
                const cfg = CATEGORY_DISPLAY[cat];
                if (!cfg) return null;
                return (
                  <div key={cat} className="mt-2">
                    <div className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${cfg.accentColor}`}>
                      {cfg.group}
                    </div>
                    {items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/services/${item.slug}`}
                        className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm leading-tight"
                      >
                        <div className="font-medium">{item.title}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                );
              })}

              {STARTER_KIT && (
                <Link
                  href="/services/starter-kit"
                  className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-brand-pink/15 border border-amber-500/30 text-sm font-semibold"
                >
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="truncate flex-1">{STARTER_KIT.title}</span>
                  <span className="text-[10px] rounded-full bg-gradient-to-r from-amber-500 to-brand-pink px-2 py-0.5 text-white shrink-0">
                    FLAGSHIP
                  </span>
                </Link>
              )}

              <div className="border-t border-border mt-3 pt-3 space-y-0.5">
                <Link href="/portfolio" className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm">Work</Link>
                <Link href="/resources" className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm">Resources</Link>
                <Link href="/about" className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm">About</Link>
                <Link href="/contact" className="block px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm">Contact</Link>
              </div>

              {/* Mobile contact block */}
              <div className="mt-3 grid grid-cols-1 gap-2">
                <a
                  href="tel:+447391653377"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-sm"
                >
                  <Phone className="h-4 w-4 text-brand-blue" />
                  +44 7391 653377 (UK)
                </a>
                <a
                  href="tel:+923069753003"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-sm"
                >
                  <Phone className="h-4 w-4 text-brand-pink" />
                  +92 306 9753003 (PK)
                </a>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>

              <a
                href="/contact"
                className="mt-3 flex items-center justify-center gap-2 rounded-full gradient-bg py-3 font-semibold text-white text-sm"
              >
                Book a Call <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
