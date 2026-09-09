#!/usr/bin/env python3
"""VLM audit on the 4 blog-related pages: blog listing + 3 real articles."""
import subprocess
import json
from pathlib import Path

PAGES = [
    "blog",
    "blog-7-best-ai-chatbots-for-capturing-website-leads-2026",
    "blog-next-js-pagespeed-optimisation-how-to-hit-90-scores",
    "blog-seo-audit-checklist-25-steps-to-rank-higher-in-2026",
]
IMG_DIR = Path("/home/z/my-project/download/qa-v5-blog-pages")
OUT_DIR = Path("/home/z/my-project/download/qa-vlm-blog")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPT = """Audit this ClickTake Technologies blog page screenshot. CONCISE (<120 words). Format:
Page type: [blog listing OR blog article]
Design: [yes/no] dark futuristic with blue/pink/purple brand palette
Glass cards: [count visible]
Hero image: [yes/no/not applicable] rendered cleanly
Article title: [yes/no] clearly visible
Article body: [yes/no] readable prose with proper headings and paragraphs
Code block: [yes/no/not applicable] rendered with dark background if present
Table: [yes/no/not applicable] rendered with styled header if present
Lists: [yes/no/not applicable] properly styled if present
Logo: [yes/no] in header
WhatsApp btn: [yes/no] floating bottom-right
Breadcrumb: [yes/no] visible at top
Issues: [list any layout issues, broken images, empty sections, raw HTML leaking, or 'none']
Polish: [1-10]
Summary: [one sentence]"""

for page in PAGES:
    img = IMG_DIR / f"page-{page}.png"
    out = OUT_DIR / f"{page}.json"
    if not img.exists():
        print(f"[{page}] MISSING screenshot")
        continue
    print(f"[{page}] analyzing...", flush=True)
    result = subprocess.run(
        ["z-ai", "vision", "-p", PROMPT, "-i", str(img), "-o", str(out)],
        capture_output=True, text=True, timeout=90
    )
    if result.returncode != 0:
        print(f"[{page}] FAILED: {result.stderr[:300]}")
        continue
    try:
        data = json.loads(out.read_text())
        content = data["choices"][0]["message"]["content"]
        print(f"[{page}] OK\n{content}\n")
    except Exception as e:
        print(f"[{page}] PARSE ERROR: {e}")
