"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Save, Plus, Trash2, Edit3, X, Loader2, ExternalLink, Search } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type Meta = {
  id: string;
  path: string;
  title: string | null;
  description: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  keywords: string[];
  noindex: boolean;
};

type Props = {
  metas: Meta[];
  sitemap: {
    baseUrl: string;
    includePages: boolean;
    includeServices: boolean;
    includeBlogs: boolean;
    includePortfolio: boolean;
    changefreq: string;
    priority: string;
  } | null;
  robots: {
    userAgent: string;
    allowAll: boolean;
    disallowPaths: string;
    sitemapUrl: string;
    crawlDelay: number | null;
  } | null;
  canWrite: boolean;
};

export function SeoClient({ metas, sitemap, robots, canWrite }: Props) {
  const [tab, setTab] = useState<"pages" | "sitemap" | "robots" | "programmatic">("pages");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Meta | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = metas.filter((m) => m.path.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">SEO & Analytics</h1>
        <p className="text-sm text-muted-foreground">Per-page meta tags, sitemap, and robots.txt configuration.</p>
      </div>

      <div className="flex w-fit rounded-lg border border-border/60 bg-card/40 p-1">
        {[
          { id: "pages", label: "Page Meta" },
          { id: "sitemap", label: "Sitemap" },
          { id: "robots", label: "Robots.txt" },
          { id: "programmatic", label: "Programmatic SEO" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`rounded-md px-4 py-1.5 text-sm transition-colors ${tab === t.id ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "pages" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search paths..." className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue" />
            </div>
            {canWrite && (
              <button onClick={() => setCreating(true)} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90">
                <Plus className="size-4" /> Add Meta
              </button>
            )}
          </div>

          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Path</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Keywords</th>
                  <th className="px-4 py-3">noindex</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3"><code className="text-xs text-brand-blue">{m.path}</code></td>
                    <td className="px-4 py-3 text-xs">{m.title || <span className="text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{m.keywords.length} tags</td>
                    <td className="px-4 py-3">
                      {m.noindex ? <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-500">noindex</span> : <span className="text-xs text-emerald-500">index</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {canWrite && (
                        <div className="flex justify-end gap-1">
                          <button onClick={() => setEditing(m)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                            <Edit3 className="size-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete meta for ${m.path}?`)) return;
                              try {
                                const res = await fetch("/api/admin/seo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete_meta", path: m.path }) });
                                if (!res.ok) {
                                  const d = await res.json().catch(() => ({}));
                                  toast.error(d.error || "Failed to delete");
                                  return;
                                }
                                toast.success("Deleted"); window.location.reload();
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
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === "sitemap" && <SitemapConfig initial={sitemap} canWrite={canWrite} />}
      {tab === "robots" && <RobotsConfig initial={robots} canWrite={canWrite} />}
      {tab === "programmatic" && <ProgrammaticSeoPanel />}

      <AnimatePresence>
        {(editing || creating) && (
          <MetaEditorModal
            meta={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSaved={() => { setEditing(null); setCreating(false); window.location.reload(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MetaEditorModal({ meta, onClose, onSaved }: { meta: Meta | null; onClose: () => void; onSaved: () => void }) {
  const [path, setPath] = useState(meta?.path || "/");
  const [title, setTitle] = useState(meta?.title || "");
  const [description, setDescription] = useState(meta?.description || "");
  const [canonicalUrl, setCanonicalUrl] = useState(meta?.canonicalUrl || "");
  const [ogImageUrl, setOgImageUrl] = useState(meta?.ogImageUrl || "");
  const [keywords, setKeywords] = useState((meta?.keywords || []).join(", "));
  const [noindex, setNoindex] = useState(meta?.noindex || false);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!path) return toast.error("Path is required");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert_meta",
          path, title, description, canonicalUrl, ogImageUrl,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          noindex,
        }),
      });
      if (res.ok) { toast.success("Saved"); onSaved(); }
      else toast.error("Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{meta ? "Edit meta" : "Add meta"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Path</label>
            <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="/about" disabled={!!meta} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Keywords (comma-separated)</label>
            <input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Canonical URL</label>
            <input value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">OG image URL</label>
            <input value={ogImageUrl} onChange={(e) => setOgImageUrl(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={noindex} onChange={(e) => setNoindex(e.target.checked)} />
            Set noindex (hide from search engines)
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted">Cancel</button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SitemapConfig({ initial, canWrite }: { initial: Props["sitemap"]; canWrite: boolean }) {
  const [form, setForm] = useState({
    baseUrl: initial?.baseUrl || "https://clicktaketech.com",
    includePages: initial?.includePages ?? true,
    includeServices: initial?.includeServices ?? true,
    includeBlogs: initial?.includeBlogs ?? true,
    includePortfolio: initial?.includePortfolio ?? true,
    changefreq: initial?.changefreq || "weekly",
    priority: initial?.priority || "0.7",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "update_sitemap", ...form }) });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        toast.error(d.error || "Failed to save sitemap config");
        return;
      }
      toast.success("Sitemap config saved");
    } catch {
      toast.error("Network error");
    } finally { setSaving(false); }
  };

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Sitemap configuration</h3>
        <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-brand-blue hover:underline">
          View sitemap.xml <ExternalLink className="size-3" />
        </a>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Base URL</label>
          <input value={form.baseUrl} onChange={(e) => setForm({ ...form, baseUrl: e.target.value })} disabled={!canWrite} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.includePages} onChange={(e) => setForm({ ...form, includePages: e.target.checked })} disabled={!canWrite} /> Include pages</label>
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.includeServices} onChange={(e) => setForm({ ...form, includeServices: e.target.checked })} disabled={!canWrite} /> Include services</label>
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.includeBlogs} onChange={(e) => setForm({ ...form, includeBlogs: e.target.checked })} disabled={!canWrite} /> Include blogs</label>
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={form.includePortfolio} onChange={(e) => setForm({ ...form, includePortfolio: e.target.checked })} disabled={!canWrite} /> Include portfolio</label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Change frequency</label>
            <select value={form.changefreq} onChange={(e) => setForm({ ...form, changefreq: e.target.value })} disabled={!canWrite} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50">
              {["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Priority</label>
            <input value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} disabled={!canWrite} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
          </div>
        </div>
        {canWrite && (
          <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
          </button>
        )}
      </div>
    </Card>
  );
}

function RobotsConfig({ initial, canWrite }: { initial: Props["robots"]; canWrite: boolean }) {
  const [form, setForm] = useState({
    userAgent: initial?.userAgent || "*",
    allowAll: initial?.allowAll ?? true,
    disallowPaths: initial?.disallowPaths || "/admin,/api",
    sitemapUrl: initial?.sitemapUrl || "https://clicktaketech.com/sitemap.xml",
    crawlDelay: initial?.crawlDelay || 0,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "update_robots", ...form }) });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        toast.error(d.error || "Failed to save robots config");
        return;
      }
      toast.success("Robots config saved");
    } catch {
      toast.error("Network error");
    } finally { setSaving(false); }
  };

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Robots.txt configuration</h3>
        <a href="/robots.txt" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-brand-blue hover:underline">
          View robots.txt <ExternalLink className="size-3" />
        </a>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">User-agent</label>
          <input value={form.userAgent} onChange={(e) => setForm({ ...form, userAgent: e.target.value })} disabled={!canWrite} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
        </div>
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={form.allowAll} onChange={(e) => setForm({ ...form, allowAll: e.target.checked })} disabled={!canWrite} /> Allow all crawlers
        </label>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Disallow paths (comma-separated)</label>
          <input value={form.disallowPaths} onChange={(e) => setForm({ ...form, disallowPaths: e.target.value })} disabled={!canWrite || form.allowAll} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Sitemap URL</label>
          <input value={form.sitemapUrl} onChange={(e) => setForm({ ...form, sitemapUrl: e.target.value })} disabled={!canWrite} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Crawl delay (seconds)</label>
          <input type="number" value={form.crawlDelay} onChange={(e) => setForm({ ...form, crawlDelay: parseInt(e.target.value) || 0 })} disabled={!canWrite} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue disabled:opacity-50" />
        </div>
        {canWrite && (
          <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
          </button>
        )}
      </div>
    </Card>
  );
}

// ─── Phase 3 #4 — Programmatic SEO status panel (read-only) ───────────────
//
// Displays live metrics about the programmatic SEO surface area:
//   - Total city × service page count
//   - Per-country breakdown
//   - Top priority cities (Tier 3)
//   - Sitemap inclusion check
//   - Link to /cities index
//
// Read-only by design — content is generated deterministically from
// /src/lib/seo/cities.ts. To add/remove a city, edit that file and
// redeploy.

function ProgrammaticSeoPanel() {
  // Static metrics — kept inline to avoid importing server-only code into
  // the client bundle. If you change cities.ts, update these counts too.
  const cities = [
    { name: "Birmingham", country: "United Kingdom", tier: 3, hasOffice: true, slug: "birmingham" },
    { name: "London", country: "United Kingdom", tier: 3, hasOffice: false, slug: "london" },
    { name: "Manchester", country: "United Kingdom", tier: 2, hasOffice: false, slug: "manchester" },
    { name: "Leeds", country: "United Kingdom", tier: 2, hasOffice: false, slug: "leeds" },
    { name: "Multan", country: "Pakistan", tier: 3, hasOffice: true, slug: "multan" },
    { name: "Lahore", country: "Pakistan", tier: 3, hasOffice: false, slug: "lahore" },
    { name: "Karachi", country: "Pakistan", tier: 3, hasOffice: false, slug: "karachi" },
    { name: "Islamabad", country: "Pakistan", tier: 2, hasOffice: false, slug: "islamabad" },
    { name: "Austin", country: "United States", tier: 3, hasOffice: true, slug: "austin" },
    { name: "New York", country: "United States", tier: 3, hasOffice: false, slug: "new-york" },
    { name: "San Francisco", country: "United States", tier: 3, hasOffice: false, slug: "san-francisco" },
    { name: "Dubai", country: "United Arab Emirates", tier: 3, hasOffice: true, slug: "dubai" },
    { name: "Abu Dhabi", country: "United Arab Emirates", tier: 2, hasOffice: false, slug: "abu-dhabi" },
  ];
  const serviceCount = 24; // SERVICES.length minus starter-kit
  const totalCityPages = cities.length + cities.length * serviceCount; // hubs + city × service

  const byCountry = cities.reduce<Record<string, number>>((acc, c) => {
    acc[c.country] = (acc[c.country] || 0) + 1;
    return acc;
  }, {});

  const tier3Cities = cities.filter((c) => c.tier === 3);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-semibold">Programmatic SEO — City × Service</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Phase 3 #4 — generates {totalCityPages} location-targeted landing pages ({cities.length} city hubs + {cities.length * serviceCount} city × service pages).
              Pages are statically generated at build time using the LLM-authored service content (Phase 3 #2) plus a deterministic city composer — no per-request LLM calls.
            </p>
          </div>
          <a
            href="/cities"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-1.5 text-sm font-medium hover:bg-muted/40"
          >
            <ExternalLink className="size-4" /> View /cities
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="Total pages" value={totalCityPages.toLocaleString()} hint={`${cities.length} cities × ${serviceCount} services`} />
          <Stat label="City hubs" value={cities.length.toString()} hint="One per city" />
          <Stat label="City × service" value={(cities.length * serviceCount).toLocaleString()} hint="Long-tail SEO" />
          <Stat label="Tier 3 (high)" value={tier3Cities.length.toString()} hint="Highest priority" />
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Cities by country
        </h4>
        <div className="space-y-3">
          {Object.entries(byCountry).map(([country, count]) => (
            <div key={country} className="flex items-center justify-between">
              <span className="text-sm font-medium">{country}</span>
              <span className="text-sm text-muted-foreground">
                {count} cities · {count * serviceCount + count} pages
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Top-priority cities (Tier 3 — high search volume)
        </h4>
        <div className="flex flex-wrap gap-2">
          {tier3Cities.map((c) => (
            <a
              key={c.slug}
              href={`/cities/${c.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium hover:border-brand-blue/40 hover:bg-brand-blue/5"
            >
              {c.name}
              {c.hasOffice && (
                <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] text-emerald-500">
                  Office
                </span>
              )}
            </a>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-muted/20">
        <h4 className="text-sm font-semibold mb-2">How it works</h4>
        <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
          <li>
            City database lives in <code className="text-xs bg-muted px-1.5 py-0.5 rounded">src/lib/seo/cities.ts</code> — edit to add/remove cities.
          </li>
          <li>
            Content composer in <code className="text-xs bg-muted px-1.5 py-0.5 rounded">src/lib/seo/city-service-content.ts</code> deterministically generates city-specific hero, intro (220-280 words), FAQ, and JSON-LD — no LLM at runtime.
          </li>
          <li>
            Pages are statically generated at build time via <code className="text-xs bg-muted px-1.5 py-0.5 rounded">generateStaticParams</code> in <code className="text-xs bg-muted px-1.5 py-0.5 rounded">/cities/[city]/[[...service]]/page.tsx</code>.
          </li>
          <li>
            Sitemap (<code className="text-xs bg-muted px-1.5 py-0.5 rounded">src/app/sitemap.ts</code>) emits all 325+ URLs with city-tier-based priorities.
          </li>
          <li>
            Canonical service pages link back to city variants (see <code className="text-xs bg-muted px-1.5 py-0.5 rounded">service-detail-page.tsx</code>) — reinforces Hub &amp; Spoke architecture.
          </li>
        </ol>
      </Card>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}
