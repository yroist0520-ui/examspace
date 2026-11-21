import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { BookOpenCheck, ChevronDown, ExternalLink, RotateCcw } from 'lucide-react';
import { listMistakes, markMastered } from '@/db';
import { examMap, exams, partKindLabel } from '@/data/exams';
import { getQuestion, paperById, loadPaper } from '@/data/papers';
import { relativeDay } from '@/lib/text';
import { Explanation, Options, QuestionHead } from '@/components/QuestionParts';
import type { ExamCode, MistakeRecord, PartKind } from '@/types/paper';

/**
 * 错题本：按考试/题型分类、错误次数、查看原题解析、重新答题、标记已掌握
 */
export default function Mistakes() {
  const [items, setItems] = useState<MistakeRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [exam, setExam] = useState<ExamCode | 'all'>('all');
  const [kind, setKind] = useState<PartKind | 'all'>('all');
  const [year, setYear] = useState<number | 'all'>('all');
  const [onlyPending, setOnlyPending] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const [, setContentTick] = useState(0);
  useEffect(() => {
    void listMistakes().then(async (list) => {
      setItems(list);
      setLoaded(true);
      // 错题涉及多套试卷：按需加载各自正文，全部就绪后刷新一次列表
      const ids = Array.from(new Set(list.map((m) => m.paperId)));
      await Promise.all(ids.map((id) => loadPaper(id).catch(() => undefined)));
      setContentTick((t) => t + 1);
    });
  }, []);

  const years = useMemo(() => Array.from(new Set(items.map((m) => m.year))).sort((a, b) => b - a), [items]);
  const pending = items.filter((m) => !m.mastered).length;

  const filtered = useMemo(() => {
    return items.filter((m) => {
      if (exam !== 'all' && m.exam !== exam) return false;
      if (kind !== 'all' && m.kind !== kind) return false;
      if (year !== 'all' && m.year !== year) return false;
      if (onlyPending && m.mastered) return false;
      return true;
    });
  }, [items, exam, kind, year, onlyPending]);

  const toggleMastered = useCallback(async (m: MistakeRecord) => {
    await markMastered(m.id, !m.mastered);
    setItems((prev) => prev.map((x) => (x.id === m.id ? { ...x, mastered: !m.mastered } : x)));
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight">错题本</h1>
          <p className="mt-1 text-[13px] text-ink-mute">
            共 {items.length} 题 · <span className="text-danger-500">{pending} 题待掌握</span> · 已掌握 {items.length - pending}
          </p>
        </div>
        <button className={clsx('chip h-8 px-3', onlyPending && 'border border-brand-500 bg-brand-50 text-brand-700')} onClick={() => setOnlyPending((x) => !x)}>
          只看未掌握
        </button>
      </header>

      {/* 筛选 */}
      <div className="flex flex-wrap items-center gap-2">
        <button className={clsx('chip', exam === 'all' && 'border border-brand-500 bg-brand-50 text-brand-700')} onClick={() => setExam('all')}>
          全部考试
        </button>
        {exams.map((e) => (
          <button
            key={e.code}
            className={clsx('chip', exam === e.code && 'border border-brand-500 bg-brand-50 text-brand-700')}
            onClick={() => setExam(e.code)}
          >
            {e.short}
          </button>
        ))}
        <select className="field h-7 w-auto text-[12px]" value={String(kind)} onChange={(e) => setKind(e.target.value as PartKind | 'all')}>
          <option value="all">全部题型</option>
          <option value="listening">听力</option>
          <option value="reading">阅读</option>
          <option value="cloze">完形</option>
          <option value="vocabulary">词汇</option>
          <option value="translation">翻译</option>
          <option value="writing">写作</option>
        </select>
        <select className="field h-7 w-auto text-[12px]" value={String(year)} onChange={(e) => setYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
          <option value="all">全部年份</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {loaded && filtered.length === 0 && (
        <div className="card p-10 text-center text-[13px] text-ink-mute">
          {items.length === 0 ? '还没有错题。模拟考试或练习后，答错的题会自动收集到这里。' : '当前筛选下没有错题。'}
        </div>
      )}

      <div className="space-y-2.5">
        {filtered.map((m) => {
          const paper = paperById(m.paperId);
          const found = paper ? getQuestion(paper, m.questionId) : undefined;
          const question = found?.question;
          const open = expanded === m.id;
          const examMeta = examMap.get(m.exam);
          return (
            <div key={m.id} className="card px-4 py-3.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white"
                  style={{ background: examMeta?.accent ?? '#1f5d4c' }}
                >
                  {examMeta?.short ?? 'EX'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="font-semibold">第 {m.questionNo} 题</span>
                    <span className="chip">{partKindLabel[m.kind]}</span>
                    <span className="text-ink-mute">{m.year} · {m.paperTitle}</span>
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-ink-faint">
                    错误 {m.wrongCount} 次 · 最近错误 {relativeDay(m.lastWrongAt)} · 我的答案
                    <span className="ml-1 font-mono text-danger-500">{m.lastAnswer}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {m.mastered && <span className="badge badge-success">已掌握</span>}
                  <button className="btn btn-ghost h-7 gap-1 px-2 text-[12px]" onClick={() => setExpanded(open ? null : m.id)}>
                    {open ? '收起' : '看原题'}
                    <ChevronDown size={13} className={clsx('transition', open && 'rotate-180')} />
                  </button>
                  <Link className="btn btn-ghost h-7 gap-1 px-2 text-[12px]" to={`/exam/${m.paperId}?mode=practice&retry=${m.questionId}`}>
                    <RotateCcw size={13} /> 重做
                  </Link>
                  <button
                    className={clsx('btn h-7 gap-1 px-2 text-[12px]', m.mastered ? 'btn-quiet' : 'btn-ghost')}
                    onClick={() => void toggleMastered(m)}
                  >
                    <BookOpenCheck size={13} /> {m.mastered ? '恢复' : '标掌握'}
                  </button>
                </div>
              </div>

              {open && (
                <div className="mt-3 border-t hairline pt-3 pl-10.5">
                  {!question ? (
                    <div className="text-[12.5px] text-ink-mute">
                      原题暂不可用（试卷数据已更新）。
                      {paper && (
                        <Link className="ml-1 text-brand-600 hover:underline" to={`/paper/${paper.id}`}>
                          查看试卷 <ExternalLink size={11} className="inline" />
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div>
                      <QuestionHead question={question} showScore />
                      <div className="mt-2.5">
                        {question.type === 'blank' ? (
                          <div className="text-[12.5px]">
                            正确答案 <span className="font-mono font-semibold text-brand-700">{question.answer}</span>
                          </div>
                        ) : question.type === 'translation' || question.type === 'writing' ? (
                          <div className="text-[12.5px] text-ink-mute">主观题：请在重做中提交作答，参考答案见成绩报告。</div>
                        ) : (
                          <Options question={question} value={m.lastAnswer} onChange={() => {}} revealed disabled />
                        )}
                        <Explanation question={question} value={m.lastAnswer} />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Link className="btn btn-ghost h-7 px-2.5 text-[12px]" to={`/read/${m.paperId}`}>
                          阅读原文
                        </Link>
                        <Link className="btn btn-ghost h-7 px-2.5 text-[12px]" to={`/paper/${m.paperId}`}>
                          试卷详情
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
