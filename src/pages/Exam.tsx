import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { ChevronLeft, ClipboardList, PenLine, Timer, X } from 'lucide-react';
import { paperById } from '@/data/papers';
import {
  bumpDaily,
  createAttempt,
  deleteAttempt,
  findActiveAttempt,
  recordMistake,
  saveAttemptAnswer,
  submitAttempt
} from '@/db';
import { checkAnswer, isObjective, scoreAttempt } from '@/lib/score';
import { countWords, formatClock } from '@/lib/text';
import { generateId } from '@/lib/utils';
import { BankChips, Options, QuestionHead } from '@/components/QuestionParts';
import AudioPlayer from '@/components/AudioPlayer';
import type { Attempt, Paper, PaperPart, Question } from '@/types/paper';

/**
 * 在线考试系统
 * - 模拟考试模式：倒计时、到时自动提交、不显示解析
 * - 练习模式：正计时、可选边练边看解析
 * - 全程自动保存答题进度，可中断恢复
 * - 支持错题重练（retry 参数限定题目范围）
 */
export default function Exam() {
  const { paperId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode: 'exam' | 'practice' = searchParams.get('mode') === 'practice' ? 'practice' : 'exam';
  const retryQids = useMemo(() => {
    const raw = searchParams.get('retry');
    return raw ? raw.split(',').filter(Boolean) : null;
  }, [searchParams]);

  const paper: Paper | undefined = paperById(paperId);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [now, setNow] = useState(Date.now());
  const [showAnswers, setShowAnswers] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [segmentId, setSegmentId] = useState<string | undefined>();
  const [showTranscript, setShowTranscript] = useState(false);

  const inScope = useCallback(
    (part: PaperPart, q: Question) => {
      if (attempt && attempt.scopePartIds.length > 0 && !attempt.scopePartIds.includes(part.id)) return false;
      if (retryQids && !retryQids.includes(q.id)) return false;
      return true;
    },
    [attempt, retryQids]
  );

  const scopedQuestions = useMemo(() => {
    if (!paper || !attempt) return [];
    const out: { part: PaperPart; question: Question }[] = [];
    for (const part of paper.parts) {
      for (const q of part.questions) {
        if (inScope(part, q)) out.push({ part, question: q });
      }
    }
    return out;
  }, [paper, attempt, inScope]);

  const answeredCount = scopedQuestions.filter(({ question }) => {
    const v = answers[question.id];
    return v != null && v !== '';
  }).length;

  // —— 初始化：恢复未提交的作答，否则创建 ——
  useEffect(() => {
    if (!paper) return;
    let alive = true;
    void (async () => {
      let att = await findActiveAttempt(paper.id);
      if (att && att.mode !== mode) {
        // 同一试卷同时只保留一个未提交作答
        await deleteAttempt(att.id);
        att = undefined;
      }
      if (!att) {
        const fresh: Attempt = {
          id: generateId(),
          paperId: paper.id,
          mode,
          scopePartIds: [],
          startedAt: Date.now(),
          elapsedSec: 0,
          answers: {}
        };
        await createAttempt(fresh);
        att = fresh;
      }
      if (!alive) return;
      setAttempt(att);
      setAnswers(att.answers);
    })();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paper?.id, mode]);

  // —— 计时 ——
  useEffect(() => {
    if (!attempt) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [attempt]);

  const startedAt = attempt?.startedAt ?? Date.now();
  const totalSec = (paper?.minutes ?? 60) * 60;
  const remainSec = mode === 'exam' ? Math.max(0, Math.floor((startedAt + totalSec * 1000 - now) / 1000)) : 0;
  const elapsedSec = Math.max(0, Math.floor((now - startedAt) / 1000));

  const setAnswer = useCallback(
    (qid: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [qid]: value }));
      if (attempt) {
        const secs = Math.max(0, Math.round((Date.now() - attempt.startedAt) / 1000));
        void saveAttemptAnswer(attempt.id, qid, value, secs);
      }
    },
    [attempt]
  );

  // —— 提交 ——
  const submit = useCallback(async () => {
    if (!paper || !attempt || submitting) return;
    setSubmitting(true);
    try {
      const used = mode === 'exam' ? Math.min(totalSec, elapsedSec) : elapsedSec;
      const result = scoreAttempt(paper, answers, attempt.scopePartIds, retryQids ?? undefined);
      await submitAttempt(attempt.id, result, used);
      // 收集错题
      for (const { part, question } of scopedQuestions) {
        if (!isObjective(question)) continue;
        const v = answers[question.id];
        if (v == null || v === '' || checkAnswer(question, v)) continue;
        await recordMistake({
          paperId: paper.id,
          paperTitle: paper.title,
          exam: paper.exam,
          year: paper.year,
          partId: part.id,
          questionId: question.id,
          questionNo: question.number,
          kind: part.kind,
          lastAnswer: v
        });
      }
      await bumpDaily({
        answered: scopedQuestions.filter(({ question }) => isObjective(question)).length,
        correct: result.correct,
        minutes: Math.max(1, Math.round(used / 60))
      });
      const params = retryQids && retryQids.length > 0 ? `?retry=${retryQids.join(',')}` : '';
      navigate(`/result/${attempt.id}${params}`, { replace: true });
    } finally {
      setSubmitting(false);
      setConfirmSubmit(false);
    }
  }, [paper, attempt, submitting, mode, totalSec, elapsedSec, answers, retryQids, scopedQuestions, navigate]);

  const submitRef = useRef(submit);
  submitRef.current = submit;

  // —— 考试模式到时自动提交 ——
  useEffect(() => {
    if (mode === 'exam' && attempt && remainSec <= 0 && !submitting) {
      void submitRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, attempt, remainSec <= 0, submitting]);

  if (!paper) {
    return (
      <div className="mx-auto max-w-content px-4 py-10 text-center text-sm text-ink-mute">
        试卷不存在。<button className="btn btn-ghost mt-3" onClick={() => navigate('/library')}>返回真题库</button>
      </div>
    );
  }
  if (!attempt) {
    return <div className="py-16 text-center text-[13px] text-ink-mute">正在准备考试…</div>;
  }

  const lowTime = mode === 'exam' && remainSec < 300;

  return (
    <div className="min-h-full">
      {/* 顶栏 */}
      <header className="no-print sticky top-0 z-40 border-b hairline bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex h-13 min-h-13 max-w-content items-center gap-3 px-4 sm:px-6">
          <button className="btn btn-quiet px-2" onClick={() => navigate(-1)} aria-label="返回">
            <ChevronLeft size={17} />
          </button>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold">{paper.title}</div>
            <div className="truncate text-[11px] text-ink-mute">
              {retryQids ? `错题重练 · ${retryQids.length} 题` : mode === 'exam' ? '模拟考试模式' : '练习模式'}
              {paper.sample ? ' · 示例数据' : ''}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {mode === 'practice' && (
              <label className="hidden cursor-pointer select-none items-center gap-1.5 text-[12px] text-ink-soft sm:flex">
                <input
                  type="checkbox"
                  className="accent-brand-600"
                  checked={showAnswers}
                  onChange={(e) => setShowAnswers(e.target.checked)}
                />
                边练边看解析
              </label>
            )}
            <div
              className={clsx(
                'flex items-center gap-1.5 rounded-lg border hairline px-2.5 py-1 font-mono text-[13px] tabular-nums',
                lowTime ? 'border-danger-500 bg-danger-50 text-danger-500' : 'text-ink'
              )}
              title={mode === 'exam' ? '剩余时间' : '已用时间'}
            >
              <Timer size={14} className="text-ink-faint" />
              {mode === 'exam' ? formatClock(remainSec) : formatClock(elapsedSec)}
            </div>
            <span className="hidden font-mono text-[12px] text-ink-mute sm:inline">
              {answeredCount}/{scopedQuestions.length}
            </span>
            <button className="btn btn-ghost h-8 px-2.5 text-[12.5px] md:hidden" onClick={() => setShowCard(true)}>
              <ClipboardList size={14} /> 答题卡
            </button>
            <button className="btn btn-primary h-8 px-3 text-[12.5px]" onClick={() => setConfirmSubmit(true)}>
              交卷
            </button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-content px-4 pb-28 pt-6 sm:px-6 md:pr-[264px]">
        {scopedQuestions.length === 0 && (
          <div className="card p-8 text-center text-[13px] text-ink-mute">当前范围内没有题目。</div>
        )}

        {paper.parts.map((part) => {
          const qs = part.questions.filter((q) => inScope(part, q));
          if (qs.length === 0) return null;
          return (
            <section key={part.id} className="mb-9">
              <div className="mb-3">
                <h2 className="text-[14.5px] font-semibold">{part.title}</h2>
                {part.instructions && (
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-mute">{part.instructions}</p>
                )}
                {part.minutes && (
                  <p className="mt-1 text-[11.5px] text-ink-faint">建议用时 {part.minutes} 分钟</p>
                )}
              </div>

              {part.audio && (
                <div className="mb-4">
                  <AudioPlayer
                    track={part.audio}
                    activeSegmentId={segmentId}
                    onSegmentChange={setSegmentId}
                    showTranscript={showTranscript}
                    onToggleTranscript={() => setShowTranscript((x) => !x)}
                  />
                </div>
              )}

              {part.passages && (
                <div className="card mb-4 px-5 py-4">
                  {part.passages.map((passage) => (
                    <div key={passage.id} className="mb-4 last:mb-0">
                      {passage.title && (
                        <div className="mb-2 border-b hairline pb-2 font-serif text-[14px] font-semibold">
                          {passage.title}
                        </div>
                      )}
                      <div className="space-y-2.5 font-serif text-[13.5px] leading-[1.9] text-ink">
                        {passage.paragraphs.map((para) => (
                          <p key={para.id}>
                            {para.marker && <span className="mr-2 font-semibold text-brand-700">{para.marker}</span>}
                            {para.text}
                          </p>
                        ))}
                      </div>
                      {passage.source && (
                        <div className="mt-2 text-right text-[11px] text-ink-faint">— {passage.source}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-5">
                {qs.map((q) => (
                  <div key={q.id} id={`q-${q.id}`} className="scroll-mt-24">
                    <QuestionHead question={q} showScore />
                    <div className="mt-2.5 pl-8">
                      <QuestionBody
                        question={q}
                        part={part}
                        value={answers[q.id]}
                        onChange={(v) => setAnswer(q.id, v)}
                        revealed={showAnswers}
                      />
                      {showAnswers && (
                        <div className="mt-3 rounded-lg border hairline bg-black/[0.015] px-3.5 py-3">
                          <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                            <span className="font-semibold text-brand-600">正确答案</span>
                            <span className="font-mono font-semibold text-ink">{q.answer}</span>
                          </div>
                          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="border-t hairline pt-5 text-center">
          <button className="btn btn-primary px-8" onClick={() => setConfirmSubmit(true)}>
            交卷并查看成绩
          </button>
        </div>
      </div>

      {/* 桌面答题卡 */}
      <aside className="no-print fixed right-6 top-20 hidden w-[224px] md:block">
        <AnswerCard
          questions={scopedQuestions.map(({ question }) => question)}
          answers={answers}
          onJump={(id) => document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        />
      </aside>

      {/* 移动端答题卡抽屉 */}
      {showCard && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px]" onClick={() => setShowCard(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-surface p-4 shadow-float">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-semibold">答题卡</span>
              <button className="btn btn-quiet px-2" onClick={() => setShowCard(false)} aria-label="关闭">
                <X size={16} />
              </button>
            </div>
            <AnswerCard
              questions={scopedQuestions.map(({ question }) => question)}
              answers={answers}
              onJump={(id) => {
                setShowCard(false);
                window.setTimeout(
                  () => document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                  80
                );
              }}
              flat
            />
          </div>
        </div>
      )}

      {/* 交卷确认 */}
      {confirmSubmit && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/35 px-4 backdrop-blur-[2px]">
          <div className="card w-full max-w-sm p-5">
            <div className="text-[15px] font-semibold">确认交卷？</div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-mute">
              已答 {answeredCount} / {scopedQuestions.length} 题
              {answeredCount < scopedQuestions.length && `，还有 ${scopedQuestions.length - answeredCount} 题未作答`}
              。{mode === 'exam' ? '交卷后立即判分。' : '交卷后可查看答案与解析。'}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn btn-ghost" onClick={() => setConfirmSubmit(false)} disabled={submitting}>
                继续作答
              </button>
              <button className="btn btn-primary" onClick={() => void submit()} disabled={submitting}>
                {submitting ? '提交中…' : '确认交卷'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** 单题作答控件 */
function QuestionBody({
  question,
  part,
  value,
  onChange,
  revealed
}: {
  question: Question;
  part: PaperPart;
  value?: string;
  onChange: (v: string) => void;
  revealed?: boolean;
}) {
  if (question.type === 'single') {
    return <Options question={question} value={value} onChange={onChange} />;
  }
  if (question.type === 'bank' && part.bank) {
    return <BankChips bank={part.bank} value={value} onChange={onChange} answer={question.answer} />;
  }
  if (question.type === 'blank') {
    return (
      <input
        className="field max-w-md"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="填写答案…"
        aria-label="填空答案"
      />
    );
  }
  // translation / writing：主观题编辑器
  const isWriting = question.type === 'writing';
  return (
    <div>
      <textarea
        className="field h-auto min-h-40 w-full resize-y py-2.5 font-serif text-[14px] leading-relaxed"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isWriting ? '在此写作文…' : '在此写译文…'}
        spellCheck={false}
      />
      <div className="mt-1 flex justify-between text-[11.5px] text-ink-faint">
        <span>{isWriting ? '写作' : '翻译'} · 主观题提交后需人工核对</span>
        <span className="font-mono">{countWords(value ?? '')} 词</span>
      </div>
      {revealed && part.reference && (
        <div className="mt-3 rounded-lg border hairline bg-black/[0.015] px-3.5 py-3">
          <div className="text-[11.5px] font-semibold text-brand-600">
            {isWriting ? '参考范文' : '参考译文'}
          </div>
          <p className="mt-1.5 font-serif text-[13.5px] leading-relaxed text-ink">
            {isWriting ? part.reference.essay : part.reference.translation}
          </p>
        </div>
      )}
    </div>
  );
}

/** 答题卡 */
function AnswerCard({
  questions,
  answers,
  onJump,
  flat
}: {
  questions: Question[];
  answers: Record<string, string>;
  onJump: (id: string) => void;
  flat?: boolean;
}) {
  return (
    <div className={clsx('card p-3.5', !flat && 'max-h-[calc(100vh-7rem)] overflow-y-auto')}>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[12px] font-semibold">答题卡</span>
        <span className="font-mono text-[11px] text-ink-mute">
          {Object.values(answers).filter((v) => v != null && v !== '').length}/{questions.length}
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {questions.map((q) => {
          const done = answers[q.id] != null && answers[q.id] !== '';
          return (
            <button
              key={q.id}
              onClick={() => onJump(q.id)}
              className={clsx(
                'grid h-7 place-items-center rounded-md border font-mono text-[11px] transition',
                done ? 'border-brand-500 bg-brand-600 text-white' : 'hairline text-ink-mute hover:border-brand-300'
              )}
              title={`第 ${q.number} 题`}
            >
              {q.number}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3 border-t hairline pt-2.5 text-[10.5px] text-ink-mute">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-600" /> 已答
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm border hairline" /> 未答
        </span>
        {questions.some((q) => q.type !== 'single' && q.type !== 'blank' && q.type !== 'bank') && (
          <span className="flex items-center gap-1">
            <PenLine size={11} /> 含主观题
          </span>
        )}
      </div>
    </div>
  );
}
