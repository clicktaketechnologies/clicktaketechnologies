// /api/admin/leads/[id]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: any = {};
  const fields = ["name", "email", "phone", "serviceInterest", "message", "status", "source", "sourcePage", "notes", "internalNotes", "assignedTo"];
  for (const f of fields) if (body[f] !== undefined) data[f] = body[f];

  const updated = await prisma.lead.update({ where: { id }, data });

  if (body.status && body.status !== existing.status) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "lead.status_change",
      entity: "Lead",
      entityId: id,
      details: { from: existing.status, to: body.status },
    });
  } else {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "lead.update",
      entity: "Lead",
      entityId: id,
      details: { changes: Object.keys(data) },
    });
  }

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  // Soft delete
  await prisma.lead.update({ where: { id }, data: { deletedAt: new Date() } });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "lead.delete",
    entity: "Lead",
    entityId: id,
  });

  return NextResponse.json({ success: true });
}
