import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Bookmark, BookmarkCheck, ChevronLeft, House, RotateCcw, Target } from 'lucide-react';
import { usePaper, paperReady } from '@/data/papers';
import { getAttempt, listDrafts, saveDraft } from '@/db';
import { checkAnswer, isObjective } from '@/lib/score';
import { formatClock } from '@/lib/text';
import { Explanation, Options, QuestionHead } from '@/components/QuestionParts';
import type { Attempt, Paper, PaperPart, Question } from '@/types/paper';

/** 成绩报告：判分统计、逐题解析、错题重练 */
export default function Result() {
  const { attemptId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const retryQids = useMemo(() => {
    const raw = searchParams.get('retry');
    return raw ? raw.split(',').filter(Boolean) : null;
  }, [searchParams]);

  const [attempt, setAttempt] = useState<Attempt | null | undefined>(undefined);
  const [savedEssays, setSavedEssays] = useState<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;
    void getAttempt(attemptId).then((a) => {
      if (alive) setAttempt(a ?? null);
    });
    return () => {
      alive = false;
    };
  }, [attemptId]);

  const paper: Paper | undefined = usePaper(attempt?.paperId);
  const ready = paperReady(attempt?.paperId);

  const scoped = useMemo(() => {
    if (!paper || !attempt) return [] as { part: PaperPart; question: Question }[];
    const qScope = retryQids && retryQids.length > 0 ? new Set(retryQids) : null;
    const out: { part: PaperPart; question: Question }[] = [];
    for (const part of paper.parts) {
      if (attempt.scopePartIds.length > 0 && !attempt.scopePartIds.includes(part.id)) continue;
      for (const q of part.questions) {
        if (qScope && !qScope.has(q.id)) continue;
        out.push({ part, question: q });
      }
    }
    return out;
  }, [paper, attempt, retryQids]);

  // 已收藏的范文
  useEffect(() => {
    if (!paper) return;
    let alive = true;
    void (async () => {
      const all = await listDrafts();
      const prefix = `essay::${paper.id}::`;
      const ids = new Set(all.filter((d) => d.id.startsWith(prefix)).map((d) => d.id));
      if (alive) setSavedEssays(ids);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paper?.id, scoped.length]);

  if (attempt === undefined) {
    return <div className="py-16 text-center text-[13px] text-ink-mute">加载成绩…</div>;
  }
  if (!attempt || !paper || !attempt.result) {
    return (
      <div className="mx-auto max-w-content px-4 py-10 text-center text-sm text-ink-mute">
        成绩记录不存在或尚未交卷。
        <div className="mt-3">
          <Link className="btn btn-ghost" to="/">返回首页</Link>
        </div>
      </div>
    );
  }

  const r = attempt.result;
  const accuracy = r.correct + r.wrong + r.unanswered > 0
    ? Math.round((r.correct / Math.max(1, r.correct + r.wrong + r.unanswered)) * 100)
    : 0;
  const wrongItems = scoped.filter(({ question }) => {
    if (!isObjective(question)) return false;
    const v = attempt.answers[question.id];
    return v != null && v !== '' && !checkAnswer(question, v);
  });
  const retryLink =
    wrongItems.length > 0
      ? `/exam/${paper.id}?mode=practice&retry=${wrongItems.map(({ question }) => question.id).join(',')}`
      : null;

  const toggleEssay = async (paperId: string, question: Question, text: string) => {
    const key = essayKey(paperId, question.id);
    const next = new Set(savedEssays);
    // db 草稿表充当范文收藏：存在即已收藏，再次点击覆盖保存（保持最新参考）
    await saveDraft({ id: key, paperId, questionId: question.id, text, updatedAt: Date.now() });
    next.add(key);
    setSavedEssays(next);
  };

  if (!ready) {
    return <div className="py-16 text-center text-[13px] text-ink-mute">正在加载试卷题目…</div>;
  }
  return (
    <div className="min-h-full">
      <header className="no-print sticky top-0 z-40 border-b hairline bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-content items-center gap-3 px-4 sm:px-6">
          <button className="btn btn-quiet px-2" onClick={() => navigate('/')} aria-label="首页">
            <ChevronLeft size={17} />
          </button>
          <div className="min-w-0">
            <div className="truncate text-[13.5px] font-semibold">{paper.title}</div>
            <div className="truncate text-[11px] text-ink-mute">
              {attempt.mode === 'exam' ? '模拟考试' : '练习模式'}
              {retryQids ? ` · 错题重练` : ''} · 成绩报告
            </div>
          </div>
          <Link to="/" className="btn btn-ghost ml-auto h-8 px-3 text-[12.5px]">
            <House size={14} /> 首页
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-content px-4 pb-16 pt-6 sm:px-6">
        {/* 分数概览 */}
        <section className="card grid gap-5 px-6 py-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex items-baseline gap-2 sm:block">
            <div className="font-mono text-[44px] font-semibold leading-none tracking-tight text-brand-700">
              {r.autoScore}
              <span className="text-[18px] text-ink-faint"> / {r.autoTotal}</span>
            </div>
            <div className="mt-1 text-[12px] text-ink-mute sm:mt-2">客观题得分</div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <Stat label="正确" value={`${r.correct}`} tone="good" />
            <Stat label="错误" value={`${r.wrong}`} tone="bad" />
            <Stat label="未作答" value={`${r.unanswered}`} />
            <Stat label="正确率" value={`${accuracy}%`} tone="good" />
            <Stat label="用时" value={formatClock(attempt.elapsedSec)} />
            <Stat label="待人工核对" value={`${r.manualPending}`} />
          </div>
        </section>

        {/* 分部分统计 */}
        {r.byPart.length > 0 && (
          <section className="card mt-4 px-6 py-5">
            <div className="mb-3 text-[13px] font-semibold">分部分表现</div>
            <div className="space-y-3">
              {r.byPart
                .filter((p) => p.total > 0)
                .map((p) => {
                  const pct = p.total === 0 ? 0 : Math.round((p.correct / p.total) * 100);
                  return (
                    <div key={p.partId} className="flex items-center gap-3">
                      <div className="w-52 shrink-0 truncate text-[12.5px] text-ink-soft" title={p.title}>
                        {p.title}
                      </div>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                        <div
                          className={clsx('h-full rounded-full transition-all', pct >= 60 ? 'bg-brand-500' : 'bg-amber-500')}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="w-16 shrink-0 text-right font-mono text-[12px] text-ink-mute">
                        {p.correct}/{p.total}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* 操作 */}
        <section className="mt-4 flex flex-wrap gap-2.5">
          <Link className="btn btn-primary" to={`/exam/${paper.id}?mode=exam`}>
            <RotateCcw size={15} /> 再做一次（模拟考试）
          </Link>
          {retryLink && (
            <Link className="btn btn-ghost" to={retryLink}>
              <Target size={15} /> 错题重练（{wrongItems.length} 题）
            </Link>
          )}
          <Link className="btn btn-ghost" to={`/read/${paper.id}`}>
            回到阅读
          </Link>
        </section>

        {/* 逐题回顾 */}
        <section className="mt-7">
          <div className="mb-3 text-[13px] font-semibold">逐题回顾</div>
          <div className="space-y-6">
            {scoped.map(({ part, question }) => {
              const value = attempt.answers[question.id];
              if (question.type === 'translation' || question.type === 'writing') {
                const essayText = question.type === 'writing' ? part.reference?.essay : part.reference?.translation;
                const savedKey = essayKey(paper.id, question.id);
                return (
                  <div key={question.id} id={`q-${question.id}`} className="card px-5 py-4">
                    <QuestionHead question={question} showScore />
                    <div className="mt-2.5 space-y-3 pl-8">
                      <div>
                        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                          我的作答
                        </div>
                        <p className="whitespace-pre-wrap rounded-lg border hairline bg-black/[0.015] px-3.5 py-3 font-serif text-[13.5px] leading-relaxed text-ink">
                          {value?.trim() ? value : <span className="text-ink-faint">（未作答）</span>}
                        </p>
                      </div>
                      {essayText && (
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                              {question.type === 'writing' ? '参考范文' : '参考译文'}
                            </span>
                            <button
                              className="btn btn-quiet h-7 gap-1 px-2 text-[11.5px]"
                              onClick={() => void toggleEssay(paper.id, question, essayText)}
                              disabled={savedEssays.has(savedKey)}
                            >
                              {savedEssays.has(savedKey) ? (
                                <>
                                  <BookmarkCheck size={13} /> 已收藏范文
                                </>
                              ) : (
                                <>
                                  <Bookmark size={13} /> 收藏范文
                                </>
                              )}
                            </button>
                          </div>
                          <p className="whitespace-pre-wrap rounded-lg border hairline bg-brand-50/50 px-3.5 py-3 font-serif text-[13.5px] leading-relaxed text-ink">
                            {essayText}
                          </p>
                        </div>
                      )}
                      <div className="text-[11.5px] text-ink-mute">主观题需人工核对，判分不计入上方自动得分。</div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={question.id} id={`q-${question.id}`} className="card px-5 py-4">
                  <QuestionHead question={question} showScore />
                  <div className="mt-2.5 pl-8">
                    {question.type === 'blank' ? (
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-[12.5px]">
                        <span
                          className={clsx(
                            'font-semibold',
                            value != null && value !== '' && checkAnswer(question, value)
                              ? 'text-brand-600'
                              : 'text-danger-500'
                          )}
                        >
                          {value != null && value !== '' && checkAnswer(question, value) ? '回答正确' : value ? '回答错误' : '未作答'}
                        </span>
                        <span className="text-ink-mute">
                          你的答案 <span className="font-mono text-ink">{value?.trim() || '—'}</span>
                        </span>
                      </div>
                    ) : (
                      <Options question={question} value={value} onChange={() => {}} revealed disabled />
                    )}
                    <Explanation question={question} value={value} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link className="btn btn-ghost" to="/practice">
            返回练习中心
          </Link>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' }) {
  return (
    <div>
      <div
        className={clsx(
          'font-mono text-[20px] font-semibold tabular-nums',
          tone === 'good' ? 'text-brand-700' : tone === 'bad' ? 'text-danger-500' : 'text-ink'
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[11.5px] text-ink-mute">{label}</div>
    </div>
  );
}

function essayKey(paperId: string, qid: string) {
  return `essay::${paperId}::${qid}`;
}
