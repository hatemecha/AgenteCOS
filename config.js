const envUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEBHOOK_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.WEBHOOK_URL) ||
  '';

export const WEBHOOK_URL = envUrl;
if (!WEBHOOK_URL && typeof console !== 'undefined') {
  console.warn('WEBHOOK_URL is not set; API requests will fail.');
}
export const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
export const DEFAULT_LANG = 'es-AR';
export const DEFAULT_VOLUME = 0.9;
export const TEXT_INACTIVITY_TIMEOUT_MS = 10000;
