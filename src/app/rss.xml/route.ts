import { SITE, BLOG_POSTS } from "@/lib/site-data";

/**
 * RSS 2.0 feed at /rss.xml.
 *
 * Why: RSS is still the de facto syndication format for feed readers
 * (Feedly, Inoreader, NetNewsWire) and is consumed by many AI assistants
 * (ChatGPT via plugins, Claude via search, Perplexity) for fresh-content
 * discovery. It complements /sitemap.xml (which is for search-engine
 * crawlers, not feed readers).
 *
 * Format: RSS 2.0 + content:encoded extension + atom:link self-reference.
 * Content-Type: application/rss+xml; charset=utf-8
 *
 * Caching: force-static so the feed is built once at deploy time and
 * served from the CDN edge. Re-deploy on blog post publish.
 */
export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function iso8601(dateStr: string): string {
  // Accept "YYYY-MM-DD" or full ISO; return a proper RFC-822/ISO-8601 date.
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

export async function GET(): Promise<Response> {
  // Take the 20 most recent posts (RSS best practice — keep feeds lean).
  const posts = [...BLOG_POSTS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 20);

  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      return [
        `    <item>`,
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${iso8601(p.publishedAt)}</pubDate>`,
        `      <dc:creator>${escapeXml(p.author || SITE.name)}</dc:creator>`,
        `      <category>${escapeXml(p.category)}</category>`,
        `      <description>${escapeXml(p.excerpt)}</description>`,
        `      <content:encoded><![CDATA[<p>${escapeXml(p.excerpt)}</p><p>${escapeXml(p.body)}</p>]]></content:encoded>`,
        `    </item>`,
      ].join("\n");
    })
    .join("\n");

  const lastBuild = posts[0] ? iso8601(posts[0].publishedAt) : new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE.name)} — Blog</title>
    <link>${escapeXml(SITE.url)}/blog</link>
    <atom:link href="${escapeXml(SITE.url)}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Engineering, marketing and AI field notes from the ${escapeXml(SITE.name)} team. Practical articles on Next.js, SEO, AI automation, e-commerce and growth marketing — written by the engineers, marketers and designers who ship this work every day.</description>
    <language>en-GB</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>${escapeXml(SITE.email)} (${escapeXml(SITE.name)})</managingEditor>
    <webMaster>${escapeXml(SITE.email)} (${escapeXml(SITE.name)})</webMaster>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(SITE.name)}. All rights reserved.</copyright>
    <generator>Next.js RSS route</generator>
    <image>
      <url>${escapeXml(SITE.url)}/clicktake-logo.png</url>
      <title>${escapeXml(SITE.name)} — Blog</title>
      <link>${escapeXml(SITE.url)}/blog</link>
      <width>256</width>
      <height>256</height>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
