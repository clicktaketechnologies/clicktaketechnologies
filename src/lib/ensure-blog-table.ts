// Self-heal helper — ensures the cms_blogs table exists in the production DB.
// Idempotent: uses CREATE TABLE IF NOT EXISTS. Safe to call on every request.
// If the table already exists, this is a no-op (Postgres short-circuits IF NOT EXISTS).
//
// Why: the CmsBlog model was added to schema.ts but never pushed to the prod DB
// via drizzle-kit push. Rather than require a manual migration step, we run this
// on the first /api/admin/blog request. Once the table exists, the overhead is
// a single round-trip per cold start (~5ms) — negligible.
//
// Schema mirrors src/lib/schema.ts cmsBlogs definition exactly.

import { pool } from "@/lib/db";
import { logger } from "@/lib/providers/logger";

let _ensured = false;

export async function ensureCmsBlogsTable(): Promise<void> {
  if (_ensured) return;
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS "cms_blogs" (
          "id"            TEXT PRIMARY KEY,
          "title"         TEXT NOT NULL,
          "slug"          TEXT NOT NULL UNIQUE,
          "excerpt"       TEXT DEFAULT '',
          "content"       TEXT DEFAULT '',
          "cover_image"   TEXT,
          "category"      TEXT DEFAULT 'General',
          "tags"          TEXT DEFAULT '[]',
          "author_id"     TEXT,
          "is_published"  BOOLEAN DEFAULT FALSE,
          "published_at"  TIMESTAMP,
          "created_at"    TIMESTAMP DEFAULT NOW(),
          "updated_at"    TIMESTAMP DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS "cms_blogs_slug_idx"     ON "cms_blogs" ("slug");
        CREATE INDEX IF NOT EXISTS "cms_blogs_category_idx" ON "cms_blogs" ("category");
      `);
      _ensured = true;
    } finally {
      client.release();
    }
  } catch (err: any) {
    logger?.warn?.({ err: err.message }, "[ensureCmsBlogsTable] failed (will retry next request)");
    // Don't throw — let the calling query fail naturally with a more specific error
  }
}
