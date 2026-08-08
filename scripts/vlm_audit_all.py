#!/usr/bin/env python3
"""Run VLM audit on all page screenshots sequentially."""
import subprocess
import json
from pathlib import Path

PAGES = ["home", "services", "solutions", "cases", "contact", "about", "blog", "careers", "privacy", "terms"]
IMG_DIR = Path("/home/z/my-project/download/qa-pages")
OUT_DIR = Path("/home/z/my-project/download/qa-vlm")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPT = """Audit this page screenshot of ClickTake Technologies website. Be CONCISE (<120 words). Report in this exact format:

Design: [yes/no] dark futuristic with blue/pink/purple
Glass cards: [count or 'none']
Logo: [yes/no] visible in header
WhatsApp btn: [yes/no] floating green button bottom-right
Issues: [list any layout problems, broken images, empty icon boxes, large gaps, text overflow, or 'none']
Polish: [1-10 rating]
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
        print(f"[{page}] FAILED: {result.stderr[:200]}")
        continue
    try:
        data = json.loads(out.read_text())
        content = data["choices"][0]["message"]["content"]
        print(f"[{page}] OK\n{content}\n")
    except Exception as e:
        print(f"[{page}] PARSE ERROR: {e}")
        print(f"  stdout: {result.stdout[:300]}")
