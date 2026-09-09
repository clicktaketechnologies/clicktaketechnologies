"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Search,
  X,
  Save,
  Loader2,
  GripVertical,
  Brain,
  Bot,
  Wand2,
  Eye,
  Server,
  Layers,
  Shield,
  Cloud,
  PenTool,
  Megaphone,
  TrendingUp,
  Palette,
  Video,
  Rocket,
  Sparkles,
  Wand,
  AlertTriangle,
  CheckCircle2,
  FileText,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type Service = {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  isPublished: boolean;
  displayOrder: number;
  updatedAt: string;
};

const ICON_MAP: Record<string, any> = {
  Brain, Bot, Wand2, Eye, Server, Layers, Shield, Cloud,
  PenTool, Megaphone, TrendingUp, Palette, Video, Rocket, Sparkles,
};

const CATEGORIES = [
  { value: "ai", label: "AI & Machine Learning", color: "#FF53A9" },
  { value: "web", label: "Web Development", color: "#136DFF" },
  { value: "marketing", label: "Digital Marketing", color: "#10B981" },
  { value: "creative", label: "Creative Services", color: "#F59E0B" },
  { value: "starter-kit", label: "Flagship Package", color: "#8B5CF6" },
];

type Props = { services: Service[]; canWrite: boolean };

export function ServicesClient({ services, canWrite }: Props) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrefill, setAiPrefill] = useState<any>(null);

  const filtered = services.filter(
    (s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.slug.includes(search.toLowerCase())
  );

  /** Called when the AI generator finishes — opens the standard editor pre-filled. */
  const handleAiApply = (form: any) => {
    setAiPrefill(form);
    setAiOpen(false);
    setCreating(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services & Packages</h1>
          <p className="text-sm text-muted-foreground">
            Manage your service catalog, pricing tiers, and deliverables.
          </p>
        </div>
        {canWrite && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAiOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-brand-pink/40 bg-brand-pink/10 px-4 py-2 text-sm font-medium text-brand-pink hover:bg-brand-pink/20"
              title="Generate a new service page using the Master Copywriting prompt"
            >
              <Wand className="size-4" /> Generate with AI
            </button>
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
            >
              <Plus className="size-4" /> Add Service
            </button>
          </div>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue"
        />
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const cat = CATEGORIES.find((c) => c.value === s.category);
              const Icon = ICON_MAP[s.iconName] || Package;
              return (
                <tr key={s.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex size-9 items-center justify-center rounded-lg text-white"
                        style={{ backgroundColor: cat?.color || "#136DFF" }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <div className="font-medium">{s.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{s.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: (cat?.color || "#136DFF") + "20", color: cat?.color || "#136DFF" }}
                    >
                      {cat?.label || s.category}
                    </span>
                  </td>
                  <td className="px-4 py-3"><code className="text-xs text-brand-blue">{s.slug}</code></td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${s.isPublished ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500"}`}>
                      {s.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">{s.displayOrder}</td>
                  <td className="px-4 py-3 text-right">
                    {canWrite && (
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setEditing(s)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                          <Edit3 className="size-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete "${s.title}"?`)) return;
                            try {
                              const res = await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" });
                              if (res.ok) { toast.success("Deleted"); window.location.reload(); }
                              else {
                                const d = await res.json().catch(() => ({}));
                                toast.error(d.error || "Failed to delete service");
                              }
                            } catch {
                              toast.error("Network error");
                            }
                          }}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <AnimatePresence>
        {(editing || creating) && (
          <ServiceEditorModal
            service={editing}
            prefill={aiPrefill}
            onClose={() => { setEditing(null); setCreating(false); setAiPrefill(null); }}
            onSaved={() => { setEditing(null); setCreating(false); setAiPrefill(null); window.location.reload(); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiOpen && (
          <AIServiceGeneratorModal
            onClose={() => setAiOpen(false)}
            onApply={handleAiApply}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceEditorModal({
  service,
  prefill,
  onClose,
  onSaved,
}: {
  service: Service | null;
  prefill?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [loading, setLoading] = useState(!!service && !prefill);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"basic" | "content" | "pricing" | "faq" | "deepDive">("basic");
  const [form, setForm] = useState<any>(prefill || {
    slug: "", category: "web", categoryLabel: "", title: "", description: "",
    detailedDescription: "", iconName: "Sparkles", imageUrl: "", gradient: "",
    glow: "", eyebrow: "", items: [], results: [], differentiators: [],
    deliverables: [], faq: [], processSteps: [], pricingPackages: [],
    displayOrder: 0, isPublished: true,
  });

  useEffect(() => {
    if (prefill) {
      // AI generator already filled the form — skip the fetch.
      setForm(prefill);
      return;
    }
    if (!service) return;
    setLoading(true);
    fetch(`/api/admin/services/${service.id}`)
      .then((r) => r.json())
      .then((d) => setForm(d))
      .finally(() => setLoading(false));
  }, [service, prefill]);

  const handleSave = async () => {
    if (!form.title || !form.slug) return toast.error("Title and slug are required");
    setSaving(true);
    try {
      const url = service ? `/api/admin/services/${service.id}` : "/api/admin/services";
      const method = service ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(service ? "Service updated" : "Service created");
        onSaved();
      } else {
        const d = await res.json();
        toast.error(d.error || "Failed");
      }
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "content", label: "Content" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
    ...(form.deepDive ? [{ id: "deepDive" as const, label: "Deep Dive (AI)" }] : []),
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{service ? "Edit service" : "Create new service"}</h2>
            {prefill && (
              <span className="flex items-center gap-1 rounded-full border border-brand-pink/40 bg-brand-pink/10 px-2 py-0.5 text-[10px] font-medium text-brand-pink">
                <Wand className="size-3" /> AI-generated draft — review before saving
              </span>
            )}
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
        ) : (
          <>
            <div className="mb-4 flex gap-1 border-b border-border/60">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`border-b-2 px-3 py-2 text-sm transition-colors ${
                    tab === t.id ? "border-brand-blue text-brand-blue" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "basic" && (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
                  <Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="ai/llm" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <SelectField
                    label="Category"
                    value={form.category}
                    onChange={(v) => setForm({ ...form, category: v })}
                    options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
                  />
                  <Field label="Icon" value={form.iconName} onChange={(v) => setForm({ ...form, iconName: v })} />
                  <Field label="Display order" type="number" value={String(form.displayOrder)} onChange={(v) => setForm({ ...form, displayOrder: parseInt(v) || 0 })} />
                </div>
                <Field label="Description (short)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
                <Field label="Eyebrow" value={form.eyebrow} onChange={(v) => setForm({ ...form, eyebrow: v })} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Gradient (Tailwind classes)" value={form.gradient} onChange={(v) => setForm({ ...form, gradient: v })} />
                  <Field label="Glow CSS" value={form.glow} onChange={(v) => setForm({ ...form, glow: v })} />
                </div>
                <Field label="Image URL" value={form.imageUrl} onChange={(v) => setForm({ ...form, imageUrl: v })} />
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                  Published
                </label>
              </div>
            )}

            {tab === "content" && (
              <div className="space-y-3">
                <TextArea label="Detailed description" value={form.detailedDescription} onChange={(v) => setForm({ ...form, detailedDescription: v })} rows={4} />
                <JsonListField
                  label="Items (bullet points)"
                  value={form.items}
                  onChange={(v) => setForm({ ...form, items: v })}
                  placeholder="e.g. Custom model fine-tuning"
                />
                <JsonListField
                  label="Deliverables"
                  value={form.deliverables}
                  onChange={(v) => setForm({ ...form, deliverables: v })}
                  placeholder="e.g. Production-ready model + evaluation report"
                />
                <JsonListField
                  label="Differentiators"
                  value={form.differentiators}
                  onChange={(v) => setForm({ ...form, differentiators: v })}
                  placeholder="e.g. Eval-driven development"
                />
                <JsonListField
                  label="Results (label : value)"
                  value={form.results}
                  onChange={(v) => setForm({ ...form, results: v })}
                  placeholder="e.g. 3x faster inference"
                  keyValue
                />
              </div>
            )}

            {tab === "pricing" && (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  Add up to 3 pricing tiers (Basic / Standard / Premium).
                </div>
                {(form.pricingPackages || []).map((p: any, i: number) => (
                  <div key={i} className="rounded-lg border border-border/60 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium">Tier {i + 1}</span>
                      <button
                        onClick={() => setForm({ ...form, pricingPackages: form.pricingPackages.filter((_: any, idx: number) => idx !== i) })}
                        className="rounded p-1 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <Field label="Level" value={p.package_level} onChange={(v) => { const arr = [...form.pricingPackages]; arr[i].package_level = v; setForm({ ...form, pricingPackages: arr }); }} />
                      <Field label="Price" value={p.price} onChange={(v) => { const arr = [...form.pricingPackages]; arr[i].price = v; setForm({ ...form, pricingPackages: arr }); }} />
                      <Field label="Delivery days" value={p.delivery_days} onChange={(v) => { const arr = [...form.pricingPackages]; arr[i].delivery_days = v; setForm({ ...form, pricingPackages: arr }); }} />
                      <Field label="Description" value={p.description} onChange={(v) => { const arr = [...form.pricingPackages]; arr[i].description = v; setForm({ ...form, pricingPackages: arr }); }} />
                    </div>
                    <Field
                      label="Features (one per line)"
                      value={(p.features || []).join("\n")}
                      onChange={(v) => { const arr = [...form.pricingPackages]; arr[i].features = v.split("\n").filter(Boolean); setForm({ ...form, pricingPackages: arr }); }}
                      multiline
                    />
                  </div>
                ))}
                <button
                  onClick={() => setForm({
                    ...form,
                    pricingPackages: [...(form.pricingPackages || []), { package_level: "Basic", price: "", delivery_days: "", description: "", features: [] }],
                  })}
                  className="flex items-center gap-2 rounded-lg border border-dashed border-border/60 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Plus className="size-4" /> Add tier
                </button>
              </div>
            )}

            {tab === "faq" && (
              <div className="space-y-3">
                {(form.faq || []).map((q: any, i: number) => (
                  <div key={i} className="rounded-lg border border-border/60 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium">Q{i + 1}</span>
                      <button
                        onClick={() => setForm({ ...form, faq: form.faq.filter((_: any, idx: number) => idx !== i) })}
                        className="rounded p-1 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                    <Field label="Question" value={q.q} onChange={(v) => { const arr = [...form.faq]; arr[i].q = v; setForm({ ...form, faq: arr }); }} />
                    <TextArea label="Answer" value={q.a} onChange={(v) => { const arr = [...form.faq]; arr[i].a = v; setForm({ ...form, faq: arr }); }} rows={2} />
                  </div>
                ))}
                <button
                  onClick={() => setForm({ ...form, faq: [...(form.faq || []), { q: "", a: "" }] })}
                  className="flex items-center gap-2 rounded-lg border border-dashed border-border/60 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Plus className="size-4" /> Add FAQ
                </button>
              </div>
            )}

            {tab === "deepDive" && form.deepDive && (
              <div className="space-y-3">
                <div className="rounded-lg border border-brand-pink/30 bg-brand-pink/5 p-3 text-xs text-muted-foreground">
                  This deep-dive content was generated by the Master Copywriting prompt. It will be
                  saved alongside the Service record and rendered by the deep-dive page template.
                  Edit individual fields below to refine before publishing.
                </div>
                <TextArea
                  label="GEO definition (3-sentence encyclopedic anchor)"
                  value={form.deepDive.geoDefinition || ""}
                  onChange={(v) => setForm({ ...form, deepDive: { ...form.deepDive, geoDefinition: v } })}
                  rows={3}
                />
                <TextArea
                  label="Hero subtitle (35-60 words)"
                  value={form.deepDive.heroSubtitle || ""}
                  onChange={(v) => setForm({ ...form, deepDive: { ...form.deepDive, heroSubtitle: v } })}
                  rows={3}
                />
                <div>
                  <label className="text-[10px] uppercase text-muted-foreground">
                    Internal links woven ({form.deepDive.internalLinks?.length || 0})
                  </label>
                  <div className="mt-1 space-y-1">
                    {(form.deepDive.internalLinks || []).map((link: any, i: number) => (
                      <div key={i} className="flex gap-2 rounded border border-border/60 bg-background/60 px-2 py-1 text-xs">
                        <span className="rounded bg-brand-pink/10 px-1.5 py-0.5 text-[10px] text-brand-pink">{link.type}</span>
                        <span className="flex-1">{link.anchorText}</span>
                        <span className="text-muted-foreground">→ {link.href}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <details className="rounded-lg border border-border/60 p-3">
                  <summary className="cursor-pointer text-xs font-medium">Raw deep-dive JSON (read-only)</summary>
                  <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap text-[10px] leading-relaxed text-muted-foreground">
                    {JSON.stringify(form.deepDive, null, 2)}
                  </pre>
                </details>
              </div>
            )}

            <div className="mt-5 flex justify-end gap-2 border-t border-border/60 pt-4">
              <button onClick={onClose} className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {service ? "Save changes" : "Create service"}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", multiline,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; multiline?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase text-muted-foreground">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
      )}
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="text-[10px] uppercase text-muted-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="text-[10px] uppercase text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function JsonListField({
  label, value, onChange, placeholder, keyValue,
}: {
  label: string; value: any[]; onChange: (v: any[]) => void; placeholder?: string; keyValue?: boolean;
}) {
  if (keyValue) {
    return (
      <div>
        <label className="text-[10px] uppercase text-muted-foreground">{label}</label>
        <div className="mt-1 space-y-1">
          {(value || []).map((item: any, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                value={item.label || ""}
                onChange={(e) => { const arr = [...value]; arr[i] = { ...arr[i], label: e.target.value }; onChange(arr); }}
                placeholder="Label"
                className="flex-1 rounded border border-border/60 bg-background/60 px-2 py-1 text-xs"
              />
              <input
                value={item.value || ""}
                onChange={(e) => { const arr = [...value]; arr[i] = { ...arr[i], value: e.target.value }; onChange(arr); }}
                placeholder="Value"
                className="flex-1 rounded border border-border/60 bg-background/60 px-2 py-1 text-xs"
              />
              <button onClick={() => onChange(value.filter((_: any, idx: number) => idx !== i))} className="rounded p-1 hover:bg-red-500/10 hover:text-red-500">
                <X className="size-3" />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange([...(value || []), { label: "", value: "" }])}
            className="flex items-center gap-1 rounded border border-dashed border-border/60 px-2 py-1 text-xs hover:bg-muted"
          >
            <Plus className="size-3" /> Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-[10px] uppercase text-muted-foreground">{label}</label>
      <div className="mt-1">
        <textarea
          value={(value || []).join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n").filter(Boolean))}
          placeholder={placeholder ? `One per line\n${placeholder}` : "One per line"}
          rows={3}
          className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Phase 3 #2 — In-Admin LLM Page Creation
// AIServiceGeneratorModal: brief form → calls /api/admin/services/generate →
// shows QA report + JSON preview → "Apply to editor" hands off the form to
// ServiceEditorModal for final review and save.
// ═══════════════════════════════════════════════════════════════════════════

const ICON_OPTIONS = [
  "Brain", "Bot", "Wand2", "Eye", "Server", "Layers", "Shield", "Cloud",
  "PenTool", "Megaphone", "TrendingUp", "Palette", "Video", "Rocket", "Sparkles",
];

type Stage = "brief" | "generating" | "review";

function AIServiceGeneratorModal({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (form: any) => void;
}) {
  const [stage, setStage] = useState<Stage>("brief");
  const [error, setError] = useState<string | null>(null);
  const [qa, setQa] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [previewTab, setPreviewTab] = useState<"qa" | "hero" | "deepDive" | "faq" | "raw">("qa");

  const [brief, setBrief] = useState<any>({
    slug: "",
    title: "",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    iconName: "Brain",
    coreConceptDefinition: "",
    keyTechnologies: "",
    primaryUseCases: ["", "", ""],
    differentiators: "",
    caseStudies: [],
    metricsToDisclose: "",
    targetReader: { role: "", companySize: "", pain: "", buyingTrigger: "" },
    siblingSlugsToLink: [],
    solutionSlugToLink: "",
    resourceTitles: [],
    pricingHint: "",
  });

  const handleGenerate = async () => {
    setStage("generating");
    setError(null);
    try {
      // Sanitize primaryUseCases + sibling slugs.
      const payload = {
        ...brief,
        primaryUseCases: brief.primaryUseCases.filter((u: string) => u.trim()),
        siblingSlugsToLink: brief.siblingSlugsToLink.filter((s: string) => s.trim()),
        resourceTitles: brief.resourceTitles.filter((s: string) => s.trim()),
      };
      const res = await fetch("/api/admin/services/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Generation failed (HTTP ${res.status})`);
        setStage("brief");
        return;
      }
      setResult(data.form);
      setQa(data.qa);
      setMeta(data.meta);
      setStage("review");
      setPreviewTab("qa");
      toast.success(`Generated ${data.form.title} — ${data.qa.pass ? "QA passed" : "QA needs review"}`);
    } catch (err: any) {
      setError(err.message || "Network error during generation");
      setStage("brief");
    }
  };

  const handleRevalidate = async () => {
    if (!result) return;
    try {
      const res = await fetch("/api/admin/services/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Re-validation failed");
        return;
      }
      setQa(data.qa);
      toast.success(data.qa.pass ? "QA passed" : "QA still has issues — see report");
    } catch (err: any) {
      toast.error(err.message || "Network error during re-validation");
    }
  };

  const handleApply = () => {
    if (!result) return;
    // Strip the deepDive + qa fields before handing to the standard editor
    // (those are stored alongside the Service record, not directly in it).
    onApply(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand className="size-5 text-brand-pink" />
            <h2 className="text-lg font-semibold">Generate Service Page with AI</h2>
            {stage === "review" && (
              <span className="rounded-full border border-brand-pink/40 bg-brand-pink/10 px-2 py-0.5 text-[10px] font-medium text-brand-pink">
                Master Copywriting prompt v1.0
              </span>
            )}
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <div>
              <div className="font-medium">Generation error</div>
              <div className="mt-1 text-xs opacity-90">{error}</div>
            </div>
          </div>
        )}

        {stage === "brief" && (
          <BriefForm brief={brief} setBrief={setBrief} onGenerate={handleGenerate} />
        )}

        {stage === "generating" && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="size-10 animate-spin text-brand-pink" />
            <div className="mt-4 text-sm text-muted-foreground">
              Calling Master Copywriting prompt… this can take 60–120 seconds for long-form output.
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              The LLM is generating all 12 sections, weaving internal links, and self-reporting QA.
            </div>
          </div>
        )}

        {stage === "review" && result && qa && (
          <>
            {/* Top meta row */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricStat label="Word count" value={qa.wordCount} good={qa.wordCount >= 2500} />
              <MetricStat label="Internal links" value={qa.internalLinksCount} good={qa.internalLinksCount >= 4 && qa.internalLinksCount <= 7} />
              <MetricStat label="Case studies" value={qa.caseStudiesCount} good={qa.caseStudiesCount >= 1} />
              <MetricStat label="FAQ count" value={qa.faqCount} good={qa.faqCount >= 12} />
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {meta && (
                <>
                  <span>Tokens in: {meta.tokensIn.toLocaleString()}</span>
                  <span>Tokens out: {meta.tokensOut.toLocaleString()}</span>
                  <span>Elapsed: {(meta.elapsedMs / 1000).toFixed(1)}s</span>
                </>
              )}
              <span className={`flex items-center gap-1 font-medium ${qa.pass ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>
                {qa.pass ? <CheckCircle2 className="size-3" /> : <AlertTriangle className="size-3" />}
                {qa.pass ? "QA passed" : `${qa.errors.length} error(s), ${qa.warnings.length} warning(s)`}
              </span>
            </div>

            {/* Preview tabs */}
            <div className="mb-3 flex flex-wrap gap-1 border-b border-border/60">
              {[
                { id: "qa", label: "QA Report" },
                { id: "hero", label: "Hero / Problem" },
                { id: "deepDive", label: "Deep Dive" },
                { id: "faq", label: "FAQ" },
                { id: "raw", label: "Raw JSON" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPreviewTab(t.id as any)}
                  className={`border-b-2 px-3 py-2 text-sm transition-colors ${
                    previewTab === t.id ? "border-brand-pink text-brand-pink" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="max-h-[55vh] overflow-y-auto rounded-lg border border-border/60 bg-background/40 p-4 text-sm">
              {previewTab === "qa" && <QaReport qa={qa} />}
              {previewTab === "hero" && <HeroPreview form={result} />}
              {previewTab === "deepDive" && <DeepDivePreview form={result} />}
              {previewTab === "faq" && <FaqPreview form={result} />}
              {previewTab === "raw" && (
                <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap text-[11px] leading-relaxed text-muted-foreground">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-border/60 pt-4">
              <button
                onClick={() => { setStage("brief"); setResult(null); setQa(null); }}
                className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted"
              >
                <RotateCcw className="size-4" /> Start over
              </button>
              <button
                onClick={handleRevalidate}
                className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted"
              >
                <CheckCircle2 className="size-4" /> Re-validate
              </button>
              <button
                onClick={handleApply}
                disabled={!result}
                className="flex items-center gap-2 rounded-lg bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 disabled:opacity-50"
              >
                <FileText className="size-4" /> Apply to editor
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Brief Form ─────────────────────────────────────────────────────────────

function BriefForm({
  brief, setBrief, onGenerate,
}: {
  brief: any; setBrief: (b: any) => void; onGenerate: () => void;
}) {
  const update = (patch: any) => setBrief({ ...brief, ...patch });
  const updateReader = (patch: any) => setBrief({ ...brief, targetReader: { ...brief.targetReader, ...patch } });
  const updateUseCase = (i: number, v: string) => {
    const arr = [...brief.primaryUseCases]; arr[i] = v; update({ primaryUseCases: arr });
  };
  const addUseCase = () => update({ primaryUseCases: [...brief.primaryUseCases, ""] });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-brand-pink/30 bg-brand-pink/5 p-3 text-xs text-muted-foreground">
        <strong className="text-foreground">How this works:</strong> Fill in the brief below. The system
        wraps it in the Master Copywriting prompt (v1.0) and sends it to the LLM. The LLM returns a
        complete 12-section Ultimate Guide (~3,000 words) that you review, edit, and save as a Service
        record. Every generation is audit-logged.
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" value={brief.title} onChange={(v) => update({ title: v })} placeholder="e.g. Large Language Model Deployment" />
        <Field label="Slug" value={brief.slug} onChange={(v) => update({ slug: v })} placeholder="ai/llm" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <SelectField
          label="Category"
          value={brief.category}
          onChange={(v) => {
            const cat = CATEGORIES.find((c) => c.value === v);
            update({ category: v, categoryLabel: cat?.label || "", iconName: v === "ai" ? "Brain" : v === "web" ? "Server" : v === "marketing" ? "Megaphone" : v === "creative" ? "Palette" : "Rocket" });
          }}
          options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
        />
        <Field label="Category label" value={brief.categoryLabel} onChange={(v) => update({ categoryLabel: v })} />
        <SelectField
          label="Icon"
          value={brief.iconName}
          onChange={(v) => update({ iconName: v })}
          options={ICON_OPTIONS.map((i) => ({ value: i, label: i }))}
        />
      </div>

      <TextArea
        label="Core concept definition (anchors Section 3 GEO citation — 1-3 sentences)"
        value={brief.coreConceptDefinition}
        onChange={(v) => update({ coreConceptDefinition: v })}
        rows={2}
      />

      <Field
        label="Key technologies (comma-separated)"
        value={brief.keyTechnologies}
        onChange={(v) => update({ keyTechnologies: v })}
        placeholder="GPT-4o, Claude 3.5, vLLM, LangGraph"
      />

      <div>
        <label className="text-[10px] uppercase text-muted-foreground">Primary use cases (min 3)</label>
        <div className="mt-1 space-y-1">
          {brief.primaryUseCases.map((u: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                value={u}
                onChange={(e) => updateUseCase(i, e.target.value)}
                placeholder={`Use case ${i + 1}`}
                className="flex-1 rounded border border-border/60 bg-background/60 px-2 py-1.5 text-xs"
              />
              {brief.primaryUseCases.length > 3 && (
                <button
                  onClick={() => update({ primaryUseCases: brief.primaryUseCases.filter((_: any, idx: number) => idx !== i) })}
                  className="rounded p-1 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          ))}
          <button onClick={addUseCase} className="flex items-center gap-1 rounded border border-dashed border-border/60 px-2 py-1 text-xs hover:bg-muted">
            <Plus className="size-3" /> Add use case
          </button>
        </div>
      </div>

      <TextArea
        label="Differentiators vs alternatives (2-3 sentences)"
        value={brief.differentiators}
        onChange={(v) => update({ differentiators: v })}
        rows={2}
      />

      <div className="rounded-lg border border-border/60 p-3">
        <div className="mb-2 text-[10px] uppercase text-muted-foreground">Target reader</div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Role" value={brief.targetReader.role} onChange={(v) => updateReader({ role: v })} placeholder="CTO of a UK fintech" />
          <Field label="Company size" value={brief.targetReader.companySize} onChange={(v) => updateReader({ companySize: v })} placeholder="200-500 employees" />
        </div>
        <div className="mt-2">
          <Field label="Primary pain" value={brief.targetReader.pain} onChange={(v) => updateReader({ pain: v })} placeholder="They have an LLM pilot but no eval harness; hallucinations are bleeding into production" />
        </div>
        <div className="mt-2">
          <Field label="Buying trigger" value={brief.targetReader.buyingTrigger} onChange={(v) => updateReader({ buyingTrigger: v })} placeholder="A board meeting next month where they need to present a deployable plan" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Sibling slugs to link (comma-separated, same cluster)"
          value={brief.siblingSlugsToLink.join(", ")}
          onChange={(v) => update({ siblingSlugsToLink: v.split(",").map((s) => s.trim()).filter(Boolean) })}
          placeholder="ai/agents, ai/prompt-engineering, ai/chatbots"
        />
        <Field
          label="Solution slug to link (optional)"
          value={brief.solutionSlugToLink}
          onChange={(v) => update({ solutionSlugToLink: v })}
          placeholder="startups"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Metrics to disclose (optional)"
          value={brief.metricsToDisclose}
          onChange={(v) => update({ metricsToDisclose: v })}
          placeholder="92% citation accuracy, 200ms p95 latency"
        />
        <Field
          label="Pricing hint (optional)"
          value={brief.pricingHint}
          onChange={(v) => update({ pricingHint: v })}
          placeholder="From $5k — Premium tier at $25k"
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
        <button
          onClick={onGenerate}
          disabled={!brief.title || !brief.slug || !brief.coreConceptDefinition || brief.primaryUseCases.filter((u: string) => u.trim()).length < 3}
          className="flex items-center gap-2 rounded-lg bg-brand-pink px-5 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 disabled:opacity-40"
        >
          <Wand className="size-4" /> Generate page
        </button>
      </div>
    </div>
  );
}

// ─── QA Report ──────────────────────────────────────────────────────────────

function QaReport({ qa }: { qa: any }) {
  return (
    <div className="space-y-3 text-xs">
      <div className={`rounded-lg border p-3 ${qa.pass ? "border-green-500/40 bg-green-500/5" : "border-amber-500/40 bg-amber-500/5"}`}>
        <div className="flex items-center gap-2 font-medium">
          {qa.pass ? <CheckCircle2 className="size-4 text-green-600" /> : <AlertTriangle className="size-4 text-amber-600" />}
          {qa.pass ? "All hard checks passed." : `${qa.errors.length} blocking error(s) must be fixed before publishing.`}
        </div>
      </div>

      {qa.errors.length > 0 && (
        <div>
          <div className="mb-1 font-medium text-red-600 dark:text-red-400">Errors</div>
          <ul className="ml-4 list-disc space-y-0.5">
            {qa.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {qa.warnings.length > 0 && (
        <div>
          <div className="mb-1 font-medium text-amber-600 dark:text-amber-400">Warnings</div>
          <ul className="ml-4 list-disc space-y-0.5">
            {qa.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      <div>
        <div className="mb-1 font-medium">Section word counts</div>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {Object.entries(qa.sectionWordCounts).map(([section, words]: [string, any]) => (
            <div key={section} className="flex justify-between rounded bg-muted/40 px-2 py-1">
              <span className="text-muted-foreground">{section}</span>
              <span className="font-mono">{words}</span>
            </div>
          ))}
        </div>
      </div>

      {qa.longSentences.length > 0 && (
        <div>
          <div className="mb-1 font-medium">Long sentences (&gt; 28 words)</div>
          <ul className="ml-4 list-disc space-y-0.5">
            {qa.longSentences.map((s: any, i: number) => (
              <li key={i} className="italic text-muted-foreground">“{s.preview}” <span className="text-red-500">({s.words} words)</span></li>
            ))}
          </ul>
        </div>
      )}

      {qa.forbiddenPhrasesFound.length > 0 && (
        <div>
          <div className="mb-1 font-medium text-red-600 dark:text-red-400">Forbidden phrases detected</div>
          <div className="flex flex-wrap gap-1">
            {qa.forbiddenPhrasesFound.map((p: string, i: number) => (
              <span key={i} className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-600 dark:text-red-400">{p}</span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mb-1 font-medium">GEO checklist</div>
        <ul className="ml-4 list-disc space-y-0.5">
          <li>{qa.hasGeoDefinition ? "✓" : "✗"} Section 3 GEO definition (3 sentences)</li>
          <li>{qa.hasWhatIsQuestion ? "✓" : "✗"} FAQ includes "What is [concept]?" question</li>
          <li>{qa.hasClusterToPillarLink ? "✓" : "✗"} Cluster-to-Pillar link in first 200 words</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Preview components ─────────────────────────────────────────────────────

function HeroPreview({ form }: { form: any }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">Eyebrow</div>
        <div className="text-sm">{form.eyebrow}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">Title</div>
        <div className="text-lg font-semibold">{form.title}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">Hero subtitle</div>
        <div className="text-sm">{form.deepDive?.heroSubtitle}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">GEO definition (Section 3 anchor)</div>
        <div className="rounded border-l-2 border-brand-pink/60 bg-brand-pink/5 p-2 text-sm italic">
          {form.deepDive?.geoDefinition}
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">Problem — pain points</div>
        <ul className="ml-4 list-disc space-y-1 text-xs">
          {(form.deepDive?.problem?.painPoints || []).map((p: any, i: number) => (
            <li key={i}><strong>{p.title}:</strong> {p.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DeepDivePreview({ form }: { form: any }) {
  const dd = form.deepDive?.deepDive;
  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] uppercase text-muted-foreground">Intro</div>
        <div className="space-y-2 text-sm">{dd?.intro?.map((p: string, i: number) => <p key={i}>{p}</p>)}</div>
      </div>
      {(dd?.subsections || []).map((s: any, i: number) => (
        <div key={i}>
          <div className="text-sm font-semibold">{s.heading}</div>
          <div className="space-y-1 text-xs text-muted-foreground">{s.body?.map((p: string, j: number) => <p key={j}>{p}</p>)}</div>
        </div>
      ))}
    </div>
  );
}

function FaqPreview({ form }: { form: any }) {
  const cats = form.deepDive?.faq?.categories || [];
  return (
    <div className="space-y-3">
      {cats.map((c: any, i: number) => (
        <div key={i}>
          <div className="text-sm font-semibold text-brand-pink">{c.name}</div>
          <div className="mt-1 space-y-2">
            {(c.questions || []).map((q: any, j: number) => (
              <div key={j} className="rounded border border-border/40 p-2">
                <div className="text-xs font-medium">{q.q}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{q.a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MetricStat({ label, value, good }: { label: string; value: number; good: boolean }) {
  return (
    <div className="rounded-lg border border-border/60 p-2">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-semibold">{value}</span>
        <span className={good ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}>
          {good ? "✓" : "!"}
        </span>
      </div>
    </div>
  );
}
