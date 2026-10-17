const cacheName = "oupchina-Oxford_ NJSCI_Web_3DSolarSystem-0.1.3";
const contentToCache = [
    "Build/a66bce90e9b7f89457c9e983ffd9b018.loader.js",
    "Build/adeb2de7992b0886f3c4ec5f047f686d.framework.js",
    "Build/a6728a88256137f8d273dc4754d884a9.data",
    "Build/793008ad18a1c560e53c9574f7e22823.wasm",
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
