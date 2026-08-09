#!/usr/bin/env python3
"""
VLM (AI vision) audit on all screenshots.
Uses z-ai vision CLI to inspect each page screenshot for:
- Visual rendering issues (broken layout, missing content, white space)
- Design system compliance (glassmorphism, dark theme, brand colors)
- Bug detection (overlap, overflow, missing elements)
"""
import subprocess
import json
import sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

SCREENSHOT_DIR = Path("/home/z/my-project/download/qa-v6-pages")
OUTPUT_DIR = Path("/home/z/my-project/download/qa-vlm-v6")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPT = """You are a QA auditor for a futuristic dark-themed website (ClickTake Technologies).
Inspect this screenshot of a single page from the site. The design uses:
- Dark background (#03000D / #070018 / #0D0025)
- Glassmorphism cards (translucent + backdrop-blur + gradient border)
- Blue (#136DFF), Pink (#FF53A9), Purple (#7B2FBE) accents
- Floating WhatsApp button (green) at bottom-right
- Top navigation with brand logo + nav links

Evaluate:
1. Visual rendering (1-10): Is the layout intact? Any broken/missing/overlapping content?
2. Design system compliance (1-10): Does it use the dark glassmorphism style?
3. Bug detection (1-10): Any visible bugs (overflow, white screens, empty sections)?
4. Content visibility (1-10): Are headings, cards, and CTAs visible?

Return JSON only: {"visual": N, "design": N, "bugs": N, "content": N, "issues": ["brief issue 1", "brief issue 2"], "summary": "one line"}
If all scores are 9-10 and no issues, return {"visual": 10, "design": 10, "bugs": 10, "content": 10, "issues": [], "summary": "Clean render, no issues"}
"""

def audit_one(screenshot: Path) -> dict:
    page = screenshot.stem.replace("page-", "")
    out_file = OUTPUT_DIR / f"{page}.json"
    if out_file.exists() and out_file.stat().st_size > 100:
        try:
            return {"page": page, "result": json.loads(out_file.read_text())}
        except Exception:
            pass  # re-run
    try:
        result = subprocess.run(
            ["z-ai", "vision", "--prompt", PROMPT, "--image", str(screenshot), "--output", str(out_file)],
            capture_output=True, text=True, timeout=90
        )
        if out_file.exists():
            try:
                data = json.loads(out_file.read_text())
                # Try to extract the actual JSON from response
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                # Find JSON object in content
                import re
                m = re.search(r'\{.*\}', content, re.S)
                if m:
                    parsed = json.loads(m.group(0))
                    return {"page": page, "result": parsed}
                return {"page": page, "result": {"raw": content[:500]}}
            except Exception as e:
                return {"page": page, "result": {"error": f"parse error: {e}"}}
        return {"page": page, "result": {"error": result.stderr[:200] or "no output"}}
    except subprocess.TimeoutExpired:
        return {"page": page, "result": {"error": "timeout"}}
    except Exception as e:
        return {"page": page, "result": {"error": str(e)}}

screenshots = sorted(SCREENSHOT_DIR.glob("page-*.png"))
print(f"Auditing {len(screenshots)} screenshots with VLM...")

results = []
# Run 5 in parallel for speed
with ThreadPoolExecutor(max_workers=5) as ex:
    futures = {ex.submit(audit_one, s): s for s in screenshots}
    for i, fut in enumerate(as_completed(futures), 1):
        r = fut.result()
        results.append(r)
        res = r.get("result", {})
        if "visual" in res:
            v = res.get("visual", "?")
            d = res.get("design", "?")
            b = res.get("bugs", "?")
            c = res.get("content", "?")
            n_issues = len(res.get("issues", []))
            print(f"[{i}/{len(screenshots)}] {r['page']:50s} | V:{v} D:{d} B:{b} C:{c} | issues: {n_issues}")
        else:
            print(f"[{i}/{len(screenshots)}] {r['page']:50s} | ERROR: {str(res)[:100]}")

# Summary
print("\n" + "=" * 80)
print("VLM AUDIT SUMMARY")
print("=" * 80)

scored = [r for r in results if "visual" in r.get("result", {})]
errors = [r for r in results if "visual" not in r.get("result", {})]
print(f"  Total screenshots: {len(results)}")
print(f"  Successfully scored: {len(scored)}")
print(f"  Errors: {len(errors)}")

if scored:
    avg_visual = sum(r["result"].get("visual", 0) for r in scored) / len(scored)
    avg_design = sum(r["result"].get("design", 0) for r in scored) / len(scored)
    avg_bugs = sum(r["result"].get("bugs", 0) for r in scored) / len(scored)
    avg_content = sum(r["result"].get("content", 0) for r in scored) / len(scored)
    print(f"\n  Average visual score:   {avg_visual:.1f}/10")
    print(f"  Average design score:   {avg_design:.1f}/10")
    print(f"  Average bugs score:     {avg_bugs:.1f}/10")
    print(f"  Average content score:  {avg_content:.1f}/10")
    print(f"  Overall average:        {(avg_visual+avg_design+avg_bugs+avg_content)/4:.1f}/10")
    
    # Pages with issues
    with_issues = [r for r in scored if r["result"].get("issues")]
    if with_issues:
        print(f"\n  Pages with issues: {len(with_issues)}")
        for r in with_issues:
            issues = r["result"]["issues"]
            print(f"    {r['page']}: {issues}")
    else:
        print(f"\n  ✅ NO ISSUES FOUND — all {len(scored)} pages scored clean.")

# Save consolidated report
report = {
    "total": len(results),
    "scored": len(scored),
    "errors": len(errors),
    "results": results,
}
if scored:
    report["avg_visual"] = avg_visual
    report["avg_design"] = avg_design
    report["avg_bugs"] = avg_bugs
    report["avg_content"] = avg_content
    report["overall_avg"] = (avg_visual + avg_design + avg_bugs + avg_content) / 4

Path("/home/z/my-project/download/qa-vlm-v6-summary.json").write_text(json.dumps(report, indent=2))
print(f"\n  Consolidated report: /home/z/my-project/download/qa-vlm-v6-summary.json")
