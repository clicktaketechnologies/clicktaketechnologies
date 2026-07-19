/**
 * Provider Registry — central manager for all storage/media/email providers.
 * Reads active provider configs from DB, instantiates adapters, routes calls
 * through failover chains, tracks health and usage.
 */

import { prisma } from "@/lib/db";
import { decryptCredentials } from "./crypto";
import type { MediaProvider } from "./media/types";
import type { StorageProvider } from "./storage/types";
import type { EmailProvider } from "./email/types";
import { logger } from "./logger";

export type ProviderCategory = "media" | "storage" | "email";

interface RegistryState {
  media: Map<string, MediaProvider>;
  storage: Map<string, StorageProvider>;
  email: Map<string, EmailProvider>;
  lastRefreshedAt: Date | null;
}

const state: RegistryState = {
  media: new Map(),
  storage: new Map(),
  email: new Map(),
  lastRefreshedAt: null,
};

let refreshPromise: Promise<void> | null = null;

async function buildMediaAdapter(
  providerId: string,
  credentials: Record<string, string>,
  config: Record<string, string>,
): Promise<MediaProvider | null> {
  try {
    switch (providerId) {
      case "cloudflare": {
        const { CloudflareMediaAdapter } = await import("./media/cloudflare");
        return new CloudflareMediaAdapter(credentials, config);
      }
      case "cloudinary": {
        const { CloudinaryMediaAdapter } = await import("./media/cloudinary");
        return new CloudinaryMediaAdapter(credentials, config);
      }
      case "imagekit": {
        const { ImageKitMediaAdapter } = await import("./media/imagekit");
        return new ImageKitMediaAdapter(credentials, config);
      }
      case "uploadcare": {
        const { UploadcareMediaAdapter } = await import("./media/uploadcare");
        return new UploadcareMediaAdapter(credentials, config);
      }
      case "twicpics": {
        const { TwicPicsMediaAdapter } = await import("./media/twicpics");
        return new TwicPicsMediaAdapter(credentials, config);
      }
      default:
        return null;
    }
  } catch (err) {
    logger.warn({ providerId, err: String(err) }, "[registry] failed to build media adapter");
    return null;
  }
}

async function buildStorageAdapter(
  providerId: string,
  credentials: Record<string, string>,
  config: Record<string, string>,
): Promise<StorageProvider | null> {
  try {
    switch (providerId) {
      case "cloudflare-r2": {
        const { R2StorageAdapter } = await import("./storage/r2");
        return new R2StorageAdapter(credentials, config);
      }
      case "backblaze-b2": {
        const { B2StorageAdapter } = await import("./storage/b2");
        return new B2StorageAdapter(credentials, config);
      }
      case "cloudinary": {
        const { CloudinaryStorageAdapter } = await import("./storage/cloudinary");
        return new CloudinaryStorageAdapter(credentials, config);
      }
      case "supabase": {
        const { SupabaseStorageAdapter } = await import("./storage/supabase");
        return new SupabaseStorageAdapter(credentials, config);
      }
      default:
        return null;
    }
  } catch (err) {
    logger.warn({ providerId, err: String(err) }, "[registry] failed to build storage adapter");
    return null;
  }
}

async function buildEmailAdapter(
  providerId: string,
  credentials: Record<string, string>,
  config: Record<string, string>,
): Promise<EmailProvider | null> {
  try {
    switch (providerId) {
      case "smtp":
      case "zoho": {
        const { SMTPAdapter } = await import("./email/smtp");
        return new SMTPAdapter(providerId, credentials, config);
      }
      case "mailtrap": {
        const { MailtrapAdapter } = await import("./email/mailtrap");
        return new MailtrapAdapter(credentials, config);
      }
      case "brevo": {
        const { BrevoAdapter } = await import("./email/brevo");
        return new BrevoAdapter(credentials, config);
      }
      case "mailgun": {
        const { MailgunAdapter } = await import("./email/mailgun");
        return new MailgunAdapter(credentials, config);
      }
      case "elastic-email": {
        const { ElasticEmailAdapter } = await import("./email/elastic-email");
        return new ElasticEmailAdapter(credentials, config);
      }
      case "mailjet": {
        const { MailjetAdapter } = await import("./email/mailjet");
        return new MailjetAdapter(credentials, config);
      }
      case "cloudflare-routing": {
        const { CloudflareRoutingAdapter } = await import("./email/cloudflare-routing");
        return new CloudflareRoutingAdapter(credentials, config);
      }
      case "zeptomail": {
        const { ZeptoMailAdapter } = await import("./email/zeptomail");
        return new ZeptoMailAdapter(credentials, config);
      }
      case "mailerlite": {
        const { MailerLiteAdapter } = await import("./email/mailerlite");
        return new MailerLiteAdapter(credentials, config);
      }
      case "sender": {
        const { SenderAdapter } = await import("./email/sender");
        return new SenderAdapter(credentials, config);
      }
      default:
        return null;
    }
  } catch (err) {
    logger.warn({ providerId, err: String(err) }, "[registry] failed to build email adapter");
    return null;
  }
}

export async function refreshRegistry(): Promise<void> {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const configs = await prisma.providerConfig.findMany({
        where: { isActive: true },
        orderBy: [{ category: "asc" }, { priority: "asc" }],
      });

      const newMedia = new Map<string, MediaProvider>();
      const newStorage = new Map<string, StorageProvider>();
      const newEmail = new Map<string, EmailProvider>();

      for (const cfg of configs) {
        const credentials = await decryptCredentials<Record<string, string>>(cfg.credentials || "{}");
        const config = JSON.parse(cfg.config || "{}") as Record<string, string>;

        if (cfg.category === "media") {
          const adapter = await buildMediaAdapter(cfg.providerId, credentials, config);
          if (adapter) newMedia.set(cfg.providerId, adapter);
        } else if (cfg.category === "storage") {
          const adapter = await buildStorageAdapter(cfg.providerId, credentials, config);
          if (adapter) newStorage.set(cfg.providerId, adapter);
        } else if (cfg.category === "email") {
          const adapter = await buildEmailAdapter(cfg.providerId, credentials, config);
          if (adapter) newEmail.set(cfg.providerId, adapter);
        }
      }

      state.media = newMedia;
      state.storage = newStorage;
      state.email = newEmail;
      state.lastRefreshedAt = new Date();
      logger.info(
        { media: newMedia.size, storage: newStorage.size, email: newEmail.size },
        "[registry] refreshed",
      );
    } catch (err) {
      logger.error({ err: String(err) }, "[registry] refresh failed");
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

export async function getMediaProviders(): Promise<MediaProvider[]> {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return Array.from(state.media.values());
}

export async function getStorageProviders(): Promise<StorageProvider[]> {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return Array.from(state.storage.values());
}

export async function getEmailProviders(): Promise<EmailProvider[]> {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return Array.from(state.email.values());
}

export async function getMediaProvider(id: string): Promise<MediaProvider | null> {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return state.media.get(id) ?? null;
}

export async function getStorageProvider(id: string): Promise<StorageProvider | null> {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return state.storage.get(id) ?? null;
}

export async function getEmailProvider(id: string): Promise<EmailProvider | null> {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return state.email.get(id) ?? null;
}

export async function getRegistrySnapshot() {
  if (!state.lastRefreshedAt) await refreshRegistry();
  return {
    lastRefreshedAt: state.lastRefreshedAt,
    media: Array.from(state.media.keys()),
    storage: Array.from(state.storage.keys()),
    email: Array.from(state.email.keys()),
  };
}
