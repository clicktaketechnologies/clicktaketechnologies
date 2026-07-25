-- ─────────────────────────────────────────────────────────────────────────────
-- Phase 3 #2 — In-Admin LLM Page Creation
-- Adds the deep_dive column to the services table.
--
-- This is an idempotent migration: safe to run multiple times.
-- Apply with: psql "$DATABASE_URL" -f scripts/migrate-add-deep-dive-column.sql
-- Or paste into Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS deep_dive text DEFAULT '{}';

COMMENT ON COLUMN services.deep_dive IS
  'Phase 3 #2 — JSON-stringified DeepDiveContent blob from the Master Copywriting prompt (In-Admin LLM Page Creation). Empty for legacy hand-authored pages.';
