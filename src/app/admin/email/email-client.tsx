"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Send, Plus, Trash2, Edit3, X, Save, Loader2, FileText, AlertCircle, CheckCircle2,
  Server, Activity, Zap, ShieldCheck, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type Template = {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  category: string;
  variables: string[];
  updatedAt: string;
};

type Log = {
  id: string;
  type: string;
  toEmail: string;
  subject: string | null;
  status: string;
  error: string | null;
  createdAt: string;
};

type ProviderInfo = {
  id: string;
  providerId: string;
  displayName: string;
  isActive: boolean;
  priority: number;
  supportedFeatures: string[];
  isLive: boolean;
  health: {
    status: string;
    latencyMs: number | null;
    lastCheckedAt: string;
    lastError: string | null;
    cooldownUntil: string | null;
  } | null;
};

type EmailLog = {
  id: string;
  providerId: string;
  messageId: string | null;
  toAddress: string;
  subject: string;
  status: string;
  errorMessage: string | null;
  sentAt: string;
};

type Props = {
  templates: Template[];
  logs: Log[];
  canWrite: boolean;
  providers: ProviderInfo[];
  emailLogs: EmailLog[];
};

export function EmailClient({ templates, logs, canWrite, providers, emailLogs }: Props) {
  const [tab, setTab] = useState<"providers" | "templates" | "test" | "logs">("providers");
  const [editing, setEditing] = useState<Template | null>(null);
  const [creating, setCreating] = useState(false);

  const activeCount = providers.filter((p) => p.isActive).length;
  const healthyCount = providers.filter((p) => p.isActive && p.health?.status === "healthy").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Center</h1>
          <p className="text-sm text-muted-foreground">
            Multi-provider email with automatic failover. {activeCount} active provider{activeCount !== 1 ? "s" : ""}, {healthyCount} healthy.
          </p>
        </div>
        <a
          href="/admin/providers"
          className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Server className="size-3.5" />
          Manage providers →
        </a>
      </div>

      <div className="flex w-fit flex-wrap rounded-lg border border-border/60 bg-card/40 p-1">
        {[
          { id: "providers", label: "Provider Chain", icon: Zap },
          { id: "templates", label: "Templates", icon: FileText },
          { id: "test", label: "Test Send", icon: Send },
          { id: "logs", label: "Email Logs", icon: Mail },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm transition-colors ${tab === t.id ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="size-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "providers" && <ProviderChainPanel providers={providers} />}

      {tab === "templates" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            {canWrite && (
              <button onClick={() => setCreating(true)} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90">
                <Plus className="size-4" /> New Template
              </button>
            )}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {templates.map((t) => (
              <Card key={t.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{t.name}</h3>
                    <p className="text-xs text-muted-foreground">{t.subject}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="rounded-md bg-brand-blue/10 px-2 py-0.5 text-[10px] text-brand-blue">{t.category}</span>
                      {t.variables.slice(0, 3).map((v) => (
                        <span key={v} className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{`{${v}}`}</span>
                      ))}
                      {t.variables.length > 3 && <span className="text-[10px] text-muted-foreground">+{t.variables.length - 3}</span>}
                    </div>
                  </div>
                  {canWrite && (
                    <div className="flex gap-1">
                      <button onClick={() => setEditing(t)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Edit3 className="size-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete "${t.name}"?`)) return;
                          const res = await fetch("/api/admin/emails", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ action: "delete_template", id: t.id }),
                          });
                          if (res.ok) { toast.success("Deleted"); window.location.reload(); }
                        }}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "test" && <TestSender providers={providers} />}

      {tab === "logs" && (
        <div className="space-y-4">
          {/* New provider-chain logs (EmailLog table) */}
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Zap className="size-3.5" /> Provider Chain Logs (EmailLog)
              </h3>
              <Badge variant="outline" className="text-[10px]">{emailLogs.length} recent</Badge>
            </div>
            <table className="w-full text-sm">
              <thead className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">To</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {emailLogs.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No provider-chain sends yet. Submit the contact form or use Test Send.</td></tr>
                ) : (
                  emailLogs.map((l) => (
                    <tr key={l.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-[10px]">{l.providerId}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs">{l.toAddress}</td>
                      <td className="px-4 py-3 text-xs">{l.subject || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-xs ${l.status === "sent" ? "text-emerald-500" : "text-red-500"}`}>
                          {l.status === "sent" ? <CheckCircle2 className="size-3" /> : <AlertCircle className="size-3" />}
                          {l.status}
                        </span>
                        {l.errorMessage && <div className="mt-0.5 text-[10px] text-red-500">{l.errorMessage}</div>}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.sentAt).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>

          {/* Legacy smtpLog entries */}
          {logs.length > 0 && (
            <Card className="overflow-hidden p-0">
              <div className="border-b border-border/60 bg-muted/30 px-4 py-2">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Mail className="size-3.5" /> Legacy SMTP Logs
                </h3>
              </div>
              <table className="w-full text-sm">
                <thead className="border-b border-border/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">To</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3 text-xs uppercase">{l.type}</td>
                      <td className="px-4 py-3 text-xs">{l.toEmail}</td>
                      <td className="px-4 py-3 text-xs">{l.subject || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-xs ${l.status === "sent" ? "text-emerald-500" : "text-red-500"}`}>
                          {l.status === "sent" ? <CheckCircle2 className="size-3" /> : <AlertCircle className="size-3" />}
                          {l.status}
                        </span>
                        {l.error && <div className="mt-0.5 text-[10px] text-red-500">{l.error}</div>}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      )}

      <AnimatePresence>
        {(editing || creating) && (
          <TemplateEditorModal
            template={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSaved={() => { setEditing(null); setCreating(false); window.location.reload(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TemplateEditorModal({ template, onClose, onSaved }: { template: Template | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(template?.name || "");
  const [subject, setSubject] = useState(template?.subject || "");
  const [htmlContent, setHtmlContent] = useState(template?.htmlContent || "");
  const [category, setCategory] = useState(template?.category || "general");
  const [variables, setVariables] = useState((template?.variables || []).join(", "));
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name || !subject || !htmlContent) return toast.error("All fields required");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: template ? "update_template" : "create_template",
          ...(template ? { id: template.id } : {}),
          name, subject, htmlContent, category,
          variables: variables.split(",").map((v) => v.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        toast.success(template ? "Template updated" : "Template created");
        onSaved();
      } else {
        toast.error("Failed");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{template ? "Edit template" : "Create template"}</h2>
          <button onClick={onClose} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue">
                <option value="general">General</option>
                <option value="inquiry">Inquiry</option>
                <option value="booking">Booking</option>
                <option value="newsletter">Newsletter</option>
                <option value="internal">Internal</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Variables (comma-separated, e.g. name, email, date)</label>
            <input value={variables} onChange={(e) => setVariables(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">HTML Content</label>
            <div className="mt-1"><RichTextEditor content={htmlContent} onChange={setHtmlContent} /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} className="rounded-lg border border-border/60 px-4 py-2 text-sm hover:bg-muted">Cancel</button>
            <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Save
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TestSender({ providers }: { providers: ProviderInfo[] }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test from ClickTake Admin");
  const [html, setHtml] = useState("<p>Hello,</p><p>This is a test email from the ClickTake admin portal.</p>");
  const [providerId, setProviderId] = useState<string>("auto");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; providerId?: string; messageId?: string; error?: string } | null>(null);

  const activeProviders = providers.filter((p) => p.isActive);

  const send = async () => {
    if (!to || !subject || !html) return toast.error("All fields required");
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/email/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, html, providerId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`✓ Sent via ${data.providerId || "chain"}`);
        setResult({ ok: true, providerId: data.providerId, messageId: data.messageId });
      } else {
        toast.error(data.error || "Failed");
        setResult({ ok: false, providerId: data.providerId, error: data.error });
      }
    } catch (err: any) {
      toast.error(err.message);
      setResult({ ok: false, error: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold">Send test email</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">To</label>
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@example.com" className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Provider</label>
          <select
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue"
          >
            <option value="auto">Automatic (use failover chain — recommended)</option>
            {activeProviders.map((p) => (
              <option key={p.id} value={p.providerId} disabled={!p.isLive}>
                {p.displayName} {p.health?.status === "healthy" ? "✓" : p.health?.status === "degraded" ? "⚠" : "✗"} {!p.isLive ? "(not loaded)" : ""}
              </option>
            ))}
          </select>
          {activeProviders.length === 0 && (
            <p className="mt-1 text-[10px] text-yellow-500">
              No active email providers configured. Send will be logged to console only.
              <a href="/admin/providers" className="ml-1 underline">Configure providers →</a>
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Subject</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">HTML body</label>
          <div className="mt-1"><RichTextEditor content={html} onChange={setHtml} /></div>
        </div>
        {result && (
          <div className={`rounded-lg border p-3 text-xs ${result.ok ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700" : "border-red-500/30 bg-red-500/5 text-red-700"}`}>
            {result.ok ? (
              <div>
                <strong>✓ Sent successfully</strong>
                <div className="mt-1 text-muted-foreground">Provider: {result.providerId} · Message ID: <code>{result.messageId}</code></div>
              </div>
            ) : (
              <div>
                <strong>✗ Send failed</strong>
                {result.providerId && <div className="mt-1 text-muted-foreground">Provider: {result.providerId}</div>}
                <div className="mt-1">{result.error}</div>
              </div>
            )}
          </div>
        )}
        <button onClick={send} disabled={sending} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90 disabled:opacity-50">
          {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Send test
        </button>
      </div>
    </Card>
  );
}

function ProviderChainPanel({ providers }: { providers: ProviderInfo[] }) {
  const active = providers.filter((p) => p.isActive).sort((a, b) => a.priority - b.priority);
  const inactive = providers.filter((p) => !p.isActive);

  if (providers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Zap className="mx-auto mb-3 size-8 text-muted-foreground" />
        <h3 className="text-sm font-semibold">No email providers configured</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          The email system is running in dev mode (logs to console only). Configure at least one provider to start sending real emails.
        </p>
        <a href="/admin/providers" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90">
          <Plus className="size-4" /> Add Provider
        </a>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="size-4 text-brand-blue" />
            Active Failover Chain
          </h3>
          <Badge variant="outline" className="text-[10px]">{active.length} active</Badge>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          When an email is sent, the system tries each provider in order (top to bottom). If a provider fails, the next one is tried automatically. After 5 errors in 5 minutes, a provider enters 10-minute cooldown.
        </p>
        <div className="space-y-2">
          {active.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border/40 p-3">
              <div className="flex size-7 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-bold text-brand-blue">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{p.displayName}</span>
                  <Badge variant="outline" className="text-[10px]">{p.providerId}</Badge>
                  {!p.isLive && <Badge className="bg-yellow-500/10 text-yellow-600 text-[10px]">Not loaded</Badge>}
                  {p.health?.status === "healthy" && (
                    <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">
                      <CheckCircle2 className="mr-0.5 size-2.5" /> Healthy {p.health.latencyMs != null && `· ${p.health.latencyMs}ms`}
                    </Badge>
                  )}
                  {p.health?.status === "degraded" && (
                    <Badge className="bg-yellow-500/10 text-yellow-600 text-[10px]">
                      <AlertCircle className="mr-0.5 size-2.5" /> Degraded
                    </Badge>
                  )}
                  {p.health?.status === "down" && (
                    <Badge className="bg-red-500/10 text-red-600 text-[10px]">
                      <AlertCircle className="mr-0.5 size-2.5" /> Down
                    </Badge>
                  )}
                  {p.health?.cooldownUntil && new Date(p.health.cooldownUntil) > new Date() && (
                    <Badge className="bg-red-500/10 text-red-600 text-[10px]">
                      Cooldown until {new Date(p.health.cooldownUntil).toLocaleTimeString()}
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.supportedFeatures.map((f) => (
                    <span key={f} className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">{f}</span>
                  ))}
                </div>
                {p.health?.lastError && (
                  <div className="mt-1 text-[10px] text-red-500">Last error: {p.health.lastError}</div>
                )}
              </div>
              {idx < active.length - 1 && (
                <ArrowRight className="size-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {inactive.length > 0 && (
        <Card className="p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disabled providers</h3>
          <div className="flex flex-wrap gap-2">
            {inactive.map((p) => (
              <Badge key={p.id} variant="secondary" className="text-[10px]">
                {p.displayName}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="size-4 mt-0.5 text-brand-blue" />
          <div className="text-xs text-muted-foreground">
            <strong className="text-foreground">How failover works:</strong> Every outbound email (contact form, lead notifications, test sends) flows through this chain. The system tries provider #1 first. If it returns an error or times out (10s), the system immediately tries provider #2, and so on. All attempts are logged to the <code>EmailLog</code> table for audit. Provider credentials are encrypted at rest with AES-256-GCM.
          </div>
        </div>
      </Card>
    </div>
  );
}
