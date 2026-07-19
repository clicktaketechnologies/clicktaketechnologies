/**
 * Storage provider interface — implemented by R2, B2, Cloudinary, Supabase.
 * All adapters must implement this contract so the registry can swap them.
 */

export interface StorageProvider {
  readonly id: string;
  readonly displayName: string;
  readonly credentialsKeys: string[];
  readonly configKeys: string[];

  upload(
    file: Buffer,
    key: string,
    contentType: string,
    metadata?: Record<string, string>,
  ): Promise<UploadResult>;

  get(key: string): Promise<Buffer>;

  getUrl(key: string, options?: { expiresIn?: number }): Promise<string>;

  delete(key: string): Promise<void>;

  list(prefix?: string, limit?: number): Promise<StorageObject[]>;

  healthCheck(): Promise<HealthResult>;

  getUsage(): Promise<StorageUsage>;
}

export interface UploadResult {
  key: string;
  url: string;
  size: number;
  etag?: string;
  replicatedTo?: string[];
}

export interface StorageObject {
  key: string;
  size: number;
  contentType: string;
  lastModified: Date;
  etag?: string;
}

export interface HealthResult {
  ok: boolean;
  latencyMs: number;
  message?: string;
}

export interface StorageUsage {
  storageBytes: number;
  objectCount: number;
}

export type StorageAdapterConfig = {
  credentials: Record<string, string>;
  config: Record<string, string>;
};
