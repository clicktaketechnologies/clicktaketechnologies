// Root middleware — handles:
//   1. SEO canonical redirect: www.clicktaketech.com → clicktaketech.com (308 permanent)
//   2. Admin route protection via NextAuth session cookie
import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "clicktaketech.com";

export function middleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl;

  // 1. Canonical redirect: www → apex (308 = permanent, preserves method)
  //    Skip on the workers.dev preview URL + localhost (dev) so we can test
  //    both variants independently.
  if (
    hostname === `www.${CANONICAL_HOST}` &&
    process.env.NODE_ENV === "production"
  ) {
    const apexUrl = new URL(req.url);
    apexUrl.hostname = CANONICAL_HOST;
    return NextResponse.redirect(apexUrl, 308);
  }

  // 2. Admin route protection — only guard /admin/* paths.
  //    (Auth pages themselves must remain reachable so the user can log in.)
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
  // Run middleware on admin routes + apex canonical redirect.
  // The www→apex redirect needs to match all paths so any deep link on www
  // (e.g. www.clicktaketech.com/services/ai) redirects to the apex version.
  //
  // CRITICAL: `api/.*` MUST be excluded. Without this exclusion, the middleware
  // intercepts POST /api/auth/callback/credentials (the NextAuth login callback),
  // sees no session cookie (user is logging in!), and redirects to /admin/login —
  // so login can NEVER succeed. Same applies to every /api/admin/* route used by
  // the admin UI (e.g. POST /api/admin/users from /admin/create-admin).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot|otf|map|txt|xml).*$).*)",
  ],
};
