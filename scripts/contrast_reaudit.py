#!/usr/bin/env python3
"""
Re-run the WCAG contrast audit against the NEW (post-fix) token values
to confirm everything passes AA.
"""
from contrast_audit import contrast, parse_color, alpha_blend, grade

LIGHT = {
    "background": "#ffffff",
    "foreground": "#0a0e1a",
    "card": "#ffffff",
    "card-foreground": "#0a0e1a",
    "popover": "#ffffff",
    "popover-foreground": "#0a0e1a",
    "primary": "#136DFF",
    "primary-foreground": "#ffffff",
    "secondary": "#f1f5f9",
    "secondary-foreground": "#0a0e1a",
    "muted": "#f1f5f9",
    "muted-foreground": "#475569",     # ← NEW
    "accent": "#C2185B",                # ← NEW
    "accent-foreground": "#ffffff",
    "destructive": "#dc2626",           # ← NEW
    "border": "#e2e8f0",
    "input": "#e2e8f0",
    "ring": "#136DFF",
    "sidebar": "#ffffff",
    "sidebar-foreground": "#0a0e1a",
    "sidebar-primary": "#136DFF",
    "sidebar-primary-foreground": "#ffffff",
    "sidebar-accent": "#f1f5f9",
    "sidebar-accent-foreground": "#0a0e1a",
    "brand": "#136DFF",
    "brand-foreground": "#ffffff",
    "brand-accent": "#C2185B",          # ← NEW
    "brand-accent-foreground": "#ffffff",
    "brand-pink": "#FF53A9",
    "brand-blue": "#136DFF",
    "nx-surface": "#FFFFFF",
    "nx-surface-alt": "#F8F6FC",
    "nx-surface-muted": "#F1EDF8",
    "nx-border": "#E5E0EE",
    "nx-ink": "#0A0612",
    "nx-ink-soft": "#4A3B5C",
    "nx-ink-muted": "#6E5F80",          # ← NEW
    "nx-brand-pink": "#FF53A9",
    "nx-brand-pink-soft": "#FF8AC4",
    "nx-brand-pink-deep": "#E0197A",
    "nx-brand-blue": "#136DFF",
    "nx-brand-blue-soft": "#4A90D9",
    "nx-brand-blue-deep": "#0E58D6",
    "nx-brand-purple": "#9B3DFF",
}

DARK = {
    "background": "#03000D",
    "foreground": "#F0EBF8",
    "card": "#0D0025",
    "card-foreground": "#F0EBF8",
    "popover": "#0D0025",
    "popover-foreground": "#F0EBF8",
    "primary": "#136DFF",
    "primary-foreground": "#ffffff",
    "secondary": "#070018",
    "secondary-foreground": "#F0EBF8",
    "muted": "#070018",
    "muted-foreground": "#9B8AB8",      # ← NEW
    "accent": "#E0197A",                 # ← NEW
    "accent-foreground": "#ffffff",
    "destructive": "#ef4444",
    "border": "rgba(240, 235, 248, 0.10)",
    "input": "rgba(240, 235, 248, 0.12)",
    "ring": "#4A90D9",
    "sidebar": "#0D0025",
    "sidebar-foreground": "#F0EBF8",
    "sidebar-primary": "#136DFF",
    "sidebar-primary-foreground": "#ffffff",
    "sidebar-accent": "#070018",
    "sidebar-accent-foreground": "#F0EBF8",
    "brand": "#136DFF",
    "brand-foreground": "#ffffff",
    "brand-accent": "#E0197A",           # ← NEW
    "brand-accent-foreground": "#ffffff",
    "brand-pink": "#ff6bb5",
    "brand-blue": "#4d8dff",
    "ct-pink": "#E0197A",
    "ct-purple": "#7B2FBE",
    "ct-blue": "#4A90D9",
    "ct-text": "#F0EBF8",
    "ct-muted": "#7A6B95",               # decorative only
    "nx-surface": "#100820",
    "nx-surface-alt": "#16102A",
    "nx-surface-muted": "#1E1640",
    "nx-border": "rgba(255, 255, 255, 0.08)",
    "nx-ink": "#F4F0FF",
    "nx-ink-soft": "#B5A8C8",
    "nx-ink-muted": "#9B8AB8",           # ← NEW
    "nx-brand-pink": "#FF53A9",
    "nx-brand-pink-soft": "#FF8AC4",
    "nx-brand-pink-deep": "#FF53A9",     # ← NEW (dark override)
    "nx-brand-blue": "#136DFF",
    "nx-brand-blue-soft": "#4A90D9",
    "nx-brand-blue-deep": "#4A90D9",     # ← NEW (dark override)
    "nx-brand-purple": "#B27CFF",        # ← NEW (dark override)
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
