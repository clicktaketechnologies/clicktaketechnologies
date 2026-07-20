/**
 * Media Migration Script — moves /public/* assets into the configured
 * storage provider chain (R2 primary, B2 backup, Cloudinary optional).
 *
 * Usage:
 *   npx tsx scripts/migrate-public-to-storage.ts                # dry-run
 *   npx tsx scripts/migrate-public-to-storage.ts --commit       # actually upload
 *   npx tsx scripts/migrate-public-to-storage.ts --commit --prefix "legacy/"   # namespace keys
 *   npx tsx scripts/migrate-public-to-storage.ts --commit --delete              # remove from /public after upload
 *
 * Requirements:
 *   - At least one storage provider configured in the admin panel
 *     (R2 recommended as primary, B2 as backup).
 *   - DATABASE_URL env var must be set (`.env` is auto-loaded).
 *
 * Notes:
 *   - Files already present in the DB (StorageObject table) are skipped by default.
 *     Pass `--force` to re-upload everything.
 *   - After migration, replace `/public/...` references in code with the returned
 *     CDN URL via `getSignedUrl(key)` or `getMediaUrl(key)`.
 *   - The script does NOT delete from /public unless --delete is passed.
 */

import { promises as fs } from "fs";
import path from "path";
import { prisma } from "../src/lib/db";

// ─── Bootstrap: load .env so DATABASE_URL is available ──────────────────────
import { config as loadEnv } from "dotenv";
loadEnv({ path: path.resolve(process.cwd(), ".env") });

// ─── Args ───────────────────────────────────────────────────────────────────
const args = new Set(process.argv.slice(2));
const DRY_RUN = !args.has("--commit");
const FORCE = args.has("--force");
const DELETE_LOCAL = args.has("--delete");
const PREFIX = (() => {
  const i = process.argv.indexOf("--prefix");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : "";
})();

// ─── File types to migrate ──────────────────────────────────────────────────
const EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg",
  ".mp4", ".webm", ".mov", ".mp3", ".wav",
  ".pdf", ".json", ".webmanifest", ".ico",
]);

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".pdf": "application/pdf",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".ico": "image/x-icon",
};

// ─── Import the provider chain lazily (after env is loaded) ─────────────────
type UploadFn = (
  file: Buffer,
  key: string,
  contentType: string,
  metadata?: Record<string, string>,
) => Promise<{ url: string; key: string; size: number; etag?: string; replicatedTo?: string[] }>;

async function loadUploadFn(): Promise<UploadFn> {
  // Dynamic import so the script can run via tsx without Next.js bundling
  const mod = await import("../src/lib/providers/storage");
  return mod.uploadFile as UploadFn;
}

// ─── Walk /public recursively ───────────────────────────────────────────────
async function walk(dir: string, out: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.has(ext)) out.push(full);
    }
  }
  return out;
}

async function fileExistsInDb(key: string): Promise<boolean> {
  const row = await prisma.storageObject.findUnique({ where: { key } });
  return !!row;
}

async function migrateOne(
  filePath: string,
  publicRoot: string,
  uploadFn: Awaited<ReturnType<typeof loadUploadFn>>,
): Promise<{ ok: boolean; key: string; url?: string; error?: string; skipped?: boolean }> {
  const rel = path.relative(publicRoot, filePath).split(path.sep).join("/");
  const key = PREFIX + rel;
  const ext = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

  if (!FORCE && (await fileExistsInDb(key))) {
    return { ok: true, key, skipped: true };
  }

  if (DRY_RUN) {
    console.log(`  [dry-run] would upload ${filePath} → key="${key}" type=${contentType}`);
    return { ok: true, key, skipped: true };
  }

  try {
    const buf = await fs.readFile(filePath);
    const result = await uploadFn(buf, key, contentType, {
      migratedFrom: "/public/" + rel,
      migratedAt: new Date().toISOString(),
      originalSize: String(buf.length),
    });
    if (DELETE_LOCAL) {
      await fs.unlink(filePath);
      console.log(`  [delete] removed local ${filePath}`);
    }
    return { ok: true, key, url: result.url };
  } catch (err: any) {
    return { ok: false, key, error: err.message };
  }
}


async function main() {
  const publicRoot = path.resolve(process.cwd(), "public");
  console.log(`\n=== Media Migration ===`);
  console.log(`Mode: ${DRY_RUN ? "DRY-RUN (no uploads)" : "COMMIT (real uploads)"}`);
  console.log(`Force re-upload: ${FORCE}`);
  console.log(`Delete local after upload: ${DELETE_LOCAL}`);
  console.log(`Key prefix: "${PREFIX}"`);
  console.log(`Public root: ${publicRoot}\n`);

  let files: string[] = [];
  try {
    files = await walk(publicRoot);
  } catch (err: any) {
    console.error(`Failed to read /public: ${err.message}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("No media files found in /public. Nothing to migrate.");
    return;
  }

  console.log(`Found ${files.length} files to consider.\n`);

  const uploadFn = await loadUploadFn();

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  const failures: { file: string; error: string }[] = [];

  for (const f of files) {
    const result = await migrateOne(f, publicRoot, uploadFn);
    if (result.skipped) {
      skipped++;
      continue;
    }
    if (result.ok) {
      uploaded++;
      console.log(`  ✓ ${f} → ${result.url}`);
    } else {
      failed++;
      failures.push({ file: f, error: result.error ?? "unknown" });
      console.error(`  ✗ ${f}: ${result.error}`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Uploaded:  ${uploaded}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
  if (failures.length > 0) {
    console.log(`\nFailures:`);
    for (const f of failures) console.log(`  ${f.file}: ${f.error}`);
  }

  if (DRY_RUN && uploaded === 0 && skipped > 0) {
    console.log(`\n(Dry-run only — re-run with --commit to perform real uploads.)`);
  }
}

main()
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
