import { AGENT } from "@/lib/agent-config";

/**
 * /auth.md — agent registration instructions (auth.md spec).
 *
 * Markdown served at the site root that tells AI agents how to register for
 * first-party access to ClickTake Technologies APIs. Mirrors the agent_auth
 * block in /.well-known/oauth-authorization-server.
 *
 * The YAML frontmatter at the top of the markdown is the machine-readable
 * `agent_auth` metadata block per the auth.md spec — agents can parse it
 * without reading the human-readable sections below.
 *
 * @see https://workos.com/auth.md
 * @see https://github.com/workos/auth.md
 */
export const dynamic = "force-static";

export function GET() {
  const today = new Date().toISOString().split("T")[0];
  const md = `---
# auth.md frontmatter — machine-readable agent_auth metadata
# Spec: https://workos.com/auth.md
schema: "https://workos.com/auth.md/schema/v1"
origin: "${AGENT.origin}"
contact: "${AGENT.contactEmail}"
last_updated: "${today}"
agent_auth:
  register_uri: "${AGENT.origin}/admin/register-agent"
  documentation_uri: "${AGENT.authMdUrl}"
  supported_identity_types:
    - service
    - user_assisted
    - user_managed
  credential_types_supported:
    - api_key
    - oauth_access_token
    - oidc_id_token
  claims_endpoint: "${AGENT.origin}/api/auth/claims"
  revocation_uri: "${AGENT.origin}/api/auth/revoke"
  authorization_server: "${AGENT.authorizationServerUrl}"
  protected_resource: "${AGENT.protectedResourceUrl}"
oauth:
  issuer: "${AGENT.oauthIssuer}"
  authorization_endpoint: "${AGENT.origin}/api/auth/signin"
  token_endpoint: "${AGENT.origin}/api/auth/token"
  jwks_uri: "${AGENT.origin}/.well-known/jwks.json"
  registration_endpoint: "${AGENT.origin}/api/auth/register"
  introspection_endpoint: "${AGENT.origin}/api/auth/introspect"
  revocation_endpoint: "${AGENT.origin}/api/auth/revoke"
  scopes_supported:
    - openid
    - profile
    - email
    - "read:projects"
    - "write:leads"
    - "read:portfolio"
  grant_types_supported:
    - authorization_code
    - refresh_token
    - client_credentials
mcp:
  server_card: "${AGENT.mcpServerCardUrl}"
  transport_endpoint: "${AGENT.mcpEndpoint}"
agent_skills:
  discovery_index: "${AGENT.agentSkillsUrl}"
rate_limits:
  public_read: "60 req/min per IP"
  authenticated_read: "600 req/min per token"
  write: "30 req/min per token"
---

# auth.md — ClickTake Technologies

This document describes how AI agents authenticate with and register for
access to ClickTake Technologies APIs and tools.

> Site: ${AGENT.origin}
> Contact: ${AGENT.contactEmail}
> Last updated: ${today}

## 1. Authentication methods

We support three agent identity types:

| Type             | When to use                                          | Credential                |
| ---------------- | ---------------------------------------------------- | ------------------------- |
| \`service\`        | Long-lived background agent acting on its own behalf | OAuth 2.0 access token    |
| \`user_assisted\`  | Agent acting on behalf of a human user (default)     | OIDC ID token via NextAuth |
| \`user_managed\`   | Agent acting on behalf of a human, fully delegated   | OAuth refresh + access    |

## 2. OAuth 2.0 / OIDC discovery

- Authorization server metadata: ${AGENT.authorizationServerUrl}
- Protected resource metadata:  ${AGENT.protectedResourceUrl}
- JWKS:                          ${AGENT.origin}/.well-known/jwks.json

Supported grant types: \`authorization_code\`, \`refresh_token\`, \`client_credentials\`.
Supported scopes: \`openid\`, \`profile\`, \`email\`, \`read:projects\`,
\`write:leads\`, \`read:portfolio\`.

## 3. Agent registration

To register a new agent for first-party access:

1. Send a POST request to \`${AGENT.origin}/api/auth/register\` with a JSON body:
   \`\`\`json
   {
     "client_name": "my-ai-agent",
     "identity_type": "service",
     "credential_type": "api_key",
     "redirect_uris": [],
     "scopes": ["read:portfolio", "write:leads"]
   }
   \`\`\`
2. You will receive a \`client_id\`, \`client_secret\` (if applicable) and an
   \`api_key\` for bearer auth on tool endpoints.
3. Use the credential in the \`Authorization: Bearer <token>\` header on all
   subsequent requests.

## 4. Token lifecycle

| Endpoint                          | Purpose                       |
| --------------------------------- | ----------------------------- |
| \`${AGENT.origin}/api/auth/token\`        | Exchange code for token        |
| \`${AGENT.origin}/api/auth/introspect\`   | Validate token                 |
| \`${AGENT.origin}/api/auth/revoke\`       | Revoke token                   |
| \`${AGENT.origin}/api/auth/claims\`       | Retrieve extended claims       |

Access tokens expire in 1 hour. Refresh tokens expire in 30 days. Use the
\`refresh_token\` grant to obtain a new access token without re-authenticating
the user.

## 5. MCP and Agent Skills

- MCP Server Card: ${AGENT.mcpServerCardUrl}
- MCP transport endpoint: ${AGENT.mcpEndpoint}
- Agent Skills index: ${AGENT.agentSkillsUrl}

All MCP tool calls require a Bearer token with at least one of the scopes
listed above. The \`submit-lead\` tool requires \`write:leads\`; all \`read:\`
tools require their respective read scope.

## 6. Rate limits

- Public read endpoints: 60 req/min per IP
- Authenticated read endpoints: 600 req/min per token
- Write endpoints (\`submit-lead\`, \`write:leads\`): 30 req/min per token

Rate-limited responses return HTTP 429 with a \`Retry-After\` header.

## 7. Acceptable use

Agents must:

- Identify themselves with a stable User-Agent containing the agent name.
- Not submit leads on behalf of users without explicit consent.
- Respect \`robots.txt\` for crawling.
- Not attempt to enumerate or scrape private portfolio data.

## 8. Contact

For partnership or API access questions, email ${AGENT.contactEmail}.
`;

  return new Response(md, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
      vary: "Accept",
    },
  });
}
