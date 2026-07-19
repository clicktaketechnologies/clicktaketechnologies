'use client'

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * Light/Dark theme toggle for ClickTake Technologies.
 *
 * Uses next-themes (wired in app/layout.tsx via <ThemeProvider>).
 * Defaults to dark on first visit; the choice is persisted to localStorage
 * by next-themes under the "theme" key. The fixed BackgroundScene canvas
 * listens to the .dark class on <html> via a MutationObserver and
 * re-paints with the matching palette automatically.
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render a stable placeholder until mounted
  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme || theme) === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.06] hover:shadow-glow"
    >
      {/* Subtle brand glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(19,109,255,0.18), transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {isDark ? (
              <Moon
                className="h-[18px] w-[18px] text-foreground"
                strokeWidth={2.2}
              />
            ) : (
              <Sun
                className="h-[18px] w-[18px] text-foreground"
                strokeWidth={2.2}
              />
            )}
          </motion.div>
        ) : (
          // Placeholder prevents layout shift on first paint
          <div className="h-[18px] w-[18px]" />
        )}
      </AnimatePresence>
    </button>
  );
}
