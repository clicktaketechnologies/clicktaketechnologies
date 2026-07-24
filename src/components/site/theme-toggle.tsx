'use client'

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Monitor, Palette, Check } from "lucide-react";

/**
 * Theme toggle for ClickTake Technologies — supports 4 modes:
 *   - light:   fixed light theme
 *   - dark:    fixed dark theme (default)
 *   - system:  follows OS preference (prefers-color-scheme)
 *   - custom:  user-defined tokens (admin Theme Editor overrides CSS variables)
 *
 * Uses next-themes (wired in app/layout.tsx via <ThemeProvider>).
 * The choice is persisted to localStorage under the "theme" key by next-themes.
 * The fixed BackgroundScene canvas listens to the .dark class on <html> via a
 * MutationObserver and re-paints with the matching palette automatically.
 *
 * Custom mode: when "custom" is selected, we apply the .theme-custom class to
 * <html> and read any saved CSS variables from localStorage["theme-custom-vars"].
 * The admin Theme Editor writes these variables; if none are saved, custom mode
 * behaves like dark mode (the default).
 */
export type ThemeMode = "light" | "dark" | "system" | "custom";

const MODES: { value: ThemeMode; label: string; icon: typeof Moon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
  { value: "custom", label: "Custom", icon: Palette },
];

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Avoid hydration mismatch — render a stable placeholder until mounted
  useEffect(() => setMounted(true), []);

  // Close popover on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-theme-popover]") && !t.closest("[data-theme-trigger]")) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When custom mode is selected, apply the .theme-custom class so CSS variables
  // from localStorage["theme-custom-vars"] (set by admin Theme Editor) override
  // the defaults. When not in custom mode, remove the class so the standard
  // light/dark tokens apply.
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "custom") {
      root.classList.add("theme-custom");
      // Pull saved custom vars from localStorage and apply as inline styles
      try {
        const raw = localStorage.getItem("theme-custom-vars");
        if (raw) {
          const vars = JSON.parse(raw) as Record<string, string>;
          for (const [k, v] of Object.entries(vars)) {
            root.style.setProperty(k, v);
          }
        }
      } catch {}
    } else {
      root.classList.remove("theme-custom");
      // Clear any inline custom-variable overrides when leaving custom mode
      const raw = localStorage.getItem("theme-custom-vars");
      if (raw) {
        try {
          const vars = JSON.parse(raw) as Record<string, string>;
          for (const k of Object.keys(vars)) {
            root.style.removeProperty(k);
          }
        } catch {}
      }
    }
  }, [theme, mounted]);

  const isDark = (resolvedTheme || theme) === "dark";
  const currentMode = (theme as ThemeMode) || "dark";

  const onPick = (m: ThemeMode) => {
    setTheme(m);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        data-theme-trigger
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle color theme"
        title={`Theme: ${currentMode}`}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-background"
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
              key={currentMode}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {currentMode === "light" ? (
                <Sun className="h-[18px] w-[18px] text-foreground" strokeWidth={2.2} />
              ) : currentMode === "system" ? (
                <Monitor className="h-[18px] w-[18px] text-foreground" strokeWidth={2.2} />
              ) : currentMode === "custom" ? (
                <Palette className="h-[18px] w-[18px] text-foreground" strokeWidth={2.2} />
              ) : (
                <Moon className="h-[18px] w-[18px] text-foreground" strokeWidth={2.2} />
              )}
            </motion.div>
          ) : (
            // Placeholder prevents layout shift on first paint
            <div className="h-[18px] w-[18px]" />
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && mounted && (
          <motion.div
            data-theme-popover
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-1.5"
          >
            <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Theme
            </div>
            {MODES.map((m) => {
              const Icon = m.icon;
              const active = currentMode === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => onPick(m.value)}
                  className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "text-brand-blue" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <span className="flex-1 text-left font-medium">{m.label}</span>
                  {active && <Check className="h-3.5 w-3.5 text-brand-blue" />}
                </button>
              );
            })}
            <div className="mt-1 px-2 py-1.5 text-[10px] text-muted-foreground leading-relaxed border-t border-border">
              {currentMode === "custom"
                ? "Custom tokens from Theme Editor."
                : currentMode === "system"
                ? "Follows OS preference."
                : currentMode === "light"
                ? "Fixed light theme."
                : "Fixed dark theme."}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
