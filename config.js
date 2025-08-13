export const DEFAULT_LANG = 'es-AR';
export const DEFAULT_VOLUME = 0.9;
export const DEFAULT_HOST = 'http://localhost:5678';

const storedHost = localStorage.getItem('COS_N8N_HOST');
export const WEBHOOK_URL = `${(storedHost || DEFAULT_HOST).replace(/\/$/, '')}/webhook/2c8e40bc-d18d-458e-9d02-6ca7be1eb19c/chat`;

export const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
export const TEXT_INACTIVITY_TIMEOUT_MS = 10000;
