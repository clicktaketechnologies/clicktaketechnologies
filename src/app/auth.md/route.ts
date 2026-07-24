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
  skill: "auth.md/v1"
  spec: "https://workos.com/auth.md"
  register_uri: "${AGENT.origin}/api/auth/register"
  documentation_uri: "${AGENT.authMdUrl}"
  authorization_server: "${AGENT.authorizationServerUrl}"
  protected_resource: "${AGENT.protectedResourceUrl}"
  supported_identity_types:
    - service
    - user_assisted
    - user_managed
  credential_types_supported:
    - api_key
    - oauth_access_token
    - oidc_id_token
  registration_methods:
    - method: oauth_dynamic_registration
      endpoint: "${AGENT.origin}/api/auth/register"
      protocol: "RFC 7591"
      credential_type: oauth_access_token
      authentication: client_secret_basic
      description: "OAuth 2.0 Dynamic Client Registration — agents POST a client metadata document and receive client_id + client_secret."
      flow_steps:
        - "POST ${AGENT.origin}/api/auth/register with JSON body containing client_name, identity_type=service, credential_type=oauth_access_token, redirect_uris, scopes"
        - "Receive 201 with client_id, client_secret, token_endpoint, introspection_endpoint"
        - "Exchange client credentials at ${AGENT.origin}/api/auth/token using client_credentials grant to obtain an access_token"
        - "Use access_token as Bearer credential on subsequent API requests"
      request_example: |
        POST /api/auth/register HTTP/1.1
        Content-Type: application/json

        {
          "client_name": "my-ai-agent",
          "identity_type": "service",
          "credential_type": "oauth_access_token",
          "redirect_uris": [],
          "scopes": ["read:portfolio", "write:leads"]
        }
      response_example: |
        HTTP/1.1 201 Created
        Content-Type: application/json

        {
          "client_id": "agent_xxx",
          "client_secret": "secret_xxx",
          "token_endpoint": "https://clicktaketech.com/api/auth/token",
          "introspection_endpoint": "https://clicktaketech.com/api/auth/introspect",
          "expires_at": "2026-08-24T00:00:00Z"
        }
    - method: api_key_provisioning
      endpoint: "${AGENT.origin}/api/auth/register"
      credential_type: api_key
      authentication: bearer
      description: "API key provisioning for service agents — agents POST identity metadata and receive a long-lived API key for bearer auth."
      flow_steps:
        - "POST ${AGENT.origin}/api/auth/register with JSON body containing client_name, identity_type=service, credential_type=api_key"
        - "Receive 201 with api_key (long-lived, revocable)"
        - "Use api_key as Bearer credential on subsequent API requests"
      request_example: |
        POST /api/auth/register HTTP/1.1
        Content-Type: application/json

        {
          "client_name": "my-ai-agent",
          "identity_type": "service",
          "credential_type": "api_key",
          "scopes": ["read:portfolio", "write:leads"]
        }
      response_example: |
        HTTP/1.1 201 Created
        Content-Type: application/json

        {
          "api_key": "ctk_live_xxx",
          "revocation_uri": "https://clicktaketech.com/api/auth/revoke",
          "scopes": ["read:portfolio", "write:leads"]
        }
    - method: oidc_authorization_code
      endpoint: "${AGENT.origin}/api/auth/signin"
      credential_type: oidc_id_token
      authentication: authorization_code
      description: "OIDC Authorization Code flow for user_assisted agents — agents redirect a human user through NextAuth to obtain an ID token."
      flow_steps:
        - "Redirect user to ${AGENT.origin}/api/auth/signin?provider=google&redirect_uri=<callback>"
        - "User authenticates with Google/LinkedIn/GitHub via NextAuth"
        - "NextAuth redirects back to <callback>?code=<auth_code>"
        - "Exchange auth_code at ${AGENT.origin}/api/auth/token for id_token + access_token"
        - "Use id_token as Bearer credential on subsequent API requests"
  claims_endpoint: "${AGENT.origin}/api/auth/claims"
  revocation_uri: "${AGENT.origin}/api/auth/revoke"
  introspection_uri: "${AGENT.origin}/api/auth/introspect"
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

To register a new agent for first-party access, send an HTTP POST request
to the registration endpoint. The flow is fully self-contained — no
pre-registration, email exchange, or manual approval step is required.

**Endpoint:** \`${AGENT.origin}/api/auth/register\`
**Method:** POST
**Content-Type:** application/json
**Auth:** none required for the registration call itself

### 3.1 curl example — request an API key

\`\`\`bash
curl -X POST ${AGENT.origin}/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_name": "my-ai-agent",
    "identity_type": "service",
    "credential_type": "api_key",
    "scopes": ["read:portfolio", "write:leads"]
  }'
\`\`\`

### 3.2 Response (HTTP 201)

\`\`\`json
{
  "api_key": "ctk_live_xxx",
  "revocation_uri": "${AGENT.origin}/api/auth/revoke",
  "scopes": ["read:portfolio", "write:leads"]
}
\`\`\`

### 3.3 Use the credential

\`\`\`bash
curl ${AGENT.origin}/api/portfolio \\
  -H "Authorization: Bearer ctk_live_xxx"
\`\`\`

### 3.4 Registration methods supported

| Method                      | Credential type        | Auth flow                |
| --------------------------- | ---------------------- | ------------------------ |
| \`oauth_dynamic_registration\` | oauth_access_token     | RFC 7591 (client_secret) |
| \`api_key_provisioning\`       | api_key                | Bearer                   |
| \`oidc_authorization_code\`    | oidc_id_token          | Authorization Code       |

### 3.5 Token lifecycle

| Endpoint                          | Purpose                       |
| --------------------------------- | ----------------------------- |
| \`${AGENT.origin}/api/auth/token\`        | Exchange code for token        |
| \`${AGENT.origin}/api/auth/introspect\`   | Validate token                 |
| \`${AGENT.origin}/api/auth/revoke\`       | Revoke token                   |
| \`${AGENT.origin}/api/auth/claims\`       | Retrieve extended claims       |

Access tokens expire in 1 hour. Refresh tokens expire in 30 days. Use the
\`refresh_token\` grant to obtain a new access token without re-authenticating
the user.

## 4. MCP and Agent Skills

- MCP Server Card: ${AGENT.mcpServerCardUrl}
- MCP transport endpoint: ${AGENT.mcpEndpoint}
- Agent Skills index: ${AGENT.agentSkillsUrl}

All MCP tool calls require a Bearer token with at least one of the scopes
listed above. The \`submit-lead\` tool requires \`write:leads\`; all \`read:\`
tools require their respective read scope.

## 5. Rate limits

- Public read endpoints: 60 req/min per IP
- Authenticated read endpoints: 600 req/min per token
- Write endpoints (\`submit-lead\`, \`write:leads\`): 30 req/min per token

Rate-limited responses return HTTP 429 with a \`Retry-After\` header.

## 6. Acceptable use

Agents must:

- Identify themselves with a stable User-Agent containing the agent name.
- Not submit leads on behalf of users without explicit consent.
- Respect \`robots.txt\` for crawling.
- Not attempt to enumerate or scrape private portfolio data.

## 7. Contact

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
