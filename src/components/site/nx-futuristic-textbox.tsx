'use client'

/**
 * NxFuturisticTextBox — modern, futuristic 3D-style UI component for text boxes.
 *
 * Visual language (driven by .ct-fx-textbox classes in globals.css):
 *   • Layered glass background (translucent gradient + backdrop blur)
 *   • Subtle 3D perspective (rotateX on hover/focus)
 *   • Animated neon gradient border on focus (gradient sweep)
 *   • Floating label that lifts on focus or when filled
 *   • Glow halo on focus
 *
 * Theme-aware:
 *   - In dark/elite mode: deep translucent glass with pink glow.
 *   - In light mode: frosted white glass with pink-deep glow.
 *   - In Elite Mode (.theme-elite): the box gains an extra ambient glow
 *     via the global Elite card overrides (because this element matches
 *     .nx-card / [data-elite-surface] selectors when those classes are
 *     also applied by the consumer).
 *
 * Usage:
 *   <NxFuturisticTextBox label="Your name" name="name" />
 *   <NxFuturisticTextBox label="Message" multiline rows={5} />
 *   <NxFuturisticTextBox label="Email" type="email" required />
 */
import { forwardRef, useId } from "react"

type Props = {
  label: string
  name?: string
  type?: "text" | "email" | "tel" | "url" | "password" | "search"
  multiline?: boolean
  rows?: number
  required?: boolean
  disabled?: boolean
  defaultValue?: string
  placeholder?: string
  className?: string
  /** Optional helper text shown beneath the field */
  helperText?: string
  /** Optional icon prefix (rendered inside the field, left-aligned) */
  icon?: React.ReactNode
  [key: string]: unknown
}

export const NxFuturisticTextBox = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  function NxFuturisticTextBox(
    {
      label,
      name,
      type = "text",
      multiline = false,
      rows = 4,
      required = false,
      disabled = false,
      defaultValue,
      placeholder = " ",
      className = "",
      helperText,
      icon,
      ...rest
    },
    ref,
  ) {
    // Stable unique id so label can be associated with the field for a11y.
    const reactId = useId()
    const fieldId = `ct-fx-${name || reactId}`

    // An explicit placeholder char is required because the floating-label
    // CSS uses :placeholder-shown to detect an empty field. If the user
    // passes their own placeholder it still works; if not, we use a single
    // space so :placeholder-shown is true until the user types.
    const sharedProps = {
      id: fieldId,
      name,
      required,
      disabled,
      defaultValue,
      placeholder,
      className: "ct-fx-textbox-field w-full",
      "aria-label": label,
      ...rest,
    } as const

    return (
      <div className={`ct-fx-textbox ${className}`} data-multiline={multiline ? "true" : "false"}>
        <div className="ct-fx-textbox-inner relative">
          {/* Optional icon — sits left of the input text */}
          {icon && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              style={{ zIndex: 2 }}
            >
              {icon}
            </span>
          )}

          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              {...(sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              style={icon ? { paddingLeft: "2.5rem" } : undefined}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              {...(sharedProps as React.InputHTMLAttributes<HTMLInputElement>)}
              style={icon ? { paddingLeft: "2.5rem" } : undefined}
            />
          )}

          <label htmlFor={fieldId} className="ct-fx-textbox-label">
            {label}
            {required && <span className="ml-0.5 text-pink-500">*</span>}
          </label>

          {/* Animated gradient sweep — visible only on focus */}
          <span className="ct-fx-textbox-border-sweep" aria-hidden />
        </div>

        {helperText && (
          <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{helperText}</p>
        )}
      </div>
    )
  },
)

export default NxFuturisticTextBox
