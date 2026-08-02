#!/usr/bin/env python3
"""
FIX-1: Remove dead /blog/ and /case-studies/ links from hub-spoke-map.ts.

Strategy:
  1. Load dead slugs from dead_links.json
  2. Read hub-spoke-map.ts line by line
  3. Remove any line containing a dead href (each entry is single-line)
  4. Collapse resulting empty arrays:
       blogs: [
       ],
     → blogs: [],
  5. Write back
  6. Print before/after stats
"""
import json
import re
from pathlib import Path

HUB = Path("/home/z/my-project/src/lib/seo/hub-spoke-map.ts")
DEAD = json.loads(Path("/home/z/my-project/download/dead_links.json").read_text())

# Build a set of dead href strings to match
dead_hrefs = set()
for prefix, items in DEAD["dead_links"].items():
    for it in items:
        dead_hrefs.add(f'/{prefix}/{it["slug"]}')

print(f"Dead hrefs to remove: {len(dead_hrefs)}")

# Read file
original = HUB.read_text()
original_lines = original.splitlines(keepends=True)

# Step 1: Remove lines containing dead hrefs
removed_count = 0
kept_lines = []
for line in original_lines:
    # Skip lines that contain a dead href
    if any(href in line for href in dead_hrefs):
        removed_count += 1
        continue
    kept_lines.append(line)

print(f"Lines removed: {removed_count}")

# Step 2: Collapse empty arrays
# Pattern: "blogs: [" followed by only whitespace/newlines then "]"
# Multi-line regex: blogs:\s*\[\s*\]
new_text = "".join(kept_lines)

# Collapse empty arrays for blogs and caseStudies
# Match: blogs: [\n      ]  →  blogs: []
def collapse_empty_array(text, key):
    # Pattern: key: [ optional-whitespace-only ]
    pat = rf'({key}):\s*\[\s*\]'
    return re.sub(pat, r'\1: []', text)

before_blogs = len(re.findall(r'blogs:\s*\[\s*\]', new_text))
before_cases = len(re.findall(r'caseStudies:\s*\[\s*\]', new_text))
new_text = collapse_empty_array(new_text, "blogs")
new_text = collapse_empty_array(new_text, "caseStudies")

# Also clean up: if resources: { blogs: [], caseStudies: [], pricing: [...] }
# is fine as-is — empty arrays are valid TS and the component handles them.

# Step 3: Write back
HUB.write_text(new_text)

# Stats
after_lines = new_text.splitlines()
print(f"Original lines: {len(original_lines)}")
print(f"New lines: {len(after_lines)}")
print(f"Collapsed empty blogs arrays: {before_blogs}")
print(f"Collapsed empty caseStudies arrays: {before_cases}")

# Verify: re-scan for any remaining dead hrefs
remaining = [href for href in dead_hrefs if href in new_text]
print(f"\nRemaining dead hrefs in file: {len(remaining)}")
for r in remaining[:10]:
    print(f"  STILL PRESENT: {r}")

# Verify: count remaining /blog/ and /case-studies/ hrefs
remaining_blog = len(re.findall(r'href:\s*"/blog/', new_text))
remaining_case = len(re.findall(r'href:\s*"/case-studies/', new_text))
print(f"\nRemaining /blog/ hrefs in hub-spoke-map.ts: {remaining_blog}")
print(f"Remaining /case-studies/ hrefs in hub-spoke-map.ts: {remaining_case}")

print("\n✅ FIX-1 complete.")
