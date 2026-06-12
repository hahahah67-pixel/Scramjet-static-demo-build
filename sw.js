// Scramjet STATIC — Service Worker
// Engine: Scramjet (MercuryWorkshop)
// Transport: libcurl over wss://anura.pro/wisp/

importScripts('./scramjet-engine/scramjet.js')

const { _5vlbtx: ScramjetServiceWorker } = _zx1lz2()
const sw = new ScramjetServiceWorker()

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  if (new URL(event.request.url).origin !== self.location.origin) return

  if (!sw.route(event)) return

  event.respondWith(
    sw.fetch(event).catch(() =>
      new Response('Network error', {
        status: 503,
        statusText: 'Service Unavailable',
      })
    )
  )
})
