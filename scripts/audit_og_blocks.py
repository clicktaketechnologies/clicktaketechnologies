#!/usr/bin/env python3
"""
Find all page.tsx files that have an `openGraph:` block in their metadata.
These are the files that need FIX-3a (add og:image) and possibly FIX-3b (add og:url).
"""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/src/app")

results = []

for page_file in sorted(SRC.rglob("page.tsx")):
    text = page_file.read_text()
    if "openGraph" not in text:
        continue

    # Find all openGraph blocks (could be multiple)
    # Look for `openGraph: {` patterns
    og_blocks = []
    for m in re.finditer(r'openGraph:\s*\{', text):
        # Find the matching closing brace
        start = m.end() - 1
        depth = 1
        i = m.end()
        while i < len(text) and depth > 0:
            if text[i] == '{':
                depth += 1
            elif text[i] == '}':
                depth -= 1
            i += 1
        block = text[m.start():i]
        og_blocks.append(block)

    for i, block in enumerate(og_blocks):
        has_image = "images:" in block or "og:image" in block
        has_url = "url:" in block
        has_site_name = "siteName:" in block
        results.append({
            "file": str(page_file.relative_to(SRC.parent)),
            "block_index": i,
            "has_image": has_image,
            "has_url": has_url,
            "has_site_name": has_site_name,
            "block_preview": block[:200],
        })

# Summary
print(f"Total page.tsx files with openGraph blocks: {len(set(r['file'] for r in results))}")
print(f"Total openGraph blocks: {len(results)}")
print()

missing_image = [r for r in results if not r["has_image"]]
missing_url = [r for r in results if not r["has_url"]]
print(f"Blocks MISSING og:image: {len(missing_image)}")
print(f"Blocks MISSING og:url: {len(missing_url)}")
print()

print("=" * 70)
print("FILES NEEDING FIX-3a (missing og:image)")
print("=" * 70)
for r in missing_image:
    print(f"  {r['file']} (block #{r['block_index']})")

print()
print("=" * 70)
print("FILES NEEDING FIX-3b (missing og:url)")
print("=" * 70)
for r in missing_url:
    print(f"  {r['file']} (block #{r['block_index']})")

import json
Path("/home/z/my-project/download/og_audit.json").write_text(
    json.dumps(results, indent=2)
)
print(f"\nFull JSON: /home/z/my-project/download/og_audit.json")
