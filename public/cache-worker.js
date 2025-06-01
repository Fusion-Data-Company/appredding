/**
 * Service Worker for Caching Images and Assets
 * Optimizes image loading performance
 */

const CACHE_NAME = 'solar-platform-cache-v1';
const IMAGE_CACHE_NAME = 'solar-platform-images-v1';

// Assets to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/src/main.tsx',
  '/src/index.css'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CRITICAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests with cache-first strategy
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)) {
    
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            return response;
          }

          return fetch(request).then(fetchResponse => {
            // Only cache successful responses
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(() => {
            // Return a fallback image or placeholder if needed
            return new Response('', { status: 404 });
          });
        });
      })
    );
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});