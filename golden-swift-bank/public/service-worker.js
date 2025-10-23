const CACHE_NAME = 'golden-swift-bank-v1';
const urlsToCache = [
  '/',                     // Root
  '/index.html',           // Entry point
  '/logo.jpeg',            // Static asset
  '/manifest.json',        // PWA manifest
  '/assets/app.css',       // Vite-generated CSS
  '/assets/app.js'         // Vite-generated JS
  // Add other assets from dist/ as needed
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(urlsToCache);
        console.log('[SW] Cached successfully');
      } catch (err) {
        console.error('[SW] Failed to cache:', err);
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.map(name => {
        if (!cacheWhitelist.includes(name)) return caches.delete(name);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and API requests
  if (request.method !== 'GET' || request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
        return response;
      }).catch(() => {
        // Fallback to index.html for navigation requests
        if (request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
