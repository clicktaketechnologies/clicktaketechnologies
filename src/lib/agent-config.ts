/**
 * Central agent-readiness configuration for clicktaketech.com.
 *
 * All well-known endpoints, Link headers, OAuth metadata, MCP server card,
 * and Agent Skills discovery reference this file so the values stay in sync.
 *
 * References:
 *  - RFC 8288  (Web Linking)
 *  - RFC 8414  (OAuth 2.0 Authorization Server Metadata)
 *  - RFC 9264  (The Linkset Data Structure)
 *  - RFC 9727  (Linkset: Media Types and API)
 *  - RFC 9728  (OAuth 2.0 Protected Resource Metadata)
 *  - RFC 9460  (SVCB-based DNS discovery — see DNS-AID section below)
 *  - MCP SEP-1649 (Server Card)
 *  - Agent Skills Discovery RFC v0.2.0 (Cloudflare)
 */

export const AGENT = {
  /** Canonical site origin (apex, no trailing slash). */
  origin: "https://clicktaketech.com",

  /** Primary contact for agent / API partnerships. */
  contactEmail: "Info@clicktaketech.com",

  /** Human-readable API documentation page. */
  apiDocsUrl: "https://clicktaketech.com/services",

  /** OpenAPI 3.1 spec (served by /openapi.json route). */
  openApiUrl: "https://clicktaketech.com/openapi.json",

  /** Health probe endpoint (already exists as /api/health on Vercel). */
  healthUrl: "https://clicktaketech.com/api/health",

  /** OAuth issuer / authorization server URL (this site, served below). */
  oauthIssuer: "https://clicktaketech.com",

  /** MCP transport endpoint (Streamable HTTP). */
  mcpEndpoint: "https://clicktaketech.com/api/mcp",

  /** API catalog (RFC 9727 linkset+json). */
  apiCatalogUrl: "https://clicktaketech.com/.well-known/api-catalog",

  /** OAuth Protected Resource Metadata (RFC 9728). */
  protectedResourceUrl:
    "https://clicktaketech.com/.well-known/oauth-protected-resource",

  /** OAuth Authorization Server Metadata (RFC 8414). */
  authorizationServerUrl:
    "https://clicktaketech.com/.well-known/oauth-authorization-server",

  /** Agent Skills discovery index. */
  agentSkillsUrl: "https://clicktaketech.com/.well-known/agent-skills/index.json",

  /** MCP Server Card. */
  mcpServerCardUrl: "https://clicktaketech.com/.well-known/mcp/server-card.json",

  /** Auth.md (agent registration instructions). */
  authMdUrl: "https://clicktaketech.com/auth.md",

  /** Web Bot Auth JWKS directory (stub). */
  botAuthJwksUrl:
    "https://clicktaketech.com/.well-known/http-message-signatures-directory",
} as const;

/**
 * Link header entries (RFC 8288) advertised on the homepage and other
 * HTML responses. Uses registered IANA link relation types where possible.
 *
 * @see https://www.iana.org/assignments/link-relations/link-relations.xhtml
 */
export const LINK_RELATIONS: Array<{
  href: string;
  rel: string;
  type?: string;
  title?: string;
}> = [
  {
    href: AGENT.apiCatalogUrl,
    rel: "api-catalog",
    type: "application/linkset+json",
    title: "ClickTake API Catalog (RFC 9727)",
  },
  {
    href: AGENT.openApiUrl,
    rel: "service-desc",
    type: "application/vnd.oai.openapi+json;version=3.1",
    title: "OpenAPI 3.1 specification",
  },
  {
    href: AGENT.apiDocsUrl,
    rel: "service-doc",
    type: "text/html",
    title: "API & services documentation",
  },
  {
    href: AGENT.healthUrl,
    rel: "status",
    type: "application/json",
    title: "Service health endpoint",
  },
  {
    href: AGENT.authorizationServerUrl,
    rel: "oauth-authorization-server",
    type: "application/json",
    title: "OAuth 2.0 Authorization Server Metadata (RFC 8414)",
  },
  {
    href: AGENT.protectedResourceUrl,
    rel: "oauth-protected-resource",
    type: "application/json",
    title: "OAuth 2.0 Protected Resource Metadata (RFC 9728)",
  },
  {
    href: AGENT.mcpServerCardUrl,
    rel: "mcp-server",
    type: "application/json",
    title: "MCP Server Card (SEP-1649)",
  },
  {
    href: AGENT.agentSkillsUrl,
    rel: "agent-skills",
    type: "application/json",
    title: "Agent Skills Discovery Index",
  },
  {
    href: AGENT.authMdUrl,
    rel: "https://workos.com/auth.md",
    type: "text/markdown",
    title: "Agent registration instructions (auth.md)",
  },
];

/** Serialize LINK_RELATIONS as an RFC 8288 Link header value. */
export function linkHeader(): string {
  return LINK_RELATIONS.map((l) => {
    const parts: string[] = [`<${l.href}>`, `rel="${l.rel}"`];
    if (l.type) parts.push(`type="${l.type}"`);
    if (l.title) parts.push(`title="${l.title}"`);
    return parts.join("; ");
  }).join(", ");
}

/**
 * DNS-AID record recommendations (informational).
 *
 * Cloudflare partial DNS setups cannot DNSSEC-sign zones that are signed
 * by the registrar, and our zone is currently unsigned. The recommended
 * records below should be published once DNSSEC is enabled.
 *
 * Recommended SVCB/HTTPS records (draft-mozleywilliams-dnsop-dnsaid):
 *   _index._agents.clicktaketech.com.  HTTPS 0 . alpn="h2" endpoint="clicktaketech.com"
 *   _a2a._agents.clicktaketech.com.    HTTPS 0 . alpn="h2" endpoint="clicktaketech.com"
 *
 * Then sign the parent zone with DNSSEC.
 */
export const DNS_AID_RECOMMENDATIONS = {
  records: [
    {
      name: "_index._agents.clicktaketech.com",
      type: "SVCB",
      values: { alpn: "h2", endpoint: "clicktaketech.com" },
    },
    {
      name: "_a2a._agents.clicktaketech.com",
      type: "SVCB",
      values: { alpn: "h2", endpoint: "clicktaketech.com" },
    },
  ],
  requiresDnssec: true,
} as const;
