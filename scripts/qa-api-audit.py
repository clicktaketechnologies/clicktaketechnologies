***REMOVED***!/usr/bin/env python3
"""QA — verify all /api/* fetch targets in client code have corresponding route.ts files"""
import os, re

ROOT = "/home/z/my-project"
SRC = os.path.join(ROOT, "src")

***REMOVED*** 1. Collect actual API route files
api_routes = set()
api_dir = os.path.join(SRC, "app", "api")
for dirpath, dirnames, filenames in os.walk(api_dir):
    if "route.ts" not in filenames:
        continue
    rel = os.path.relpath(dirpath, api_dir)
    parts = [] if rel == "." else rel.split(os.sep)
    ***REMOVED*** Convert [id] -> *
    pattern = "/api/" + "/".join("*" if re.fullmatch(r"\[.+\]", p) else p for p in parts)
    api_routes.add(pattern.rstrip("/"))

***REMOVED*** 2. Extract fetch/axios targets from client code
fetch_re = re.compile(r'''["'`](/api/[^"'`\s]*)["'`]''')
used = {}
for dirpath, dirnames, filenames in os.walk(SRC):
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
        for m in fetch_re.finditer(content):
            ep = m.group(1).split("?")[0]
            used.setdefault(ep, set()).add(rel)

def matches(endpoint):
    e = endpoint.rstrip("/")
    if e in api_routes:
        return True
    for r in api_routes:
        r_parts = r.split("/")
        e_parts = e.split("/")
        if len(r_parts) != len(e_parts):
            continue
        if all(rp == "*" or rp == ep_ for rp, ep_ in zip(r_parts, e_parts)):
            return True
    return False

missing = []
for ep, files in sorted(used.items()):
    if not matches(ep):
        missing.append((ep, sorted(files)[:2]))

print("=" * 70)
print(f"API ENDPOINTS REFERENCED: {len(used)}   |   MISSING ROUTE FILES: {len(missing)}")
print("=" * 70)
for ep, files in missing:
    print(f"  ✗ {ep}")
    for f in files:
        print(f"      ↳ {f}")
print()
print(f"Actual API routes on disk: {len(api_routes)}")
