// Cache name: adjust version number to invalidate service worker cachce.
var CACHE_NAME = 'jb-cache-v1';

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    cache.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        })
      );
    })
  );
});
