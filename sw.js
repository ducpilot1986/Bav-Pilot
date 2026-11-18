/* BAV PILOT service worker
   Đổi CACHE_VERSION mỗi lần cập nhật logo/icon hoặc nội dung để máy người dùng tải bản mới. */
const CACHE_VERSION = 'bav-pilot-v1';
const CORE = [
  './', './index.html', './offline.html', './manifest.json?v=1',
  './apple-touch-icon.png', './icons/apple-touch-icon.png?v=1', './icons/icon-192.png?v=1', './icons/icon-512.png?v=1',
  './icons/icon-maskable-512.png?v=1', './icons/favicon.svg?v=1', './icons/favicon.ico?v=1',
  './branding/splash-globe.webp?v=1', './branding/splash-plane.webp?v=1', './branding/splash-word.webp?v=1',
  './branding/splash-pilot.webp?v=1', './branding/splash-bav-mask.png',
  './assets/plane.webp', './assets/wing.webp', './assets/bamboo-tail.webp', './assets/pilot_chibi.webp'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {            // trang: ưu tiên mạng, mất mạng thì dùng bản đã lưu
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy)); return r; })
      .catch(() => caches.match('./index.html').then(r => r || caches.match('./offline.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {   // ảnh, icon: ưu tiên bộ nhớ đệm
    if (r.ok) { const copy = r.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); }
    return r;
  })));
});
