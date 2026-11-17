/** 简化版遗忘曲线（Leitner 箱 + 间隔递增） */
const INTERVALS = [0, 1, 2, 4, 7, 15, 30, 60];

export function nextReview(box: number, correct: boolean, from = Date.now()): number {
  const nextBox = correct ? Math.min(box + 1, INTERVALS.length - 1) : 1;
  const days = INTERVALS[nextBox] || 1;
  return from + days * 86400000;
}

export function isDue(nextReviewAt: number, now = Date.now()): boolean {
  return nextReviewAt <= now;
}

export function dueCount(list: { nextReviewAt: number; mastered: boolean }[]): number {
  const now = Date.now();
  return list.filter((w) => !w.mastered && isDue(w.nextReviewAt, now)).length;
}

export function streakDays(dates: string[]): number {
  const set = new Set(dates);
  if (set.size === 0) return 0;
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`;
  let streak = 0;
  const cursor = new Date();
  // 允许“今天还没学”时从昨天开始计算
  if (!set.has(fmt(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(fmt(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}