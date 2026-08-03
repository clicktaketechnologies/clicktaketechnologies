/**
 * POST /api/admin/providers/test
 *
 * Tests the connection for a specific configured provider.
 *
 * Body: { providerId: string, category: "email" | "storage" | "media" }
 *
 * Returns: { ok: boolean, latencyMs: number, message?: string, details?: any }
 *
 * For email providers, delegates to the provider's own `testConnection()`
 * (SMTP/Mailjet/Brevo/etc.). For storage/media providers, performs a
 * lightweight reachability check by asking the provider registry whether
 * the provider is loaded and active — full end-to-end upload tests are
 * handled by the storage/media managers and are too expensive to run on
 * every button click.
 */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  testEmailProvider,
  getEmailProviders,
  getStorageProviders,
  getMediaProviders,
} from "@/lib/providers";
import { logAudit } from "@/lib/log-audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { providerId, category } = body as { providerId?: string; category?: string };
  if (!providerId || !category) {
    return NextResponse.json(
      { error: "providerId and category are required" },
      { status: 400 },
    );
  }

  // Verify the provider is actually configured in the DB (not just registered)
  const config = await prisma.providerConfig.findFirst({
    where: { providerId, category },
  });
  if (!config) {
    return NextResponse.json(
      { ok: false, message: `Provider "${providerId}" is not configured` },
      { status: 404 },
    );
  }

  const startedAt = Date.now();

  try {
    if (category === "email") {
      const result = await testEmailProvider(providerId);
      const latencyMs = Date.now() - startedAt;
      await logAudit({
        userId: session.user.id,
        userName: session.user.name,
        action: "provider.test",
        entity: "ProviderConfig",
        entityId: config.id,
        details: { providerId, category, ok: result.ok, latencyMs },
      });
      return NextResponse.json({
        ok: result.ok,
        latencyMs,
        message: result.message,
        details: result.details,
      });
    }

    if (category === "storage" || category === "media") {
      const providers =
        category === "storage" ? await getStorageProviders() : await getMediaProviders();
      const provider = providers.find((p: any) => p.id === providerId);
      const latencyMs = Date.now() - startedAt;
      if (!provider) {
        return NextResponse.json({
          ok: false,
          latencyMs,
          message: `Provider "${providerId}" is configured but not loaded in registry. Check credentials and refresh.`,
        });
      }
      await logAudit({
        userId: session.user.id,
        userName: session.user.name,
        action: "provider.test",
        entity: "ProviderConfig",
        entityId: config.id,
        details: { providerId, category, ok: true, latencyMs },
      });
      return NextResponse.json({
        ok: true,
        latencyMs,
        message: `${providerId} is registered and active`,
      });
    }

    return NextResponse.json(
      { ok: false, message: `Unknown category: ${category}` },
      { status: 400 },
    );
  } catch (err: any) {
    const latencyMs = Date.now() - startedAt;
    return NextResponse.json(
      {
        ok: false,
        latencyMs,
        message: err.message || "Test failed",
      },
      { status: 500 },
    );
  }
}
