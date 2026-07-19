/**
 * Backblaze B2 Storage Adapter — S3-compatible API.
 * Free tier: 10GB storage, free egress to Cloudflare (Bandwidth Alliance).
 */

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type {
  StorageProvider,
  UploadResult,
  StorageObject,
  HealthResult,
  StorageUsage,
} from "./types";
import { logger } from "../logger";

export class B2StorageAdapter implements StorageProvider {
  readonly id = "backblaze-b2";
  readonly displayName = "Backblaze B2";
  readonly credentialsKeys = ["applicationKeyId", "applicationKey"];
  readonly configKeys = ["endpoint", "bucketName", "publicDomain"];

  private client: S3Client;
  private bucket: string;
  private publicDomain?: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!credentials.applicationKeyId || !credentials.applicationKey) {
      throw new Error("B2: missing applicationKeyId or applicationKey");
    }
    if (!config.endpoint || !config.bucketName) {
      throw new Error("B2: missing endpoint or bucketName");
    }
    this.bucket = config.bucketName;
    this.publicDomain = config.publicDomain;
    this.client = new S3Client({
      region: "us-west-004",
      endpoint: config.endpoint, // e.g. https://s3.us-west-004.backblazeb2.com
      credentials: {
        accessKeyId: credentials.applicationKeyId,
        secretAccessKey: credentials.applicationKey,
      },
    });
  }

  async upload(
    file: Buffer,
    key: string,
    contentType: string,
    metadata?: Record<string, string>,
  ): Promise<UploadResult> {
    const start = Date.now();
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
      Metadata: metadata,
    });
    await this.client.send(command);
    const url = this.publicDomain
      ? `https://${this.publicDomain}/${key}`
      : await this.getSignedUrlInternal(key, 3600);
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[b2] uploaded");
    return { key, url, size: file.length };
  }

  async get(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    const response = await this.client.send(command);
    if (!response.Body) throw new Error(`B2: empty body for ${key}`);
    return Buffer.from(await response.Body.transformToByteArray());
  }

  async getUrl(key: string, options?: { expiresIn?: number }): Promise<string> {
    if (this.publicDomain) {
      return `https://${this.publicDomain}/${key}`;
    }
    return this.getSignedUrlInternal(key, options?.expiresIn ?? 3600);
  }

  private async getSignedUrlInternal(key: string, expiresIn: number): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn });
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
    await this.client.send(command);
  }

  async list(prefix?: string, limit = 1000): Promise<StorageObject[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
      MaxKeys: limit,
    });
    const response = await this.client.send(command);
    return (response.Contents ?? []).map((obj) => ({
      key: obj.Key!,
      size: obj.Size ?? 0,
      contentType: "application/octet-stream",
      lastModified: obj.LastModified ?? new Date(),
      etag: obj.ETag,
    }));
  }

  async healthCheck(): Promise<HealthResult> {
    const start = Date.now();
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage(): Promise<StorageUsage> {
    return { storageBytes: 0, objectCount: 0 };
  }
}
