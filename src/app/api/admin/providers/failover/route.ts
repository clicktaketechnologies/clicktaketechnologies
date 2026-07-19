// /api/admin/providers/failover — force-refresh the registry or trigger failover test
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { refreshRegistry, getRegistrySnapshot } from "@/lib/providers";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const snapshot = await getRegistrySnapshot();
  return NextResponse.json(snapshot);
}

export async function POST() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await refreshRegistry();
  const snapshot = await getRegistrySnapshot();
  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "provider.refresh",
    entity: "ProviderConfig",
    details: snapshot,
  });
  return NextResponse.json({ ok: true, ...snapshot });
}
