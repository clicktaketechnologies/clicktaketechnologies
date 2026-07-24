'use client'

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, SERVICES, SOLUTIONS } from "@/lib/site-data";

/* NEW NAVBAR — sticky translucent dark bar (Index.dev + Vention pattern).
 * Logo left · nav center · CTAs right. Sticky on scroll with blur backdrop.
 * Mobile: hamburger → full-screen drawer. Mega menus for Services + Solutions.
 *
 * NOTE: This navbar is designed for the new homepage (nx-* components).
 * It renders as a dark bar over the navy hero. When used on light pages,
 * it adapts via .glass-strong. */

type MegaKey = "services" | "solutions" | "resources" | null;

export function NxNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  /* Scroll listener — toggle blur on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile drawer on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMega(null);
  }, [pathname]);

  /* Click outside to close mega */
  useEffect(() => {
    if (!mega) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMega(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mega]);

  /* Escape key closes everything */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Determine if we're on the homepage (hero is dark) — affects initial styling */
  const isHome = pathname === "/";

  /* Group services by category for the mega menu */
  const servicesByCat = (cat: string) => SERVICES.filter((s) => s.category === cat).slice(0, 6);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-[#0A0612]/85 backdrop-blur-xl border-b border-[#FF53A9]/15"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="ClickTake home">
              <div className="h-9 w-9 rounded-lg nx-brand-gradient grid place-items-center font-black text-white text-sm shadow-[0_0_20px_rgba(255,83,169,0.3),0_0_40px_rgba(19,109,255,0.15)]">
                C
              </div>
              <span className="text-lg font-black tracking-tight text-white hidden sm:block nx-text-brand-grad">
                ClickTake
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const hasMega = "mega" in link && link.mega === true;
                const megaKey = link.label.toLowerCase() as MegaKey;
                const isActive = mega === megaKey;
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => hasMega && setMega(megaKey)}
                    onMouseLeave={() => hasMega && setMega(null)}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (hasMega) {
                          e.preventDefault();
                          setMega(isActive ? null : megaKey);
                        }
                      }}
                      aria-expanded={hasMega ? isActive : undefined}
                      aria-haspopup={hasMega ? "true" : undefined}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition relative ${
                        isActive || pathname.startsWith(link.href)
                          ? "text-white bg-white/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      {hasMega && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${isActive ? "rotate-180" : ""}`}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/contact"
                className="text-sm font-semibold text-white/70 hover:text-white transition px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 nx-btn-orange px-5 py-2.5 text-sm"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5 nx-arrow" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-10 w-10 grid place-items-center text-white"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mega menu panel (desktop) */}
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setMega(mega)}
                onMouseLeave={() => setMega(null)}
                className="absolute left-0 right-0 top-full hidden lg:block"
              >
                <div className="mx-4 lg:mx-8 mt-2 rounded-2xl bg-[#100820] border border-[#FF53A9]/15 shadow-2xl overflow-hidden">
                  {mega === "services" && (
                    <div className="grid grid-cols-4 gap-6 p-8">
                      {[
                        { cat: "marketing", label: "Digital Marketing", color: "#FF53A9" },
                        { cat: "web", label: "Web & Software", color: "#136DFF" },
                        { cat: "ai", label: "AI & Automation", color: "#9B3DFF" },
                        { cat: "creative", label: "Creative & Brand", color: "#FF8AC4" },
                      ].map((col) => (
                        <div key={col.cat}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="h-2 w-2 rounded-full" style={{ background: col.color }} />
                            <span className="nx-eyebrow text-white/40">{col.label}</span>
                          </div>
                          <ul className="space-y-2.5">
                            {servicesByCat(col.cat).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="block text-sm text-white/70 hover:text-[#FF8AC4] transition group"
                                >
                                  <span className="font-medium">{s.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {/* Footer row with CTA */}
                      <div className="col-span-4 mt-4 pt-6 border-t border-[#FF53A9]/10 flex items-center justify-between">
                        <p className="text-sm text-white/60">
                          Not sure what you need? Book a free 30-min consultation.
                        </p>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 nx-btn-orange px-5 py-2.5 text-sm"
                        >
                          Book a Call <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {mega === "solutions" && (
                    <div className="grid grid-cols-3 gap-4 p-8">
                      {SOLUTIONS.map((sol) => (
                        <Link
                          key={sol.slug}
                          href={`/solutions/${sol.slug}`}
                          className="group rounded-xl p-4 hover:bg-white/5 transition border border-transparent hover:border-white/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-white">{sol.title}</span>
                            <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-[#FF8AC4] group-hover:translate-x-1 transition" />
                          </div>
                          <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                            {sol.summary || sol.audience || "Custom solution for your industry."}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}

                  {mega === "resources" && (
                    <div className="grid grid-cols-3 gap-6 p-8">
                      <div>
                        <div className="nx-eyebrow text-white/40 mb-3">Showcase</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/portfolio" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Portfolio</Link></li>
                          <li><Link href="/case-studies" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Case Studies</Link></li>
                          <li><Link href="/team" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Our Team</Link></li>
                        </ul>
                      </div>
                      <div>
                        <div className="nx-eyebrow text-white/40 mb-3">Learn</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/blog" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Blog</Link></li>
                          <li><Link href="/pricing" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Pricing</Link></li>
                          <li><Link href="/about" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">About Us</Link></li>
                        </ul>
                      </div>
                      <div>
                        <div className="nx-eyebrow text-white/40 mb-3">Company</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/careers" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Careers</Link></li>
                          <li><Link href="/contact" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Contact</Link></li>
                          <li><Link href="/legal" className="text-sm text-white/70 hover:text-[#FF8AC4] transition">Legal</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0A0612] border-l border-[#FF53A9]/15 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#FF53A9]/15">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg nx-brand-gradient grid place-items-center font-black text-white text-sm">C</div>
                  <span className="font-black text-white nx-text-brand-grad">ClickTake</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-10 w-10 grid place-items-center text-white"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-5 space-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-white/80 hover:bg-white/5 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-[#FF53A9]/15 space-y-3">
                  <Link
                    href="/contact"
                    className="block nx-btn-orange text-center px-5 py-3.5 text-sm"
                  >
                    Book Free Consultation
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-center px-5 py-3 text-sm font-semibold text-white/70 border border-white/15 rounded-full"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
