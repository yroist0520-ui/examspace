import { describe, expect, it } from 'vitest';
import { dueCount, isDue, nextReview, streakDays } from './srs';

const DAY = 86400000;

describe('nextReview', () => {
  const from = Date.parse('2026-11-17T00:00:00Z');

  it('答对时升箱并按新箱间隔推进', () => {
    expect(nextReview(0, true, from)).toBe(from + 1 * DAY); // → 箱1，间隔 1 天
    expect(nextReview(1, true, from)).toBe(from + 2 * DAY); // → 箱2，间隔 2 天
    expect(nextReview(4, true, from)).toBe(from + 15 * DAY); // → 箱5，间隔 15 天
  });

  it('箱 7 封顶不越界', () => {
    expect(nextReview(7, true, from)).toBe(from + 60 * DAY);
    expect(nextReview(6, true, from)).toBe(from + 60 * DAY);
  });

  it('答错回箱 1，间隔 1 天', () => {
    expect(nextReview(5, false, from)).toBe(from + 1 * DAY);
    expect(nextReview(0, false, from)).toBe(from + 1 * DAY);
  });
});

describe('isDue / dueCount', () => {
  const now = Date.now();
  it('到期判断', () => {
    expect(isDue(now - 1, now)).toBe(true);
    expect(isDue(now + 1000, now)).toBe(false);
  });
  it('未掌握且到期才计入', () => {
    const list = [
      { nextReviewAt: now - 10, mastered: false },
      { nextReviewAt: now - 10, mastered: true },
      { nextReviewAt: now + 10, mastered: false }
    ];
    expect(dueCount(list)).toBe(1);
  });
});

describe('streakDays', () => {
  const key = (d: Date) =>
    `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`;

  it('空数据为 0', () => {
    expect(streakDays([])).toBe(0);
  });

  it('今天有记录则从今天连续计数', () => {
    const today = new Date();
    const yesterday = new Date(Date.now() - DAY);
    expect(streakDays([key(today), key(yesterday)])).toBe(2);
  });

  it('今天没学时从昨天起算（今天不打断）', () => {
    const yesterday = new Date(Date.now() - DAY);
    const dayBefore = new Date(Date.now() - 2 * DAY);
    expect(streakDays([key(yesterday), key(dayBefore)])).toBe(2);
  });

  it('断档只计最近一段', () => {
    const yesterday = new Date(Date.now() - DAY);
    const fourDaysAgo = new Date(Date.now() - 4 * DAY);
    expect(streakDays([key(yesterday), key(fourDaysAgo)])).toBe(1);
  });
});
