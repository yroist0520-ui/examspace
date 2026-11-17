# EXAMSPACE｜英语真题学习平台

真题资源库 · 在线试卷阅读 · 模拟考试与错题重练 · 生词本（遗忘曲线）· 学习统计。
纯前端应用，数据全部保存在浏览器本地（IndexedDB），可离线使用（PWA）。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器（默认 http://localhost:5173，占用时自动顺延）
npm run build      # 类型检查 + 生产构建（输出 dist/）
npm run preview    # 预览生产构建
npm test           # 单元测试（vitest，24 例）
npm run test:mobile# 移动端响应式 E2E（真实 Chrome 视口，23 例，自动先构建）
npm run test:all   # 单元 + E2E 全量
npm run lint       # 代码检查（oxlint）
```

## 功能地图

| 路由 | 功能 |
|---|---|
| `/` | 今日首页：倒计时、每日概况、学习计划、最近试卷/错题 |
| `/library` `/library/:exam` | 真题资源库：考研一/二、四六级、专四专八，多维筛选 |
| `/paper/:paperId` | 试卷详情：题型结构、开始练习/模拟考试、收藏 |
| `/read/:paperId` | 在线阅读器：目录、高亮批注、点词查词、阅读位置记忆 |
| `/exam/:paperId` | 考试系统：`mode=exam` 倒计时 / `mode=practice` 练习，`retry=` 错题重练 |
| `/result/:attemptId` | 成绩报告：得分、分部统计、逐题回顾、收藏范文 |
| `/practice` | 练习中心：继续作答、最近成绩、选卷 |
| `/words` | 生词本：来源追溯、标签筛选、Leitner 三档复习、CSV 导出 |
| `/mistakes` | 错题本：分类筛选、原题解析、重做、标记掌握 |
| `/stats` | 学习统计：时长、正确率、连续天数、近 14 天、七箱分布 |
| `/settings` | 设置与数据：三主题、排版、每日目标、数据导出/导入/清空 |

## 技术栈

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4（`@theme` 设计令牌 + 三主题运行时切换）
- Dexie（IndexedDB 封装）持久化
- React Router 7（SPA 路由）
- PWA：manifest + Service Worker（离线缓存）
- vitest（单元测试）/ oxlint（代码检查）

## 交付文档

- [部署说明](docs/DEPLOYMENT.md)
- [数据结构](docs/DATA_MODEL.md)
- [测试报告](docs/TEST_REPORT.md)

## 合规说明

站内全部试卷均标记为 **示例数据（sample）**，用于功能演示，未使用未经授权的真题资源。
完整产品规划见项目根目录 `EXAMSPACE_PROJECT_PLAN.md`。
