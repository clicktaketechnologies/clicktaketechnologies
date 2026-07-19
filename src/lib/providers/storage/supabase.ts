/**
 * Supabase Storage Adapter — fallback / existing integration.
 * Free tier: 1GB storage, 2GB bandwidth.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type {
  StorageProvider,
  UploadResult,
  StorageObject,
  HealthResult,
  StorageUsage,
} from "./types";
import { logger } from "../logger";

export class SupabaseStorageAdapter implements StorageProvider {
  readonly id = "supabase";
  readonly displayName = "Supabase Storage";
  readonly credentialsKeys = ["serviceRoleKey"];
  readonly configKeys = ["url", "bucketName"];

  private client: SupabaseClient;
  private bucket: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!credentials.serviceRoleKey || !config.url || !config.bucketName) {
      throw new Error("Supabase: missing serviceRoleKey/url/bucketName");
    }
    this.bucket = config.bucketName;
    this.client = createClient(config.url, credentials.serviceRoleKey);
  }

  async upload(
    file: Buffer,
    key: string,
    contentType: string,
  ): Promise<UploadResult> {
    const start = Date.now();
    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(key, file, { contentType, upsert: true });
    if (error) throw new Error(`Supabase: ${error.message}`);
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(key);
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[supabase] uploaded");
    return { key, url: data.publicUrl, size: file.length };
  }

  async get(key: string): Promise<Buffer> {
    const { data, error } = await this.client.storage.from(this.bucket).download(key);
    if (error || !data) throw new Error(`Supabase: ${error?.message ?? "no data"}`);
    return Buffer.from(await data.arrayBuffer());
  }

  async getUrl(key: string): Promise<string> {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(key);
    return data.publicUrl;
  }

  async delete(key: string): Promise<void> {
    const { error } = await this.client.storage.from(this.bucket).remove([key]);
    if (error) throw new Error(`Supabase: ${error.message}`);
  }

  async list(prefix?: string, limit = 100): Promise<StorageObject[]> {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .list(prefix ?? "", { limit });
    if (error) throw new Error(`Supabase: ${error.message}`);
    return (data ?? []).map((r) => ({
      key: r.name,
      size: r.metadata?.size ?? 0,
      contentType: r.metadata?.mimetype ?? "application/octet-stream",
      lastModified: r.created_at ? new Date(r.created_at) : new Date(),
    }));
  }

  async healthCheck(): Promise<HealthResult> {
    const start = Date.now();
    try {
      const { data, error } = await this.client.storage.from(this.bucket).list("", { limit: 1 });
      if (error) throw error;
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage(): Promise<StorageUsage> {
    // Supabase free tier — no API for usage. Return zero.
    return { storageBytes: 0, objectCount: 0 };
  }
}
