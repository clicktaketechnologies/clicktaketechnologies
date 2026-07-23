#!/usr/bin/env python3
"""Audit title lengths and duplicate suffix patterns across sitemap URLs."""
import re
import subprocess
import sys
from pathlib import Path

SITEMAP = Path("/home/z/my-project/audit/sitemap.xml")
URLS_FILE = Path("/home/z/my-project/audit/all_urls.txt")

def main():
    urls = [line.strip() for line in URLS_FILE.read_text().splitlines() if line.strip()]
    rows = []
    for url in urls:
        try:
            html = subprocess.run(
                ["curl", "-sS", "-L", url],
                capture_output=True, text=True, timeout=20
            ).stdout
        except subprocess.TimeoutExpired:
            rows.append((url, "(timeout)", 0, False, 0, 0))
            continue

        m = re.search(r"<title[^>]*>([^<]*)</title>", html)
        title = m.group(1) if m else "(no title)"
        title_len = len(title)

        m = re.search(r'<meta name="description" content="([^"]*)"', html)
        desc = m.group(1) if m else ""
        desc_len = len(desc)

        has_dup = "| ClickTake Technologies | ClickTake Technologies" in title
        rows.append((url, title, title_len, has_dup, desc_len, len(html)))

    print(f"\n{'URL':<60} {'T':>3} {'D':>4} {'DUP':>3} {'H':>6}")
    print("-" * 90)
    for url, title, tlen, dup, dlen, hsize in rows:
        flag = "DUP" if dup else ""
        print(f"{url:<60} {tlen:>3} {dlen:>4} {flag:>3} {hsize:>6}")

    print()
    print("=== Summary ===")
    print(f"Total URLs: {len(rows)}")
    print(f"Duplicate suffix titles: {sum(1 for r in rows if r[3])}")
    print(f"Titles >60 chars:        {sum(1 for r in rows if r[2] > 60)}")
    print(f"Titles >70 chars:        {sum(1 for r in rows if r[2] > 70)}")
    print(f"Titles <=50 chars:       {sum(1 for r in rows if r[2] <= 50)}")
    print(f"Descs >160 chars:        {sum(1 for r in rows if r[4] > 160)}")
    print(f"Descs >200 chars:        {sum(1 for r in rows if r[4] > 200)}")
    print(f"Missing titles:          {sum(1 for r in rows if r[1] == '(no title)')}")
    print(f"Missing descs:           {sum(1 for r in rows if r[4] == 0)}")
    print()
    print("=== Examples of duplicate suffix ===")
    for url, title, tlen, dup, _, _ in rows:
        if dup:
            print(f"  {url}")
            print(f"    -> {title}")

if __name__ == "__main__":
    main()
