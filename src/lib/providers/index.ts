/**
 * Public API surface for the multi-provider system.
 */

export {
  refreshRegistry,
  getMediaProviders,
  getStorageProviders,
  getEmailProviders,
  getMediaProvider,
  getStorageProvider,
  getEmailProvider,
  getRegistrySnapshot,
  type ProviderCategory,
} from "./registry";

export {
  encryptCredentials,
  decryptCredentials,
  maskCredential,
  generateEncryptionKey,
} from "./crypto";

export { uploadFile, downloadFile, deleteFile, getSignedUrl } from "./storage";
export { getMediaUrl, uploadImage } from "./media";
export { sendEmail, sendEmailWithFailover, testEmailProvider } from "./email";
