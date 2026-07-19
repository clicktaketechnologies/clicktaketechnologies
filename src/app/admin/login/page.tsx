"use client";

import { Suspense } from "react";
import AdminLoginForm from "./login-form";

/**
 * Page wrapper — Suspense boundary is REQUIRED because the form uses
 * useSearchParams() (Next.js 16 build requirement for static export).
 */
export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="size-8 animate-spin rounded-full border-2 border-brand-blue/30 border-t-brand-blue" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
