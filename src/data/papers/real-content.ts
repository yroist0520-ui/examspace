import type { Paper } from '@/types/paper';

/**
 * 联网检索导入的真题站内内容（按批次分文件存放于 ./real-content/ 目录）。
 *
 * 按需加载策略：
 * - 目录下每个 *.ts 默认导出 Record<试卷id, Partial<Paper>>，只写内容字段；
 * - 题目正文体量大（约 7.6MB），不再随首页一次性下载。首页只加载 paper-catalog.ts
 *   （约 63KB 轻量目录，含元信息），用户点开某套试卷时才动态 import 对应文件；
 * - 只收录有公开来源可核验的题目，禁止编造题面、选项、答案与年份。
 */

// 动态加载器：只有调用对应函数时才下载该文件（Vite 自动切成独立 chunk）。
const loaders = import.meta.glob<Record<string, Partial<Paper>>>('./real-content/*.ts', {
  import: 'default'
});

import { paperCatalog } from './paper-catalog';

const cache = new Map<string, Record<string, Partial<Paper>>>();
const pending = new Map<string, Promise<Record<string, Partial<Paper>>>>();
/** 已成功加载正文的试卷 id */
const readyIds = new Set<string>();

export function isContentReady(id: string): boolean {
  return readyIds.has(id);
}

/** 取得已加载的正文（同步），未加载返回 undefined */
export function getLoadedContent(id: string): Partial<Paper> | undefined {
  const file = paperCatalog[id]?.file;
  if (!file) return undefined;
  return cache.get('./real-content/' + file)?.[id];
}

/** 按需加载一套试卷正文。同文件只下载一次，多套卷共享缓存。 */
export async function loadPaperContent(id: string): Promise<Partial<Paper> | undefined> {
  const entry = paperCatalog[id];
  if (!entry?.file) return undefined;
  const key = './real-content/' + entry.file;
  const loader = loaders[key];
  if (!loader) return undefined;

  let mod = cache.get(key);
  if (!mod) {
    let task = pending.get(key);
    if (!task) {
      task = loader().then((m) => {
        cache.set(key, m);
        pending.delete(key);
        return m;
      }).catch((err) => {
        pending.delete(key);
        throw err;
      });
      pending.set(key, task);
    }
    mod = await task;
  }
  if (mod[id]) readyIds.add(id);
  return mod[id];
}

/** 后台预热若干试卷（忽略错误），用于首页加载后预取高频卷 */
export function preloadPapers(ids: string[]): void {
  for (const id of ids) {
    if (!readyIds.has(id)) loadPaperContent(id).catch(() => undefined);
  }
}
