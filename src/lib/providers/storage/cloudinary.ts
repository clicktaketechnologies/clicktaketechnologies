/**
 * Cloudinary Storage Adapter — uses Cloudinary's upload + delivery API.
 * Free tier: 25 credits/mo (~25 GB storage + transforms).
 *
 * Phase 7 trim: `cloudinary` SDK is loaded lazily so it's not in the
 * main Worker bundle — only pulled in when an admin actually configures
 * Cloudinary as a storage provider.
 */

import type {
  StorageProvider,
  UploadResult,
  StorageObject,
  HealthResult,
  StorageUsage,
} from "./types";
import { logger } from "../logger";

type CloudinaryV2 = {
  config(opts: Record<string, unknown>): void;
  uploader: {
    upload(data: string, opts: Record<string, unknown>): Promise<any>;
    destroy(key: string, opts: Record<string, unknown>): Promise<any>;
  };
  url(key: string, opts: Record<string, unknown>): string;
  api: {
    ping(): Promise<any>;
    usage(): Promise<any>;
    resources(opts: Record<string, unknown>): Promise<any>;
  };
};

let cachedClient: CloudinaryV2 | null = null;

async function getClient(
  credentials: Record<string, string>,
  config: Record<string, string>,
): Promise<CloudinaryV2> {
  if (cachedClient) return cachedClient;
  const mod = await import("cloudinary");
  const client = (mod.v2 ?? mod.default) as unknown as CloudinaryV2;
  client.config({
    cloud_name: config.cloudName,
    api_key: credentials.apiKey,
    api_secret: credentials.apiSecret,
    secure: true,
  });
  cachedClient = client;
  return client;
}

export class CloudinaryStorageAdapter implements StorageProvider {
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

  private client(): Promise<CloudinaryV2> {
    return getClient(this.credentials, this.config);
  }

  async upload(
    file: Buffer,
    key: string,
    contentType: string,
  ): Promise<UploadResult> {
    const start = Date.now();
    const cloudinary = await this.client();
    const resourceType = contentType.startsWith("video/")
      ? "video"
      : contentType.startsWith("image/")
        ? "image"
        : "raw";

    const result = await cloudinary.uploader.upload(
      `data:${contentType};base64,${file.toString("base64")}`,
      {
        public_id: key.replace(/\.[^.]+$/, ""),
        resource_type: resourceType,
        overwrite: true,
      },
    );
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[cloudinary] uploaded");
    return {
      key: result.public_id,
      url: result.secure_url,
      size: result.bytes,
      etag: result.etag,
    };
  }

  async get(key: string): Promise<Buffer> {
    const cloudinary = await this.client();
    const url = cloudinary.url(key, { resource_type: "auto" });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Cloudinary: fetch failed ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  }

  async getUrl(key: string): Promise<string> {
    const cloudinary = await this.client();
    return cloudinary.url(key, { resource_type: "auto", secure: true });
  }

  async delete(key: string): Promise<void> {
    const cloudinary = await this.client();
    await cloudinary.uploader.destroy(key, { resource_type: "auto" });
  }

  async list(prefix?: string, limit = 100): Promise<StorageObject[]> {
    const cloudinary = await this.client();
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
      const cloudinary = await this.client();
      await cloudinary.api.ping();
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage(): Promise<StorageUsage> {
    try {
      const cloudinary = await this.client();
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
