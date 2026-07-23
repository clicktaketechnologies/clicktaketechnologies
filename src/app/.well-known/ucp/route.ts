import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * /.well-known/ucp — Universal Commerce Protocol (UCP) profile.
 *
 * Served at the well-known path so AI agents can discover the site's UCP
 * implementation. ClickTake Technologies is a digital agency that does not
 * sell products or content directly via API, so this profile declares
 * "no_services_available" honestly — it advertises the protocol shape
 * (so agents can detect UCP support) without fabricating commerce
 * endpoints, payment methods, or inventory that don't exist.
 *
 * @see https://ucp.dev/specification/overview/
 */
export const dynamic = "force-static";

export async function GET() {
  const profile = {
    $schema: "https://ucp.dev/schema/profile.json",
    protocol: {
      name: "ucp",
      version: "0.1.0",
      documentation: "https://ucp.dev/specification/overview/",
    },
    origin: AGENT.origin,
    published_at: new Date().toISOString(),
    status: "no_services_available",
    status_description:
      "ClickTake Technologies is a digital agency website. We do not sell products, content, or API access via paid transactions. This UCP profile is published for protocol discoverability only.",
    services: [],
    capabilities: {
      payment_methods_supported: [],
      currencies_supported: [],
      checkout_enabled: false,
      subscriptions_enabled: false,
      metered_usage_enabled: false,
    },
    endpoints: {
      catalog: null,
      checkout: null,
      subscription: null,
      invoice: null,
      webhook: null,
    },
    contact: AGENT.contactEmail,
    documentation: AGENT.apiDocsUrl,
    alternative_protocols: {
      api_catalog: AGENT.apiCatalogUrl,
      openapi: AGENT.openApiUrl,
      mcp_server_card: AGENT.mcpServerCardUrl,
    },
    spec_urls: {
      overview: "https://ucp.dev/specification/overview/",
      schemas: "https://ucp.dev/specification/schemas/",
    },
  };

  return NextResponse.json(profile, {
    headers: {
      "content-type": "application/ucp+json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
