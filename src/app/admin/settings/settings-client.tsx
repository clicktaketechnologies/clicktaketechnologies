"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, Loader2, Palette, Mail, Globe, Share2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type SettingField = { key: string; label: string; type: "text" | "color" | "textarea"; default: string };
type SettingGroup = { name: string; icon: string; settings: SettingField[] };

type Props = { settings: Record<string, string>; groups: SettingGroup[] };

const ICON_MAP: Record<string, any> = { Palette, Mail, Globe, Share2 };

export function SettingsClient({ settings, groups }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const g of groups) for (const s of g.settings) init[s.key] = settings[s.key] ?? s.default;
    return init;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  const save = async (key: string) => {
    setSaving(key);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: values[key] }),
      });
      if (res.ok) {
        toast.success(`${key} saved`);
        setSavedKeys((prev) => new Set(prev).add(key));
      } else toast.error("Failed");
    } finally {
      setSaving(null);
    }
  };

  const reset = (field: SettingField) => {
    setValues((prev) => ({ ...prev, [field.key]: field.default }));
    toast.info(`Reset ${field.key} to default`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Config Settings</h1>
        <p className="text-sm text-muted-foreground">Brand, contact, SEO, and social media configuration.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group, i) => {
          const Icon = ICON_MAP[group.icon] || Settings;
          return (
            <motion.div key={group.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold">{group.name}</h3>
                </div>
                <div className="space-y-3">
                  {group.settings.map((field) => (
                    <div key={field.key}>
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground">{field.label}</label>
                        <button onClick={() => reset(field)} className="text-[10px] text-muted-foreground hover:text-foreground" title="Reset to default">
                          <RotateCcw className="size-3" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        {field.type === "color" ? (
                          <input type="color" value={values[field.key]} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} className="size-9 rounded border border-border/60" />
                        ) : null}
                        <input
                          value={values[field.key]}
                          onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                          className="flex-1 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
                        />
                        <button
                          onClick={() => save(field.key)}
                          disabled={saving === field.key}
                          className="rounded-md bg-brand-blue/10 p-1.5 text-brand-blue hover:bg-brand-blue/20 disabled:opacity-50"
                          title="Save"
                        >
                          {saving === field.key ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
