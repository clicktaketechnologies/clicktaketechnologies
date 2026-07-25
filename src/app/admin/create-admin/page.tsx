"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateAdminPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!termsAccepted) {
      toast.error("Please accept the terms");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: email.toLowerCase(),
          password,
          roleName: "Editor",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create admin");
      } else {
        toast.success("Admin created. Please sign in.");
        router.push("/admin/login");
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
        className="relative z-10 w-full max-w-lg"
      >
        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div
              className="mb-4 flex size-14 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ background: brandGradient, boxShadow: "0 10px 30px -8px rgba(255, 83, 169, 0.4)" }}
            >
              <ShieldCheck className="size-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Register Administrator</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a new admin account for ClickTake Technologies
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              id="fullName"
              label="Full name"
              icon={<User className="size-4" />}
              value={fullName}
              onChange={setFullName}
              placeholder="Jane Doe"
            />
            <Field
              id="email"
              label="Email address"
              type="email"
              icon={<Mail className="size-4" />}
              value={email}
              onChange={setEmail}
              placeholder="admin@clicktaketech.com"
            />

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
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition-colors focus:border-[#FF53A9] focus:ring-2 focus:ring-[#FF53A9]/20 placeholder:text-muted-foreground/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground outline-none transition-colors focus:border-[#FF53A9] focus:ring-2 focus:ring-[#FF53A9]/20 placeholder:text-muted-foreground/70"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-border"
              />
              <span>
                I accept the{" "}
                <Link href="/legal/terms" className="text-[#FF53A9] hover:text-[#E0197A] dark:text-[#FF8AC4] dark:hover:text-[#FF53A9] hover:underline transition-colors">
                  Terms of Service
                </Link>{" "}
                and confirm I am authorized to create an admin account.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
              style={{ background: brandGradient, boxShadow: "0 10px 30px -8px rgba(255, 83, 169, 0.4)" }}
            >
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                <>
                  Create admin account
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-[#FF53A9] hover:text-[#E0197A] dark:text-[#FF8AC4] dark:hover:text-[#FF53A9] hover:underline font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground outline-none transition-colors focus:border-[#FF53A9] focus:ring-2 focus:ring-[#FF53A9]/20 placeholder:text-muted-foreground/70"
        />
      </div>
    </div>
  );
}
