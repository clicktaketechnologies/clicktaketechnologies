// /api/admin/email/send-test — admin sends a test email (optionally via a specific provider)
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendMail, sendMailViaProvider } from "@/lib/mailer";
import { logAudit } from "@/lib/log-audit";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { to, subject, html, text, providerId, replyTo } = body;
  if (!to || !subject || !html) {
    return NextResponse.json({ error: "to, subject, html are required" }, { status: 400 });
  }

  try {
    let result;
    if (providerId && providerId !== "auto") {
      // Force-send via a specific provider (for admin testing)
      result = await sendMailViaProvider(providerId, { to, subject, html, text, replyTo });
    } else {
      // Default — go through the full failover chain
      await sendMail({ to, subject, html, text, replyTo });
      result = { messageId: "via-chain", providerId: "auto", accepted: true };
    }

    // Legacy smtpLog entry (so existing admin email center page keeps working)
    await prisma.smtpLog.create({
      data: {
        type: "dispatch",
        toEmail: Array.isArray(to) ? to.join(",") : to,
        subject,
        status: "sent",
      },
    }).catch(() => {});

    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "email.test_send",
      entity: "EmailLog",
      details: {
        to: Array.isArray(to) ? to : [to],
        subject,
        providerId: providerId || "auto",
        messageId: result.messageId,
      },
    });

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      providerId: result.providerId,
    });
  } catch (err: any) {
    // Legacy smtpLog entry for failed send
    await prisma.smtpLog.create({
      data: {
        type: "error",
        toEmail: Array.isArray(to) ? to.join(",") : to,
        subject,
        status: "failed",
        error: err.message,
      },
    }).catch(() => {});

    return NextResponse.json(
      { error: err.message, providerId: providerId || "auto" },
      { status: 500 },
    );
  }
}
