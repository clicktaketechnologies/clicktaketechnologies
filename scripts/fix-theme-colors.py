#!/usr/bin/env python3
"""
Replace dark-only color classes with theme-aware equivalents across all
site components. The patterns replaced:

  border-white/10            → ct-divider (border-color)
  border-white/5             → ct-divider
  border-white/15            → ct-divider
  border-white/20            → ct-divider
  border-white/[0.05]        → ct-divider
  border-white/[0.08]        → ct-divider
  border-white/[0.1]         → ct-divider

  bg-white/[0.02]            → ct-surface
  bg-white/[0.03]            → ct-surface
  bg-white/[0.04]            → ct-surface
  bg-white/[0.05]            → ct-surface
  bg-white/[0.06]            → ct-surface
  bg-white/5                 → ct-surface
  bg-white/10                → ct-surface
  bg-white/15                → ct-surface

  hover:bg-white/5           → ct-hover
  hover:bg-white/[0.05]      → ct-hover
  hover:bg-white/[0.06]      → ct-hover
  hover:bg-white/10          → ct-hover

  bg-white/[0.02] px-3 py-2.5  → ct-surface px-3 py-2.5 (combined with above)

We deliberately do NOT touch:
  text-white on gradient-bg buttons (those stay white because the bg is always brand-colored)
  bg-white/30 (loading shimmer — stays translucent white on dark gradient)
  bg-black/30 backdrop-blur (overlay tints — those are intentional dark overlays)
  bg-white hover:text-black (intentional icon-flip pattern)
"""
import re
import sys
from pathlib import Path

ROOT = Path("/home/z/my-project/src/components/site")

# Order matters: more specific patterns first
# Use lookarounds instead of \b because [ is not a word char
W = r'(?<![\w-])'  # left boundary
E = r'(?![\w-])'   # right boundary

PATTERNS = [
    # hover:bg-white variants (must come before plain bg-white)
    (re.compile(W + r'hover:bg-white/\[0\.06\]' + E), 'ct-hover'),
    (re.compile(W + r'hover:bg-white/\[0\.05\]' + E), 'ct-hover'),
    (re.compile(W + r'hover:bg-white/10' + E),        'ct-hover'),
    (re.compile(W + r'hover:bg-white/5' + E),         'ct-hover'),

    # bg-white variants (translucent surface tints)
    (re.compile(W + r'bg-white/\[0\.02\]' + E), 'ct-surface'),
    (re.compile(W + r'bg-white/\[0\.03\]' + E), 'ct-surface'),
    (re.compile(W + r'bg-white/\[0\.04\]' + E), 'ct-surface'),
    (re.compile(W + r'bg-white/\[0\.05\]' + E), 'ct-surface'),
    (re.compile(W + r'bg-white/\[0\.06\]' + E), 'ct-surface'),
    (re.compile(W + r'bg-white/5' + E),         'ct-surface'),
    (re.compile(W + r'bg-white/10' + E),        'ct-surface'),
    (re.compile(W + r'bg-white/15' + E),        'ct-surface'),

    # border-white variants
    (re.compile(W + r'border-white/\[0\.05\]' + E), 'ct-divider'),
    (re.compile(W + r'border-white/\[0\.08\]' + E), 'ct-divider'),
    (re.compile(W + r'border-white/\[0\.1\]' + E),  'ct-divider'),
    (re.compile(W + r'border-white/5' + E),         'ct-divider'),
    (re.compile(W + r'border-white/10' + E),        'ct-divider'),
    (re.compile(W + r'border-white/15' + E),        'ct-divider'),
    (re.compile(W + r'border-white/20' + E),        'ct-divider'),
]

SKIP_FILES = []  # add filenames here if they should not be touched

def transform(text: str) -> tuple[str, int]:
    """Apply all patterns. Returns (new_text, num_replacements)."""
    total = 0
    for pat, repl in PATTERNS:
        text, n = pat.subn(repl, text)
        total += n
    return text, total

def main():
    grand_total = 0
    file_count = 0
    for f in sorted(ROOT.rglob("*.tsx")):
        if f.name in SKIP_FILES:
            continue
        orig = f.read_text(encoding="utf-8")
        new, n = transform(orig)
        if n > 0:
            f.write_text(new, encoding="utf-8")
            print(f"  {n:4d} replacements in {f.relative_to(ROOT)}")
            grand_total += n
            file_count += 1
    print(f"\nDone: {grand_total} replacements across {file_count} files.")

if __name__ == "__main__":
    main()
