***REMOVED***!/usr/bin/env python3
"""
Verify candidate replacement colors against their target backgrounds.
Goal: pick replacements that pass AA (4.5:1) for normal text on every surface
where the token is actually used.
"""
from contrast_audit import contrast, parse_color, alpha_blend, grade

CANDIDATES = [
    ***REMOVED*** (label, fg_hex, [bg_hex, ...])
    ("Pink ***REMOVED***FF53A9 (current) on white", "***REMOVED***FF53A9", ["***REMOVED***ffffff", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("Pink ***REMOVED***E0197A (deep) on white", "***REMOVED***E0197A", ["***REMOVED***ffffff", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("Pink ***REMOVED***D81B73 on white", "***REMOVED***D81B73", ["***REMOVED***ffffff", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("Pink ***REMOVED***C2185B on white", "***REMOVED***C2185B", ["***REMOVED***ffffff", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("White on Pink ***REMOVED***FF53A9 (current)", "***REMOVED***ffffff", ["***REMOVED***FF53A9"]),
    ("White on Pink ***REMOVED***E0197A (deep)", "***REMOVED***ffffff", ["***REMOVED***E0197A"]),
    ("White on Pink ***REMOVED***D81B73", "***REMOVED***ffffff", ["***REMOVED***D81B73"]),
    ("White on Pink ***REMOVED***C2185B", "***REMOVED***ffffff", ["***REMOVED***C2185B"]),
    ("Muted-fg ***REMOVED***64748b on ***REMOVED***f1f5f9 (current light)", "***REMOVED***64748b", ["***REMOVED***f1f5f9", "***REMOVED***ffffff"]),
    ("Muted-fg ***REMOVED***475569 on ***REMOVED***f1f5f9 (proposed)", "***REMOVED***475569", ["***REMOVED***f1f5f9", "***REMOVED***ffffff"]),
    ("Muted-fg ***REMOVED***334155 on ***REMOVED***f1f5f9 (proposed)", "***REMOVED***334155", ["***REMOVED***f1f5f9", "***REMOVED***ffffff"]),
    ("Dark muted-fg ***REMOVED***7A6B95 on ***REMOVED***03000D (current dark)", "***REMOVED***7A6B95", ["***REMOVED***03000D", "***REMOVED***0D0025", "***REMOVED***070018"]),
    ("Dark muted-fg ***REMOVED***9B8AB8 on dark (proposed)", "***REMOVED***9B8AB8", ["***REMOVED***03000D", "***REMOVED***0D0025", "***REMOVED***070018"]),
    ("Dark muted-fg ***REMOVED***A89DC2 on dark (proposed)", "***REMOVED***A89DC2", ["***REMOVED***03000D", "***REMOVED***0D0025", "***REMOVED***070018"]),
    ("nx-ink-muted ***REMOVED***8C7B95 on light surfaces (current)", "***REMOVED***8C7B95", ["***REMOVED***FFFFFF", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("nx-ink-muted ***REMOVED***6E5F80 on light surfaces (proposed)", "***REMOVED***6E5F80", ["***REMOVED***FFFFFF", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("nx-ink-muted ***REMOVED***5C4F70 on light surfaces (proposed)", "***REMOVED***5C4F70", ["***REMOVED***FFFFFF", "***REMOVED***F8F6FC", "***REMOVED***F1EDF8"]),
    ("nx-brand-blue-deep ***REMOVED***0E58D6 on dark (current)", "***REMOVED***0E58D6", ["***REMOVED***100820", "***REMOVED***16102A", "***REMOVED***1E1640"]),
    ("nx-brand-blue-soft ***REMOVED***4A90D9 on dark (proposed)", "***REMOVED***4A90D9", ["***REMOVED***100820", "***REMOVED***16102A", "***REMOVED***1E1640"]),
    ("nx-brand-blue-deep ***REMOVED***0E58D6 on light", "***REMOVED***0E58D6", ["***REMOVED***FFFFFF", "***REMOVED***F8F6FC"]),
    ("nx-brand-purple ***REMOVED***9B3DFF on dark (current)", "***REMOVED***9B3DFF", ["***REMOVED***100820", "***REMOVED***16102A", "***REMOVED***1E1640"]),
    ("nx-brand-purple ***REMOVED***B27CFF on dark (proposed)", "***REMOVED***B27CFF", ["***REMOVED***100820", "***REMOVED***16102A", "***REMOVED***1E1640"]),
    ("nx-brand-purple ***REMOVED***9B3DFF on light", "***REMOVED***9B3DFF", ["***REMOVED***FFFFFF", "***REMOVED***F8F6FC"]),
    ("destructive ***REMOVED***ef4444 on white (current)", "***REMOVED***ef4444", ["***REMOVED***ffffff"]),
    ("destructive ***REMOVED***dc2626 on white (proposed)", "***REMOVED***dc2626", ["***REMOVED***ffffff"]),
    ("destructive ***REMOVED***b91c1c on white (proposed)", "***REMOVED***b91c1c", ["***REMOVED***ffffff"]),
    ("nx-brand-pink-deep ***REMOVED***E0197A on dark (current)", "***REMOVED***E0197A", ["***REMOVED***100820", "***REMOVED***16102A"]),
    ("nx-brand-pink ***REMOVED***FF53A9 on dark (proposed)", "***REMOVED***FF53A9", ["***REMOVED***100820", "***REMOVED***16102A"]),
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
