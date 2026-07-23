import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * OpenAPI 3.1 specification for clicktaketech.com public API surface.
 *
 * Served at /openapi.json. Linked from the homepage via the Link header
 * with rel="service-desc". Agents crawl this to discover every callable
 * endpoint, expected request/response shapes, and authentication rules.
 *
 * Note: /admin/* endpoints are intentionally omitted — they are protected
 * UI routes, not part of the public API surface.
 */
export const dynamic = "force-static";

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "ClickTake Technologies Public API",
      version: "1.0.0",
      description:
        "Public API surface for clicktaketech.com. Includes lead capture, contact, portfolio, services, and site-search endpoints. All write endpoints require a Bearer token from the OAuth authorization server documented at /.well-known/oauth-authorization-server.",
      contact: { email: AGENT.contactEmail, url: AGENT.origin },
      license: {
        name: "Proprietary",
        url: `${AGENT.origin}/legal`,
      },
    },
    servers: [{ url: AGENT.origin + "/api", description: "Production" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "OAuth 2.0 access token from https://clicktaketech.com/.well-known/oauth-authorization-server",
        },
      },
      schemas: {
        Lead: {
          type: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            email: { type: "string", format: "email" },
            company: { type: "string" },
            phone: { type: "string" },
            message: { type: "string", minLength: 10, maxLength: 5000 },
            budget: {
              type: "string",
              enum: ["<5k", "5k-15k", "15k-50k", "50k+"],
            },
            service: {
              type: "string",
              enum: [
                "web-development",
                "ai-automation",
                "mobile-app",
                "saas",
                "marketing",
                "other",
              ],
            },
          },
        },
        Service: {
          type: "object",
          properties: {
            slug: { type: "string" },
            title: { type: "string" },
            summary: { type: "string" },
            icon: { type: "string" },
            features: { type: "array", items: { type: "string" } },
          },
        },
        PortfolioItem: {
          type: "object",
          properties: {
            slug: { type: "string" },
            title: { type: "string" },
            client: { type: "string" },
            industry: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            url: { type: "string" },
            image: { type: "string" },
          },
        },
        Office: {
          type: "object",
          properties: {
            city: { type: "string" },
            country: { type: "string" },
            address: { type: "string" },
            phone: { type: "string" },
            hours: { type: "string" },
            coords: { type: "string" },
          },
        },
      },
    },
    tags: [
      { name: "leads", description: "Sales lead capture" },
      { name: "content", description: "Public content (services, portfolio, offices)" },
      { name: "search", description: "Site search" },
      { name: "health", description: "Service health" },
    ],
    paths: {
      "/leads": {
        post: {
          tags: ["leads"],
          summary: "Submit a sales lead",
          description:
            "Capture an inbound sales lead. Rate-limited to 30 req/min per token. Requires the write:leads scope.",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Lead" },
              },
            },
          },
          responses: {
            "201": {
              description: "Lead created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      status: { type: "string", enum: ["received", "queued"] },
                      created_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
            "429": { description: "Rate limited" },
            "422": { description: "Validation error" },
          },
        },
      },
      "/services": {
        get: {
          tags: ["content"],
          summary: "List service offerings",
          responses: {
            "200": {
              description: "Service catalog",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Service" },
                  },
                },
              },
            },
          },
        },
      },
      "/portfolio": {
        get: {
          tags: ["content"],
          summary: "List portfolio projects",
          parameters: [
            {
              name: "industry",
              in: "query",
              schema: { type: "string" },
              description: "Filter by industry tag",
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", default: 10, minimum: 1, maximum: 50 },
            },
          ],
          responses: {
            "200": {
              description: "Portfolio items",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/PortfolioItem" },
                  },
                },
              },
            },
          },
        },
      },
      "/offices": {
        get: {
          tags: ["content"],
          summary: "List regional offices",
          responses: {
            "200": {
              description: "Office directory",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Office" },
                  },
                },
              },
            },
          },
        },
      },
      "/search": {
        get: {
          tags: ["search"],
          summary: "Full-text site search",
          parameters: [
            {
              name: "q",
              in: "query",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", default: 10, minimum: 1, maximum: 50 },
            },
          ],
          responses: {
            "200": {
              description: "Search results",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      query: { type: "string" },
                      results: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            url: { type: "string" },
                            snippet: { type: "string" },
                            score: { type: "number" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/health": {
        get: {
          tags: ["health"],
          summary: "Service health probe",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", enum: ["ok", "degraded"] },
                      timestamp: { type: "string", format: "date-time" },
                      region: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(spec, {
    headers: {
      "content-type": "application/vnd.oai.openapi+json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
