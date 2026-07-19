"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Server,
  Plus,
  Trash2,
  Edit3,
  TestTube2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Cloud,
  Database,
  Mail,
  Loader2,
  Activity,
  X,
  Save,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ─── Provider catalog ───────────────────────────────────────────────────────
const PROVIDER_CATALOG = {
  media: [
    { id: "cloudflare", name: "Cloudflare Images", credKeys: ["apiToken"], cfgKeys: ["accountId", "accountHash", "deliveryDomain"] },
    { id: "cloudinary", name: "Cloudinary", credKeys: ["apiKey", "apiSecret"], cfgKeys: ["cloudName"] },
    { id: "imagekit", name: "ImageKit", credKeys: ["privateKey"], cfgKeys: ["publicKey", "urlEndpoint"] },
    { id: "uploadcare", name: "Uploadcare", credKeys: ["secretKey"], cfgKeys: ["publicKey"] },
    { id: "twicpics", name: "TwicPics", credKeys: ["apiKey"], cfgKeys: ["domain"] },
  ],
  storage: [
    { id: "cloudflare-r2", name: "Cloudflare R2", credKeys: ["accessKeyId", "secretAccessKey"], cfgKeys: ["accountId", "bucketName", "publicDomain"] },
    { id: "backblaze-b2", name: "Backblaze B2", credKeys: ["applicationKeyId", "applicationKey"], cfgKeys: ["endpoint", "bucketName", "publicDomain"] },
    { id: "cloudinary", name: "Cloudinary", credKeys: ["apiKey", "apiSecret"], cfgKeys: ["cloudName"] },
    { id: "supabase", name: "Supabase Storage", credKeys: ["serviceRoleKey"], cfgKeys: ["url", "bucketName"] },
  ],
  email: [
    { id: "smtp", name: "SMTP (Custom)", credKeys: ["user", "password"], cfgKeys: ["host", "port", "secure", "fromName", "fromEmail"] },
    { id: "brevo", name: "Brevo", credKeys: ["apiKey"], cfgKeys: ["fromName", "fromEmail"] },
    { id: "mailgun", name: "Mailgun", credKeys: ["apiKey"], cfgKeys: ["domain", "region"] },
    { id: "elastic-email", name: "Elastic Email", credKeys: ["apiKey"], cfgKeys: ["fromName", "fromEmail"] },
    { id: "mailjet", name: "Mailjet", credKeys: ["apiKey", "apiSecret"], cfgKeys: ["fromName", "fromEmail"] },
    { id: "cloudflare-routing", name: "Cloudflare Email Routing (Inbound)", credKeys: ["apiToken"], cfgKeys: ["zoneId", "forwardTo"] },
    { id: "zoho", name: "Zoho Mail (SMTP)", credKeys: ["user", "password"], cfgKeys: ["host", "port", "secure", "fromName", "fromEmail"] },
    { id: "zeptomail", name: "ZeptoMail", credKeys: ["sendMailToken"], cfgKeys: ["fromName", "fromEmail"] },
    { id: "mailerlite", name: "MailerLite", credKeys: ["apiKey"], cfgKeys: ["fromName", "fromEmail"] },
    { id: "sender", name: "Sender", credKeys: ["apiKey"], cfgKeys: ["fromName", "fromEmail"] },
    { id: "mailtrap", name: "Mailtrap", credKeys: ["apiToken"], cfgKeys: ["accountId", "inboxId", "sandbox"] },
  ],
} as const;

// ─── Types ──────────────────────────────────────────────────────────────────
type Category = "media" | "storage" | "email";

type ProviderRow = {
  id: string;
  category: Category;
  providerId: string;
  displayName: string;
  isActive: boolean;
  priority: number;
  config: Record<string, string>;
  credentials: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
};

type HealthRow = {
  providerId: string;
  category: Category;
  status: string;
  latencyMs: number | null;
  lastCheckedAt: Date;
  lastError: string | null;
  cooldownUntil: Date | null;
};

type EmailLogRow = {
  id: string;
  providerId: string;
  toAddress: string;
  subject: string;
  status: string;
  errorMessage: string | null;
  sentAt: Date;
};

type Props = {
  initialProviders: ProviderRow[];
  health: HealthRow[];
  emailLogs: EmailLogRow[];
  storageObjectCount: number;
};

// ─── Component ──────────────────────────────────────────────────────────────
export function ProvidersClient({
  initialProviders,
  health: initialHealth,
  emailLogs,
  storageObjectCount,
}: Props) {
  const [providers, setProviders] = useState<ProviderRow[]>(initialProviders);
  const [health, setHealth] = useState<HealthRow[]>(initialHealth);
  const [activeTab, setActiveTab] = useState<Category>("email");
  const [editing, setEditing] = useState<ProviderRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const reload = useCallback(async () => {
    const res = await fetch("/api/admin/providers").then((r) => r.json());
    if (res.providers) {
      setProviders(
        res.providers.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        })),
      );
      setHealth(
        res.providers
          .filter((p: any) => p.health)
          .map((p: any) => ({
            providerId: p.providerId,
            category: p.category,
            status: p.health.status,
            latencyMs: p.health.latencyMs,
            lastCheckedAt: new Date(p.health.lastCheckedAt),
            lastError: p.health.lastError,
            cooldownUntil: p.health.cooldownUntil ? new Date(p.health.cooldownUntil) : null,
          })),
      );
    }
  }, []);

  const handleTest = async (providerId: string, category: Category) => {
    setTesting(providerId);
    try {
      const res = await fetch("/api/admin/providers/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId, category }),
      }).then((r) => r.json());
      if (res.ok) {
        toast.success(`✓ Healthy — ${res.latencyMs}ms`);
      } else {
        toast.error(`✗ ${res.message || "Failed"}`);
      }
      await reload();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setTesting(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetch("/api/admin/providers/failover", { method: "POST" });
      await reload();
      toast.success("Registry refreshed");
    } finally {
      setRefreshing(false);
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/providers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive }),
    });
    await reload();
    toast.success(isActive ? "Provider activated" : "Provider deactivated");
  };

  const handlePriority = async (id: string, direction: "up" | "down") => {
    const provider = providers.find((p) => p.id === id);
    if (!provider) return;
    const newPriority = direction === "up" ? provider.priority - 1 : provider.priority + 1;
    await fetch(`/api/admin/providers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: newPriority }),
    });
    await reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this provider configuration?")) return;
    await fetch(`/api/admin/providers/${id}`, { method: "DELETE" });
    await reload();
    toast.success("Provider deleted");
  };

  const filtered = providers.filter((p) => p.category === activeTab);
  const filteredHealth = (providerId: string) =>
    health.find((h) => h.providerId === providerId);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Server className="size-6 text-brand-blue" />
            Storage, Media & Email Providers
          </h1>
          <p className="text-sm text-muted-foreground">
            Multi-provider architecture with admin-configurable failover chains. 11 email providers, 5 media CDNs, 4 storage backends.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 size-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="mr-2 size-4" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Cloud} label="Media CDNs" value={providers.filter((p) => p.category === "media").length} sub="Configured" />
        <StatCard icon={Database} label="Storage Backends" value={providers.filter((p) => p.category === "storage").length} sub={`${storageObjectCount} objects stored`} />
        <StatCard icon={Mail} label="Email Providers" value={providers.filter((p) => p.category === "email").length} sub={`${emailLogs.length} recent sends`} />
        <StatCard icon={Activity} label="Healthy" value={health.filter((h) => h.status === "healthy").length} sub={`${health.filter((h) => h.status !== "healthy").length} degraded/down`} />
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Category)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">
            <Mail className="mr-2 size-4" />
            Email ({providers.filter((p) => p.category === "email").length})
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Database className="mr-2 size-4" />
            Storage ({providers.filter((p) => p.category === "storage").length})
          </TabsTrigger>
          <TabsTrigger value="media">
            <Cloud className="mr-2 size-4" />
            Media CDN ({providers.filter((p) => p.category === "media").length})
          </TabsTrigger>
        </TabsList>

        {(["email", "storage", "media"] as const).map((cat) => (
          <TabsContent key={cat} value={cat} className="space-y-3">
            {filtered.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                No {cat} providers configured. Click "Add Provider" to set one up.
              </Card>
            ) : (
              filtered.map((provider, i) => {
                const h = filteredHealth(provider.providerId);
                return (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="p-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handlePriority(provider.id, "up")}
                            className="text-muted-foreground hover:text-foreground"
                            disabled={i === 0}
                          >
                            <ArrowUp className="size-3" />
                          </button>
                          <span className="text-xs font-bold">{provider.priority}</span>
                          <button
                            onClick={() => handlePriority(provider.id, "down")}
                            className="text-muted-foreground hover:text-foreground"
                            disabled={i === filtered.length - 1}
                          >
                            <ArrowDown className="size-3" />
                          </button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{provider.displayName}</h3>
                            <Badge variant="outline" className="text-xs">
                              {provider.providerId}
                            </Badge>
                            {provider.isActive ? (
                              <Badge className="bg-green-500/10 text-green-600 text-xs">Active</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Disabled</Badge>
                            )}
                            {h && <HealthBadge status={h.status} />}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {h?.latencyMs != null && `${h.latencyMs}ms latency · `}
                            {h?.lastCheckedAt && `checked ${new Date(h.lastCheckedAt).toLocaleTimeString()}`}
                            {h?.cooldownUntil && h.cooldownUntil > new Date() && (
                              <span className="ml-2 text-red-500">
                                · Cooldown until {new Date(h.cooldownUntil).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Switch
                            checked={provider.isActive}
                            onCheckedChange={(v) => handleToggle(provider.id, v)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTest(provider.providerId, provider.category)}
                            disabled={testing === provider.providerId}
                          >
                            {testing === provider.providerId ? (
                              <Loader2 className="mr-2 size-3 animate-spin" />
                            ) : (
                              <TestTube2 className="mr-2 size-3" />
                            )}
                            Test
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(provider)}
                          >
                            <Edit3 className="mr-2 size-3" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(provider.id)}
                          >
                            <Trash2 className="size-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Email logs (visible only on email tab) */}
      {activeTab === "email" && emailLogs.length > 0 && (
        <Card className="p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold">
            <Activity className="size-4" />
            Recent Email Sends (last 20)
          </h3>
          <div className="space-y-2">
            {emailLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-md border border-border/40 p-2 text-xs">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      log.status === "sent" ? "border-green-500/30 text-green-600" : "border-red-500/30 text-red-600"
                    }
                  >
                    {log.status}
                  </Badge>
                  <span className="font-mono text-muted-foreground">{log.providerId}</span>
                  <span className="font-medium">{log.subject}</span>
                  <span className="text-muted-foreground">→ {log.toAddress}</span>
                </div>
                <span className="text-muted-foreground">
                  {new Date(log.sentAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(creating || editing) && (
        <ProviderEditor
          provider={editing}
          category={activeTab}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={async () => {
            setCreating(false);
            setEditing(null);
            await reload();
          }}
        />
      )}
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: number; sub: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <span className="text-xs">{label}</span>
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </Card>
  );
}

function HealthBadge({ status }: { status: string }) {
  if (status === "healthy")
    return (
      <Badge className="bg-green-500/10 text-green-600 text-xs">
        <CheckCircle2 className="mr-1 size-3" />
        Healthy
      </Badge>
    );
  if (status === "degraded")
    return (
      <Badge className="bg-yellow-500/10 text-yellow-600 text-xs">
        <AlertTriangle className="mr-1 size-3" />
        Degraded
      </Badge>
    );
  return (
    <Badge className="bg-red-500/10 text-red-600 text-xs">
      <XCircle className="mr-1 size-3" />
      Down
    </Badge>
  );
}

function ProviderEditor({
  provider,
  category,
  onClose,
  onSaved,
}: {
  provider: ProviderRow | null;
  category: Category;
  onClose: () => void;
  onSaved: () => void;
}) {
  const catalog = PROVIDER_CATALOG[category];
  const [selectedProviderId, setSelectedProviderId] = useState(provider?.providerId ?? catalog[0].id);
  const [displayName, setDisplayName] = useState(provider?.displayName ?? "");
  const [isActive, setIsActive] = useState(provider?.isActive ?? false);
  const [priority, setPriority] = useState(provider?.priority ?? 1);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [config, setConfig] = useState<Record<string, string>>(provider?.config ?? {});
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showCreds, setShowCreds] = useState(!provider);

  const selectedCatalog = catalog.find((c) => c.id === selectedProviderId) ?? catalog[0];

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = provider ? `/api/admin/providers/${provider.id}` : "/api/admin/providers";
      const method = provider ? "PATCH" : "POST";
      const body: any = {
        category,
        providerId: selectedProviderId,
        displayName: displayName || selectedCatalog.name,
        isActive,
        priority,
        config,
      };
      // Only send credentials if user filled them in (don't overwrite with empty on edit)
      if (!provider || Object.values(credentials).some((v) => v.length > 0)) {
        body.credentials = credentials;
      }
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      toast.success(provider ? "Provider updated" : "Provider added");
      onSaved();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      const res = await fetch("/api/admin/providers/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: selectedProviderId,
          category,
          credentials,
          config,
        }),
      }).then((r) => r.json());
      if (res.ok) {
        toast.success(`✓ Healthy — ${res.latencyMs}ms`);
      } else {
        toast.error(`✗ ${res.message || "Failed"}`);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {provider ? "Edit" : "Add"} {category} Provider
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Provider selection */}
          <div>
            <Label>Provider</Label>
            <Select
              value={selectedProviderId}
              onValueChange={setSelectedProviderId}
              disabled={!!provider}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {catalog.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Display Name</Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={selectedCatalog.name}
              />
            </div>
            <div>
              <Label>Priority (lower = higher in chain)</Label>
              <Input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border/40 p-3">
            <div>
              <Label>Active</Label>
              <p className="text-xs text-muted-foreground">Include this provider in the failover chain</p>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          {/* Config (non-secret) */}
          <div>
            <Label className="mb-2 block">Configuration (non-secret)</Label>
            <div className="space-y-2">
              {selectedCatalog.cfgKeys.map((key) => (
                <div key={key}>
                  <Label className="text-xs text-muted-foreground">{key}</Label>
                  <Input
                    value={config[key] ?? ""}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    placeholder={key}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Credentials (secret) */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Credentials (encrypted at rest)</Label>
              {provider && (
                <button
                  onClick={() => setShowCreds(!showCreds)}
                  className="text-xs text-brand-blue hover:underline"
                >
                  {showCreds ? "Cancel update" : "Update credentials"}
                </button>
              )}
            </div>
            {showCreds && (
              <div className="space-y-2">
                {selectedCatalog.credKeys.map((key) => (
                  <div key={key}>
                    <Label className="text-xs text-muted-foreground">{key}</Label>
                    <Input
                      type="password"
                      value={credentials[key] ?? ""}
                      onChange={(e) => setCredentials({ ...credentials, [key]: e.target.value })}
                      placeholder={provider ? "•••••••• (leave blank to keep existing)" : key}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleTest} disabled={testing}>
            {testing ? <Loader2 className="mr-2 size-4 animate-spin" /> : <TestTube2 className="mr-2 size-4" />}
            Test Connection
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <X className="mr-2 size-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
