import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './state/AppContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </HashRouter>
  </StrictMode>,
)

// 已禁用 Service Worker：它缓存的旧页面会引用已被删除的旧 JS，
// 导致部分网络环境下反复白屏/卡在加载页。站点改为纯网络加载 + 按需下载试卷，
// 首屏主包已压缩到很小，不再需要 SW 离线缓存。
// 这里主动注销历史注册的 SW 并清空缓存，确保老用户升级后不再被旧缓存拦截。
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations()
      .then((regs) => Promise.all(regs.map((r) => r.unregister())))
      .catch(() => undefined)
    if ('caches' in window) {
      caches.keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .catch(() => undefined)
    }
  })
}
