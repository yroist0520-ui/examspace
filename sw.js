/* EXAMSPACE Service Worker：应用外壳离线缓存 + 静态资源缓存
 * 缓存版本由构建注入（mwpuhvb9），每次部署自动失效旧缓存，避免旧 HTML 引用已删除的旧 JS 造成白屏。
 */
const CACHE = 'examspace-mwpuhvb9';
// 相对路径：SW 作用域解析，兼容部署在根域或子路径（GitHub Pages / Gitee Pages）
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

// 页面请求让新 SW 立即接管
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() =>
        // 通知所有页面：新版本已接管，若页面被旧缓存渲染过则自动重载一次
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
          clients.forEach((client) => client.postMessage({ type: 'SW_ACTIVATED', version: CACHE }));
        })
      )
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 跨域（如字体 CDN）不拦截

  // 页面导航：网络优先，失败回退缓存的 SPA 外壳，离线可打开任意路由
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 静态资源（带 hash 的 JS/CSS）：网络优先，失败回退缓存。
  // Vite 产物文件名带内容 hash，网络优先可确保拿到当前 HTML 引用的确切版本，杜绝新旧错位白屏。
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
