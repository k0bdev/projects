let cacheName = "core" 

let filesToCache = [
  "/",
  "/index.html",
  "/assets/clipboard.css",
  "/assets/clipboard.js",
  "/assets/background.png",
  "/assets/whitney-blacksc.otf",
  "/assets/whitneylight.otf",
]

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request)
    })
  )
})