// Self-heal helper — ensures the cms_blogs table exists AND has all the columns
// the current Drizzle schema expects.
//
// Background: the cms_blogs table was originally created with a different (older)
// schema: { id, title, author, date, status, content, created_at, category, tags }.
// The current Drizzle schema (src/lib/schema.ts cmsBlogs) expects:
//   id, title, slug, excerpt, content, cover_image, category, tags, author_id,
//   is_published, published_at, created_at, updated_at
//
// Rather than require a manual migration, this helper:
//   1. CREATE TABLE IF NOT EXISTS — for fresh DBs that don't have the table at all
//   2. ALTER TABLE ADD COLUMN IF NOT EXISTS — for DBs with the older schema
//
// Idempotent: safe to call on every request. Once all columns exist, both
// statements are no-ops (Postgres short-circuits IF NOT EXISTS).
//
// Caches a 'table ensured' flag in module scope so subsequent requests in the
// same warm instance skip the round-trip entirely.

import { pool } from "@/lib/db";
import { logger } from "@/lib/providers/logger";

let _ensured = false;

export async function ensureCmsBlogsTable(): Promise<void> {
  if (_ensured) return;
  try {
    // Step 1: Create the table if it doesn't exist at all (fresh DBs)
    await pool.query(`
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
    `);

    // Step 2: For DBs with the OLDER cms_blogs schema (id, title, author, date,
    // status, content, created_at, category, tags), add the missing columns
    // idempotently. IF NOT EXISTS means this is a no-op on fresh DBs that
    // already have all columns from Step 1.
    await pool.query(`
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "slug"          TEXT;
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "excerpt"       TEXT DEFAULT '';
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "cover_image"   TEXT;
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "author_id"     TEXT;
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "is_published"  BOOLEAN DEFAULT FALSE;
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "published_at"  TIMESTAMP;
      ALTER TABLE "cms_blogs"
        ADD COLUMN IF NOT EXISTS "updated_at"    TIMESTAMP DEFAULT NOW();
    `);

    // Step 3: Backfill slug from title for any rows where slug IS NULL
    // (older schema didn't have slug). We use slugify via SQL regex.
    // PostgreSQL doesn't have a native slugify function, so we do a simple
    // lower+replace+trim. Good enough — admin can edit slugs later.
    await pool.query(`
      UPDATE "cms_blogs"
      SET "slug" = lower(regexp_replace(regexp_replace(trim(title), '[^a-zA-Z0-9\\s-]', '', 'g'), '\\s+', '-', 'g'))
      WHERE "slug" IS NULL OR "slug" = '';
    `);

    // Step 4: Backfill is_published from old 'status' column if it exists
    // (status='Published' → is_published=true). Safe to attempt even if status
    // column doesn't exist — the WHERE clause short-circuits.
    try {
      await pool.query(`
        UPDATE "cms_blogs"
        SET "is_published" = TRUE
        WHERE "is_published" = FALSE
          AND "status" = 'Published';
      `);
    } catch {
      // 'status' column may not exist on fresh DBs — that's fine, skip.
    }

    // Step 5: Backfill published_at from old 'date' column if it exists
    try {
      await pool.query(`
        UPDATE "cms_blogs"
        SET "published_at" = "date"::timestamp
        WHERE "published_at" IS NULL
          AND "date" IS NOT NULL
          AND "date" != '';
      `);
    } catch {
      // 'date' column may not exist on fresh DBs — skip.
    }

    // Step 6: Backfill author_id from old 'author' column if it exists
    try {
      await pool.query(`
        UPDATE "cms_blogs"
        SET "author_id" = "author"
        WHERE "author_id" IS NULL
          AND "author" IS NOT NULL
          AND "author" != '';
      `);
    } catch {
      // 'author' column may not exist on fresh DBs — skip.
    }

    // Step 7: Backfill updated_at from created_at where missing
    await pool.query(`
      UPDATE "cms_blogs"
      SET "updated_at" = "created_at"
      WHERE "updated_at" IS NULL AND "created_at" IS NOT NULL;
    `);

    // Step 8: Add slug uniqueness index if not exists (only after backfill,
    // so we don't fail on duplicate slugs from old data). We use a partial
    // index on non-null slugs.
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "cms_blogs_slug_idx" ON "cms_blogs" ("slug") WHERE "slug" IS NOT NULL;
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "cms_blogs_category_idx" ON "cms_blogs" ("category");
    `);

    _ensured = true;
  } catch (err: any) {
    logger?.warn?.({ err: err.message }, "[ensureCmsBlogsTable] failed (will retry next request)");
    // Don't throw — let the calling query fail naturally with a more specific error
  }
}
