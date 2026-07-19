/**
 * Storage Registry — high-level entry points for the rest of the app.
 * Handles failover across configured storage providers + R2 → B2 replication.
 */

import { prisma } from "@/lib/db";
import { getStorageProviders } from "../registry";
import { logger } from "../logger";
import type { StorageProvider, UploadResult } from "./types";

/**
 * Upload a file to the primary storage provider (R2 by convention),
 * then queue async replication to backup providers (B2, etc.).
 */
export async function uploadFile(
  file: Buffer,
  key: string,
  contentType: string,
  metadata?: Record<string, string>,
): Promise<UploadResult> {
  const providers = await getStorageProviders();
  if (providers.length === 0) {
    throw new Error("No storage providers configured");
  }

  let lastError: Error | null = null;
  for (const provider of providers) {
    try {
      const result = await provider.upload(file, key, contentType, metadata);
      // Persist metadata to DB
      await prisma.storageObject.upsert({
        where: { key },
        create: {
          key,
          contentType,
          sizeBytes: BigInt(file.length),
          primaryProvider: provider.id,
          metadata: JSON.stringify(metadata ?? {}),
        },
        update: {
          contentType,
          sizeBytes: BigInt(file.length),
          primaryProvider: provider.id,
          metadata: JSON.stringify(metadata ?? {}),
        },
      });
      // Async replication to backups (fire-and-forget)
      void replicateToBackups(providers, provider.id, file, key, contentType, metadata);
      return result;
    } catch (err: any) {
      lastError = err;
      logger.warn({ provider: provider.id, err: err.message }, "[storage] upload failed, trying next");
      continue;
    }
  }
  throw new Error(`All storage providers failed: ${lastError?.message}`);
}

/** Download a file — tries each provider in chain until one succeeds. */
export async function downloadFile(key: string): Promise<Buffer> {
  const providers = await getStorageProviders();
  for (const provider of providers) {
    try {
      return await provider.get(key);
    } catch (err: any) {
      logger.warn({ provider: provider.id, err: err.message }, "[storage] download failed, trying next");
      continue;
    }
  }
  throw new Error(`File not found in any storage provider: ${key}`);
}

/** Get a URL for accessing the file. Tries primary first, falls back to backups. */
export async function getSignedUrl(
  key: string,
  options?: { expiresIn?: number },
): Promise<string> {
  const providers = await getStorageProviders();
  for (const provider of providers) {
    try {
      return await provider.getUrl(key, options);
    } catch (err: any) {
      logger.warn({ provider: provider.id, err: err.message }, "[storage] getUrl failed, trying next");
      continue;
    }
  }
  throw new Error(`Cannot get URL for ${key}`);
}

/** Delete from all configured providers (best-effort). */
export async function deleteFile(key: string): Promise<void> {
  const providers = await getStorageProviders();
  const results = await Promise.allSettled(providers.map((p) => p.delete(key)));
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length === providers.length) {
    throw new Error(`Failed to delete ${key} from all providers`);
  }
  // Remove DB record
  await prisma.storageObject.deleteMany({ where: { key } }).catch(() => {});
}

/** Replicate a file to all non-primary providers. */
async function replicateToBackups(
  providers: StorageProvider[],
  primaryId: string,
  file: Buffer,
  key: string,
  contentType: string,
  metadata?: Record<string, string>,
): Promise<void> {
  const backups = providers.filter((p) => p.id !== primaryId);
  if (backups.length === 0) return;
  const results = await Promise.allSettled(
    backups.map((p) => p.upload(file, key, contentType, metadata)),
  );
  const replicatedTo = [primaryId, ...backups.filter((_, i) => results[i].status === "fulfilled").map((p) => p.id)];
  await prisma.storageObject.update({
    where: { key },
    data: { replicatedTo: JSON.stringify(replicatedTo) },
  }).catch(() => {});
  logger.info({ key, replicatedTo }, "[storage] replication complete");
}
