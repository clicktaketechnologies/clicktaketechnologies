// /api/admin/email/logs — paginated email logs (combines new EmailLog + legacy smtpLog)
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);
  const status = url.searchParams.get("status"); // "sent" | "failed"
  const providerId = url.searchParams.get("providerId");

  // New EmailLog table — provider-chain sends
  const where: any = {};
  if (status) where.status = status;
  if (providerId) where.providerId = providerId;

  const [logs, total] = await Promise.all([
    prisma.emailLog.findMany({
      where,
      orderBy: { sentAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.emailLog.count({ where }),
  ]);

  return NextResponse.json({
    logs: logs.map((l) => ({
      id: l.id,
      providerId: l.providerId,
      messageId: l.messageId,
      toAddress: l.toAddress,
      subject: l.subject,
      status: l.status,
      errorMessage: l.errorMessage,
      metadata: l.metadata,
      sentAt: l.sentAt.toISOString(),
    })),
    total,
    limit,
    offset,
  });
}
