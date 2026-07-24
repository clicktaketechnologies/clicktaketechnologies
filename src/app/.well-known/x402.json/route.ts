import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * /.well-known/x402.json — x402 payment protocol discovery document.
 *
 * Per the x402 protocol (https://x402.org), agents look for a discovery
 * document at /.well-known/x402.json that lists all payable endpoints on
 * the origin along with their payment requirements. This lets agents
 * discover paid content without having to probe every URL for HTTP 402.
 *
 * Each entry in `endpoints` mirrors the x-payment-requirements header
 * returned when the endpoint is requested without payment. The `facilitator`
 * and `payTo` fields are stubs — see /api/premium/route.ts for the live
 * 402 response.
 *
 * @see https://x402.org
 * @see https://github.com/coinbase/x402
 * @see https://docs.x402.org
 */
export const dynamic = "force-static";

export async function GET() {
  const doc = {
    $schema: "https://x402.org/schema/discovery.json",
    protocol: {
      name: "x402",
      version: "1",
      documentation: "https://x402.org",
      specification: "https://docs.x402.org",
      github: "https://github.com/coinbase/x402",
    },
    origin: AGENT.origin,
    published_at: new Date().toISOString(),
    implementation_status: "stub",
    status_description:
      "x402 protocol stub — payment discovery is published but payments are NOT accepted. Configure a real facilitator URL and wallet address before enabling.",
    facilitator: {
      name: "stub",
      version: "0.0.0",
      url: "https://facilitator.example.com",
      requires_callback: false,
    },
    pay_to: "0x0000000000000000000000000000000000000000",
    endpoints: [
      {
        path: "/api/premium",
        method: "GET",
        description: "Premium content access — per-request charge",
        payment_requirements: {
          scheme: "exact",
          network: "base",
          asset: "USDC",
          amount: "1000",
          max_amount_required: "1000",
          resource: `${AGENT.origin}/api/premium`,
          description: "Premium content access - per-request charge",
          mime_type: "application/json",
          pay_to: "0x0000000000000000000000000000000000000000",
          max_timeout_seconds: 60,
          separator: ",",
          signing_message: null,
          facilitator: {
            name: "stub",
            version: "0.0.0",
            url: "https://facilitator.example.com",
            requires_callback: false,
          },
        },
        response_headers: {
          "www-authenticate": 'x402 realm="clicktake-premium", challenge="stub"',
          "x-payment-requirements": "application/json",
          "x402-version": "1",
        },
        status_code: 402,
      },
    ],
    discovery: {
      openapi: AGENT.openApiUrl,
      api_catalog: AGENT.apiCatalogUrl,
      mpp: {
        document: AGENT.openApiUrl,
        extension: "x-payment-info",
        specification: "https://mpp.dev",
      },
      ucp: `${AGENT.origin}/.well-known/ucp`,
      acp: `${AGENT.origin}/.well-known/acp.json`,
    },
    contact: AGENT.contactEmail,
  };

  return NextResponse.json(doc, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
