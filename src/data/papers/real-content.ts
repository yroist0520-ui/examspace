import type { Paper } from '@/types/paper';

/**
 * 联网检索导入的真题站内内容（按批次分文件存放于 ./real-content/ 目录）。
 *
 * 规则：
 * - 目录下每个 *.ts 默认导出 Record<试卷id, Partial<Paper>>，只写内容字段
 *   （parts / minutes / words / tags / summary / subtitle），其余字段沿用资源记录；
 * - 通过 import.meta.glob 自动聚合，新增内容文件无需改动本文件；
 * - 只收录有公开来源可核验的题目，禁止编造题面、选项、答案与年份。
 */

const modules = import.meta.glob('./real-content/*.ts', {
  eager: true,
  import: 'default'
}) as Record<string, Record<string, Partial<Paper>>>;

export const realContent: Record<string, Partial<Paper>> = Object.assign(
  {},
  ...Object.values(modules)
);
