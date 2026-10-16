const cacheName = "oupchina-Oxford_ NJSCI_Web_3DSolarSystem-0.1.2";
const contentToCache = [
    "Build/9ad346248b86c82bb1c7779a6ffc4295.loader.js",
    "Build/adeb2de7992b0886f3c4ec5f047f686d.framework.js",
    "Build/7e2522e247bf1e6055efe9cfff27601d.data",
    "Build/d23e53dcf126c51bcdaaf4e6ab9eb45e.wasm",
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
