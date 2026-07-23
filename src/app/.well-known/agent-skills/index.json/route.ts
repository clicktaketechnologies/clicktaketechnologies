import { NextResponse } from "next/server";
import { AGENT } from "@/lib/agent-config";

/**
 * Agent Skills Discovery Index (RFC v0.2.0).
 *
 * Served at /.well-known/agent-skills/index.json. Lists every machine-readable
 * skill this site exposes to AI agents, with content hashes for integrity
 * verification.
 *
 * @see https://github.com/cloudflare/agent-skills-discovery-rfc
 * @see https://agentskills.io/
 */
export const dynamic = "force-static";

async function sha256(text: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return "sha256-unsupported-runtime";
}

export async function GET() {
  const skillsRaw = [
    {
      name: "site-search",
      type: "mcp-tool",
      description: "Full-text search across clicktaketech.com content.",
      url: `${AGENT.origin}/api/mcp/tools/site-search`,
    },
    {
      name: "list-services",
      type: "mcp-tool",
      description: "List all service offerings from ClickTake Technologies.",
      url: `${AGENT.origin}/api/mcp/tools/list-services`,
    },
    {
      name: "submit-lead",
      type: "mcp-tool",
      description: "Submit a sales lead (name, email, message).",
      url: `${AGENT.origin}/api/mcp/tools/submit-lead`,
    },
    {
      name: "list-portfolio",
      type: "mcp-tool",
      description: "Return portfolio projects with industry tags.",
      url: `${AGENT.origin}/api/mcp/tools/list-portfolio`,
    },
    {
      name: "markdown-home",
      type: "markdown",
      description: "Markdown representation of the homepage for AI agents.",
      url: `${AGENT.origin}/?format=markdown`,
    },
  ];

  const skills = await Promise.all(
    skillsRaw.map(async (s) => ({
      ...s,
      sha256: await sha256(`${s.name}:${s.url}`),
    }))
  );

  const doc = {
    $schema: "https://agentskills.io/schema/v0.2.json",
    version: "0.2.0",
    origin: AGENT.origin,
    generated_at: new Date().toISOString(),
    skills,
  };

  return NextResponse.json(doc, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
