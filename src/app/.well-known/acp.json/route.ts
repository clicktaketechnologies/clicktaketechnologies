import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * /.well-known/acp.json — Agentic Commerce Protocol (ACP) discovery.
 *
 * Per the ACP discovery RFC, this document must be served at the origin
 * root so AI agents can discover the site's ACP implementation without
 * creating a checkout session first. ClickTake Technologies does not run
 * a commerce API — we're a digital agency — so this document honestly
 * declares "no implementation" while preserving the protocol shape so
 * agents can detect ACP support (or its absence) cleanly.
 *
 * @see https://agenticcommerce.dev
 * @see https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md
 */
export const dynamic = "force-static";

export async function GET() {
  const doc = {
    $schema: "https://agenticcommerce.dev/schema/discovery.json",
    protocol: {
      name: "acp",
      version: "0.1.0",
      documentation: "https://agenticcommerce.dev",
    },
    origin: AGENT.origin,
    published_at: new Date().toISOString(),
    status: "discovery_only",
    status_description:
      "ClickTake Technologies does not operate a commerce API. This discovery document is published for protocol discoverability — api_base_url points to the public API root, capabilities.services lists the API services we DO expose, but no ACP checkout/payment/order flows are implemented.",
    // Required by audit: absolute HTTP(S) URL pointing to the API base.
    // We point at the public API root (documented via /openapi.json) —
    // agents that follow this URL will find our service catalog, but
    // should not expect ACP-specific commerce endpoints.
    api_base_url: `${AGENT.origin}/api`,
    // Required by audit: non-empty array of supported transport types.
    // We expose HTTPS only (no WebSocket, no gRPC).
    transports: ["https"],
    // Retained for backward compatibility with the previous document shape.
    supported_transports: ["https"],
    capabilities: {
      // Required by audit: non-empty array of offered services.
      // We list the public API services documented in /openapi.json.
      services: [
        {
          name: "lead-capture",
          description: "Sales lead submission endpoint (POST /api/leads).",
          auth_required: true,
          documentation: AGENT.openApiUrl + "#/paths/~1leads~1post",
        },
        {
          name: "content-delivery",
          description: "Public content endpoints (services, portfolio, offices).",
          auth_required: false,
          documentation: AGENT.openApiUrl,
        },
        {
          name: "site-search",
          description: "Full-text site search (GET /api/search?q=).",
          auth_required: false,
          documentation: AGENT.openApiUrl + "#/paths/~1search~1get",
        },
        {
          name: "premium-content",
          description:
            "Premium content endpoint protected by x402 HTTP payment protocol (GET /api/premium). Returns HTTP 402 with payment requirements.",
          auth_required: false,
          payment_required: true,
          payment_protocol: "x402",
          documentation: "https://x402.org",
        },
      ],
      checkout: false,
      payment: false,
      order_management: false,
      inventory: false,
      subscriptions: false,
    },
    authentication: {
      method: "oauth2",
      authorization_server: AGENT.authorizationServerUrl,
      protected_resource_metadata: AGENT.protectedResourceUrl,
    },
    contact: AGENT.contactEmail,
    documentation: AGENT.apiDocsUrl,
    alternative_protocols: {
      api_catalog: AGENT.apiCatalogUrl,
      openapi: AGENT.openApiUrl,
      ucp_profile: `${AGENT.origin}/.well-known/ucp`,
      x402: `${AGENT.origin}/.well-known/x402.json`,
    },
    spec_urls: {
      discovery:
        "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md",
      overview: "https://agenticcommerce.dev",
    },
  };

  return NextResponse.json(doc, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
