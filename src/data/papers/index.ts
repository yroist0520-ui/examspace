import { useEffect, useState } from 'react';
import type { Paper, PaperMeta, ExamCode, PartKind, ResourceFlag } from '@/types/paper';
import { cet4_2024_12 } from './cet4-2024-12';
import { cet4_2023_06, cet6_2024_12, kaoyan1_2025, tem4_2024 } from './more';
import { realPapers } from './real-papers';
import { paperCatalog } from './paper-catalog';
import { loadPaperContent, isContentReady, getLoadedContent, preloadPapers } from './real-content';

/** 已收录题面的标准内容声明（覆盖“仅外链”时代的旧说明） */
const COLLECTED_NOTE =
  '站内题面与答案由公开渠道联网检索整理，版权归原考试机构及原发布方，仅供学习使用；答案解析来自公开整理，非官方发布；听力以站内合成朗读呈现并明确标注，不提供原音。';

/**
 * 将联网检索导入的站内题面合并到真实资源记录：
 * 有内容的卷标记「已收录」并可直接在线作答；无内容的卷保持「筹备中」，不提供外部跳转。
 */
function withCatalog(p: Paper): Paper {
  const entry = paperCatalog[p.id];
  if (!entry) return p; // 无正文的筹备中记录保持原样
  const prov = p.provenance;
  // 目录里有元信息、但题目正文按需加载：此处只填元数据，parts 留空由加载服务填充。
  // 若正文恰好已在内存（预热完成），一并填入，避免重复构造。
  const loaded = getLoadedContent(p.id);
  return {
    ...p,
    subtitle: entry.subtitle || p.subtitle,
    summary: entry.summary || p.summary,
    minutes: entry.minutes || p.minutes,
    words: entry.words || p.words,
    tags: entry.tags?.length ? entry.tags : p.tags,
    parts: loaded?.parts ?? [],
    difficulty: p.difficulty,
    provenance: prov
      ? {
          ...prov,
          license: 'unknown',
          flags: Array.from(
            new Set([
              ...prov.flags.filter((f) => f !== 'external-only' && f !== 'pending'),
              'collected' as ResourceFlag
            ])
          ),
          note: COLLECTED_NOTE
        }
      : undefined
  };
}

function countQuestions(p: Paper) {
  return p.parts.reduce((n, part) => n + part.questions.length, 0);
}

export function toMeta(p: Paper): PaperMeta {
  const entry = paperCatalog[p.id];
  const kinds = entry?.kinds
    ? (entry.kinds as PartKind[])
    : (Array.from(new Set(p.parts.map((x) => x.kind))) as PartKind[]);
  const loaded = getLoadedContent(p.id);
  const parts = loaded?.parts ?? p.parts;
  return {
    id: p.id,
    exam: p.exam,
    year: p.year,
    session: p.session,
    setNo: p.setNo,
    title: p.title,
    subtitle: p.subtitle,
    difficulty: p.difficulty,
    minutes: p.minutes,
    words: p.words,
    tags: p.tags,
    summary: p.summary,
    sample: p.sample,
    provenance: p.provenance,
    hasAudio: entry
      ? entry.hasAudio
      : parts.some((x) => !!x.audio) || !!p.provenance?.sources.find((s) => s.kind === '听力音频'),
    kinds,
    questionCount: entry ? entry.questionCount : parts.reduce((n, part) => n + part.questions.length, 0)
  };
}

const basePapers: Paper[] = [cet4_2024_12, kaoyan1_2025, cet6_2024_12, cet4_2023_06, tem4_2024];

const variantNotes: Record<string, string> = {
  'cet4-2024-12-01': '适合首次完整模考的入门示例卷',
  'kaoyan1-2025-01': '学术阅读与长难句强化示例卷',
  'cet6-2024-12-01': '长篇阅读与讲座听力示例卷',
  'cet4-2023-06-02': '短篇阅读与选词填空示例卷',
  'tem4-2024-01': '英专听写与语言知识示例卷'
};

/**
 * 由基础示例卷派生的变体：仅用于演示题库的可扩展结构，
 * 所有条目均在界面上标注“示例数据”。
 */
function cloneVariant(base: Paper, suffix: string, year: number, session: string, setNo: number): Paper {
  const paperId = `${base.id}-v${suffix}`;
  return {
    ...base,
    id: paperId,
    year,
    session,
    setNo,
    title: base.title.replace(/[AB]$/, setNo === 1 ? 'A' : setNo === 2 ? 'B' : 'C'),
    subtitle: `${year} 年 ${session}（第 ${setNo} 套）· 示例数据`,
    summary: `${base.summary} ${variantNotes[base.id] ?? ''}`.trim(),
    parts: base.parts.map((part) => ({
      ...part,
      id: `${part.id}`,
      questions: part.questions.map((q) => ({
        ...q,
        id: q.id.replace(base.id, paperId)
      })),
      passages: part.passages?.map((p) => ({ ...p, id: `${p.id}-${suffix}` })),
      audio: part.audio
        ? {
            ...part.audio,
            segments: part.audio.segments.map((s) => ({ ...s, id: `${s.id}-${suffix}` }))
          }
        : undefined
    }))
  };
}

/**
 * 示例试卷（演示数据）：已从所有正式列表下架，
 * 仅保留用于开发调试、单元/E2E 测试与历史作答记录的回溯查询。
 */
export const samplePapers: Paper[] = [
  ...basePapers,
  cloneVariant(cet4_2024_12, 'b', 2024, '6月', 2),
  cloneVariant(cet4_2024_12, 'c', 2023, '12月', 1),
  cloneVariant(kaoyan1_2025, 'b', 2024, '12月', 1),
  cloneVariant(kaoyan1_2025, 'c', 2023, '12月', 1),
  cloneVariant(cet6_2024_12, 'b', 2023, '12月', 2),
  cloneVariant(cet4_2023_06, 'b', 2022, '12月', 3),
  cloneVariant(tem4_2024, 'b', 2023, '春季', 1),
  cloneVariant(kaoyan1_2025, 'd', 2022, '12月', 1)
];

/** 合并站内导入内容后的真实资源记录 */
const collectedRealPapers: Paper[] = realPapers.map(withCatalog);

/** 全量试卷（真实资源记录 + 已下架示例）：仅用于 id → 详情回查 */
export const papers: Paper[] = [...collectedRealPapers, ...samplePapers];

/**
 * 正式列表：只包含站内可直接作答的完整试卷。
 * 未收录题面的记录与示例试卷不出现在真题库、练习选卷等任何列表中，
 * 避免出现「点进去却只能跳外站」的死胡同。
 */
export const listedPapers: Paper[] = collectedRealPapers.filter((p) =>
  !!paperCatalog[p.id] || p.parts.some((part) => part.questions.length > 0)
);

/** 当前有站内可用试卷的考试类型（列表页与首页只展示这些考试） */
export const availableExamCodes: ExamCode[] = Array.from(
  new Set(listedPapers.map((p) => p.exam))
);


export const paperMap = new Map(papers.map((p) => [p.id, p]));

/** 正式列表的元数据（真题库、统计、练习选卷用） */
export const paperMetas: PaperMeta[] = listedPapers.map(toMeta);

/** 全量元数据（历史作答记录回查标题用） */
export const allPaperMetas: PaperMeta[] = papers.map(toMeta);

export const paperById = (id: string): Paper | undefined => paperMap.get(id);

export function getQuestion(paper: Paper, questionId: string) {
  for (const part of paper.parts) {
    const q = part.questions.find((x) => x.id === questionId);
    if (q) return { part, question: q };
  }
  return undefined;
}

export function allYears(): number[] {
  return Array.from(new Set(listedPapers.map((p) => p.year))).sort((a, b) => b - a);
}

export function examCounts(): Record<ExamCode, number> {
  const out = {} as Record<ExamCode, number>;
  for (const p of listedPapers) out[p.exam] = (out[p.exam] ?? 0) + 1;
  return out;
}

/** 阅读理解中的可关联原文段落 */
export function findPassage(paper: Paper, partId: string, paragraphId: string) {
  const part = paper.parts.find((p) => p.id === partId);
  if (!part?.passages) return undefined;
  for (const passage of part.passages) {
    const para = passage.paragraphs.find((x) => x.id === paragraphId);
    if (para) return { passage, para };
  }
  return undefined;
}

export function partMinutes(paper: Paper, partId: string): number {
  const part = paper.parts.find((p) => p.id === partId);
  if (!part) return paper.minutes;
  if (part.minutes) return part.minutes;
  const share = part.questions.length / Math.max(1, countQuestions(paper));
  return Math.max(5, Math.round(paper.minutes * share));
}

/* --------------------------------- 按需加载正文 --------------------------------- */

/**
 * 加载一套试卷的题目正文，并把 parts 填充进 paperMap 中的单例对象。
 * 因为 paperById 返回的就是该单例，填充后所有持有引用的组件都能读到正文；
 * 由 usePaper hook 负责在加载完成后触发一次重渲染。
 */
export async function loadPaper(id: string): Promise<Paper | undefined> {
  const paper = paperMap.get(id);
  if (!paper || !paperCatalog[id]) return paper;
  if (isContentReady(id)) {
    const loaded = getLoadedContent(id);
    if (loaded?.parts && paper.parts.length === 0) paper.parts = loaded.parts;
    return paper;
  }
  const content = await loadPaperContent(id);
  if (content?.parts) paper.parts = content.parts;
  return paper;
}

/** 首页加载完成后，后台预热最近的高频真题（四六级优先），提升点开速度 */
export function warmupPopular(): void {
  const recent = listedPapers
    .filter((p) => p.exam === 'cet4' || p.exam === 'cet6')
    .slice(0, 4)
    .map((p) => p.id);
  preloadPapers(recent);
}

/**
 * React hook：进入答题/阅读/详情等页面时调用，确保该试卷正文已加载。
 * 正文就绪后触发重渲染，使 paperById 的单例对象带上 parts。
 */
export function usePaper(id: string | undefined): Paper | undefined {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [tick, setTick] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!id || !paperCatalog[id] || isContentReady(id)) return;
    let alive = true;
    loadPaper(id).then(() => { if (alive) setTick((t) => t + 1); }).catch(() => undefined);
    return () => { alive = false; };
  }, [id, tick]);
  void tick;
  return id ? paperMap.get(id) : undefined;
}

/** 正文是否就绪（供页面显示加载态） */
export function paperReady(id: string | undefined): boolean {
  if (!id) return false;
  if (!paperCatalog[id]) return true; // 示例卷自带正文
  return isContentReady(id) || (paperMap.get(id)?.parts.length ?? 0) > 0;
}