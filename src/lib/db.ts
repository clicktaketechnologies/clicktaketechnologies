import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma client configured for Cloudflare Workers compatibility.
 *
 * Phase 7 trim: uses @prisma/adapter-pg driver adapter which removes
 * the 2.2MB WASM query engine from the bundle. The adapter uses `pg`
 * which on Cloudflare Workers automatically uses `pg-cloudflare`
 * (TCP via the runtime's socket API).
 *
 * On local Node dev, `pg` uses standard libpq.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.DIRECT_URL ||
    "";

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter } as any);
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Backwards-compat alias
export const db = prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
