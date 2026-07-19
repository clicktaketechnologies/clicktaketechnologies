// /api/admin/themes/[id] — update / activate / delete
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const existing = await prisma.cmsTheme.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.isActive) {
    await prisma.cmsTheme.updateMany({ data: { isActive: false } });
  }

  const updated = await prisma.cmsTheme.update({
    where: { id },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.mode && { mode: body.mode }),
      ...(body.primary && { primary: body.primary }),
      ...(body.accent && { accent: body.accent }),
      ...(body.background !== undefined && { background: body.background }),
      ...(body.foreground !== undefined && { foreground: body.foreground }),
      ...(body.muted !== undefined && { muted: body.muted }),
      ...(body.border !== undefined && { border: body.border }),
      ...(body.card !== undefined && { card: body.card }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
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
  const existing = await prisma.cmsTheme.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.isActive) return NextResponse.json({ error: "Cannot delete active theme" }, { status: 400 });

  await prisma.cmsTheme.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
