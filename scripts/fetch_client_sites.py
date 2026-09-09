#!/usr/bin/env python3
"""
Robust fetcher for client sites using requests (with User-Agent).
Falls back gracefully — saves whatever we can get (title + meta + body text).
"""
import json
import re
import time
from pathlib import Path

try:
    import requests
except ImportError:
    import subprocess
    subprocess.run(["pip", "install", "-q", "requests"], check=True)
    import requests

OUT_DIR = Path("/home/z/my-project/download/client-sites")
OUT_DIR.mkdir(parents=True, exist_ok=True)

URLS = [
    ("dib-t0ug-onrender-com", "https://dib-t0ug.onrender.com/"),
    ("panel-clicktake-web-app", "https://panel-clicktake.web.app/"),
    ("logitrack-blzq-onrender-com", "https://logitrack-blzq.onrender.com"),
    ("clickopticx-onrender-com", "https://clickopticx.onrender.com"),
    ("mearnsgadgetrepair-co-uk", "https://www.mearnsgadgetrepair.co.uk"),
    ("gadgetdoctorls-co-uk", "https://www.gadgetdoctorls.co.uk"),
    ("gadgetrepairsglasgow-co-uk", "https://www.gadgetrepairsglasgow.co.uk"),
    ("nltceducation-web-app", "https://nltceducation.web.app/"),
    ("students-learning-hub-web-app", "https://students-learning-hub.web.app/"),
    ("slasa-co-uk", "https://www.slasa.co.uk"),
    ("techrepairsglasgow-co-uk", "https://www.techrepairsglasgow.co.uk"),
    ("clicktake-academy-web-app", "https://clicktake-academy.web.app/"),
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}

def extract(html: str, url: str) -> dict:
    title = ""
    m = re.search(r'<title[^>]*>([^<]+)</title>', html, re.I | re.S)
    if m:
        title = re.sub(r'\s+', ' ', m.group(1)).strip()[:200]
    desc = ""
    m = re.search(r'<meta\s+name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', html, re.I | re.S)
    if m:
        desc = re.sub(r'\s+', ' ', m.group(1)).strip()[:400]
    # Strip scripts/styles
    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S | re.I)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.S | re.I)
    text = re.sub(r'<noscript[^>]*>.*?</noscript>', '', text, flags=re.S | re.I)
    # Capture headings for structure
    headings = re.findall(r'<h[1-3][^>]*>([^<]+)</h[1-3]>', text, re.I)
    headings = [re.sub(r'\s+', ' ', h).strip()[:120] for h in headings if len(h.strip()) > 2]
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()[:6000]
    # Detect tech signals
    tech_signals = []
    html_lower = html.lower()
    if "wp-content" in html_lower or "wp-includes" in html_lower:
        tech_signals.append("WordPress")
    if "next.js" in html_lower or "_next/" in html_lower:
        tech_signals.append("Next.js")
    if "react" in html_lower:
        tech_signals.append("React")
    if "firebase" in html_lower or "web.app" in url:
        tech_signals.append("Firebase")
    if "stripe" in html_lower:
        tech_signals.append("Stripe")
    if "onrender.com" in url:
        tech_signals.append("Render")
    if "shopify" in html_lower:
        tech_signals.append("Shopify")
    if "woocommerce" in html_lower:
        tech_signals.append("WooCommerce")
    return {
        "url": url,
        "title": title,
        "description": desc,
        "headings": headings[:30],
        "text_excerpt": text,
        "tech_signals": tech_signals,
        "html_length": len(html),
    }


def fetch_one(slug: str, url: str) -> dict:
    out_file = OUT_DIR / f"{slug}.json"
    if out_file.exists() and out_file.stat().st_size > 1000:
        try:
            return json.loads(out_file.read_text())
        except Exception:
            pass
    try:
        r = requests.get(url, headers=HEADERS, timeout=30, allow_redirects=True, verify=True)
        if r.status_code == 200 and r.text:
            data = extract(r.text, url)
            out_file.write_text(json.dumps(data, indent=2))
            return data
        else:
            print(f"  ⚠ {slug}: HTTP {r.status_code}")
            # Save partial
            data = {"url": url, "title": "", "description": "", "headings": [], "text_excerpt": "", "tech_signals": [], "html_length": 0, "http_status": r.status_code}
            out_file.write_text(json.dumps(data, indent=2))
            return data
    except Exception as e:
        print(f"  ✗ {slug}: {e}")
        data = {"url": url, "title": "", "description": "", "headings": [], "text_excerpt": "", "tech_signals": [], "html_length": 0, "error": str(e)}
        out_file.write_text(json.dumps(data, indent=2))
        return data


print(f"Fetching {len(URLS)} client sites...")
results = []
for i, (slug, url) in enumerate(URLS, 1):
    print(f"[{i:2d}/{len(URLS)}] {slug:40s} ← {url}")
    data = fetch_one(slug, url)
    results.append({"slug": slug, **data})
    title = data.get("title", "")[:60]
    print(f"         title: {title!r}")
    time.sleep(1)  # be polite

# Save summary
Path("/home/z/my-project/download/client-sites-summary.json").write_text(json.dumps(results, indent=2))

print(f"\n=== SUMMARY ===")
for r in results:
    title = r.get("title", "")[:60] or "(no title)"
    tech = ", ".join(r.get("tech_signals", [])) or "—"
    print(f"  {r['slug']:40s} | {title:60s} | tech: {tech}")

print(f"\nSaved {len(results)} results to {OUT_DIR}")
