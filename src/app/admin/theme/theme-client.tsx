"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Save, Plus, Check, Loader2, Eye, Smartphone, Tablet, Monitor } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type Theme = {
  id: string;
  name: string;
  mode: string;
  primary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  card: string;
  isActive: boolean;
};

type Props = { themes: Theme[]; canWrite: boolean };

const PRESET_THEMES = [
  { name: "ClickTake Dark", mode: "dark", primary: "***REMOVED***136DFF", accent: "***REMOVED***FF53A9", background: "***REMOVED***0a0a0f", foreground: "***REMOVED***fafafa", muted: "***REMOVED***1a1a25", border: "***REMOVED***2a2a35", card: "***REMOVED***15151f" },
  { name: "ClickTake Light", mode: "light", primary: "***REMOVED***136DFF", accent: "***REMOVED***FF53A9", background: "***REMOVED***ffffff", foreground: "***REMOVED***0a0a0f", muted: "***REMOVED***f4f4f5", border: "***REMOVED***e4e4e7", card: "***REMOVED***ffffff" },
  { name: "Midnight", mode: "dark", primary: "***REMOVED***8B5CF6", accent: "***REMOVED***EC4899", background: "***REMOVED***0f0a1f", foreground: "***REMOVED***fafafa", muted: "***REMOVED***1f1a2f", border: "***REMOVED***2f2a3f", card: "***REMOVED***1a152a" },
  { name: "Emerald", mode: "dark", primary: "***REMOVED***10B981", accent: "***REMOVED***F59E0B", background: "***REMOVED***0a1a14", foreground: "***REMOVED***fafafa", muted: "***REMOVED***1a2a24", border: "***REMOVED***2a3a34", card: "***REMOVED***15251f" },
  { name: "Sunset", mode: "light", primary: "***REMOVED***F97316", accent: "***REMOVED***EC4899", background: "***REMOVED***fffbeb", foreground: "***REMOVED***1c1917", muted: "***REMOVED***fef3c7", border: "***REMOVED***fde68a", card: "***REMOVED***ffffff" },
];

export function ThemeClient({ themes, canWrite }: Props) {
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mode: "dark",
    primary: "***REMOVED***136DFF",
    accent: "***REMOVED***FF53A9",
    background: "***REMOVED***0a0a0f",
    foreground: "***REMOVED***fafafa",
    muted: "***REMOVED***1a1a25",
    border: "***REMOVED***2a2a35",
    card: "***REMOVED***15151f",
    isActive: false,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name) return toast.error("Name is required");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Theme created");
        setCreating(false);
        window.location.reload();
      } else {
        toast.error("Failed");
      }
    } finally {
      setSaving(false);
    }
  };

  const activate = async (id: string) => {
    const res = await fetch(`/api/admin/themes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: true }),
    });
    if (res.ok) {
      toast.success("Theme activated");
      window.location.reload();
    }
  };

  const applyPreset = (preset: typeof PRESET_THEMES[0]) => {
    setForm({
      ...form,
      name: preset.name,
      mode: preset.mode,
      primary: preset.primary,
      accent: preset.accent,
      background: preset.background,
      foreground: preset.foreground,
      muted: preset.muted,
      border: preset.border,
      card: preset.card,
    });
  };

  const previewWidth = previewDevice === "mobile" ? "w-[375px]" : previewDevice === "tablet" ? "w-[768px]" : "w-full";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Theme Engine</h1>
          <p className="text-sm text-muted-foreground">
            Create, customize, and activate theme presets.
          </p>
        </div>
        {canWrite && (
          <button
            onClick={() => setCreating((v) => !v)}
            className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
          >
            <Plus className="size-4" /> New Theme
          </button>
        )}
      </div>

      {creating && (
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Create new theme</h3>

          <div className="mb-4 flex flex-wrap gap-2">
            {PRESET_THEMES.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-1.5 text-xs hover:border-brand-blue"
              >
                <span className="flex -space-x-1">
                  <span className="size-3 rounded-full" style={{ backgroundColor: p.primary }} />
                  <span className="size-3 rounded-full" style={{ backgroundColor: p.accent }} />
                  <span className="size-3 rounded-full" style={{ backgroundColor: p.background }} />
                </span>
                {p.name}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ColorField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} type="text" />
            <ColorField label="Mode" value={form.mode} onChange={(v) => setForm({ ...form, mode: v })} type="select" options={["dark", "light"]} />
            <ColorField label="Primary" value={form.primary} onChange={(v) => setForm({ ...form, primary: v })} />
            <ColorField label="Accent" value={form.accent} onChange={(v) => setForm({ ...form, accent: v })} />
            <ColorField label="Background" value={form.background} onChange={(v) => setForm({ ...form, background: v })} />
            <ColorField label="Foreground" value={form.foreground} onChange={(v) => setForm({ ...form, foreground: v })} />
            <ColorField label="Muted" value={form.muted} onChange={(v) => setForm({ ...form, muted: v })} />
            <ColorField label="Border" value={form.border} onChange={(v) => setForm({ ...form, border: v })} />
            <ColorField label="Card" value={form.card} onChange={(v) => setForm({ ...form, card: v })} />
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Set as active theme
          </label>

          {/* Preview */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Live preview</span>
              <div className="flex gap-1 rounded-md border border-border/60 p-0.5">
                {(["mobile", "tablet", "desktop"] as const).map((d) => {
                  const Icon = d === "mobile" ? Smartphone : d === "tablet" ? Tablet : Monitor;
                  return (
                    <button
                      key={d}
                      onClick={() => setPreviewDevice(d)}
                      className={`rounded p-1.5 ${previewDevice === d ? "bg-brand-blue text-white" : "text-muted-foreground"}`}
                    >
                      <Icon className="size-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={`mx-auto ${previewWidth} overflow-hidden rounded-xl border`} style={{ backgroundColor: form.background, color: form.foreground, borderColor: form.border }}>
              <div className="flex items-center justify-between p-4" style={{ backgroundColor: form.card, borderBottom: `1px solid ${form.border}` }}>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded" style={{ background: `linear-gradient(135deg, ${form.primary}, ${form.accent})` }} />
                  <span className="text-sm font-semibold">Preview Site</span>
                </div>
                <button
                  className="rounded-md px-3 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: form.primary }}
                >
                  Get started
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold">Welcome to your site</h2>
                <p className="mt-2 text-sm" style={{ color: form.muted }}>This is what your typography looks like in this theme.</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg p-3" style={{ backgroundColor: form.card, border: `1px solid ${form.border}` }}>
                    <div className="text-xs" style={{ color: form.muted }}>Stat 1</div>
                    <div className="text-lg font-bold" style={{ color: form.accent }}>120+</div>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: form.card, border: `1px solid ${form.border}` }}>
                    <div className="text-xs" style={{ color: form.muted }}>Stat 2</div>
                    <div className="text-lg font-bold" style={{ color: form.primary }}>80+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setCreating(false)} className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save theme
            </button>
          </div>
        </Card>
      )}

      {/* Themes grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((t) => (
          <Card key={t.id} className="overflow-hidden p-0">
            <div className="h-32" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})` }} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <span className="text-xs text-muted-foreground">{t.mode}</span>
                </div>
                {t.isActive ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                    <Check className="size-3" /> Active
                  </span>
                ) : (
                  canWrite && (
                    <button
                      onClick={() => activate(t.id)}
                      className="rounded-md border border-border/60 px-3 py-1 text-xs hover:bg-muted"
                    >
                      Activate
                    </button>
                  )
                )}
              </div>
              <div className="mt-3 flex gap-1">
                {[t.primary, t.accent, t.background, t.foreground, t.muted].map((c, i) => (
                  <div
                    key={i}
                    className="size-6 rounded border border-border/40"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
  type = "color",
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "color" | "text" | "select";
  options?: string[];
}) {
  return (
    <div>
      <label className="text-[10px] uppercase text-muted-foreground">{label}</label>
      <div className="mt-1 flex items-center gap-2">
        {type === "color" && (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="size-9 rounded border border-border/60"
          />
        )}
        {type === "select" && options ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
          >
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
          />
        )}
      </div>
    </div>
  );
}
