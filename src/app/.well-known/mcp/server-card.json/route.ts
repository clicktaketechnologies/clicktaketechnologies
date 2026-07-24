import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * MCP Server Card (SEP-1649).
 *
 * Served at /.well-known/mcp/server-card.json. Discovers the Model Context
 * Protocol server surface for clicktaketech.com so AI agents can locate and
 * connect to it without manual configuration.
 *
 * @see https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127
 */
export const dynamic = "force-static";

export async function GET() {
  const card = {
    $schema: "https://mcpcard.org/schema.json",
    serverInfo: {
      name: "clicktaketech.com",
      title: "ClickTake Technologies MCP Server",
      description:
        "Exposes site search, project portfolio, contact, and lead-submission tools to AI agents via the Model Context Protocol.",
      version: "1.0.0",
      organization: {
        name: "ClickTake Technologies",
        url: AGENT.origin,
      },
    },
    transport: {
      type: "streamable_http",
      endpoint: AGENT.mcpEndpoint,
      auth: {
        type: "oauth",
        authorization_server: AGENT.oauthIssuer,
        scopes: ["read:portfolio", "write:leads"],
      },
    },
    capabilities: {
      tools: true,
      resources: true,
      prompts: false,
      completions: false,
      logging: false,
    },
    tools: [
      {
        name: "search_site",
        description:
          "Full-text search across clicktaketech.com pages, services, case studies and blog posts.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Search query" },
            limit: { type: "integer", default: 10, minimum: 1, maximum: 50 },
          },
          required: ["query"],
        },
      },
      {
        name: "list_services",
        description: "List all service offerings (web dev, AI, mobile, SaaS, marketing).",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "list_portfolio",
        description: "Return recent portfolio projects with industry tags.",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string" },
            limit: { type: "integer", default: 10 },
          },
        },
      },
      {
        name: "submit_lead",
        description:
          "Submit a sales lead to ClickTake Technologies. Requires name, email and message.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            company: { type: "string" },
            phone: { type: "string" },
            message: { type: "string" },
            budget: { type: "string" },
          },
          required: ["name", "email", "message"],
        },
      },
      {
        name: "get_office_hours",
        description: "Return office hours and contact numbers per regional office.",
        inputSchema: { type: "object", properties: {} },
      },
    ],
    resources: [
      { uri: "ct://services", name: "Services catalog", mimeType: "application/json" },
      { uri: "ct://portfolio", name: "Portfolio projects", mimeType: "application/json" },
      { uri: "ct://contact", name: "Contact & office info", mimeType: "application/json" },
      { uri: "ct://api-catalog", name: "API catalog", mimeType: "application/linkset+json" },
    ],
    documentation: AGENT.apiDocsUrl,
    support: AGENT.contactEmail,
    privacy_policy: `${AGENT.origin}/legal`,
  };

  return NextResponse.json(card, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
