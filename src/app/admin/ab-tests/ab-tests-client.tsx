"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  X,
  Loader2,
  Play,
  Pause,
  CheckCircle2,
  BarChart3,
  FlaskConical,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Trophy,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────────────────
type Variant = {
  id: string;
  key: string;
  label: string | null;
  weight: number;
  isControl: boolean;
  exposures?: number;
  conversions?: number;
};

type Experiment = {
  id: string;
  key: string;
  name: string;
  hypothesis: string | null;
  pagePattern: string | null;
  status: string;
  primaryMetric: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  variants: Variant[];
};

type Props = {
  initialExperiments: Experiment[];
  canWrite: boolean;
};

// ─── Status badge colors ────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  draft:     { bg: "bg-muted/40",          text: "text-muted-foreground", label: "Draft" },
  running:   { bg: "bg-emerald-500/15",    text: "text-emerald-400",      label: "Running" },
  paused:    { bg: "bg-amber-500/15",      text: "text-amber-400",        label: "Paused" },
  completed: { bg: "bg-blue-500/15",       text: "text-blue-400",         label: "Completed" },
};

// ─── Component ───────────────────────────────────────────────────────────────
export function AbTestsClient({ initialExperiments, canWrite }: Props) {
  const [experiments, setExperiments] = useState<Experiment[]>(initialExperiments);
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState<Experiment | null>(null);

  // Refresh from server after mutations
  const refresh = useCallback(async () => {
    const r = await fetch("/api/admin/ab-tests", { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      setExperiments(data.experiments);
    }
  }, []);

  // ─── Create dialog ───────────────────────────────────────────────────────
  if (creating) {
    return (
      <CreateExperimentDialog
        onClose={() => setCreating(false)}
        onCreated={() => {
          setCreating(false);
          refresh();
          toast.success("Experiment created");
        }}
      />
    );
  }

  // ─── Results view ────────────────────────────────────────────────────────
  if (viewing) {
    return (
      <ResultsView
        experiment={viewing}
        onBack={() => setViewing(null)}
        canWrite={canWrite}
        onChanged={refresh}
      />
    );
  }

  // ─── List view ───────────────────────────────────────────────────────────
  const runningCount = experiments.filter((e) => e.status === "running").length;
  const totalExposures = experiments.reduce(
    (s, e) => s + e.variants.reduce((s2, v) => s2 + (v.exposures || 0), 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FlaskConical className="size-6 text-brand-pink" />
            A/B Experiments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test CTA copy, layouts, and conversion flows. Statistical significance computed via two-proportion Z-test (α = 0.05).
          </p>
        </div>
        {canWrite && (
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90"
          >
            <Plus className="size-4" /> New Experiment
          </button>
        )}
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Experiments", value: experiments.length, tone: "text-foreground" },
          { label: "Running Now", value: runningCount, tone: "text-emerald-400" },
          { label: "Total Exposures", value: totalExposures.toLocaleString(), tone: "text-blue-400" },
          { label: "Variants Tracked", value: experiments.reduce((s, e) => s + e.variants.length, 0), tone: "text-purple-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-2xl font-bold ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {experiments.length === 0 && (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/20 p-12 text-center">
          <FlaskConical className="mx-auto size-8 text-muted-foreground/50" />
          <h3 className="mt-3 text-lg font-semibold">No experiments yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first A/B test to start optimizing CTAs.
          </p>
          {canWrite && (
            <button
              onClick={() => setCreating(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90"
            >
              <Plus className="size-4" /> Create Experiment
            </button>
          )}
        </div>
      )}

      {/* Experiment list */}
      <div className="space-y-3">
        {experiments.map((exp) => {
          const totalExp = exp.variants.reduce((s, v) => s + (v.exposures || 0), 0);
          const totalConv = exp.variants.reduce((s, v) => s + (v.conversions || 0), 0);
          const style = STATUS_STYLES[exp.status] || STATUS_STYLES.draft;
          return (
            <div
              key={exp.id}
              className="group rounded-xl border border-border/60 bg-card/40 p-4 hover:border-border/100 hover:bg-card/60 transition cursor-pointer"
              onClick={() => setViewing(exp)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{exp.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                    <code className="text-[10px] text-muted-foreground font-mono">{exp.key}</code>
                  </div>
                  {exp.hypothesis && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      <span className="text-muted-foreground/60">Hypothesis:</span> {exp.hypothesis}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      <span className="text-foreground font-semibold">{exp.variants.length}</span> variants
                    </span>
                    <span>
                      <span className="text-foreground font-semibold">{totalExp.toLocaleString()}</span> exposures
                    </span>
                    <span>
                      <span className="text-foreground font-semibold">{totalConv.toLocaleString()}</span> conversions
                    </span>
                    {totalExp > 0 && (
                      <span>
                        <span className="text-emerald-400 font-semibold">
                          {((totalConv / totalExp) * 100).toFixed(2)}%
                        </span>{" "}
                        overall rate
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Create Experiment Dialog ────────────────────────────────────────────────
function CreateExperimentDialog({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [pagePattern, setPagePattern] = useState("/");
  const [primaryMetric, setPrimaryMetric] = useState("lead_submit");
  const [variants, setVariants] = useState<Variant[]>([
    { id: "", key: "A", label: "Control", weight: 50, isControl: true },
    { id: "", key: "B", label: "Treatment", weight: 50, isControl: false },
  ]);
  const [saving, setSaving] = useState(false);

  const totalWeight = variants.reduce((s, v) => s + v.weight, 0);

  const addVariant = () => {
    const nextKey = String.fromCharCode(65 + variants.length); // A, B, C, ...
    setVariants([...variants, { id: "", key: nextKey, label: "", weight: 25, isControl: false }]);
  };

  const removeVariant = (idx: number) => {
    if (variants.length <= 2) return;
    const v = variants[idx];
    if (v.isControl) {
      toast.error("Cannot delete the control variant");
      return;
    }
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const setControl = (idx: number) => {
    setVariants(variants.map((v, i) => ({ ...v, isControl: i === idx })));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!/^[a-z0-9-]{3,64}$/.test(key)) {
      toast.error("Key must be 3-64 chars, lowercase, digits, and hyphens only");
      return;
    }
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }
    if (variants.filter((v) => v.isControl).length !== 1) {
      toast.error("Exactly one variant must be marked as control");
      return;
    }
    if (totalWeight <= 0) {
      toast.error("At least one variant must have weight > 0");
      return;
    }

    setSaving(true);
    try {
      const r = await fetch("/api/admin/ab-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          name: name.trim(),
          hypothesis: hypothesis.trim() || null,
          pagePattern,
          primaryMetric,
          variants: variants.map((v) => ({
            key: v.key,
            label: v.label || null,
            weight: v.weight,
            isControl: v.isControl,
            payload: {},
          })),
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        toast.error(data.error || "Failed to create experiment");
        return;
      }
      onCreated();
    } catch (err) {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">New Experiment</h1>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Key + Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
              Experiment Key <span className="text-red-400">*</span>
            </label>
            <input
              value={key}
              onChange={(e) => setKey(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
              placeholder="hero-cta-text"
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm font-mono outline-none focus:border-brand-pink"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Used in code: <code className="text-brand-pink/80">&lt;AbTest experimentKey=&quot;{key || "hero-cta-text"}&quot;&gt;</code>
            </p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
              Display Name <span className="text-red-400">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hero CTA Copy Test"
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-pink"
            />
          </div>
        </div>

        {/* Hypothesis */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            Hypothesis
          </label>
          <textarea
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder="Changing the CTA copy from 'Book Free Consultation' to 'Get Your Free Audit' will increase lead form submissions by at least 15%."
            rows={3}
            className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-pink resize-none"
          />
        </div>

        {/* Page pattern + metric */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
              Page Pattern
            </label>
            <input
              value={pagePattern}
              onChange={(e) => setPagePattern(e.target.value)}
              placeholder="/"
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm font-mono outline-none focus:border-brand-pink"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">Path prefix where the test runs.</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
              Primary Metric
            </label>
            <select
              value={primaryMetric}
              onChange={(e) => setPrimaryMetric(e.target.value)}
              className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-pink"
            >
              <option value="lead_submit">Lead Form Submit</option>
              <option value="consultation_booked">Consultation Booked</option>
              <option value="signup">Account Signup</option>
            </select>
          </div>
        </div>

        {/* Variants editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">
              Variants <span className="text-red-400">*</span>
            </label>
            <div className="text-[11px] text-muted-foreground">
              Total weight: <span className={totalWeight === 100 ? "text-emerald-400" : "text-amber-400"}>{totalWeight}</span>
              {totalWeight !== 100 && " (does not need to sum to 100 — weights are relative)"}
            </div>
          </div>
          <div className="space-y-2">
            {variants.map((v, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 p-2">
                <button
                  onClick={() => setControl(idx)}
                  className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold ${
                    v.isControl ? "bg-brand-pink/20 text-brand-pink" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                  title={v.isControl ? "Control variant" : "Click to make this the control"}
                >
                  {v.isControl ? "CTRL" : "—"}
                </button>
                <input
                  value={v.key}
                  onChange={(e) => {
                    const newKey = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
                    const next = [...variants];
                    next[idx] = { ...v, key: newKey };
                    setVariants(next);
                  }}
                  className="w-14 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-sm font-mono text-center outline-none focus:border-brand-pink"
                  placeholder="A"
                />
                <input
                  value={v.label || ""}
                  onChange={(e) => {
                    const next = [...variants];
                    next[idx] = { ...v, label: e.target.value };
                    setVariants(next);
                  }}
                  placeholder="Human-readable label (e.g. 'Control: Book Free Consultation')"
                  className="flex-1 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-sm outline-none focus:border-brand-pink"
                />
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={v.weight}
                  onChange={(e) => {
                    const w = Math.max(0, parseInt(e.target.value) || 0);
                    const next = [...variants];
                    next[idx] = { ...v, weight: w };
                    setVariants(next);
                  }}
                  className="w-16 rounded-md border border-border/60 bg-background/60 px-2 py-1 text-sm text-right outline-none focus:border-brand-pink"
                />
                <span className="text-[11px] text-muted-foreground">wgt</span>
                <button
                  onClick={() => removeVariant(idx)}
                  disabled={variants.length <= 2}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addVariant}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-brand-pink hover:text-brand-pink/80"
          >
            <Plus className="size-3.5" /> Add variant
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-pink px-4 py-2 text-sm font-medium text-white hover:bg-brand-pink/90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
            Create Experiment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Results View ────────────────────────────────────────────────────────────
function ResultsView({
  experiment,
  onBack,
  canWrite,
  onChanged,
}: {
  experiment: Experiment;
  onBack: () => void;
  canWrite: boolean;
  onChanged: () => void;
}) {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/ab-tests/${experiment.id}/results`, { cache: "no-store" });
      if (r.ok) {
        const data = await r.json();
        setResults(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [experiment.id]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const changeStatus = async (newStatus: string) => {
    const r = await fetch(`/api/admin/ab-tests/${experiment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "status", status: newStatus }),
    });
    const data = await r.json();
    if (!r.ok) {
      toast.error(data.error || "Failed to change status");
      return;
    }
    toast.success(`Status: ${newStatus}`);
    onChanged();
    fetchResults();
  };

  const deleteExperiment = async () => {
    if (!confirm(`Delete experiment "${experiment.name}"? This deletes all variants and assignment data.`)) return;
    const r = await fetch(`/api/admin/ab-tests/${experiment.id}`, { method: "DELETE" });
    if (r.ok) {
      toast.success("Experiment deleted");
      onChanged();
      onBack();
    } else {
      toast.error("Failed to delete");
    }
  };

  // ─── Loading state ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="size-8 animate-spin text-brand-pink" />
      </div>
    );
  }

  // ─── Layout ──────────────────────────────────────────────────────────────
  const style = STATUS_STYLES[experiment.status] || STATUS_STYLES.draft;
  const summary = results?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={onBack}
            className="mt-1 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{experiment.name}</h1>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${style.bg} ${style.text}`}>
                {style.label}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <code className="font-mono">{experiment.key}</code>
              <span>•</span>
              <span>{experiment.variants.length} variants</span>
              {summary?.daysRunning > 0 && (
                <>
                  <span>•</span>
                  <span>{summary.daysRunning} days running</span>
                </>
              )}
            </div>
            {experiment.hypothesis && (
              <p className="mt-2 text-sm text-muted-foreground italic">
                &ldquo;{experiment.hypothesis}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Status controls */}
        {canWrite && (
          <div className="flex items-center gap-2">
            {experiment.status === "draft" && (
              <button
                onClick={() => changeStatus("running")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/25"
              >
                <Play className="size-3.5" /> Start
              </button>
            )}
            {experiment.status === "running" && (
              <button
                onClick={() => changeStatus("paused")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-400 hover:bg-amber-500/25"
              >
                <Pause className="size-3.5" /> Pause
              </button>
            )}
            {experiment.status === "paused" && (
              <button
                onClick={() => changeStatus("running")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/25"
              >
                <Play className="size-3.5" /> Resume
              </button>
            )}
            {(experiment.status === "running" || experiment.status === "paused") && (
              <button
                onClick={() => changeStatus("completed")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/25"
              >
                <CheckCircle2 className="size-3.5" /> Complete
              </button>
            )}
            <button
              onClick={deleteExperiment}
              className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
              title="Delete experiment"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Summary cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Total Exposures</div>
            <div className="mt-1 text-2xl font-bold text-blue-400">{summary.totalExposures.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Total Conversions</div>
            <div className="mt-1 text-2xl font-bold text-emerald-400">{summary.totalConversions.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Overall Rate</div>
            <div className="mt-1 text-2xl font-bold text-foreground">{summary.overallConversionRateFormatted}</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Days Running</div>
            <div className="mt-1 text-2xl font-bold text-foreground">{summary.daysRunning}</div>
          </div>
        </div>
      )}

      {/* Recommendation banner */}
      {summary && (
        <div
          className={`rounded-xl border p-4 ${
            summary.recommendationTone === "positive"
              ? "border-emerald-500/30 bg-emerald-500/5"
              : summary.recommendationTone === "negative"
              ? "border-red-500/30 bg-red-500/5"
              : summary.recommendationTone === "warning"
              ? "border-amber-500/30 bg-amber-500/5"
              : "border-border/60 bg-card/40"
          }`}
        >
          <div className="flex items-start gap-3">
            {summary.recommendationTone === "positive" ? (
              <Trophy className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : summary.recommendationTone === "negative" ? (
              <TrendingDown className="size-5 text-red-400 shrink-0 mt-0.5" />
            ) : summary.recommendationTone === "warning" ? (
              <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <BarChart3 className="size-5 text-blue-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Recommendation</div>
              <p className="text-sm">{summary.recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Per-variant results table */}
      {results?.variants && (
        <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
            <BarChart3 className="size-4 text-brand-pink" />
            <h2 className="text-sm font-semibold">Per-Variant Results</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border/60 bg-muted/20 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5">Variant</th>
                  <th className="px-4 py-2.5 text-right">Exposures</th>
                  <th className="px-4 py-2.5 text-right">Conversions</th>
                  <th className="px-4 py-2.5 text-right">Rate</th>
                  <th className="px-4 py-2.5 text-right">Lift</th>
                  <th className="px-4 py-2.5 text-right">p-value</th>
                  <th className="px-4 py-2.5">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {results.variants.map((v: any) => (
                  <tr key={v.id} className="border-b border-border/40 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs bg-muted/40 px-1.5 py-0.5 rounded">{v.key}</code>
                        {v.isControl && (
                          <span className="text-[10px] text-brand-pink bg-brand-pink/15 px-1.5 py-0.5 rounded">CONTROL</span>
                        )}
                        {v.label && (
                          <span className="text-xs text-muted-foreground truncate max-w-xs">{v.label}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">{v.exposures.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono">{v.conversions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">{v.conversionRateFormatted}</td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span
                        className={
                          v.liftPercent === null
                            ? "text-muted-foreground"
                            : v.liftPercent > 0
                            ? "text-emerald-400"
                            : v.liftPercent < 0
                            ? "text-red-400"
                            : ""
                        }
                      >
                        {v.liftPercentFormatted}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{v.pValueFormatted}</td>
                    <td className="px-4 py-3">
                      <VerdictBadge classification={v.classification} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Daily time-series chart (simple bars) */}
      {results?.timeseries?.days?.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
            <TrendingUp className="size-4 text-brand-pink" />
            <h2 className="text-sm font-semibold">Daily Exposures (Last {results.timeseries.days.length} days)</h2>
          </div>
          <div className="p-4">
            <TimeSeriesChart
              days={results.timeseries.days}
              series={results.timeseries.series}
            />
          </div>
        </div>
      )}

      {/* How significance is computed */}
      <details className="rounded-xl border border-border/60 bg-card/40 p-4">
        <summary className="cursor-pointer text-sm font-medium">How is significance computed?</summary>
        <div className="mt-3 text-xs text-muted-foreground space-y-2 leading-relaxed">
          <p>
            We use a <strong>two-proportion Z-test</strong> with pooled variance under the null hypothesis.
            Each variant is compared against the control. The Z-score is computed as:
          </p>
          <pre className="rounded-md bg-muted/40 p-3 font-mono text-[11px] overflow-x-auto">
{`Z = (p_variant - p_control) / SE_pooled
SE_pooled = sqrt(p_pooled × (1 - p_pooled) × (1/n_v + 1/n_c))
p_pooled  = (c_v + c_c) / (n_v + n_c)`}
          </pre>
          <p>
            The <strong>p-value</strong> is two-tailed. We declare a variant <strong>significant</strong> when
            p &lt; 0.05 AND both arms have ≥30 exposures. The 95% confidence interval on the lift uses the
            unpooled standard error (the correct standard for CIs, vs pooled SE for the test statistic).
          </p>
          <p className="text-amber-400/80">
            Note: A/B testing is best-effort. Edge effects (returning visitors, bot traffic, cookie
            deletion) can bias results. Always sanity-check the underlying numbers before promoting a variant.
          </p>
        </div>
      </details>
    </div>
  );
}

// ─── Verdict Badge ───────────────────────────────────────────────────────────
function VerdictBadge({ classification }: { classification: string }) {
  const styles: Record<string, { bg: string; text: string; label: string; icon: any }> = {
    control:           { bg: "bg-muted/40",            text: "text-muted-foreground", label: "Control",      icon: null },
    not_enough_data:   { bg: "bg-muted/30",            text: "text-muted-foreground", label: "Need data",    icon: AlertTriangle },
    inconclusive:      { bg: "bg-amber-500/15",        text: "text-amber-400",        label: "Inconclusive", icon: AlertTriangle },
    winner:            { bg: "bg-emerald-500/15",      text: "text-emerald-400",      label: "Winner",       icon: Trophy },
    loser:             { bg: "bg-red-500/15",          text: "text-red-400",          label: "Loser",        icon: TrendingDown },
  };
  const s = styles[classification] || styles.inconclusive;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${s.bg} ${s.text}`}>
      {Icon && <Icon className="size-3" />}
      {s.label}
    </span>
  );
}

// ─── Simple Time-Series Chart (no external chart lib) ───────────────────────
function TimeSeriesChart({
  days,
  series,
}: {
  days: string[];
  series: Array<{ variantKey: string; isControl: boolean; exposures: number[]; conversions: number[] }>;
}) {
  // Show last 30 days max
  const slicedDays = days.slice(-30);
  const slicedSeries = series.map((s) => ({
    ...s,
    exposures: s.exposures.slice(-30),
    conversions: s.conversions.slice(-30),
  }));
  const maxVal = Math.max(1, ...slicedSeries.flatMap((s) => s.exposures));
  const colors = ["#FF53A9", "#136DFF", "#9B3DFF", "#22c55e", "#f59e0b"];
  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        {slicedSeries.map((s, i) => (
          <div key={s.variantKey} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: colors[i % colors.length] }}
            />
            <span className="font-mono">{s.variantKey}</span>
            {s.isControl && <span className="text-[10px] text-muted-foreground">(control)</span>}
          </div>
        ))}
      </div>
      {/* Bar chart — stacked side-by-side per day */}
      <div className="flex items-end gap-px h-32 overflow-x-auto">
        {slicedDays.map((d, dayIdx) => (
          <div key={d} className="flex flex-col items-center gap-0.5 min-w-[14px]">
            <div className="flex items-end gap-px h-full">
              {slicedSeries.map((s, i) => {
                const val = s.exposures[dayIdx] || 0;
                const heightPct = (val / maxVal) * 100;
                return (
                  <div
                    key={s.variantKey}
                    title={`${d} • ${s.variantKey}: ${val} exposures`}
                    className="w-1.5 rounded-t-sm transition-all hover:w-2"
                    style={{
                      height: `${Math.max(2, heightPct)}%`,
                      background: colors[i % colors.length],
                      opacity: val === 0 ? 0.2 : 1,
                    }}
                  />
                );
              })}
            </div>
            {(dayIdx % 7 === 0 || dayIdx === slicedDays.length - 1) && (
              <div className="text-[9px] text-muted-foreground font-mono">{d.slice(5)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
