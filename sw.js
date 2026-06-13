// Scramjet STATIC — Service Worker
// Engine: Scramjet (MercuryWorkshop)
// Transport: libcurl over wss://anura.pro/wisp/

importScripts('./scramjet-engine/scramjet.js')

const { _5vlbtx: ScramjetServiceWorker } = _zx1lz2()
const proxySw = new ScramjetServiceWorker()

self.addEventListener('install', () => {
  void self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

async function handleRequest(event) {
  // loadConfig must be called before routing — syncs config from the controller
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
