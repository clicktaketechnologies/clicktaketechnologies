// POST /api/admin/forgot-password — placeholder reset email trigger.
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logSecurityEvent } from "@/lib/log-audit";

export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email || "").toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (user) {
    await logSecurityEvent({
      type: "info",
      event: "password_reset_requested",
      userId: user.id,
      metadata: { email },
    });
  }

  return NextResponse.json({ success: true });
}
