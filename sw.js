// Scramjet STATIC — Service Worker
// Engine: Scramjet v1.1.0 (MercuryWorkshop official release)
// Transport: libcurl over wss://anura.pro/wisp/

// scramjet.bundle.js is an ES module and CANNOT be used with importScripts().
// scramjet.all.js is a plain IIFE — it sets the same globals and is safe here.
importScripts('./scramjet-engine/scramjet-all.js')

const { ScramjetServiceWorker } = $scramjetLoadWorker()
const proxySw = new ScramjetServiceWorker()

self.addEventListener('install', () => {
  void self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

async function handleRequest(event) {
  await proxySw.loadConfig()

  if (!proxySw.route(event)) {
    try {
      return await fetch(event.request)
    } catch {
      return new Response('Network error', { status: 503, statusText: 'Service Unavailable' })
    }
  }

  return await proxySw.fetch(event)
}

self.addEventListener('fetch', (event) => {
  if (new URL(event.request.url).origin !== self.location.origin) return
  event.respondWith(handleRequest(event))
})
