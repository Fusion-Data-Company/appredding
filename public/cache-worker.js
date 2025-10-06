/**
 * Service Worker for Advance Power Redding
 * Implements comprehensive caching strategies for offline support and improved performance
 */

const CACHE_VERSION = 'apr-cache-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Cache duration settings (in milliseconds)
const CACHE_DURATION = {
  static: 7 * 24 * 60 * 60 * 1000, // 7 days
  dynamic: 24 * 60 * 60 * 1000, // 1 day
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Resources to cache on install
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS).catch((error) => {
        console.warn('[SW] Failed to cache some critical assets:', error);
      });
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.includes('apr-cache') && 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Check if cache entry is expired
function isCacheExpired(cachedResponse, maxAge) {
  if (!cachedResponse) return true;
  
  const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
  if (!cachedDate || isNaN(cachedDate.getTime())) return true;
  
  const now = new Date();
  return (now - cachedDate) > maxAge;
}

// Add metadata to cached response
async function addCacheMetadata(response) {
  const clonedResponse = response.clone();
  const headers = new Headers(clonedResponse.headers);
  headers.set('sw-cache-date', new Date().toISOString());
  
  const body = await clonedResponse.blob();
  return new Response(body, {
    status: clonedResponse.status,
    statusText: clonedResponse.statusText,
    headers: headers,
  });
}

// Fetch event - implement advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip API calls - let them handle their own caching
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip chrome extensions and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Strategy: Stale-While-Revalidate for images
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        // If we have a valid cache, return it and update in background
        if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_DURATION.images)) {
          // Return cached version immediately
          const fetchPromise = fetch(request).then(async (response) => {
            if (response && response.status === 200) {
              const responseWithMeta = await addCacheMetadata(response);
              cache.put(request, responseWithMeta.clone());
            }
            return response;
          }).catch(() => cachedResponse);
          
          return cachedResponse;
        }
        
        // No valid cache, fetch from network
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            const responseWithMeta = await addCacheMetadata(response);
            cache.put(request, responseWithMeta.clone());
            return response;
          }
          return response;
        } catch (error) {
          // Return stale cache if network fails
          if (cachedResponse) return cachedResponse;
          
          // Return fallback SVG placeholder
          return new Response(
            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="14">Image unavailable</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      })
    );
    return;
  }

  // Strategy: Network-First for HTML pages
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response && response.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            const responseWithMeta = await addCacheMetadata(response);
            cache.put(request, responseWithMeta.clone());
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          
          return new Response(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Offline - Advance Power Redding</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f3f4f6; }
                .container { text-align: center; padding: 2rem; }
                h1 { color: #1f2937; margin-bottom: 1rem; }
                p { color: #6b7280; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>You are offline</h1>
                <p>Please check your internet connection and try again.</p>
              </div>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Strategy: Cache-First for static assets (JS, CSS, fonts)
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'font' ||
      url.pathname.match(/\.(js|css|woff2?|ttf|eot)$/i)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_DURATION.static)) {
          return cachedResponse;
        }
        
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            const responseWithMeta = await addCacheMetadata(response);
            cache.put(request, responseWithMeta.clone());
          }
          return response;
        } catch (error) {
          if (cachedResponse) return cachedResponse;
          throw error;
        }
      })
    );
    return;
  }

  // Default: Network-First with cache fallback
  event.respondWith(
    fetch(request)
      .then(async (response) => {
        if (response && response.status === 200) {
          const cache = await caches.open(DYNAMIC_CACHE);
          const responseWithMeta = await addCacheMetadata(response);
          cache.put(request, responseWithMeta.clone());
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Handle messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.includes('apr-cache')) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  }
});