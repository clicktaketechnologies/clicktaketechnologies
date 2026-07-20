/**
 * ClickTake Media CDN Failover Router — Cloudflare Worker
 *
 * Sits in front of all media CDN origins (Cloudflare Images, Cloudinary,
 * ImageKit, Uploadcare, TwicPics). For every image request:
 *
 *   1. Tries the primary origin (lowest priority number from config).
 *   2. If 5xx / 524 / network error / latency > THRESHOLD_MS → next provider.
 *   3. Returns the first successful response (with `x-cdn-provider` header).
 *   4. Falls back to R2 bucket if ALL CDNs are unreachable.
 *   5. Returns a 502 with a JSON error envelope if everything fails.
 *
 * Deploy:
 *   cd workers/cloudflare
 *   npx wrangler deploy media-failover-router.ts --name media-failover --compatibility-date 2026-01-01
 *
 * Config: bound via Worker env vars / KV namespace `MEDIA_CONFIG`
 *   - MEDIA_CONFIG (JSON): { providers: [{id, priority, baseUrl, transformPath}], r2Bucket, fallbackTtl }
 *   - R2_BUCKET (R2 binding): media-failover-fallback
 *
 * Route: media.clicktaketech.com/* → this worker
 */

interface ProviderConfig {
  id: string;
  priority: number;
  baseUrl: string;
  /** Optional path prefix translator (e.g. uploadcare uses "/cdn/", cloudinary uses "/<cloud>/<fetch>"). */
  transformPath?: (reqPath: string, search: string) => string;
  /** If true, only used as last resort (R2 fallback bucket). */
  isFallback?: boolean;
}

interface Env {
  MEDIA_CONFIG: string; // JSON
  R2_BUCKET: R2Bucket;
  /** Optional: KV namespace for live config updates without redeploy. */
  MEDIA_CONFIG_KV?: KVNamespace;
}

const LATENCY_THRESHOLD_MS = 4000;
const R2_FALLBACK_TTL_SECONDS = 60 * 60; // 1 hour

/** Parse provider chain — reads from KV if bound (hot-reloadable), else env var. */
async function loadProviderChain(env: Env): Promise<ProviderConfig[]> {
  let raw: string | null = null;
  if (env.MEDIA_CONFIG_KV) {
    raw = await env.MEDIA_CONFIG_KV.get("providerChain");
  }
  if (!raw) raw = env.MEDIA_CONFIG;
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.providers)) return [];
    return parsed.providers
      .filter((p: any) => p && p.id && p.baseUrl)
      .sort((a: any, b: any) => (a.priority ?? 99) - (b.priority ?? 99));
  } catch {
    return [];
  }
}

/** Identity transform — pass request path through unchanged. */
function identityPath(reqPath: string, _search: string): string {
  return reqPath;
}

function buildUrl(provider: ProviderConfig, reqPath: string, search: string): string {
  const transform = provider.transformPath ?? identityPath;
  const path = transform(reqPath, search);
  const base = provider.baseUrl.replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

async function fetchWithTimeout(
  url: string,
  opts: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function tryProvider(
  provider: ProviderConfig,
  reqPath: string,
  search: string,
): Promise<Response | null> {
  const url = buildUrl(provider, reqPath, search);
  try {
    const start = Date.now();
    const res = await fetchWithTimeout(
      url,
      {
        method: "GET",
        // Don't forward original headers (CDNs do their own caching).
        headers: { Accept: "image/*,*/*;q=0.8" },
        cf: {
          cacheTtl: 60 * 60 * 24,
          cacheEverything: true,
        },
      },
      LATENCY_THRESHOLD_MS,
    );
    const elapsed = Date.now() - start;

    if (res.ok && elapsed < LATENCY_THRESHOLD_MS) {
      // Strip Set-Cookie / Vary headers from origin to keep CDN cacheable.
      const headers = new Headers(res.headers);
      headers.set("x-cdn-provider", provider.id);
      headers.set("x-cdn-latency-ms", String(elapsed));
      headers.set("cache-control", "public, max-age=86400, s-maxage=604800");
      headers.delete("set-cookie");
      headers.set("vary", "Accept");
      const body = await res.arrayBuffer();
      return new Response(body, {
        status: res.status,
        statusText: res.statusText,
        headers,
      });
    }
    // 4xx/5xx — try next
    return null;
  } catch {
    return null;
  }
}

async function tryR2Fallback(env: Env, reqPath: string): Promise<Response | null> {
  if (!env.R2_BUCKET) return null;
  try {
    const key = reqPath.replace(/^\/+/, "");
    const obj = await env.R2_BUCKET.get(key);
    if (!obj) return null;
    const headers = new Headers();
    obj.writeHttpMetadata(headers);
    headers.set("etag", obj.httpEtag);
    headers.set("cache-control", `public, max-age=${R2_FALLBACK_TTL_SECONDS}`);
    headers.set("x-cdn-provider", "r2-fallback");
    headers.set("x-cdn-fallback", "true");
    return new Response(obj.body, { status: 200, headers });
  } catch {
    return null;
  }
}

function errorResponse(status: number, message: string, details?: unknown): Response {
  return new Response(
    JSON.stringify({ error: message, details: details ?? null, ts: Date.now() }),
    {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}

export default {
  async fetch(req: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const reqPath = url.pathname;
    const search = url.search;

    // OPTIONS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, HEAD, OPTIONS",
          "access-control-max-age": "86400",
        },
      });
    }

    // Only allow GET/HEAD for media
    if (req.method !== "GET" && req.method !== "HEAD") {
      return errorResponse(405, "Method not allowed");
    }

    // Health check endpoint
    if (reqPath === "/__health") {
      const chain = await loadProviderChain(env);
      return new Response(
        JSON.stringify({
          ok: true,
          providers: chain.map((p) => p.id),
          r2Fallback: !!env.R2_BUCKET,
          ts: Date.now(),
        }),
        { headers: { "content-type": "application/json" } },
      );
    }

    const chain = await loadProviderChain(env);
    if (chain.length === 0) {
      return errorResponse(503, "No media CDN providers configured");
    }

    // Try each provider in priority order
    for (const provider of chain) {
      if (provider.isFallback) continue;
      const res = await tryProvider(provider, reqPath, search);
      if (res) return res;
    }

    // Last resort: R2 fallback bucket
    const r2res = await tryR2Fallback(env, reqPath);
    if (r2res) return r2res;

    return errorResponse(502, "All media CDN providers failed", {
      tried: chain.map((p) => p.id),
    });
  },
};
