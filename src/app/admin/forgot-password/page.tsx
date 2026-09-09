"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
        toast.success("If that email exists, a reset link has been sent");
      } else {
        toast.error("Request failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  // Hard-coded brand gradient — always renders regardless of Tailwind v4
  // gradient utility quirks. See admin/login/login-form.tsx for full rationale.
  const brandGradient = "linear-gradient(135deg, #FF53A9 0%, #9B3DFF 50%, #136DFF 100%)";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-[#136DFF]/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 size-[22rem] rounded-full bg-[#FF53A9]/15 blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div
              className="mb-4 flex size-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ background: brandGradient, boxShadow: "0 10px 30px -8px rgba(255, 83, 169, 0.4)" }}
            >
              <Shield className="size-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset Password</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email — we&apos;ll send a reset link
            </p>
          </div>

          {sent ? (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
              <CheckCircle2 className="mx-auto mb-2 size-8 text-emerald-500" />
              <div className="text-sm font-medium text-foreground">Check your inbox</div>
              <div className="mt-1 text-xs text-muted-foreground">
                If an account exists for <code className="text-foreground">{email}</code>, a reset link is on its way.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@clicktaketech.com"
                    autoComplete="email"
                    className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none transition-colors focus:border-[#FF53A9] focus:ring-2 focus:ring-[#FF53A9]/20 placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                style={{ background: brandGradient, boxShadow: "0 10px 30px -8px rgba(255, 83, 169, 0.4)" }}
              >
                {isLoading ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3" /> Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
