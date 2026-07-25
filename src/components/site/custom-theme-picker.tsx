'use client'

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Sparkles, Sun, Moon } from "lucide-react";

/**
 * Custom Color Engine — lets users pick primary + secondary colors and a
 * light/dark base, then writes the result to localStorage so the FOUC script
 * in layout.tsx + the .theme-custom CSS class in globals.css apply them.
 *
 * STORAGE CONTRACT (must match layout.tsx FOUC script + theme-toggle.tsx):
 *   localStorage["theme-custom-vars"]   = JSON.stringify({ '--primary': '#...', ... })
 *   localStorage["theme-custom-dark"]   = 'true' | 'false'
 *   localStorage["theme"]               = 'custom'  (set by next-themes setTheme)
 *
 * CSS marker class:
 *   <html>.theme-custom               = custom mode active (fallback = dark palette)
 *   <html>.theme-custom.theme-custom-light = custom mode + light base
 *
 * The CSS variables we write override the defaults via inline style on <html>.
 * Variables touched (and their aliases):
 *   --primary, --brand, --brand-blue, --ring                     ← primary color
 *   --accent, --brand-accent, --brand-pink                       ← secondary color
 */
export type CustomThemeConfig = {
  primary: string;   // hex, e.g. "#136DFF"
  secondary: string; // hex, e.g. "#FF53A9"
  base: "dark" | "light";
};

// ─── 6 curated palette presets ───────────────────────────────────────────────
// Each preset is a (primary, secondary) pair chosen for good contrast in both
// light and dark base modes. Swatches show the two colors side-by-side.
const PRESETS: { name: string; primary: string; secondary: string }[] = [
  { name: "ClickTake",     primary: "#136DFF", secondary: "#FF53A9" }, // brand blue + pink
  { name: "Emerald",       primary: "#10B981", secondary: "#14B8A6" }, // green + teal
  { name: "Sunset",        primary: "#F97316", secondary: "#EF4444" }, // orange + red
  { name: "Royal Purple",  primary: "#8B5CF6", secondary: "#6366F1" }, // purple + indigo
  { name: "Ocean",         primary: "#06B6D4", secondary: "#3B82F6" }, // cyan + blue
  { name: "Mono",          primary: "#475569", secondary: "#64748B" }, // slate + gray
];

const DEFAULT_CONFIG: CustomThemeConfig = {
  primary: "#136DFF",
  secondary: "#FF53A9",
  base: "dark",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Read the saved custom theme config from localStorage. Returns null if none. */
export function loadCustomConfig(): CustomThemeConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const rawVars = localStorage.getItem("theme-custom-vars");
    const baseDark = localStorage.getItem("theme-custom-dark");
    if (!rawVars) return null;
    const vars = JSON.parse(rawVars) as Record<string, string>;
    return {
      primary: vars["--primary"] || DEFAULT_CONFIG.primary,
      secondary: vars["--accent"] || DEFAULT_CONFIG.secondary,
      base: baseDark === "false" ? "light" : "dark",
    };
  } catch {
    return null;
  }
}

/**
 * Apply a custom theme config to <html> + localStorage. This is the
 * canonical "writer" that the rest of the codebase has been waiting for
 * (see comments in layout.tsx and globals.css).
 */
export function applyCustomConfig(cfg: CustomThemeConfig) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;

  // 1. Build the variable map. We set primary + secondary AND their aliases
  //    so every component that uses any of these token names picks up the
  //    custom color.
  const vars: Record<string, string> = {
    "--primary":         cfg.primary,
    "--brand":           cfg.primary,
    "--brand-blue":      cfg.primary,
    "--ring":            cfg.primary,
    "--accent":          cfg.secondary,
    "--brand-accent":    cfg.secondary,
    "--brand-pink":      cfg.secondary,
  };

  // 2. Persist to localStorage (this is what the FOUC script reads on next load)
  localStorage.setItem("theme-custom-vars", JSON.stringify(vars));
  localStorage.setItem("theme-custom-dark", cfg.base === "dark" ? "true" : "false");

  // 3. Apply inline styles to <html> immediately (no FOUC on this page)
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }

  // 4. Toggle marker classes
  root.classList.add("theme-custom");
  if (cfg.base === "light") {
    root.classList.add("theme-custom-light");
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  } else {
    root.classList.remove("theme-custom-light");
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }
}

/** Remove all custom overrides and clean up localStorage + inline styles. */
export function clearCustomConfig() {
  if (typeof window === "undefined") return;
  const root = document.documentElement;

  // Remove inline custom vars
  const raw = localStorage.getItem("theme-custom-vars");
  if (raw) {
    try {
      const vars = JSON.parse(raw) as Record<string, string>;
      for (const k of Object.keys(vars)) {
        root.style.removeProperty(k);
      }
    } catch {}
  }

  localStorage.removeItem("theme-custom-vars");
  localStorage.removeItem("theme-custom-dark");
  root.classList.remove("theme-custom", "theme-custom-light");
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  /** Called when user applies a custom theme. Receiver should call setTheme('custom'). */
  onApply: (cfg: CustomThemeConfig) => void;
  /** Called when user resets to defaults. Receiver should call setTheme('dark'). */
  onReset: () => void;
  /** Called when user closes the picker without applying. */
  onClose?: () => void;
}

export function CustomThemePicker({ onApply, onReset, onClose }: Props) {
  // Initial state comes from localStorage (so re-opening shows last config)
  const [primary, setPrimary] = useState(DEFAULT_CONFIG.primary);
  const [secondary, setSecondary] = useState(DEFAULT_CONFIG.secondary);
  const [base, setBase] = useState<"dark" | "light">(DEFAULT_CONFIG.base);

  // Load saved config on mount
  useEffect(() => {
    const saved = loadCustomConfig();
    if (saved) {
      setPrimary(saved.primary);
      setSecondary(saved.secondary);
      setBase(saved.base);
    }
  }, []);

  // Live preview — apply changes to <html> immediately as user edits
  // (without writing to localStorage yet — that happens on Apply)
  const previewConfig = useCallback((p: string, s: string, b: "dark" | "light") => {
    const root = document.documentElement;
    root.style.setProperty("--primary", p);
    root.style.setProperty("--brand", p);
    root.style.setProperty("--brand-blue", p);
    root.style.setProperty("--ring", p);
    root.style.setProperty("--accent", s);
    root.style.setProperty("--brand-accent", s);
    root.style.setProperty("--brand-pink", s);
    root.classList.add("theme-custom");
    if (b === "light") {
      root.classList.add("theme-custom-light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.remove("theme-custom-light");
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }
  }, []);

  // Restore the real saved theme when the picker closes without applying
  const restoreOnClose = useCallback(() => {
    const root = document.documentElement;
    const saved = loadCustomConfig();
    // Clear preview overrides
    ["--primary", "--brand", "--brand-blue", "--ring", "--accent", "--brand-accent", "--brand-pink"]
      .forEach(k => root.style.removeProperty(k));
    root.classList.remove("theme-custom", "theme-custom-light");
    if (saved) {
      // Re-apply saved config
      applyCustomConfig(saved);
    } else {
      // No saved config — restore dark class
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }
  }, []);

  const handlePreset = (p: string, s: string) => {
    setPrimary(p);
    setSecondary(s);
    previewConfig(p, s, base);
  };

  const handlePrimaryChange = (val: string) => {
    setPrimary(val);
    previewConfig(val, secondary, base);
  };

  const handleSecondaryChange = (val: string) => {
    setSecondary(val);
    previewConfig(primary, val, base);
  };

  const handleBaseChange = (b: "dark" | "light") => {
    setBase(b);
    previewConfig(primary, secondary, b);
  };

  const handleApply = () => {
    const cfg: CustomThemeConfig = { primary, secondary, base };
    applyCustomConfig(cfg);
    onApply(cfg);
  };

  const handleReset = () => {
    clearCustomConfig();
    onReset();
  };

  const handleClose = () => {
    restoreOnClose();
    onClose?.();
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-pink" />
          <h3 className="text-sm font-bold tracking-tight">Custom Color Engine</h3>
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Preset swatches */}
      <div>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Presets
        </div>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((preset) => {
            const isActive = primary.toLowerCase() === preset.primary.toLowerCase()
              && secondary.toLowerCase() === preset.secondary.toLowerCase();
            return (
              <button
                key={preset.name}
                onClick={() => handlePreset(preset.primary, preset.secondary)}
                className={`group relative flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-all ${
                  isActive
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/40 hover:bg-secondary/50"
                }`}
                title={preset.name}
              >
                {/* Swatch — two halves showing primary + secondary */}
                <div className="flex h-8 w-full overflow-hidden rounded-md">
                  <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                  <div className="flex-1" style={{ backgroundColor: preset.secondary }} />
                </div>
                <span className="text-[10px] font-medium text-foreground/80">{preset.name}</span>
                {isActive && (
                  <Check className="absolute right-1 top-1 h-3 w-3 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color pickers */}
      <div className="grid grid-cols-2 gap-3">
        <ColorField
          label="Primary"
          value={primary}
          onChange={handlePrimaryChange}
        />
        <ColorField
          label="Secondary"
          value={secondary}
          onChange={handleSecondaryChange}
        />
      </div>

      {/* Light/Dark base toggle */}
      <div>
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Base Mode
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleBaseChange("dark")}
            className={`flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
              base === "dark"
                ? "border-primary bg-secondary text-foreground"
                : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Moon className="h-3.5 w-3.5" />
            Dark
          </button>
          <button
            onClick={() => handleBaseChange("light")}
            className={`flex items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
              base === "light"
                ? "border-primary bg-secondary text-foreground"
                : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sun className="h-3.5 w-3.5" />
            Light
          </button>
        </div>
      </div>

      {/* Live preview chip */}
      <div className="rounded-lg border border-border bg-background/50 p-3">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Preview
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
            style={{ backgroundColor: primary }}
          >
            Primary Button
          </button>
          <button
            className="rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
            style={{ backgroundColor: secondary }}
          >
            Secondary
          </button>
          <div
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
          >
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleApply}
          className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
          style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
        >
          Apply Custom Theme
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:text-foreground hover:border-foreground/30"
          title="Reset to defaults"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>
    </div>
  );
}

// ─── ColorField sub-component ────────────────────────────────────────────────

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  // Show the hex code in a text input alongside the native color picker
  const [text, setText] = useState(value);

  // Sync text input when value changes externally (e.g. preset click)
  useEffect(() => {
    setText(value);
  }, [value]);

  const handleTextChange = (val: string) => {
    setText(val);
    // Only propagate if it's a valid hex color
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      onChange(val);
    }
  };

  return (
    <div>
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background/50 p-1.5">
        {/* Native color picker — wrapped in a swatch button */}
        <label
          className="relative h-7 w-7 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => {
              setText(e.target.value);
              onChange(e.target.value);
            }}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Pick ${label} color`}
          />
        </label>
        {/* Hex text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full bg-transparent text-xs font-mono uppercase text-foreground outline-none"
          maxLength={7}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
