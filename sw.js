// Scramjet STATIC — Service Worker
// Engine: Scramjet v1.1.0 (MercuryWorkshop)
// Transport: libcurl over wss://anura.pro/wisp/

importScripts('./scramjet-engine/scramjet-all.js')

const { ScramjetServiceWorker } = $scramjetLoadWorker()
const scramjet = new ScramjetServiceWorker()

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

async function handleRequest(event) {
  // Try to load config from IDB - but if it's not there yet, don't crash
  try {
    await scramjet.loadConfig()
  } catch {
    // Config not ready yet - pass through without proxying
    return fetch(event.request).catch(() => new Response('', { status: 503 }))
  }

  // CRITICAL: if config still null after loadConfig, don't call route()
  // route() crashes with TypeError if this.config is null
  if (!scramjet.config) {
    return fetch(event.request).catch(() => new Response('', { status: 503 }))
  }

  if (!scramjet.route(event)) {
    return fetch(event.request).catch(() => new Response('', { status: 503 }))
  }

  // Filter out non-http protocols (app schemes like snssdk://)
  try {
    if (!scramjet.config) return new Response('', { status: 200 })
    const prefix = self.location.origin + scramjet.config.prefix
    if (event.request.url.startsWith(prefix)) {
      const decoded = decodeURIComponent(event.request.url.slice(prefix.length))
      const destUrl = new URL(decoded)
      if (destUrl.protocol !== 'http:' && destUrl.protocol !== 'https:') {
        return new Response('', { status: 200 })
      }
    }
  } catch {
    return new Response('', { status: 200 })
  }

  return scramjet.fetch(event).catch(() => new Response('', { status: 200 }))
}

self.addEventListener('fetch', (event) => {
  let origin
  try {
    origin = new URL(event.request.url).origin
  } catch {
    return
  }
  if (origin !== self.location.origin) return
  event.respondWith(handleRequest(event))
})
