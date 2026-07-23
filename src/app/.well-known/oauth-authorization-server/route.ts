import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414).
 *
 * Served at /.well-known/oauth-authorization-server. Tells AI agents how to
 * obtain access tokens for any protected API on clicktaketech.com. Includes
 * the agent_auth block from auth.md so agents can also discover how to
 * register themselves for first-party access.
 *
 * @see https://www.rfc-editor.org/rfc/rfc8414
 * @see https://workos.com/auth.md
 */
export const dynamic = "force-static";

export async function GET() {
  const doc = {
    issuer: AGENT.oauthIssuer,
    authorization_endpoint: `${AGENT.origin}/api/auth/signin`,
    token_endpoint: `${AGENT.origin}/api/auth/token`,
    userinfo_endpoint: `${AGENT.origin}/api/auth/userinfo`,
    jwks_uri: `${AGENT.origin}/.well-known/jwks.json`,
    registration_endpoint: `${AGENT.origin}/api/auth/register`,
    introspection_endpoint: `${AGENT.origin}/api/auth/introspect`,
    revocation_endpoint: `${AGENT.origin}/api/auth/revoke`,
    scopes_supported: [
      "openid",
      "profile",
      "email",
      "read:projects",
      "write:leads",
      "read:portfolio",
    ],
    response_types_supported: ["code", "token", "id_token"],
    grant_types_supported: [
      "authorization_code",
      "refresh_token",
      "client_credentials",
    ],
    response_modes_supported: ["query", "fragment", "form_post"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "private_key_jwt",
    ],
    claims_supported: [
      "sub",
      "name",
      "email",
      "email_verified",
      "role",
      "https://clicktaketech.com/claims/tenant",
    ],
    code_challenge_methods_supported: ["S256"],
    // Agent registration (auth.md spec)
    agent_auth: {
      register_uri: `${AGENT.origin}/admin/register-agent`,
      supported_identity_types: ["service", "user_assisted", "user_managed"],
      credential_types_supported: ["api_key", "oauth_access_token", "oidc_id_token"],
      claims_endpoint: `${AGENT.origin}/api/auth/claims`,
      revocation_uri: `${AGENT.origin}/api/auth/revoke`,
      documentation_uri: AGENT.authMdUrl,
    },
    service_documentation: AGENT.apiDocsUrl,
    op_policy_uri: `${AGENT.origin}/legal`,
    op_tos_uri: `${AGENT.origin}/legal`,
  };

  return NextResponse.json(doc, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
