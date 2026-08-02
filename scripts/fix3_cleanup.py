#!/usr/bin/env python3
"""
Fix two issues from the FIX-3 script:
1. `images: [DEFAULT_OG_IMAGE],title:` → add newline (14 files)
2. `{TITLE}` / `{DESC}` placeholders in legal pages → replace with real values
"""
import re
from pathlib import Path

SRC = Path("/home/z/my-project/src/app")

# Issue 1: Fix merged-line formatting
# Pattern: `images: [DEFAULT_OG_IMAGE],title:` → `images: [DEFAULT_OG_IMAGE],\n    title:`
# Need to detect the indentation level
fixed_formatting = 0
for page_file in SRC.rglob("page.tsx"):
    text = page_file.read_text()
    if "images: [DEFAULT_OG_IMAGE],title:" not in text:
        continue
    # Replace `images: [DEFAULT_OG_IMAGE],title:` with `images: [DEFAULT_OG_IMAGE],\n    title:`
    # But preserve the original indentation (4 or 6 spaces typically)
    def fix_line(m):
        indent = "    "  # default
        # Try to detect from context — look at the line before
        return f"images: [DEFAULT_OG_IMAGE],\n{indent}title:"

    new_text = re.sub(
        r'images: \[DEFAULT_OG_IMAGE\],title:',
        lambda m: f'images: [DEFAULT_OG_IMAGE],\n    title:',
        text
    )
    if new_text != text:
        page_file.write_text(new_text)
        fixed_formatting += 1
        print(f"  ✓ Fixed formatting: {page_file.relative_to(SRC)}")

print(f"\nFixed formatting in {fixed_formatting} files")

# Issue 2: Replace {TITLE} and {DESC} in legal pages
LEGAL_FIXES = {
    "legal/privacy/page.tsx": {
        "title": "Privacy Policy",
        "description": "Read the privacy policy and data protection terms for ClickTake Technologies. Learn how we handle your business information.",
    },
    "legal/terms/page.tsx": {
        "title": "Terms of Service",
        "description": "Review the Terms of Service and contract parameters for working with ClickTake Technologies Ltd.",
    },
    "legal/cookies/page.tsx": {
        "title": "Cookie Policy",
        "description": "How ClickTake Technologies uses cookies and similar technologies on our website, and how you can control them.",
    },
}

fixed_placeholders = 0
for rel_path, values in LEGAL_FIXES.items():
    fpath = SRC / rel_path
    text = fpath.read_text()
    if "{TITLE}" not in text and "{DESC}" not in text:
        continue
    text = text.replace('"{{TITLE}}"', f'"{values["title"]}"')
    text = text.replace('"{{DESC}}"', f'"{values["description"]}"')
    # Also handle the case where placeholders weren't wrapped in quotes
    text = text.replace("{TITLE}", values["title"])
    text = text.replace("{DESC}", values["description"])
    fpath.write_text(text)
    fixed_placeholders += 1
    print(f"  ✓ Fixed placeholders: {rel_path}")

print(f"\nFixed placeholders in {fixed_placeholders} files")
