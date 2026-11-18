import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Clock3,
  FileText,
  Headphones,
  ListChecks,
  Play,
  Timer
} from 'lucide-react';
import { examMap, partKindLabel, difficultyLabel } from '@/data/exams';
import { paperById } from '@/data/papers';
import { DifficultyDots } from './Library';
import { SampleBadge, ResourceBadges } from '@/components/ui';
import { listBookmarks, toggleBookmark, listAttempts, getPdf, savePdf } from '@/db';
import { useDbVersion, notifyDataChanged } from '@/state/AppContext';
import PdfViewer from '@/components/PdfViewer';
import type { Attempt } from '@/types/paper';
import { relativeDay } from '@/lib/text';

export default function PaperDetail() {
  const { paperId = '' } = useParams();
  const navigate = useNavigate();
  const paper = paperById(paperId);
  const [v, bump] = useDbVersion();
  const [saved, setSaved] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [pdf, setPdf] = useState<{ name: string; blob: Blob } | null>(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    listBookmarks().then((b) => setSaved(b.some((x) => x.paperId === paperId)));
    listAttempts(60).then((all) => setAttempts(all.filter((a) => a.paperId === paperId)));
    getPdf(paperId).then((asset) => setPdf(asset ? { name: asset.name, blob: asset.blob } : null));
  }, [paperId, v]);

  if (!paper) {
    return (
      <div className="card p-10 text-center">
        <p className="text-sm text-ink-mute">未找到这套试卷。</p>
        <Link to="/library" className="btn btn-ghost mt-4">
          返回真题库
        </Link>
      </div>
    );
  }

  const totalQuestions = paper.parts.reduce((n, p) => n + p.questions.length, 0);
  const objective = paper.parts.flatMap((p) => p.questions).filter((q) => ['single', 'blank', 'bank'].includes(q.type)).length;
  const prov = paper.provenance;
  const active = attempts.find((a) => !a.submittedAt);
  const submitted = attempts.filter((a) => a.submittedAt);

  // 未上线试卷（含已下架示例）不在任何列表中展示，仅保留直接访问时的说明
  if (paper.parts.every((p) => p.questions.length === 0)) {
    return (
      <div className="card p-10 text-center">
        <p className="text-sm text-ink-soft">这套试卷尚未上线。站内只展示可在线阅读与作答的完整试卷。</p>
        <Link to="/library" className="btn btn-ghost mt-4">
          返回真题库
        </Link>
      </div>
    );
  }

  const onBookmark = async () => {
    const next = await toggleBookmark(paperId);
    setSaved(next);
    bump();
  };

  const onPdf = async (file: File) => {
    await savePdf({ paperId, name: file.name, blob: file, addedAt: Date.now() });
    setPdf({ name: file.name, blob: file });
    setShowPdf(true);
    notifyDataChanged();
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="btn btn-quiet -ml-2 h-8 px-2 text-[12.5px]">
        <ArrowLeft size={14} /> 返回
      </button>

      <header className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="chip">{examMap.get(paper.exam)?.name}</span>
            <span className="chip">{paper.year} · {paper.session}</span>
            {paper.setNo && <span className="chip">第 {paper.setNo} 套</span>}
            {paper.sample && <SampleBadge label="已下架示例数据" />}
            {prov && <ResourceBadges flags={prov.flags} />}
          </div>
          <h1 className="mt-2.5 font-serif text-[26px] leading-tight tracking-tight sm:text-[30px]">{paper.title}</h1>
          <p className="mt-1 text-[13px] text-ink-mute">{paper.subtitle}</p>
          <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">{paper.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-mute">
            <span className="flex items-center gap-1"><Clock3 size={13} />{paper.minutes} 分钟</span>
            <span className="flex items-center gap-1"><ListChecks size={13} />{totalQuestions} 题（客观题 {objective}）</span>
            <span className="flex items-center gap-1"><BookOpen size={13} />约 {paper.words} 词</span>
            <span className="flex items-center gap-1"><DifficultyDots level={paper.difficulty} />{difficultyLabel[paper.difficulty - 1]}</span>
            <span className="flex items-center gap-1">
              {paper.parts.some((p) => p.audio) ? <Headphones size={13} /> : <FileText size={13} />}
              {paper.parts.some((p) => p.audio) ? '含听力' : '纯文字'}
            </span>
          </div>
        </div>

        <div className="card space-y-2 px-4 py-4">
          <div className="label">开始</div>
          <Link to={`/read/${paper.id}`} className="btn btn-primary w-full">
            <BookOpen size={14} /> 在线阅读
          </Link>
          <Link to={`/exam/${paper.id}?mode=exam`} className="btn btn-ghost w-full">
            <Timer size={14} /> 模拟考试
          </Link>
          <Link to={`/exam/${paper.id}?mode=practice`} className="btn btn-ghost w-full">
            <Play size={14} /> 练习模式
          </Link>
          <button className="btn btn-quiet w-full text-[12.5px]" onClick={onBookmark}>
            {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {saved ? '已收藏' : '收藏这套试卷'}
          </button>

          {active && (
            <div className="rounded-lg border hairline bg-amber-400/[0.08] px-3 py-2 text-[11.5px]">
              有未完成的答题（{Object.keys(active.answers).length} 题），
              <Link to={`/read/${paper.id}`} className="ml-1 text-brand-600 underline">
                继续
              </Link>
            </div>
          )}

          <label className="btn btn-quiet w-full cursor-pointer text-[12px]">
            {pdf ? '替换 PDF 文件' : '导入 PDF 试卷'}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onPdf(f);
              }}
            />
          </label>
          {pdf && (
            <button className="btn btn-quiet w-full text-[12px]" onClick={() => setShowPdf((x) => !x)}>
              {showPdf ? '收起 PDF' : `查看 PDF：${pdf.name}`}
            </button>
          )}
        </div>
      </header>

      {showPdf && pdf && (
        <section className="card overflow-hidden p-0">
          <div className="border-b hairline px-4 py-2.5 text-[12px] font-medium">{pdf.name}</div>
          <PdfViewer file={pdf.blob} />
        </section>
      )}

      <section className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div>
          <h2 className="mb-3 text-[15px] font-semibold">试卷结构</h2>
          <div className="card divide-y hairline">
            {paper.parts.map((part, idx) => {
              const passages = part.passages ?? [];
              return (
                <div key={part.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-md border hairline font-mono text-[10.5px] text-ink-mute">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13.5px] font-semibold">{part.title}</span>
                      <span className="chip">{partKindLabel[part.kind]}</span>
                      {part.audio && (
                        <span className="chip" style={{ background: 'rgba(46,112,92,0.10)', color: '#1F5D4C' }}>
                          <Headphones size={11} /> 音频
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11.5px] text-ink-mute">
                      <span>{part.questions.length} 题</span>
                      {part.minutes && <span>{part.minutes} 分钟</span>}
                      <Link to={`/read/${paper.id}?part=${part.id}`} className="text-brand-600 hover:underline">
                        进入
                      </Link>
                    </div>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-mute">{part.instructions}</p>
                  {passages.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {passages.map((p) => (
                        <span key={p.id} className="chip">
                          {p.title ?? 'Passage'} · {p.paragraphs.length} 段
                        </span>
                      ))}
                    </div>
                  )}
                  {part.kind === 'reading' && part.passages?.[0] && (
                    <p className="mt-2 line-clamp-2 font-serif text-[12px] leading-relaxed text-ink-soft">
                      {part.passages[0].paragraphs[0].text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div>
            <h2 className="mb-3 text-[15px] font-semibold">作答记录</h2>
            <div className="card divide-y hairline">
              {submitted.slice(0, 5).map((a) => (
                <Link key={a.id} to={`/result/${a.id}`} className="block px-4 py-3 transition hover:bg-black/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-medium">{a.mode === 'exam' ? '模考' : '练习'}</span>
                    <span className="font-mono text-[12px]">
                      {a.result?.autoScore ?? 0}/{a.result?.autoTotal ?? 0}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-ink-mute">
                    {relativeDay(a.submittedAt!)} · {Math.round(a.elapsedSec / 60)} 分钟 · 正确 {a.result?.correct ?? 0}
                  </div>
                </Link>
              ))}
              {submitted.length === 0 && (
                <div className="px-4 py-6 text-center text-[12px] text-ink-mute">还没有提交记录。</div>
              )}
            </div>
          </div>

          <div className="card px-4 py-4">
            <div className="label mb-2">内容声明</div>
            <p className="text-[11.5px] leading-relaxed text-ink-mute">
              {prov?.note ?? paper.sampleNote ?? '本卷题面与答案整理自公开渠道，仅供学习使用。'}
            </p>
          </div>

          {paper.parts.some((p) => p.passages) && (
            <div className="card px-4 py-4">
              <div className="label mb-2">快速跳转</div>
              <div className="space-y-1">
                {paper.parts
                  .filter((p) => p.passages)
                  .flatMap((p) => p.passages!.map((ps) => ({ part: p, ps })))
                  .slice(0, 6)
                  .map(({ part, ps }) => (
                    <Link
                      key={`${part.id}-${ps.id}`}
                      to={`/read/${paper.id}?part=${part.id}&p=${ps.id}`}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] transition hover:bg-black/[0.035]"
                    >
                      <span className="truncate">{ps.title}</span>
                      <span className="text-ink-faint">{partKindLabel[part.kind]}</span>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}