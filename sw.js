const CACHE_NAME = 'agente-cache-v1';
const OFFLINE_ASSETS = [
  '/',
  '/index.html',
  '/sanitize.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request).then(networkRes => {
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return networkRes;
      }).catch(() => res);
    })
  );
});

let requestQueue = [];

async function processEntry(entry){
  try {
    const res = await fetch(entry.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry.payload)
    });
    const data = await res.json();
    const client = await self.clients.get(entry.clientId);
    if (client) {
      client.postMessage({ id: entry.id, response: data.output || data.response || 'Consulta procesada correctamente.' });
    }
  } catch (err) {
    requestQueue.push(entry);
  }
}

self.addEventListener('message', event => {
  const msg = event.data || {};
  if (msg.type === 'API_REQUEST') {
    const entry = { id: msg.id, url: msg.url, payload: msg.payload, clientId: event.source.id };
    fetch(msg.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg.payload)
    })
      .then(res => res.json())
      .then(data => {
        event.source.postMessage({ id: msg.id, response: data.output || data.response || 'Consulta procesada correctamente.' });
      })
      .catch(() => {
        requestQueue.push(entry);
      });
  } else if (msg.type === 'RETRY_QUEUE') {
    const pending = requestQueue.slice();
    requestQueue = [];
    pending.forEach(processEntry);
  }
});

