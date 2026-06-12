// Scramjet STATIC — Service Worker
// Engine: Scramjet (MercuryWorkshop)
// Transport: Epoxy over wss://wisp.mercurywork.shop/

importScripts('./7tldj/lsnqo.js')

const { _5vlbtx: ScramjetServiceWorker } = _zx1lz2()
const sw = new ScramjetServiceWorker()

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  // Only handle same-origin requests
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
