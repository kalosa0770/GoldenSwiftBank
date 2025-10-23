const CACHE_NAME = 'golden-swift-bank-v1';

// Files to cache (adjust paths according to your build/public folder)
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.jpeg',   // example static asset
  '/favicon.ico',
  '/manifest.json',
  '/assets/app.css',   // adjust to your actual built files
  '/assets/app.js'
];

// Install event: cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching static assets');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) {
            console.log('[ServiceWorker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event: only intercept non-API GET requests
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip API requests
  if (request.url.includes('/api/')) {
    return; // do not intercept, let it go to network
  }

  // Only handle GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached asset if available
        return cachedResponse;
      }
      // Fetch from network and cache it dynamically
      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return networkResponse;
      }).catch(() => {
        // Optional: return fallback HTML for offline
        if (request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
