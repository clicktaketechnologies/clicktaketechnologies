/**
 * POST /api/admin/blog/upload
 *
 * Bulk-import blog posts from .md / .csv / .pdf files.
 *
 * Accepts multipart/form-data:
 *   - files: File[]  (one or more .md / .markdown / .csv / .pdf files, ≤10 MB each)
 *   - author: string (optional override)
 *   - category: string (optional override, defaults to "General")
 *   - publish: "true" (optional — publishes immediately instead of saving as draft)
 *
 * Returns:
 *   {
 *     summary: { postsCreated: number, errors: number, total: number },
 *     created: Array<{ title: string, slug: string, status: "published" | "draft", source: string }>,
 *     errors: Array<{ file: string, error: string }>
 *   }
 *
 * File-format reference (mirrors the help text in the UploadModal UI):
 *   .md   — Markdown with optional YAML frontmatter (title/slug/excerpt/category/tags/author/publishedAt/coverImage)
 *   .csv  — Header row + one post per line; columns: title,slug,excerpt,category,tags,author,content
 *   .pdf  — Text-based PDF only; first meaningful line = title, filename = slug
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { ensureCmsBlogsTable } from "@/lib/ensure-blog-table";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

type Created = { title: string; slug: string; status: "published" | "draft"; source: string };
type FileError = { file: string; error: string };

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || `post-${Date.now()}`;
}

function uniqueSlug(base: string, taken: Set<string>): string {
  let slug = base;
  let n = 2;
  while (taken.has(slug)) {
    slug = `${base}-${n++}`;
  }
  taken.add(slug);
  return slug;
}

// Very small YAML-ish frontmatter parser. Handles `key: value`, `key: [a, b]`,
// and quoted values. Does NOT support nested objects or multi-line strings.
function parseFrontmatter(raw: string): {
  data: Record<string, any>;
  body: string;
} {
  const fmMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!fmMatch) return { data: {}, body: raw };
  const yaml = fmMatch[1];
  const body = fmMatch[2];
  const data: Record<string, any> = {};
  for (const line of yaml.split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val: any = m[2].trim();
    if (val === "") continue;
    // Quoted string
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val.startsWith("[") && val.endsWith("]")) {
      // Array literal: [a, b, c]
      val = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
    data[key] = val;
  }
  return { data, body };
}

type ParsedPost = Partial<Created> & {
  content: string;
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
  author?: string;
  category?: string;
};

function parseMdFile(name: string, content: string): ParsedPost[] {
  const { data, body } = parseFrontmatter(content);
  const title = data.title || name.replace(/\.(md|markdown)$/i, "");
  const slug = data.slug || slugify(title);
  return [
    {
      title,
      slug,
      excerpt: data.excerpt || "",
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? String(data.tags).split(/[|,]/).map((s) => s.trim()) : [],
      author: data.author,
      coverImage: data.coverImage,
      publishedAt: data.publishedAt,
      content: body.trim(),
    },
  ];
}

function parseCsvFile(name: string, content: string): ParsedPost[] {
  // Lightweight CSV parser: handles quoted fields with embedded commas and
  // escaped quotes (""). Does not handle embedded newlines inside quoted
  // fields (rare for blog metadata).
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inQuotes) {
      if (ch === '"') {
        if (content[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        current.push(field);
        field = "";
      } else if (ch === "\n") {
        current.push(field);
        rows.push(current);
        current = [];
        field = "";
      } else if (ch === "\r") {
        // skip
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const out: ParsedPost[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 1 && row[0].trim() === "") continue; // blank line
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = (row[idx] || "").trim();
    });
    const title = obj.title || `Row ${r}`;
    out.push({
      title,
      slug: obj.slug || slugify(title),
      excerpt: obj.excerpt || "",
      category: obj.category,
      tags: obj.tags ? obj.tags.split(/[|,]/).map((s) => s.trim()).filter(Boolean) : [],
      author: obj.author,
      content: obj.content || "",
    });
  }
  return out;
}

async function parsePdfFile(name: string, file: File): Promise<ParsedPost[]> {
  // Minimal text-based PDF extraction: pulls plain text out of BT...ET blocks
  // by stripping the Tj/TJ operators. Does NOT handle compressed streams
  // (FlateDecode), so most modern PDFs will only yield partial text. For
  // full extraction, a pdf-parse dependency would be required — kept
  // dependency-free here to avoid bundling weight on the Worker.
  const buf = await file.arrayBuffer();
  const text = Buffer.from(buf).toString("latin1");
  // Extract strings inside parentheses from text-showing operators
  const pieces: string[] = [];
  const re = /\(((?:[^()\\]|\\.)*)\)\s*Tj/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const s = m[1].replace(/\\([()\\])/g, "$1");
    if (s.trim()) pieces.push(s);
  }
  // Also handle TJ arrays: [ (a) (b) ] TJ
  const re2 = /\[(.*?)\]\s*TJ/g;
  while ((m = re2.exec(text)) !== null) {
    const inner = m[1];
    const re3 = /\(((?:[^()\\]|\\.)*)\)/g;
    let m3: RegExpExecArray | null;
    while ((m3 = re3.exec(inner)) !== null) {
      const s = m3[1].replace(/\\([()\\])/g, "$1");
      if (s.trim()) pieces.push(s);
    }
  }
  if (pieces.length === 0) {
    throw new Error("Could not extract text from PDF (likely scanned or compressed). Use a text-based PDF.");
  }
  const title = pieces[0].trim().slice(0, 200);
  const slug = slugify(name.replace(/\.pdf$/i, ""));
  const body = pieces.join("\n\n");
  return [{ title, slug, content: body }];
}

// ─── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await ensureCmsBlogsTable();

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  const authorOverride = (form.get("author") as string | null)?.trim() || undefined;
  const categoryOverride = (form.get("category") as string | null)?.trim() || undefined;
  const publishImmediately = (form.get("publish") as string | null) === "true";

  const created: Created[] = [];
  const errors: FileError[] = [];
  const takenSlugs = new Set<string>(
    (await prisma.cmsBlog.findMany({ select: { slug: true } })).map((p) => p.slug),
  );

  for (const file of files) {
    try {
      if (file.size > MAX_FILE_BYTES) {
        throw new Error(`File exceeds ${MAX_FILE_BYTES / 1024 / 1024}MB limit`);
      }
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      let parsed: ParsedPost[] = [];

      if (ext === ".md" || ext === ".markdown") {
        const text = await file.text();
        parsed = parseMdFile(file.name, text);
      } else if (ext === ".csv") {
        const text = await file.text();
        parsed = parseCsvFile(file.name, text);
      } else if (ext === ".pdf") {
        parsed = await parsePdfFile(file.name, file);
      } else {
        throw new Error(`Unsupported file type: ${ext}`);
      }

      for (const p of parsed) {
        const title = String(p.title || file.name);
        const slug = uniqueSlug(slugify(String(p.slug || title)), takenSlugs);
        const isPublished = publishImmediately;
        // Check slug uniqueness again (defensive)
        const existing = await prisma.cmsBlog.findUnique({ where: { slug } });
        if (existing) {
          errors.push({ file: file.name, error: `Slug "${slug}" already exists` });
          continue;
        }
        const post = await prisma.cmsBlog.create({
          data: {
            title,
            slug,
            excerpt: p.excerpt || "",
            content: p.content || "",
            coverImage: p.coverImage || null,
            category: categoryOverride || p.category || "General",
            tags: Array.isArray(p.tags) ? JSON.stringify(p.tags) : "[]",
            authorId: authorOverride || p.author || null,
            isPublished,
            publishedAt: isPublished ? (p.publishedAt ? new Date(p.publishedAt) : new Date()) : null,
          },
        });
        await logAudit({
          userId: session.user.id,
          userName: session.user.name,
          action: "blog.create",
          entity: "CmsBlog",
          entityId: post.id,
          details: { title, slug, source: `upload:${file.name}` },
        });
        created.push({
          title,
          slug,
          status: isPublished ? "published" : "draft",
          source: file.name,
        });
      }
    } catch (err: any) {
      errors.push({ file: file.name, error: err.message || String(err) });
    }
  }

  return NextResponse.json({
    summary: {
      postsCreated: created.length,
      errors: errors.length,
      total: files.length,
    },
    created,
    errors,
  });
}
