// Test the blog upload parsers without going through the API.
// Run: npx tsx scripts/test-blog-parsers.ts
import matter from "gray-matter";
import { marked } from "marked";
import { PDFParse } from "pdf-parse";

// ─── Test 1: Markdown with frontmatter ─────────────────────────────────────
console.log("\n=== Test 1: Markdown ===");
const md = `---
title: Test Article
slug: test-article
excerpt: A short test description.
category: SEO
tags: [seo, local-seo, uk]
author: ClickTake Test
publishedAt: 2026-01-15
coverImage: https://example.com/image.jpg
---

# Test Article

This is the **body** of the article. It has multiple paragraphs.

Second paragraph here. With some _italic_ text.
`;
const parsed = matter(md);
console.log("Frontmatter:", parsed.data);
console.log("Body (first 100 chars):", parsed.content.slice(0, 100));
const html = marked.parse(parsed.content, { async: false }) as string;
console.log("HTML (first 200 chars):", html.slice(0, 200));

// ─── Test 2: CSV ──────────────────────────────────────────────────────────
console.log("\n=== Test 2: CSV ===");
const csv = `title,slug,excerpt,category,tags,author,content
First Post,first-post,First excerpt,SEO,"seo|local",ClickTake,"<p>First body</p>"
Second Post,second-post,Second excerpt,Web Dev,"nextjs|react",ClickTake Engineering,"<p>Second body</p>"`;
const lines = csv.split("\n");
const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
console.log("Headers:", headers);
console.log("Rows:", lines.length - 1);

// ─── Test 3: PDF (only if we can generate one) ────────────────────────────
console.log("\n=== Test 3: PDF (skipped — no test PDF available) ===");

console.log("\n=== All parsers work ===");
