/**
 * TwicPics Media CDN Adapter — uses TwicPics URL-based transformations.
 * Free tier: 1TB bandwidth, 25k transformations/mo.
 */

import type { MediaProvider, ImageTransforms } from "./types";
import { logger } from "../logger";

export class TwicPicsMediaAdapter implements MediaProvider {
  readonly id = "twicpics";
  readonly displayName = "TwicPics";
  readonly credentialsKeys = ["apiKey"];
  readonly configKeys = ["domain"];

  private domain: string;
  private apiKey?: string;

  constructor(credentials: Record<string, string>, config: Record<string, string>) {
    if (!config.domain) throw new Error("TwicPics: missing domain");
    this.domain = config.domain.replace(/\/$/, "");
    this.apiKey = credentials.apiKey;
  }

  getUrl(key: string, transforms?: ImageTransforms): string {
    if (!transforms) return `${this.domain}/${key}`;
    const params: string[] = [];
    if (transforms.width) params.push(`w=${transforms.width}`);
    if (transforms.height) params.push(`h=${transforms.height}`);
    if (transforms.fit) {
      const c =
        transforms.fit === "cover"
          ? "cover"
          : transforms.fit === "contain"
            ? "inside"
            : "resize";
      params.push(`cover=${c}`);
    }
    if (transforms.format && transforms.format !== "auto") params.push(`format=${transforms.format}`);
    if (transforms.quality) params.push(`q=${transforms.quality}`);
    if (transforms.blur) params.push(`blur=${transforms.blur}`);
    return `${this.domain}/${key}?twic=v1/${params.join("/")}`;
  }

  async upload(file: Buffer, key: string, contentType: string): Promise<{ url: string; size: number }> {
    if (!this.apiKey) throw new Error("TwicPics: apiKey required for upload");
    const start = Date.now();
    const res = await fetch(`${this.domain}/${key}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": contentType,
      },
      body: new Uint8Array(file),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`TwicPics upload failed: ${res.status} ${txt}`);
    }
    logger.info({ key, size: file.length, ms: Date.now() - start }, "[twicpics] uploaded");
    return { url: this.getUrl(key), size: file.length };
  }

  async healthCheck(): Promise<{ ok: boolean; latencyMs: number; message?: string }> {
    const start = Date.now();
    try {
      const res = await fetch(this.domain, { method: "HEAD" });
      return { ok: res.ok || res.status === 404, latencyMs: Date.now() - start };
    } catch (err: any) {
      return { ok: false, latencyMs: Date.now() - start, message: err.message };
    }
  }

  async getUsage() {
    return { bandwidthBytes: 0, transformCount: 0, storageBytes: 0 };
  }
}
