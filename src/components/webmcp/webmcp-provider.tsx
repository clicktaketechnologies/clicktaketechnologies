"use client";

/**
 * WebMCP client — exposes site tools to AI agents via the browser.
 *
 * Calls navigator.modelContext.provideContext() (Chrome experimental) to
 * advertise tool definitions for: site search, list services, list portfolio,
 * get office hours, and submit-lead (which routes to /api/leads).
 *
 * The WebMCP API is gated behind a feature flag in Chrome; we feature-detect
 * before calling so the page never errors in browsers that lack it.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 * @see https://developer.chrome.com/blog/webmcp-epp
 */
import { useEffect } from "react";

type WebMCPNavigator = {
  modelContext?: {
    provideContext: (config: {
      origin: string;
      tools: Array<{
        name: string;
        description: string;
        inputSchema: Record<string, unknown>;
        execute: (input: Record<string, unknown>) => Promise<unknown>;
      }>;
    }) => Promise<void>;
  };
};

const SITE_URL = "https://clicktaketech.com";

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const nav = navigator as Navigator & WebMCPNavigator;
    if (!nav.modelContext?.provideContext) return;

    const tools = [
      {
        name: "site-search",
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
        async execute(input: Record<string, unknown>) {
          const q = String(input.query || "");
          const limit = Number(input.limit || 10);
          const res = await fetch(
            `${SITE_URL}/api/search?q=${encodeURIComponent(q)}&limit=${limit}`,
            { headers: { accept: "application/json" } }
          );
          if (!res.ok) return { error: `search failed: ${res.status}` };
          return await res.json();
        },
      },
      {
        name: "list-services",
        description: "List all service offerings (web dev, AI, mobile, SaaS, marketing).",
        inputSchema: { type: "object", properties: {} },
        async execute() {
          const res = await fetch(`${SITE_URL}/api/services`, {
            headers: { accept: "application/json" },
          });
          if (!res.ok) return { error: `list-services failed: ${res.status}` };
          return await res.json();
        },
      },
      {
        name: "list-portfolio",
        description: "Return recent portfolio projects with industry tags.",
        inputSchema: {
          type: "object",
          properties: {
            industry: { type: "string" },
            limit: { type: "integer", default: 10 },
          },
        },
        async execute(input: Record<string, unknown>) {
          const params = new URLSearchParams();
          if (input.industry) params.set("industry", String(input.industry));
          params.set("limit", String(input.limit || 10));
          const res = await fetch(`${SITE_URL}/api/portfolio?${params}`, {
            headers: { accept: "application/json" },
          });
          if (!res.ok) return { error: `list-portfolio failed: ${res.status}` };
          return await res.json();
        },
      },
      {
        name: "get-office-hours",
        description: "Return office hours and contact numbers per regional office.",
        inputSchema: { type: "object", properties: {} },
        async execute() {
          const res = await fetch(`${SITE_URL}/api/offices`, {
            headers: { accept: "application/json" },
          });
          if (!res.ok) return { error: `get-office-hours failed: ${res.status}` };
          return await res.json();
        },
      },
      {
        name: "submit-lead",
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
        async execute(input: Record<string, unknown>) {
          const res = await fetch(`${SITE_URL}/api/leads`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(input),
          });
          if (!res.ok) return { error: `submit-lead failed: ${res.status}` };
          return await res.json();
        },
      },
    ];

    nav.modelContext
      .provideContext({ origin: SITE_URL, tools })
      .then(() => {
        // Successfully registered WebMCP tools. Silent on success.
      })
      .catch((err: unknown) => {
        // Non-fatal — WebMCP is opt-in and experimental.
        console.debug("[webmcp] provideContext failed:", err);
      });
  }, []);

  return null;
}
