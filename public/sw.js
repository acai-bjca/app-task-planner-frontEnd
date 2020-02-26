importScripts('/cache-polyfill.js');

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('task-planner-app').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/index.js',
                '/index.html?homescreen=1',
                '/?homescreen=1',
                '/manifest.json',
                '/App.js',
                '/App.css'
            ]);
        })
    );
});


self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});