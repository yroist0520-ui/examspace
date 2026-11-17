export interface Token {
  text: string;
  start: number;
  end: number;
  word: boolean;
}

const WORD_RE = /[A-Za-z][A-Za-z'’-]*/g;

/** 将段落切分为可点击的单词令牌 */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;
  WORD_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = WORD_RE.exec(text))) {
    if (m.index > cursor) {
      tokens.push({ text: text.slice(cursor, m.index), start: cursor, end: m.index, word: false });
    }
    tokens.push({ text: m[0], start: m.index, end: m.index + m[0].length, word: true });
    cursor = m.index + m[0].length;
  }
  if (cursor < text.length) {
    tokens.push({ text: text.slice(cursor), start: cursor, end: text.length, word: false });
  }
  return tokens;
}

/** 计算选区在容器纯文本中的偏移 */
export function selectionOffsets(container: HTMLElement): { start: number; end: number } | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const range = sel.getRangeAt(0);
  if (!container.contains(range.commonAncestorContainer)) return null;
  const pre = range.cloneRange();
  pre.selectNodeContents(container);
  pre.setEnd(range.startContainer, range.startOffset);
  const start = pre.toString().length;
  const end = start + range.toString().length;
  if (end <= start) return null;
  return { start, end };
}

export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightMatches(text: string, quote?: string): number[] {
  if (!quote) return [];
  const q = quote.trim();
  if (!q) return [];
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  return idx >= 0 ? [idx, idx + q.length] : [];
}

export function countWords(text: string): number {
  return (text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? []).length;
}

export function formatClock(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${`${m}`.padStart(2, '0')}:${`${sec}`.padStart(2, '0')}`;
  return `${`${m}`.padStart(2, '0')}:${`${sec}`.padStart(2, '0')}`;
}

export function formatDate(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const sameYear = d.getFullYear() === now.getFullYear();
  return sameYear
    ? `${d.getMonth() + 1} 月 ${d.getDate()} 日`
    : `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

export function relativeDay(ts: number): string {
  const d = new Date(ts);
  const today = new Date();
  const diff = Math.floor(
    (new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() -
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()) /
      86400000
  );
  if (diff === 0) return '今天';
  if (diff === 1) return '昨天';
  if (diff < 7) return `${diff} 天前`;
  return formatDate(ts);
}