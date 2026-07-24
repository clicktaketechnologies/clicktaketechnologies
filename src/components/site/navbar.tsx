'use client'

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, ChevronRight, Phone, Sparkles } from "lucide-react";
import { NAV_LINKS, SERVICES, STARTER_KIT, CATEGORY_STYLES, SOLUTIONS, type ServiceItem } from "@/lib/site-data";
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
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
        <div className="flex items-center justify-between rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 transition-all duration-500 glass">
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
          <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-1.5 backdrop-blur-xl whitespace-nowrap max-w-[58vw] xl:max-w-none overflow-hidden">
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

                    {/* MEGA MENU */}
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50"
                        >
                          {isSolutions ? (
                            /* ─── SOLUTIONS MEGA MENU ─── */
                            <div className="w-[min(720px,calc(100vw-2rem))] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6">
                              <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-brand-blue px-1">
                                Solutions by audience
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {SOLUTIONS.map((sol) => (
                                  <Link
                                    key={sol.slug}
                                    href={`/solutions/${sol.slug}`}
                                    onClick={() => setMegaOpen(false)}
                                    className="group/sol block rounded-lg px-3 py-2 hover:bg-secondary transition"
                                  >
                                    <div className="text-[13px] font-semibold leading-snug group-hover/sol:text-foreground text-foreground/90">
                                      {sol.title}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight line-clamp-2">
                                      {sol.hero}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="mt-4 pt-4 border-t border-border">
                                <Link
                                  href="/solutions"
                                  onClick={() => setMegaOpen(false)}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                                >
                                  View all solutions <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          ) : (
                            /* ─── SERVICES MEGA MENU ─── */
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
              className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/10 bg-card/80 lg:hidden shrink-0"
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
                      className="block px-4 py-3 rounded-xl hover:bg-white/5 font-semibold text-base"
                    >
                      Home
                    </Link>

                    {/* Services — accordion-style, collapsed by default to save space */}
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === "__services" ? null : "__services")}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 font-semibold text-base"
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
                                      className="flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm leading-tight"
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
                      <Link href="/solutions" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Solutions</Link>
                      <Link href="/portfolio" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Work</Link>
                      <Link href="/case-studies" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Case Studies</Link>
                      <Link href="/pricing" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Pricing</Link>
                      <Link href="/blog" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Blog</Link>
                      <Link href="/resources" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Resources</Link>
                      <Link href="/about" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">About</Link>
                      <Link href="/team" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Team</Link>
                      <Link href="/careers" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Careers</Link>
                      <Link href="/contact" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-white/5 text-base">Contact</Link>
                    </div>

                    {/* Mobile contact block */}
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <a
                        href="tel:+447391653377"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-sm"
                      >
                        <Phone className="h-4 w-4 text-brand-blue shrink-0" />
                        <span className="truncate">+44 7391 653377 (UK)</span>
                      </a>
                      <a
                        href="tel:+923069753003"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-sm"
                      >
                        <Phone className="h-4 w-4 text-brand-pink shrink-0" />
                        <span className="truncate">+92 306 9753003 (PK)</span>
                      </a>
                    </div>

                    <div className="mt-2 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
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
