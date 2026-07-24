import { NextResponse } from "next/server";

/**
 * /api/premium — x402 protocol stub endpoint.
 *
 * Returns HTTP 402 (Payment Required) with x402 payment-requirements
 * headers so AI agents can detect x402 support on the site. This is a
 * protocol stub — payments are NOT actually accepted because no
 * facilitator URL or wallet address has been configured.
 *
 * When real x402 support is desired:
 *   1. Set up a wallet (e.g., Coinbase Wallet, USDC base address)
 *   2. Deploy or use a facilitator (e.g., https://facilitator.x402.org)
 *   3. Install @x402/next: `bun add @x402/next`
 *   4. Wrap this route with `withPayment(handler, { price: "$0.01",
 *      facilitatorUrl, payTo })` from @x402/next
 *   5. Replace the placeholder values in the response below with the
 *      real wallet + facilitator URL
 *
 * @see https://x402.org
 * @see https://github.com/coinbase/x402
 * @see https://docs.x402.org
 */
export const dynamic = "force-dynamic";

const PAYMENT_REQUIREMENTS = {
  scheme: "exact",
  network: "base",
  asset: "USDC",
  amount: "1000",
  maxAmountRequired: "1000",
  resource: "https://clicktaketech.com/api/premium",
  description: "Premium content access - per-request charge",
  mimeType: "application/json",
  payTo: "0x0000000000000000000000000000000000000000",
  maxTimeoutSeconds: 60,
  separator: ",",
  signingMessage: null,
  facilitator: {
    name: "stub",
    version: "0.0.0",
    url: "https://facilitator.example.com",
    requiresCallback: false,
  },
  status: "stub",
  statusDescription:
    "x402 protocol stub - payments are NOT accepted. Configure a real facilitator URL and wallet address before enabling.",
};

export async function GET() {
  const body = JSON.stringify({
    error: "Payment required",
    x402_version: 1,
    payment_requirements: PAYMENT_REQUIREMENTS,
    documentation: "https://x402.org",
    implementation_status: "stub",
  });

  // Use raw Response instead of NextResponse.json to bypass any
  // NextResponse wrapper behavior that might cause issues.
  return new Response(body, {
    status: 402,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "www-authenticate": `x402 realm="clicktake-premium", challenge="stub"`,
      "x-payment-requirements": JSON.stringify(PAYMENT_REQUIREMENTS),
      "x-payment-required": "true",
      "x402-version": "1",
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Content-Type, Authorization, X-Payment",
      "access-control-expose-headers":
        "x-payment-requirements, www-authenticate, x402-version, x-payment-required",
    },
  });
}
