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
      service-desc: [
        { href: AGENT.openApiUrl, type: "application/vnd.oai.openapi+json;version=3.1" },
      ],
      service-doc: [{ href: AGENT.apiDocsUrl, type: "text/html" }],
      status: [{ href: AGENT.healthUrl, type: "application/json" }],
      "api-catalog": [{ href: AGENT.apiCatalogUrl, type: "application/linkset+json" }],
    },
    {
      anchor: AGENT.mcpEndpoint,
      "service-desc": [{ href: AGENT.mcpServerCardUrl, type: "application/json" }],
      "service-doc": [{ href: AGENT.apiDocsUrl, type: "text/html" }],
      status: [{ href: AGENT.healthUrl, type: "application/json" }],
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
