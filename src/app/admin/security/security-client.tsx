"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Ban, Plus, Trash2, X, Save, Loader2, Activity, Clock, Shield } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

type BlockedIp = { id: string; ipAddress: string; reason: string; blockedBy: string; expiresAt: string | null; createdAt: string };
type Log = { id: string; type: string; event: string; userId: string; ipAddress: string; metadata: any; createdAt: string };

type Props = { blockedIps: BlockedIp[]; logs: Log[] };

export function SecurityClient({ blockedIps, logs }: Props) {
  const [tab, setTab] = useState<"blocked" | "logs">("blocked");
  const [showAdd, setShowAdd] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [reason, setReason] = useState("");

  const blockIp = async () => {
    if (!ipAddress) return toast.error("IP address required");
    const res = await fetch("/api/admin/security", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "block_ip", ipAddress, reason }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(`Blocked ${ipAddress}`);
      setShowAdd(false);
      setIpAddress("");
      setReason("");
      window.location.reload();
    } else {
      toast.error(data.error || "Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Security & Logs</h1>
        <p className="text-sm text-muted-foreground">Block IPs, view security logs, and audit activity.</p>
      </div>

      <div className="flex w-fit rounded-lg border border-border/60 bg-card/40 p-1">
        {[
          { id: "blocked", label: `Blocked IPs (${blockedIps.length})`, icon: Ban },
          { id: "logs", label: `Security Logs (${logs.length})`, icon: Activity },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id as any)} className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm ${tab === t.id ? "bg-brand-blue text-white" : "text-muted-foreground hover:text-foreground"}`}>
              <Icon className="size-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "blocked" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue/90">
              <Plus className="size-4" /> Block IP
            </button>
          </div>
          <Card className="overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Blocked by</th>
                  <th className="px-4 py-3">Expires</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {blockedIps.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground"><Shield className="mx-auto mb-2 size-8 opacity-40" />No blocked IPs.</td></tr>
                ) : (
                  blockedIps.map((b) => (
                    <tr key={b.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3 font-mono text-xs">{b.ipAddress}</td>
                      <td className="px-4 py-3 text-xs">{b.reason || "—"}</td>
                      <td className="px-4 py-3 text-xs">{b.blockedBy || "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{b.expiresAt ? new Date(b.expiresAt).toLocaleDateString() : "Never"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(b.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={async () => {
                            await fetch("/api/admin/security", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "unblock_ip", id: b.id }) });
                            toast.success("Unblocked"); window.location.reload();
                          }}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500"
                          title="Unblock"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === "logs" && (
        <Card className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-b border-border/40 last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      l.type === "critical" ? "bg-red-500/15 text-red-500" :
                      l.type === "error" ? "bg-red-500/15 text-red-500" :
                      l.type === "warning" ? "bg-amber-500/15 text-amber-500" :
                      "bg-brand-blue/15 text-brand-blue"
                    }`}>{l.type}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{l.event}</td>
                  <td className="px-4 py-3 text-xs">{l.userId || "—"}</td>
                  <td className="px-4 py-3 text-xs font-mono">{l.ipAddress || "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Block IP address</h2>
              <button onClick={() => setShowAdd(false)} className="rounded-md p-1.5 hover:bg-muted"><X className="size-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">IP address</label>
                <input value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} placeholder="192.168.1.1" className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Reason</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} placeholder="Spam, abuse, suspicious activity..." className="mt-1 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-blue" />
              </div>
              <button onClick={blockIp} className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-500/90">
                <ShieldAlert className="size-4" /> Block IP
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
