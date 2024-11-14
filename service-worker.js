const CACHE_NAME = "planetarium-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/de/index.html",
    "/style.css",
    "/script.js",
    "/assets/favicon.png",
    "/assets/favicon-192.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
