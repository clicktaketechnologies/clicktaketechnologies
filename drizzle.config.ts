// Drizzle Kit config — used by `drizzle-kit generate/push/migrate` for schema
// diffing against the Postgres database. Matches the live Supabase DB.
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || process.env.DIRECT_URL || "",
  },
  verbose: true,
  strict: true,
});
