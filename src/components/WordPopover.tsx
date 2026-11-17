import { useEffect, useRef, useState } from 'react';
import { BookmarkPlus, Check, Speaker, X } from 'lucide-react';
import { useApp, notifyDataChanged } from '@/state/AppContext';
import { addWord, bumpDaily, isWordSaved, removeWord } from '@/db';

export default function WordPopover() {
  const { word, closeWord, settings } = useApp();
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!word) return;
    isWordSaved(word.entry.word).then(setSaved);
  }, [word]);

  useEffect(() => {
    if (!word) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeWord();
    };
    const t = window.setTimeout(() => document.addEventListener('mousedown', onDown), 60);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('mousedown', onDown);
    };
  }, [word, closeWord]);

  if (!word) return null;
  const { entry, raw, anchor } = word;

  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(entry.word);
    u.lang = 'en-US';
    u.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const toggleSave = async () => {
    const id = `w-${entry.word.toLowerCase()}`;
    if (saved) {
      await removeWord(id);
      setSaved(false);
    } else {
      await addWord({
        id,
        word: entry.word,
        addedAt: Date.now(),
        source: word.source,
        tag: '未分类',
        box: 1,
        reviewCount: 0,
        nextReviewAt: Date.now() + 86400000,
        mastered: false
      });
      await bumpDaily({ wordsAdded: 1 });
      setSaved(true);
      if (settings.wordSound) speak();
    }
    notifyDataChanged();
  };

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const width = Math.min(330, vw - 24);
  const left = Math.min(Math.max(12, anchor.x - width / 2), vw - width - 12);
  const top = Math.min(anchor.y + 10, (typeof window !== 'undefined' ? window.innerHeight : 800) - 300);

  return (
    <div
      ref={ref}
      className="fixed z-[90] rise overflow-hidden rounded-xl2 border hairline bg-surface shadow-float"
      style={{ left, top, width }}
    >
      <div className="flex items-start justify-between gap-2 px-4 pt-3.5">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[20px] leading-none">{entry.word}</span>
            <span className="text-[11.5px] text-ink-mute">{entry.phonetic}</span>
          </div>
          {raw.toLowerCase() !== entry.word.toLowerCase() && (
            <div className="mt-1 text-[11px] text-ink-faint">原文：{raw}</div>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <button className="btn btn-quiet h-7 px-1.5" onClick={speak} aria-label="发音">
            <Speaker size={14} />
          </button>
          <button className="btn btn-quiet h-7 px-1.5" onClick={closeWord} aria-label="关闭">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-1.5 px-4 pb-3 pt-2.5">
        {entry.senses.map((s, i) => (
          <div key={i} className="flex gap-2 text-[13px] leading-relaxed">
            <span className="mt-[3px] shrink-0 text-[11px] italic text-ink-faint">{s.pos}</span>
            <span>{s.cn}</span>
          </div>
        ))}

        {entry.example && (
          <div className="mt-2 border-t hairline pt-2">
            <p className="font-serif text-[12.5px] leading-relaxed text-ink-soft">{entry.example}</p>
            {entry.exampleCn && <p className="mt-0.5 text-[11.5px] text-ink-mute">{entry.exampleCn}</p>}
          </div>
        )}

        {entry.collocations && entry.collocations.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {entry.collocations.map((c) => (
              <span key={c} className="chip font-mono">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t hairline px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          {entry.level && <span className="chip">{entry.level}</span>}
          {entry.examTags?.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <button
          onClick={toggleSave}
          className={saved ? 'btn btn-ghost h-7 px-2 text-[12px]' : 'btn btn-primary h-7 px-2 text-[12px]'}
        >
          {saved ? <Check size={13} /> : <BookmarkPlus size={13} />}
          {saved ? '已收藏' : '加入生词本'}
        </button>
      </div>
    </div>
  );
}