/**
 * Cloudinary Media CDN Adapter — uses Cloudinary's URL-based transformations.
 */

import { v2 as cloudinary } from "cloudinary";
import type { MediaProvider, ImageTransforms } from "./types";
import { logger } from "../logger";

export class CloudinaryMediaAdapter implements MediaProvider {
  readonly id = "cloudinary";
  readonly displayName = "Cloudinary";
  readonly credentialsKeys = ["apiKey", "apiSecret"];
  readonly configKeys = ["cloudName"];

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!credentials.apiKey || !credentials.apiSecret || !config.cloudName) {
      throw new Error("Cloudinary: missing apiKey/apiSecret/cloudName");
    }
    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: credentials.apiKey,
      api_secret: credentials.apiSecret,
      secure: true,
    });
  }

  getUrl(key: string, transforms?: ImageTransforms): string {
    const t: Record<string, string> = {};
    if (transforms?.width) t.w = String(transforms.width);
    if (transforms?.height) t.h = String(transforms.height);
    if (transforms?.fit) {
      t.c =
        transforms.fit === "cover"
          ? "fill"
          : transforms.fit === "contain"
            ? "fit"
            : transforms.fit === "crop"
              ? "crop"
              : "scale";
    }
    if (transforms?.format && transforms.format !== "auto") t.f = transforms.format;
    if (transforms?.quality) t.q = String(transforms.quality);
    if (transforms?.blur) t.e_blur = String(transforms.blur);
    if (transforms?.gravity) t.g = transforms.gravity === "face" ? "face" : "center";

    return cloudinary.url(key, {
      transformation: [t],
      fetch_format: transforms?.format === "auto" ? "auto" : undefined,
      quality: transforms?.quality ? "auto" : undefined,
      secure: true,
    });
  }

  async upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }> {
    const start = Date.now();
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
      await cloudinary.api.ping();
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage() {
    try {
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
