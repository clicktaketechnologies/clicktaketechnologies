#!/usr/bin/env python3
"""
Patch v6 inline old-design patterns across all site pages.
Replaces gradient buttons, glassmorphic cards, gradient text, etc.
with v6 solid-surface equivalents.
"""
import re
import sys
from pathlib import Path

# Common replacement rules — applied to ALL site pages
REPLACEMENTS = [
    # CTA buttons (Book a Call / Get Started / etc.) — gradient → solid pink squircle
    (
        'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0',
        'inline-flex items-center gap-2 rounded-[8px] bg-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition shrink-0'
    ),
    (
        'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0',
        'inline-flex items-center gap-2 rounded-[8px] bg-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition shrink-0'
    ),
    (
        'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-magenta to-brand-pink px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition shrink-0',
        'inline-flex items-center gap-2 rounded-[8px] bg-[#EC4899] px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition shrink-0'
    ),
    # Hero H1 gradient text → solid
    (
        'bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent',
        'text-[#F5F5F0]'
    ),
    (
        'bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent',
        'text-[#F5F5F0]'
    ),
    (
        'bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent',
        'text-[#F5F5F0]'
    ),
    # Tech-stack pills
    (
        'inline-flex items-center rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1.5 text-xs font-medium text-brand-blue',
        'inline-flex items-center rounded-[6px] border border-[#EC4899]/25 bg-[#EC4899]/8 px-3 py-1.5 text-xs font-medium text-[#F5F5F0]'
    ),
    # Generic backdrop-blur cards → solid
    (
        'bg-card/40 backdrop-blur-md',
        'bg-[#14141A]'
    ),
    (
        'bg-card/50 backdrop-blur-md',
        'bg-[#14141A]'
    ),
    (
        'bg-card/60 backdrop-blur-md',
        'bg-[#14141A]'
    ),
    (
        'bg-card/70 backdrop-blur-xl',
        'bg-[#14141A]'
    ),
    (
        'bg-card/95 backdrop-blur-xl',
        'bg-[#14141A]'
    ),
    # Generic brand-blue eyebrow text
    (
        'text-brand-blue',
        'text-[#EC4899]'
    ),
    # Gradient buttons with rounded-xl (form submits, large CTAs)
    (
        'rounded-xl bg-gradient-to-r from-brand-cyan to-brand-magenta px-6 py-3 font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition',
        'rounded-xl bg-[#EC4899] px-6 py-3 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition'
    ),
    (
        'rounded-xl bg-gradient-to-r from-brand-magenta to-brand-pink px-6 py-3 font-semibold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition',
        'rounded-xl bg-[#EC4899] px-6 py-3 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition'
    ),
    # Generic gradient icon containers (rounded-xl with text-white)
    (
        'grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white',
        'grid h-10 w-10 place-items-center rounded-xl bg-[#EC4899] text-white'
    ),
    (
        'grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-brand-magenta to-brand-pink text-white',
        'grid h-10 w-10 place-items-center rounded-xl bg-[#EC4899] text-white'
    ),
    (
        'grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white',
        'grid h-10 w-10 place-items-center rounded-xl bg-[#EC4899] text-white'
    ),
]

def patch_file(path: Path) -> tuple[int, list[str]]:
    """Apply all replacements to a file. Returns (count_applied, list of changes)."""
    original = path.read_text()
    content = original
    changes = []

    for old, new in REPLACEMENTS:
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            changes.append(f"  +{count}: {old[:60]}...")

    if content != original:
        path.write_text(content)
    return (len(changes), changes)


def main():
    base = Path("/home/z/my-project/src/components/site")
    pages_dir = base / "pages"

    # All pages to patch (in priority order)
    target_files = [
        # High-impact inner pages
        pages_dir / "blog-page.tsx",
        pages_dir / "blog-post-page.tsx",
        pages_dir / "team-page.tsx",
        pages_dir / "service-detail-page.tsx",
        pages_dir / "pricing-page.tsx",
        pages_dir / "careers-page.tsx",
        pages_dir / "portfolio-page.tsx",
        pages_dir / "solution-detail-page.tsx",
        pages_dir / "solutions-page.tsx",
        pages_dir / "resources-page.tsx",
        pages_dir / "services-page.tsx",
        pages_dir / "legal-page.tsx",
        pages_dir / "about-page.tsx",
        pages_dir / "city-hub-page.tsx",
        pages_dir / "cities-index-page.tsx",
        # Core site components
        base / "services.tsx",
        base / "why-choose.tsx",
        base / "process.tsx",
        base / "work.tsx",
        base / "hero.tsx",
        base / "nx-hero.tsx",
        base / "nx-cta.tsx",
        base / "nx-footer.tsx",
        base / "footer.tsx",
        base / "scroll-animations.tsx",
        base / "social-icons.tsx",
        base / "enhanced" / "glitch-404.tsx",
        base / "enhanced" / "command-palette.tsx",
        # Deep-dive layout
        base / "deep-dive" / "deep-dive-layout.tsx",
        base / "deep-dive" / "deep-dive-blocks.tsx",
    ]

    total_patched = 0
    total_changes = 0
    for f in target_files:
        if not f.exists():
            print(f"SKIP (not found): {f}")
            continue
        n_changes, change_list = patch_file(f)
        if n_changes > 0:
            total_patched += 1
            total_changes += n_changes
            print(f"\n✓ Patched {f.relative_to(base)} ({n_changes} unique patterns)")
            for c in change_list:
                print(c)
        else:
            print(f"  - No changes: {f.relative_to(base)}")

    print(f"\n{'='*60}")
    print(f"TOTAL: {total_patched} files patched, {total_changes} unique pattern types applied")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
