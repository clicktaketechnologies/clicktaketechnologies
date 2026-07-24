/**
 * Edge Proxy Worker — clicktake-edge-proxy
 *
 * Routes:
 *   /admin*             -> forward to Vercel
 *   /api*               -> forward to Vercel
 *   /_next/static/*     -> try Vercel first, fall back to clicktake-web Worker
 *                          (because the Worker and Vercel were built separately,
 *                          their CSS chunk hashes differ — admin pages reference
 *                          Vercel's hashes, public pages reference Worker's)
 *
 * Auth/session cookies are forwarded as-is. Vercel's NEXTAUTH_URL is set to
 * https://clicktaketech.com so cookie domain validation passes.
 */

const BACKEND_URL = "https://clicktaketechnologies-kp5r.vercel.app";
const WORKER_DEV_URL = "https://clicktake-web.clicktake-web.workers.dev";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const backendUrl = env.BACKEND_URL || BACKEND_URL;
    const path = url.pathname;

    // ──────────────────────────────────────────────────────────────
    // /_next/static/* — try Vercel first, fall back to the Worker
    // ──────────────────────────────────────────────────────────────
    if (path.startsWith("/_next/static/")) {
      return proxyStaticAsset(request, url, backendUrl);
    }

    // ──────────────────────────────────────────────────────────────
    // /admin* and /api* — forward to Vercel
    // ──────────────────────────────────────────────────────────────
    return proxyToBackend(request, url, backendUrl);
  },
};

/**
 * For static assets: try Vercel first (admin pages reference Vercel's
 * content-hashed chunks). If Vercel 404s, fall back to the Worker's
 * workers.dev URL (public pages reference the Worker's hashed chunks).
 */
async function proxyStaticAsset(request, url, backendUrl) {
  const cleanHeaders = stripCfHeaders(request.headers);
  cleanHeaders.set("host", new URL(backendUrl).host);

  const target = new URL(url.pathname + url.search, backendUrl);

  try {
    const upstream = await fetch(target.toString(), {
      method: request.method,
      headers: cleanHeaders,
      redirect: "manual",
    });

    // Vercel returns 404 as a small HTML/text page. If we got CSS/JS
    // content-type with 200, we're good.
    const ct = upstream.headers.get("content-type") || "";
    if (
      upstream.status === 200 &&
      (ct.includes("text/css") ||
        ct.includes("javascript") ||
        ct.includes("font") ||
        ct.includes("image") ||
        ct.includes("application/json") ||
        ct.includes("text/plain") ||
        ct.includes("wasm"))
    ) {
      const respHeaders = new Headers(upstream.headers);
      respHeaders.set("x-proxied-to", "vercel-edge-asset");
      respHeaders.set("x-edge-proxy", "clicktake-edge-proxy");
      // Cache immutable assets aggressively at the edge
      if (url.pathname.includes("/_next/static/")) {
        respHeaders.set("cache-control", "public, max-age=31536000, immutable");
      }
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: respHeaders,
      });
    }

    // Vercel didn't have it — fall back to the Worker
    return fetchFromWorker(request, url);
  } catch (err) {
    return fetchFromWorker(request, url);
  }
}

/**
 * Fall back to the Cloudflare Worker's workers.dev URL — this serves
 * the Worker's own build of the static assets (different hashes than
 * Vercel, but matching what the public pages reference).
 */
async function fetchFromWorker(request, url) {
  const cleanHeaders = stripCfHeaders(request.headers);
  const target = new URL(url.pathname + url.search, WORKER_DEV_URL);
  cleanHeaders.set("host", new URL(WORKER_DEV_URL).host);

  try {
    const upstream = await fetch(target.toString(), {
      method: request.method,
      headers: cleanHeaders,
      redirect: "manual",
    });

    const respHeaders = new Headers(upstream.headers);
    respHeaders.set("x-proxied-to", "worker-fallback-asset");
    respHeaders.set("x-edge-proxy", "clicktake-edge-proxy");
    if (url.pathname.includes("/_next/static/")) {
      respHeaders.set("cache-control", "public, max-age=31536000, immutable");
    }
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: respHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Asset unreachable on both Vercel and Worker",
        details: err.message,
        path: url.pathname,
      }),
      {
        status: 502,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

/**
 * Forward /admin* and /api* requests to Vercel.
 *
 * FIX-E (audit): stamps X-Robots-Tag: noindex, nofollow so admin pages and
 *                 JSON API responses are never indexed.
 * FIX-I (audit): stamps baseline security headers (HSTS, X-Frame-Options,
 *                 X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
 *                 since this Worker bypasses the Next.js middleware that
 *                 applies them on the public-site Worker.
 */
async function proxyToBackend(request, url, backendUrl) {
  const target = new URL(url.pathname + url.search, backendUrl);

  const headers = stripCfHeaders(request.headers);
  headers.set("x-forwarded-host", url.host);
  headers.set("x-forwarded-proto", "https");
  headers.set("x-forwarded-for", request.headers.get("cf-connecting-ip") || "");
  headers.set("host", target.host);

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.blob();
  }

  try {
    const upstream = await fetch(target.toString(), init);

    const respHeaders = new Headers(upstream.headers);
    respHeaders.set("x-proxied-to", "vercel-edge");
    respHeaders.set("x-edge-proxy", "clicktake-edge-proxy");

    // FIX-E: prevent indexing of admin + API responses
    respHeaders.set("x-robots-tag", "noindex, nofollow");

    // FIX-I: baseline security headers (mirrors src/middleware.ts)
    stampSecurityHeaders(respHeaders);

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: respHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Backend unreachable",
        details: err.message,
        backendUrl,
        path: url.pathname,
      }),
      {
        status: 502,
        headers: { "content-type": "application/json" },
      }
    );
  }
}

/**
 * FIX-I (audit): baseline security headers — mirrors the set in
 * src/middleware.ts so admin/API responses get the same protection
 * as public HTML pages. CSP is intentionally omitted (needs per-route
 * allowlist work).
 */
function stampSecurityHeaders(h) {
  h.set("strict-transport-security", "max-age=63072000; includeSubDomains; preload");
  h.set("x-frame-options", "SAMEORIGIN");
  h.set("x-content-type-options", "nosniff");
  h.set("referrer-policy", "strict-origin-when-cross-origin");
  h.set(
    "permissions-policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()"
  );
  h.delete("x-powered-by");
}

/**
 * Strip Cloudflare-injected headers that confuse upstream servers.
 */
function stripCfHeaders(headers) {
  const h = new Headers(headers);
  h.delete("cf-connecting-ip");
  h.delete("cf-ipcountry");
  h.delete("cf-ray");
  h.delete("cf-visitor");
  h.delete("cf-worker");
  h.delete("x-real-ip");
  return h;
}
