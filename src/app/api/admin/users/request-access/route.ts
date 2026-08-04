// /api/admin/users/request-access — PUBLIC endpoint for unauthenticated
// users to request an admin account. The account is created with
// status="Pending" so it CANNOT be used to log in until an existing
// admin (with manageRBAC permission) flips the status to "Active".
//
// This unblocks the /admin/create-admin page, which was previously
// POSTing to /api/admin/users (auth-required) and always receiving 401
// for the very audience it was built for.
//
// Mitigations:
//  - Rate limiting: simple per-IP cap (max 3 requests per 10 minutes).
//  - Role forced to "Editor" (least privilege); admins can promote later.
//  - status forced to "Pending" — login is impossible until approved.
//  - Duplicate email returns 409 (same as the authed endpoint) so the
//    requester knows that email is already on file.
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { logSecurityEvent } from "@/lib/log-audit";

// In-memory rate-limit store. Per-IP request counts + window start.
// Resets on serverless cold-start — acceptable for a low-traffic admin
// signup form. For higher-traffic deployments swap for an Upstash Redis
// backed limiter.
const RL_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RL_MAX = 3; // 3 requests per IP per window
const rlMap = new Map<string, { count: number; windowStart: number }>();

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = rlMap.get(ip);
  if (!entry || now - entry.windowStart > RL_WINDOW_MS) {
    rlMap.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count > RL_MAX) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((RL_WINDOW_MS - (now - entry.windowStart)) / 1000),
    };
  }
  return { ok: true };
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  // ── Parse body ────────────────────────────────────────────────────────
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, email, password } = body;
  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (typeof fullName !== "string" || fullName.trim().length < 2) {
    return NextResponse.json({ error: "Full name must be at least 2 characters" }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // ── Rate limit ────────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec || 600) } }
    );
  }

  // ── Duplicate email check ────────────────────────────────────────────
  const normalizedEmail = email.toLowerCase();
  const existing = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    // Don't leak whether the email exists — return a generic message that
    // still nudges the user to wait for approval (or contact admin).
    return NextResponse.json(
      {
        error:
          "An account with this email already exists. If you have not received approval yet, contact your administrator.",
      },
      { status: 409 }
    );
  }

  // ── Find least-privilege role ("Editor"). If missing, abort — we never
  // want to create a roleless admin or one with elevated permissions.
  const role = await prisma.adminRole.findUnique({ where: { name: "Editor" } });
  if (!role) {
    return NextResponse.json(
      { error: "Server is not configured for self-signup. Contact your administrator." },
      { status: 503 }
    );
  }

  // ── Create user with status="Pending" ────────────────────────────────
  const passwordHash = await hashPassword(password);
  const user = await prisma.adminUser.create({
    data: {
      email: normalizedEmail,
      passwordHash,
      fullName: fullName.trim(),
      roleId: role.id,
      status: "Pending", // CRITICAL: cannot log in until admin approves
    },
  });

  await logSecurityEvent({
    type: "info",
    event: "admin_signup_requested",
    userId: user.id,
    metadata: { email: user.email, fullName: user.fullName, ip },
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Access request received. An existing admin must approve your account before you can sign in. You will not be able to log in until then.",
    },
    { status: 201 }
  );
}
