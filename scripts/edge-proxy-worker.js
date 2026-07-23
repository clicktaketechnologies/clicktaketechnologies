/**
 * Edge Proxy Worker — clicktake-edge-proxy
 *
 * Sits in front of the existing `clicktake-web` Worker (which serves public
 * landing pages) and intercepts /admin/* and /api/* paths, proxying them
 * directly to the Vercel backend.
 *
 * Why this exists:
 *   The OpenNext middleware inside `clicktake-web` was supposed to proxy
 *   /admin/* and /api/* to Vercel via BACKEND_URL, but the OpenNext runtime
 *   doesn't reliably invoke the middleware for dynamic admin routes (it
 *   tries to render the page server-side and crashes on Prisma). This
 *   dedicated Worker intercepts those paths at the edge BEFORE they reach
 *   the OpenNext Worker, eliminating the dependency on middleware behavior.
 *
 * Routing:
 *   /admin/*  -> this Worker  -> Vercel
 *   /api/*    -> this Worker  -> Vercel
 *   /*        -> clicktake-web Worker (public pages, prerendered HTML)
 *
 * Auth/session cookies:
 *   Cookies are forwarded as-is. The user authenticates against
 *   clicktaketech.com (their browser's domain), and the cookie is sent to
 *   this Worker, which forwards it to Vercel. Vercel's NEXTAUTH_URL is set
 *   to https://clicktaketech.com so cookie domain validation passes.
 */

const BACKEND_URL = "https://clicktaketechnologies-kp5r.vercel.app";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const backendUrl = env.BACKEND_URL || BACKEND_URL;
    const target = new URL(url.pathname + url.search, backendUrl);

    // Build forwarded headers — keep the user's cookies, set x-forwarded-*
    // so Vercel/NextAuth know the original host (clicktaketech.com).
    const headers = new Headers(request.headers);
    headers.set("x-forwarded-host", url.host);
    headers.set("x-forwarded-proto", "https");
    headers.set("x-forwarded-for", request.headers.get("cf-connecting-ip") || "");
    // Host header must match the Vercel target, otherwise Vercel rejects.
    headers.set("host", target.host);
    // Some CDNs/runtimes reject this — strip it.
    headers.delete("cf-connecting-ip");
    headers.delete("cf-ipcountry");
    headers.delete("cf-ray");
    headers.delete("cf-visitor");
    headers.delete("cf-worker");
    headers.delete("x-real-ip");

    const init = {
      method: request.method,
      headers,
      redirect: "manual", // pass Vercel's redirects (307 to /admin/login etc.) straight to the browser
    };
    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = await request.blob();
    }

    try {
      const upstream = await fetch(target.toString(), init);

      // Clone headers so we can safely mutate (some are immutable).
      const respHeaders = new Headers(upstream.headers);
      respHeaders.set("x-proxied-to", "vercel-edge");
      respHeaders.set("x-edge-proxy", "clicktake-edge-proxy");

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
  },
};
