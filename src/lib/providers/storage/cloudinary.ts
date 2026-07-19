/**
 * Cloudinary Storage Adapter — uses Cloudinary's upload + delivery API.
 * Free tier: 25 credits/mo (~25 GB storage + transforms).
 */

import { v2 as cloudinary } from "cloudinary";
import type {
  StorageProvider,
  UploadResult,
  StorageObject,
  HealthResult,
  StorageUsage,
} from "./types";
import { logger } from "../logger";

export class CloudinaryStorageAdapter implements StorageProvider {
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

  async upload(
    file: Buffer,
    key: string,
    contentType: string,
  ): Promise<UploadResult> {
    const start = Date.now();
    const resourceType = contentType.startsWith("video/")
      ? "video"
      : contentType.startsWith("image/")
        ? "image"
        : "raw";

    const result = await cloudinary.uploader.upload(`data:${contentType};base64,${file.toString("base64")}`, {
      public_id: key.replace(/\.[^.]+$/, ""),
      resource_type: resourceType,
      overwrite: true,
    });
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[cloudinary] uploaded");
    return {
      key: result.public_id,
      url: result.secure_url,
      size: result.bytes,
      etag: result.etag,
    };
  }

  async get(key: string): Promise<Buffer> {
    const url = cloudinary.url(key, { resource_type: "auto" });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Cloudinary: fetch failed ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }

  async getUrl(key: string): Promise<string> {
    return cloudinary.url(key, { resource_type: "auto", secure: true });
  }

  async delete(key: string): Promise<void> {
    await cloudinary.uploader.destroy(key, { resource_type: "auto" });
  }

  async list(prefix?: string, limit = 100): Promise<StorageObject[]> {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix,
      max_results: limit,
    });
    return (result.resources ?? []).map((r: any) => ({
      key: r.public_id,
      size: r.bytes,
      contentType: r.resource_type === "image" ? "image/jpeg" : "application/octet-stream",
      lastModified: new Date(r.created_at),
      etag: r.etag,
    }));
  }

  async healthCheck(): Promise<HealthResult> {
    const start = Date.now();
    try {
      await cloudinary.api.ping();
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage(): Promise<StorageUsage> {
    try {
      const usage = await cloudinary.api.usage();
      return {
        storageBytes: usage.storage?.value ?? 0,
        objectCount: usage.resources ?? 0,
      };
    } catch {
      return { storageBytes: 0, objectCount: 0 };
    }
  }
}
