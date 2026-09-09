#!/usr/bin/env python3
"""QA — sitemap vs routes cross-check + sitemap internal consistency"""
import os
import re

ROOT = "/home/z/my-project"
SITE_URL = "https://clicktaketech.com"

# 1. Parse sitemap.ts for route paths
with open(os.path.join(ROOT, "src", "app", "sitemap.ts")) as f:
    content = f.read()

# Extract all path literals: path: "/..." or url: `${SITE.url}/...`
paths = set()
for m in re.finditer(r'''path\s*:\s*["'`](/[^"'`]*)["']''', content):
    paths.add(m.group(1))
for m in re.finditer(r'''\$\{SITE\.url\}(/[^"'`\s]*)''', content):
    p = m.group(1).rstrip("/")
    paths.add(p if p else "/")

# 2. Build fs routes (same logic as link audit)
app_dir = os.path.join(ROOT, "src", "app")
fs_routes = set()
for dirpath, dirnames, filenames in os.walk(app_dir):
    if "page.tsx" not in filenames:
        continue
    rel = os.path.relpath(dirpath, app_dir)
    parts = [] if rel == "." else rel.split(os.sep)
    joined = "/".join(parts)
    if parts[:1] == ["api"] or "/api" in joined:
        continue
    if parts[:1] == ["admin"] or parts[:1] == [".well-known"]:
        continue
    route = "/" + "/".join(parts) if parts else "/"
    fs_routes.add(route.rstrip("/") or "/")

# Dynamic content routes (from DB — known slugs used in sitemap)
print("=" * 70)
print("SITEMAP AUDIT")
print("=" * 70)
print(f"\nSitemap entries found: {len(paths)}")

def route_matches(fs_route, link):
    fs_parts = [p for p in fs_route.split("/") if p]
    link_parts = [p for p in link.split("/") if p]
    i = fi = 0
    while fi < len(fs_parts):
        seg = fs_parts[fi]
        if re.fullmatch(r"\[\[?\.\.\.\w+\]\]?", seg):
            return True
        if i >= len(link_parts):
            return False
        if seg.startswith("[") and seg.endswith("]"):
            i += 1; fi += 1; continue
        if seg != link_parts[i]:
            return False
        i += 1; fi += 1
    return i == len(link_parts)

# Expand dynamic slugs from content files
known_slugs = set()
# Blog slugs from prerender list in build log — check content dirs
for sub in ("blog", "resources", "careers", "case-studies", "solutions"):
    subdir = os.path.join(ROOT, "src", "content", sub)
    if os.path.isdir(subdir):
        for fn in os.listdir(subdir):
            known_slugs.add(f"/{sub}/" + fn.replace(".ts", "").replace(".tsx", "").replace(".md", ""))

broken_sitemap = []
for p in sorted(paths):
    norm = p.rstrip("/") or "/"
    # strip dynamic template markers
    if "${" in norm or "{" in norm:
        continue
    if norm in fs_routes:
        continue
    if any(route_matches(dr, norm) for dr in fs_routes if "[" in dr):
        continue
    if norm in known_slugs:
        continue
    broken_sitemap.append(p)

print("\nBROKEN SITEMAP ENTRIES:", len(broken_sitemap))
for p in broken_sitemap:
    print(f"  ✗ {p}")

# 3. Check routes NOT in sitemap (missing SEO coverage)
public_prefixes = ("/", "/about", "/blog", "/careers", "/case-studies",
                   "/cities", "/contact", "/legal", "/portfolio", "/pricing",
                   "/resources", "/services", "/solutions", "/team")
missing = []
for r in sorted(fs_routes):
    if r == "/" or r.startswith("/admin") or ".well-known" in r:
        continue
    if "[" in r and "cities" not in r:  # dynamic leaf routes use DB slugs
        continue
    if r not in paths and not any(r.startswith(p) for p in paths):
        missing.append(r)

print("\nROUTES MISSING FROM SITEMAP:", len(missing))
for r in missing:
    print(f"  ⚠ {r}")
