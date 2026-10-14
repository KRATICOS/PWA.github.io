const CACHE_NAME = "coffee-pwa-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.json",
    "./images/cafe1.jpg",
    "./images/icons/icon-72x72 (1).png",
    "./images/icons/icon-96x96 (1).png",
    "./images/icons/icon-128x128 (1).png",
    "./images/icons/icon-144x144 (1).png",
    "./images/icons/icon-152x152 (1).png"


];

// Instalación: precarga de recursos estáticos
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
    );

    self.skipWaiting();
});

// Activación: elimina cachés antiguos
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

// Cache First: primero busca en caché
function cacheFirst(request) {
    return caches.match(request).then(response => {
        if (response) {
            return response;
        }

        return fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
            }

            return networkResponse;
        });
    });
}

// Network First: primero consulta la red
function networkFirst(request) {
    return fetch(request)
        .then(networkResponse => {
            if (networkResponse.ok) {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
            }

            return networkResponse;
        })
        .catch(() => {
            return caches.match(request).then(response => {
                if (response) {
                    return response;
                }

                return new Response(
                    "Sin conexión y recurso no disponible.",
                    {
                        status: 503,
                        statusText: "Service Unavailable"
                    }
                );
            });
        });
}

// Selección de estrategia de caché
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);

    // Ignorar solicitudes de otros dominios
    if (url.origin !== self.location.origin) {
        return;
    }

    // Network First para páginas HTML
    if (
        event.request.mode === "navigate" ||
        url.pathname.endsWith(".html")
    ) {
        event.respondWith(networkFirst(event.request));
    } else {
        // Cache First para CSS, JS, imágenes y otros recursos
        event.respondWith(cacheFirst(event.request));
    }
});