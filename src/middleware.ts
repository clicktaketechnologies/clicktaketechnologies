// Root middleware — handles:
//   1. SEO canonical redirect: www.clicktaketech.com → clicktaketech.com (308 permanent)
//   2. Backend proxy: when BACKEND_URL is set, /api/* and /admin/* are proxied
//      to the Render backend (so the CF Worker bundle stays tiny and DB code
//      lives only on Render).
//   3. Admin route protection via NextAuth session cookie (skipped when proxying)
import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "clicktaketech.com";

export async function middleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl;

  // 1. Canonical redirect: www → apex (308 = permanent, preserves method)
  if (
    hostname === `www.${CANONICAL_HOST}` &&
    process.env.NODE_ENV === "production"
  ) {
    const apexUrl = new URL(req.url);
    apexUrl.hostname = CANONICAL_HOST;
    return NextResponse.redirect(apexUrl, 308);
  }

  // 2. Backend proxy — if BACKEND_URL is set, forward /api/* and /admin/* to
  //    the Render backend. This keeps DB code off the CF Worker entirely.
  const backendUrl = process.env.BACKEND_URL;
  if (backendUrl && (pathname.startsWith("/api/") || pathname.startsWith("/admin"))) {
    const target = new URL(pathname + req.nextUrl.search, backendUrl);
    const headers = new Headers(req.headers);
    headers.set("x-forwarded-host", req.nextUrl.host);
    headers.set("x-forwarded-proto", req.nextUrl.protocol.replace(":", ""));

    // Clone the request so the body can be re-read by fetch().
    const init: RequestInit = {
      method: req.method,
      headers,
      redirect: "manual",
    };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = await req.blob();
    }

    try {
      const upstream = await fetch(target.toString(), init);
      // Stream the response back. Build a new Response so CF doesn't complain
      // about the Body already being consumed.
      const respHeaders = new Headers(upstream.headers);
      respHeaders.set("x-proxied-to", "render");
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: respHeaders,
      });
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          error: "Backend unreachable",
          details: err.message,
          backendUrl,
        }),
        {
          status: 502,
          headers: { "content-type": "application/json" },
        }
      );
    }
  }

  // 3. Admin route protection — only guard /admin/* paths when NOT proxying
  //    (when proxying, the backend handles its own auth).
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/create-admin" ||
    pathname === "/admin/forgot-password";

  if (isAuthPage) return NextResponse.next();

  // Check for NextAuth session token (default name: next-auth.session-token, or __Secure- in prod)
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all paths except static assets.
  // CRITICAL: includes api/.* and admin/.* so the backend proxy can intercept
  // them BEFORE they reach the route handler. When BACKEND_URL is not set,
  // the middleware falls through to the local route handler.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|otf|map|txt|xml).*$).*)",
  ],
};
