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
    // 相对路径注册，兼容部署在根域或子路径（Gitee Pages）
    navigator.serviceWorker.register(new URL('sw.js', document.baseURI).href).catch(() => {
      // 注册失败不影响应用使用
    })
  })
}
