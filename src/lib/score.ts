import type { Attempt, AttemptResult, Paper, Question } from '@/types/paper';

export function isObjective(q: Question): boolean {
  return q.type === 'single' || q.type === 'blank' || q.type === 'bank';
}

export function normalizeAnswer(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function checkAnswer(q: Question, value: string | undefined): boolean {
  if (value == null) return false;
  if (!isObjective(q)) return false;
  return normalizeAnswer(value) === normalizeAnswer(q.answer);
}

export function scoreAttempt(
  paper: Paper,
  answers: Record<string, string>,
  scopePartIds?: string[],
  scopeQuestionIds?: string[]
): AttemptResult {
  const parts = paper.parts.filter((p) => !scopePartIds || scopePartIds.length === 0 || scopePartIds.includes(p.id));
  const qScope = scopeQuestionIds && scopeQuestionIds.length > 0 ? new Set(scopeQuestionIds) : null;
  let autoScore = 0;
  let autoTotal = 0;
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;
  let manualPending = 0;
  const byPart: AttemptResult['byPart'] = [];

  for (const part of parts) {
    let partCorrect = 0;
    let partTotal = 0;
    for (const q of part.questions) {
      if (qScope && !qScope.has(q.id)) continue;
      if (!isObjective(q)) {
        manualPending += 1;
        continue;
      }
      partTotal += 1;
      autoTotal += q.score;
      const value = answers[q.id];
      if (value == null || value === '') {
        unanswered += 1;
      } else if (checkAnswer(q, value)) {
        correct += 1;
        partCorrect += 1;
        autoScore += q.score;
      } else {
        wrong += 1;
      }
    }
    byPart.push({ partId: part.id, title: part.title, correct: partCorrect, total: partTotal });
  }

  return {
    autoScore: Math.round(autoScore * 10) / 10,
    autoTotal: Math.round(autoTotal * 10) / 10,
    correct,
    wrong,
    unanswered,
    byPart,
    manualPending
  };
}

export function wrongQuestions(paper: Paper, attempt: Attempt): Question[] {
  const out: Question[] = [];
  for (const part of paper.parts) {
    for (const q of part.questions) {
      if (!isObjective(q)) continue;
      const v = attempt.answers[q.id];
      if (v != null && v !== '' && !checkAnswer(q, v)) out.push(q);
    }
  }
  return out;
}

export function accuracyOf(attempts: Attempt[]): number {
  let correct = 0;
  let total = 0;
  for (const a of attempts) {
    if (!a.result) continue;
    correct += a.result.correct;
    total += a.result.correct + a.result.wrong + a.result.unanswered;
  }
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export function totalMinutes(attempts: Attempt[]): number {
  return Math.round(attempts.reduce((n, a) => n + a.elapsedSec, 0) / 60);
}