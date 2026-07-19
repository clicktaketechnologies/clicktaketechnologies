// /api/admin/services/[id]
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
  const s = await prisma.service.findUnique({ where: { id } });
  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...s,
    items: JSON.parse(s.items || "[]"),
    results: JSON.parse(s.results || "[]"),
    differentiators: JSON.parse(s.differentiators || "[]"),
    deliverables: JSON.parse(s.deliverables || "[]"),
    faq: JSON.parse(s.faq || "[]"),
    processSteps: JSON.parse(s.processSteps || "[]"),
    pricingPackages: JSON.parse(s.pricingPackages || "[]"),
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

  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.slug && body.slug !== existing.slug) {
    const conflict = await prisma.service.findUnique({ where: { slug: body.slug } });
    if (conflict) return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
  }

  const data: any = {};
  const strFields = ["slug","category","categoryLabel","title","description","detailedDescription","iconName","imageUrl","gradient","glow","eyebrow"];
  for (const f of strFields) if (body[f] !== undefined) data[f] = body[f];
  if (body.displayOrder !== undefined) data.displayOrder = body.displayOrder;
  if (body.isPublished !== undefined) data.isPublished = body.isPublished;
  for (const f of ["items","results","differentiators","deliverables","faq","processSteps","pricingPackages"]) {
    if (body[f] !== undefined) data[f] = JSON.stringify(body[f]);
  }

  const updated = await prisma.service.update({ where: { id }, data });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "service.update",
    entity: "Service",
    entityId: id,
    details: { title: updated.title, changes: Object.keys(data) },
  });

  return NextResponse.json({ id: updated.id });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await prisma.service.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.service.delete({ where: { id } });

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "service.delete",
    entity: "Service",
    entityId: id,
    details: { title: existing.title, slug: existing.slug },
  });

  return NextResponse.json({ success: true });
}
