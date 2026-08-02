import { SITE } from "@/lib/site-data";

/**
 * llms.txt — proposed standard (llmstxt.org) for signaling to LLM-powered
 * crawlers (ChatGPT, Claude, Perplexity, Gemini) which pages are the
 * canonical "agent-readable" entry points.
 *
 * This file is intentionally terse, plain-text, and human-readable. It
 * complements (does NOT replace):
 *   - /robots.txt            (crawler access policy)
 *   - /sitemap.xml           (URL inventory)
 *   - /.well-known/ai-plugin.json   (MCP plugin manifest)
 *   - /.well-known/mcp/server-card.json (MCP server card, SEP-1649)
 *   - /.well-known/agent-skills/index.json (Agent Skills discovery)
 *   - /auth.md               (agent registration instructions)
 *
 * Markdown format with H1 → site title, optional blockquote summary,
 * then a list of important links. Designed to be <2KB so it fits in a
 * single LLM context window easily.
 *
 * Routed at /llms.txt by Next.js (file-system routing convention).
 * Served as text/markdown so browsers render it as plain text and AI
 * crawlers parse it as markdown.
 */
export const dynamic = "force-static";

function buildLlmsTxt(): string {
  const lines: string[] = [];

  // H1 — site title
  lines.push(`# ${SITE.name}`);
  lines.push("");

  // Blockquote — one-sentence summary
  lines.push(
    `> ${SITE.tagline} — AI-powered digital agency engineering websites, SaaS platforms, mobile apps and growth systems for ambitious brands across the UK, Pakistan, USA and Dubai. 120+ projects shipped since 2019.`,
  );
  lines.push("");

  // Quick facts block
  lines.push("## Quick facts");
  lines.push("");
  lines.push(`- Founded: 2019`);
  lines.push(`- Headquarters: Birmingham, United Kingdom (registered HQ)`);
  lines.push(`- Delivery hub: Multan, Pakistan`);
  lines.push(`- Business desk: Austin, TX, USA`);
  lines.push(`- Regional office: Dubai, UAE`);
  lines.push(`- Email: ${SITE.email}`);
  lines.push(`- Phone (UK): +44 7391 653377`);
  lines.push(`- Phone (PK): +92 306 9753003`);
  lines.push(`- Languages: English`);
  lines.push(`- Service areas: Web Dev · AI · Mobile · SaaS · Growth Marketing · Brand · Video · E-commerce`);
  lines.push("");

  // Agent & crawler entry points
  lines.push("## Agent & crawler entry points");
  lines.push("");
  lines.push("The following URLs are the canonical machine-readable entry points. All return JSON unless noted.");
  lines.push("");
  lines.push(`- [OpenAPI 3.1 spec](${SITE.url}/openapi.json): full REST API surface`);
  lines.push(`- [API catalog (RFC 9727)](${SITE.url}/.well-known/api-catalog): linkset+json`);
  lines.push(`- [Agent card](${SITE.url}/.well-known/agent-card.json): agent protocol metadata`);
  lines.push(`- [MCP server card (SEP-1649)](${SITE.url}/.well-known/mcp/server-card.json): Model Context Protocol`);
  lines.push(`- [Agent Skills index](${SITE.url}/.well-known/agent-skills/index.json): capability discovery`);
  lines.push(`- [auth.md](${SITE.url}/auth.md): agent registration & authentication (text/markdown)`);
  lines.push(`- [OAuth authorization server](${SITE.url}/.well-known/oauth-authorization-server): RFC 8414`);
  lines.push(`- [OAuth protected resource](${SITE.url}/.well-known/oauth-protected-resource): RFC 9728`);
  lines.push(`- [JWKS](${SITE.url}/.well-known/jwks.json): signing keys`);
  lines.push(`- [x402 payment config](${SITE.url}/.well-known/x402.json): HTTP 402 payment protocol`);
  lines.push(`- [Sitemap](${SITE.url}/sitemap.xml): full URL inventory`);
  lines.push(`- [RSS feed](${SITE.url}/rss.xml): latest blog posts (application/rss+xml)`);
  lines.push("");

  // Important user-facing pages
  lines.push("## Important pages");
  lines.push("");
  lines.push(`- [Home](${SITE.url}/): agency overview & service summary`);
  lines.push(`- [Services](${SITE.url}/services): 23 services across AI, Web, Marketing & Creative`);
  lines.push(`- [Solutions](${SITE.url}/solutions): industry-specific solutions (startup, e-commerce, SaaS, agency)`);
  lines.push(`- [Pricing](${SITE.url}/pricing): 4 transparent engagement tiers (Starter / Growth / Scale / Custom)`);
  lines.push(`- [Case studies](${SITE.url}/case-studies): client outcomes & measurable results`);
  lines.push(`- [Portfolio](${SITE.url}/portfolio): selected work showcase`);
  lines.push(`- [Blog](${SITE.url}/blog): engineering & marketing field notes`);
  lines.push(`- [Careers](${SITE.url}/careers): open roles across engineering, marketing & design`);
  lines.push(`- [Team](${SITE.url}/team): who we are`);
  lines.push(`- [About](${SITE.url}/about): company history, values & approach`);
  lines.push(`- [Contact](${SITE.url}/contact): inquiry + booking forms (free 30-min consult)`);
  lines.push("");

  // Optional links
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Legal](${SITE.url}/legal): privacy policy, terms of service, cookie policy`);
  lines.push(
    `- [Cities served](${SITE.url}/cities): programmatic local-SEO hub (Birmingham, Multan, Austin, Dubai, London, Manchester, Karachi, Lahore, Islamabad)`,
  );
  lines.push("");

  return lines.join("\n");
}

/**
 * GET handler — Next.js Route Handler convention. Returns the markdown
 * payload as text/markdown so browsers render it as plain text and AI
 * crawlers parse it as markdown.
 */
export async function GET(): Promise<Response> {
  const body = buildLlmsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}

