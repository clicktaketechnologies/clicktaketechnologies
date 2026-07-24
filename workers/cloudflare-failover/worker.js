/**
 * Cloudflare Worker — Active/Passive Failover Reverse Proxy
 *
 * Routes all traffic to PRIMARY backend (cPanel). On 5xx or timeout, opens
 * the circuit and routes to SECONDARY backend (Vercel) for COOLDOWN seconds.
 * After cooldown, tries PRIMARY again — if healthy, closes the circuit.
 *
 * State is per-isolate (per-edge-location) in-memory. That's fine: each
 * Cloudflare edge location independently detects primary failure within
 * ~5 seconds and routes to secondary. No KV/Durable Object needed.
 *
 * Both backends MUST share the same Supabase DB so sessions work on both.
 *
 * Config (set in wrangler.toml [vars] or via `wrangler secret put`):
 *   PRIMARY_BACKEND     — e.g. https://clicktaketech.com (cPanel URL)
 *   SECONDARY_BACKEND   — e.g. https://clicktake.vercel.app
 *   HEALTH_PATH         — defaults to /api/health
 *   PRIMARY_TIMEOUT_MS  — per-request timeout before failover (default 5000)
 *   COOLDOWN_SEC        — how long to skip primary after a failure (default 60)
 *   HEALTH_PROBE_SEC    — background probe interval when circuit open (default 15)
 */

// ─── Per-isolate circuit breaker state ───────────────────────────────────────
// Each Worker isolate (one per edge server roughly) keeps its own state.
// This is intentional — if primary is down only in Asia, EU edges should
// still route to primary. Each edge detects independently.

const state = {
  circuitOpen: false,        // true = route everything to secondary
  openedAt: 0,               // epoch ms when circuit opened
  failureCount: 0,           // consecutive failures (resets on success)
  lastProbeAt: 0,            // epoch ms of last background health probe
};

const FAILURE_THRESHOLD = 2; // open circuit after this many consecutive fails
const MAX_FAILURE_COUNT = 1000; // prevent overflow

// ─── Helpers ─────────────────────────────────────────────────────────────────

function nowMs() {
  return Date.now();
}

function shouldTryPrimary() {
  if (!state.circuitOpen) return true;
  // Circuit is open — only try primary if cooldown elapsed
  const cooldownMs = (parseInt(globalThis.COOLDOWN_SEC || "60", 10)) * 1000;
  return (nowMs() - state.openedAt) > cooldownMs;
}

function markPrimarySuccess() {
  state.failureCount = 0;
  if (state.circuitOpen) {
    state.circuitOpen = false;
    console.log("[failover] circuit CLOSED — primary recovered");
  }
}

function markPrimaryFailure(reason) {
  state.failureCount = Math.min(state.failureCount + 1, MAX_FAILURE_COUNT);
  console.log(`[failover] primary failure #${state.failureCount}: ${reason}`);
  if (state.failureCount >= FAILURE_THRESHOLD && !state.circuitOpen) {
    state.circuitOpen = true;
    state.openedAt = nowMs();
    console.log("[failover] circuit OPENED — routing to secondary");
  }
}

async function fetchWithTimeout(url, init, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { ...init, signal: controller.signal });
    return resp;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Forward a request to a backend, preserving method/headers/body.
 * Returns the Response (body already consumed into a re-readable stream).
 */
async function forward(req, baseUrl) {
  const url = new URL(req.url);
  const target = new URL(url.pathname + url.search, baseUrl);
  const headers = new Headers(req.headers);
  headers.set("x-forwarded-host", url.host);
  headers.set("x-forwarded-proto", url.protocol.replace(":", ""));
  // Don't forward the cf-connecting-ip (Cloudflare sets it); add ours
  headers.delete("cf-connecting-ip");

  const init = {
    method: req.method,
    headers,
    redirect: "manual",
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.clone().blob();
  }
  return fetch(target.toString(), init);
}

/**
 * Background health probe (no await — fire and forget).
 * Runs only when circuit is open. Closes circuit if primary is healthy.
 */
function scheduleBackgroundProbe(req) {
  if (!state.circuitOpen) return;
  const probeIntervalMs = (parseInt(globalThis.HEALTH_PROBE_SEC || "15", 10)) * 1000;
  if (nowMs() - state.lastProbeAt < probeIntervalMs) return;
  state.lastProbeAt = nowMs();

  const healthPath = globalThis.HEALTH_PATH || "/api/health";
  const probeUrl = new URL(healthPath, globalThis.PRIMARY_BACKEND).toString();
  const timeoutMs = parseInt(globalThis.PRIMARY_TIMEOUT_MS || "5000", 10);

  // Fire-and-forget — use waitUntil via the request's ctx if available
  const probePromise = (async () => {
    try {
      const resp = await fetchWithTimeout(probeUrl, { method: "GET" }, timeoutMs);
      if (resp.status < 500) {
        markPrimarySuccess();
      }
    } catch (err) {
      // Still down — leave circuit open
      console.log(`[failover] probe still failing: ${err.message}`);
    }
  })();

  // Use ctx.waitUntil if available (extends Worker lifetime past response)
  if (typeof ctx !== "undefined" && ctx.waitUntil) {
    ctx.waitUntil(probePromise);
  }
}

// ─── Main fetch handler ──────────────────────────────────────────────────────

export default {
  async fetch(req, env, ctx) {
    // Inject env vars into globalThis for the helper functions above
    globalThis.PRIMARY_BACKEND = env.PRIMARY_BACKEND;
    globalThis.SECONDARY_BACKEND = env.SECONDARY_BACKEND;
    globalThis.HEALTH_PATH = env.HEALTH_PATH || "/api/health";
    globalThis.PRIMARY_TIMEOUT_MS = env.PRIMARY_TIMEOUT_MS || "5000";
    globalThis.COOLDOWN_SEC = env.COOLDOWN_SEC || "60";
    globalThis.HEALTH_PROBE_SEC = env.HEALTH_PROBE_SEC || "15";

    // Wire ctx for background probes
    globalThis.ctx = ctx;

    // Always schedule a background probe if circuit is open (cheap no-op otherwise)
    scheduleBackgroundProbe(req);

    const primary = env.PRIMARY_BACKEND;
    const secondary = env.SECONDARY_BACKEND;
    const timeoutMs = parseInt(env.PRIMARY_TIMEOUT_MS || "5000", 10);

    if (shouldTryPrimary()) {
      try {
        const resp = await fetchWithTimeout(
          new URL(new URL(req.url).pathname + new URL(req.url).search, primary).toString(),
          {
            method: req.method,
            headers: req.headers,
            redirect: "manual",
            body: req.method !== "GET" && req.method !== "HEAD" ? await req.clone().blob() : undefined,
          },
          timeoutMs
        );

        if (resp.status < 500) {
          markPrimarySuccess();
          // Tag the response so we can see which backend served it
          const h = new Headers(resp.headers);
          h.set("x-backend", "primary");
          return new Response(resp.body, {
            status: resp.status,
            statusText: resp.statusText,
            headers: h,
          });
        }
        // 5xx — primary is sick
        markPrimaryFailure(`HTTP ${resp.status}`);
      } catch (err) {
        markPrimaryFailure(err.message || "fetch error");
      }
    }

    // Fall through to secondary
    try {
      const resp = await forward(req, secondary);
      const h = new Headers(resp.headers);
      h.set("x-backend", "secondary");
      return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: h,
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: "Both backends unreachable",
          primary: primary,
          secondary: secondary,
          details: err.message,
        }),
        { status: 502, headers: { "content-type": "application/json" } }
      );
    }
  },
};
