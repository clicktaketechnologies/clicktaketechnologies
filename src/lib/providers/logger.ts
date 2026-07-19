/**
 * Stub logger — most providers run server-side where we can't import log-audit
 * (which depends on prisma). Keep this dependency-free so adapters stay pure.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

function log(level: LogLevel, payload: Record<string, unknown>, msg?: string) {
  const ts = new Date().toISOString();
  const line = `[providers:${level}] ${ts}${msg ? " " + msg : ""} ${JSON.stringify(payload)}`;
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else if (process.env.PROVIDER_DEBUG === "1") console.log(line);
}

export const logger = {
  info: (payload: Record<string, unknown>, msg?: string) => log("info", payload, msg),
  warn: (payload: Record<string, unknown>, msg?: string) => log("warn", payload, msg),
  error: (payload: Record<string, unknown>, msg?: string) => log("error", payload, msg),
  debug: (payload: Record<string, unknown>, msg?: string) => log("debug", payload, msg),
};
