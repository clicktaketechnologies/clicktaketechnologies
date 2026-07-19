"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Search,
  X,
  Save,
  Globe,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type Page = {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  metaTitle: string | null;
  updatedAt: string;
  createdAt: string;
};

type Props = {
  pages: Page[];
  canWrite: boolean;
};

export function CmsClient({ pages, canWrite }: Props) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Page | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CMS — Pages</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage dynamic content pages.
          </p>
        </div>
        {canWrite && (
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
          >
            <Plus className="size-4" />
            New Page
          </button>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pages..."
          className="w-full rounded-lg border border-border/60 bg-background/60 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue"
        />
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  <FileText className="mx-auto mb-2 size-8 opacity-40" />
                  No pages yet. Click &quot;New Page&quot; to create one.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-brand-blue">/{p.slug}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        p.isPublished
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-amber-500/15 text-amber-500"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {p.isPublished && (
                        <a
                          href={`/${p.slug === "home" ? "" : p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          title="View on site"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      {canWrite && (
                        <>
                          <button
                            onClick={() => setEditing(p)}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Edit"
                          >
                            <Edit3 className="size-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete "${p.title}"?`)) return;
                              const res = await fetch(`/api/admin/pages/${p.id}`, { method: "DELETE" });
                              if (res.ok) {
                                toast.success("Page deleted");
                                window.location.reload();
                              } else {
                                toast.error("Failed to delete");
                              }
                            }}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <AnimatePresence>
        {(editing || creating) && (
          <PageEditorModal
            page={editing}
            onClose={() => {
              setEditing(null);
              setCreating(false);
            }}
            onSaved={() => {
              setEditing(null);
              setCreating(false);
              window.location.reload();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PageEditorModal({
  page,
  onClose,
  onSaved,
}: {
  page: Page | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [loading, setLoading] = useState(!!page);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [showSeo, setShowSeo] = useState(false);

  useEffect(() => {
    if (!page) return;
    setLoading(true);
    fetch(`/api/admin/pages/${page.id}`)
      .then((r) => r.json())
      .then((d) => {
        setTitle(d.title || "");
        setSlug(d.slug || "");
        setContent(d.content || "");
        setIsPublished(d.isPublished || false);
        setMetaTitle(d.metaTitle || "");
        setMetaDescription(d.metaDescription || "");
        setCanonicalUrl(d.canonicalUrl || "");
        setOgImageUrl(d.ogImageUrl || "");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handleSave = async () => {
    if (!title || !slug) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      const url = page ? `/api/admin/pages/${page.id}` : "/api/admin/pages";
      const method = page ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          isPublished,
          metaTitle,
          metaDescription,
          canonicalUrl,
          ogImageUrl,
        }),
      });
      if (res.ok) {
        toast.success(page ? "Page updated" : "Page created");
        onSaved();
      } else {
        const d = await res.json();
        toast.error(d.error || "Failed");
      }
    } finally {
      setSaving(false);
    }
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
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {page ? "Edit page" : "Create new page"}
          </h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted">
            <X className="size-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Slug</label>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">/</span>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="about-us"
                    className="flex-1 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground">Content</label>
              <div className="mt-1">
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            <button
              onClick={() => setShowSeo((v) => !v)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <Globe className="size-3.5" />
              {showSeo ? "Hide" : "Show"} SEO settings
            </button>

            {showSeo && (
              <div className="space-y-3 rounded-lg border border-border/60 p-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Meta title</label>
                  <input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Meta description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Canonical URL</label>
                    <input
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">OG image URL</label>
                    <input
                      value={ogImageUrl}
                      onChange={(e) => setOgImageUrl(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
                    />
                  </div>
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setIsPublished((v) => !v)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${
                  isPublished
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isPublished ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                {isPublished ? "Published" : "Draft"}
              </button>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {page ? "Save changes" : "Create page"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
