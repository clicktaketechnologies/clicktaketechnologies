/**
 * Cloudinary Media CDN Adapter — uses Cloudinary's URL-based transformations.
 *
 * Phase 7 trim: `cloudinary` SDK loaded lazily — not in the main bundle
 * unless an admin actually configures Cloudinary as a media provider.
 *
 * URL generation for media CDN use cases doesn't strictly need the SDK
 * (it's just a URL builder) so we use a lightweight inline builder for
 * `getUrl()` and only pull in the SDK for upload + admin API calls.
 */

import type { MediaProvider, ImageTransforms } from "./types";
import { logger } from "../logger";

type CloudinaryV2 = {
  uploader: {
    upload(data: string, opts: Record<string, unknown>): Promise<any>;
  };
  api: { ping(): Promise<any>; usage(): Promise<any> };
  url(key: string, opts: Record<string, unknown>): string;
};

let cachedClient: CloudinaryV2 | null = null;

async function getClient(
  credentials: Record<string, string>,
  config: Record<string, string>,
): Promise<CloudinaryV2> {
  if (cachedClient) return cachedClient;
  const mod = await import("cloudinary");
  const client = (mod.v2 ?? mod.default) as unknown as CloudinaryV2;
  (client as any).config({
    cloud_name: config.cloudName,
    api_key: credentials.apiKey,
    api_secret: credentials.apiSecret,
    secure: true,
  });
  cachedClient = client;
  return client;
}

/** Build a Cloudinary URL manually — no SDK needed. */
function buildUrl(cloudName: string, key: string, transforms?: ImageTransforms): string {
  const parts: string[] = [];
  if (transforms?.width) parts.push(`w_${transforms.width}`);
  if (transforms?.height) parts.push(`h_${transforms.height}`);
  if (transforms?.fit) {
    const c =
      transforms.fit === "cover"
        ? "fill"
        : transforms.fit === "contain"
          ? "fit"
          : transforms.fit === "crop"
            ? "crop"
            : "scale";
    parts.push(`c_${c}`);
  }
  if (transforms?.quality) parts.push(`q_${transforms.quality}`);
  if (transforms?.format === "auto") parts.push("f_auto");
  else if (transforms?.format) parts.push(`f_${transforms.format}`);
  if (transforms?.blur) parts.push(`e_blur:${transforms.blur}`);
  if (transforms?.gravity) parts.push(`g_${transforms.gravity === "face" ? "face" : "center"}`);

  const transformStr = parts.length ? parts.join(",") + "/" : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}${key}`;
}

export class CloudinaryMediaAdapter implements MediaProvider {
  readonly id = "cloudinary";
  readonly displayName = "Cloudinary";
  readonly credentialsKeys = ["apiKey", "apiSecret"];
  readonly configKeys = ["cloudName"];

  constructor(
    private credentials: Record<string, string>,
    private config: Record<string, string>,
  ) {
    if (!credentials.apiKey || !credentials.apiSecret || !config.cloudName) {
      throw new Error("Cloudinary: missing apiKey/apiSecret/cloudName");
    }
  }

  getUrl(key: string, transforms?: ImageTransforms): string {
    return buildUrl(this.config.cloudName, key, transforms);
  }

  async upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }> {
    const start = Date.now();
    const cloudinary = await getClient(this.credentials, this.config);
    const result = await cloudinary.uploader.upload(
      `data:${contentType};base64,${file.toString("base64")}`,
      { public_id: key.replace(/\.[^.]+$/, ""), overwrite: true },
    );
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[cloudinary-media] uploaded");
    return { url: result.secure_url, size: result.bytes };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    try {
      const cloudinary = await getClient(this.credentials, this.config);
      await cloudinary.api.ping();
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage() {
    try {
      const cloudinary = await getClient(this.credentials, this.config);
      const usage = await cloudinary.api.usage();
      return {
        bandwidthBytes: usage.bandwidth?.value ?? 0,
        transformCount: usage.transformations?.value ?? 0,
        storageBytes: usage.storage?.value ?? 0,
      };
    } catch {
      return { bandwidthBytes: 0, transformCount: 0, storageBytes: 0 };
    }
  }
}
