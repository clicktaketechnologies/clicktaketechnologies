"use client";

import { useState, useEffect, useRef } from "react";
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
  Upload,
  FileUp,
  FileText as FileMarkdown,
  FileSpreadsheet,
  FileText as FilePdf,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

type Props = {
  posts: Post[];
  categories: string[];
  canWrite: boolean;
};

export function BlogClient({ posts, categories, canWrite }: Props) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === "all" || p.category === filterCat;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && p.isPublished) ||
      (filterStatus === "draft" && !p.isPublished);
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-[var(--cta-muted)]">
            Create, edit and publish articles. Supports bulk upload from Markdown, CSV and PDF files.
          </p>
        </div>
        {canWrite && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setUploading(true)}
              className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--cta-text)] hover:bg-white/10 transition"
            >
              <Upload className="size-4" />
              Upload Files
            </button>
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 transition"
            >
              <Plus className="size-4" />
              New Post
            </button>
          </div>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-md flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--cta-muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-3 text-sm text-[var(--cta-text)] outline-none focus:border-brand-blue"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--cta-text)] outline-none focus:border-brand-blue"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[var(--cta-text)] outline-none focus:border-brand-blue"
        >
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <span className="text-xs text-[var(--cta-muted)] ml-auto">
          {filtered.length} of {posts.length} posts
        </span>
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wider text-[var(--cta-muted)]">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-[var(--cta-muted)]">
                  <FileText className="mx-auto mb-2 size-8 opacity-40" />
                  No posts yet. Click &quot;New Post&quot; to create one, or &quot;Upload Files&quot; to bulk-import from .md / .csv / .pdf.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--cta-text)]">{p.title}</div>
                    <div className="text-xs text-[var(--cta-muted)]">/blog/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-[var(--cta-text)]">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        p.isPublished
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-amber-500/15 text-amber-400"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--cta-muted)]">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {p.isPublished && (
                        <a
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md p-1.5 text-[var(--cta-muted)] hover:bg-white/10 hover:text-[var(--cta-text)]"
                          title="View on site"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      {canWrite && (
                        <>
                          <button
                            onClick={() => setEditing(p)}
                            className="rounded-md p-1.5 text-[var(--cta-muted)] hover:bg-white/10 hover:text-[var(--cta-text)]"
                            title="Edit"
                          >
                            <Edit3 className="size-3.5" />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
                              const res = await fetch(`/api/admin/blog/${p.id}`, {
                                method: "DELETE",
                              });
                              if (res.ok) {
                                toast.success("Post deleted");
                                window.location.reload();
                              } else {
                                toast.error("Failed to delete");
                              }
                            }}
                            className="rounded-md p-1.5 text-[var(--cta-muted)] hover:bg-red-500/10 hover:text-red-400"
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
          <PostEditorModal
            post={editing}
            categories={categories}
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

      <AnimatePresence>
        {uploading && (
          <UploadModal
            categories={categories}
            onClose={() => setUploading(false)}
            onDone={() => {
              setUploading(false);
              window.location.reload();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Editor Modal ──────────────────────────────────────────────────────────

function PostEditorModal({
  post,
  categories,
  onClose,
  onSaved,
}: {
  post: Post | null;
  categories: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [loading, setLoading] = useState(!!post);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0] || "General");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");
  const [showSeo, setShowSeo] = useState(false);

  useEffect(() => {
    if (!post) return;
    setLoading(true);
    fetch(`/api/admin/blog/${post.id}`)
      .then((r) => r.json())
      .then((d) => {
        setTitle(d.title || "");
        setSlug(d.slug || "");
        setExcerpt(d.excerpt || "");
        setContent(d.content || "");
        setCategory(d.category || "General");
        setTags(Array.isArray(d.tags) ? d.tags.join(", ") : "");
        setAuthor(d.authorId || "");
        setCoverImage(d.coverImage || "");
        setIsPublished(d.isPublished || false);
        setPublishedAt(
          d.publishedAt ? new Date(d.publishedAt).toISOString().slice(0, 10) : ""
        );
      })
      .finally(() => setLoading(false));
  }, [post]);

  const handleSave = async () => {
    if (!title || !slug) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      const url = post ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = post ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          author: author || undefined,
          coverImage: coverImage || undefined,
          isPublished,
          publishedAt: publishedAt || undefined,
        }),
      });
      if (res.ok) {
        toast.success(post ? "Post updated" : "Post created");
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
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[var(--cta-card,#0D0025)] p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {post ? "Edit post" : "Create new post"}
          </h2>
          <button onClick={onClose} className="rounded-md p-1.5 text-white/60 hover:bg-white/10">
            <X className="size-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="size-6 animate-spin text-white/60" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-white/60">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/60">Slug</label>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-xs text-white/40">/blog/</span>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="my-post"
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-white/60">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/60">Content (HTML)</label>
              <div className="mt-1">
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs font-medium text-white/60">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-white/60">Author</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="ClickTake Team"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/60">Tags (comma-sep)</label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="seo, local-seo, uk"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <button
              onClick={() => setShowSeo((v) => !v)}
              className="flex items-center gap-2 text-xs text-white/60 hover:text-white"
            >
              <Globe className="size-3.5" />
              {showSeo ? "Hide" : "Show"} cover image + publish date
            </button>

            {showSeo && (
              <div className="space-y-3 rounded-lg border border-white/10 p-3">
                <div>
                  <label className="text-xs font-medium text-white/60">Cover image URL</label>
                  <input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60">Publish date</label>
                  <input
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                  />
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setIsPublished((v) => !v)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs ${
                  isPublished
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {isPublished ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                {isPublished ? "Published" : "Draft"}
              </button>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50"
              >
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                {post ? "Save changes" : "Create post"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Upload Modal ──────────────────────────────────────────────────────────

function UploadModal({
  categories,
  onClose,
  onDone,
}: {
  categories: string[];
  onClose: () => void;
  onDone: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("General");
  const [autoPublish, setAutoPublish] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = (list: FileList | null) => {
    if (!list) return;
    const accepted: File[] = [];
    for (const f of Array.from(list)) {
      const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
      if ([".md", ".markdown", ".csv", ".pdf"].includes(ext)) {
        accepted.push(f);
      } else {
        toast.error(`Skipped "${f.name}" — unsupported type`);
      }
    }
    setFiles((prev) => [...prev, ...accepted]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Select at least one file");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      if (author) fd.append("author", author);
      if (category) fd.append("category", category);
      if (autoPublish) fd.append("publish", "true");

      const res = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Upload failed");
        return;
      }
      setResult(data);
      toast.success(`Created ${data.summary.postsCreated} post(s)`);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const fmtBytes = (b: number) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / 1024 / 1024).toFixed(1)} MB`;
  };

  const fileIcon = (name: string) => {
    const ext = name.slice(name.lastIndexOf(".")).toLowerCase();
    if (ext === ".md" || ext === ".markdown") return FileMarkdown;
    if (ext === ".csv") return FileSpreadsheet;
    return FilePdf;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0D0025] p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileUp className="size-5 text-brand-pink" />
              Bulk Upload — Auto-Extract Content
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Upload .md / .csv / .pdf — system auto-extracts content and creates draft posts.
            </p>
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-white/60 hover:bg-white/10">
            <X className="size-4" />
          </button>
        </div>

        {!result ? (
          <div className="space-y-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                onPick(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
                dragOver
                  ? "border-brand-pink bg-brand-pink/10"
                  : "border-white/15 hover:border-white/30 bg-white/5"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                accept=".md,.markdown,.csv,.pdf"
                className="hidden"
                onChange={(e) => onPick(e.target.files)}
              />
              <FileUp className="mx-auto mb-2 size-8 text-white/40" />
              <div className="text-sm text-white/80 font-medium">
                Drop files here or click to browse
              </div>
              <div className="mt-1 text-xs text-white/40">
                Supports .md, .csv, .pdf — up to 10MB each
              </div>
            </div>

            {/* Selected files */}
            {files.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-white/60">
                  {files.length} file(s) selected
                </div>
                {files.map((f, i) => {
                  const Icon = fileIcon(f.name);
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <Icon className="size-4 text-brand-pink shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/90 truncate">{f.name}</div>
                        <div className="text-xs text-white/40">{fmtBytes(f.size)}</div>
                      </div>
                      <button
                        onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="rounded-md p-1 text-white/40 hover:bg-white/10 hover:text-red-400"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Options */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-white/60">Override author (optional)</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="ClickTake Team"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/60">Override category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-blue"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(e) => setAutoPublish(e.target.checked)}
                className="rounded border-white/20 bg-white/5"
              />
              Publish immediately (skip draft)
            </label>

            {/* Format help */}
            <details className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/60">
              <summary className="cursor-pointer text-white/80 font-medium">
                File format reference
              </summary>
              <div className="mt-2 space-y-2">
                <div>
                  <span className="text-brand-pink font-mono">.md</span> — Markdown with YAML frontmatter:
                  <pre className="mt-1 rounded bg-black/40 p-2 text-[10px] overflow-x-auto">{`---
title: My Article
slug: my-article
excerpt: Short description.
category: SEO
tags: [seo, local-seo]
author: ClickTake Team
publishedAt: 2026-01-15
coverImage: https://...
---

# Article body in Markdown

This is the article content...`}</pre>
                </div>
                <div>
                  <span className="text-brand-pink font-mono">.csv</span> — Header row + one post per data row:
                  <pre className="mt-1 rounded bg-black/40 p-2 text-[10px] overflow-x-auto">{`title,slug,excerpt,category,tags,author,content
My Post,my-post,Short desc.,SEO,seo|local,ClickTake,"<p>HTML body</p>"`}</pre>
                  <div className="mt-1 text-white/40">
                    Tags column uses pipe-separator. Content can be plain text or HTML.
                  </div>
                </div>
                <div>
                  <span className="text-brand-pink font-mono">.pdf</span> — Text-based PDF only (not scanned images).
                  First meaningful line becomes the title, remaining text is split into paragraphs.
                  Filename is used as slug. Markdown formatting is not extracted.
                </div>
              </div>
            </details>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="flex items-center gap-2 rounded-lg bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                {uploading ? "Processing..." : `Upload ${files.length} file(s)`}
              </button>
            </div>
          </div>
        ) : (
          // Result view
          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="size-5" />
                <span className="font-semibold">Upload complete</span>
              </div>
              <div className="mt-1 text-sm text-white/80">
                Created <strong className="text-white">{result.summary.postsCreated}</strong> post(s)
                {result.summary.errors > 0 && (
                  <span className="text-amber-400">
                    {" "}
                    · {result.summary.errors} error(s)
                  </span>
                )}
              </div>
            </div>

            {result.created?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  Created posts
                </div>
                {result.created.map((p: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <Sparkles className="size-4 text-brand-pink shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white/90 truncate">{p.title}</div>
                      <div className="text-xs text-white/40">
                        /blog/{p.slug} · {p.category} · from {p.sourceFile}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result.errors?.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                  Errors
                </div>
                {result.errors.map((e: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2"
                  >
                    <AlertCircle className="size-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="text-white/80 font-mono">{e.filename}</div>
                      <div className="text-white/60">{e.error}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={onDone}
                className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
