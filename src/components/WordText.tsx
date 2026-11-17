import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useApp } from '@/state/AppContext';
import { tokenize } from '@/lib/text';
import type { Highlight, WordEntry } from '@/types/paper';

const hlColor: Record<Highlight['color'], string> = {
  brand: 'rgba(46,112,92,0.20)',
  amber: 'rgba(217,164,65,0.30)',
  rose: 'rgba(180,65,58,0.16)'
};

export default function WordText({
  text,
  highlights = [],
  evidenceQuote,
  onHighlightClick,
  className,
  source,
  as: Tag = 'p'
}: {
  text: string;
  highlights?: Highlight[];
  evidenceQuote?: string;
  onHighlightClick?: (h: Highlight) => void;
  className?: string;
  source?: WordEntry['source'];
  as?: React.ElementType;
}) {
  const { openWord } = useApp();
  const tokens = useMemo(() => tokenize(text), [text]);

  const spans = useMemo(() => {
    const items = highlights
      .filter((h) => h.end <= text.length && h.start < h.end)
      .map((h) => ({ start: h.start, end: h.end, h }))
      .sort((a, b) => a.start - b.start);
    const evStart = evidenceQuote ? text.toLowerCase().indexOf(evidenceQuote.toLowerCase()) : -1;
    return { items, evStart, evEnd: evStart >= 0 ? evStart + (evidenceQuote?.length ?? 0) : -1 };
  }, [highlights, text, evidenceQuote]);

  const hlIndex = (pos: number) => spans.items.find((s) => pos >= s.start && pos < s.end);

  return (
    <Tag className={clsx('paper-body', className)}>
      {tokens.map((t, i) => {
        if (!t.word) {
          return <React.Fragment key={i}>{t.text}</React.Fragment>;
        }
        const hl = hlIndex(t.start);
        const inEvidence =
          spans.evStart >= 0 && t.start >= spans.evStart && t.start < (spans.evEnd ?? 0);
        return (
          <span
            key={i}
            className={clsx('word-token', inEvidence && 'flash-target')}
            style={hl ? { background: hlColor[hl.h.color], padding: '1px 0' } : undefined}
            title={hl?.h.note || undefined}
            onClick={(e) => {
              if (hl && onHighlightClick) {
                onHighlightClick(hl.h);
                return;
              }
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              openWord(t.text, { x: rect.left + rect.width / 2, y: rect.bottom }, source);
            }}
          >
            {t.text}
          </span>
        );
      })}
    </Tag>
  );
}