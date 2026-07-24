// STUB db.ts — used for Cloudflare Worker builds.
// The real implementation lives in db-impl.ts (used by Render).
// At runtime on Cloudflare, /api/* and /admin/* are proxied to Render
// via next.config.ts rewrites, so this stub is never actually invoked.
// It exists only to satisfy TypeScript imports at bundle time and to
// keep the CF Worker bundle small (no Drizzle / pg / pg-cloudflare).

export const prisma = new Proxy(
  {},
  {
    get() {
      throw new Error(
        "[db stub] Database access is not available on Cloudflare. " +
          "All /api/* and /admin/* requests should be proxied to the Render backend via BACKEND_URL."
      );
    },
  }
) as any;

export const db = prisma;
export const pool = {
  connect() {
    throw new Error("[db stub] pool.connect() not available on Cloudflare.");
  },
};
export const schema = {};
