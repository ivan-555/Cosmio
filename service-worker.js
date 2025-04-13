const CACHE_NAME = 'cosmio-cache-v1';
const urlsToCache = [
    '/index.html',
    '/de/index.html',
    '/style.css',
    '/script.js',
    "/manifest.json",
    "/service-worker.js",
    "/assets/Favicon.png",
    "/assets/Favicon192.png",
    "/assets/Favicon512.png",
];

// Installationsphase: Dateien in den Cache laden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivierung: Cache bereinigen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Lösche alte Versionen des Caches
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch‐Event: Zuerst Cache versuchen, dann Netzwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
