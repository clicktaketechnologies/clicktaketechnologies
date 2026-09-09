"use client";

/**
 * <ErrorBoundary> — generic, reusable React error boundary.
 *
 * ────────────────────────────────────────────────────────────────────────
 * WHY THIS EXISTS
 * ────────────────────────────────────────────────────────────────────────
 * The codebase already has a root `src/app/error.tsx` for route-level
 * errors, but it replaces the entire page subtree. For the live-stats
 * badges we want a *localised* fallback — if the GitHub fetch crashes
 * or the badge component throws, we want to render the static fallback
 * value in place of the badge, NOT blow away the entire Hero.
 *
 * This boundary wraps each `<LiveStatBadge>` and renders the `fallback`
 * prop when the child subtree throws during render, commit, or in an
 * effect. The error is logged to console so server-side monitoring can
 * capture it later, but the visitor sees a seamless fallback.
 *
 * ────────────────────────────────────────────────────────────────────────
 * USAGE
 * ────────────────────────────────────────────────────────────────────────
 * ```tsx
 * <ErrorBoundary fallback={<StaticBadge value="98%" label="Test coverage" />}>
 *   <LiveStatBadge statKey="coverage" />
 * </ErrorBoundary>
 * ```
 *
 * The `fallback` is rendered as a stable element (no re-render cycle),
 * so the boundary doesn't repeatedly try to recover and crash again.
 */

import { Component, type ReactNode } from "react";

type Props = {
  /** Rendered when the child throws. */
  fallback: ReactNode;
  /** Optional callback for logging — defaults to console.error. */
  onError?: (error: Error, info: React.ErrorInfo) => void;
  children: ReactNode;
};

type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, info);
    } else {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary] caught:", error, info.componentStack);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
    // Note: we intentionally don't pass `this.state.error` to the fallback.
    // The fallback is a presentational element that knows nothing about
    // the error type — that's by design, so the boundary can wrap any
    // component without coupling the fallback to the child's error shape.
  }
}
