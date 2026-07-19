// /api/admin/settings — site-wide key/value settings
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json({ settings: map });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { key, value } = body;
  if (!key) return NextResponse.json({ error: "Key required" }, { status: 400 });

  const existing = await prisma.siteSetting.findUnique({ where: { key } });
  if (existing) {
    await prisma.siteSetting.update({ where: { key }, data: { value: String(value) } });
  } else {
    await prisma.siteSetting.create({ data: { key, value: String(value) } });
  }

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "settings.update",
    entity: "SiteSetting",
    details: { key },
  });

  return NextResponse.json({ success: true });
}
