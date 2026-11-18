import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
// 构建后把 dist/sw.js 中的 __BUILD_VERSION__ 替换为时间戳，保证每次部署缓存版本都变化，
// 从而让老访客浏览器的旧 Service Worker 缓存自动失效，避免旧 HTML 引用已删除的旧 JS 导致白屏。
// public/ 下的文件由 Vite 原样复制，不经过 bundle，故用 closeBundle 直接改写磁盘文件。
function swVersionPlugin() {
  return {
    name: 'sw-build-version',
    apply: 'build' as const,
    closeBundle() {
      const swPath = fileURLToPath(new URL('./dist/sw.js', import.meta.url));
      if (!existsSync(swPath)) return;
      const stamp = Date.now().toString(36);
      const src = readFileSync(swPath, 'utf8');
      writeFileSync(swPath, src.replace(/__BUILD_VERSION__/g, stamp));
    },
  };
}

export default defineConfig({
  // 相对资源路径：同一构建可部署在根域（Trae Site）与子路径（Gitee Pages）
  base: './',
  plugins: [react(), swVersionPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    testTimeout: 30000,
    hookTimeout: 120000,
  },
})
