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

  const filtered = services.filter(
    (s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.slug.includes(search.toLowerCase())
  );

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
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
          >
            <Plus className="size-4" /> Add Service
          </button>
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
                            const res = await fetch(`/api/admin/services/${s.id}`, { method: "DELETE" });
                            if (res.ok) { toast.success("Deleted"); window.location.reload(); }
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
            onClose={() => { setEditing(null); setCreating(false); }}
            onSaved={() => { setEditing(null); setCreating(false); window.location.reload(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceEditorModal({
  service,
  onClose,
  onSaved,
}: {
  service: Service | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [loading, setLoading] = useState(!!service);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"basic" | "content" | "pricing" | "faq">("basic");
  const [form, setForm] = useState<any>({
    slug: "", category: "web", categoryLabel: "", title: "", description: "",
    detailedDescription: "", iconName: "Sparkles", imageUrl: "", gradient: "",
    glow: "", eyebrow: "", items: [], results: [], differentiators: [],
    deliverables: [], faq: [], processSteps: [], pricingPackages: [],
    displayOrder: 0, isPublished: true,
  });

  useEffect(() => {
    if (!service) return;
    setLoading(true);
    fetch(`/api/admin/services/${service.id}`)
      .then((r) => r.json())
      .then((d) => setForm(d))
      .finally(() => setLoading(false));
  }, [service]);

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
          <h2 className="text-lg font-semibold">{service ? "Edit service" : "Create new service"}</h2>
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
