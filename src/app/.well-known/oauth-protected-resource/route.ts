import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728).
 *
 * Served at /.well-known/oauth-protected-resource. Tells agents which
 * authorization server(s) can mint tokens for our protected resources and
 * which scopes those resources require.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9728
 */
export const dynamic = "force-static";

export async function GET() {
  const doc = {
    resource: AGENT.origin + "/api",
    authorization_servers: [AGENT.oauthIssuer],
    bearer_methods_supported: ["header", "body"],
    jwks_uri: `${AGENT.origin}/.well-known/jwks.json`,
    scopes_supported: [
      "read:projects",
      "write:leads",
      "read:portfolio",
      "openid",
      "profile",
      "email",
    ],
    resource_documentation: AGENT.apiDocsUrl,
    resource_signing_alg_values_supported: ["RS256"],
    www_authenticate_scheme: "Bearer",
  };

  return NextResponse.json(doc, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
