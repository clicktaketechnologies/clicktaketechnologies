// /api/admin/services/generate
// Phase 3 #2 — In-Admin LLM Page Creation.
// Calls the ZAI backend with the Master Copywriting prompt, returns a
// structured ServiceFormSchema JSON object the admin UI can review + edit
// before saving via POST /api/admin/services.

import { NextRequest, NextResponse } from "next/server";
import { getServerSession, hasPermission } from "@/lib/auth";
import { logAudit } from "@/lib/log-audit";
import { buildSystemPrompt, buildUserMessage, type GenerationBrief } from "@/lib/ai/copywriting-prompt";
import { runChat, extractJson } from "@/lib/ai/zai-client";
import { runQa, type QaResult } from "@/lib/ai/qa-check";
import type { ServiceFormSchema } from "@/lib/ai/copywriting-prompt";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min — LLM calls can take 60-120s for long-form.

export async function POST(req: NextRequest) {
  // ─── Auth ───────────────────────────────────────────────────────────────
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session.user, "writeCMS")) {
    return NextResponse.json({ error: "Forbidden — requires writeCMS" }, { status: 403 });
  }

  // ─── Parse brief ────────────────────────────────────────────────────────
  let brief: GenerationBrief;
  try {
    brief = (await req.json()) as GenerationBrief;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validationError = validateBrief(brief);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // ─── Build prompt ───────────────────────────────────────────────────────
  const systemPrompt = buildSystemPrompt(brief);
  const userMessage = buildUserMessage(brief);

  // ─── Call LLM ───────────────────────────────────────────────────────────
  const startedAt = Date.now();
  const result = await runChat(systemPrompt, userMessage, {
    temperature: 0.7,
    maxTokens: 12000,
  });
  const elapsedMs = Date.now() - startedAt;

  if (!result.ok) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "service.ai_generate_failed",
      entity: "Service",
      details: { slug: brief.slug, title: brief.title, error: result.error, elapsedMs },
    });
    return NextResponse.json(
      { error: result.error, stage: "llm_call" },
      { status: 502 },
    );
  }

  // ─── Parse JSON ─────────────────────────────────────────────────────────
  let form: ServiceFormSchema;
  try {
    form = extractJson<ServiceFormSchema>(result.content);
  } catch (err: any) {
    await logAudit({
      userId: session.user.id,
      userName: session.user.name,
      action: "service.ai_generate_parse_failed",
      entity: "Service",
      details: { slug: brief.slug, title: brief.title, error: err.message, tokensOut: result.tokensOut, elapsedMs },
    });
    return NextResponse.json(
      { error: err.message, stage: "json_parse", rawPreview: result.content.slice(0, 2000) },
      { status: 502 },
    );
  }

  // ─── Server-side QA validation ──────────────────────────────────────────
  const qa: QaResult = runQa(form);

  await logAudit({
    userId: session.user.id,
    userName: session.user.name,
    action: "service.ai_generate",
    entity: "Service",
    details: {
      slug: brief.slug,
      title: brief.title,
      tokensIn: result.tokensIn,
      tokensOut: result.tokensOut,
      elapsedMs,
      qaPass: qa.pass,
      wordCount: qa.wordCount,
      forbiddenPhrasesFound: qa.forbiddenPhrasesFound,
      errors: qa.errors,
      warnings: qa.warnings,
    },
  });

  return NextResponse.json({
    form,
    qa,
    meta: {
      tokensIn: result.tokensIn,
      tokensOut: result.tokensOut,
      elapsedMs,
      generatedAt: new Date().toISOString(),
    },
  });
}

function validateBrief(brief: GenerationBrief): string | null {
  if (!brief.slug || !brief.slug.match(/^[a-z0-9/-]+$/)) {
    return "Slug is required and must be lowercase alphanumeric (slashes allowed, e.g. 'ai/llm').";
  }
  if (!brief.title || brief.title.length < 4) {
    return "Title is required (min 4 chars).";
  }
  if (!brief.category || !["ai", "web", "marketing", "creative", "starter-kit"].includes(brief.category)) {
    return "Category must be one of: ai, web, marketing, creative, starter-kit.";
  }
  if (!brief.coreConceptDefinition || brief.coreConceptDefinition.length < 20) {
    return "Core concept definition is required (min 20 chars) — this anchors Section 3's GEO citation.";
  }
  if (!brief.keyTechnologies || brief.keyTechnologies.length < 5) {
    return "Key technologies list is required.";
  }
  if (!brief.primaryUseCases || brief.primaryUseCases.length < 3) {
    return "At least 3 primary use cases are required.";
  }
  if (!brief.differentiators || brief.differentiators.length < 20) {
    return "Differentiators description is required (min 20 chars).";
  }
  if (!brief.targetReader || !brief.targetReader.role || !brief.targetReader.pain) {
    return "Target reader (role + pain) is required.";
  }
  return null;
}
