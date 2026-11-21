import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Highlighter,
  List,
  Minus,
  PanelRight,
  Plus,
  Settings2,
  Type,
  X
} from 'lucide-react';
import { usePaper, paperReady, findPassage } from '@/data/papers';
import { partKindLabel, examMap } from '@/data/exams';
import { useApp } from '@/state/AppContext';
import {
  addHighlight,
  bumpDaily,
  bumpDaily as bump,
  getPosition,
  listHighlights,
  removeHighlight,
  saveDraft,
  savePosition,
  updateHighlightNote
} from '@/db';
import PassageView from '@/components/PassageView';
import AudioPlayer from '@/components/AudioPlayer';
import { Options, BankChips, Explanation, QuestionHead } from '@/components/QuestionParts';
import { Modal, SampleBadge } from '@/components/ui';
import type { Highlight, Question } from '@/types/paper';
import { countWords } from '@/lib/text';

export default function Reader() {
  const { paperId = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { settings, update } = useApp();
  const paper = usePaper(paperId);
  const ready = paperReady(paperId);

  const initialPart = params.get('part') ?? paper?.parts[0]?.id ?? '';
  const [partId, setPartId] = useState(initialPart);
  const [showAnswers, setShowAnswers] = useState(settings.showAnswersInReader);
  const [showAudioScript, setShowAudioScript] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [tocOpen, setTocOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [noteTarget, setNoteTarget] = useState<Highlight | null>(null);
  const [noteText, setNoteText] = useState('');
  const [evidence, setEvidence] = useState<{ paragraphId: string; quote?: string } | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [activePassage, setActivePassage] = useState<string | undefined>(params.get('p') ?? undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<number | null>(null);

  const part = paper?.parts.find((p) => p.id === partId) ?? paper?.parts[0];

  useEffect(() => {
    if (!paper) return;
    listHighlights(paper.id).then(setHighlights);
    getPosition(paper.id).then((pos) => {
      if (pos && !params.get('part')) setPartId(pos.partId);
    });
    import('@/db').then((m) => m.listBookmarks().then((b) => setBookmarked(b.some((x) => x.paperId === paper.id))));
    // 恢复草稿答案
    import('@/db').then(async (m) => {
      const drafts = await m.listDrafts();
      const own = drafts.filter((d) => d.paperId === paper.id);
      if (own.length) {
        const map: Record<string, string> = {};
        own.forEach((d) => {
          map[d.questionId] = d.text;
        });
        setAnswers(map);
      }
    });
  }, [paper?.id]);

  // 阅读位置保存
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !paper) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      savePosition({ paperId: paper.id, partId: part?.id ?? '', ratio, updatedAt: Date.now() });
      if (ratio > 0.05) void bump({ minutes: 0.3 });
    }, 700);
  }, [paper?.id, part?.id]);

  const setAnswer = async (q: Question, value: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    if (paper) await saveDraft({ id: `${paper.id}::${q.id}`, paperId: paper.id, questionId: q.id, text: value, updatedAt: Date.now() });
    if (value) await bumpDaily({ answered: 1, correct: showAnswers || value === q.answer ? 1 : 0 });
  };

  const handleAddHighlight = async (h: Omit<Highlight, 'id' | 'createdAt' | 'paperId' | 'partId'>) => {
    if (!paper || !part) return;
    const item: Highlight = {
      ...h,
      id: `hl-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      paperId: paper.id,
      partId: part.id,
      createdAt: Date.now()
    };
    await addHighlight(item);
    setHighlights((prev) => [...prev, item]);
    if (h.note !== undefined) {
      setNoteText(h.note);
      setNoteTarget(item);
    }
  };

  const openNote = (h: Highlight) => {
    setNoteTarget(h);
    setNoteText(h.note ?? '');
  };

  const saveNote = async () => {
    if (!noteTarget) return;
    await updateHighlightNote(noteTarget.id, noteText);
    setHighlights((prev) => prev.map((x) => (x.id === noteTarget.id ? { ...x, note: noteText } : x)));
    setNoteTarget(null);
  };

  if (!paper) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="card px-6 py-10 text-center">
          <p className="text-sm text-ink-mute">未找到这套试卷。</p>
          <Link to="/library" className="btn btn-ghost mt-4">返回真题库</Link>
        </div>
      </div>
    );
  }
  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <div className="card px-6 py-10 text-center">
          <p className="text-sm text-ink-mute">正在加载试卷题目…</p>
        </div>
      </div>
    );
  }

  const passages = part?.passages ?? [];
  const currentPassage = passages.find((p) => p.id === activePassage) ?? passages[0];
  const partHighlights = highlights.filter((h) => h.partId === (part?.id ?? ''));

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper">
      {/* 顶部工具条 */}
      <header className="no-print z-30 flex h-12 shrink-0 items-center gap-2 border-b hairline bg-paper/90 px-2 backdrop-blur-xl sm:px-4">
        <button className="btn btn-quiet h-8 px-1.5" onClick={() => navigate(`/paper/${paper.id}`)} aria-label="返回">
          <ArrowLeft size={16} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[12.5px] font-semibold">{paper.title}</span>
            {paper.sample && <SampleBadge />}
          </div>
          <div className="truncate text-[10.5px] text-ink-mute">
            {examMap.get(paper.exam)?.short} · {paper.year} {paper.session}
          </div>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          {paper.parts.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPartId(p.id);
                setParams({ part: p.id }, { replace: true });
                scrollRef.current?.scrollTo({ top: 0 });
              }}
              className={clsx(
                'rounded-md px-2.5 py-1.5 text-[12px] font-medium transition',
                p.id === part?.id ? 'bg-brand-600 text-white' : 'text-ink-soft hover:bg-black/[0.04]'
              )}
            >
              {partKindLabel[p.kind]}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <button className="btn btn-quiet h-8 px-1.5 lg:hidden" onClick={() => setTocOpen(true)} aria-label="目录">
            <List size={16} />
          </button>
          <button
            className={clsx('btn h-8 px-2 text-[11.5px]', showAnswers ? 'bg-brand-600 text-white' : 'btn-ghost')}
            onClick={() => {
              setShowAnswers((x) => !x);
              void update({ showAnswersInReader: !showAnswers });
            }}
          >
            {showAnswers ? <Eye size={13} /> : <EyeOff size={13} />}
            <span className="hidden sm:inline">解析</span>
          </button>
          <button className="btn btn-quiet h-8 px-1.5" onClick={() => setPrefsOpen(true)} aria-label="阅读设置">
            <Settings2 size={16} />
          </button>
          <button
            className="btn btn-quiet hidden h-8 px-1.5 sm:inline-flex"
            onClick={async () => {
              const { toggleBookmark } = await import('@/db');
              const next = await toggleBookmark(paper.id);
              setBookmarked(next);
            }}
            aria-label="收藏"
          >
            {bookmarked ? <BookmarkCheck size={15} className="text-amber-500" /> : <Bookmark size={15} />}
          </button>
          <button
            className="btn btn-quiet h-8 px-1.5"
            onClick={() => setPanelOpen((x) => !x)}
            aria-label="题目面板"
          >
            <PanelRight size={16} />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* 左侧目录 */}
        <aside className="no-print hidden w-[212px] shrink-0 overflow-y-auto border-r hairline px-3 py-4 lg:block">
          <div className="label mb-2">目录</div>
          <nav className="space-y-0.5">
            {paper.parts.map((p) => (
              <div key={p.id}>
                <button
                  onClick={() => {
                    setPartId(p.id);
                    setParams({ part: p.id }, { replace: true });
                  }}
                  className={clsx(
                    'flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12.5px] transition',
                    p.id === part?.id ? 'bg-brand-50 font-medium text-brand-700' : 'text-ink-soft hover:bg-black/[0.035]'
                  )}
                >
                  <span className="truncate">{p.title.replace(/^(Part|Section)\s+[IVX]+\s+/i, '')}</span>
                  <span className="font-mono text-[10px] text-ink-faint">{p.questions.length}</span>
                </button>
                {p.id === part?.id && p.passages?.map((ps) => (
                  <button
                    key={ps.id}
                    onClick={() => {
                      setActivePassage(ps.id);
                      document.getElementById(`passage-${ps.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={clsx(
                      'ml-2 flex w-[calc(100%-8px)] items-center gap-1.5 rounded-md px-2 py-1 text-left text-[11.5px] transition',
                      currentPassage?.id === ps.id ? 'text-brand-700' : 'text-ink-mute hover:text-ink'
                    )}
                  >
                    <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                    {ps.title}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="mt-5 border-t hairline pt-3">
            <div className="label mb-2 flex items-center gap-1">
              <Highlighter size={11} /> 标注 ({highlights.length})
            </div>
            <div className="space-y-1.5">
              {highlights.slice(0, 8).map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setPartId(h.partId);
                    setParams({ part: h.partId }, { replace: true });
                    setEvidence({ paragraphId: h.paragraphId, quote: h.quote });
                    setTimeout(() => {
                      document.getElementById(`passage-${h.paragraphId.split('-')[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 120);
                  }}
                  className="block w-full truncate rounded px-1.5 py-1 text-left font-serif text-[11px] text-ink-mute hover:bg-black/[0.04]"
                >
                  “{h.quote}”
                </button>
              ))}
              {highlights.length === 0 && <p className="px-1.5 text-[11px] text-ink-faint">选中正文即可高亮。</p>}
            </div>
          </div>
        </aside>

        {/* 正文 */}
        <div ref={scrollRef} onScroll={onScroll} className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[760px] px-3 py-6 sm:px-6">
            {part ? (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h1 className="font-serif text-[19px] leading-tight">{part.title}</h1>
                    <p className="mt-1 text-[11.5px] text-ink-mute">
                      {part.questions.length} 题 · {part.minutes ? `建议 ${part.minutes} 分钟` : '不限时'} ·{' '}
                      {part.passages ? `${part.passages.reduce((n, p) => n + countWords(p.paragraphs.map((x) => x.text).join(' ')), 0)} 词` : partKindLabel[part.kind]}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {paper.parts.findIndex((p) => p.id === part.id) > 0 && (
                      <button
                        className="btn btn-ghost h-8 px-2 text-[11.5px]"
                        onClick={() => {
                          const idx = paper.parts.findIndex((p) => p.id === part.id);
                          const prev = paper.parts[idx - 1];
                          setPartId(prev.id);
                          setParams({ part: prev.id }, { replace: true });
                          scrollRef.current?.scrollTo({ top: 0 });
                        }}
                      >
                        <ChevronLeft size={13} /> 上一部分
                      </button>
                    )}
                    {paper.parts.findIndex((p) => p.id === part.id) < paper.parts.length - 1 && (
                      <button
                        className="btn btn-ghost h-8 px-2 text-[11.5px]"
                        onClick={() => {
                          const idx = paper.parts.findIndex((p) => p.id === part.id);
                          const next = paper.parts[idx + 1];
                          setPartId(next.id);
                          setParams({ part: next.id }, { replace: true });
                          scrollRef.current?.scrollTo({ top: 0 });
                        }}
                      >
                        下一部分 <ChevronRight size={13} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="paper-page px-5 py-6 sm:px-10 sm:py-10">
                  <div className="mb-5 border-b hairline pb-4">
                    <p className="text-[11.5px] leading-relaxed text-ink-mute">{part.instructions}</p>
                  </div>

                  {part.audio && (
                    <div className="mb-6">
                      <AudioPlayer
                        track={part.audio}
                        activeSegmentId={part.audio.segments[0]?.id}
                        showTranscript={showAudioScript}
                        onToggleTranscript={() => setShowAudioScript((x) => !x)}
                      />
                    </div>
                  )}

                  {part.bank && (
                    <div className="mb-6 rounded-lg border hairline bg-black/[0.012] px-4 py-3">
                      <div className="label mb-2">Word Bank</div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
                        {Object.entries(part.bank).map(([k, v]) => (
                          <div key={k} className="font-mono text-[12px] text-ink-soft">
                            <span className="mr-1.5 text-ink-faint">{k}</span>
                            {v}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {passages.map((ps) => (
                    <section key={ps.id} id={`passage-${ps.id}`} className="mb-8 scroll-mt-4 last:mb-0">
                      {ps.title && (
                        <div className="mb-3 flex items-baseline justify-between border-b hairline pb-1.5">
                          <h2 className="font-serif text-[15px] font-semibold">{ps.title}</h2>
                          {ps.source && <span className="text-[10px] text-ink-faint">{ps.source}</span>}
                        </div>
                      )}
                      <PassageView
                        paperId={paper.id}
                        paperTitle={paper.title}
                        partId={part.id}
                        paragraphs={ps.paragraphs}
                        highlights={partHighlights}
                        evidenceParagraphId={evidence?.paragraphId}
                        evidenceQuote={evidence?.quote}
                        onAddHighlight={handleAddHighlight}
                        onRemoveHighlight={async (id) => {
                          await removeHighlight(id);
                          setHighlights((prev) => prev.filter((h) => h.id !== id));
                        }}
                        onNoteHighlight={openNote}
                        onActiveParagraph={() => setActivePassage(ps.id)}
                      />
                    </section>
                  ))}

                  {part.kind === 'writing' && (
                    <div className="rounded-lg border hairline px-4 py-3 text-[12px] leading-relaxed text-ink-mute">
                      写作题请在「练习中心 · 翻译写作」中使用编辑器作答，可保存草稿并对照范文。
                    </div>
                  )}
                </div>

                {/* 页码条 */}
                <div className="mt-4 flex items-center justify-between px-1 text-[11px] text-ink-faint">
                  <span>
                    {paper.title} · {paper.subtitle}
                  </span>
                  <span className="font-mono">
                    {String(paper.parts.findIndex((p) => p.id === part.id) + 1).padStart(2, '0')} / {String(paper.parts.length).padStart(2, '0')}
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* 右侧题目面板 */}
        <aside
          className={clsx(
            'no-print shrink-0 overflow-y-auto border-l hairline bg-surface',
            panelOpen ? 'w-full sm:w-[352px]' : 'hidden',
            !panelOpen && 'sm:block'
          )}
        >
          {part && (
            <div className="sticky top-0 z-10 flex items-center justify-between border-b hairline bg-surface px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-semibold">题目</span>
                <span className="font-mono text-[10.5px] text-ink-faint">
                  {part.questions.filter((q) => answers[q.id]).length}/{part.questions.length}
                </span>
              </div>
              <button className="btn btn-quiet h-7 px-1.5" onClick={() => setPanelOpen(false)} aria-label="收起">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="space-y-5 px-4 py-4">
            {part?.questions.map((q) => {
              const value = answers[q.id];
              const revealed = showAnswers;
              return (
                <div key={q.id} className="border-b hairline pb-4 last:border-0">
                  <QuestionHead question={q} showScore />
                  <div className="mt-2.5 pl-[29px]">
                    {q.type === 'single' && (
                      <Options
                        question={q}
                        value={value}
                        onChange={(v) => void setAnswer(q, v)}
                        revealed={revealed}
                      />
                    )}
                    {q.type === 'bank' && part.bank && (
                      <BankChips
                        bank={part.bank}
                        value={value}
                        onChange={(v) => void setAnswer(q, v)}
                        revealed={revealed}
                        answer={q.answer}
                      />
                    )}
                    {q.type === 'blank' && (
                      <input
                        className="field"
                        placeholder="填写答案"
                        value={value ?? ''}
                        onChange={(e) => void setAnswer(q, e.target.value)}
                      />
                    )}
                    {(q.type === 'translation' || q.type === 'writing') && (
                      <div className="rounded-lg border hairline bg-black/[0.012] px-3 py-2 text-[11.5px] text-ink-mute">
                        主观题请在练习中心作答，此处可查看解析与参考内容。
                      </div>
                    )}

                    <div className="mt-2 flex items-center gap-2">
                      {q.evidence && (
                        <button
                          className="btn btn-quiet h-6 px-1.5 text-[11px]"
                          onClick={() => {
                            setEvidence(q.evidence!);
                            const pid = q.evidence!.paragraphId;
                            const target = findPassage(paper, part.id, pid);
                            if (target) {
                              setActivePassage(target.passage.id);
                              document.getElementById(`passage-${target.passage.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                        >
                          定位原文
                        </button>
                      )}
                      </div>

                    {revealed && <Explanation question={q} value={value} />}

                    {q.type === 'bank' && revealed && part.bank && (
                      <p className="mt-1.5 pl-0 text-[11px] text-ink-faint">
                        答案：{q.answer} — {part.bank[q.answer]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {part?.reference?.translation && showAnswers && (
              <div className="rounded-lg border hairline bg-black/[0.015] px-3 py-2.5">
                <div className="label mb-1.5">参考译文</div>
                <p className="font-serif text-[12px] leading-relaxed text-ink-soft">{part.reference.translation}</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* 移动端目录抽屉 */}
      {tocOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setTocOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[260px] bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[13px] font-semibold">目录</span>
              <button className="btn btn-quiet px-1.5" onClick={() => setTocOpen(false)}>
                <X size={15} />
              </button>
            </div>
            {paper.parts.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPartId(p.id);
                  setTocOpen(false);
                  scrollRef.current?.scrollTo({ top: 0 });
                }}
                className={clsx(
                  'block w-full rounded-md px-2.5 py-2 text-left text-[13px]',
                  p.id === part?.id ? 'bg-brand-50 font-medium text-brand-700' : 'text-ink-soft'
                )}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 阅读设置 */}
      <Modal open={prefsOpen} onClose={() => setPrefsOpen(false)} title="阅读设置">
        <div className="space-y-5">
          <div>
            <div className="label mb-2">字号</div>
            <div className="flex items-center gap-3">
              <button className="btn btn-ghost h-8 px-2" onClick={() => void update({ paperSize: Math.max(13, settings.paperSize - 1) })}>
                <Minus size={14} />
              </button>
              <span className="w-16 text-center font-mono text-[13px]">{settings.paperSize}px</span>
              <button className="btn btn-ghost h-8 px-2" onClick={() => void update({ paperSize: Math.min(24, settings.paperSize + 1) })}>
                <Plus size={14} />
              </button>
              <Type size={14} className="ml-2 text-ink-faint" />
            </div>
          </div>
          <div>
            <div className="label mb-2">行距</div>
            <div className="flex gap-1.5">
              {[1.7, 1.85, 1.95, 2.1].map((lh) => (
                <button
                  key={lh}
                  onClick={() => void update({ lineHeight: lh })}
                  className={clsx(
                    'rounded-md border px-2.5 py-1 text-[11.5px]',
                    settings.lineHeight === lh ? 'border-brand-600 bg-brand-600 text-white' : 'hairline text-ink-soft'
                  )}
                >
                  {lh}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="label mb-2">纸张主题</div>
            <div className="flex gap-2">
              {[
                ['paper', '米白'],
                ['sepia', '护眼'],
                ['night', '夜间']
              ].map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => void update({ theme: k as never })}
                  className={clsx(
                    'flex-1 rounded-lg border px-3 py-2 text-[12px]',
                    settings.theme === k ? 'border-brand-600 text-brand-700' : 'hairline text-ink-soft'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center justify-between text-[12.5px]">
            查词时自动发音
            <input
              type="checkbox"
              checked={settings.wordSound}
              onChange={(e) => void update({ wordSound: e.target.checked })}
              className="h-4 w-4 accent-[#1F5D4C]"
            />
          </label>
        </div>
      </Modal>

      {/* 笔记编辑 */}
      <Modal
        open={!!noteTarget}
        onClose={() => setNoteTarget(null)}
        title="标注笔记"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setNoteTarget(null)}>取消</button>
            <button className="btn btn-primary" onClick={saveNote}>保存</button>
          </>
        }
      >
        <p className="mb-2 rounded-md bg-black/[0.03] px-2.5 py-2 font-serif text-[12px] text-ink-soft">“{noteTarget?.quote}”</p>
        <textarea
          className="field h-28 resize-none py-2"
          placeholder="写下你的理解、语法点或疑问…"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </Modal>
    </div>
  );
}