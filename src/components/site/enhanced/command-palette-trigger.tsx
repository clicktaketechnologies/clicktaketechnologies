"use client";

/**
 * CommandPaletteTrigger — small search-style button for the navbar.
 *
 * Renders a pill button showing "Search ⌘K" on desktop, just an icon
 * on mobile. Clicking opens the globally-mounted CommandPalette via
 * the zustand store.
 */

import { Search } from "lucide-react";
import { useCommandPaletteStore } from "@/hooks/use-command-palette-store";
import { cn } from "@/lib/utils";

interface CommandPaletteTriggerProps {
  variant?: "navbar-light" | "navbar-dark" | "standalone";
  className?: string;
  showShortcut?: boolean;
}

export function CommandPaletteTrigger({
  variant = "navbar-light",
  className,
  showShortcut = true,
}: CommandPaletteTriggerProps) {
  const open = useCommandPaletteStore((s) => s.open);
  const setOpen = useCommandPaletteStore((s) => s.setOpen);

  const variantClass = {
    // navbar-light: used when navbar is over a light page surface (text is dark)
    "navbar-light":
      "border-[var(--nx-border)] bg-[var(--nx-surface)] text-[var(--nx-ink-soft)] hover:text-[var(--nx-ink)] hover:border-[var(--nx-border-strong)]",
    // navbar-dark: used when navbar is transparent over the dark hero (text is white)
    "navbar-dark":
      "border-white/15 bg-white/5 text-white/70 hover:text-white hover:border-white/30",
    // standalone: used anywhere else
    standalone:
      "border-border bg-background/60 text-muted-foreground hover:text-foreground hover:border-primary/40",
  }[variant];

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-label="Open command palette (Cmd+K)"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold backdrop-blur-xl transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF53A9] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variantClass,
        className
      )}
    >
      <Search className="h-3.5 w-3.5" />
      {showShortcut && (
        <span className="hidden sm:inline-flex items-center gap-1">
          <span>Search</span>
          <kbd className="rounded border border-current/30 px-1 py-0.5 font-mono text-[9px] opacity-70">
            ⌘K
          </kbd>
        </span>
      )}
    </button>
  );
}

export default CommandPaletteTrigger;
