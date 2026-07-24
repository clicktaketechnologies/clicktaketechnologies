#!/usr/bin/env python3
"""
Verify candidate replacement colors against their target backgrounds.
Goal: pick replacements that pass AA (4.5:1) for normal text on every surface
where the token is actually used.
"""
from contrast_audit import contrast, parse_color, alpha_blend, grade

CANDIDATES = [
    # (label, fg_hex, [bg_hex, ...])
    ("Pink #FF53A9 (current) on white", "#FF53A9", ["#ffffff", "#F8F6FC", "#F1EDF8"]),
    ("Pink #E0197A (deep) on white", "#E0197A", ["#ffffff", "#F8F6FC", "#F1EDF8"]),
    ("Pink #D81B73 on white", "#D81B73", ["#ffffff", "#F8F6FC", "#F1EDF8"]),
    ("Pink #C2185B on white", "#C2185B", ["#ffffff", "#F8F6FC", "#F1EDF8"]),
    ("White on Pink #FF53A9 (current)", "#ffffff", ["#FF53A9"]),
    ("White on Pink #E0197A (deep)", "#ffffff", ["#E0197A"]),
    ("White on Pink #D81B73", "#ffffff", ["#D81B73"]),
    ("White on Pink #C2185B", "#ffffff", ["#C2185B"]),
    ("Muted-fg #64748b on #f1f5f9 (current light)", "#64748b", ["#f1f5f9", "#ffffff"]),
    ("Muted-fg #475569 on #f1f5f9 (proposed)", "#475569", ["#f1f5f9", "#ffffff"]),
    ("Muted-fg #334155 on #f1f5f9 (proposed)", "#334155", ["#f1f5f9", "#ffffff"]),
    ("Dark muted-fg #7A6B95 on #03000D (current dark)", "#7A6B95", ["#03000D", "#0D0025", "#070018"]),
    ("Dark muted-fg #9B8AB8 on dark (proposed)", "#9B8AB8", ["#03000D", "#0D0025", "#070018"]),
    ("Dark muted-fg #A89DC2 on dark (proposed)", "#A89DC2", ["#03000D", "#0D0025", "#070018"]),
    ("nx-ink-muted #8C7B95 on light surfaces (current)", "#8C7B95", ["#FFFFFF", "#F8F6FC", "#F1EDF8"]),
    ("nx-ink-muted #6E5F80 on light surfaces (proposed)", "#6E5F80", ["#FFFFFF", "#F8F6FC", "#F1EDF8"]),
    ("nx-ink-muted #5C4F70 on light surfaces (proposed)", "#5C4F70", ["#FFFFFF", "#F8F6FC", "#F1EDF8"]),
    ("nx-brand-blue-deep #0E58D6 on dark (current)", "#0E58D6", ["#100820", "#16102A", "#1E1640"]),
    ("nx-brand-blue-soft #4A90D9 on dark (proposed)", "#4A90D9", ["#100820", "#16102A", "#1E1640"]),
    ("nx-brand-blue-deep #0E58D6 on light", "#0E58D6", ["#FFFFFF", "#F8F6FC"]),
    ("nx-brand-purple #9B3DFF on dark (current)", "#9B3DFF", ["#100820", "#16102A", "#1E1640"]),
    ("nx-brand-purple #B27CFF on dark (proposed)", "#B27CFF", ["#100820", "#16102A", "#1E1640"]),
    ("nx-brand-purple #9B3DFF on light", "#9B3DFF", ["#FFFFFF", "#F8F6FC"]),
    ("destructive #ef4444 on white (current)", "#ef4444", ["#ffffff"]),
    ("destructive #dc2626 on white (proposed)", "#dc2626", ["#ffffff"]),
    ("destructive #b91c1c on white (proposed)", "#b91c1c", ["#ffffff"]),
    ("nx-brand-pink-deep #E0197A on dark (current)", "#E0197A", ["#100820", "#16102A"]),
    ("nx-brand-pink #FF53A9 on dark (proposed)", "#FF53A9", ["#100820", "#16102A"]),
]

for label, fg_hex, bgs in CANDIDATES:
    print(f"\n{label}")
    fg = parse_color(fg_hex)
    for bg_hex in bgs:
        bg = parse_color(bg_hex)
        fg_c = alpha_blend(fg, bg) if len(fg) == 4 else fg[:3]
        r = contrast(fg_c, bg[:3])
        g = grade(r)
        print(f"   on {bg_hex:<10}  ratio={r:5.2f}  {g}")
