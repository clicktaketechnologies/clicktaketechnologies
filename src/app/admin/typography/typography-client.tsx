"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Type, Save, RefreshCw, Loader2, Eye, Search } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type TypographyRow = {
  element: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontSource: string;
  fontFileUrl: string;
};

type Preset = { id: string; name: string; description: string; isBuiltin: boolean };

type Props = {
  typography: TypographyRow[];
  presets: Preset[];
  elementLabels: Record<string, string>;
  canWrite: boolean;
};

const FONT_OPTIONS = [
  "Inter", "Geist", "Plus Jakarta Sans", "Outfit", "Space Grotesk",
  "Sora", "Manrope", "DM Sans", "Poppins", "Roboto", "Open Sans",
  "Lato", "Montserrat", "Raleway", "Nunito", "Source Sans 3",
  "Playfair Display", "Lora", "Merriweather", "Source Serif 4",
  "JetBrains Mono", "Fira Code", "Source Code Pro", "IBM Plex Mono",
];

export function TypographyClient({ typography, presets, elementLabels, canWrite }: Props) {
  const [rows, setRows] = useState<Record<string, TypographyRow>>(() => {
    const init: Record<string, TypographyRow> = {};
    for (const t of typography) init[t.element] = t;
    return init;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const update = (element: string, patch: Partial<TypographyRow>) => {
    setRows((prev) => {
      const existing = prev[element] || {
        element,
        fontFamily: "Inter",
        fontWeight: "400",
        fontSize: "",
        lineHeight: "",
        letterSpacing: "",
        fontSource: "system",
        fontFileUrl: "",
      };
      return { ...prev, [element]: { ...existing, ...patch } };
    });
  };

  const save = async (element: string) => {
    const row = rows[element];
    if (!row) return;
    setSaving(element);
    try {
      const res = await fetch("/api/admin/typography", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      if (res.ok) toast.success(`${elementLabels[element] || element} saved`);
      else toast.error("Failed to save");
    } finally {
      setSaving(null);
    }
  };

  const filteredElements = Object.keys(elementLabels).filter((e) =>
    e.toLowerCase().includes(search.toLowerCase()) ||
    elementLabels[e].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Typography Engine</h1>
        <p className="text-sm text-muted-foreground">
          Customize fonts for each UI element. Changes apply globally.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search elements..."
            className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue"
          />
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-sm hover:bg-muted"
        >
          <RefreshCw className="size-4" /> Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {filteredElements.map((element) => {
          const row = rows[element] || {
            element,
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "",
            lineHeight: "",
            letterSpacing: "",
            fontSource: "system",
            fontFileUrl: "",
          };
          return (
            <motion.div
              key={element}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{elementLabels[element]}</h3>
                    <code className="text-[10px] text-muted-foreground">{element}</code>
                  </div>
                  <div
                    className="rounded-md px-3 py-2 text-sm font-medium"
                    style={{
                      fontFamily: `"${row.fontFamily}", sans-serif`,
                      fontWeight: parseInt(row.fontWeight?.split(",")[0] || "400"),
                      fontSize: row.fontSize || undefined,
                      lineHeight: row.lineHeight || undefined,
                      letterSpacing: row.letterSpacing || undefined,
                    }}
                  >
                    {elementLabels[element]} preview
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Font family</label>
                    <select
                      value={row.fontFamily}
                      onChange={(e) => update(element, { fontFamily: e.target.value })}
                      disabled={!canWrite}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Weight</label>
                    <input
                      value={row.fontWeight}
                      onChange={(e) => update(element, { fontWeight: e.target.value })}
                      placeholder="400,500,700"
                      disabled={!canWrite}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Size</label>
                    <input
                      value={row.fontSize}
                      onChange={(e) => update(element, { fontSize: e.target.value })}
                      placeholder="16px / 1rem"
                      disabled={!canWrite}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Line height</label>
                    <input
                      value={row.lineHeight}
                      onChange={(e) => update(element, { lineHeight: e.target.value })}
                      placeholder="1.5"
                      disabled={!canWrite}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Letter spacing</label>
                    <input
                      value={row.letterSpacing}
                      onChange={(e) => update(element, { letterSpacing: e.target.value })}
                      placeholder="0.01em"
                      disabled={!canWrite}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground">Source</label>
                    <select
                      value={row.fontSource}
                      onChange={(e) => update(element, { fontSource: e.target.value })}
                      disabled={!canWrite}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue disabled:opacity-50"
                    >
                      <option value="system">System</option>
                      <option value="google">Google Fonts</option>
                      <option value="custom">Custom upload</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex items-end justify-end">
                    {canWrite && (
                      <button
                        onClick={() => save(element)}
                        disabled={saving === element}
                        className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
                      >
                        {saving === element ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
