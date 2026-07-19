// /api/admin/leads
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search");

  const where: any = { deletedAt: null };
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { serviceInterest: { contains: search } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.lead.count({ where }),
  ]);

  // Status counts for pipeline view
  const statusCounts = await prisma.lead.groupBy({
    by: ["status"],
    where: { deletedAt: null },
    _count: true,
  });

  return NextResponse.json({
    leads: leads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.phone,
      serviceInterest: l.serviceInterest,
      message: l.message,
      status: l.status,
      source: l.source,
      sourcePage: l.sourcePage,
      notes: l.notes,
      internalNotes: l.internalNotes,
      assignedTo: l.assignedTo,
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString(),
    })),
    total,
    statusCounts: statusCounts.reduce((acc, s) => ({ ...acc, [s.status]: s._count }), {} as Record<string, number>),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { name, email, phone, serviceInterest, message, source, sourcePage } = body;
  if (!name || !email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });

  const lead = await prisma.lead.create({
    data: { name, email, phone: phone || "", serviceInterest, message: message || "", source: source || "Other", sourcePage },
  });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "lead.create",
    entity: "Lead",
    entityId: lead.id,
    details: { name, email },
  });

  return NextResponse.json({ id: lead.id });
}
