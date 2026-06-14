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

// Decode a scramjet-encoded URL back to the real destination URL
function getDecodedUrl(encodedUrl) {
  try {
    if (!scramjet.config) return null
    const prefix = self.location.origin + scramjet.config.prefix
    if (!encodedUrl.startsWith(prefix)) return null
    const encoded = encodedUrl.slice(prefix.length)
    return decodeURIComponent(encoded)
  } catch {
    return null
  }
}

async function handleRequest(event) {
  await scramjet.loadConfig()

  if (!scramjet.route(event)) return fetch(event.request)

  // Check if the destination URL uses a non-http/https protocol
  // (e.g. snssdk1340://, intent://, tiktok://, etc.)
  // libcurl cannot handle these — return an empty 200 response silently
  // instead of showing an ugly error screen
  const decoded = getDecodedUrl(event.request.url)
  if (decoded) {
    try {
      const url = new URL(decoded)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return new Response('', { status: 200 })
      }
    } catch {
      // Malformed URL — also silently ignore
      return new Response('', { status: 200 })
    }
  }

  return scramjet.fetch(event)
}

self.addEventListener('fetch', (event) => {
  if (new URL(event.request.url).origin !== self.location.origin) return
  event.respondWith(handleRequest(event))
})
