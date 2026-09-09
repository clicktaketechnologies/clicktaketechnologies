#!/usr/bin/env python3
"""QA — Color palette consistency audit.
Flags hex colors in components that are OUTSIDE the v5 brand palette.

V5 brand palette (approved):
  Canvas dark : #03000D #070018 #0D0025 (body gradient stops)
  Canvas light: #FAFAFC #F8F6FC #F1EDF8 (light surfaces)
  Brand pink  : #FF53A9 #FF8AC4 #E0197A (primary/deep variants)
  Brand purple: #9B3DFF #B27CFF
  Brand blue  : #136DFF #4A90D9 #0E58D6
  Text dark   : #F4F0FF #F0EBF8 (on dark)
  Text light  : #0F172A #0A0612 #334155 #475569 (on light)
  Accents     : #10B981 (green) #F59E0B (amber) #22d3ee (cyan) #FFD782 (gold)
                #C2185B (accessible pink) #7B2FBE (purple deep) #dc2626 (destructive)
"""
import os, re
from collections import defaultdict

ROOT = "/home/z/my-project"
SRC = os.path.join(ROOT, "src")

APPROVED = {
    # dark canvas
    "03000D", "070018", "0D0025", "030014", "0A0A14", "050510", "050518",  # legacy variants tolerated in CSS catch rules
    # light canvas
    "FAFAFC", "F8F6FC", "F1EDF8", "FFFFFF", "ffffff", "E5E0EE", "CBD0E1",
    # pink family
    "FF53A9", "FF8AC4", "E0197A", "C2185B", "ff6bb5",
    # purple family
    "9B3DFF", "B27CFF", "7B2FBE", "c12bff", "d04bff",
    # blue family
    "136DFF", "4A90D9", "0E58D6", "4d8dff", "4be3ff", "22d3ee",
    # text
    "F4F0FF", "F0EBF8", "0F172A", "0A0612", "334155", "475569", "9B8AB8", "6E5F80", "4A3B5C",
    # accents
    "10B981", "F59E0B", "FFD782", "dc2626", "ef4444",
    # misc one-off approved
    "000000", "1E1640", "100820", "0A1124",
}

hex_re = re.compile(r"#([0-9a-fA-F]{6})\b")
off_palette = defaultdict(list)

for dirpath, dirnames, filenames in os.walk(SRC):
    for fn in filenames:
        if not fn.endswith((".tsx", ".ts")):
            continue
        path = os.path.join(dirpath, fn)
        rel = os.path.relpath(path, ROOT)
        if rel.startswith("src/app/admin"):  # admin has its own palette
            continue
        try:
            with open(path, encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except Exception:
            continue
        for m in hex_re.finditer(content):
            h = m.group(1).upper()
            if h not in APPROVED:
                line_no = content[:m.start()].count("\n") + 1
                line = content.splitlines()[line_no - 1].strip()[:110]
                off_palette[h].append((rel, line_no, line))

print("=" * 80)
print("OFF-PALETTE COLORS FOUND IN COMPONENTS")
print("=" * 80)
total = sum(len(v) for v in off_palette.values())
print(f"Unique off-palette hexes: {len(off_palette)}  |  total occurrences: {total}\n")
for h, occ in sorted(off_palette.items(), key=lambda x: -len(x[1])):
    print(f"  #{h}  ({len(occ)}×)")
    for rel, ln, line in occ[:3]:
        print(f"      ↳ {rel}:{ln}")
        print(f"          {line}")
    if len(occ) > 3:
        print(f"      … +{len(occ)-3} more")
