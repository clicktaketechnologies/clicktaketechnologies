import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * RFC 9727 API Catalog — returns application/linkset+json.
 *
 * Each entry in the "linkset" array uses an "anchor" for the API surface and
 * link relations for service-desc (OpenAPI), service-doc (human docs) and
 * status (health). Agents can crawl this to discover every machine-readable
 * API surface on clicktaketech.com without scanning the sitemap.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9727
 * @see https://www.rfc-editor.org/rfc/rfc9264
 */
export const dynamic = "force-static";

export async function GET() {
  const linkset = [
    {
      anchor: AGENT.origin + "/api",
      "service-desc": [
        { href: AGENT.openApiUrl, type: "application/vnd.oai.openapi+json;version=3.1" },
      ],
      "service-doc": [{ href: AGENT.apiDocsUrl, type: "text/html" }],
      status: [{ href: AGENT.healthUrl, type: "application/json" }],
      "api-catalog": [{ href: AGENT.apiCatalogUrl, type: "application/linkset+json" }],
    },
    {
      anchor: AGENT.mcpEndpoint,
      "service-desc": [{ href: AGENT.mcpServerCardUrl, type: "application/json" }],
      "service-doc": [{ href: AGENT.apiDocsUrl, type: "text/html" }],
      status: [{ href: AGENT.healthUrl, type: "application/json" }],
    },
    {
      anchor: AGENT.origin + "/api/premium",
      "service-desc": [
        { href: AGENT.openApiUrl + "#/paths/~1premium~1get", type: "application/vnd.oai.openapi+json;version=3.1" },
      ],
      "service-doc": [{ href: "https://x402.org", type: "text/html" }],
      status: [{ href: AGENT.healthUrl, type: "application/json" }],
      "payment-protocol": [
        { href: "https://x402.org", type: "text/html", name: "x402" },
        { href: AGENT.origin + "/.well-known/x402.json", type: "application/json", name: "x402-discovery" },
      ],
    },
    {
      anchor: AGENT.origin + "/.well-known/x402.json",
      "service-desc": [
        { href: "https://x402.org", type: "text/html" },
      ],
      "service-doc": [{ href: "https://docs.x402.org", type: "text/html" }],
      "payment-protocol": [
        { href: "https://x402.org", type: "text/html", name: "x402" },
      ],
    },
    {
      anchor: AGENT.origin + "/.well-known/ucp",
      "service-desc": [{ href: "https://ucp.dev/specification/overview/", type: "text/html" }],
      "service-doc": [{ href: "https://ucp.dev", type: "text/html" }],
    },
    {
      anchor: AGENT.origin + "/.well-known/acp.json",
      "service-desc": [
        { href: "https://agenticcommerce.dev", type: "text/html" },
      ],
      "service-doc": [
        {
          href: "https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md",
          type: "text/html",
        },
      ],
    },
    {
      anchor: AGENT.origin + "/.well-known/agent-card.json",
      "service-desc": [
        { href: "https://a2a-protocol.org/latest/specification/", type: "text/html" },
      ],
      "service-doc": [
        { href: "https://a2a-protocol.org/latest/topics/agent-discovery/", type: "text/html" },
      ],
    },
  ];

  return NextResponse.json(
    { linkset },
    {
      headers: {
        "content-type": "application/linkset+json; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=86400",
        "access-control-allow-origin": "*",
      },
    }
  );
}
