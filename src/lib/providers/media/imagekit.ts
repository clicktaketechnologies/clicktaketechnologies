/**
 * ImageKit Media CDN Adapter — uses ImageKit URL-based transformations.
 * Free tier: 20GB bandwidth, 2GB storage, 2k transformations/mo.
 */

import type { MediaProvider, ImageTransforms } from "./types";
import { logger } from "../logger";

export class ImageKitMediaAdapter implements MediaProvider {
  readonly id = "imagekit";
  readonly displayName = "ImageKit";
  readonly credentialsKeys = ["privateKey"];
  readonly configKeys = ["publicKey", "urlEndpoint"];

  private urlEndpoint: string;
  private privateKey?: string;
  private publicKey?: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!config.urlEndpoint) {
      throw new Error("ImageKit: missing urlEndpoint");
    }
    this.urlEndpoint = config.urlEndpoint.replace(/\/$/, "");
    this.privateKey = credentials.privateKey;
    this.publicKey = config.publicKey;
  }

  getUrl(key: string, transforms?: ImageTransforms): string {
    if (!transforms) return `${this.urlEndpoint}/${key}`;
    const parts: string[] = [];
    if (transforms.width) parts.push(`w-${transforms.width}`);
    if (transforms.height) parts.push(`h-${transforms.height}`);
    if (transforms.fit) {
      const c =
        transforms.fit === "cover"
          ? "maintain_ratio"
          : transforms.fit === "contain"
            ? "at_max"
            : "force";
      parts.push(`c-${c}`);
    }
    if (transforms.format && transforms.format !== "auto") parts.push(`f-${transforms.format}`);
    if (transforms.quality) parts.push(`q-${transforms.quality}`);
    if (transforms.blur) parts.push(`bl-${transforms.blur}`);
    const query = parts.length ? `tr:${parts.join(",")}/` : "";
    return `${this.urlEndpoint}/${query}${key}`;
  }

  async upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }> {
    if (!this.privateKey || !this.publicKey) {
      throw new Error("ImageKit: privateKey and publicKey required for upload");
    }
    const start = Date.now();
    const formData = new FormData();
    formData.append("file", new Blob([new Uint8Array(file)], { type: contentType }), key);
    formData.append("fileName", key);
    formData.append("useUniqueFileName", "false");

    const auth = Buffer.from(`${this.privateKey}:`).toString("base64");
    const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}` },
      body: formData,
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`ImageKit upload failed: ${res.status} ${txt}`);
    }
    const json: any = await res.json();
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[imagekit] uploaded");
    return { url: json.url, size: json.size ?? file.length };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    try {
      const res = await fetch(this.urlEndpoint, { method: "HEAD" });
      return { ok: res.ok || res.status === 404, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage() {
    return { bandwidthBytes: 0, transformCount: 0, storageBytes: 0 };
  }
}
