"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Inner login form — consumes useSearchParams so must live inside <Suspense>.
 * (Mounted by /admin/login/page.tsx)
 */
export default function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email address is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid email or password");
      } else if (res?.ok) {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[30rem] rounded-full bg-brand-pink/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-border/60 bg-card/60 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-pink text-white shadow-lg shadow-brand-blue/30">
              <Shield className="size-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to ClickTake Technologies control center
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
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
              {emailError && <p className="text-xs text-red-500">{emailError}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-border/60 bg-background/60 py-2.5 pl-10 pr-10 text-sm outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <Link href="/admin/forgot-password" className="text-brand-blue hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-blue to-brand-pink py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition-all hover:shadow-xl hover:shadow-brand-pink/30 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to Admin
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 rounded-lg border border-dashed border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
            <div className="mb-1 flex items-center gap-1.5 font-medium text-foreground">
              <Sparkles className="size-3.5 text-brand-pink" />
              Default super-admin
            </div>
            <div>Email: <code className="text-brand-blue">admin@clicktaketech.com</code></div>
            <div>Password: <code className="text-brand-blue">Admin@2026</code></div>
            <div className="mt-1 text-[10px]">Change these immediately in production via env vars.</div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/admin/create-admin" className="text-brand-blue hover:underline">
              Request access
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          Protected by ClickTake Security · RBAC enforced
        </div>
      </motion.div>
    </div>
  );
}
