import type { Paper, PaperMeta, ExamCode, PartKind } from '@/types/paper';
import { cet4_2024_12 } from './cet4-2024-12';
import { cet4_2023_06, cet6_2024_12, kaoyan1_2025, tem4_2024 } from './more';
import { realPapers } from './real-papers';

function countQuestions(p: Paper) {
  return p.parts.reduce((n, part) => n + part.questions.length, 0);
}

export function toMeta(p: Paper): PaperMeta {
  const kinds = Array.from(new Set(p.parts.map((x) => x.kind))) as PartKind[];
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
    hasAudio: p.parts.some((x) => !!x.audio) || !!p.provenance?.sources.find((s) => s.kind === '听力音频'),
    kinds,
    questionCount: countQuestions(p)
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

/** 全量试卷（真实资源记录 + 已下架示例）：仅用于 id → 详情回查 */
export const papers: Paper[] = [...realPapers, ...samplePapers];

/**
 * 正式列表：只包含真实来源的资源记录。
 * 示例试卷不出现在真题库、练习选卷等任何正式列表中。
 */
export const listedPapers: Paper[] = realPapers;

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