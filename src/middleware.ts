// Root middleware — protects /admin/* routes via NextAuth.
// Lightweight: just checks for session token cookie.
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard admin routes (not the login/signup pages themselves)
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
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
