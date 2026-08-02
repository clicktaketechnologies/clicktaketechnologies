// /api/admin/blog/upload — Auto-extract blog content from uploaded .md / .csv / .pdf files.
//
// Accepts multipart/form-data with one or more files under the "files" field.
// For each file:
//   - .md  → parse YAML frontmatter (title, slug, excerpt, category, tags, author,
//            publishedAt, coverImage) with gray-matter, then convert the markdown
//            body to HTML with `marked`. Creates ONE blog post (draft).
//   - .csv → parse header row + data rows. Each data row becomes ONE blog post
//            (draft). Recognized columns: title, slug, excerpt, category, tags
//            (pipe-separated), author, content/body. Creates N blog posts.
//   - .pdf → extract plain text with pdf-parse. First non-empty line becomes the
//            title, the rest becomes the body content (wrapped in <p> tags).
//            Slug derived from filename. Creates ONE blog post (draft).
//
// All created posts are saved as DRAFTS (isPublished=false) so the admin can
// review/edit before publishing. Returns a summary of created posts + any errors.
//
// Runtime: Node.js (not edge) — pdf-parse and gray-matter require Node fs/path.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { ensureCmsBlogsTable } from "@/lib/ensure-blog-table";

// Heavy parsers (gray-matter, marked, pdf-parse) are imported DYNAMICALLY inside
// the POST handler so they don't get bundled into the build of OTHER /api/admin/blog/*
// routes (Next.js bundles all route files in a directory together). If we imported
// them at module top-level, the entire bundle would fail to load whenever pdf-parse
// had a Node-specific issue — taking down GET /api/admin/blog with it.

export const runtime = "nodejs";
export const maxDuration = 60;

type ParsedPost = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  tags?: string[];
  author?: string;
  coverImage?: string;
  publishedAt?: string;
};

type ParseResult =
  | { ok: true; posts: ParsedPost[] }
  | { ok: false; error: string };

const ALLOWED_MIME = new Set([
  "text/markdown",
  "text/x-markdown",
  "text/plain",
  "application/csv",
  "text/csv",
  "application/vnd.ms-excel",
  "application/pdf",
]);

const ALLOWED_EXT = new Set([".md", ".markdown", ".csv", ".pdf"]);

const VALID_CATEGORIES = new Set([
  "SEO",
  "Web Dev",
  "Digital Marketing",
  "AI Automation",
  "Business Startup",
  "E-commerce",
  "Case Studies",
  "Company News",
  "General",
]);

// ─── Helpers ────────────────────────────────────────────────────────────────

function extOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function ensureUniqueSlug(base: string): string {
  // Caller must check DB uniqueness — this just produces a clean slug.
  return slugify(base) || `post-${Date.now()}`;
}

function asArray(v: any): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string") {
    // support "a,b,c" or "a|b|c" or JSON '["a","b"]'
    const trimmed = v.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        /* fall through */
      }
    }
    return trimmed
      .split(/[,|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeCategory(c: any): string {
  const s = String(c || "").trim();
  if (!s) return "General";
  // Exact match wins; otherwise default to General
  return VALID_CATEGORIES.has(s) ? s : "General";
}

// ─── Parsers ────────────────────────────────────────────────────────────────

async function parseMarkdown(filename: string, raw: string): Promise<ParseResult> {
  const { default: matter } = await import("gray-matter");
  const { marked } = await import("marked");
  let parsed;
  try {
    parsed = matter(raw);
  } catch (err: any) {
    return { ok: false, error: `Failed to parse frontmatter: ${err.message}` };
  }
  const fm = parsed.data || {};
  const body = parsed.content || "";

  // Title: frontmatter > first H1 > filename
  let title = String(fm.title || "").trim();
  if (!title) {
    const h1 = body.match(/^#\s+(.+)$/m);
    if (h1) title = h1[1].trim();
  }
  if (!title) title = filename.replace(/\.(md|markdown)$/i, "").replace(/[-_]/g, " ");

  // Slug: frontmatter > slugify(title) > filename stem
  const slug = ensureUniqueSlug(String(fm.slug || "").trim() || title);

  // Convert MD body to HTML
  let html = "";
  try {
    html = marked.parse(body, { async: false }) as string;
  } catch (err: any) {
    // Fallback: use raw body wrapped in <pre>
    html = `<pre>${body.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] || c))}</pre>`;
  }

  // Excerpt: frontmatter > first paragraph of plain text > truncated body
  let excerpt = String(fm.excerpt || fm.description || "").trim();
  if (!excerpt) {
    const plainText = body
      .replace(/^#.+$/gm, "")
      .replace(/[*_`>[\]()!-]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    excerpt = plainText.slice(0, 180);
    if (plainText.length > 180) excerpt += "…";
  }

  return {
    ok: true,
    posts: [
      {
        title,
        slug,
        excerpt,
        content: html,
        category: normalizeCategory(fm.category),
        tags: asArray(fm.tags),
        author: fm.author ? String(fm.author) : undefined,
        coverImage: fm.coverImage || fm.image ? String(fm.coverImage || fm.image) : undefined,
        publishedAt: fm.publishedAt || fm.date ? String(fm.publishedAt || fm.date) : undefined,
      },
    ],
  };
}

// Minimal RFC-4180-ish CSV parser: handles quoted fields, escaped quotes, CRLF.
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let i = 0;
  let cur = "";
  let inQuotes = false;
  while (i < line.length) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      cur += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ",") {
      fields.push(cur);
      cur = "";
      i++;
      continue;
    }
    cur += ch;
    i++;
  }
  fields.push(cur);
  return fields;
}

async function parseCsv(filename: string, raw: string): Promise<ParseResult> {
  // Strip BOM + normalize line endings
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    return { ok: false, error: "CSV must have a header row and at least one data row" };
  }
  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const findCol = (...names: string[]) => headers.findIndex((h) => names.includes(h));

  const titleIdx = findCol("title", "name");
  const slugIdx = findCol("slug", "url");
  const excerptIdx = findCol("excerpt", "description", "summary");
  const categoryIdx = findCol("category", "cat");
  const tagsIdx = findCol("tags", "tag");
  const authorIdx = findCol("author", "author_name", "byline");
  const contentIdx = findCol("content", "body", "html", "text");
  const coverIdx = findCol("cover_image", "coverimage", "image", "thumbnail");
  const dateIdx = findCol("published_at", "publishedat", "date", "publish_date");

  if (titleIdx === -1) {
    return { ok: false, error: "CSV must have a 'title' column" };
  }

  const posts: ParsedPost[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const title = (cols[titleIdx] || "").trim();
    if (!title) continue;
    const slugBase = slugIdx >= 0 ? (cols[slugIdx] || "").trim() : title;
    posts.push({
      title,
      slug: ensureUniqueSlug(slugBase || title),
      excerpt: excerptIdx >= 0 ? (cols[excerptIdx] || "").trim() : "",
      content: contentIdx >= 0 ? (cols[contentIdx] || "").trim() : "",
      category: categoryIdx >= 0 ? normalizeCategory(cols[categoryIdx]) : "General",
      tags: tagsIdx >= 0 ? asArray(cols[tagsIdx]) : [],
      author: authorIdx >= 0 ? (cols[authorIdx] || "").trim() || undefined : undefined,
      coverImage: coverIdx >= 0 ? (cols[coverIdx] || "").trim() || undefined : undefined,
      publishedAt: dateIdx >= 0 ? (cols[dateIdx] || "").trim() || undefined : undefined,
    });
  }
  return { ok: true, posts };
}

async function parsePdf(filename: string, buf: Buffer): Promise<ParseResult> {
  let text: string;
  try {
    // Dynamic import — pdf-parse v2 needs Node fs/path and must not be bundled
    // into the GET /api/admin/blog route. Only loaded when a .pdf upload happens.
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: new Uint8Array(buf) });
    const result = await parser.getText();
    text = result?.text || "";
    await parser.destroy().catch(() => {});
  } catch (err: any) {
    return { ok: false, error: `PDF parse failed: ${err.message}` };
  }

  // Normalize whitespace + extract first meaningful line as title
  const cleaned = text.replace(/\r\n/g, "\n").replace(/\u00a0/g, " ");
  const lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return { ok: false, error: "PDF contains no extractable text (may be scanned images)" };
  }

  // Title heuristics: first line that isn't a page number and is < 120 chars
  let title = "";
  let titleIdx = 0;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const l = lines[i];
    if (l.length < 3 || l.length > 120) continue;
    if (/^\d+$/.test(l)) continue; // page number
    if (/^(page|chapter)\s+\d+/i.test(l)) continue;
    title = l;
    titleIdx = i;
    break;
  }
  if (!title) title = filename.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");

  // Body = all lines after the title, joined with paragraph breaks
  const bodyLines = lines.slice(titleIdx + 1);
  const paragraphs: string[] = [];
  let current: string[] = [];
  for (const l of bodyLines) {
    if (l.length === 0) {
      if (current.length > 0) {
        paragraphs.push(current.join(" "));
        current = [];
      }
    } else {
      current.push(l);
    }
  }
  if (current.length > 0) paragraphs.push(current.join(" "));

  const content = paragraphs.map((p) => `<p>${p}</p>`).join("\n");
  const excerpt = paragraphs[0]
    ? paragraphs[0].slice(0, 180) + (paragraphs[0].length > 180 ? "…" : "")
    : "";

  return {
    ok: true,
    posts: [
      {
        title,
        slug: ensureUniqueSlug(title || filename),
        excerpt,
        content,
        category: "General",
        tags: [],
      },
    ],
  };
}

// ─── Main handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPermission(session.user, "writeCMS"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }

  await ensureCmsBlogsTable();

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "No files uploaded (field name must be 'files')" }, { status: 400 });
  }

  // Optional: override author/category for all posts in this upload
  const overrideAuthor = (form.get("author") as string | null) || undefined;
  const overrideCategory = (form.get("category") as string | null) || undefined;
  const autoPublish = form.get("publish") === "true";

  const created: any[] = [];
  const errors: { filename: string; error: string }[] = [];

  for (const file of files) {
    const ext = extOf(file.name);
    if (!ALLOWED_EXT.has(ext)) {
      errors.push({ filename: file.name, error: `Unsupported file type: ${ext || "(none)"}` });
      continue;
    }
    if (file.size > 10 * 1024 * 1024) {
      errors.push({ filename: file.name, error: "File too large (max 10MB)" });
      continue;
    }

    const buf = Buffer.from(await file.arrayBuffer());
    let result: ParseResult;

    if (ext === ".md" || ext === ".markdown") {
      result = await parseMarkdown(file.name, buf.toString("utf-8"));
    } else if (ext === ".csv") {
      result = await parseCsv(file.name, buf.toString("utf-8"));
    } else if (ext === ".pdf") {
      result = await parsePdf(file.name, buf);
    } else {
      errors.push({ filename: file.name, error: "Unsupported file type" });
      continue;
    }

    if (!result.ok) {
      errors.push({ filename: file.name, error: result.error });
      continue;
    }

    // Persist each parsed post to DB
    for (const p of result.posts) {
      // Ensure unique slug — append -2, -3, ... if needed
      let slug = p.slug;
      let n = 2;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const clash = await prisma.cmsBlog.findUnique({ where: { slug } });
        if (!clash) break;
        slug = `${p.slug}-${n++}`;
        if (n > 99) {
          slug = `${p.slug}-${Date.now().toString(36)}`;
          break;
        }
      }

      const finalCategory = overrideCategory
        ? normalizeCategory(overrideCategory)
        : p.category || "General";
      const finalAuthor = overrideAuthor || p.author || null;

      try {
        const post = await prisma.cmsBlog.create({
          data: {
            title: p.title.slice(0, 300),
            slug,
            excerpt: (p.excerpt || "").slice(0, 500),
            content: p.content || "",
            coverImage: p.coverImage || null,
            category: finalCategory,
            tags: JSON.stringify(p.tags || []),
            authorId: finalAuthor,
            isPublished: autoPublish,
            publishedAt: autoPublish
              ? p.publishedAt
                ? new Date(p.publishedAt)
                : new Date()
              : null,
          },
        });
        created.push({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          sourceFile: file.name,
        });
      } catch (err: any) {
        errors.push({
          filename: file.name,
          error: `DB save failed for "${p.title}": ${err.message}`,
        });
      }
    }
  }

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "blog.upload",
    entity: "CmsBlog",
    // entityId omitted — bulk upload creates multiple posts
    details: {
      fileCount: files.length,
      createdCount: created.length,
      errorCount: errors.length,
      autoPublish,
    },
  });

  return NextResponse.json({
    created,
    errors,
    summary: {
      filesProcessed: files.length,
      postsCreated: created.length,
      errors: errors.length,
    },
  });
}
