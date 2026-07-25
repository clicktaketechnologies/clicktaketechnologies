/**
 * ZAI chat client wrapper — thin adapter around z-ai-web-dev-sdk used by
 * the In-Admin LLM Page Creation flow.
 *
 * Design notes:
 *   - The SDK is initialized lazily on first call (ZAI.create() is async).
 *   - We force JSON-only output by intercepting the assistant message and
 *     stripping any stray markdown fences / preamble the LLM may emit.
 *   - On failure we return a structured error so the API route can surface
 *     it to the admin UI without crashing.
 *   - The SDK must NEVER be imported in client code (per skill contract).
 *
 * Used by:
 *   - POST /api/admin/services/generate
 */

import ZAI from "z-ai-web-dev-sdk";

export type ChatResult = {
  ok: true;
  content: string;
  tokensIn: number;
  tokensOut: number;
} | {
  ok: false;
  error: string;
};

let _zaiPromise: Promise<any> | null = null;

async function getZai() {
  if (!_zaiPromise) {
    _zaiPromise = ZAI.create();
  }
  return _zaiPromise;
}

/**
 * Run a single-shot completion against the ZAI backend.
 * Returns the raw assistant text. Caller is responsible for parsing JSON.
 */
export async function runChat(
  systemPrompt: string,
  userMessage: string,
  opts?: { temperature?: number; maxTokens?: number },
): Promise<ChatResult> {
  try {
    const zai = await getZai();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      // Disable chain-of-thought leakage — we want the final answer only.
      thinking: { type: "disabled" },
      temperature: opts?.temperature ?? 0.7,
      max_tokens: opts?.maxTokens ?? 8000,
      stream: false,
    });

    const content: string | undefined = completion?.choices?.[0]?.message?.content;
    if (!content || content.trim().length === 0) {
      return { ok: false, error: "Empty response from LLM" };
    }

    const usage = completion?.usage || {};
    return {
      ok: true,
      content: content.trim(),
      tokensIn: usage.prompt_tokens ?? 0,
      tokensOut: usage.completion_tokens ?? 0,
    };
  } catch (err: any) {
    const msg = err?.message || String(err);
    // Re-init on auth/transport failure so the next attempt starts fresh.
    _zaiPromise = null;
    return { ok: false, error: `LLM call failed: ${msg}` };
  }
}

/**
 * Parse the LLM's raw text into a JSON object. Strips common wrappers:
 *   - ```json ... ``` markdown fences
 *   - Leading "Here is the JSON:" preamble
 *   - Trailing commentary after the closing brace
 *
 * Returns the parsed object or throws with a snippet of the bad text for
 * easy debugging in the admin UI.
 */
export function extractJson<T = any>(raw: string): T {
  let text = raw.trim();

  // Strip markdown fences if present.
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  // Find the first `{` and the last `}` — take that slice.
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error(`No JSON object found in LLM output. First 500 chars:\n${text.slice(0, 500)}`);
  }
  const slice = text.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(slice) as T;
  } catch (err: any) {
    throw new Error(`LLM output is not valid JSON: ${err.message}\nFirst 500 chars of slice:\n${slice.slice(0, 500)}`);
  }
}
