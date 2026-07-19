// /api/admin/emails — templates + workflows + logs
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { sendMail } from "@/lib/mailer";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [templates, workflows, logs] = await Promise.all([
    prisma.emailTemplate.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.emailWorkflow.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.smtpLog.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  return NextResponse.json({
    templates: templates.map((t) => ({ ...t, variables: JSON.parse(t.variables || "[]") })),
    workflows: workflows.map((w) => ({ ...w, steps: JSON.parse(w.steps || "[]") })),
    logs: logs.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { action } = body;

  if (action === "create_template") {
    const { name, subject, htmlContent, textContent, variables, category } = body;
    if (!name || !subject || !htmlContent) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const t = await prisma.emailTemplate.create({
      data: { name, subject, htmlContent, textContent, variables: JSON.stringify(variables || []), category: category || "general" },
    });
    await logAudit({ userId: session.user.id, userName: session.user.name, action: "email.template_update", entity: "EmailTemplate", entityId: t.id, details: { name } });
    return NextResponse.json({ id: t.id });
  }

  if (action === "update_template") {
    const { id, ...patch } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    if (patch.variables) patch.variables = JSON.stringify(patch.variables);
    const t = await prisma.emailTemplate.update({ where: { id }, data: patch });
    await logAudit({ userId: session.user.id, userName: session.user.name, action: "email.template_update", entity: "EmailTemplate", entityId: id, details: { name: t.name } });
    return NextResponse.json({ id: t.id });
  }

  if (action === "delete_template") {
    const { id } = body;
    await prisma.emailTemplate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  if (action === "test_send") {
    const { to, subject, html } = body;
    if (!to || !subject || !html) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    try {
      await sendMail({ to, subject, html });
      await prisma.smtpLog.create({
        data: { type: "dispatch", toEmail: to, subject, status: "sent" },
      });
      await logAudit({ userId: session.user.id, userName: session.user.name, action: "email.send", details: { to, subject } });
      return NextResponse.json({ success: true });
    } catch (e: any) {
      await prisma.smtpLog.create({
        data: { type: "error", toEmail: to, subject, status: "failed", error: e.message },
      });
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
