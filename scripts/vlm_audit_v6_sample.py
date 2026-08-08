#!/usr/bin/env python3
"""
Sample VLM audit — runs serially (1 at a time) on 15 representative pages.
Picks pages from each category to ensure full coverage.
"""
import subprocess
import json
import re
import time
from pathlib import Path

SCREENSHOT_DIR = Path("/home/z/my-project/download/qa-v6-pages")
OUTPUT_DIR = Path("/home/z/my-project/download/qa-vlm-v6")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 15 representative pages covering every category
SAMPLES = [
    "home", "services", "solutions", "cases", "contact",
    "about", "blog", "careers", "privacy", "terms",
    "portfolio", "pricing", "team", "cities", "cookies",
    "services-seo", "services-ai-llm", "services-web-ecommerce",
    "solutions-startups", "case-studies-seo-growth-sme",
    "blog-case-study-lumen-commerce-3x-revenue",
    "careers-senior-nextjs-engineer",
    "resources-ai-adoption-playbook-2026",
    "city-birmingham",
]

PROMPT = """You are a QA auditor for a futuristic dark-themed website (ClickTake Technologies).
Inspect this screenshot. The design uses dark background (#03000D), glassmorphism cards, blue/pink/purple accents, floating WhatsApp button, top nav with brand logo.

Rate 1-10 each: visual (layout intact?), design (dark glass style?), bugs (any visible issues?), content (headings/cards/CTAs visible?).
Return JSON only: {"visual": N, "design": N, "bugs": N, "content": N, "issues": ["..."], "summary": "one line"}
"""

def audit_one(page: str) -> dict:
    out_file = OUTPUT_DIR / f"{page}.json"
    screenshot = SCREENSHOT_DIR / f"page-{page}.png"
    if not screenshot.exists():
        return {"page": page, "error": "screenshot missing"}
    if out_file.exists() and out_file.stat().st_size > 200:
        try:
            data = json.loads(out_file.read_text())
            content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            m = re.search(r'\{.*\}', content, re.S)
            if m:
                return {"page": page, "result": json.loads(m.group(0))}
        except Exception:
            pass
    # Run serially
    try:
        result = subprocess.run(
            ["z-ai", "vision", "--prompt", PROMPT, "--image", str(screenshot), "--output", str(out_file)],
            capture_output=True, text=True, timeout=120
        )
        if out_file.exists() and out_file.stat().st_size > 200:
            try:
                data = json.loads(out_file.read_text())
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                m = re.search(r'\{.*\}', content, re.S)
                if m:
                    return {"page": page, "result": json.loads(m.group(0))}
            except Exception as e:
                return {"page": page, "error": f"parse: {e}"}
        return {"page": page, "error": result.stderr[:200] or "no output"}
    except subprocess.TimeoutExpired:
        return {"page": page, "error": "timeout"}
    except Exception as e:
        return {"page": page, "error": str(e)}

print(f"VLM-auditing {len(SAMPLES)} representative pages (serial)...")
results = []
for i, page in enumerate(SAMPLES, 1):
    r = audit_one(page)
    results.append(r)
    if "result" in r:
        res = r["result"]
        v = res.get("visual", "?")
        d = res.get("design", "?")
        b = res.get("bugs", "?")
        c = res.get("content", "?")
        n_issues = len(res.get("issues", []))
        print(f"[{i:2d}/{len(SAMPLES)}] {page:50s} | V:{v} D:{d} B:{b} C:{c} | issues: {n_issues}")
    else:
        print(f"[{i:2d}/{len(SAMPLES)}] {page:50s} | ERROR: {str(r.get('error',''))[:80]}")
    time.sleep(2)  # be polite to the API

# Summary
print("\n" + "=" * 80)
print("VLM SAMPLE AUDIT SUMMARY")
print("=" * 80)

scored = [r for r in results if "result" in r]
errors = [r for r in results if "result" not in r]
print(f"  Total: {len(results)} | Scored: {len(scored)} | Errors: {len(errors)}")

if scored:
    avg_v = sum(r["result"].get("visual", 0) for r in scored) / len(scored)
    avg_d = sum(r["result"].get("design", 0) for r in scored) / len(scored)
    avg_b = sum(r["result"].get("bugs", 0) for r in scored) / len(scored)
    avg_c = sum(r["result"].get("content", 0) for r in scored) / len(scored)
    print(f"  Avg visual: {avg_v:.1f} | design: {avg_d:.1f} | bugs: {avg_b:.1f} | content: {avg_c:.1f}")
    print(f"  Overall: {(avg_v+avg_d+avg_b+avg_c)/4:.1f}/10")
    
    with_issues = [r for r in scored if r["result"].get("issues")]
    if with_issues:
        print(f"\n  Pages with issues ({len(with_issues)}):")
        for r in with_issues:
            print(f"    {r['page']}: {r['result']['issues']}")
    else:
        print(f"\n  ✅ ALL {len(scored)} PAGES CLEAN.")

Path("/home/z/my-project/download/qa-vlm-v6-sample-summary.json").write_text(json.dumps(results, indent=2))
