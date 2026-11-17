import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { BookOpen, FilePenLine, History, Play, Timer } from 'lucide-react';
import { examMap, exams, examName } from '@/data/exams';
import { paperMetas, allPaperMetas, paperById } from '@/data/papers';
import { listAttempts, listDrafts } from '@/db';
import { relativeDay } from '@/lib/text';
import { SampleBadge, ResourceBadge } from '@/components/ui';
import type { Attempt, Draft, ExamCode, PaperMeta } from '@/types/paper';

/**
 * 练习中心：
 * - 继续未完成的作答
 * - 按试卷开练：模拟考试 / 练习模式
 * - 最近成绩与收藏的范文
 */
export default function Practice() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [examFilter, setExamFilter] = useState<ExamCode | 'all'>('all');

  useEffect(() => {
    let alive = true;
    void (async () => {
      const [a, d] = await Promise.all([listAttempts(), listDrafts()]);
      if (!alive) return;
      setAttempts(a);
      setDrafts(d.filter((x) => x.id.startsWith('essay::')));
    })();
    return () => {
      alive = false;
    };
  }, []);

  const activeAttempts = attempts.filter((a) => !a.submittedAt);
  const recentResults = attempts.filter((a) => a.result && a.submittedAt).slice(0, 6);

  const filteredPapers = useMemo(
    () => (examFilter === 'all' ? paperMetas : paperMetas.filter((p) => p.exam === examFilter)),
    [examFilter]
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-[19px] font-semibold tracking-tight">练习中心</h1>
        <p className="mt-1 text-[13px] text-ink-mute">
          继续未完成的作答；真实真题因版权以来源链接提供，获得授权后可站内开练。
        </p>
      </header>

      {/* 继续作答 */}
      {activeAttempts.length > 0 && (
        <section>
          <h2 className="label mb-3">继续作答</h2>
          <div className="space-y-2.5">
            {activeAttempts.map((a) => {
              const meta = allPaperMetas.find((p) => p.id === a.paperId);
              const done = new Set(Object.values(a.answers).filter(Boolean)).size;
              return (
                <div key={a.id} className="card flex flex-wrap items-center gap-3 px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <FilePenLine size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-medium">{meta?.title ?? a.paperId}</div>
                    <div className="text-[11.5px] text-ink-mute">
                      {a.mode === 'exam' ? '模拟考试' : '练习模式'} · 已答约 {done} 项 · 开始于{relativeDay(a.startedAt)}
                    </div>
                  </div>
                  <Link className="btn btn-primary h-8 px-3 text-[12.5px]" to={`/exam/${a.paperId}?mode=${a.mode}`}>
                    <Play size={13} /> 继续
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 最近成绩 */}
      {recentResults.length > 0 && (
        <section>
          <h2 className="label mb-3">最近成绩</h2>
          <div className="card divide-y hairline">
            {recentResults.map((a) => {
              const meta = allPaperMetas.find((p) => p.id === a.paperId);
              const r = a.result!;
              return (
                <Link key={a.id} to={`/result/${a.id}`} className="flex items-center gap-3 px-4 py-3 transition hover:bg-black/[0.015]">
                  <History size={15} className="shrink-0 text-ink-faint" />
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
        </section>
      )}

      {/* 开始新练习 */}
      <section>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="label mr-1">选择试卷</h2>
          <button
            className={clsx('chip', examFilter === 'all' && 'border border-brand-500 bg-brand-50 text-brand-700')}
            onClick={() => setExamFilter('all')}
          >
            全部
          </button>
          {exams.map((e) => (
            <button
              key={e.code}
              className={clsx('chip', examFilter === e.code && 'border border-brand-500 bg-brand-50 text-brand-700')}
              onClick={() => setExamFilter(e.code)}
            >
              {e.short}
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {filteredPapers.map((p: PaperMeta) => (
            <PaperRow key={p.id} meta={p} />
          ))}
        </div>
        {filteredPapers.length === 0 && (
          <div className="card p-8 text-center text-[13px] text-ink-mute">
            该考试暂无已核验的真题资源；站内作答仅对获得授权的收录内容开放。
          </div>
        )}
      </section>

      {/* 收藏的范文 */}
      {drafts.length > 0 && (
        <section>
          <h2 className="label mb-3">收藏的范文</h2>
          <div className="space-y-2.5">
            {drafts.map((d) => (
              <div key={d.id} className="card px-4 py-3">
                <div className="flex items-center gap-2 text-[12.5px]">
                  <BookOpen size={13} className="text-brand-600" />
                  <span className="font-medium">{paperById(d.paperId)?.title ?? d.paperId}</span>
                </div>
                <p className="mt-1.5 line-clamp-2 font-serif text-[12.5px] leading-relaxed text-ink-mute">{d.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PaperRow({ meta }: { meta: PaperMeta }) {
  const exam = examMap.get(meta.exam);
  const answerable = meta.questionCount > 0;
  return (
    <div className="card flex min-w-0 flex-col gap-3 px-4 py-4 transition hover:border-brand-300">
      <div className="flex items-start gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold text-white"
          style={{ background: exam?.accent ?? '#1f5d4c' }}
        >
          {exam?.short ?? 'EX'}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link to={`/paper/${meta.id}`} className="truncate text-[13.5px] font-medium hover:text-brand-700">
              {meta.title}
            </Link>
            {meta.sample && <SampleBadge />}
            {!answerable && meta.provenance && <ResourceBadge flag="external-only" />}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11.5px] text-ink-mute">
            <span>{examName(meta.exam)}</span>
            <span>·</span>
            <span>{meta.year} {meta.session}</span>
            <span>·</span>
            {answerable ? (
              <>
                <span className="font-mono">{meta.questionCount} 题</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Timer size={11} /> {meta.minutes} 分钟
                </span>
                {meta.hasAudio && <span className="chip">听力</span>}
              </>
            ) : (
              <span>来源链接 · 无站内题面</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto flex gap-2">
        {answerable ? (
          <>
            <Link className="btn btn-primary h-8 flex-1 text-[12.5px]" to={`/exam/${meta.id}?mode=exam`}>
              模拟考试
            </Link>
            <Link className="btn btn-ghost h-8 flex-1 text-[12.5px]" to={`/exam/${meta.id}?mode=practice`}>
              练习模式
            </Link>
          </>
        ) : (
          <Link className="btn btn-ghost h-8 flex-1 text-[12.5px]" to={`/paper/${meta.id}`}>
            查看来源与获取方式
          </Link>
        )}
      </div>
    </div>
  );
}
