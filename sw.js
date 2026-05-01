// v5 - force clear all caches
const CACHE = 'mao-v5';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Don't cache anything - always fetch fresh
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if(url.includes('firebase') || url.includes('google') || url.includes('gstatic') || url.includes('googleapis')) {
    return;
  }
  // Just pass through, no caching
  e.respondWith(fetch(e.request).catch(() => new Response('offline')));
});
