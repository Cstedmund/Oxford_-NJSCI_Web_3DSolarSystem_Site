const cacheName = "oupchina-Oxford_ NJSCI_Web_3DSolarSystem-0.1.2";
const contentToCache = [
    "Build/9cbcddbfa9e346f726bb3d4f1d15f0d2.loader.js",
    "Build/7cd3e39305526735825859a552f9c327.framework.js",
    "Build/ab1320388d537906f32c11d58e41551d.data",
    "Build/381de44a58366eae739c582ea69991d2.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
