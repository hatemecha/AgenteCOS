export const WEBHOOK_URL = (typeof process !== 'undefined' && process.env && process.env.WEBHOOK_URL) ? process.env.WEBHOOK_URL : undefined;
export const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
export const DEFAULT_LANG = 'es-AR';
export const DEFAULT_VOLUME = 0.9;
export const TEXT_INACTIVITY_TIMEOUT_MS = 10000;
