import Dexie, { type Table } from 'dexie';
import type {
  Attempt,
  Bookmark,
  DailyStat,
  Draft,
  Highlight,
  MistakeRecord,
  ReadingPosition,
  Settings,
  WordEntry
} from '@/types/paper';

export const defaultSettings: Settings = {
  theme: 'paper',
  paperSize: 17,
  lineHeight: 1.95,
  wordSound: false,
  autoNext: false,
  dailyGoalMinutes: 40,
  showAnswersInReader: false,
  examDate: '2026-12-19'
};

export interface PdfAsset {
  paperId: string;
  name: string;
  blob: Blob;
  addedAt: number;
}

class ExamSpaceDB extends Dexie {
  attempts!: Table<Attempt, string>;
  words!: Table<WordEntry, string>;
  mistakes!: Table<MistakeRecord, string>;
  highlights!: Table<Highlight, string>;
  positions!: Table<ReadingPosition, string>;
  drafts!: Table<Draft, string>;
  bookmarks!: Table<Bookmark, string>;
  daily!: Table<DailyStat, string>;
  settings!: Table<{ key: string; value: unknown }, string>;
  pdfs!: Table<PdfAsset, string>;

  constructor() {
    super('examspace');
    this.version(1).stores({
      attempts: 'id, paperId, startedAt, mode',
      words: 'id, word, addedAt, nextReviewAt, mastered, tag',
      mistakes: 'id, paperId, questionId, kind, mastered, lastWrongAt',
      highlights: 'id, paperId, createdAt',
      positions: 'paperId',
      drafts: 'id, paperId, updatedAt',
      bookmarks: 'paperId',
      daily: 'date',
      settings: 'key',
      pdfs: 'paperId'
    });
    // v2: bookmarks 按创建时间排序需要 createdAt 索引
    this.version(2).stores({
      bookmarks: 'paperId, createdAt'
    });
  }
}

export const db = new ExamSpaceDB();

/* ---------------------------------- settings --------------------------------- */

export async function loadSettings(): Promise<Settings> {
  const row = await db.settings.get('app');
  return { ...defaultSettings, ...((row?.value as Partial<Settings>) ?? {}) };
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await loadSettings();
  const next = { ...current, ...patch };
  await db.settings.put({ key: 'app', value: next });
  return next;
}

/* ---------------------------------- attempts --------------------------------- */

export function newId(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function createAttempt(attempt: Attempt): Promise<void> {
  await db.attempts.put(attempt);
}

export async function getAttempt(id: string): Promise<Attempt | undefined> {
  return db.attempts.get(id);
}

export async function findActiveAttempt(paperId: string): Promise<Attempt | undefined> {
  const list = await db.attempts.where('paperId').equals(paperId).toArray();
  return list
    .filter((a) => !a.submittedAt)
    .sort((a, b) => b.startedAt - a.startedAt)[0];
}

export async function saveAttemptAnswer(attemptId: string, questionId: string, value: string, elapsedSec: number) {
  const attempt = await db.attempts.get(attemptId);
  if (!attempt) return;
  await db.attempts.update(attemptId, {
    answers: { ...attempt.answers, [questionId]: value },
    elapsedSec
  });
}

export async function submitAttempt(attemptId: string, result: Attempt['result'], elapsedSec: number) {
  await db.attempts.update(attemptId, { submittedAt: Date.now(), result, elapsedSec });
}

export async function listAttempts(limit = 40): Promise<Attempt[]> {
  const all = await db.attempts.orderBy('startedAt').reverse().toArray();
  return all.slice(0, limit);
}

export async function deleteAttempt(attemptId: string) {
  await db.attempts.delete(attemptId);
}

/* ----------------------------------- words ----------------------------------- */

export async function addWord(entry: WordEntry): Promise<void> {
  const existing = await db.words.get(entry.id);
  if (existing) {
    await db.words.update(entry.id, {
      reviewCount: existing.reviewCount,
      lastReviewedAt: existing.lastReviewedAt,
      nextReviewAt: existing.nextReviewAt,
      mastered: existing.mastered,
      source: existing.source ?? entry.source
    });
    return;
  }
  await db.words.put(entry);
}

export async function removeWord(id: string) {
  await db.words.delete(id);
}

export async function isWordSaved(word: string): Promise<boolean> {
  const hit = await db.words.get(`w-${word.toLowerCase()}`);
  return !!hit;
}

export async function listWords(): Promise<WordEntry[]> {
  return db.words.orderBy('addedAt').reverse().toArray();
}

export async function reviewWord(id: string, nextReviewAt: number) {
  const w = await db.words.get(id);
  if (!w) return;
  await db.words.update(id, {
    reviewCount: w.reviewCount + 1,
    lastReviewedAt: Date.now(),
    nextReviewAt
  });
}

/** 局部更新生词（复习推进箱级、标记掌握、改标签等） */
export async function updateWord(id: string, patch: Partial<WordEntry>): Promise<void> {
  await db.words.update(id, patch);
}

/* ---------------------------------- mistakes --------------------------------- */

export async function recordMistake(input: Omit<MistakeRecord, 'id' | 'wrongCount' | 'lastWrongAt' | 'mastered'>) {
  const id = `${input.paperId}::${input.questionId}`;
  const existing = await db.mistakes.get(id);
  if (existing) {
    await db.mistakes.update(id, {
      wrongCount: existing.wrongCount + 1,
      lastWrongAt: Date.now(),
      lastAnswer: input.lastAnswer,
      mastered: false
    });
    return;
  }
  await db.mistakes.put({ ...input, id, wrongCount: 1, lastWrongAt: Date.now(), mastered: false });
}

export async function listMistakes(): Promise<MistakeRecord[]> {
  return db.mistakes.orderBy('lastWrongAt').reverse().toArray();
}

export async function markMastered(id: string, mastered: boolean) {
  await db.mistakes.update(id, { mastered });
}

/* --------------------------------- highlights -------------------------------- */

export async function addHighlight(h: Highlight) {
  await db.highlights.put(h);
}

export async function listHighlights(paperId?: string): Promise<Highlight[]> {
  if (paperId) return db.highlights.where('paperId').equals(paperId).toArray();
  return db.highlights.orderBy('createdAt').reverse().toArray();
}

export async function removeHighlight(id: string) {
  await db.highlights.delete(id);
}

export async function updateHighlightNote(id: string, note: string) {
  await db.highlights.update(id, { note });
}

/* --------------------------------- positions --------------------------------- */

export async function savePosition(pos: ReadingPosition) {
  await db.positions.put(pos);
}

export async function getPosition(paperId: string): Promise<ReadingPosition | undefined> {
  return db.positions.get(paperId);
}

/* ----------------------------------- drafts ---------------------------------- */

export async function saveDraft(draft: Draft) {
  await db.drafts.put(draft);
}

export async function getDraft(paperId: string, questionId: string): Promise<Draft | undefined> {
  return db.drafts.get(`${paperId}::${questionId}`);
}

export async function listDrafts(): Promise<Draft[]> {
  return db.drafts.orderBy('updatedAt').reverse().toArray();
}

/* --------------------------------- bookmarks --------------------------------- */

export async function toggleBookmark(paperId: string): Promise<boolean> {
  const has = await db.bookmarks.get(paperId);
  if (has) {
    await db.bookmarks.delete(paperId);
    return false;
  }
  await db.bookmarks.put({ paperId, createdAt: Date.now() });
  return true;
}

export async function listBookmarks(): Promise<Bookmark[]> {
  return db.bookmarks.orderBy('createdAt').reverse().toArray();
}

/* ----------------------------------- daily ----------------------------------- */

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function bumpDaily(patch: Partial<Omit<DailyStat, 'date'>>, date = todayKey()) {
  const row = await db.daily.get(date);
  const base: DailyStat = row ?? { date, minutes: 0, answered: 0, correct: 0, wordsAdded: 0 };
  const next: DailyStat = {
    date,
    minutes: Math.round((base.minutes + (patch.minutes ?? 0)) * 10) / 10,
    answered: base.answered + (patch.answered ?? 0),
    correct: base.correct + (patch.correct ?? 0),
    wordsAdded: base.wordsAdded + (patch.wordsAdded ?? 0)
  };
  await db.daily.put(next);
}

export async function listDaily(days = 30): Promise<DailyStat[]> {
  const all = await db.daily.orderBy('date').reverse().toArray();
  return all.slice(0, days);
}

/* ------------------------------------ pdfs ----------------------------------- */

export async function savePdf(asset: PdfAsset) {
  await db.pdfs.put(asset);
}

export async function getPdf(paperId: string) {
  return db.pdfs.get(paperId);
}

export async function clearAll() {
  await Promise.all([
    db.attempts.clear(),
    db.words.clear(),
    db.mistakes.clear(),
    db.highlights.clear(),
    db.positions.clear(),
    db.drafts.clear(),
    db.bookmarks.clear(),
    db.daily.clear()
  ]);
}

export async function exportAll() {
  const [attempts, words, mistakes, highlights, drafts, bookmarks, daily, settings] = await Promise.all([
    db.attempts.toArray(),
    db.words.toArray(),
    db.mistakes.toArray(),
    db.highlights.toArray(),
    db.drafts.toArray(),
    db.bookmarks.toArray(),
    db.daily.toArray(),
    db.settings.toArray()
  ]);
  return {
    app: 'EXAMSPACE',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: { attempts, words, mistakes, highlights, drafts, bookmarks, daily, settings }
  };
}

export async function importAll(payload: Awaited<ReturnType<typeof exportAll>>) {
  const d = payload.data;
  await db.transaction('rw', [db.attempts, db.words, db.mistakes, db.highlights, db.drafts, db.bookmarks, db.daily, db.settings], async () => {
    await db.attempts.bulkPut(d.attempts);
    await db.words.bulkPut(d.words);
    await db.mistakes.bulkPut(d.mistakes);
    await db.highlights.bulkPut(d.highlights);
    await db.drafts.bulkPut(d.drafts);
    await db.bookmarks.bulkPut(d.bookmarks);
    await db.daily.bulkPut(d.daily);
    await db.settings.bulkPut(d.settings as { key: string; value: unknown }[]);
  });
}