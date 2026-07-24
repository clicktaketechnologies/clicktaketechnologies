"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, RotateCcw, Palette, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

/* NX DESIGN CLIENT — admin editor for the competitor-inspired design system.
 *
 * Edits --nx-* CSS variables that control:
 *  - Brand accents (orange, electric blue)
 *  - Navy palette (always-dark sections)
 *  - Light-mode surfaces (text + cards)
 *  - Dark-mode surfaces (text + cards when html.dark)
 *
 * Saved via POST /api/admin/design-system → stored in SiteSetting(key="nx_design").
 * The site layout.tsx reads this server-side and injects as <style> in <head>.
 *
 * Changes apply globally to all pages using the new design (homepage + all
 * inner pages that use NxPageLayout).
 */

type Props = { canWrite: boolean };

type NxConfig = {
  // Brand accents
  "--nx-orange": string;
  "--nx-orange-soft": string;
  "--nx-orange-deep": string;
  "--nx-electric": string;
  "--nx-electric-soft": string;
  // Navy palette
  "--nx-navy-900": string;
  "--nx-navy-800": string;
  "--nx-navy-700": string;
  "--nx-navy-600": string;
  // Status
  "--nx-green": string;
  "--nx-yellow": string;
  "--nx-pink": string;
  // Light-mode surfaces
  light: {
    "--nx-surface": string;
    "--nx-surface-alt": string;
    "--nx-surface-muted": string;
    "--nx-border": string;
    "--nx-border-strong": string;
    "--nx-ink": string;
    "--nx-ink-soft": string;
    "--nx-ink-muted": string;
  };
  // Dark-mode surfaces
  dark: {
    "--nx-surface": string;
    "--nx-surface-alt": string;
    "--nx-surface-muted": string;
    "--nx-border": string;
    "--nx-border-strong": string;
    "--nx-ink": string;
    "--nx-ink-soft": string;
    "--nx-ink-muted": string;
  };
};

const DEFAULTS: NxConfig = {
  "--nx-orange": "#FF6B35",
  "--nx-orange-soft": "#FF8A5C",
  "--nx-orange-deep": "#E55319",
  "--nx-electric": "#3B82F6",
  "--nx-electric-soft": "#60A5FA",
  "--nx-navy-900": "#0A1124",
  "--nx-navy-800": "#0F1A35",
  "--nx-navy-700": "#162347",
  "--nx-navy-600": "#1E2F5C",
  "--nx-green": "#10B981",
  "--nx-yellow": "#F59E0B",
  "--nx-pink": "#EC4899",
  light: {
    "--nx-surface": "#FFFFFF",
    "--nx-surface-alt": "#F8FAFC",
    "--nx-surface-muted": "#F1F5F9",
    "--nx-border": "#E2E8F0",
    "--nx-border-strong": "#CBD5E1",
    "--nx-ink": "#0A1124",
    "--nx-ink-soft": "#475569",
    "--nx-ink-muted": "#94A3B8",
  },
  dark: {
    "--nx-surface": "#0F1A35",
    "--nx-surface-alt": "#162347",
    "--nx-surface-muted": "#1E2F5C",
    "--nx-border": "rgba(255, 255, 255, 0.08)",
    "--nx-border-strong": "rgba(255, 255, 255, 0.16)",
    "--nx-ink": "#F8FAFC",
    "--nx-ink-soft": "#CBD5E1",
    "--nx-ink-muted": "#94A3B8",
  },
};

// Preset palettes — quick-start themes
const PRESETS: { name: string; desc: string; config: NxConfig }[] = [
  {
    name: "ClickTake Orange",
    desc: "Default — navy + orange (Vention / Index.dev inspired)",
    config: DEFAULTS,
  },
  {
    name: "Emerald Pro",
    desc: "Navy + emerald green accent (Future Processing inspired)",
    config: {
      ...DEFAULTS,
      "--nx-orange": "#10B981",
      "--nx-orange-soft": "#34D399",
      "--nx-orange-deep": "#059669",
    },
  },
  {
    name: "Electric Purple",
    desc: "Navy + violet (Itransition inspired)",
    config: {
      ...DEFAULTS,
      "--nx-orange": "#8B5CF6",
      "--nx-orange-soft": "#A78BFA",
      "--nx-orange-deep": "#7C3AED",
    },
  },
  {
    name: "Brocoders Red",
    desc: "Navy + crimson (Brocoders inspired)",
    config: {
      ...DEFAULTS,
      "--nx-orange": "#EF4444",
      "--nx-orange-soft": "#F87171",
      "--nx-orange-deep": "#DC2626",
    },
  },
  {
    name: "Sunset Coral",
    desc: "Deep navy + warm coral",
    config: {
      ...DEFAULTS,
      "--nx-orange": "#F97316",
      "--nx-orange-soft": "#FB923C",
      "--nx-orange-deep": "#EA580C",
    },
  },
  {
    name: "Midnight Gold",
    desc: "Black-navy + premium gold",
    config: {
      ...DEFAULTS,
      "--nx-navy-900": "#000000",
      "--nx-navy-800": "#0A0A0F",
      "--nx-orange": "#FBBF24",
      "--nx-orange-soft": "#FCD34D",
      "--nx-orange-deep": "#F59E0B",
    },
  },
];

export function NxDesignClient({ canWrite }: Props) {
  const [config, setConfig] = useState<NxConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

  // Load current config from API
  useEffect(() => {
    fetch("/api/admin/design-system")
      .then((r) => r.json())
      .then((data) => {
        if (data.config) setConfig(data.config);
      })
      .catch(() => toast.error("Failed to load NX design config"))
      .finally(() => setLoading(false));
  }, []);

  // Apply preview — inject CSS vars into the admin page so the preview pane
  // reflects the edited colors live.
  useEffect(() => {
    const rootVars = Object.entries(config)
      .filter(([k]) => k !== "light" && k !== "dark")
      .map(([k, v]) => `${k}: ${v};`)
      .join("\n");
    const lightVars = Object.entries(config.light).map(([k, v]) => `${k}: ${v};`).join("\n");
    const darkVars = Object.entries(config.dark).map(([k, v]) => `${k}: ${v};`).join("\n");

    let styleEl = document.getElementById("nx-preview-tokens") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "nx-preview-tokens";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
#nx-preview-pane {
${rootVars}
${previewMode === "light" ? lightVars : darkVars}
}
#nx-preview-pane .dark-mode-only { display: ${previewMode === "dark" ? "block" : "none"}; }
#nx-preview-pane .light-mode-only { display: ${previewMode === "light" ? "block" : "none"}; }
    `;
  }, [config, previewMode]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/design-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        toast.success("NX design saved — changes live on next page load");
      } else {
        toast.error("Failed to save");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm("Reset all NX design tokens to defaults? This cannot be undone.")) return;
    setConfig(DEFAULTS);
    toast.info("Reset to defaults — click Save to apply");
  };

  const applyPreset = (preset: NxConfig) => {
    setConfig(preset);
    toast.info("Preset applied — click Save to make it live");
  };

  // Update a top-level color
  const setColor = (key: keyof NxConfig, value: string) => {
    setConfig((c) => ({ ...c, [key]: value }));
  };
  // Update a nested (light/dark) color
  const setModeColor = (mode: "light" | "dark", key: string, value: string) => {
    setConfig((c) => ({ ...c, [mode]: { ...c[mode], [key]: value } }));
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Loading NX design config...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Palette className="size-5" /> NX Design System
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Edit the competitor-inspired design tokens. Changes apply globally
            to the homepage and all inner pages on next page load.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs hover:bg-muted"
          >
            <RotateCcw className="size-3.5" /> Reset
          </button>
          {canWrite && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save &amp; Apply
            </button>
          )}
        </div>
      </div>

      {/* Presets */}
      <Card className="p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Presets
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p.config)}
              className="text-left rounded-lg border border-border/60 p-3 hover:border-brand-blue transition group"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex -space-x-1">
                  <div className="size-4 rounded-full border border-white/40" style={{ backgroundColor: p.config["--nx-navy-900"] }} />
                  <div className="size-4 rounded-full border border-white/40" style={{ backgroundColor: p.config["--nx-orange"] }} />
                  <div className="size-4 rounded-full border border-white/40" style={{ backgroundColor: p.config["--nx-electric"] }} />
                </div>
                <span className="text-sm font-medium group-hover:text-brand-blue">{p.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">{p.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Color editors */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Brand accents + Navy palette */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-4">Brand &amp; Navy Palette</h3>
          <div className="space-y-3">
            <ColorRow label="Orange (Primary CTA)" value={config["--nx-orange"]} onChange={(v) => setColor("--nx-orange", v)} />
            <ColorRow label="Orange Soft" value={config["--nx-orange-soft"]} onChange={(v) => setColor("--nx-orange-soft", v)} />
            <ColorRow label="Orange Deep (Hover)" value={config["--nx-orange-deep"]} onChange={(v) => setColor("--nx-orange-deep", v)} />
            <ColorRow label="Electric Blue" value={config["--nx-electric"]} onChange={(v) => setColor("--nx-electric", v)} />
            <ColorRow label="Electric Blue Soft" value={config["--nx-electric-soft"]} onChange={(v) => setColor("--nx-electric-soft", v)} />
            <div className="h-px bg-border my-3" />
            <ColorRow label="Navy 900 (Hero/Footer)" value={config["--nx-navy-900"]} onChange={(v) => setColor("--nx-navy-900", v)} />
            <ColorRow label="Navy 800" value={config["--nx-navy-800"]} onChange={(v) => setColor("--nx-navy-800", v)} />
            <ColorRow label="Navy 700" value={config["--nx-navy-700"]} onChange={(v) => setColor("--nx-navy-700", v)} />
            <ColorRow label="Navy 600" value={config["--nx-navy-600"]} onChange={(v) => setColor("--nx-navy-600", v)} />
            <div className="h-px bg-border my-3" />
            <ColorRow label="Green (Success)" value={config["--nx-green"]} onChange={(v) => setColor("--nx-green", v)} />
            <ColorRow label="Yellow" value={config["--nx-yellow"]} onChange={(v) => setColor("--nx-yellow", v)} />
            <ColorRow label="Pink" value={config["--nx-pink"]} onChange={(v) => setColor("--nx-pink", v)} />
          </div>
        </Card>

        {/* Light + Dark surface editors */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Light-Mode Surfaces</h3>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">default mode</span>
            </div>
            <div className="space-y-3">
              <ColorRow label="Surface (Card bg)" value={config.light["--nx-surface"]} onChange={(v) => setModeColor("light", "--nx-surface", v)} />
              <ColorRow label="Surface Alt" value={config.light["--nx-surface-alt"]} onChange={(v) => setModeColor("light", "--nx-surface-alt", v)} />
              <ColorRow label="Surface Muted" value={config.light["--nx-surface-muted"]} onChange={(v) => setModeColor("light", "--nx-surface-muted", v)} />
              <ColorRow label="Border" value={config.light["--nx-border"]} onChange={(v) => setModeColor("light", "--nx-border", v)} allowAlpha />
              <ColorRow label="Border Strong" value={config.light["--nx-border-strong"]} onChange={(v) => setModeColor("light", "--nx-border-strong", v)} />
              <ColorRow label="Ink (Body text)" value={config.light["--nx-ink"]} onChange={(v) => setModeColor("light", "--nx-ink", v)} />
              <ColorRow label="Ink Soft" value={config.light["--nx-ink-soft"]} onChange={(v) => setModeColor("light", "--nx-ink-soft", v)} />
              <ColorRow label="Ink Muted" value={config.light["--nx-ink-muted"]} onChange={(v) => setModeColor("light", "--nx-ink-muted", v)} />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Dark-Mode Surfaces</h3>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">when html.dark</span>
            </div>
            <div className="space-y-3">
              <ColorRow label="Surface (Card bg)" value={config.dark["--nx-surface"]} onChange={(v) => setModeColor("dark", "--nx-surface", v)} />
              <ColorRow label="Surface Alt" value={config.dark["--nx-surface-alt"]} onChange={(v) => setModeColor("dark", "--nx-surface-alt", v)} />
              <ColorRow label="Surface Muted" value={config.dark["--nx-surface-muted"]} onChange={(v) => setModeColor("dark", "--nx-surface-muted", v)} />
              <ColorRow label="Border" value={config.dark["--nx-border"]} onChange={(v) => setModeColor("dark", "--nx-border", v)} allowAlpha />
              <ColorRow label="Border Strong" value={config.dark["--nx-border-strong"]} onChange={(v) => setModeColor("dark", "--nx-border-strong", v)} allowAlpha />
              <ColorRow label="Ink (Body text)" value={config.dark["--nx-ink"]} onChange={(v) => setModeColor("dark", "--nx-ink", v)} />
              <ColorRow label="Ink Soft" value={config.dark["--nx-ink-soft"]} onChange={(v) => setModeColor("dark", "--nx-ink-soft", v)} />
              <ColorRow label="Ink Muted" value={config.dark["--nx-ink-muted"]} onChange={(v) => setModeColor("dark", "--nx-ink-muted", v)} />
            </div>
          </Card>
        </div>
      </div>

      {/* Live preview */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Live Preview</h3>
          <div className="flex gap-1 rounded-md border border-border/60 p-0.5">
            <button
              onClick={() => setPreviewMode("light")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs ${previewMode === "light" ? "bg-brand-blue text-white" : "text-muted-foreground"}`}
            >
              <Eye className="size-3" /> Light
            </button>
            <button
              onClick={() => setPreviewMode("dark")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs ${previewMode === "dark" ? "bg-brand-blue text-white" : "text-muted-foreground"}`}
            >
              <EyeOff className="size-3" /> Dark
            </button>
          </div>
        </div>

        {/* Preview pane — wrapped in #nx-preview-pane so the injected CSS vars apply */}
        <div
          id="nx-preview-pane"
          className="rounded-xl overflow-hidden border"
          style={{ background: previewMode === "light" ? config.light["--nx-surface"] : config.dark["--nx-surface"] }}
        >
          {/* Simulated navbar */}
          <div
            className="flex items-center justify-between p-4"
            style={{ background: config["--nx-navy-900"] }}
          >
            <div className="flex items-center gap-2">
              <div
                className="size-6 rounded grid place-items-center font-black text-white text-xs"
                style={{ background: `linear-gradient(135deg, ${config["--nx-orange"]}, ${config["--nx-orange-deep"]})` }}
              >
                C
              </div>
              <span className="text-sm font-black text-white">ClickTake</span>
            </div>
            <button
              className="rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ background: config["--nx-orange"] }}
            >
              Get Started
            </button>
          </div>

          {/* Simulated hero */}
          <div
            className="p-6 sm:p-8"
            style={{ background: config["--nx-navy-900"], color: "#ffffff" }}
          >
            <div
              className="inline-block rounded-full px-2.5 py-1 text-[10px] font-bold mb-3"
              style={{ background: `rgba(255, 255, 255, 0.08)`, color: config["--nx-orange-soft"] }}
            >
              ★ Rated 5.0 by 120+ clients
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Build, Market &amp;{" "}
              <span style={{
                background: `linear-gradient(135deg, ${config["--nx-orange-soft"]}, ${config["--nx-orange"]})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
                Scale
              </span>{" "}
              with AI-Powered Engineering.
            </h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              120+ projects shipped across UK, Pakistan, USA &amp; Dubai.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                className="rounded-full px-4 py-2 text-xs font-bold text-white"
                style={{ background: config["--nx-orange"], boxShadow: `0 10px 30px -10px ${config["--nx-orange"]}66` }}
              >
                Book Free Consultation
              </button>
              <button
                className="rounded-full px-4 py-2 text-xs font-bold text-white"
                style={{ border: `1.5px solid rgba(255, 255, 255, 0.3)` }}
              >
                Get Free Audit
              </button>
            </div>
          </div>

          {/* Simulated light surface section */}
          <div
            className="p-6 sm:p-8"
            style={{
              background: previewMode === "light" ? config.light["--nx-surface"] : config.dark["--nx-surface"],
              color: previewMode === "light" ? config.light["--nx-ink"] : config.dark["--nx-ink"],
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: config["--nx-orange"] }}
            >
              What we do
            </div>
            <h4 className="text-lg font-black mb-3">Services preview</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Web & Software", color: config["--nx-electric"] },
                { label: "AI & Automation", color: config["--nx-orange"] },
                { label: "Marketing", color: config["--nx-green"] },
                { label: "Creative", color: config["--nx-pink"] },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-3"
                  style={{
                    background: previewMode === "light" ? config.light["--nx-surface-alt"] : config.dark["--nx-surface-alt"],
                    border: `1px solid ${previewMode === "light" ? config.light["--nx-border"] : config.dark["--nx-border"]}`,
                  }}
                >
                  <div className="size-5 rounded grid place-items-center mb-1.5" style={{ background: `${s.color}1a` }}>
                    <div className="size-2 rounded-full" style={{ background: s.color }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: previewMode === "light" ? config.light["--nx-ink"] : config.dark["--nx-ink"] }}>
                    {s.label}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: previewMode === "light" ? config.light["--nx-ink-soft"] : config.dark["--nx-ink-soft"] }}>
                    Short description text
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated footer */}
          <div
            className="p-4 text-center text-[10px]"
            style={{ background: config["--nx-navy-900"], color: "rgba(255, 255, 255, 0.6)" }}
          >
            © 2024 ClickTake Technologies · Birmingham · Multan · Austin · Dubai
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ColorRow — single color editor with color picker + text input */
function ColorRow({
  label,
  value,
  onChange,
  allowAlpha = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  allowAlpha?: boolean;
}) {
  // If the value is an rgba()/hex with alpha, we can't use type="color".
  // Show a text input instead with a small swatch preview.
  const isColorPicker = value.startsWith("#") && (value.length === 7 || (allowAlpha && value.length === 9));

  return (
    <div className="flex items-center justify-between gap-3">
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-32 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-xs font-mono outline-none focus:border-brand-blue"
        />
        {isColorPicker ? (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="size-7 rounded border border-border/60 cursor-pointer"
          />
        ) : (
          <div
            className="size-7 rounded border border-border/60"
            style={{ background: value }}
            title={value}
          />
        )}
      </div>
    </div>
  );
}
