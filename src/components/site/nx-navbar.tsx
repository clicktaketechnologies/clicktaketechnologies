'use client'

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, SERVICES, SOLUTIONS } from "@/lib/site-data";
import { ThemeToggle } from "./theme-toggle";
import { AbTest } from "./ab-test";
import { CommandPaletteTrigger } from "./enhanced/command-palette-trigger";
import { useScrollDirection } from "@/hooks/use-enhanced";

/* Active-section ids on the homepage — used to highlight the
   Services / Process / etc. nav items when their target section
   is in view (rather than only when the URL matches). */
const HOME_SECTION_MAP: Record<string, string> = {
  "/services": "services",
  "/solutions": "solutions",
  "/portfolio": "portfolio",
  "/blog": "blog",
  "/about": "about",
};

/* Section ids actually rendered on the homepage that we can track. */
const HOME_SECTION_IDS = ["services", "solutions", "portfolio", "blog", "about", "contact"];

/* NEW NAVBAR — sticky translucent bar (Index.dev + Vention pattern).
 * Logo left · nav center · CTAs right. Sticky on scroll with blur backdrop.
 * Mobile: hamburger → full-screen drawer. Mega menus for Services + Solutions.
 *
 * THEME-AWARE (light + dark mode):
 *  - Surfaces use --nx-* tokens (flip via html.dark) — no hardcoded colors.
 *  - On the homepage hero (always-dark), the bar starts transparent and
 *    picks up the dark hero gradient underneath.
 *  - On inner pages, the bar uses the theme surface token so it matches
 *    the active light/dark page background.
 *  - Text uses --nx-ink so it stays legible in both modes (WCAG AA).
 */

type MegaKey = "services" | "solutions" | "resources" | "company" | null;

export function NxNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const scrollDir = useScrollDirection(8, 100);

  /* Scroll listener — toggle blur on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active-section tracking — only on the homepage where sections
     have ids. Lets us highlight the matching nav item as the user
     scrolls past each section. */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((r, id) => {
          if (r > bestRatio) { bestRatio = r; best = id; }
        });
        if (best) setActiveSection(best);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    HOME_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [pathname]);

  /* Close mobile drawer on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMega(null);
  }, [pathname]);

  /* Lock body scroll while the mobile drawer is open — prevents iOS Safari
     rubber-band bleed-through and keeps the drawer as the only scrollable
     surface. Re-locks when re-opened; restores the prior overflow on cleanup. */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

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

  /* Determine if we're on the homepage (hero is always-dark) — affects
     initial styling. On inner pages, the navbar uses theme tokens. */
  const isHome = pathname === "/";

  /* Group services by category for the mega menu */
  const servicesByCat = (cat: string) => SERVICES.filter((s) => s.category === cat).slice(0, 6);

  /* Navbar surface class — theme-aware:
     - On home (unscrolled): transparent over the dark hero gradient.
     - On home (scrolled) or any inner page: surface token with brand-tinted border.
       In dark mode this gives the original navy bar; in light mode a white bar
       with dark text — both pass WCAG AA contrast.
     - Hide-on-scroll-down: when scrollDir is "down" and we're past 100px,
       translate the header up so it slides out of view. Show on scroll up. */
  const hideClass =
    scrollDir === "down" && scrolled && !mobileOpen && !mega
      ? "-translate-y-full"
      : "translate-y-0";
  const surfaceClass =
    scrolled || !isHome
      ? `nx-surface/85 backdrop-blur-xl border-b border-[var(--nx-border)] ${hideClass}`
      : `bg-transparent ${hideClass}`;

  /* Link text color — on transparent-over-dark-hero (home, unscrolled), use white.
     On solid surface (scrolled or inner page), use the theme ink color. */
  const transparent = isHome && !scrolled;
  const linkBase = transparent
    ? "text-white/80 hover:text-white hover:bg-white/10"
    : "nx-text-soft hover:nx-text hover:bg-[color-mix(in_oklab,var(--nx-ink)_6%,transparent)]";
  const linkActive = transparent
    ? "text-white bg-white/10"
    : "nx-text bg-[color-mix(in_oklab,var(--nx-ink)_8%,transparent)]";
  const logoTextClass = transparent
    ? "text-white"
    : "nx-text";

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${surfaceClass}`}
      >
        <nav className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="ClickTake home">
              <div className="h-9 w-9 rounded-lg nx-brand-gradient grid place-items-center font-black text-white text-sm shadow-[0_0_20px_rgba(255,83,169,0.3),0_0_40px_rgba(19,109,255,0.15)]">
                C
              </div>
              <span className={`text-lg font-black tracking-tight hidden sm:block nx-text-brand-grad ${logoTextClass}`}>
                ClickTake
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const hasMega = "mega" in link && link.mega === true;
                const megaKey = link.label.toLowerCase() as MegaKey;
                const isActive = mega === megaKey;
                // Active-section underline: if we're on the homepage and this
                // link's target section is currently in view, highlight it.
                const sectionId = HOME_SECTION_MAP[link.href];
                const sectionActive = isHome && sectionId && activeSection === sectionId;
                const isCurrent = isActive || pathname.startsWith(link.href) || sectionActive;
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
                      aria-current={sectionActive ? "true" : undefined}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition relative ${
                        isCurrent ? linkActive : linkBase
                      }`}
                    >
                      {link.label}
                      {hasMega && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${isActive ? "rotate-180" : ""}`}
                        />
                      )}
                      {/* Animated underline — only on homepage section-active state */}
                      {sectionActive && (
                        <motion.span
                          layoutId="nav-active-underline"
                          className="absolute left-1/2 -bottom-0.5 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#FF53A9] shadow-[0_0_8px_#FF53A9]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right CTAs — command palette trigger + theme toggle + primary CTA.
                Phase 3 #3 — button label is A/B tested via <AbTest>. Admin
                creates an experiment with key "navbar-primary-cta" and adds
                variants; the rendered label swaps client-side post-hydrate. */}
            <div className="hidden lg:flex items-center gap-2.5">
              <CommandPaletteTrigger variant={transparent ? "navbar-dark" : "navbar-light"} />
              <ThemeToggle />
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 nx-btn-orange px-5 py-2.5 text-sm"
              >
                <AbTest
                  experimentKey="navbar-primary-cta"
                  variants={{
                    A: <>Get Started</>,
                    B: <>Book Free Consultation</>,
                    C: <>Get Your Free Audit</>,
                  }}
                />
                <ArrowRight className="h-3.5 w-3.5 nx-arrow" />
              </Link>
            </div>

            {/* Mobile: command palette trigger + theme toggle + hamburger */}
            <div className="lg:hidden flex items-center gap-1">
              <div className="scale-90 origin-right">
                <CommandPaletteTrigger
                  variant={transparent ? "navbar-dark" : "navbar-light"}
                  showShortcut={false}
                  className="!px-2"
                />
              </div>
              <div className="scale-90 origin-right">
                <ThemeToggle />
              </div>
              <button
                onClick={() => setMobileOpen(true)}
                className={`h-11 w-11 grid place-items-center rounded-lg hover:bg-[color-mix(in_oklab,var(--nx-ink)_6%,transparent)] transition ${transparent ? "text-white" : "nx-text"}`}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
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
                <div className="mx-4 lg:mx-8 mt-2 rounded-2xl nx-surface border border-[var(--nx-border)] shadow-2xl overflow-hidden">
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
                            <span className="nx-eyebrow nx-text-muted">{col.label}</span>
                          </div>
                          <ul className="space-y-2.5">
                            {servicesByCat(col.cat).map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="block text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition group"
                                >
                                  <span className="font-medium">{s.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {/* Footer row with CTA */}
                      <div className="col-span-4 mt-4 pt-6 border-t border-[var(--nx-border)] flex items-center justify-between">
                        <p className="text-sm nx-text-soft">
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
                          className="group rounded-xl p-4 hover:bg-[color-mix(in_oklab,var(--nx-ink)_4%,transparent)] transition border border-transparent hover:border-[var(--nx-border)]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold nx-text">{sol.title}</span>
                            <ArrowRight className="h-4 w-4 nx-text-muted group-hover:text-[var(--nx-brand-pink)] group-hover:translate-x-1 transition" />
                          </div>
                          <p className="text-xs nx-text-soft leading-relaxed line-clamp-2">
                            {sol.summary || sol.audience || "Custom solution for your industry."}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}

                  {mega === "resources" && (
                    <div className="grid grid-cols-2 gap-6 p-8">
                      <div>
                        <div className="nx-eyebrow nx-text-muted mb-3">Showcase</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/portfolio" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Portfolio</Link></li>
                          <li><Link href="/case-studies" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Case Studies</Link></li>
                        </ul>
                      </div>
                      <div>
                        <div className="nx-eyebrow nx-text-muted mb-3">Learn</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/blog" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Blog</Link></li>
                          <li><Link href="/pricing" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Pricing</Link></li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {mega === "company" && (
                    <div className="grid grid-cols-3 gap-6 p-8">
                      <div>
                        <div className="nx-eyebrow nx-text-muted mb-3">About Us</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/about" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">About ClickTake</Link></li>
                          <li><Link href="/team" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Our Team</Link></li>
                          <li><Link href="/careers" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Careers</Link></li>
                        </ul>
                      </div>
                      <div>
                        <div className="nx-eyebrow nx-text-muted mb-3">Connect</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/cities" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Cities We Serve</Link></li>
                          <li><Link href="/contact" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Contact</Link></li>
                        </ul>
                      </div>
                      <div>
                        <div className="nx-eyebrow nx-text-muted mb-3">Legal</div>
                        <ul className="space-y-2.5">
                          <li><Link href="/legal/terms" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Terms of Service</Link></li>
                          <li><Link href="/legal/privacy" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Privacy Policy</Link></li>
                          <li><Link href="/legal/cookies" className="text-sm nx-text-soft hover:text-[var(--nx-brand-pink)] transition">Cookie Policy</Link></li>
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
            {/* Drawer — theme-aware surface. Brand-tinted borders, ink text. */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm nx-surface border-l border-[var(--nx-border)] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--nx-border)]">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg nx-brand-gradient grid place-items-center font-black text-white text-sm">C</div>
                  <span className="font-black nx-text nx-text-brand-grad">ClickTake</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-11 w-11 grid place-items-center nx-text rounded-lg hover:bg-[color-mix(in_oklab,var(--nx-ink)_6%,transparent)] transition"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-5 space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3.5 rounded-xl text-base font-semibold nx-text-soft hover:bg-[color-mix(in_oklab,var(--nx-ink)_5%,transparent)] hover:nx-text transition"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + NAV_LINKS.length * 0.05 + 0.1, duration: 0.3 }}
                  className="pt-4 mt-4 border-t border-[var(--nx-border)] space-y-3"
                >
                  <Link
                    href="/contact"
                    className="block nx-btn-orange text-center px-5 py-3.5 text-sm"
                  >
                    <AbTest
                      experimentKey="navbar-primary-cta"
                      variants={{
                        A: <>Get Started</>,
                        B: <>Book Free Consultation</>,
                        C: <>Get Your Free Audit</>,
                      }}
                    />
                  </Link>
                  {/* Secondary CTA — replaced the old "Sign In" link with a
                      value-add offer link. Reduces CTA redundancy and gives
                      the user a second, distinct reason to convert. */}
                  <Link
                    href="/pricing"
                    className="block text-center px-5 py-3 text-sm font-semibold nx-text-soft border border-[var(--nx-border-strong)] rounded-full hover:nx-text hover:border-[var(--nx-brand-pink)] transition"
                  >
                    View Pricing
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
