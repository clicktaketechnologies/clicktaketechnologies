***REMOVED***!/usr/bin/env python3
"""
FIX-1: Purge dead /blog/ and /case-studies/ links from hub-spoke-map.ts.

Strategy:
1. Read site-data.ts and extract all valid BLOG_POSTS slugs and CASE_STUDIES slugs.
2. Read hub-spoke-map.ts.
3. Find every href that starts with /blog/ or /case-studies/.
4. If the slug is NOT in the valid set, mark it for removal.
5. Remove the entire entry (object property) that contains the dead href.
6. Write the cleaned file back.
7. Report what was removed.

We need to be careful with TypeScript object literal syntax — entries can span
multiple lines and may have trailing commas. We'll use a regex-based approach
that targets the `resources` arrays specifically (where /blog/ and /case-studies/
links live), since that's where the audit found them.
"""

import re
from pathlib import Path

HUB_SPOKE_PATH = Path("/home/z/my-project/src/lib/seo/hub-spoke-map.ts")
SITE_DATA_PATH = Path("/home/z/my-project/src/lib/site-data.ts")

***REMOVED*** ── Step 1: Extract valid slugs from site-data.ts ──────────────────────
site_data = SITE_DATA_PATH.read_text()

***REMOVED*** BLOG_POSTS slugs — match slug: "..." inside the BLOG_POSTS array
***REMOVED*** The BLOG_POSTS array uses objects with `slug: "..."` fields
blog_posts_match = re.search(r"BLOG_POSTS[^=]*=\s*\[(.*?)\n\];", site_data, re.DOTALL)
if blog_posts_match:
    blog_block = blog_posts_match.group(1)
    blog_slugs = set(re.findall(r'slug:\s*["\']([^"\']+)["\']', blog_block))
else:
    print("WARNING: Could not find BLOG_POSTS array")
    blog_slugs = set()

***REMOVED*** CASE_STUDIES slugs
case_studies_match = re.search(r"CASE_STUDIES[^=]*=\s*\[(.*?)\n\];", site_data, re.DOTALL)
if case_studies_match:
    cs_block = case_studies_match.group(1)
    case_study_slugs = set(re.findall(r'slug:\s*["\']([^"\']+)["\']', cs_block))
else:
    print("WARNING: Could not find CASE_STUDIES array")
    case_study_slugs = set()

print(f"Valid BLOG_POSTS slugs ({len(blog_slugs)}): {sorted(blog_slugs)}")
print(f"Valid CASE_STUDIES slugs ({len(case_study_slugs)}): {sorted(case_study_slugs)}")
print()

***REMOVED*** ── Step 2: Read hub-spoke-map.ts ──────────────────────────────────────
content = HUB_SPOKE_PATH.read_text()
original_len = len(content)

***REMOVED*** ── Step 3: Find all /blog/ and /case-studies/ hrefs and classify ─────
all_blog_hrefs = set(re.findall(r'/blog/([a-z0-9-]+)', content))
all_cs_hrefs = set(re.findall(r'/case-studies/([a-z0-9-]+)', content))

dead_blog = all_blog_hrefs - blog_slugs
dead_cs = all_cs_hrefs - case_study_slugs

print(f"Dead /blog/ slugs referenced ({len(dead_blog)}): {sorted(dead_blog)}")
print(f"Dead /case-studies/ slugs referenced ({len(dead_cs)}): {sorted(dead_cs)}")
print()

***REMOVED*** ── Step 4: Remove dead entries ────────────────────────────────────────
***REMOVED*** Entries in hub-spoke-map.ts look like:
***REMOVED***   { label: "...", href: "/blog/some-slug", description: "..." },
***REMOVED*** We need to remove entries where href is /blog/<dead-slug> or /case-studies/<dead-slug>

removed_count = 0
new_content = content

for slug in dead_blog:
    ***REMOVED*** Match an object literal entry containing href: "/blog/<slug>"
    ***REMOVED*** Be flexible with whitespace, quote style, property order
    pattern = re.compile(
        r'\s*\{[^{}]*?href:\s*["\']/blog/' + re.escape(slug) + r'["\'][^{}]*?\},?\n?',
        re.DOTALL
    )
    matches = pattern.findall(new_content)
    if matches:
        removed_count += len(matches)
        new_content = pattern.sub('', new_content)
        print(f"  Removed {len(matches)} entr{('y' if len(matches)==1 else 'ies')} for dead /blog/{slug}")

for slug in dead_cs:
    pattern = re.compile(
        r'\s*\{[^{}]*?href:\s*["\']/case-studies/' + re.escape(slug) + r'["\'][^{}]*?\},?\n?',
        re.DOTALL
    )
    matches = pattern.findall(new_content)
    if matches:
        removed_count += len(matches)
        new_content = pattern.sub('', new_content)
        print(f"  Removed {len(matches)} entr{('y' if len(matches)==1 else 'ies')} for dead /case-studies/{slug}")

print()
print(f"Total entries removed: {removed_count}")
print(f"File size: {original_len} -> {len(new_content)} bytes (-{original_len - len(new_content)})")

***REMOVED*** ── Step 5: Clean up empty resource categories ─────────────────────────
***REMOVED*** After removal, some `resources: { blogs: [], caseStudies: [] }` arrays may be empty.
***REMOVED*** Leave them — empty arrays are valid and the consumer handles them.
***REMOVED*** But clean up dangling commas like `[{...},]` -> `[{...}]`
new_content = re.sub(r',(\s*\])', r'\1', new_content)
new_content = re.sub(r',(\s*\})', r'\1', new_content)

***REMOVED*** ── Step 6: Verify no dead links remain ────────────────────────────────
remaining_blog = set(re.findall(r'/blog/([a-z0-9-]+)', new_content))
remaining_cs = set(re.findall(r'/case-studies/([a-z0-9-]+)', new_content))
remaining_dead_blog = remaining_blog - blog_slugs
remaining_dead_cs = remaining_cs - case_study_slugs

if remaining_dead_blog or remaining_dead_cs:
    print()
    print("WARNING: Some dead links remain (entry format may differ from regex):")
    if remaining_dead_blog:
        print(f"  /blog/ still dead: {sorted(remaining_dead_blog)}")
    if remaining_dead_cs:
        print(f"  /case-studies/ still dead: {sorted(remaining_dead_cs)}")
else:
    print()
    print("✓ All dead /blog/ and /case-studies/ links successfully removed.")

***REMOVED*** ── Step 7: Write back ─────────────────────────────────────────────────
HUB_SPOKE_PATH.write_text(new_content)
print(f"\n✓ Wrote cleaned file to {HUB_SPOKE_PATH}")
