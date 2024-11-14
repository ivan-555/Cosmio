module.exports = {
    globDirectory: "./", // Aktuelles Verzeichnis
    globPatterns: [
      "**/*.{html,js,css,png,jpg,jpeg,gltf,bin,webp}"
    ],
    swDest: "sw.js", // Speichert den Service Worker im Root von Cosmio
    maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 100 MB
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Tage
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources',
        },
      },
    ],
  };
  