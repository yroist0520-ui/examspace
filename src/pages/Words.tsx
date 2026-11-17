import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { BookCheck, Download, Search, Trash2 } from 'lucide-react';
import { listWords, removeWord, updateWord } from '@/db';
import { lookupWord } from '@/data/lexicon';
import { dueCount, nextReview } from '@/lib/srs';
import { relativeDay } from '@/lib/text';
import type { WordEntry } from '@/types/paper';

/**
 * 生词本：分类/搜索/复习（Leitner 遗忘曲线）/导出
 */
export default function Words() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string>('all');
  const [status, setStatus] = useState<'all' | 'learning' | 'mastered'>('all');
  const [reviewing, setReviewing] = useState(false);

  const load = useCallback(async () => {
    setWords(await listWords());
    setLoaded(true);
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const due = useMemo(() => dueCount(words), [words]);
  const mastered = words.filter((w) => w.mastered).length;
  const tags = useMemo(() => Array.from(new Set(words.map((w) => w.tag))), [words]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      if (q && !w.word.toLowerCase().includes(q) && !(w.source?.sentence ?? '').toLowerCase().includes(q)) return false;
      if (tag !== 'all' && w.tag !== tag) return false;
      if (status === 'mastered' && !w.mastered) return false;
      if (status === 'learning' && w.mastered) return false;
      return true;
    });
  }, [words, query, tag, status]);

  const toggleMastered = async (w: WordEntry) => {
    await updateWord(w.id, { mastered: !w.mastered });
    setWords((prev) => prev.map((x) => (x.id === w.id ? { ...x, mastered: !w.mastered } : x)));
  };

  const remove = async (w: WordEntry) => {
    await removeWord(w.id);
    setWords((prev) => prev.filter((x) => x.id !== w.id));
  };

  const exportCsv = () => {
    const header = ['word', 'tag', 'box', 'reviewCount', 'nextReviewAt', 'mastered', 'sourcePaper', 'sentence'];
    const lines = words.map((w) =>
      [w.word, w.tag, w.box, w.reviewCount, new Date(w.nextReviewAt).toISOString().slice(0, 10), w.mastered ? '1' : '0', w.source?.paperTitle ?? '', w.source?.sentence ?? '']
        .map((c) => `"${String(c).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = '\ufeff' + [header.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `examspace-words-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight">生词本</h1>
          <p className="mt-1 text-[13px] text-ink-mute">
            共 {words.length} 词 · <span className="text-brand-600">{due} 个待复习</span> · 已掌握 {mastered}
          </p>
        </div>
        <div className="flex gap-2">
          {due > 0 && (
            <button className="btn btn-primary" onClick={() => setReviewing(true)}>
              <BookCheck size={15} /> 开始复习（{due}）
            </button>
          )}
          <button className="btn btn-ghost" onClick={exportCsv} disabled={words.length === 0}>
            <Download size={15} /> 导出 CSV
          </button>
        </div>
      </header>

      {reviewing && due > 0 && (
        <ReviewPanel
          queue={words.filter((w) => !w.mastered && w.nextReviewAt <= Date.now())}
          onDone={(id, box, nextAt) => {
            const w = words.find((x) => x.id === id);
            if (!w) return;
            const patch: Partial<WordEntry> = {
              box,
              nextReviewAt: nextAt,
              reviewCount: w.reviewCount + 1,
              lastReviewedAt: Date.now(),
              mastered: box >= 7
            };
            void updateWord(id, patch);
            setWords((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
          }}
          onClose={() => setReviewing(false)}
        />
      )}

      {/* 筛选 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            className="field w-56 pl-8"
            placeholder="搜索单词或语境…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className={clsx('chip', tag === 'all' && 'border border-brand-500 bg-brand-50 text-brand-700')} onClick={() => setTag('all')}>
          全部标签
        </button>
        {tags.map((t) => (
          <button
            key={t}
            className={clsx('chip', tag === t && 'border border-brand-500 bg-brand-50 text-brand-700')}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          {(['all', 'learning', 'mastered'] as const).map((s) => (
            <button
              key={s}
              className={clsx('chip', status === s && 'border border-brand-500 bg-brand-50 text-brand-700')}
              onClick={() => setStatus(s)}
            >
              {s === 'all' ? '全部' : s === 'learning' ? '掌握中' : '已掌握'}
            </button>
          ))}
        </div>
      </div>

      {/* 列表 */}
      {loaded && filtered.length === 0 && (
        <div className="card p-10 text-center text-[13px] text-ink-mute">
          {words.length === 0 ? '还没有生词。阅读试卷时点击单词即可加入生词本。' : '没有匹配的单词。'}
        </div>
      )}
      <div className="grid gap-2.5 md:grid-cols-2">
        {filtered.map((w) => {
          const entry = lookupWord(w.word);
          const dueToday = !w.mastered && w.nextReviewAt <= Date.now();
          return (
            <div key={w.id} className="card px-4 py-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[15px] font-semibold">{w.word}</span>
                    {entry?.phonetic && <span className="font-mono text-[11.5px] text-ink-faint">{entry.phonetic}</span>}
                    {dueToday && <span className="badge badge-warning">今日待复习</span>}
                    {w.mastered && <span className="badge badge-success">已掌握</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
                    {entry && entry.senses.length > 0
                      ? entry.senses.map((s) => `${s.pos} ${s.cn}`).join('；')
                      : '词库未收录释义'}
                  </p>
                  {w.source && (
                    <p className="mt-1 line-clamp-1 text-[11px] text-ink-faint">
                      来源：{w.source.paperTitle}{w.source.sentence ? ` · ${w.source.sentence.slice(0, 60)}…` : ''}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <div className="flex gap-0.5" title={`记忆强度 第 ${w.box} / 7 箱`}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <span key={i} className={clsx('h-3.5 w-1 rounded-sm', i < w.box ? 'bg-brand-500' : 'bg-black/[0.08]')} />
                    ))}
                  </div>
                  <span className="text-[10.5px] text-ink-faint">
                    {w.mastered ? '已掌握' : `${relativeDay(w.nextReviewAt)}复习`}
                  </span>
                  <div className="flex gap-1">
                    <button className="btn btn-quiet h-7 px-1.5 text-[11.5px]" onClick={() => void toggleMastered(w)}>
                      {w.mastered ? '恢复' : '掌握'}
                    </button>
                    <button className="btn btn-quiet h-7 px-1.5 text-danger-500" onClick={() => void remove(w)} aria-label="删除">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** 复习面板：忘记 / 模糊 / 认识 三档推进 Leitner 箱 */
function ReviewPanel({
  queue,
  onDone,
  onClose
}: {
  queue: WordEntry[];
  onDone: (id: string, box: number, nextReviewAt: number) => void;
  onClose: () => void;
}) {
  // 进入复习时固定队列快照，复习推进更新数据不打乱顺序
  const [items] = useState(() => queue);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const current = items[idx];

  const grade = (grade: 'forget' | 'vague' | 'known') => {
    if (!current) return;
    let box = current.box;
    let nextAt: number;
    if (grade === 'forget') {
      box = 1;
      nextAt = nextReview(0, false);
    } else if (grade === 'vague') {
      // 保持原箱：间隔按当前箱计算
      nextAt = nextReview(Math.max(box - 1, 0), true);
    } else {
      box = Math.min(box + 1, 7);
      nextAt = nextReview(box - 1, true);
    }
    onDone(current.id, box, nextAt);
    setRevealed(false);
    if (idx + 1 >= items.length) {
      onClose();
    } else {
      setIdx((i) => i + 1);
    }
  };

  if (!current) return null;
  const entry = lookupWord(current.word);

  return (
    <div className="card px-6 py-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="label">复习进度 {idx + 1} / {items.length}</span>
        <button className="btn btn-quiet h-7 px-2 text-[12px]" onClick={onClose}>
          退出复习
        </button>
      </div>

      <div className="text-center">
        <div className="text-[30px] font-semibold tracking-tight">{current.word}</div>
        {entry?.phonetic && <div className="mt-1 font-mono text-[13px] text-ink-faint">{entry.phonetic}</div>}
        {current.source?.sentence && (
          <p className="mx-auto mt-3 max-w-xl font-serif text-[13px] italic leading-relaxed text-ink-mute">
            “…{current.source.sentence.slice(0, 160)}…”
          </p>
        )}

        {!revealed ? (
          <button className="btn btn-ghost mt-5 px-6" onClick={() => setRevealed(true)}>
            显示释义
          </button>
        ) : (
          <div className="mt-4 animate-in">
            <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-ink">
              {entry && entry.senses.length > 0
                ? entry.senses.map((s) => `${s.pos} ${s.cn}`).join('；')
                : '词库未收录释义 — 请自评回忆情况'}
            </p>
            <div className="mt-5 flex justify-center gap-2.5">
              <button className="btn btn-danger px-5" onClick={() => grade('forget')}>
                忘记了
              </button>
              <button className="btn btn-ghost px-5" onClick={() => grade('vague')}>
                有点模糊
              </button>
              <button className="btn btn-primary px-5" onClick={() => grade('known')}>
                记住了
              </button>
            </div>
            <p className="mt-3 text-[11px] text-ink-faint">忘记 → 回第 1 箱（1 天后）· 模糊 → 保持原箱 · 记住 → 进一箱</p>
          </div>
        )}
      </div>
    </div>
  );
}
