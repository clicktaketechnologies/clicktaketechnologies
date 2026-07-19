/**
 * Media CDN Registry — high-level entry points.
 * Returns a URL from the active media provider with transforms applied.
 * Failover: tries primary → backups in order.
 */

import { getMediaProviders } from "../registry";
import { logger } from "../logger";
import type { ImageTransforms } from "./types";

/** Returns a delivery URL for the given image key with transforms applied. */
export async function getMediaUrl(key: string, transforms?: ImageTransforms): Promise<string> {
  const providers = await getMediaProviders();
  if (providers.length === 0) {
    // Fallback to local /public/ path if no provider configured
    return `/${key}`;
  }
  // Primary provider only for URL delivery (failover happens at the worker level)
  return providers[0].getUrl(key, transforms);
}

/** Uploads an image to the active media provider with failover. */
export async function uploadImage(
  file: Buffer,
  key: string,
  contentType: string,
): Promise<{ url: string; size: number }> {
  const providers = await getMediaProviders();
  if (providers.length === 0) {
    throw new Error("No media providers configured");
  }
  let lastError: Error | null = null;
  for (const provider of providers) {
    try {
      return await provider.upload(file, key, contentType);
    } catch (err: any) {
      lastError = err;
      logger.warn({ provider: provider.id, err: err.message }, "[media] upload failed, trying next");
      continue;
    }
  }
  throw new Error(`All media providers failed: ${lastError?.message}`);
}
