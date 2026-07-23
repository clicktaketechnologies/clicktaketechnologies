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
    status: "not_implemented",
    status_description:
      "ClickTake Technologies does not implement the Agentic Commerce Protocol. This discovery document is published for protocol discoverability only — no commerce API surface is exposed.",
    api_base_url: null,
    supported_transports: [],
    capabilities: {
      services: [],
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
