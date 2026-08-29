***REMOVED***!/usr/bin/env python3
"""
QA AUDIT v2 — Comprehensive Link Integrity (source-level)
1. Extracts nav/footer/data-driven links from site-data.ts + all components
2. Maps actual route tree from src/app filesystem (incl. dynamic segments)
3. Cross-checks every internal link
"""
import os
import re
from collections import defaultdict

ROOT = "/home/z/my-project"
SRC = os.path.join(ROOT, "src")

***REMOVED*** ─── 1. Build actual route tree from filesystem ───
app_dir = os.path.join(SRC, "app")
fs_routes = set()
dynamic_routes = []  ***REMOVED*** routes with [slug] / [[...slug]] params

for dirpath, dirnames, filenames in os.walk(app_dir):
    if not ("page.tsx" in filenames or "route.ts" in filenames):
        continue
    rel = os.path.relpath(dirpath, app_dir)
    parts = [] if rel == "." else rel.split(os.sep)
    ***REMOVED*** Skip API routes and private folders
    joined = "/".join(parts)
    if "/api" in joined or parts[:1] == ["api"]:
        continue
    route = "/" + "/".join(parts) if parts else "/"
    fs_routes.add(route.rstrip("/") or "/")
    if re.search(r"\[\[?\.\.\.", route):
        dynamic_routes.append(route)
    elif "[" in route:
        dynamic_routes.append(route)

def route_matches(fs_route: str, link: str) -> bool:
    """Check if link matches a filesystem route pattern.
    fs_route like /blog/[slug] matches /blog/anything."""
    fs_parts = [p for p in fs_route.split("/") if p]
    link_parts = [p for p in link.split("/") if p]
    i = 0
    fi = 0
    while fi < len(fs_parts):
        seg = fs_parts[fi]
        if re.fullmatch(r"\[\[\.\.\.\w+\]\]", seg):
            ***REMOVED*** optional catch-all — matches remainder or nothing
            return True
        if re.fullmatch(r"\[\.\.\.\w+\]", seg):
            ***REMOVED*** required catch-all — needs at least one more segment
            return i < len(link_parts)
        if i >= len(link_parts):
            return False
        if seg.startswith("[") and seg.endswith("]"):
            i += 1; fi += 1; continue
        if seg != link_parts[i]:
            return False
        i += 1; fi += 1
    return i == len(link_parts)

***REMOVED*** ─── 2. Extract links from ALL source files (broader patterns) ───
link_re = re.compile(r'''["'`](/[a-zA-Z0-9][a-zA-Z0-9/_\-.]*?)["'`]''')
skip_prefixes = ("/api/", "/_next/", "/images/", "/icons/", "/videos/", "/fonts/")
skip_ext = re.compile(r"\.(png|jpg|jpeg|svg|webp|ico|xml|txt|css|js|json|mp4|webm|pdf|md|ts|tsx|woff2?)$")
skip_exact = {"/admin"}  ***REMOVED*** handled separately

links = defaultdict(set)
for dirpath, dirnames, filenames in os.walk(SRC):
    ***REMOVED*** Skip admin components for public audit but keep admin links flagged
    for fn in filenames:
        if not fn.endswith((".tsx", ".ts")):
            continue
        path = os.path.join(dirpath, fn)
        rel = os.path.relpath(path, ROOT)
        try:
            with open(path, encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception:
            continue
        ***REMOVED*** Find href="/..." and href={`/...`} and href='/...'
        for m in re.finditer(r'''href\s*=\s*["'`]\s*(/[^"'`\s]*)["'`]''', content):
            link = m.group(1).split("?")[0].split("***REMOVED***")[0] or "/"
            links[link].add(rel)
        ***REMOVED*** Template literals: href={`/blog/${slug}`} — capture static prefix
        for m in re.finditer(r'''href\s*=\s*\{\s*[`"'](/[^"'`]*)[`"']\s*\}''', content):
            raw = m.group(1).split("?")[0].split("***REMOVED***")[0] or "/"
            ***REMOVED*** Replace ${...} with [slug]
            link = re.sub(r"\$\{[^}]*\}", "*", raw)
            links[link].add(rel)
        ***REMOVED*** Link imports in data files: href: "/..."
        for m in re.finditer(r'''["']?href["']?\s*:\s*["'`](/[^"'`\s]*)["'`]''', content):
            link = m.group(1).split("?")[0].split("***REMOVED***")[0] or "/"
            links[link].add(rel)
        ***REMOVED*** router.push("/...") / redirect("/...")
        for m in re.finditer(r'''(?:router\.(?:push|replace)|redirect)\(\s*["'`](/[^"'`\s]*)["'`]''', content):
            link = m.group(1).split("?")[0].split("***REMOVED***")[0] or "/"
            links[link].add(rel)

***REMOVED*** ─── 3. Verify every link ───
broken = []
ok_count = 0
for link, files in sorted(links.items()):
    if any(link.startswith(p) for p in skip_prefixes):
        ok_count += 1
        continue
    if skip_ext.search(link):
        ok_count += 1
        continue
    if "$" in link or "*" in link:
        ***REMOVED*** dynamic — verify the static prefix matches a dynamic route
        prefix = link.split("*")[0].rstrip("/") or "/"
        matched = any(route_matches(dr, prefix) or route_matches(dr, link.replace("*", "x"))
                      for dr in dynamic_routes)
        if matched:
            ok_count += 1
            continue
        broken.append((link, sorted(files)[:3], "dynamic-prefix-unmatched"))
        continue
    norm = link.rstrip("/") or "/"
    if norm in fs_routes:
        ok_count += 1
        continue
    matched = any(route_matches(dr, norm) for dr in dynamic_routes)
    if matched:
        ok_count += 1
        continue
    broken.append((link, sorted(files)[:3], "no-route-match"))

print("=" * 78)
print(f"BROKEN LINKS: {len(broken)}   |   OK: {ok_count}   |   FS routes: {len(fs_routes)}   |   Dynamic: {len(dynamic_routes)}")
print("=" * 78)
for link, files, reason in broken:
    print(f"  ✗ {link}   [{reason}]")
    for f in files:
        print(f"      ↳ {f}")

print()
print("─" * 78)
print("DYNAMIC ROUTE PATTERNS:")
for dr in sorted(dynamic_routes):
    print(f"  {dr}")
print()
print("STATIC ROUTES:")
for r in sorted(fs_routes):
    print(f"  {r}")
