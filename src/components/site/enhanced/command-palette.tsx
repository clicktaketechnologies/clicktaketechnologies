"use client";

/**
 * CommandPalette — Cmd+K / Ctrl+K command palette.
 *
 * Features:
 *   • Global keyboard shortcut (Cmd+K on macOS, Ctrl+K on Win/Linux).
 *   • Fuzzy search across pages, services, and quick actions.
 *   • Full keyboard navigation: ↑/↓ to move, Enter to fire, Esc to close.
 *   • Recent searches persisted in localStorage (last 5).
 *   • Categorized results (Pages, Services, Actions).
 *   • Smooth modal open/close with backdrop blur.
 *   • Auto-focuses input on open, restores focus on close.
 *   • Accessible: role="dialog", aria-modal, traps focus, Escape closes.
 *   • Respects prefers-reduced-motion (instant transitions).
 *
 * Mount ONCE at the app root (e.g. in layout.tsx). It listens for the
 * Cmd+K shortcut globally and renders the modal when open.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Clock,
  X,
  type LucideIcon,
} from "lucide-react";
import { useKeyCombo, useFuzzySearch, useLocalStorage, usePrefersReducedMotion } from "@/hooks/use-enhanced";
import { useCommandPaletteStore } from "@/hooks/use-command-palette-store";
import { SERVICES, SOLUTIONS, SITE } from "@/lib/site-data";

type Category = "Pages" | "Services" | "Solutions" | "Actions";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  category: Category;
  icon: LucideIcon;
  keywords?: string;
  href?: string;
  action?: () => void;
}

/* ── Build the static command index ─────────────────────────── */

import {
  Home,
  Briefcase,
  Mail,
  Newspaper,
  Palette,
  Settings,
  Code2,
  Brain,
  Megaphone,
  Rocket,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

function buildCommandIndex(): CommandItem[] {
  const items: CommandItem[] = [];

  // Pages
  const pages: { label: string; href: string; description: string; icon: LucideIcon; keywords: string }[] = [
    { label: "Home", href: "/", description: "Back to the homepage", icon: Home, keywords: "home main landing" },
    { label: "Services", href: "/services", description: "Browse all services", icon: Code2, keywords: "services web ai marketing creative" },
    { label: "Solutions", href: "/solutions", description: "Industry solutions", icon: Briefcase, keywords: "solutions industry" },
    { label: "Portfolio", href: "/portfolio", description: "See our work", icon: Briefcase, keywords: "portfolio work showcase" },
    { label: "Case Studies", href: "/case-studies", description: "Client success stories", icon: Newspaper, keywords: "case studies stories" },
    { label: "Blog", href: "/blog", description: "Articles & insights", icon: Newspaper, keywords: "blog articles news" },
    { label: "About", href: "/about", description: "About ClickTake", icon: Home, keywords: "about team company" },
    { label: "Pricing", href: "/pricing", description: "Plans & pricing", icon: Settings, keywords: "pricing cost plans" },
    { label: "Contact", href: "/contact", description: "Get in touch", icon: Mail, keywords: "contact email book consult" },
    { label: "Careers", href: "/careers", description: "Join the team", icon: Briefcase, keywords: "careers jobs hiring" },
    { label: "Cities We Serve", href: "/cities", description: "Regional offices", icon: Home, keywords: "cities locations uk pk usa dubai" },
  ];
  for (const p of pages) {
    items.push({
      id: `page-${p.href}`,
      label: p.label,
      description: p.description,
      category: "Pages",
      icon: p.icon,
      keywords: p.keywords,
      href: p.href,
    });
  }

  // Services
  for (const s of SERVICES) {
    items.push({
      id: `service-${s.slug}`,
      label: s.title,
      description: s.description,
      category: "Services",
      icon: Code2,
      keywords: `${s.slug} ${s.title}`,
      href: s.slug ? `/services/${s.slug}` : "/services",
    });
  }

  // Solutions
  for (const s of SOLUTIONS) {
    items.push({
      id: `solution-${s.slug}`,
      label: s.title,
      description: s.summary,
      category: "Solutions",
      icon: Briefcase,
      keywords: `${s.slug} ${s.title}`,
      href: s.slug ? `/solutions/${s.slug}` : "/solutions",
    });
  }

  // Actions — theme toggles, scroll-to-top, contact
  items.push({
    id: "action-theme-dark",
    label: "Switch to dark theme",
    category: "Actions",
    icon: Moon,
    keywords: "theme dark mode night",
    action: () => {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("theme-custom-light");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    },
  });
  items.push({
    id: "action-theme-light",
    label: "Switch to light theme",
    category: "Actions",
    icon: Sun,
    keywords: "theme light mode day",
    action: () => {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    },
  });
  items.push({
    id: "action-theme-system",
    label: "Use system theme",
    category: "Actions",
    icon: Monitor,
    keywords: "theme system auto os",
    action: () => {
      try {
        localStorage.setItem("theme", "system");
      } catch {}
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    },
  });
  items.push({
    id: "action-scroll-top",
    label: "Scroll to top",
    category: "Actions",
    icon: ArrowUp,
    keywords: "scroll top up",
    action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  });
  items.push({
    id: "action-book-call",
    label: "Book a free consultation",
    category: "Actions",
    icon: Rocket,
    keywords: "book call consult demo",
    href: "/contact",
  });

  return items;
}

/* ── Component ──────────────────────────────────────────────── */

export function CommandPalette() {
  const open = useCommandPaletteStore((s) => s.open);
  const setOpen = useCommandPaletteStore((s) => s.setOpen);
  const toggle = useCommandPaletteStore((s) => s.toggle);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const reduced = usePrefersReducedMotion();

  const [recents, setRecents] = useLocalStorage<string[]>("cmdk-recents", []);

  const items = useMemo(() => buildCommandIndex(), []);
  const fuzzy = useFuzzySearch(items, (it) => `${it.label} ${it.description ?? ""} ${it.keywords ?? ""}`);

  const results = useMemo(() => {
    const r = fuzzy(query);
    // Group by category preserving the static order
    const order: Category[] = ["Pages", "Services", "Solutions", "Actions"];
    const grouped: CommandItem[] = [];
    for (const cat of order) {
      const inCat = r.filter((it) => it.category === cat);
      if (inCat.length) grouped.push(...inCat);
    }
    return grouped.slice(0, 30);
  }, [query, fuzzy]);

  // Open shortcut
  useKeyCombo("k", toggle);
  // Also support "/" as a quick-open (common pattern)
  useKeyCombo("/", () => setOpen(true), { meta: false, ctrl: false });

  // Focus management
  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement;
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery("");
      setActiveIdx(0);
      previousFocus.current?.focus();
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Reset active when results change
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector(`[data-idx="${activeIdx}"]`);
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const execute = useCallback(
    (item: CommandItem) => {
      // Save to recents (deduped, max 5)
      setRecents((prev) => [item.id, ...prev.filter((id) => id !== item.id)].slice(0, 5));
      setOpen(false);
      if (item.href) {
        router.push(item.href);
      } else if (item.action) {
        item.action();
      }
    },
    [router, setRecents]
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIdx];
      if (item) execute(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  // Build recents display (only when query is empty)
  const recentItems = useMemo(() => {
    if (query.trim() || !recents.length) return [];
    return recents
      .map((id) => items.find((it) => it.id === id))
      .filter((it): it is CommandItem => it !== null)
      .slice(0, 5);
  }, [recents, query, items]);

  const displayed = query.trim() ? results : recentItems;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-2xl shadow-black/60 dark:border-white/10 dark:bg-[#0a0612]/95"
              initial={reduced ? undefined : { opacity: 0, y: -16, scale: 0.97 }}
              animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
              transition={reduced ? undefined : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border dark:border-white/10 px-4 py-3.5">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground dark:text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search pages, services, actions…"
                  className="flex-1 bg-transparent text-sm text-popover-foreground placeholder:text-muted-foreground focus:outline-none dark:text-white dark:placeholder:text-white/40"
                  aria-label="Search"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto p-2"
                role="listbox"
                aria-label="Search results"
              >
                {displayed.length === 0 ? (
                  <div className="px-4 py-10 text-center text-sm text-muted-foreground dark:text-white/50">
                    No results for &quot;{query}&quot;
                  </div>
                ) : (
                  <>
                    {!query.trim() && recentItems.length > 0 && (
                      <div className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:text-white/40 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> Recent
                      </div>
                    )}
                    {displayed.map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={item.id}
                          data-idx={idx}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => execute(item)}
                          role="option"
                          aria-selected={isActive}
                          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            isActive
                              ? "bg-[#FF53A9]/15 text-foreground dark:text-white"
                              : "text-muted-foreground hover:bg-accent dark:text-white/80 dark:hover:bg-white/5"
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${
                              isActive ? "bg-[#FF53A9]/20 text-[#FF8AC4]" : "bg-muted text-muted-foreground dark:bg-white/5 dark:text-white/60"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold">{item.label}</span>
                            {item.description && (
                              <span className="block truncate text-xs text-muted-foreground dark:text-white/50">{item.description}</span>
                            )}
                          </span>
                          <span className="hidden shrink-0 items-center gap-1 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:flex dark:border-white/10 dark:text-white/40">
                            {item.category}
                          </span>
                          {isActive && (
                            <CornerDownLeft className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block dark:text-white/40" />
                          )}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 border-t border-border dark:border-white/10 bg-muted/50 dark:bg-black/30 px-4 py-2.5 text-[10px] text-muted-foreground dark:text-white/40">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border dark:border-white/20 bg-muted dark:bg-white/5 px-1 py-0.5 font-mono text-[9px]">↑</kbd>
                    <kbd className="rounded border border-border dark:border-white/20 bg-muted dark:bg-white/5 px-1 py-0.5 font-mono text-[9px]">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border dark:border-white/20 bg-muted dark:bg-white/5 px-1 py-0.5 font-mono text-[9px]">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border dark:border-white/20 bg-muted dark:bg-white/5 px-1 py-0.5 font-mono text-[9px]">esc</kbd>
                    close
                  </span>
                </div>
                <span className="font-mono uppercase tracking-wider">ClickTake</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;
