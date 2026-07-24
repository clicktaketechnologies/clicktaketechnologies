import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * /.well-known/agent-card.json — A2A (Agent-to-Agent) Protocol Agent Card.
 *
 * Per the A2A Protocol Specification (https://a2a-protocol.org/latest/):
 * Served at the well-known path so AI agents can discover this site's
 * agent capabilities and call them programmatically.
 *
 * This is a "discovery-only" card — it advertises the protocol shape and
 * links to the site's real agent endpoints (OAuth, MCP, OpenAPI) without
 * fabricating autonomous agent skills that don't exist yet.
 *
 * @see https://a2a-protocol.org/latest/specification/
 * @see https://a2a-protocol.org/latest/topics/agent-discovery/
 */
export const dynamic = "force-static";

export async function GET() {
  const card = {
    $schema: "https://a2a-protocol.org/latest/schemas/agent-card.json",
    // ── Required fields ──────────────────────────────────────────────
    name: "ClickTake Technologies",
    version: "1.0.0",
    description:
      "Digital growth, IT services, web development, software development, AI automation, SEO, PPC, social media marketing, creative design and hosting agency. Agent-facing surface exposes lead capture, public content delivery, site search and x402-protected premium content.",
    url: AGENT.origin,
    // ── Capabilities ─────────────────────────────────────────────────
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    // ── Authentication ───────────────────────────────────────────────
    authentication: {
      type: "oauth2",
      authorization_server: `${AGENT.origin}/.well-known/oauth-authorization-server`,
      protected_resource_metadata: `${AGENT.origin}/.well-known/oauth-protected-resource`,
      // Human-readable spec: https://clicktaketech.com/auth.md
      docs: `${AGENT.origin}/auth.md`,
    },
    // ── Supported interfaces (transport + endpoint) ──────────────────
    // A2A is JSON-RPC 2.0 over HTTPS. We do not currently expose an A2A
    // JSON-RPC endpoint, so this card is for discovery only — the
    // "url" points to the public API root, and skills list the
    // REST endpoints agents can call directly.
    // NOTE: Audit requires `url` field (not `serviceUrl`) on each interface.
    supportedInterfaces: [
      {
        type: "jsonrpc",
        url: `${AGENT.origin}/api`,
        transport: "https",
        // We don't implement A2A JSON-RPC methods yet — agents should
        // call the REST endpoints listed in `skills` instead.
        supportedMethods: [],
        // Documentation of the REST surface agents CAN call.
        rest: {
          openapi: `${AGENT.origin}/openapi.json`,
          api_catalog: `${AGENT.origin}/.well-known/api-catalog`,
        },
      },
    ],
    // ── Skills ───────────────────────────────────────────────────────
    // Each skill maps to a real REST endpoint agents can invoke.
    skills: [
      {
        id: "lead-capture",
        name: "Lead Capture",
        description:
          "Submit a sales lead (contact form, project inquiry, or consultation request). Validates input, stores in CRM, and notifies the sales team. POST /api/contact — see openapi.json for schema.",
        tags: ["sales", "contact", "crm", "lead"],
        examples: [],
      },
      {
        id: "site-search",
        name: "Site Search",
        description:
          "Full-text search across services, portfolio items, resources, and team profiles. GET /api/search?q={query} — returns ranked JSON results.",
        tags: ["search", "discovery"],
        examples: [],
      },
      {
        id: "content-delivery",
        name: "Content Delivery",
        description:
          "Public read-only access to services catalog, portfolio case studies, resources (playbooks & guides), and team info. No auth required. See openapi.json for endpoint list.",
        tags: ["content", "public", "read"],
        examples: [],
      },
      {
        id: "premium-content",
        name: "Premium Content (x402)",
        description:
          "Premium content endpoint protected by the x402 HTTP payment protocol. Returns HTTP 402 with payment requirements that agents can fulfill automatically. See /.well-known/x402.json for the discovery document.",
        tags: ["payment", "x402", "premium", "commerce"],
        examples: [],
      },
      {
        id: "mcp-discovery",
        name: "MCP Server Discovery",
        description:
          "Model Context Protocol server card at /.well-known/mcp/server-card.json — advertises MCP tools and resources for agents that speak MCP.",
        tags: ["mcp", "tools", "discovery"],
        examples: [],
      },
    ],
    // ── Metadata ─────────────────────────────────────────────────────
    provider: {
      name: "ClickTake Technologies Ltd",
      url: AGENT.origin,
      email: AGENT.contactEmail,
    },
    documentationUrl: `${AGENT.origin}/.well-known/api-catalog`,
    iconUrl: `${AGENT.origin}/clicktake-logo.webp`,
    contactEmail: AGENT.contactEmail,
    // ── Cross-protocol references ───────────────────────────────────
    // Helps agents that speak multiple protocols find the right surface.
    alternativeProtocols: {
      openapi: `${AGENT.origin}/openapi.json`,
      api_catalog: `${AGENT.origin}/.well-known/api-catalog`,
      mcp_server_card: `${AGENT.origin}/.well-known/mcp/server-card.json`,
      auth_md: `${AGENT.origin}/auth.md`,
      x402: `${AGENT.origin}/.well-known/x402.json`,
      ucp: `${AGENT.origin}/.well-known/ucp`,
      acp: `${AGENT.origin}/.well-known/acp.json`,
    },
    // ── Extensions ───────────────────────────────────────────────────
    // AP2 (Agent Payment Protocol) extension — declares that this agent
    // can perform/receive payments via the x402 HTTP payment protocol.
    // Required by the isitagentready.com AP2 audit check.
    extensions: {
      ap2: {
        version: "0.1.0",
        payment_protocols: ["x402"],
        x402_discovery: `${AGENT.origin}/.well-known/x402.json`,
        mpp_discovery: `${AGENT.origin}/openapi.json`,
        acp_discovery: `${AGENT.origin}/.well-known/acp.json`,
        ucp_discovery: `${AGENT.origin}/.well-known/ucp`,
        payable_endpoints: [`${AGENT.origin}/api/premium`],
      },
    },
  };

  return NextResponse.json(card, {
    headers: {
      "content-type": "application/ld+json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
