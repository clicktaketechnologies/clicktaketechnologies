/**
 * Integration test helpers — env loading, HTTP client, assertions.
 *
 * Uses Node's built-in test runner (no jest/vitest needed).
 * Targets the running dev server at BASE_URL (defaults to http://localhost:3000).
 */

import { config as loadEnv } from "dotenv";
import { resolve } from "path";

loadEnv({ path: resolve(process.cwd(), ".env") });

export const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
export const CRON_SECRET = process.env.CRON_SECRET || "";
export const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || "admin@clicktaketech.com";
export const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || "Admin@2026";

export interface ApiResponse<T = any> {
  status: number;
  ok: boolean;
  body: T;
  headers: Headers;
}

export async function api(
  path: string,
  init: RequestInit = {},
  opts: { cronSecret?: boolean } = {},
): Promise<ApiResponse> {
  const headers = new Headers(init.headers);
  if (init.body && typeof init.body === "string" && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  if (opts.cronSecret && CRON_SECRET) {
    headers.set("authorization", `Bearer ${CRON_SECRET}`);
  }
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  let body: any = null;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    body = await res.json().catch(() => null);
  } else {
    body = await res.text().catch(() => null);
  }
  return { status: res.status, ok: res.ok, body, headers: res.headers };
}

let cachedAdminCookie: string | null = null;

/** Sign in as admin once, cache the session cookie for subsequent calls. */
export async function adminSession(): Promise<string> {
  if (cachedAdminCookie) return cachedAdminCookie;

  // NextAuth credentials flow expects CSRF token first.
  const csrfRes = await api("/api/auth/csrf");
  if (!csrfRes.ok || !csrfRes.body?.csrfToken) {
    throw new Error(`Failed to fetch CSRF token: ${csrfRes.status}`);
  }
  const cookie = csrfRes.headers.get("set-cookie") || "";
  const csrfCookie = cookie.split(";")[0];

  const res = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie: csrfCookie,
    },
    body: new URLSearchParams({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      csrfToken: csrfRes.body.csrfToken,
      callbackUrl: "/admin",
      json: "true",
    }),
    redirect: "manual",
  });

  const setCookie = res.headers.get("set-cookie") || "";
  const sessionCookies = setCookie
    .split(/,(?=\s*[A-Za-z0-9_-]+=)/) // split on cookies, not attributes
    .filter((c) => c.includes("next-auth.session-token") || c.includes("__Secure-"))
    .map((c) => c.split(";")[0])
    .join("; ");

  if (!sessionCookies) {
    throw new Error(`Admin login failed: ${res.status} ${res.statusText}`);
  }
  cachedAdminCookie = `${csrfCookie.split("=")[0] ? csrfCookie + "; " : ""}${sessionCookies}`;
  return cachedAdminCookie;
}

/** Make an authenticated admin API call. */
export async function adminApi(
  path: string,
  init: RequestInit = {},
): Promise<ApiResponse> {
  const cookie = await adminSession();
  const headers = new Headers(init.headers);
  headers.set("cookie", cookie);
  return api(path, { ...init, headers });
}

/** Skip a test gracefully — used when no providers are configured. */
export function skipIf(condition: boolean, reason: string): boolean {
  if (condition) {
    console.log(`   ⏭️  SKIP: ${reason}`);
    return true;
  }
  return false;
}

/** Wait for ms milliseconds. */
export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
