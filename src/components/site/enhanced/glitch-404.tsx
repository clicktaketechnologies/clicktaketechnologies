"use client";

/**
 * Glitch404 — interactive 3D glitch 404 page.
 *
 * Features:
 *   • Glitch text effect (RGB-split + clip-path jitter, CSS-driven).
 *   • 3D tilt on the 404 number (follows cursor).
 *   • Search input that filters quick links live.
 *   • Quick links to common destinations.
 *   • Auto-redirect countdown (15s → home), user can cancel.
 *   • Humorous copy + on-brand styling.
 *   • Respects prefers-reduced-motion (static 404, no glitch).
 *
 * This replaces the existing simple 404 page. The parent server
 * component (src/app/not-found.tsx) is rewritten to render this.
 */

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, AlertTriangle, ArrowLeft, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-enhanced";
import { ParticleField } from "./particle-field";

const QUICK_LINKS = [
  { label: "Home", href: "/", description: "Back to the homepage" },
  { label: "Services", href: "/services", description: "What we build" },
  { label: "Portfolio", href: "/portfolio", description: "See our work" },
  { label: "Pricing", href: "/pricing", description: "Plans & cost" },
  { label: "Contact", href: "/contact", description: "Get in touch" },
  { label: "Blog", href: "/blog", description: "Articles & insights" },
  { label: "About", href: "/about", description: "About ClickTake" },
  { label: "Careers", href: "/careers", description: "Open positions" },
];

const REDIRECT_SECONDS = 15;

export function Glitch404() {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [query, setQuery] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const [cancelled, setCancelled] = useState(false);
  const glitchRef = useRef<HTMLDivElement>(null);

  // ── 3D tilt on the 404 ────────────────────────────────────────
  useEffect(() => {
    if (reduced) return;
    const el = glitchRef.current;
    if (!el) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rx = (e.clientY - cy) / cy * 12;
      const ry = (e.clientX - cx) / cx * 12;
      el.style.transform = `perspective(800px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  // ── Auto-redirect countdown ───────────────────────────────────
  useEffect(() => {
    if (cancelled) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          router.push("/");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cancelled, router]);

  // ── Filter quick links ────────────────────────────────────────
  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUICK_LINKS;
    return QUICK_LINKS.filter(
      (l) =>
        l.label.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground dark:bg-[#0a0612] dark:text-white">
      {/* Particle field background */}
      <ParticleField
        className="absolute inset-0 opacity-40"
        count={50}
        color="255, 83, 169"
        linkRadius={130}
        speed={0.25}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-[#FF53A9]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#136DFF]/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
        {/* Alert badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF53A9]/30 bg-[#FF53A9]/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[2px] text-[#FF8AC4]"
        >
          <AlertTriangle className="h-3 w-3" />
          Error 404 — Signal Lost
        </motion.div>

        {/* Glitch 404 number */}
        <div
          ref={glitchRef}
          className="relative mb-4"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.2s ease-out",
          }}
        >
          <h1
            className={reduced ? "" : "nx-glitch-text"}
            data-text="404"
            style={{
              fontSize: "clamp(7rem, 22vw, 14rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              background: "linear-gradient(135deg, #FF53A9, #9B3DFF, #136DFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          This page got lost in the neural net.
        </motion.h2>

        {/* Subtext — humorous */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-3 max-w-md text-sm sm:text-base text-muted-foreground dark:text-white/60"
        >
          Our AI tried to fetch this URL but got distracted by a shiny gradient.
          Try one of these instead — or search for what you came for.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 w-full max-w-md"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a page…"
              className="w-full rounded-full border border-border bg-input py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur focus:border-[#FF53A9] focus:outline-none focus:ring-2 focus:ring-[#FF53A9]/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
              aria-label="Search for a page"
            />
          </div>

          {/* Filtered quick links */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <AnimatePresence mode="popLayout">
              {filteredLinks.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    href={link.href}
                    className="group flex flex-col items-start rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-[#FF53A9]/40 hover:bg-[#FF53A9]/5 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-sm font-semibold text-foreground group-hover:text-[#FF8AC4] dark:text-white">
                      {link.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground dark:text-white/50">{link.description}</span>
                  </Link>
                </motion.div>
              ))}
              {filteredLinks.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-2 py-4 text-sm text-muted-foreground dark:text-white/40"
                >
                  No matches. Try &quot;services&quot; or &quot;contact&quot;.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF53A9] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#FF53A9]/30 transition-transform hover:scale-105"
          >
            <Home className="h-4 w-4" /> Take me home
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/80 backdrop-blur transition-colors hover:bg-accent dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
        </motion.div>

        {/* Auto-redirect notice */}
        <AnimatePresence>
          {!cancelled && secondsLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-muted/80 px-4 py-2 text-xs text-muted-foreground backdrop-blur dark:border-white/10 dark:bg-black/40 dark:text-white/60"
            >
              <span>
                Auto-redirecting home in{" "}
                <span className="font-mono font-bold text-[#FF8AC4]">{secondsLeft}s</span>
              </span>
              <button
                onClick={() => setCancelled(true)}
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-3 w-3" /> Cancel
              </button>
            </motion.div>
          )}
          {cancelled && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 text-xs text-muted-foreground dark:text-white/40"
            >
              Auto-redirect cancelled. Take your time.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default Glitch404;
