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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[30rem] rounded-full bg-brand-pink/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-border/60 bg-card/60 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-pink text-white shadow-lg shadow-brand-blue/30">
              <Shield className="size-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email — we&apos;ll send a reset link
            </p>
          </div>

          {sent ? (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
              <CheckCircle2 className="mx-auto mb-2 size-8 text-emerald-500" />
              <div className="text-sm font-medium">Check your inbox</div>
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
                    className="w-full rounded-lg border border-border/60 bg-background/60 py-2.5 pl-10 pr-3 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-pink py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition-all hover:shadow-xl hover:shadow-brand-pink/30 disabled:opacity-50"
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
