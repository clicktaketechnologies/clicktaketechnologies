// /api/admin/services/validate
// Re-run the QA checklist against an edited ServiceFormSchema. Used by the
// admin UI's "Re-validate" button after the user manually edits LLM output.

import { NextRequest, NextResponse } from "next/server";
import { getServerSession, hasPermission } from "@/lib/auth";
import { runQa } from "@/lib/ai/qa-check";
import type { ServiceFormSchema } from "@/lib/ai/copywriting-prompt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(session.user, "writeCMS")) {
    return NextResponse.json({ error: "Forbidden — requires writeCMS" }, { status: 403 });
  }

  let form: ServiceFormSchema;
  try {
    form = (await req.json()) as ServiceFormSchema;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!form || typeof form !== "object" || !form.title || !form.slug) {
    return NextResponse.json({ error: "Body must be a ServiceFormSchema object with at least slug + title." }, { status: 422 });
  }

  const qa = runQa(form);
  return NextResponse.json({ qa });
}
