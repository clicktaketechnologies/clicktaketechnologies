// Root middleware — handles:
//   1. SEO canonical redirect: www.clicktaketech.com → clicktaketech.com (308 permanent)
//   2. Backend proxy: when BACKEND_URL is set, /api/* and /admin/* are proxied
//      to the Render backend (so the CF Worker bundle stays tiny and DB code
//      lives only on Render).
//   3. Admin route protection via NextAuth session cookie (skipped when proxying)
//   4. Agent-readiness (RFC 8288): inject Link headers advertising API catalog,
//      OpenAPI, OAuth metadata, MCP server card, agent skills, and auth.md on
//      HTML responses so AI agents can discover the site's machine-readable
//      surface area.
//   5. Markdown for Agents: when Accept: text/markdown is sent on /
//      (or any HTML page), return a markdown representation with
//      Content-Type: text/markdown so AI agents can ingest the content
//      directly without HTML parsing.
import { NextResponse, type NextRequest } from "next/server";
import { AGENT, linkHeader } from "@/lib/agent-config";

const CANONICAL_HOST = "clicktaketech.com";

/** Static markdown representation of the homepage for AI agents. */
const HOMEPAGE_MARKDOWN = `# ClickTake Technologies

> AI-powered digital agency engineering websites, SaaS platforms, mobile apps and growth systems for ambitious brands across the UK, Pakistan, USA and Dubai.

- **URL:** ${AGENT.origin}
- **Email:** ${AGENT.contactEmail}
- **Founded:** 2020
- **Offices:** Birmingham (UK), Multan (PK), Austin TX (USA), Dubai (UAE)
- **Projects shipped:** 120+

## What we do

- **Web development** — Next.js, React, headless CMS, e-commerce, JAMstack
- **AI & automation** — LLM integrations, chatbots, RAG pipelines, agentic workflows
- **Mobile apps** — React Native, Flutter, native iOS/Android
- **SaaS platforms** — Multi-tenant SaaS architecture, billing, dashboards
- **Growth marketing** — SEO, PPC, content, conversion optimization, analytics

## Who we work with

Startups, scale-ups, and enterprise teams across fintech, healthtech, e-commerce,
B2B SaaS, education, and real estate. 120+ projects delivered across four regions
since 2020.

## How to engage

1. **Free 30-min consult** — Book a call to scope your project.
2. **Proposal & estimate** — Receive a fixed-scope proposal within 48 hours.
3. **Sprint kickoff** — Dedicated PM + engineering pod starts within 1 week.
4. **Weekly demos** — Ship every Friday; iterate based on feedback.

## Contact

- **UK:** +44 7391 653377
- **Pakistan:** +92 306 9753003
- **Email:** ${AGENT.contactEmail}
- **Contact form:** ${AGENT.origin}/contact

## Office hours

- Birmingham: Mon–Sat 09:30–21:00 GMT
- Multan: Mon–Sat 09:30–21:00 PKT
- Austin: Mon–Fri 09:00–18:00 CST
- Dubai: By appointment

## For AI agents

This site publishes machine-readable metadata for agent discovery:

- **API catalog:** ${AGENT.apiCatalogUrl}
- **OpenAPI spec:** ${AGENT.openApiUrl}
- **OAuth metadata:** ${AGENT.authorizationServerUrl}
- **MCP server card:** ${AGENT.mcpServerCardUrl}
- **Agent skills:** ${AGENT.agentSkillsUrl}
- **Auth & registration:** ${AGENT.authMdUrl}

Request this page with \`Accept: text/markdown\` to receive this markdown
representation; browsers receive the HTML version by default.
`;

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

  // 2b. Markdown for Agents — if the client requests text/markdown AND
  //    explicitly opts in via ?format=markdown OR sends Accept: text/markdown
  //    as the most-preferred media type, return a markdown representation.
  //    HTML remains the default for browsers.
  //
  //    Currently only the homepage has a markdown variant; other paths
  //    fall through to HTML (with Vary: Accept so caches don't conflate).
  const accept = req.headers.get("accept") || "";
  const wantsMarkdown =
    req.nextUrl.searchParams.get("format") === "markdown" ||
    (accept.includes("text/markdown") &&
      !accept.includes("text/html") &&
      !accept.includes("application/xhtml+xml"));

  if (wantsMarkdown && (pathname === "/" || pathname === "")) {
    return new Response(HOMEPAGE_MARKDOWN, {
      status: 200,
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "public, max-age=300, s-maxage=3600",
        vary: "Accept",
        "x-content-negotiated": "markdown",
        "access-control-allow-origin": "*",
        link: linkHeader(),
      },
    });
  }

  // 2. Backend proxy — if BACKEND_URL is set, forward /api/* and /admin/* to
  //    the Render backend. This keeps DB code off the CF Worker entirely.
  //
  //    FIX-E (audit): /admin/* and /api/* responses get X-Robots-Tag:
  //    noindex, nofollow so JSON endpoints and admin pages are never
  //    indexed even if a crawler somehow reaches them.
  //    FIX-I (audit): security headers added to every response (see
  //    stampSecurityHeaders helper below).
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
      // FIX-E: noindex admin + API responses
      respHeaders.set("x-robots-tag", "noindex, nofollow");
      stampSecurityHeaders(respHeaders);
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

  /**
   * FIX-I (audit): stamp baseline security headers on every response.
   *
   * These are the headers that are safe to apply globally without breaking
   * any page. Content-Security-Policy is intentionally omitted — it needs
   * a per-route allowlist (inline scripts, fonts, analytics, etc.) and is
   * deferred to a separate pass.
   */
  function stampSecurityHeaders(h: Headers) {
    h.set("strict-transport-security", "max-age=63072000; includeSubDomains; preload");
    h.set("x-frame-options", "SAMEORIGIN");
    h.set("x-content-type-options", "nosniff");
    h.set("referrer-policy", "strict-origin-when-cross-origin");
    h.set(
      "permissions-policy",
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()"
    );
    // Remove the X-Powered-By header that Next.js sets — minor info leak.
    h.delete("x-powered-by");
  }

  // 3. Agent-readiness: inject RFC 8288 Link header on public HTML pages
  //    so AI agents can discover the API catalog, OpenAPI spec, OAuth
  //    metadata, MCP server card, agent skills, and auth.md. Also set
  //    Vary: Accept so caches distinguish HTML from markdown variants.
  //    FIX-I: stamp security headers on every HTML response too.
  //    FIX-E: if the path is /admin/* or /api/* (and we did NOT proxy),
  //    add X-Robots-Tag: noindex so local route handlers are also
  //    protected from indexing.
  function htmlWithLinkHeaders() {
    const res = NextResponse.next();
    // Only stamp Link headers on HTML responses for non-asset paths. The
    // matcher already excludes static assets, so anything reaching here is
    // either a page, an API route, or a route handler.
    if (
      !pathname.startsWith("/api/") &&
      !pathname.startsWith("/_next/") &&
      !pathname.startsWith("/.well-known/")
    ) {
      res.headers.set("link", linkHeader());
      res.headers.append("vary", "Accept");
    }
    // FIX-E: local (non-proxied) admin + API routes also get noindex
    if (pathname.startsWith("/api/") || pathname.startsWith("/admin")) {
      res.headers.set("x-robots-tag", "noindex, nofollow");
    }
    stampSecurityHeaders(res.headers);
    return res;
  }

  // 4. Admin route protection — only guard /admin/* paths when NOT proxying
  //    (when proxying, the backend handles its own auth).
  if (!pathname.startsWith("/admin")) {
    return htmlWithLinkHeaders();
  }

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/create-admin" ||
    pathname === "/admin/forgot-password";

  if (isAuthPage) return htmlWithLinkHeaders();

  // Check for NextAuth session token (default name: next-auth.session-token, or __Secure- in prod)
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return htmlWithLinkHeaders();
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
