/**
 * Uploadcare Media CDN Adapter — uses Uploadcare's URL-based transformations.
 * Free tier: 3GB storage, 3k transformations/mo, 500 uploads/mo.
 */

import type { MediaProvider, ImageTransforms } from "./types";
import { logger } from "../logger";

export class UploadcareMediaAdapter implements MediaProvider {
  readonly id = "uploadcare";
  readonly displayName = "Uploadcare";
  readonly credentialsKeys = ["secretKey"];
  readonly configKeys = ["publicKey"];

  private publicKey: string;
  private secretKey?: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!config.publicKey) throw new Error("Uploadcare: missing publicKey");
    this.publicKey = config.publicKey;
    this.secretKey = credentials.secretKey;
  }

  getUrl(key: string, transforms?: ImageTransforms): string {
    // key = UUID returned by Uploadcare on upload
    const base = `https://ucarecdn.com/${key}/`;
    if (!transforms) return base + "-/preview/";
    const parts: string[] = [];
    if (transforms.width) parts.push(`resize/${transforms.width}x`);
    if (transforms.format && transforms.format !== "auto") parts.push(`format/${transforms.format}`);
    if (transforms.quality) parts.push(`quality/${transforms.quality}`);
    if (transforms.blur) parts.push(`blur/${transforms.blur}`);
    return base + "-/" + parts.join("/-/") + "/";
  }

  async upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }> {
    if (!this.secretKey) throw new Error("Uploadcare: secretKey required for upload");
    const start = Date.now();
    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", this.publicKey);
    formData.append("file", new Blob([new Uint8Array(file)], { type: contentType }), key);
    const res = await fetch("https://upload.uploadcare.com/base/", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`Uploadcare upload failed: ${res.status}`);
    const json: any = await res.json();
    const uuid = json.file;
    logger.info({ key, uuid, size: file.length, ms: Date.now() - start }, "[uploadcare] uploaded");
    return { url: `https://ucarecdn.com/${uuid}/`, size: file.length };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    try {
      const res = await fetch(`https://ucarecdn.com/${this.publicKey}/`, { method: "HEAD" });
      return { ok: true, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage() {
    return { bandwidthBytes: 0, transformCount: 0, storageBytes: 0 };
  }
}
