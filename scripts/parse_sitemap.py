#!/usr/bin/env python3
"""Parse the uploaded sitemap.xml and categorize all URLs."""
import re
from collections import defaultdict
from urllib.parse import urlparse
from pathlib import Path

SRC = Path("/home/z/my-project/upload/sitemap.xml").read_text(encoding="utf-8")

# Extract all URLs
urls = re.findall(r'<loc>([^<]+)</loc>', SRC)
print(f"Total URLs in sitemap: {len(urls)}")
print()

# Categorize by path depth and prefix
categories = defaultdict(list)
for url in urls:
    path = urlparse(url).path.strip('/')
    if not path:
        cat = "root"
    elif path == "sitemap.xml" or path == "rss.xml" or path == "llms.txt" or path == "robots.txt":
        cat = "meta"
    else:
        # First path segment
        parts = path.split('/')
        cat = parts[0]
    categories[cat].append(url)

# Print categories summary
print("=" * 80)
print("CATEGORIES SUMMARY")
print("=" * 80)
for cat in sorted(categories.keys(), key=lambda c: -len(categories[c])):
    print(f"  {cat:30s} {len(categories[cat]):4d} URLs")

print()
print("=" * 80)
print("URLS BY CATEGORY (first 5 per category)")
print("=" * 80)
for cat in sorted(categories.keys()):
    print(f"\n--- {cat} ({len(categories[cat])}) ---")
    for url in categories[cat][:5]:
        print(f"  {url}")
    if len(categories[cat]) > 5:
        print(f"  ... and {len(categories[cat]) - 5} more")

# Save full list
out = Path("/home/z/my-project/download/sitemap-analysis.txt")
with out.open("w") as f:
    f.write(f"Total URLs: {len(urls)}\n\n")
    for cat in sorted(categories.keys()):
        f.write(f"\n=== {cat} ({len(categories[cat])}) ===\n")
        for url in categories[cat]:
            f.write(f"  {url}\n")
print(f"\nFull analysis saved to: {out}")
