import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma client configured for Cloudflare Workers.
 *
 * Uses default @prisma/client + @prisma/adapter-pg driver adapter.
 * schema.prisma has previewFeatures = ["driverAdapters", "queryCompiler"].
 *
 * NOTE: This configuration requires the Prisma WASM query compiler to be
 * bundled. The total bundle is ~3.74 MiB gzip which exceeds the Cloudflare
 * Workers Free plan 3 MiB limit. A Workers Paid plan ($5/month, 10 MiB limit)
 * is required to deploy this configuration.
 *
 * When deployed without the WASM (to fit Free plan limit), Prisma falls back
 * to the library engine which fails on Workers with "could not locate Query
 * Engine for debian-openssl-1.1.x" error.
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
