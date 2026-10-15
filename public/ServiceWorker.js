const cacheName = "oupchina-Oxford_ NJSCI_Web_3DSolarSystem-0.1.2";
const contentToCache = [
    "Build/032c63f5ac7f9981c259cc12c1af3b12.loader.js",
    "Build/adeb2de7992b0886f3c4ec5f047f686d.framework.js",
    "Build/ed05eeacf66867f7561d7c1404b737c0.data",
    "Build/168a571f65c9cff7b9dff99a929b0d8d.wasm",
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
