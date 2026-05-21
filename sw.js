const CACHE_NAME = 'lmr-v1';

const ARCHIVOS_A_CACHEAR = [
  './',
  './index.html',
  './manifest.json',
  './motor_intencion.js',
  './semantica.js',
  './reglamento_data.js',
  './assets/1.avif',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-180.png',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/fuse.js/7.0.0/fuse.min.js'
];

// Instalación: guarda todos los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_A_CACHEAR);
    })
  );
  self.skipWaiting();
});

// Activación: elimina cachés viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: primero busca en caché, si no hay, va a internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        // Si no hay internet y no está en caché, muestra index.html
        return caches.match('./index.html');
      });
    })
  );
});