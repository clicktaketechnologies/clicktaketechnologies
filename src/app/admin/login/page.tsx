"use client";

import AdminLoginForm from "./login-form";

/**
 * Admin login page.
 *
 * NOTE: Previously wrapped <AdminLoginForm /> in <Suspense> because the form
 * consumed useSearchParams(). That triggered BAILOUT_TO_CLIENT_SIDE_RENDERING,
 * so the prerendered HTML only contained the Suspense fallback spinner and
 * the actual form never reached the user (broken admin login).
 *
 * The form now reads callbackUrl from window.location.search inside its submit
 * handler, so useSearchParams is gone, no Suspense is needed, and the form is
 * rendered server-side and shipped in the initial HTML.
 */
export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
