import { describe, expect, it } from 'vitest';
import { accuracyOf, checkAnswer, normalizeAnswer, scoreAttempt, totalMinutes, wrongQuestions } from './score';
import type { Attempt, Paper, Question } from '@/types/paper';

const q = (id: string, answer: string, type: Question['type'] = 'single', score = 2): Question => ({
  id,
  number: 1,
  type,
  stem: id,
  answer,
  score,
  options:
    type === 'single'
      ? [
          { key: 'A', text: 'a' },
          { key: 'B', text: 'b' }
        ]
      : undefined,
  explanation: ''
} as Question);

const paper: Paper = {
  id: 'p1',
  exam: 'cet4',
  title: '示例卷',
  year: 2026,
  session: '上半年',
  parts: [
    {
      id: 'part-1',
      title: 'Part I 听力',
      kind: 'listening',
      questions: [q('q1', 'B'), q('q2', 'A'), q('q3', 'C', 'blank', 1)]
    },
    {
      id: 'part-2',
      title: 'Part IV 写作',
      kind: 'writing',
      questions: [q('q4', '', 'writing', 15)]
    }
  ]
} as Paper;

describe('normalizeAnswer / checkAnswer', () => {
  it('忽略大小写与多余空白', () => {
    expect(normalizeAnswer('  B  ')).toBe('b');
    expect(checkAnswer(q('q', 'B'), ' b')).toBe(true);
    expect(checkAnswer(q('q', 'B'), 'c')).toBe(false);
    expect(checkAnswer(q('q', 'B'), undefined)).toBe(false);
    expect(checkAnswer(q('q', '', 'writing'), '')).toBe(false); // 主观题不自动判分
  });
});

describe('scoreAttempt', () => {
  it('客观题判分并统计未答与主观待批', () => {
    const r = scoreAttempt(paper, { q1: 'B', q3: 'b' });
    expect(r.correct).toBe(1);
    expect(r.wrong).toBe(1);
    expect(r.unanswered).toBe(1); // q2 未作答
    expect(r.autoTotal).toBe(5); // 2+2+1
    expect(r.autoScore).toBe(2);
    expect(r.manualPending).toBe(1);
    expect(r.byPart).toHaveLength(2);
    expect(r.byPart[0]).toEqual({ partId: 'part-1', title: 'Part I 听力', correct: 1, total: 3 });
  });

  it('未作答计入 unanswered', () => {
    const r = scoreAttempt(paper, { q1: 'B' });
    expect(r.unanswered).toBe(2);
    expect(r.correct).toBe(1);
  });

  it('按 scopeQuestionIds 圈题判分（错题重练）', () => {
    const r = scoreAttempt(paper, { q1: 'B', q2: 'A' }, undefined, ['q2']);
    expect(r.autoTotal).toBe(2);
    expect(r.correct).toBe(1);
    expect(r.byPart[0].total).toBe(1);
    expect(r.byPart[1].total).toBe(0);
  });

  it('按 scopePartIds 限定部分', () => {
    const r = scoreAttempt(paper, {}, ['part-2']);
    expect(r.autoTotal).toBe(0);
    expect(r.manualPending).toBe(1);
  });
});

describe('wrongQuestions', () => {
  it('仅收集答错的客观题', () => {
    const attempt = {
      id: 'a1',
      paperId: 'p1',
      mode: 'practice',
      scopePartIds: [],
      startedAt: 0,
      elapsedSec: 0,
      answers: { q1: 'A', q2: '', q3: 'C' }
    } as Attempt;
    const wrong = wrongQuestions(paper, attempt);
    expect(wrong.map((x) => x.id)).toEqual(['q1']);
  });
});

describe('accuracyOf / totalMinutes', () => {
  it('正确率四舍五入到整数', () => {
    const attempts = [
      { result: { correct: 2, wrong: 1, unanswered: 1 } },
      { result: { correct: 0, wrong: 0, unanswered: 0 } }
    ] as Attempt[];
    expect(accuracyOf(attempts)).toBe(50);
    expect(accuracyOf([])).toBe(0);
    expect(accuracyOf([{ result: undefined } as Attempt])).toBe(0);
  });

  it('累计学习分钟数', () => {
    const attempts = [{ elapsedSec: 600 }, { elapsedSec: 120 }] as Attempt[];
    expect(totalMinutes(attempts)).toBe(12);
  });
});
