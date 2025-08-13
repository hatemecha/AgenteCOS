import { WEBHOOK_URL, sessionId } from './config.js';

export async function sendToAPI(message) {
  if (!WEBHOOK_URL) {
    throw new Error('WEBHOOK_URL is not defined');
  }
  const payload = { chatInput: message, sessionId, timestamp: new Date().toISOString() };
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  return data.output || data.response || 'Consulta procesada correctamente.';
}
