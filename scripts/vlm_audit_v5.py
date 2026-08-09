#!/usr/bin/env python3
"""VLM audit on the 16 sampled v5 pages."""
import subprocess
import json
from pathlib import Path

PAGES = ["home", "portfolio", "pricing", "team", "resources", "cities", "cookies",
         "services-seo", "services-ai-llm", "services-web-ecommerce",
         "solutions-startups", "case-studies-seo-growth-sme",
         "blog-case-study-lumen-commerce-3x-revenue",
         "careers-senior-nextjs-engineer",
         "resources-ai-adoption-playbook-2026",
         "city-birmingham"]
IMG_DIR = Path("/home/z/my-project/download/qa-v5-pages")
OUT_DIR = Path("/home/z/my-project/download/qa-vlm-v5")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPT = """Audit this ClickTake Technologies page screenshot. CONCISE (<100 words). Format:
Design: [yes/no] dark futuristic with blue/pink/purple
Glass cards: [count]
Logo: [yes/no] in header
WhatsApp btn: [yes/no] floating bottom-right
Breadcrumb: [yes/no] visible at top
Issues: [list any layout issues, broken icons, empty sections, or 'none']
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
        print(f"[{page}] FAILED: {result.stderr[:200]}")
        continue
    try:
        data = json.loads(out.read_text())
        content = data["choices"][0]["message"]["content"]
        print(f"[{page}] OK\n{content}\n")
    except Exception as e:
        print(f"[{page}] PARSE ERROR: {e}")
