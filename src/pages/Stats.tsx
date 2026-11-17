import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Flame, Target, Timer } from 'lucide-react';
import { listAttempts, listDaily, listMistakes, listWords } from '@/db';
import { exams } from '@/data/exams';
import { allPaperMetas } from '@/data/papers';
import { accuracyOf, totalMinutes } from '@/lib/score';
import { streakDays } from '@/lib/srs';
import { relativeDay } from '@/lib/text';
import type { Attempt, DailyStat, MistakeRecord, WordEntry } from '@/types/paper';

/** 个人学习统计：时长、完成量、正确率、每日记录、连续学习、词汇与错题 */
export default function Stats() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [daily, setDaily] = useState<DailyStat[]>([]);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);

  useEffect(() => {
    void (async () => {
      const [a, d, w, m] = await Promise.all([listAttempts(), listDaily(), listWords(), listMistakes()]);
      setAttempts(a);
      setDaily(d);
      setWords(w);
      setMistakes(m);
    })();
  }, []);

  const finished = attempts.filter((a) => a.result && a.submittedAt);
  const minutes = Math.max(totalMinutes(attempts), daily.reduce((s, d) => s + d.minutes, 0));
  const accuracy = accuracyOf(finished);
  const streak = streakDays(daily.map((d) => d.date));
  const dueWords = words.filter((w) => !w.mastered && w.nextReviewAt <= Date.now()).length;
  const pendingMistakes = mistakes.filter((m) => !m.mastered).length;

  // 近 14 天
  const last14 = useMemo(() => {
    const map = new Map(daily.map((d) => [d.date, d]));
    const out: { date: string; minutes: number; answered: number; correct: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const dt = new Date();
      dt.setDate(dt.getDate() - i);
      const key = dt.toISOString().slice(0, 10);
      const rec = map.get(key);
      out.push({ date: key, minutes: rec?.minutes ?? 0, answered: rec?.answered ?? 0, correct: rec?.correct ?? 0 });
    }
    return out;
  }, [daily]);
  const maxMinutes = Math.max(10, ...last14.map((d) => d.minutes));

  // 分考试统计
  const byExam = useMemo(() => {
    const rows: { code: string; name: string; count: number; accuracy: number | null }[] = [];
    for (const e of exams) {
      const mine = finished.filter((a) => allPaperMetas.find((p) => p.id === a.paperId)?.exam === e.code);
      rows.push({
        code: e.code,
        name: e.name,
        count: mine.length,
        accuracy: mine.length > 0 ? accuracyOf(mine) : null
      });
    }
    return rows.filter((r) => r.count > 0);
  }, [finished]);

  // 箱级分布
  const boxDist = useMemo(() => {
    const dist = Array.from({ length: 7 }, () => 0);
    for (const w of words) dist[Math.min(Math.max(w.box, 1), 7) - 1] += 1;
    return dist;
  }, [words]);
  const maxBox = Math.max(1, ...boxDist);

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-[19px] font-semibold tracking-tight">学习统计</h1>
        <p className="mt-1 text-[13px] text-ink-mute">你的学习轨迹与积累。</p>
      </header>

      {/* 概览 */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <OverviewCard icon={<Timer size={15} />} label="累计学习" value={minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}m`} />
        <OverviewCard icon={<Target size={15} />} label="完成试卷" value={`${finished.length} 套`} />
        <OverviewCard icon={<Flame size={15} />} label="连续学习" value={`${streak} 天`} tone={streak > 0 ? 'brand' : undefined} />
        <OverviewCard label="总体正确率" value={`${accuracy}%`} />
        <OverviewCard label="生词积累" value={`${words.length} 词`} hint={dueWords > 0 ? `${dueWords} 待复习` : '暂无待复习'} />
        <OverviewCard label="待掌握错题" value={`${pendingMistakes} 题`} hint={mistakes.length > 0 ? `累计 ${mistakes.length}` : '暂无错题'} tone={pendingMistakes > 0 ? 'bad' : undefined} />
      </section>

      {/* 近 14 天 */}
      <section className="card px-6 py-5">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold">近 14 天学习</h2>
          <span className="text-[11.5px] text-ink-mute">
            合计 {last14.reduce((s, d) => s + d.minutes, 0)} 分钟 · {last14.reduce((s, d) => s + d.answered, 0)} 题
          </span>
        </div>
        <div className="flex h-32 items-end gap-1.5">
          {last14.map((d) => (
            <div
              key={d.date}
              className="group relative flex-1"
              title={`${d.date}：${d.minutes} 分钟，${d.correct}/${d.answered} 答对`}
            >
              <div
                className={clsx(
                  'w-full rounded-t-sm transition-all',
                  d.minutes > 0 ? 'bg-brand-500 group-hover:bg-brand-600' : 'bg-black/[0.06]'
                )}
                style={{ height: `${Math.max(3, Math.round((d.minutes / maxMinutes) * 112))}px` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          {last14.map((d) => (
            <span key={d.date} className="flex-1 text-center text-[9.5px] text-ink-faint">
              {Number(d.date.slice(8)) === 1 || d.date === last14[0].date ? d.date.slice(5) : Number(d.date.slice(8))}
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 分考试 */}
        <section className="card px-6 py-5">
          <h2 className="mb-4 text-[13px] font-semibold">分考试表现</h2>
          {byExam.length === 0 ? (
            <p className="text-[12.5px] text-ink-mute">完成至少一套试卷后展示。</p>
          ) : (
            <div className="space-y-3.5">
              {byExam.map((r) => (
                <div key={r.code}>
                  <div className="mb-1 flex items-center justify-between text-[12.5px]">
                    <span>{r.name}</span>
                    <span className="font-mono text-ink-mute">
                      {r.count} 套{r.accuracy != null && ` · ${r.accuracy}%`}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
                    <div
                      className={clsx('h-full rounded-full', (r.accuracy ?? 0) >= 60 ? 'bg-brand-500' : 'bg-amber-500')}
                      style={{ width: `${r.accuracy ?? 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 词汇进阶 */}
        <section className="card px-6 py-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-[13px] font-semibold">词汇记忆分布</h2>
            <span className="text-[11.5px] text-ink-mute">Leitner 七箱</span>
          </div>
          {words.length === 0 ? (
            <p className="text-[12.5px] text-ink-mute">阅读时点击单词加入生词本后展示。</p>
          ) : (
            <div className="space-y-2">
              {boxDist.map((count, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-[11px] text-ink-mute">第 {i + 1} 箱</span>
                  <div className="h-4 flex-1 overflow-hidden rounded bg-black/[0.05]">
                    <div className="h-full rounded bg-brand-500/80" style={{ width: `${(count / maxBox) * 100}%` }} />
                  </div>
                  <span className="w-7 shrink-0 text-right font-mono text-[11px] text-ink-mute">{count}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* 最近成绩 */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="label">最近成绩</h2>
          {finished.length > 0 && (
            <Link className="text-[12px] text-brand-600 hover:underline" to="/practice">
              练习中心 →
            </Link>
          )}
        </div>
        {finished.length === 0 ? (
          <div className="card p-8 text-center text-[13px] text-ink-mute">完成第一套试卷后，这里会出现你的成绩。</div>
        ) : (
          <div className="card divide-y hairline">
            {finished.slice(0, 8).map((a) => {
              const meta = allPaperMetas.find((p) => p.id === a.paperId);
              const r = a.result!;
              return (
                <Link key={a.id} to={`/result/${a.id}`} className="flex items-center gap-3 px-4 py-3 transition hover:bg-black/[0.015]">
                  <span className="min-w-0 flex-1 truncate text-[13px]">{meta?.title ?? a.paperId}</span>
                  <span className="shrink-0 font-mono text-[13px] font-semibold text-brand-700">
                    {r.autoScore}/{r.autoTotal}
                  </span>
                  <span className="hidden shrink-0 font-mono text-[11.5px] text-ink-mute sm:inline">
                    {r.correct} 对 {r.wrong} 错
                  </span>
                  <span className="hidden shrink-0 text-[11.5px] text-ink-faint md:inline">
                    {a.submittedAt ? relativeDay(a.submittedAt) : ''}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function OverviewCard({
  icon,
  label,
  value,
  hint,
  tone
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  tone?: 'brand' | 'bad';
}) {
  return (
    <div className="card px-4 py-3.5">
      <div className="flex items-center gap-1.5 text-[11px] text-ink-mute">
        {icon && <span className="text-ink-faint">{icon}</span>}
        {label}
      </div>
      <div
        className={clsx(
          'mt-1.5 font-mono text-[21px] font-semibold tabular-nums',
          tone === 'brand' ? 'text-brand-700' : tone === 'bad' ? 'text-danger-500' : 'text-ink'
        )}
      >
        {value}
      </div>
      {hint && <div className="mt-0.5 text-[10.5px] text-ink-faint">{hint}</div>}
    </div>
  );
}
