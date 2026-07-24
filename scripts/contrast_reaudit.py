***REMOVED***!/usr/bin/env python3
"""
Re-run the WCAG contrast audit against the NEW (post-fix) token values
to confirm everything passes AA.
"""
from contrast_audit import contrast, parse_color, alpha_blend, grade

LIGHT = {
    "background": "***REMOVED***ffffff",
    "foreground": "***REMOVED***0a0e1a",
    "card": "***REMOVED***ffffff",
    "card-foreground": "***REMOVED***0a0e1a",
    "popover": "***REMOVED***ffffff",
    "popover-foreground": "***REMOVED***0a0e1a",
    "primary": "***REMOVED***136DFF",
    "primary-foreground": "***REMOVED***ffffff",
    "secondary": "***REMOVED***f1f5f9",
    "secondary-foreground": "***REMOVED***0a0e1a",
    "muted": "***REMOVED***f1f5f9",
    "muted-foreground": "***REMOVED***475569",     ***REMOVED*** ← NEW
    "accent": "***REMOVED***C2185B",                ***REMOVED*** ← NEW
    "accent-foreground": "***REMOVED***ffffff",
    "destructive": "***REMOVED***dc2626",           ***REMOVED*** ← NEW
    "border": "***REMOVED***e2e8f0",
    "input": "***REMOVED***e2e8f0",
    "ring": "***REMOVED***136DFF",
    "sidebar": "***REMOVED***ffffff",
    "sidebar-foreground": "***REMOVED***0a0e1a",
    "sidebar-primary": "***REMOVED***136DFF",
    "sidebar-primary-foreground": "***REMOVED***ffffff",
    "sidebar-accent": "***REMOVED***f1f5f9",
    "sidebar-accent-foreground": "***REMOVED***0a0e1a",
    "brand": "***REMOVED***136DFF",
    "brand-foreground": "***REMOVED***ffffff",
    "brand-accent": "***REMOVED***C2185B",          ***REMOVED*** ← NEW
    "brand-accent-foreground": "***REMOVED***ffffff",
    "brand-pink": "***REMOVED***FF53A9",
    "brand-blue": "***REMOVED***136DFF",
    "nx-surface": "***REMOVED***FFFFFF",
    "nx-surface-alt": "***REMOVED***F8F6FC",
    "nx-surface-muted": "***REMOVED***F1EDF8",
    "nx-border": "***REMOVED***E5E0EE",
    "nx-ink": "***REMOVED***0A0612",
    "nx-ink-soft": "***REMOVED***4A3B5C",
    "nx-ink-muted": "***REMOVED***6E5F80",          ***REMOVED*** ← NEW
    "nx-brand-pink": "***REMOVED***FF53A9",
    "nx-brand-pink-soft": "***REMOVED***FF8AC4",
    "nx-brand-pink-deep": "***REMOVED***E0197A",
    "nx-brand-blue": "***REMOVED***136DFF",
    "nx-brand-blue-soft": "***REMOVED***4A90D9",
    "nx-brand-blue-deep": "***REMOVED***0E58D6",
    "nx-brand-purple": "***REMOVED***9B3DFF",
}

DARK = {
    "background": "***REMOVED***03000D",
    "foreground": "***REMOVED***F0EBF8",
    "card": "***REMOVED***0D0025",
    "card-foreground": "***REMOVED***F0EBF8",
    "popover": "***REMOVED***0D0025",
    "popover-foreground": "***REMOVED***F0EBF8",
    "primary": "***REMOVED***136DFF",
    "primary-foreground": "***REMOVED***ffffff",
    "secondary": "***REMOVED***070018",
    "secondary-foreground": "***REMOVED***F0EBF8",
    "muted": "***REMOVED***070018",
    "muted-foreground": "***REMOVED***9B8AB8",      ***REMOVED*** ← NEW
    "accent": "***REMOVED***E0197A",                 ***REMOVED*** ← NEW
    "accent-foreground": "***REMOVED***ffffff",
    "destructive": "***REMOVED***ef4444",
    "border": "rgba(240, 235, 248, 0.10)",
    "input": "rgba(240, 235, 248, 0.12)",
    "ring": "***REMOVED***4A90D9",
    "sidebar": "***REMOVED***0D0025",
    "sidebar-foreground": "***REMOVED***F0EBF8",
    "sidebar-primary": "***REMOVED***136DFF",
    "sidebar-primary-foreground": "***REMOVED***ffffff",
    "sidebar-accent": "***REMOVED***070018",
    "sidebar-accent-foreground": "***REMOVED***F0EBF8",
    "brand": "***REMOVED***136DFF",
    "brand-foreground": "***REMOVED***ffffff",
    "brand-accent": "***REMOVED***E0197A",           ***REMOVED*** ← NEW
    "brand-accent-foreground": "***REMOVED***ffffff",
    "brand-pink": "***REMOVED***ff6bb5",
    "brand-blue": "***REMOVED***4d8dff",
    "ct-pink": "***REMOVED***E0197A",
    "ct-purple": "***REMOVED***7B2FBE",
    "ct-blue": "***REMOVED***4A90D9",
    "ct-text": "***REMOVED***F0EBF8",
    "ct-muted": "***REMOVED***7A6B95",               ***REMOVED*** decorative only
    "nx-surface": "***REMOVED***100820",
    "nx-surface-alt": "***REMOVED***16102A",
    "nx-surface-muted": "***REMOVED***1E1640",
    "nx-border": "rgba(255, 255, 255, 0.08)",
    "nx-ink": "***REMOVED***F4F0FF",
    "nx-ink-soft": "***REMOVED***B5A8C8",
    "nx-ink-muted": "***REMOVED***9B8AB8",           ***REMOVED*** ← NEW
    "nx-brand-pink": "***REMOVED***FF53A9",
    "nx-brand-pink-soft": "***REMOVED***FF8AC4",
    "nx-brand-pink-deep": "***REMOVED***FF53A9",     ***REMOVED*** ← NEW (dark override)
    "nx-brand-blue": "***REMOVED***136DFF",
    "nx-brand-blue-soft": "***REMOVED***4A90D9",
    "nx-brand-blue-deep": "***REMOVED***4A90D9",     ***REMOVED*** ← NEW (dark override)
    "nx-brand-purple": "***REMOVED***B27CFF",        ***REMOVED*** ← NEW (dark override)
}

PAIRS = [
    ("foreground", "background", "body text"),
    ("foreground", "card", "card body"),
    ("foreground", "secondary", "secondary surface text"),
    ("foreground", "muted", "muted surface text"),
    ("muted-foreground", "background", "muted body"),
    ("muted-foreground", "card", "muted on card"),
    ("muted-foreground", "muted", "muted on muted"),
    ("muted-foreground", "secondary", "muted on secondary"),
    ("primary", "background", "primary text on bg"),
    ("primary", "card", "primary text on card"),
    ("accent", "background", "accent text on bg"),
    ("accent", "card", "accent text on card"),
    ("brand", "background", "brand link"),
    ("brand", "card", "brand link on card"),
    ("brand-accent", "background", "brand-accent link"),
    ("primary-foreground", "primary", "text on primary button"),
    ("accent-foreground", "accent", "text on accent button"),
    ("brand-foreground", "brand", "text on brand button"),
    ("brand-accent-foreground", "brand-accent", "text on brand-accent button"),
    ("sidebar-foreground", "sidebar", "sidebar body"),
    ("sidebar-accent-foreground", "sidebar-accent", "sidebar hover"),
    ("nx-ink", "nx-surface", "nx body"),
    ("nx-ink", "nx-surface-alt", "nx body alt"),
    ("nx-ink-soft", "nx-surface", "nx soft body"),
    ("nx-ink-soft", "nx-surface-alt", "nx soft body alt"),
    ("nx-ink-muted", "nx-surface", "nx muted"),
    ("nx-ink-muted", "nx-surface-alt", "nx muted alt"),
    ("nx-ink-muted", "nx-surface-muted", "nx muted on surface-muted"),
    ("nx-brand-pink-deep", "nx-surface", "nx pink-deep on surface"),
    ("nx-brand-blue-deep", "nx-surface", "nx blue-deep on surface"),
    ("nx-brand-purple", "nx-surface", "nx purple on surface"),
    ("destructive", "background", "destructive text"),
]

def audit(mode, tokens):
    print(f"\n========== {mode.upper()} MODE (POST-FIX) ==========")
    print(f"{'TEXT':<32} {'BG':<32} {'RATIO':>7}  {'GRADE':<14} ROLE")
    print("-" * 120)
    fails = []
    for text_tok, bg_tok, role in PAIRS:
        if text_tok not in tokens or bg_tok not in tokens:
            continue
        fg_raw = parse_color(tokens[text_tok])
        bg_raw = parse_color(tokens[bg_tok])
        fg = alpha_blend(fg_raw, bg_raw) if len(fg_raw) == 4 else fg_raw[:3]
        bg = bg_raw[:3]
        ratio = contrast(fg, bg)
        g = grade(ratio)
        flag = "  " if g in ("AA", "AAA") else "!!"
        print(f"{flag}{text_tok:<32} {bg_tok:<32} {ratio:>7.2f}  {g:<14} {role}")
        if g == "FAIL":
            fails.append((mode, text_tok, bg_tok, ratio, role))
    return fails

all_fails = []
all_fails.extend(audit("LIGHT", LIGHT))
all_fails.extend(audit("DARK", DARK))

print("\n========== POST-FIX FAILURES ==========")
if not all_fails:
    print("NONE — all pairs pass WCAG AA (≥4.5:1 normal / ≥3:1 large).")
else:
    for mode, t, b, r, role in all_fails:
        print(f"  [{mode}] {t} on {b}  ->  {r:.2f}:1   ({role})")
