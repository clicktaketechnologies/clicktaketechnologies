import { NextResponse } from "next/server";

/**
 * Web Bot Auth — HTTP Message Signatures Directory (draft).
 *
 * Served at /.well-known/http-message-signatures-directory. Publishing this
 * directory lets our site identify itself with signed requests when it acts
 * as a bot/agent caller, and lets receiving sites verify those signatures.
 *
 * The keys array is currently empty because clicktaketech.com does not yet
 * originate signed outbound HTTP requests. When that changes, populate the
 * keys array with the public verification keys and reference this URL from
 * the Signature-Input header of outbound requests.
 *
 * @see https://datatracker.ietf.org/wg/webbotauth/about/
 * @see https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/
 */
export const dynamic = "force-static";

export async function GET() {
  const doc = {
    $schema: "https://webbotauth.org/schema/directory.json",
    spec: "draft-ietf-webbotauth-directory",
    origin: "https://clicktaketech.com",
    updated_at: new Date().toISOString(),
    keys: [],
    documentation: "https://clicktaketech.com/auth.md",
    contact: "Info@clicktaketech.com",
    notes:
      "ClickTake Technologies does not currently originate signed bot requests. " +
      "When automated outbound requests are introduced, public keys will be listed here.",
  };

  return NextResponse.json(doc, {
    headers: {
      "content-type": "application/jwk-set+json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
