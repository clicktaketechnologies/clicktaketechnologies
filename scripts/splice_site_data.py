"""
Surgically replace BLOG_POSTS in src/lib/site-data.ts with the 9 real articles
from scripts/blog_articles_data.ts, and insert CLIENT_PORTFOLIO before CASE STUDIES.

Strategy:
1. Read src/lib/site-data.ts
2. Find the line `export const BLOG_POSTS: BlogPost[] = [` (start_marker)
3. Find the matching `];` line that closes BLOG_POSTS
4. Replace everything between (inclusive) with content from blog_articles_data.ts
5. Insert CLIENT_PORTFOLIO block (from portfolio_data.ts) BEFORE the `// ─── CASE STUDIES ───` marker
"""
import os
import re

SITE_DATA = "/home/z/my-project/src/lib/site-data.ts"
BLOG_TS = "/home/z/my-project/scripts/blog_articles_data.ts"
PORTFOLIO_TS = "/home/z/my-project/scripts/portfolio_data.ts"

with open(SITE_DATA) as f:
    src = f.readlines()

with open(BLOG_TS) as f:
    blog_block = f.read().strip()

with open(PORTFOLIO_TS) as f:
    portfolio_block = f.read().strip()

# Find BLOG_POSTS start
start_idx = None
for i, line in enumerate(src):
    if line.startswith("export const BLOG_POSTS: BlogPost[] = ["):
        start_idx = i
        break
assert start_idx is not None, "Could not find BLOG_POSTS start"

# Find matching close `];` (first one at column 0 after start)
end_idx = None
for j in range(start_idx + 1, len(src)):
    if src[j].rstrip() == "];":
        end_idx = j
        break
assert end_idx is not None, "Could not find BLOG_POSTS end"

print(f"BLOG_POSTS span: lines {start_idx+1}–{end_idx+1} ({end_idx - start_idx + 1} lines)")

# Find CASE STUDIES marker (after end_idx)
case_marker_idx = None
for j in range(end_idx + 1, len(src)):
    if "// ─── CASE STUDIES" in src[j]:
        case_marker_idx = j
        break
assert case_marker_idx is not None, "Could not find CASE STUDIES marker"

# Rebuild the file
new_src = []
new_src.extend(src[:start_idx])  # everything up to (not incl) BLOG_POSTS line
new_src.append(blog_block + "\n\n")  # new BLOG_POSTS (already includes `];`)
new_src.append(portfolio_block + "\n\n")  # CLIENT_PORTFOLIO
new_src.extend(src[case_marker_idx:])  # CASE STUDIES onwards (preserves comment marker)

with open(SITE_DATA, "w") as f:
    f.writelines(new_src)

print(f"Wrote {SITE_DATA}")
print(f"New size: {os.path.getsize(SITE_DATA)} bytes ({len(new_src)} lines)")
