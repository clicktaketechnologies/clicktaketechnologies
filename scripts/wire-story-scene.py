#!/usr/bin/env python3
"""
Wire NxStoryScene into all remaining pages.

For each custom-hero page (uses Nx3DCharacter directly, not NxPageHero):
  - Add `import { NxStoryScene } from "../nx-story-scene";` if not present
  - Insert `<NxStoryScene variant="<variant>" />` immediately BEFORE the
    existing `<div className="pointer-events-none absolute right-0 ...">`
    block that wraps Nx3DCharacter.

For NxPageHero pages (cities-*):
  - Add `storyVariant="<variant>"` prop to the <NxPageHero ...> opening tag.
"""
import re
from pathlib import Path

# (file, storyVariant)
CUSTOM_HERO = [
    ("blog-page.tsx",          "blog"),
    ("blog-post-page.tsx",     "blog"),
    ("careers-page.tsx",       "careers"),
    ("case-studies-page.tsx",  "case-studies"),
    ("legal-page.tsx",         "default"),
    ("portfolio-page.tsx",     "portfolio"),
    ("pricing-page.tsx",       "pricing"),
    ("resources-page.tsx",     "resources"),
    ("service-detail-page.tsx","services"),
    ("solution-detail-page.tsx","solutions"),
    ("solutions-page.tsx",     "solutions"),
    ("team-page.tsx",          "team"),
]

PAGES_DIR = Path("/home/z/my-project/src/components/site/pages")

# Marker for the existing 3DCharacter wrapper div — used as insertion anchor.
ANCHOR = '<div className="pointer-events-none absolute right-0 top-24'

# Import line to add if missing.
IMPORT_LINE = 'import { NxStoryScene } from "../nx-story-scene";'

# Comment to insert above the new <NxStoryScene />
def make_insert(variant: str) -> str:
    return (
        f'{{/* Per-page 3D Story Scene — {variant} variant. Sits behind hero content. */}}\n'
        f'        <NxStoryScene variant="{variant}" />\n'
        f'        '
    )

def patch_custom_hero(path: Path, variant: str) -> str:
    src = path.read_text()
    orig = src

    # 1) Add import if not present.
    if "NxStoryScene" not in src:
        # Insert after the Nx3DCharacter import line (consistent location).
        m = re.search(r'^(import \{ Nx3DCharacter \} from "\.\./nx-3d-character";)\s*$', src, flags=re.MULTILINE)
        if m:
            src = src[:m.end()] + "\n" + IMPORT_LINE + src[m.end():]
        else:
            # Fallback: add after first nx-3d-scene import.
            m = re.search(r'^(import \{ Nx3DScene \} from "\.\./nx-3d-scene";)\s*$', src, flags=re.MULTILINE)
            if m:
                src = src[:m.end()] + "\n" + IMPORT_LINE + src[m.end():]
            else:
                return "FAIL: could not find import anchor"

    # 2) Insert <NxStoryScene .../> before the 3DCharacter wrapper div.
    #    Only insert once.
    if f'<NxStoryScene variant="{variant}" />' not in src:
        # The anchor appears once per file.
        idx = src.find(ANCHOR)
        if idx == -1:
            return "FAIL: could not find anchor"
        # Find start of the line (preserve indentation).
        line_start = src.rfind("\n", 0, idx) + 1
        indent = src[line_start:idx]
        # Build the new block with the same indent.
        block = (
            f"{{/* Per-page 3D Story Scene — {variant} variant. Sits behind hero content. */}}\n"
            f"{indent}<NxStoryScene variant=\"{variant}\" />\n"
            f"{indent}"
        )
        src = src[:line_start] + block + src[line_start:]

    if src == orig:
        return "NOOP"
    path.write_text(src)
    return "OK"

# ─── NxPageHero prop injection ───────────────────────────────────────────────
HERO_PROP_PAGES = [
    ("cities-index-page.tsx", "default"),
    ("city-hub-page.tsx",     "default"),
    ("city-service-page.tsx", "services"),
]

def patch_hero_prop(path: Path, variant: str) -> str:
    src = path.read_text()
    orig = src

    if "storyVariant" in src:
        return "NOOP (already has storyVariant)"

    # Find <NxPageHero ...> opening tag and inject storyVariant prop.
    # The opening tag ends with either '>' (self-style with children) or '/>' (rare).
    # We'll inject right before the first '>' that closes the opening tag.
    m = re.search(r'<NxPageHero\b([^>]*?)>', src, flags=re.DOTALL)
    if not m:
        return "FAIL: no <NxPageHero> tag"
    attrs = m.group(1)
    # Inject before the closing '>'. Preserve trailing whitespace/newline if any.
    new_attrs = attrs.rstrip()
    if new_attrs and not new_attrs.endswith("\n"):
        # Keep on same line if attrs are inline.
        new_attrs = new_attrs + f'\n        storyVariant="{variant}"\n      '
    else:
        new_attrs = new_attrs + f' storyVariant="{variant}"'
    new_tag = f"<NxPageHero{new_attrs}>"
    src = src[:m.start()] + new_tag + src[m.end():]

    if src == orig:
        return "NOOP"
    path.write_text(src)
    return "OK"


def main():
    print("=== Custom-hero pages ===")
    for fname, variant in CUSTOM_HERO:
        p = PAGES_DIR / fname
        if not p.exists():
            print(f"  {fname}: SKIP (file not found)")
            continue
        res = patch_custom_hero(p, variant)
        print(f"  {fname} [{variant}]: {res}")

    print("\n=== NxPageHero prop pages ===")
    for fname, variant in HERO_PROP_PAGES:
        p = PAGES_DIR / fname
        if not p.exists():
            print(f"  {fname}: SKIP (file not found)")
            continue
        res = patch_hero_prop(p, variant)
        print(f"  {fname} [{variant}]: {res}")


if __name__ == "__main__":
    main()
