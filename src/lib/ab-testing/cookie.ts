// ─────────────────────────────────────────────────────────────────────────────
// Visitor cookie helpers for A/B testing.
//
// Single cookie: `ct_visitor` — a cuid that uniquely identifies an anonymous
// visitor across sessions (1-year expiry). It is NOT an authentication
// credential and NOT a tracking pixel — it exists purely to:
//
//   1. Deterministically bucket the visitor into experiment variants.
//   2. Join exposure records to conversion events when the visitor
//      eventually submits a lead.
//
// Cookie attributes:
//   - HttpOnly: yes (not readable by client-side JS; reduces XSS exfil risk)
//   - Secure:   yes in production (set via `secure` flag based on NODE_ENV)
//   - SameSite: Lax (sent on top-level navigations; blocks CSRF cross-site)
//   - Path:     /
//   - Max-Age:  31536000 (1 year)
//
// The cookie is set on first request via middleware. If a visitor clears
// cookies, they get a new id and may be re-bucketed — this is acceptable
// (rare, and we have no way to recover identity without PII).
// ─────────────────────────────────────────────────────────────────────────────

import { createId } from "@paralleldrive/cuid2";

export const VISITOR_COOKIE_NAME = "ct_visitor";
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year (seconds)

/**
 * Generate a fresh visitor id (cuid). Used when no cookie is present.
 */
export function generateVisitorId(): string {
  return createId();
}

/**
 * Serialize a Set-Cookie header value for the visitor cookie.
 *
 * @param value     The cookie value (cuid).
 * @param isSecure  Whether to set the Secure flag (true in prod, false in dev).
 * @returns         A string suitable for the Set-Cookie header.
 */
export function serializeVisitorCookie(value: string, isSecure: boolean): string {
  const parts = [
    `${VISITOR_COOKIE_NAME}=${value}`,
    "Path=/",
    `Max-Age=${VISITOR_COOKIE_MAX_AGE}`,
    "SameSite=Lax",
    "HttpOnly",
  ];
  if (isSecure) parts.push("Secure");
  return parts.join("; ");
}

/**
 * Parse the visitor cookie from a Cookie header string.
 * Returns null if not present or empty.
 *
 * Works on both the server (where we read req.headers.get("cookie"))
 * and the client (where we read document.cookie) — the parsing logic
 * is identical.
 */
export function parseVisitorCookie(cookieHeader: string | null | undefined): string | null {
  if (!cookieHeader) return null;
  // Split on semicolons, then look for ct_visitor=...
  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [name, ...valueParts] = part.trim().split("=");
    if (name === VISITOR_COOKIE_NAME) {
      const value = valueParts.join("=").trim();
      if (value) return value;
    }
  }
  return null;
}

/**
 * Read the visitor cookie on the client side (post-hydration).
 *
 * Returns null on the server (no document) or if the cookie is absent.
 * The AbTest client component uses this to determine which variant to
 * render after mount — server-rendered HTML always shows control to
 * avoid hydration mismatches, then the client swaps in the assigned
 * variant on mount.
 */
export function getVisitorIdFromBrowser(): string | null {
  if (typeof document === "undefined") return null;
  return parseVisitorCookie(document.cookie);
}
