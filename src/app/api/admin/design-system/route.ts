// /api/admin/design-system — manage the competitor-inspired new design system tokens
//
// Stores a single JSON blob in SiteSetting under key="nx_design" containing
// overrides for the --nx-* CSS variables used by the new homepage + inner pages.
//
// GET  → returns the current config (or defaults if not set)
// POST → save updated config (writes CSS vars to apply on the live site)
//
// The site layout reads this setting server-side and injects the overrides as
// inline CSS on <html>, so changes apply globally on next page load (no cache
// to bust — it's all in the HTML response).
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export const NX_DESIGN_KEY = "nx_design";

// Default token values — match the values defined in globals.css.
// Used when no admin override has been saved yet.
export const NX_DEFAULTS = {
  // Brand accents
  "--nx-orange": "#FF6B35",
  "--nx-orange-soft": "#FF8A5C",
  "--nx-orange-deep": "#E55319",
  "--nx-electric": "#3B82F6",
  "--nx-electric-soft": "#60A5FA",
  // Navy palette (always-dark sections: hero, navbar, footer, CTA)
  "--nx-navy-900": "#0A1124",
  "--nx-navy-800": "#0F1A35",
  "--nx-navy-700": "#162347",
  "--nx-navy-600": "#1E2F5C",
  // Light-mode surfaces (default when no .dark class)
  light: {
    "--nx-surface": "#FFFFFF",
    "--nx-surface-alt": "#F8FAFC",
    "--nx-surface-muted": "#F1F5F9",
    "--nx-border": "#E2E8F0",
    "--nx-border-strong": "#CBD5E1",
    "--nx-ink": "#0A1124",
    "--nx-ink-soft": "#475569",
    "--nx-ink-muted": "#94A3B8",
  },
  // Dark-mode surfaces (when html.dark is applied)
  dark: {
    "--nx-surface": "#0F1A35",
    "--nx-surface-alt": "#162347",
    "--nx-surface-muted": "#1E2F5C",
    "--nx-border": "rgba(255, 255, 255, 0.08)",
    "--nx-border-strong": "rgba(255, 255, 255, 0.16)",
    "--nx-ink": "#F8FAFC",
    "--nx-ink-soft": "#CBD5E1",
    "--nx-ink-muted": "#94A3B8",
  },
  // Status accents
  "--nx-green": "#10B981",
  "--nx-yellow": "#F59E0B",
  "--nx-pink": "#EC4899",
} as const;

export type NxDesignConfig = typeof NX_DEFAULTS;

export async function GET() {
  // Public-readable: returns config so the site layout can inject on every page.
  // (No session required — this is needed for SSR of public pages.)
  const row = await prisma.siteSetting.findUnique({ where: { key: NX_DESIGN_KEY } });
  let config: any = NX_DEFAULTS;
  if (row?.value) {
    try {
      const parsed = JSON.parse(row.value);
      config = {
        ...NX_DEFAULTS,
        ...parsed,
        light: { ...NX_DEFAULTS.light, ...(parsed.light || {}) },
        dark: { ...NX_DEFAULTS.dark, ...(parsed.dark || {}) },
      };
    } catch {
      // ignore parse errors — fall back to defaults
    }
  }
  return NextResponse.json({ config });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate: body must be an object with at least some keys
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return NextResponse.json({ error: "Config object required" }, { status: 400 });
  }

  const value = JSON.stringify(body);

  // Upsert into SiteSetting
  const existing = await prisma.siteSetting.findUnique({ where: { key: NX_DESIGN_KEY } });
  if (existing) {
    await prisma.siteSetting.update({ where: { key: NX_DESIGN_KEY }, data: { value } });
  } else {
    await prisma.siteSetting.create({ data: { key: NX_DESIGN_KEY, value } });
  }

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "nx_design.update",
    entity: "SiteSetting",
    entityId: NX_DESIGN_KEY,
    details: { keys: Object.keys(body).length },
  });

  return NextResponse.json({ success: true });
}
