/* EXAMSPACE：Service Worker 已停用。
 * 站点改为纯网络加载 + 题目正文按需下载，首屏主包已压缩到很小，不再需要离线缓存。
 * 历史注册的 SW 在浏览器检查更新时会拿到本脚本：安装后立即注销自己并清空旧缓存，
 * 避免旧缓存页面引用已删除的旧 JS 反复造成白屏/卡加载。
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
  if ('caches' in self) {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).catch(() => undefined);
  }
  self.registration.unregister().catch(() => undefined);
});
