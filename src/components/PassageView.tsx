import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Highlighter, MessageSquarePlus, Trash2, X } from 'lucide-react';
import type { Highlight, Paragraph } from '@/types/paper';
import WordText from './WordText';
import { selectionOffsets } from '@/lib/text';

interface Props {
  paperId: string;
  paperTitle: string;
  partId: string;
  paragraphs: Paragraph[];
  highlights: Highlight[];
  evidenceParagraphId?: string;
  evidenceQuote?: string;
  onAddHighlight: (h: Omit<Highlight, 'id' | 'createdAt' | 'paperId' | 'partId'>) => void;
  onRemoveHighlight: (id: string) => void;
  onNoteHighlight: (h: Highlight) => void;
  onActiveParagraph?: (id: string) => void;
}

interface PendingSelection {
  paragraphId: string;
  start: number;
  end: number;
  quote: string;
  rect: { x: number; y: number };
}

export default function PassageView({
  paperId,
  paperTitle,
  partId,
  paragraphs,
  highlights,
  evidenceParagraphId,
  evidenceQuote,
  onAddHighlight,
  onRemoveHighlight,
  onNoteHighlight,
  onActiveParagraph
}: Props) {
  const [pending, setPending] = useState<PendingSelection | null>(null);
  const refs = useRef<Record<string, HTMLParagraphElement | null>>({});

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-hl-toolbar]')) setPending(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    if (!evidenceParagraphId) return;
    const el = refs.current[evidenceParagraphId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('flash-target');
      const t = window.setTimeout(() => el.classList.remove('flash-target'), 1800);
      return () => window.clearTimeout(t);
    }
  }, [evidenceParagraphId, evidenceQuote]);

  const handleMouseUp = (p: Paragraph) => {
    const container = refs.current[p.id];
    if (!container) return;
    const off = selectionOffsets(container);
    if (!off) return;
    const quote = p.text.slice(off.start, off.end);
    if (!quote.trim()) return;
    const sel = window.getSelection();
    const rect = sel?.getRangeAt(0).getBoundingClientRect();
    if (!rect) return;
    setPending({
      paragraphId: p.id,
      start: off.start,
      end: off.end,
      quote,
      rect: { x: rect.left + rect.width / 2, y: rect.top }
    });
  };

  return (
    <div className="relative">
      {paragraphs.map((p) => (
        <div key={p.id} className="group relative" data-paragraph={p.id}>
          <div className="flex gap-3">
            {p.marker && (
              <span className="mt-[7px] w-4 shrink-0 font-mono text-[10.5px] text-ink-faint">{p.marker}</span>
            )}
            <p
              ref={(el) => {
                refs.current[p.id] = el;
              }}
              onMouseUp={() => handleMouseUp(p)}
              onClick={() => onActiveParagraph?.(p.id)}
              data-paragraph-body={p.id}
              className={clsx(
                'paper-body flex-1',
                p.marker ? 'mb-3.5' : 'mb-3.5'
              )}
            >
              <WordText
                as="span"
                className=""
                text={p.text}
                source={{ paperId, paperTitle, partId, sentence: p.text }}
                highlights={highlights.filter((h) => h.paragraphId === p.id)}
                evidenceQuote={p.id === evidenceParagraphId ? evidenceQuote : undefined}
                onHighlightClick={(h) => onNoteHighlight(h)}
              />
            </p>
          </div>
        </div>
      ))}

      {pending && (
        <div
          data-hl-toolbar
          className="fixed z-[70] rise flex items-center gap-0.5 rounded-lg border hairline bg-surface px-1.5 py-1 shadow-float"
          style={{ left: Math.min(Math.max(12, pending.rect.x - 90), window.innerWidth - 200), top: pending.rect.y - 46 }}
        >
          <span className="px-1 text-[10.5px] text-ink-faint">标记</span>
          {(['brand', 'amber', 'rose'] as const).map((c) => (
            <button
              key={c}
              className="grid h-6 w-6 place-items-center rounded hover:bg-black/[0.05]"
              onClick={() => {
                onAddHighlight({
                  paragraphId: pending.paragraphId,
                  start: pending.start,
                  end: pending.end,
                  quote: pending.quote,
                  color: c
                });
                setPending(null);
                window.getSelection()?.removeAllRanges();
              }}
              aria-label={`高亮 ${c}`}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: c === 'brand' ? 'rgba(46,112,92,0.55)' : c === 'amber' ? 'rgba(217,164,65,0.7)' : 'rgba(180,65,58,0.45)'
                }}
              />
            </button>
          ))}
          <div className="mx-0.5 h-4 w-px bg-black/10" />
          <button
            className="grid h-6 w-6 place-items-center rounded hover:bg-black/[0.05]"
            onClick={() => {
              onAddHighlight({
                paragraphId: pending.paragraphId,
                start: pending.start,
                end: pending.end,
                quote: pending.quote,
                color: 'amber',
                note: ''
              });
              setPending(null);
              window.getSelection()?.removeAllRanges();
            }}
            aria-label="添加笔记"
          >
            <MessageSquarePlus size={13} className="text-ink-mute" />
          </button>
          <button className="grid h-6 w-6 place-items-center rounded hover:bg-black/[0.05]" onClick={() => setPending(null)} aria-label="取消">
            <X size={13} className="text-ink-mute" />
          </button>
        </div>
      )}

      {highlights.length > 0 && (
        <div className="mt-5 border-t hairline pt-3">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-mute">
            <Highlighter size={12} /> 本篇标注 {highlights.length}
          </div>
          <div className="space-y-1.5">
            {highlights.map((h) => (
              <div key={h.id} className="group flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-black/[0.025]">
                <span
                  className="mt-[6px] h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background:
                      h.color === 'brand' ? 'rgba(46,112,92,0.8)' : h.color === 'amber' ? 'rgba(217,164,65,0.9)' : 'rgba(180,65,58,0.7)'
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[12px] text-ink-soft">“{h.quote}”</p>
                  {h.note && <p className="mt-0.5 text-[11.5px] text-ink-mute">{h.note}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
                  <button className="btn btn-quiet h-6 px-1" onClick={() => onNoteHighlight(h)} aria-label="编辑笔记">
                    <MessageSquarePlus size={12} />
                  </button>
                  <button className="btn btn-quiet h-6 px-1" onClick={() => onRemoveHighlight(h.id)} aria-label="删除">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}