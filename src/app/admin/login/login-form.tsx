"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

/**
 * Admin login form.
 *
 * Reads callbackUrl at submit time from window.location.search to avoid
 * useSearchParams() (which forces Next.js into client-side bailout and
 * leaves the prerendered HTML as a bare spinner).
 *
 * NOTE: Demo credentials are NO LONGER displayed on the page. Production
 * admins receive their credentials through secure channels (env vars +
 * direct outreach). Showing credentials on a public login page is a
 * critical information disclosure vulnerability.
 */
export default function AdminLoginForm() {
  const router = useRouter();

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
      let callbackUrl = "/admin";
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const cb = url.searchParams.get("callbackUrl");
        if (cb) callbackUrl = cb;
      }
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
      {/* Background glow + animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 size-[24rem] rounded-full bg-brand-pink/20 blur-3xl animate-pulse [animation-delay:1s]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-border/60 bg-card/70 p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo + heading */}
          <div className="mb-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-pink text-white shadow-lg shadow-brand-blue/40 relative overflow-hidden"
            >
              <Shield className="size-8 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to ClickTake Technologies control center
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Email address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-brand-blue" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-border/60 bg-background/60 py-3 pl-11 pr-3 text-sm outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 hover:border-border"
                />
              </div>
              {emailError && (
                <p className="flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle className="size-3.5" />
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-brand-blue" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-border/60 bg-background/60 py-3 pl-11 pr-11 text-sm outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 hover:border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="flex items-center gap-1.5 text-xs text-red-500">
                  <AlertCircle className="size-3.5" />
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="size-3.5 rounded border-border accent-brand-blue"
                />
                Remember me
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-brand-blue hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-blue to-brand-pink py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:shadow-xl hover:shadow-brand-pink/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span className="relative">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="relative">Sign in to Admin</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 relative" />
                </>
              )}
            </button>
          </form>

          {/* Security notice — replaces the old credential display */}
          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-border/40 bg-muted/20 p-3.5 text-xs text-muted-foreground">
            <Fingerprint className="size-4 shrink-0 text-brand-blue mt-0.5" />
            <div>
              <div className="font-semibold text-foreground mb-0.5">
                Authorized access only
              </div>
              <div className="leading-relaxed">
                This portal is restricted to ClickTake staff. All sign-in
                attempts are logged. Need credentials? Contact your
                administrator.
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/admin/create-admin"
              className="text-brand-blue hover:underline font-medium"
            >
              Request access
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            RBAC enforced
          </div>
          <div className="flex items-center gap-1.5">
            <KeyRound className="size-3.5 text-amber-500" />
            Encrypted at rest
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-brand-blue" />
            Audit logged
          </div>
        </div>
      </motion.div>
    </div>
  );
}
