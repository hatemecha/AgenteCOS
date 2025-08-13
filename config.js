const envUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEBHOOK_URL) ||
  (typeof process !== 'undefined' && process.env && (process.env.VITE_WEBHOOK_URL || process.env.WEBHOOK_URL)) ||
  'http://localhost:5678/webhook/2c8e40bc-d18d-458e-9d02-6ca7be1eb19c/chat';

export const WEBHOOK_URL = envUrl;
if (!WEBHOOK_URL && typeof console !== 'undefined') {
  console.warn('WEBHOOK_URL is not set; API requests will fail.');
}
export const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
export const DEFAULT_LANG = 'es-AR';
export const DEFAULT_VOLUME = 0.9;
export const TEXT_INACTIVITY_TIMEOUT_MS = 20000;
