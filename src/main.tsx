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

// PWA：生产环境注册 Service Worker，实现离线可用
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 相对路径注册，兼容部署在根域或子路径（GitHub Pages / Gitee Pages）
    navigator.serviceWorker
      .register(new URL('sw.js', document.baseURI).href)
      .then((reg) => {
        // 若注册时已有新 SW 在等待（老页面尚未被替换），主动让其接管
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' })
        reg.addEventListener('updatefound', () => {
          const installing = reg.installing
          if (!installing) return
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              installing.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })
      })
      .catch(() => {
        // 注册失败不影响应用使用
      })

    // 新 SW 接管后：仅当当前页面确实由旧 controller 渲染时才自动重载一次，
    // 用 sessionStorage 标记避免无限刷新。
    let reloaded = sessionStorage.getItem('examspace-sw-reloaded') === '1'
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return
      reloaded = true
      sessionStorage.setItem('examspace-sw-reloaded', '1')
      window.location.reload()
    })
  })
}
