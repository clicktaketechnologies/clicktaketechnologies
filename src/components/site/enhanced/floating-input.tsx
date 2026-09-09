"use client";

/**
 * FloatingInput — floating-label input with:
 *   • Label that floats up on focus / when filled.
 *   • Real-time validation (pass a `validate` function).
 *   • Inline error messages with shake animation.
 *   • Success checkmark draw when valid + touched.
 *   • Character counter (when `maxLength` set).
 *   • Auto-save draft to localStorage (when `draftKey` set).
 *   • Loading state on submit (controlled by parent via `loading`).
 *
 * Fully accessible: proper label/input association, aria-invalid,
 * aria-describedby for error, focus-visible ring.
 *
 * Works for both text inputs and textareas (set `multiline`).
 */

import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FloatingInputStatus = "idle" | "valid" | "invalid";

interface FloatingInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "tel" | "url" | "password";
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
  validate?: (v: string) => string | null; // returns error message or null
  draftKey?: string; // localStorage key for draft auto-save
  loading?: boolean;
  touched?: boolean;
  onBlur?: () => void;
  className?: string;
  helperText?: ReactNode;
}

export const FloatingInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FloatingInputProps
>(function FloatingInput(
  {
    id,
    label,
    value,
    onChange,
    type = "text",
    multiline = false,
    rows = 4,
    required = false,
    maxLength,
    placeholder = "",
    autoComplete,
    validate,
    draftKey,
    loading = false,
    touched: controlledTouched,
    onBlur,
    className,
    helperText,
  },
  fwdRef
) {
  const [focused, setFocused] = useState(false);
  const [internalTouched, setInternalTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const touched = controlledTouched ?? internalTouched;

  // ── Load draft from localStorage on mount ──────────────────
  useEffect(() => {
    if (!draftKey) return;
    try {
      const saved = localStorage.getItem(`draft:${draftKey}`);
      if (saved) {
        onChange(saved);
      }
    } catch {}
    setDraftLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // ── Auto-save draft (debounced via microtask) ─────────────
  useEffect(() => {
    if (!draftKey || !draftLoaded) return;
    try {
      if (value) {
        localStorage.setItem(`draft:${draftKey}`, value);
      } else {
        localStorage.removeItem(`draft:${draftKey}`);
      }
    } catch {}
  }, [draftKey, value, draftLoaded]);

  // ── Validate on value change ──────────────────────────────
  useEffect(() => {
    if (!validate) return;
    const err = validate(value);
    setError(err);
  }, [value, validate]);

  const status: FloatingInputStatus =
    !touched ? "idle" : error ? "invalid" : value ? "valid" : "idle";

  const handleBlur = () => {
    setFocused(false);
    setInternalTouched(true);
    onBlur?.();
  };

  const sharedClass = cn(
    "nx-floating-input peer w-full rounded-xl border bg-input px-4 pt-6 pb-2 text-sm text-foreground transition-all duration-200",
    "placeholder:text-transparent", // hide placeholder; label handles hint
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    "dark:bg-white/5 dark:text-white",
    status === "invalid"
      ? "border-[#FF5252] focus:ring-[#FF5252]/30"
      : status === "valid"
      ? "border-[#00E676] focus:ring-[#00E676]/30"
      : focused
      ? "border-[#FF53A9] focus:ring-[#FF53A9]/30"
      : "border-border hover:border-primary/40 dark:border-white/15 dark:hover:border-white/30",
    loading && "opacity-60 pointer-events-none",
    className
  );

  const labelClass = cn(
    "absolute left-4 transition-all duration-200 pointer-events-none select-none",
    focused || value
      ? "top-2 text-[10px] font-bold uppercase tracking-widest"
      : "top-4 text-sm font-medium",
    status === "invalid"
      ? "text-[#FF8A8A]"
      : status === "valid"
      ? "text-[#00E676]"
      : focused
      ? "text-[#FF8AC4]"
      : "text-muted-foreground dark:text-white/50"
  );

  const inputProps = {
    id,
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: handleBlur,
    placeholder,
    required,
    maxLength,
    autoComplete,
    "aria-invalid": status === "invalid",
    "aria-describedby": error ? `${id}-error` : helperText ? `${id}-helper` : undefined,
    className: sharedClass,
  };

  return (
    <div className="relative">
      {/* Label */}
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="ml-0.5 text-[#FF53A9]">*</span>}
      </label>

      {/* Input / Textarea */}
      {multiline ? (
        <textarea
          {...(inputProps as any)}
          ref={fwdRef as React.Ref<HTMLTextAreaElement>}
          rows={rows}
          className={cn(sharedClass, "resize-none")}
        />
      ) : (
        <input
          {...(inputProps as any)}
          ref={fwdRef as React.Ref<HTMLInputElement>}
          type={type}
          disabled={loading}
        />
      )}

      {/* Status icon (right side) */}
      <div className="absolute right-3 top-4 flex items-center gap-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground dark:text-white/40" />}
        {!loading && status === "valid" && (
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            <Check className="h-4 w-4 text-[#00E676]" />
          </motion.span>
        )}
        {!loading && status === "invalid" && (
          <AlertCircle className="h-4 w-4 text-[#FF5252]" />
        )}
        {/* Char counter */}
        {maxLength && (
          <span
            className={cn(
              "text-[10px] font-mono",
              (value?.length ?? 0) > maxLength * 0.9
                ? "text-[#FFB347]"
                : "text-muted-foreground/60 dark:text-white/30"
            )}
          >
            {value?.length ?? 0}/{maxLength}
          </span>
        )}
      </div>

      {/* Error message with shake */}
      <AnimatePresence>
        {status === "invalid" && error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-[#FF8A8A]"
          >
            <motion.span
              animate={{ x: [0, -3, 3, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="h-3 w-3" />
            </motion.span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Helper text (only when no error) */}
      {status !== "invalid" && helperText && (
        <p id={`${id}-helper`} className="mt-1.5 text-xs text-muted-foreground dark:text-white/40">
          {helperText}
        </p>
      )}
    </div>
  );
});

/* ── Validation helpers (reusable) ──────────────────────────── */

export const validators = {
  email: (v: string) => {
    if (!v) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email address";
  },
  required: (label: string) => (v: string) =>
    v.trim().length === 0 ? `${label} is required` : null,
  minLen: (n: number) => (v: string) =>
    v.length < n ? `Must be at least ${n} characters` : null,
  maxLen: (n: number) => (v: string) =>
    v.length > n ? `Must be at most ${n} characters` : null,
  phone: (v: string) => {
    if (!v) return null;
    return /^[+]?[\d\s\-()]{7,}$/.test(v) ? null : "Enter a valid phone number";
  },
  url: (v: string) => {
    if (!v) return null;
    try {
      new URL(v);
      return null;
    } catch {
      return "Enter a valid URL (https://…)";
    }
  },
};

export default FloatingInput;
