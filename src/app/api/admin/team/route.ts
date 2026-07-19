// /api/admin/team
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [team, jobs] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { displayOrder: "asc" } }),
    prisma.jobOpening.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return NextResponse.json({
    team: team.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })),
    jobs: jobs.map((j) => ({ ...j, requirements: JSON.parse(j.requirements || "[]"), closingDate: j.closingDate?.toISOString() || null, createdAt: j.createdAt.toISOString() })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { action } = body;

  if (action === "create_member") {
    const { fullName, roleTitle, bio, linkedinUrl, githubUrl, avatarUrl, displayOrder, isActive } = body;
    if (!fullName || !roleTitle) return NextResponse.json({ error: "Name and role required" }, { status: 400 });
    const m = await prisma.teamMember.create({ data: { fullName, roleTitle, bio: bio || "", linkedinUrl, githubUrl, avatarUrl, displayOrder: displayOrder || 0, isActive: isActive !== false } });
    await logAudit({ userId: session.user.id, userName: session.user.name, action: "team.update", entity: "TeamMember", entityId: m.id, details: { name: fullName } });
    return NextResponse.json({ id: m.id });
  }
  if (action === "update_member") {
    const { id, ...patch } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.teamMember.update({ where: { id }, data: patch });
    return NextResponse.json({ success: true });
  }
  if (action === "delete_member") {
    const { id } = body;
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }
  if (action === "create_job") {
    const { title, department, location, type, description, requirements, salaryRange, isActive, closingDate } = body;
    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    const j = await prisma.jobOpening.create({ data: { title, department, location, type, description, requirements: JSON.stringify(requirements || []), salaryRange, isActive: isActive !== false, closingDate: closingDate ? new Date(closingDate) : null } });
    await logAudit({ userId: session.user.id, userName: session.user.name, action: "job.update", entity: "JobOpening", entityId: j.id, details: { title } });
    return NextResponse.json({ id: j.id });
  }
  if (action === "update_job") {
    const { id, ...patch } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    if (patch.requirements) patch.requirements = JSON.stringify(patch.requirements);
    if (patch.closingDate) patch.closingDate = new Date(patch.closingDate);
    await prisma.jobOpening.update({ where: { id }, data: patch });
    return NextResponse.json({ success: true });
  }
  if (action === "delete_job") {
    const { id } = body;
    await prisma.jobOpening.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
