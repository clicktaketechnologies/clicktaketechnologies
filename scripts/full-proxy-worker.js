/**
 * Full Proxy Worker — clicktake-web
 *
 * Lightweight proxy that forwards ALL traffic to Vercel.
 *
 * This replaces the heavy OpenNext bundle (11+ MiB) which exceeds the
 * Cloudflare Workers free-plan 3 MiB limit. Vercel already serves the
 * complete site (public pages + API + admin), so proxying everything
 * to Vercel ensures the latest code is always live without hitting
 * bundle size limits.
 *
 * Routes (defined in wrangler.toml):
 *   clicktaketech.com/*       -> this worker -> Vercel
 *   www.clicktaketech.com/*   -> this worker -> Vercel
 *
 * The clicktake-edge-proxy worker (more specific routes) still handles
 * /api/* and /admin* directly — it takes priority due to Cloudflare's
 * most-specific-route-wins rule.
 */

const DEFAULT_BACKEND_URL = "https://clicktaketechnologies.vercel.app";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const backendUrl = env.BACKEND_URL || DEFAULT_BACKEND_URL;
    const path = url.pathname;

    // ──────────────────────────────────────────────────────────────
    // Everything — forward to Vercel
    // ──────────────────────────────────────────────────────────────
    return proxyToBackend(request, url, backendUrl);
  },
};

/**
 * Forward all requests to Vercel.
 *
 * - Cookies forwarded as-is (Vercel's NEXTAUTH_URL = clicktaketech.com)
 * - Security headers stamped (mirrors src/middleware.ts)
 * - Static assets cached aggressively at the edge
 * - Admin/API responses get X-Robots-Tag: noindex, nofollow
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
    respHeaders.set("x-edge-proxy", "clicktake-web-proxy");

    // Cache immutable static assets aggressively at the edge
    if (url.pathname.includes("/_next/static/")) {
      respHeaders.set("cache-control", "public, max-age=31536000, immutable");
    }

    // Prevent indexing of admin + API responses
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) {
      respHeaders.set("x-robots-tag", "noindex, nofollow");
    }

    // Baseline security headers (mirrors src/middleware.ts)
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
 * Baseline security headers — mirrors src/middleware.ts.
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
