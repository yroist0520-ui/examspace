import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import { Bookmark, Filter, Headphones, Search, SlidersHorizontal, X } from 'lucide-react';
import { examMap, exams, difficultyLabel, partKindLabel } from '@/data/exams';
import { paperMetas, allYears } from '@/data/papers';
import { useDbVersion } from '@/state/AppContext';
import { listBookmarks } from '@/db';
import { SampleBadge, ResourceBadges, LicenseLine } from '@/components/ui';
import type { PaperMeta } from '@/types/paper';

const kinds = ['listening', 'reading', 'cloze', 'translation', 'writing'] as const;

export default function LibraryPage() {
  const { exam } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [v] = useDbVersion();
  const [bookmarks, setBookmarks] = useState<{ paperId: string }[]>([]);
  React.useEffect(() => {
    listBookmarks().then(setBookmarks);
  }, [v]);

  const year = params.get('year') ?? 'all';
  const kind = params.get('kind') ?? 'all';
  const level = params.get('level') ?? 'all';
  const q = params.get('q') ?? '';
  const onlySaved = params.get('saved') === '1';
  const [filterOpen, setFilterOpen] = useState(false);

  const activeExam = exam ? examMap.get(exam as never) : undefined;

  const list = useMemo(() => {
    let rows = paperMetas;
    if (activeExam) rows = rows.filter((p) => p.exam === activeExam.code);
    if (year !== 'all') rows = rows.filter((p) => p.year === Number(year));
    if (kind !== 'all') rows = rows.filter((p) => p.kinds.includes(kind as never));
    if (level !== 'all') {
      const [lo, hi] = level.split('-').map(Number);
      rows = rows.filter((p) => p.difficulty >= lo && p.difficulty <= hi);
    }
    if (onlySaved) {
      const saved = new Set(bookmarks.map((b) => b.paperId));
      rows = rows.filter((p) => saved.has(p.id));
    }
    if (q.trim()) {
      const k = q.trim().toLowerCase();
      rows = rows.filter(
        (p) =>
          p.title.toLowerCase().includes(k) ||
          p.summary.toLowerCase().includes(k) ||
          p.tags.some((t) => t.toLowerCase().includes(k))
      );
    }
    return [...rows].sort((a, b) => b.year - a.year || (a.setNo ?? 0) - (b.setNo ?? 0));
  }, [activeExam, year, kind, level, q, onlySaved, bookmarks]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === 'all' || value === '') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const hasFilter = year !== 'all' || kind !== 'all' || level !== 'all' || onlySaved || q !== '';

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="label">Resource library</div>
          <h1 className="mt-1 font-serif text-[24px] tracking-tight">
            {activeExam ? activeExam.name : '真题资源库'}
          </h1>
          <p className="mt-1 text-[12.5px] text-ink-mute">
            {activeExam
              ? activeExam.blurb
              : '真实历年真题资源：按年份与考试类型检索，每套标注来源、授权与内容核验状态。'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={q}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder="搜索试卷、主题标签"
              className="field h-9 w-[210px] pl-8 sm:w-[240px]"
            />
          </div>
          <button
            className={clsx('btn btn-ghost h-9 px-2.5 md:hidden', hasFilter && 'border-brand-300 text-brand-600')}
            onClick={() => setFilterOpen((x) => !x)}
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </header>

      {/* 考试类型切换 */}
      <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        <Link
          to="/library"
          className={clsx(
            'shrink-0 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition',
            !activeExam ? 'border-brand-600 bg-brand-600 text-white' : 'hairline text-ink-soft hover:border-brand-300'
          )}
        >
          全部
        </Link>
        {exams.map((e) => {
          const count = paperMetas.filter((p) => p.exam === e.code).length;
          const active = activeExam?.code === e.code;
          return (
            <Link
              key={e.code}
              to={`/library/${e.code}`}
              className={clsx(
                'shrink-0 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition',
                active ? 'border-brand-600 bg-brand-600 text-white' : 'hairline text-ink-soft hover:border-brand-300'
              )}
            >
              {e.short}
              <span className={clsx('ml-1.5 font-mono text-[10.5px]', active ? 'text-white/70' : 'text-ink-faint')}>{count}</span>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[210px_1fr]">
        {/* 筛选 */}
        <aside className={clsx('space-y-5', filterOpen ? 'block' : 'hidden md:block')}>
          <FilterGroup title="年份">
            <FilterChip active={year === 'all'} onClick={() => setParam('year', 'all')}>
              全部
            </FilterChip>
            {allYears().map((y) => (
              <FilterChip key={y} active={year === String(y)} onClick={() => setParam('year', String(y))}>
                {y}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup title="题型">
            <FilterChip active={kind === 'all'} onClick={() => setParam('kind', 'all')}>
              全部
            </FilterChip>
            {kinds.map((k) => (
              <FilterChip key={k} active={kind === k} onClick={() => setParam('kind', k)}>
                {partKindLabel[k]}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup title="难度">
            <FilterChip active={level === 'all'} onClick={() => setParam('level', 'all')}>
              全部
            </FilterChip>
            {[
              ['1-2', '入门 – 基础'],
              ['3-3', '进阶'],
              ['4-5', '较难 – 挑战']
            ].map(([val, label]) => (
              <FilterChip key={val} active={level === val} onClick={() => setParam('level', val)}>
                {label}
              </FilterChip>
            ))}
          </FilterGroup>

          <div>
            <div className="label mb-2">其他</div>
            <button
              onClick={() => setParam('saved', onlySaved ? '' : '1')}
              className={clsx(
                'flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-[12.5px] transition',
                onlySaved ? 'border-amber-400 bg-amber-400/10 text-ink' : 'hairline text-ink-soft'
              )}
            >
              <Bookmark size={13} />
              仅看收藏
            </button>
            {hasFilter && (
              <button className="btn btn-quiet mt-2 h-7 px-2 text-[12px]" onClick={() => navigate(exam ? `/library/${exam}` : '/library')}>
                <X size={12} /> 清除筛选
              </button>
            )}
          </div>
        </aside>

        {/* 列表 */}
        <div>
          <div className="mb-3 flex items-center justify-between text-[12px] text-ink-mute">
            <span>
              共 <span className="font-mono text-ink">{list.length}</span> 套试卷
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <Filter size={12} /> 按年份倒序
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {list.map((p) => (
              <PaperCard key={p.id} paper={p} saved={bookmarks.some((b) => b.paperId === p.id)} />
            ))}
          </div>

          {list.length === 0 && (
            <div className="card px-6 py-12 text-center">
              <div className="font-serif text-[16px]">暂无合法可用资源</div>
              <p className="mt-1 text-[12.5px] text-ink-mute">
                当前筛选条件下没有已核验的真实真题资源；新资源会在联网核验来源与授权后收录。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="label mb-2">{title}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-md border px-2 py-1 text-[11.5px] transition',
        active ? 'border-brand-600 bg-brand-600 text-white' : 'hairline text-ink-soft hover:border-brand-300'
      )}
    >
      {children}
    </button>
  );
}

function PaperCard({ paper, saved }: { paper: PaperMeta; saved: boolean }) {
  const prov = paper.provenance;
  const hasContent = paper.questionCount > 0;
  return (
    <Link to={`/paper/${paper.id}`} className="card group flex min-w-0 flex-col px-4 py-4 transition hover:border-brand-300">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="chip">{examMap.get(paper.exam)?.short}</span>
            <span className="text-[11px] text-ink-faint">{paper.year} · {paper.session}</span>
            {saved && <Bookmark size={11} className="text-amber-500" />}
          </div>
          <h3 className="mt-1.5 truncate text-[13.5px] font-semibold">{paper.title}</h3>
        </div>
        {paper.hasAudio && <Headphones size={14} className="mt-0.5 shrink-0 text-ink-faint" />}
      </div>

      <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-ink-mute">{paper.summary}</p>

      {/* 真实资源：来源与状态 */}
      {prov && (
        <div className="mt-2 space-y-1.5">
          <ResourceBadges flags={prov.flags} />
          <LicenseLine provenance={prov} />
          {prov.sources.length > 0 && (
            <p className="truncate text-[10.5px] text-ink-faint">
              来源：{prov.sources.map((s) => s.name).join('、')}
            </p>
          )}
        </div>
      )}

      {/* 站内有完整内容时展示题型结构 */}
      {hasContent && (
        <div className="mt-2 flex flex-wrap gap-1">
          {paper.kinds.map((k) => (
            <span key={k} className="chip">
              {partKindLabel[k]}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t hairline pt-2.5 text-[11px] text-ink-mute">
        {hasContent ? (
          <>
            <div className="flex items-center gap-3">
              <span>{paper.questionCount} 题</span>
              <span>{paper.minutes} 分钟</span>
              <span>{paper.words} 词</span>
            </div>
            <span className="flex items-center gap-1">
              <DifficultyDots level={paper.difficulty} />
              <span className="ml-0.5">{difficultyLabel[paper.difficulty - 1]}</span>
            </span>
          </>
        ) : (
          <>
            <span>{prov?.sources.length ?? 0} 个来源</span>
            <span>{prov?.flags.includes('no-audio') ? '无原始听力' : '见来源详情'}</span>
          </>
        )}
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {paper.sample && <SampleBadge />}
        {paper.tags.slice(0, 2).map((t) => (
          <span key={t} className="text-[10.5px] text-ink-faint">
            #{t}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={clsx('h-1.5 w-1.5 rounded-full', i <= level ? 'bg-brand-500' : 'bg-black/10')}
        />
      ))}
    </span>
  );
}