/**
 * sw.js — Service worker của Polylingo: học được khi mạng chập chờn / mất mạng.
 * - File của web (HTML/JS/CSS/dữ liệu/ảnh): lấy mạng trước để luôn đúng phiên bản mới nhất,
 *   mất mạng thì dùng bản đã lưu.
 * - Font Google và thư viện CDN: dùng bản đã lưu ngay, cập nhật ngầm.
 * - /api/... (tài khoản, tiến độ): không bao giờ lưu đệm.
 * BUILD_ID được tools/dong-goi.sh thay bằng mã phiên bản mỗi lần đóng gói để xóa bộ đệm cũ.
 */
const BUILD_ID = '__BUILD_ID__';
const CACHE = 'polylingo-' + BUILD_ID;
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/favicon.svg',
  'assets/logo.svg',
  'assets/logo-dark.svg',
  'assets/logo-mark.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('polylingo-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;

  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  const isCdn = url.hostname === 'cdn.jsdelivr.net';
  if (!sameOrigin && !isFont && !isCdn) return;

  if (sameOrigin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req.mode === 'navigate' ? 'index.html' : req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req.mode === 'navigate' ? 'index.html' : req, { ignoreSearch: req.mode === 'navigate' }))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
