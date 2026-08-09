/**
 * Lightweight Cloudflare Worker — full proxy to Vercel backend.
 *
 * Replaces the heavy OpenNext bundle (16 MiB) to stay under the 3 MiB free-plan limit.
 * All traffic is proxied to BACKEND_URL (set via `wrangler secret put BACKEND_URL`).
 *
 * Features:
 *   - Preserves request method, headers, body, query params
 *   - Preserves response status, headers, body
 *   - Streams request/response bodies (no buffering → low memory)
 *   - Adds X-Forwarded-Proto and X-Forwarded-Host headers
 *   - Handles CORS preflight (OPTIONS) pass-through
 *   - Strips cf-* headers from upstream request to avoid loops
 */

const BACKEND_URL = typeof BACKEND_URL !== 'undefined' ? BACKEND_URL : '';
const CACHE_TTL_OK = 60; // cache 200 responses for 60s at edge
const CACHE_TTL_ERR = 10; // cache error responses for 10s

export default {
  async fetch(request, env, ctx) {
    const backend = env.BACKEND_URL || BACKEND_URL;
    if (!backend) {
      return new Response(
        JSON.stringify({
          error: 'BACKEND_URL not configured',
          hint: 'Run: wrangler secret put BACKEND_URL',
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const url = new URL(request.url);
    const targetUrl = backend.replace(/\/+$/, '') + url.pathname + url.search;

    // Build proxied request headers — strip CF-specific headers
    const reqHeaders = new Headers(request.headers);
    reqHeaders.delete('cf-connecting-ip');
    reqHeaders.delete('cf-ipcountry');
    reqHeaders.delete('cf-ray');
    reqHeaders.delete('cf-visitor');
    reqHeaders.delete('cf-worker');
    reqHeaders.set('x-forwarded-proto', url.protocol.replace(':', ''));
    reqHeaders.set('x-forwarded-host', url.host);
    reqHeaders.set('x-forwarded-for', request.headers.get('cf-connecting-ip') || '');
    reqHeaders.set('via', '1.1 clicktake-web-proxy');

    // Build upstream request
    const upstreamReq = new Request(targetUrl, {
      method: request.method,
      headers: reqHeaders,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'manual',
    });

    // Fetch from backend
    let upstreamRes;
    try {
      upstreamRes = await fetch(upstreamReq);
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: 'Backend unreachable',
          backend: backend,
          message: err.message || String(err),
        }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${CACHE_TTL_ERR}`,
          },
        }
      );
    }

    // Build response — preserve status + headers, stream body
    const resHeaders = new Headers(upstreamRes.headers);
    // Don't let Cloudflare compress again if backend already compressed
    resHeaders.delete('content-encoding');
    // Add cache hint for successful responses
    if (upstreamRes.status === 200 && !resHeaders.has('Cache-Control')) {
      resHeaders.set('Cache-Control', `public, max-age=${CACHE_TTL_OK}, s-maxage=${CACHE_TTL_OK * 5}`);
    }

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers: resHeaders,
    });
  },
};
