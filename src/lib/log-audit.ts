// ─────────────────────────────────────────────────────────────────────────────
// Audit log helper — ported from original src/lib/logAudit.ts
// Call from any admin action to record what happened.
// ─────────────────────────────────────────────────────────────────────────────

import { prisma } from "@/lib/db";

export type AuditAction =
  | "page.create"
  | "page.update"
  | "page.delete"
  | "service.create"
  | "service.update"
  | "service.delete"
  | "lead.create"
  | "lead.update"
  | "lead.delete"
  | "lead.assign"
  | "lead.status_change"
  | "user.create"
  | "user.update"
  | "user.delete"
  | "role.create"
  | "role.update"
  | "role.delete"
  | "auth.login"
  | "auth.logout"
  | "auth.failed"
  | "settings.update"
  | "media.upload"
  | "media.delete"
  | "email.send"
  | "email.template.update"
  | "seo.update"
  | "theme.update"
  | "typography.update"
  | "team.update"
  | "job.update"
  | "security.block_ip"
  | "security.unblock_ip"
  | string;

export interface AuditContext {
  userId?: string | null;
  userName?: string | null;
  action: AuditAction;
  entity?: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string | null;
}

export async function logAudit(ctx: AuditContext): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: ctx.userId || null,
        userName: ctx.userName || null,
        action: ctx.action,
        entity: ctx.entity || null,
        entityId: ctx.entityId || null,
        details: JSON.stringify(ctx.details || {}),
        ipAddress: ctx.ipAddress || null,
      },
    });
  } catch (err) {
    // Audit failures should not break the parent operation.
    console.error("[logAudit] failed:", err);
  }
}

// ─── Convenience helpers ────────────────────────────────────────────────────

export async function logPageView(path: string, opts?: { referrer?: string; userAgent?: string; country?: string; sessionId?: string }) {
  try {
    await prisma.pageView.create({
      data: {
        path,
        referrer: opts?.referrer || null,
        userAgent: opts?.userAgent || null,
        country: opts?.country || null,
        sessionId: opts?.sessionId || null,
      },
    });
  } catch (err) {
    console.error("[logPageView] failed:", err);
  }
}

export async function logSecurityEvent(opts: {
  type?: "info" | "warning" | "error" | "critical";
  event: string;
  userId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, any>;
}) {
  try {
    await prisma.securityLog.create({
      data: {
        type: opts.type || "info",
        event: opts.event,
        userId: opts.userId || null,
        ipAddress: opts.ipAddress || null,
        userAgent: opts.userAgent || null,
        metadata: JSON.stringify(opts.metadata || {}),
      },
    });
  } catch (err) {
    console.error("[logSecurityEvent] failed:", err);
  }
}
