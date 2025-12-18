const CACHE_NAME = 'ejpc-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './EJPC-app-icon-192.png',
    './EJPC-app-icon-512.png',
    './EJPC-app-icon-ati.png',
    './EJPC-app-icon-favicon.png',
    './tailwind.min.js',
    './qr-scanner.umd.min.js',
    './qr-scanner-worker.min.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            // Not in cache - return network request
            return fetch(e.request);
        })
    );
});


