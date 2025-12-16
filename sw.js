const CACHE_NAME = 'epopee-calc-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './EJPC-app-icon-192.png',
    './EJPC-app-icon-512.png',
    './EJPC-app-icon-ati.png',
    './EJPC-app-icon-favicon.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@400;700&display=swap'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
