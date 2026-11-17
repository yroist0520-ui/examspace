# EXAMSPACE 部署说明

EXAMSPACE 是纯静态前端应用（SPA），任何静态文件服务器均可托管，无后端依赖。
所有用户数据保存在浏览器 IndexedDB 中，不涉及服务器数据库。

## 1. 环境要求

- Node.js ≥ 20（推荐 LTS）
- npm ≥ 10

## 2. 本地构建

```bash
cd examspace
npm install
npm test          # 单元测试（24 例）
npm run build     # tsc 类型检查 + vite build → dist/
npm run preview   # 本机预览生产构建（默认 http://localhost:4173）
```

## 3. 部署方式

### 方式 A：任意静态托管（Netlify / Vercel / Cloudflare Pages / GitHub Pages）

1. 构建命令：`npm run build`；输出目录：`dist`
2. **SPA 回退必须配置**：所有未匹配路径回落到 `index.html`，否则直接访问
   `/words`、`/stats` 等子路由会 404。
   - Netlify：根目录放 `_redirects`，内容：`/*  /index.html  200`
   - Vercel：`vercel.json` → `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
   - nginx：`try_files $uri $uri/ /index.html;`

### 方式 B：nginx 自托管

```nginx
server {
  listen 80;
  server_name examspace.example.com;
  root /var/www/examspace/dist;
  index index.html;

  # SPA 回退
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 带哈希的静态资源长缓存
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Service Worker 与 HTML 不缓存，保证版本更新
  location = /sw.js { add_header Cache-Control "no-cache"; }
  location = /index.html { add_header Cache-Control "no-cache"; }
}
```

启用 HTTPS（PWA 的 Service Worker 与安装提示**要求 HTTPS**，`localhost` 除外）：

```bash
certbot --nginx -d examspace.example.com
```

### 方式 C：GitHub Pages

Pages 不支持 SPA 回退，需在路由层兜底：应用使用 `BrowserRouter`，
若必须部署到子路径（`/repo/`），需将 `main.tsx` 的 `BrowserRouter` 加 `basename`，
并在 404 页放 `index.html` 副本（或改用 hash 路由，需改一处代码）。

## 4. PWA 说明

- `public/manifest.webmanifest`：应用名、图标、standalone 显示、快捷方式
- `public/sw.js`：导航请求网络优先（离线回退 `index.html`），静态资源缓存优先
  （stale-while-revalidate），缓存版本 `examspace-v1`
- Service Worker **仅在生产构建注册**（`import.meta.env.PROD`），开发模式不注册
- 更新版本时：改 `sw.js` 内 `CACHE` 常量名（`examspace-v2`…），
  旧缓存会在新 worker 激活时自动清除
- 用户在支持的浏览器中会看到首页的「安装 EXAMSPACE」提示条（`beforeinstallprompt`）

## 5. 数据备份与迁移（无服务器方案）

设置页 `/settings` 提供：

- **导出全部数据**：下载 `examspace-backup-YYYYMMDD.json`（含 8 张表）
- **导入备份**：按主键 bulkPut 合并（不删除既有数据，重复 ID 覆盖为备份值）
- **清空学习数据**：二次确认后清空（保留设置）

## 6. 版本升级检查单

1. `npm test && npm run build` 全绿
2. 有 Dexie schema 变更时：`db/index.ts` 增加 `this.version(n).stores({...})`
3. Service Worker 缓存名递增
4. 部署后无痕窗口打开，确认首页与 `/words` 正常、控制台无错误
