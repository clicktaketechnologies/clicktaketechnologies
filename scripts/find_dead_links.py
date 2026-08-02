#!/usr/bin/env python3
"""
Cross-reference every /blog/, /case-studies/, /careers/, /resources/ href in
hub-spoke-map.ts against the actual slugs exported from site-data.ts.

Outputs:
  - Console: dead links grouped by category
  - JSON: /home/z/my-project/download/dead_links.json
"""
import re
import json
from pathlib import Path

SRC = Path("/home/z/my-project/src")
HUB = SRC / "lib/seo/hub-spoke-map.ts"
SITE_DATA = SRC / "lib/site-data.ts"

hub_text = HUB.read_text()
site_text = SITE_DATA.read_text()

# Extract all slugs from hub-spoke-map.ts grouped by route prefix
dead_by_pattern = {"blog": [], "case-studies": [], "careers": [], "resources": []}
all_hrefs = []
for m in re.finditer(r'href:\s*"/(blog|case-studies|careers|resources)/([a-z0-9-]+)"', hub_text):
    prefix, slug = m.group(1), m.group(2)
    # Capture line for context
    line_start = hub_text.rfind("\n", 0, m.start()) + 1
    line_end = hub_text.find("\n", m.end())
    line = hub_text[line_start:line_end].strip()
    all_hrefs.append({"prefix": prefix, "slug": slug, "line": line})
    # We'll mark as "potentially dead" and verify next
    dead_by_pattern[prefix].append(slug)

# Extract actual slugs from site-data.ts
# BLOG_POSTS — find export, then slugs
def extract_slugs_in_export(text, export_name, start_offset=0):
    pat = rf'export\s+const\s+{export_name}\b'
    m = re.search(pat, text[start_offset:])
    if not m:
        return []
    start = start_offset + m.end()
    # Find next "export const" to bound the array
    nxt = re.search(r'\nexport\s+const\s+', text[start:])
    end = start + (nxt.start() if nxt else len(text) - start)
    block = text[start:end]
    return re.findall(r'slug:\s*["\x27]([a-z0-9/-]+)["\x27]', block)

blog_slugs = set(extract_slugs_in_export(site_text, "BLOG_POSTS"))
case_slugs = set(extract_slugs_in_export(site_text, "CASE_STUDIES"))
career_slugs = set(extract_slugs_in_export(site_text, "CAREER_ROLES"))
resource_slugs = set(extract_slugs_in_export(site_text, "RESOURCES"))

print(f"Static data counts:")
print(f"  BLOG_POSTS: {len(blog_slugs)} slugs")
print(f"  CASE_STUDIES: {len(case_slugs)} slugs")
print(f"  CAREER_ROLES: {len(career_slugs)} slugs")
print(f"  RESOURCES: {len(resource_slugs)} slugs")
print()

# Now check each href in hub-spoke-map.ts
dead = {"blog": [], "case-studies": [], "careers": [], "resources": []}
alive = {"blog": [], "case-studies": [], "careers": [], "resources": []}
for h in all_hrefs:
    prefix, slug = h["prefix"], h["slug"]
    if prefix == "blog":
        target = blog_slugs
    elif prefix == "case-studies":
        target = case_slugs
    elif prefix == "careers":
        target = career_slugs
    elif prefix == "resources":
        target = resource_slugs
    if slug in target:
        alive[prefix].append(h)
    else:
        dead[prefix].append(h)

# Dedupe by slug
def dedupe(items):
    seen = set()
    out = []
    for it in items:
        if it["slug"] not in seen:
            seen.add(it["slug"])
            out.append(it)
    return out

print("=" * 70)
print("DEAD LINKS in hub-spoke-map.ts (slug not in static data)")
print("=" * 70)
total_dead = 0
for prefix in ["blog", "case-studies", "careers", "resources"]:
    deduped = dedupe(dead[prefix])
    total_dead += len(deduped)
    print(f"\n--- /{prefix}/ ({len(deduped)} distinct dead slugs, {len(dead[prefix])} total occurrences) ---")
    for d in deduped:
        print(f"  /{prefix}/{d['slug']}")

print()
print("=" * 70)
print(f"TOTAL distinct dead links: {total_dead}")
print("=" * 70)

# Save the full list with line context for the edit
out = {
    "dead_links": {
        prefix: [{"slug": d["slug"], "line": d["line"]} for d in dedupe(dead[prefix])]
        for prefix in ["blog", "case-studies", "careers", "resources"]
    },
    "alive_counts": {p: len(dedupe(alive[p])) for p in ["blog","case-studies","careers","resources"]},
}
Path("/home/z/my-project/download/dead_links.json").write_text(json.dumps(out, indent=2))
print(f"\nJSON saved: /home/z/my-project/download/dead_links.json")
