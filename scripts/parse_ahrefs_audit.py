#!/usr/bin/env python3
"""
Parse Ahrefs Site Audit CSV exports and produce a structured summary.
Outputs:
  - Console: severity-grouped issue list with affected-page counts + sample URLs
  - JSON: full parsed data saved to /home/z/my-project/download/audit_summary.json
"""
import csv
import json
import os
from collections import Counter, defaultdict
from pathlib import Path

UPLOAD_DIR = Path("/home/z/my-project/upload")
OUT_JSON = Path("/home/z/my-project/download/audit_summary.json")

# Map filename -> (severity, issue_name, kind)
# kind: "pages" = list of affected URLs, "links" = source->target link list
FILES = {
    "Error-404_page.csv": ("Error", "404 page", "pages"),
    "Error-404_page-links.csv": ("Error", "404 page", "links"),
    "Error-4XX_page.csv": ("Error", "4XX page (non-404)", "pages"),
    "Error-4XX_page-links.csv": ("Error", "4XX page (non-404)", "links"),
    "Error-indexable-Orphan_page_(has_no_incoming_internal_links).csv":
        ("Error", "Orphan page (no incoming internal links)", "pages"),
    "Error-indexable-Page_has_links_to_broken_page.csv":
        ("Error", "Indexable page links to broken page", "links"),
    "Warning-Open_Graph_tags_incomplete.csv":
        ("Warning", "Open Graph tags incomplete", "pages"),
    "Warning-Open_Graph_URL_not_matching_canonical.csv":
        ("Warning", "Open Graph URL not matching canonical", "pages"),
    "Notice-indexable-Page_has_only_one_dofollow_incoming_internal_link.csv":
        ("Notice", "Indexable page has only 1 dofollow incoming internal link", "pages"),
    "Notice-indexable-Page_has_only_one_dofollow_incoming_internal_link-links.csv":
        ("Notice", "Indexable page has only 1 dofollow incoming internal link", "links"),
}

SEVERITY_ORDER = {"Error": 0, "Warning": 1, "Notice": 2}

def read_csv(path: Path):
    with open(path, newline="", encoding="utf-8") as f:
        # Ahrefs exports sometimes have a leading BOM
        reader = csv.DictReader(f)
        rows = list(reader)
    return reader.fieldnames or [], rows

def detect_url_field(fieldnames):
    """Pick the most likely URL column."""
    candidates = [
        "URL", "Url", "url",
        "Page URL", "Page", "Target URL", "Target",
        "Broken URL", "Source URL", "Referring page",
    ]
    for c in candidates:
        if c in fieldnames:
            return c
    # Fallback: first field containing 'url' (case-insensitive)
    for c in fieldnames:
        if "url" in c.lower():
            return c
    return fieldnames[0] if fieldnames else None

def main():
    summary = {
        "project": "clicktaketech.com (Ahrefs Site Audit)",
        "files_parsed": [],
        "issues": [],
    }
    console_lines = []
    console_lines.append("=" * 78)
    console_lines.append("AHREFS SITE AUDIT — ISSUE SUMMARY")
    console_lines.append("=" * 78)

    # Group by severity
    by_severity = defaultdict(list)

    for fname, (sev, issue_name, kind) in FILES.items():
        fpath = UPLOAD_DIR / fname
        if not fpath.exists():
            console_lines.append(f"[MISS] {fname} not found")
            continue
        fieldnames, rows = read_csv(fpath)
        url_field = detect_url_field(fieldnames)

        # Distinct affected URLs (for "pages" kind) or distinct targets (for "links")
        if kind == "pages":
            affected_urls = sorted({r.get(url_field, "").strip() for r in rows if r.get(url_field, "").strip()})
            sample = affected_urls[:8]
            by_severity[sev].append({
                "issue": issue_name,
                "file": fname,
                "affected_count": len(affected_urls),
                "sample_urls": sample,
                "all_urls": affected_urls,
                "kind": "pages",
                "fields": fieldnames,
            })
            summary["files_parsed"].append({
                "file": fname,
                "severity": sev,
                "issue": issue_name,
                "rows": len(rows),
                "affected_count": len(affected_urls),
                "url_field": url_field,
            })
        else:  # links
            # For "links" files, count referring pages and broken targets
            src_field = None
            tgt_field = None
            for c in fieldnames:
                lc = c.lower()
                if "referring" in lc or "source" in lc:
                    src_field = src_field or c
                if "target" in lc or "broken" in lc or "destination" in lc:
                    tgt_field = tgt_field or c
            if not src_field:
                src_field = fieldnames[0] if fieldnames else None
            if not tgt_field:
                tgt_field = fieldnames[1] if len(fieldnames) > 1 else src_field

            sources = sorted({r.get(src_field, "").strip() for r in rows if r.get(src_field, "").strip()})
            targets = sorted({r.get(tgt_field, "").strip() for r in rows if r.get(tgt_field, "").strip()})
            by_severity[sev].append({
                "issue": issue_name + " (link sources)",
                "file": fname,
                "affected_count": len(sources),
                "sample_urls": sources[:8],
                "all_urls": sources,
                "kind": "links-sources",
                "broken_targets": targets[:20],
                "broken_targets_count": len(targets),
                "fields": fieldnames,
            })
            summary["files_parsed"].append({
                "file": fname,
                "severity": sev,
                "issue": issue_name + " (link sources)",
                "rows": len(rows),
                "affected_count": len(sources),
                "broken_targets_count": len(targets),
                "src_field": src_field,
                "tgt_field": tgt_field,
            })

    # Print grouped by severity
    total_pages_affected = 0
    for sev in ["Error", "Warning", "Notice"]:
        if sev not in by_severity:
            continue
        console_lines.append("")
        console_lines.append(f"### {sev.upper()} ({len(by_severity[sev])} issue type(s))")
        console_lines.append("-" * 78)
        for entry in by_severity[sev]:
            console_lines.append(
                f"  • {entry['issue']}: {entry['affected_count']} affected"
            )
            if entry["kind"] == "links-sources" and entry.get("broken_targets_count"):
                console_lines.append(
                    f"      └─ broken targets: {entry['broken_targets_count']} distinct"
                )
            for u in entry["sample_urls"][:5]:
                console_lines.append(f"      - {u}")
            if entry["affected_count"] > 5:
                console_lines.append(f"      ... (+{entry['affected_count'] - 5} more)")
            total_pages_affected += entry["affected_count"]
            summary["issues"].append({
                "severity": sev,
                "issue": entry["issue"],
                "affected_count": entry["affected_count"],
                "file": entry["file"],
                "kind": entry["kind"],
                "sample_urls": entry["sample_urls"][:5],
                "broken_targets_count": entry.get("broken_targets_count"),
            })

    console_lines.append("")
    console_lines.append("=" * 78)
    console_lines.append(f"TOTAL issue-page pairs across all severities: {total_pages_affected}")
    console_lines.append("=" * 78)

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)

    print("\n".join(console_lines))
    print(f"\nFull JSON summary saved to: {OUT_JSON}")

if __name__ == "__main__":
    main()
