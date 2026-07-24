import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * /platform/v2/x402/discovery/resources
 *
 * Aliased x402 discovery endpoint — some x402 facilitators (Bazaar, Coinbase)
 * and the isitagentready.com audit probe this path instead of the IETF
 * well-known path (/.well-known/x402.json). We expose the SAME discovery
 * document at both URLs so any conformant client finds it.
 *
 * @see src/app/.well-known/x402.json/route.ts for the canonical document.
 * @see https://x402.org
 */
export const dynamic = "force-static";

export async function GET() {
  const doc = {
    // Identifies this as an x402 discovery document.
    protocol: {
      name: "x402",
      version: "0.1.0",
      documentation: "https://x402.org",
    },
    origin: AGENT.origin,
    published_at: new Date().toISOString(),
    // The payable resources exposed by this origin.
    resources: [
      {
        id: "premium-content",
        path: "/api/premium",
        method: "GET",
        status_code: 402,
        description:
          "Premium content endpoint protected by x402 HTTP payment protocol. Returns HTTP 402 with payment requirements that agents can fulfill automatically.",
        payment_requirements: {
          scheme: "exact",
          network: "base",
          asset: "USDC",
          amount: "1000",
          maxAmountRequired: "1000",
          resource: `${AGENT.origin}/api/premium`,
          description: "Premium content access — per-request charge.",
          mimeType: "application/json",
          payTo: "0x0000000000000000000000000000000000000000",
          maxTimeoutSeconds: 60,
          separator: ",",
          signingMessage: null,
        },
        facilitator: {
          name: "stub",
          version: "0.0.0",
          url: "https://facilitator.example.com",
          requiresCallback: false,
        },
        response_headers: {
          "www-authenticate": 'x402 realm="clicktake-premium", challenge="stub"',
          "x-payment-requirements": "application/json",
        },
      },
    ],
    // Cross-protocol discovery references.
    related_discovery: {
      well_known: `${AGENT.origin}/.well-known/x402.json`,
      openapi: `${AGENT.origin}/openapi.json`,
      api_catalog: `${AGENT.origin}/.well-known/api-catalog`,
      acp: `${AGENT.origin}/.well-known/acp.json`,
      ucp: `${AGENT.origin}/.well-known/ucp`,
      agent_card: `${AGENT.origin}/.well-known/agent-card.json`,
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
