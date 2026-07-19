/**
 * Media CDN provider interface — implemented by Cloudflare, Cloudinary,
 * ImageKit, Uploadcare, TwicPics. Used for image transformation + delivery.
 */

export interface ImageTransforms {
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "scale-down" | "crop";
  format?: "auto" | "webp" | "avif" | "jpeg" | "png";
  quality?: number;
  blur?: number;
  sharpen?: number;
  gravity?: "auto" | "face" | "center";
}

export interface MediaProvider {
  readonly id: string;
  readonly displayName: string;
  readonly credentialsKeys: string[];
  readonly configKeys: string[];

  getUrl(key: string, transforms?: ImageTransforms): string;

  upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }>;

  healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }>;

  getUsage(): Promise<{ bandwidthBytes: number; transformCount: number; storageBytes: number }>;
}
