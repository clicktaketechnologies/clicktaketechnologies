/**
 * Cloudflare Images Adapter — uses Cloudflare's image transformation service
 * via URL params. Supports Polish + Mirage + AVIF/WebP auto-negotiation.
 *
 * Two modes supported:
 * - "Custom domain" (images.clicktaketech.com/<key>?width=...&height=...)
 * - "Account hash" (imagedelivery.net/<hash>/<key>/<variant>)
 */

import type { MediaProvider, ImageTransforms } from "./types";
import { logger } from "../logger";

export class CloudflareMediaAdapter implements MediaProvider {
  readonly id = "cloudflare";
  readonly displayName = "Cloudflare Images";
  readonly credentialsKeys = ["apiToken"];
  readonly configKeys = ["accountHash", "deliveryDomain", "accountId"];

  private deliveryDomain?: string;
  private accountHash?: string;
  private accountId?: string;
  private apiToken?: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    this.accountHash = config.accountHash;
    this.deliveryDomain = config.deliveryDomain; // e.g. images.clicktaketech.com
    this.accountId = config.accountId;
    this.apiToken = credentials.apiToken;
    if (!this.deliveryDomain && !this.accountHash) {
      throw new Error("Cloudflare Images: requires either deliveryDomain or accountHash");
    }
  }

  getUrl(key: string, transforms?: ImageTransforms): string {
    const base = this.deliveryDomain
      ? `https://${this.deliveryDomain}/${key}`
      : `https://imagedelivery.net/${this.accountHash}/${key}/public`;

    if (!transforms) return base;

    const params = new URLSearchParams();
    if (transforms.width) params.set("width", String(transforms.width));
    if (transforms.height) params.set("height", String(transforms.height));
    if (transforms.fit) params.set("fit", transforms.fit);
    if (transforms.format && transforms.format !== "auto") params.set("format", transforms.format);
    if (transforms.quality) params.set("quality", String(transforms.quality));
    if (transforms.blur) params.set("blur", String(transforms.blur));
    if (transforms.sharpen) params.set("sharpen", String(transforms.sharpen));
    if (transforms.gravity) params.set("gravity", transforms.gravity);

    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  async upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }> {
    if (!this.apiToken || !this.accountId) {
      throw new Error("Cloudflare Images: apiToken and accountId required for upload");
    }
    const start = Date.now();
    const formData = new FormData();
    formData.append("file", new Blob([new Uint8Array(file)], { type: contentType }), key);
    formData.append("id", key);

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiToken}` },
        body: formData,
      },
    );
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Cloudflare Images upload failed: ${res.status} ${txt}`);
    }
    const url = this.getUrl(key);
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[cloudflare-media] uploaded");
    return { url, size: file.length };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    if (!this.apiToken || !this.accountId) {
      // URL-only mode — assume healthy (no API to ping)
      return { ok: true, latencyMs: 0 };
    }
    const start = Date.now();
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1/stats`,
        { headers: { Authorization: `Bearer ${this.apiToken}` } },
      );
      return { ok: res.ok, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage() {
    return { bandwidthBytes: 0, transformCount: 0, storageBytes: 0 };
  }
}
