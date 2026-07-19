/**
 * Cloudflare Turnstile token verifier — ported from original -Turnstile.ts
 */

interface VerifyResult { success: boolean; error?: string; }

export async function verifyTurnstileToken(token: string): Promise<VerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Dev mode — accept all tokens
    return { success: true };
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: data["error-codes"]?.join(", ") || "CAPTCHA verification failed" };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "CAPTCHA verification failed" };
  }
}
