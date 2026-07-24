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
    // MPP (Machine Payment Protocol) top-level service info.
    // @see https://mpp.dev
    // @see https://paymentauth.org/draft-payment-discovery-00.txt
    "x-service-info": {
      name: "ClickTake Technologies Public API",
      categories: ["lead-capture", "content-delivery", "site-search", "premium-content"],
      payment_protocols_supported: ["x402", "mpp"],
      default_currency: "USD",
      base_url: `${AGENT.origin}/api`,
      documentation: AGENT.apiDocsUrl,
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
          // MPP (Machine Payment Protocol) extension — declares this operation
          // is free (no charge). Required by MPP-aware agents to know whether
          // payment is expected before invoking the operation.
          // @see https://mpp.dev
          "x-payment-info": {
            intent: "none",
            method: [],
            amount: 0,
            currency: "USD",
            description:
              "Lead submission is free. No payment required.",
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
      "/premium": {
        get: {
          tags: ["premium"],
          summary: "Premium content endpoint (x402 payment required)",
          description:
            "Premium-tier endpoint protected by the x402 HTTP payment protocol. Returns HTTP 402 with payment requirements that AI agents can fulfill automatically. Payments are NOT currently accepted — this endpoint is a protocol stub demonstrating x402 detection. Real facilitator URL and wallet address must be configured before enabling.",
          externalDocs: {
            description: "x402 protocol specification",
            url: "https://x402.org",
          },
          // MPP extension for the payable operation
          "x-payment-info": {
            intent: "charge",
            method: ["tempo", "lightning"],
            amount: 0.01,
            currency: "USD",
            description:
              "Premium content access. Per-request charge via x402.",
            payment_protocol: "x402",
            facilitator: "https://facilitator.example.com",
          },
          responses: {
            "200": {
              description: "Premium content (after payment verified)",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      content: { type: "string" },
                      tier: { type: "string", enum: ["premium"] },
                    },
                  },
                },
              },
            },
            "402": {
              description: "Payment Required (x402)",
              headers: {
                "WWW-Authenticate": {
                  schema: { type: "string" },
                  description: "x402 payment challenge",
                },
                "x-payment-requirements": {
                  schema: { type: "string" },
                  description: "JSON-encoded x402 payment requirements",
                },
              },
            },
          },
        },
      },
      "/services": {
        get: {
          tags: ["content"],
          summary: "List service offerings",
          "x-payment-info": {
            intent: "none",
            method: [],
            amount: 0,
            currency: "USD",
          },
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
          "x-payment-info": {
            intent: "none",
            method: [],
            amount: 0,
            currency: "USD",
          },
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
          "x-payment-info": {
            intent: "none",
            method: [],
            amount: 0,
            currency: "USD",
          },
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
          "x-payment-info": {
            intent: "none",
            method: [],
            amount: 0,
            currency: "USD",
          },
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
          "x-payment-info": {
            intent: "none",
            method: [],
            amount: 0,
            currency: "USD",
          },
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
