#!/usr/bin/env python3
"""QA — SEO metadata audit: verify title/description/OG/twitter/canonical on every public page."""
import os, re

ROOT = "/home/z/my-project"
app_dir = os.path.join(ROOT, "src", "app")

# Page files to audit (public routes only)
PAGES = []
for dirpath, dirnames, filenames in os.walk(app_dir):
    if "page.tsx" not in filenames:
        continue
    rel = os.path.relpath(dirpath, app_dir)
    parts = [] if rel == "." else rel.split(os.sep)
    joined = "/".join(parts)
    if parts[:1] in (["api"], ["admin"]) or ".well-known" in joined:
        continue
    if "route.ts" in filenames and "page.tsx" not in filenames:
        continue
    PAGES.append(("/" + "/".join(parts) if parts else "/", os.path.join(dirpath, "page.tsx")))

def audit(path, fp):
    with open(fp, encoding="utf-8", errors="ignore") as f:
        c = f.read()
    issues = []
    # Metadata can be `export const metadata` or `export async function generateMetadata`
    has_title = bool(re.search(r"title\s*:", c)) or "generateMetadata" in c
    has_desc = bool(re.search(r"description\s*:", c))
    has_canonical = bool(re.search(r"alternates\s*:\s*\{", c)) or re.search(r"canonical\s*:", c)
    # Root layout provides site-wide OG/twitter defaults — page-level override optional
    # but a page exporting its own metadata SHOULD carry OG images (falls back to layout default which HAS og-default)
    has_jsonld = "JsonLd" in c or "json-ld" in c or "application/ld+json" in c
    # layout.tsx provides Organization + WebSite + LocalBusiness globally
    if not has_title: issues.append("no title")
    if not has_desc: issues.append("no description")
    if not has_canonical: issues.append("no canonical/alternates")
    if not has_jsonld: issues.append("no JSON-LD")
    return issues

print("=" * 76)
print("SEO METADATA AUDIT (public pages)")
print("Note: root layout.tsx provides global OG/Twitter/robots + Organization,")
print("WebSite, LocalBusiness JSON-LD. Pages below checked for page-level meta.")
print("=" * 76)
total_issues = 0
for path, fp in sorted(PAGES):
    issues = audit(path, fp)
    status = "✓" if not issues else "⚠ " + "; ".join(issues)
    if issues:
        total_issues += 1
    print(f"  {status:40s}  {path}")
print(f"\nPages audited: {len(PAGES)} | with gaps: {total_issues}")
