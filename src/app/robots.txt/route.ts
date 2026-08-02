import { SITE } from "@/lib/site-data";

/**
 * robots.txt — emitted as a raw text route (not via Next's MetadataRoute.Robots)
 * because the standard MetadataRoute.Robots type does not allow `Content-Signal`
 * directives (Content Signals spec — https://contentsignals.org/).
 *
 * Content Signals declare AI content usage preferences to crawlers and agents:
 *
 *   ai-train=no    — do not use content to train AI models
 *   search=yes     — allow indexing and inclusion in search results
 *   ai-input=no    — do not use content as input to AI prompts / RAG
 *
 * Per the spec, Content-Signal directives apply to the User-agent block they
 * appear under. We emit them under the wildcard `*` block AND under each
 * explicitly-allowlisted AI crawler block, so crawlers that only read their
 * own block still see the preferences.
 */
export const dynamic = "force-static";

const CONTENT_SIGNAL = "ai-train=no, search=yes, ai-input=no";

const AI_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bytespider",
  "Applebot-Extended",
];

export function GET() {
  const lines: string[] = [];

  // Wildcard block — applies to all bots
  lines.push("User-agent: *");
  lines.push("Allow: /");
  lines.push("Disallow: /api/");
  lines.push("Disallow: /admin/");
  lines.push(`Content-Signal: ${CONTENT_SIGNAL}`);
  lines.push("");

  // Explicit allow-list for known AI crawlers — some site owners block
  // these by default; we explicitly welcome them so the site is indexed
  // by ChatGPT, Claude, Perplexity, Gemini, etc.
  for (const ua of AI_CRAWLERS) {
    lines.push(`User-agent: ${ua}`);
    lines.push("Allow: /");
    lines.push(`Content-Signal: ${CONTENT_SIGNAL}`);
    lines.push("");
  }

  lines.push(`Host: ${SITE.url}`);
  lines.push(`Sitemap: ${SITE.url}/sitemap.xml`);

  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "access-control-allow-origin": "*",
    },
  });
}
