import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import clsx from 'clsx';
import { Pause, Play, Repeat, RotateCcw, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import type { AudioTrack } from '@/types/paper';
import { formatClock } from '@/lib/text';

/** 按句切分，处理标点处的自然停顿（避免逐字机械朗读） */
function splitSentences(text: string): string[] {
  const parts = text.match(/[^.!?；。！？]+[.!?；。！？]+["')\]]*\s*|[^.!?；。！？]+$/g);
  const out = (parts ?? [text]).map((s) => s.trim()).filter(Boolean);
  return out.length > 0 ? out : [text];
}

/** 段落间隔（毫秒）：标点与段落之间留出自然呼吸感，但不制造机械长停顿 */
const SENTENCE_GAP_MS = 160;

/**
 * 听力播放器（双模）：
 * - track.src 存在 → 真题原始录音播放（保留原说话人语气、口音与语速）；
 * - 否则 → 独立的“辅助朗读”功能（浏览器语音合成），界面明确标注为合成语音，
 *   绝不冒充真题原音。
 * 支持播放/暂停、可点击进度条、时间显示、0.75–1.5× 倍速、重新播放、
 * 单题循环、逐段跳转与原文对照。
 */
export default function AudioPlayer({
  track,
  activeSegmentId,
  onSegmentChange,
  showTranscript,
  onToggleTranscript
}: {
  track: AudioTrack;
  activeSegmentId?: string;
  onSegmentChange?: (id: string) => void;
  showTranscript: boolean;
  onToggleTranscript: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const [rate, setRate] = useState(1);
  const [loop, setLoop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ttsIndex, setTtsIndex] = useState(0);
  const [ttsSupported, setTtsSupported] = useState(true);
  const [ttsProgress, setTtsProgress] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string>('');
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const usingRealAudio = !!track.src;

  const segmentIndex = useMemo(() => {
    const id = activeSegmentId ?? track.segments[0]?.id;
    const idx = track.segments.findIndex((s) => s.id === id);
    return idx < 0 ? 0 : idx;
  }, [activeSegmentId, track.segments]);

  useEffect(() => {
    setTtsIndex(segmentIndex);
    setTtsProgress(0);
  }, [segmentIndex]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setTtsSupported(false);
      return;
    }
    setTtsSupported(true);
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      setVoices(all.filter((v) => v.lang.toLowerCase().startsWith('en')));
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const stopTts = useCallback(() => {
    playingRef.current = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const speakSegment = useCallback(
    (index: number) => {
      if (!ttsSupported) return;
      window.speechSynthesis.cancel();
      const seg = track.segments[index];
      if (!seg) return;
      const sentences = splitSentences(seg.text);
      const total = seg.text.length || 1;
      const voice = voices.find((v) => v.voiceURI === voiceURI) ?? null;
      let doneChars = 0;

      const speakAt = (i: number) => {
        if (!playingRef.current) return;
        if (i >= sentences.length) {
          setTtsProgress(100);
          if (loop) {
            window.setTimeout(() => {
              if (!playingRef.current) return;
              setTtsProgress(0);
              speakSegment(index);
            }, 500);
            return;
          }
          const next = index + 1;
          if (next < track.segments.length) {
            setTtsIndex(next);
            setTtsProgress(0);
            onSegmentChange?.(track.segments[next].id);
            window.setTimeout(() => speakAt2(next), SENTENCE_GAP_MS);
          } else {
            playingRef.current = false;
            setPlaying(false);
          }
          return;
        }
        const u = new SpeechSynthesisUtterance(sentences[i]);
        u.lang = 'en-US';
        u.rate = rate;
        if (voice) u.voice = voice;
        u.onboundary = (e) => {
          const pct = ((doneChars + e.charIndex) / total) * 100;
          setTtsProgress(Math.min(100, Math.round(pct)));
        };
        u.onend = () => {
          doneChars += sentences[i].length;
          if (playingRef.current) {
            window.setTimeout(() => speakAt(i + 1), SENTENCE_GAP_MS);
          }
        };
        u.onerror = () => {
          /* 取消或失败时停止链条，由播放状态兜底 */
        };
        utterRef.current = u;
        window.speechSynthesis.speak(u);
      };
      // 进入下一段时重新走 speakSegment 以重置段内状态
      const speakAt2 = (next: number) => {
        setTtsIndex(next);
        speakSegment(next);
      };
      playingRef.current = true;
      speakAt(0);
    },
    [track.segments, rate, loop, ttsSupported, voices, voiceURI, onSegmentChange]
  );

  useEffect(() => {
    return () => {
      playingRef.current = false;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const toggle = () => {
    if (usingRealAudio) {
      const el = audioRef.current;
      if (!el) return;
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        el.playbackRate = rate;
        void el.play();
        setPlaying(true);
      }
      return;
    }
    if (!ttsSupported) return;
    if (playing) {
      stopTts();
      setPlaying(false);
    } else {
      setPlaying(true);
      speakSegment(ttsIndex);
    }
  };

  /** 重新播放：真音频回到 00:00；辅助朗读从当前段重来 */
  const restart = () => {
    if (usingRealAudio) {
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = 0;
      setProgress(0);
      el.playbackRate = rate;
      void el.play();
      setPlaying(true);
      return;
    }
    if (!ttsSupported) return;
    setPlaying(true);
    speakSegment(ttsIndex);
  };

  const jumpSegment = (dir: -1 | 1) => {
    const next = Math.min(track.segments.length - 1, Math.max(0, ttsIndex + dir));
    setTtsIndex(next);
    setTtsProgress(0);
    onSegmentChange?.(track.segments[next].id);
    if (usingRealAudio) {
      const el = audioRef.current;
      const t = track.segments[next].seconds;
      if (el && typeof t === 'number') el.currentTime = t;
      return;
    }
    if (playing) speakSegment(next);
  };

  /** 点击段落：真题原音按段落时间戳定位，辅助朗读从该段重播 */
  const selectSegment = (i: number) => {
    setTtsIndex(i);
    setTtsProgress(0);
    onSegmentChange?.(track.segments[i].id);
    if (usingRealAudio) {
      const el = audioRef.current;
      const t = track.segments[i].seconds;
      if (el && typeof t === 'number') {
        el.currentTime = t;
        if (playing) void el.play();
      }
      return;
    }
    if (playing) speakSegment(i);
  };

  /** 进度条点击跳转（仅真题原音可精确定位） */
  const seek = (e: MouseEvent<HTMLDivElement>) => {
    if (!usingRealAudio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const el = audioRef.current;
    if (el) {
      el.currentTime = ratio * duration;
      setProgress(ratio * duration);
    }
  };

  const currentSeg = track.segments[ttsIndex];
  const currentQ = currentSeg?.questionNo;
  const pct = usingRealAudio ? (duration ? (progress / duration) * 100 : 0) : ttsProgress;

  return (
    <div className="card overflow-hidden">
      {/* 音源身份：真题原音 vs 合成语音辅助朗读 */}
      <div className="flex flex-wrap items-center gap-2 border-b hairline px-4 py-2">
        {usingRealAudio ? (
          <span className="chip" style={{ background: 'rgba(46,112,92,0.10)', color: '#1F5D4C' }}>
            <Volume2 size={11} /> 真题原音（原始录音）
          </span>
        ) : (
          <span className="chip" style={{ background: 'rgba(180,120,20,0.10)', color: '#8A5A0B' }}>
            合成语音 · 辅助朗读（非考试原音）
          </span>
        )}
        {track.note && <span className="text-[11px] text-ink-mute">{track.note}</span>}
        {!usingRealAudio && !ttsSupported && (
          <span className="text-[11px] text-ink-faint">当前浏览器不支持语音合成</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <button
          onClick={toggle}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition hover:brightness-110"
          aria-label={playing ? '暂停' : '播放'}
        >
          {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
        </button>
        <button className="btn btn-quiet h-7 px-1.5" onClick={() => jumpSegment(-1)} aria-label="上一段">
          <SkipBack size={14} />
        </button>
        <button className="btn btn-quiet h-7 px-1.5" onClick={() => jumpSegment(1)} aria-label="下一段">
          <SkipForward size={14} />
        </button>
        <button
          className="btn btn-quiet h-7 px-1.5"
          onClick={restart}
          aria-label="重新播放"
          title="重新播放本段"
        >
          <RotateCcw size={14} />
        </button>

        <div className="flex min-w-[120px] flex-1 items-center gap-2">
          <span className="font-mono text-[10.5px] text-ink-mute">
            {usingRealAudio ? formatClock(progress) : `${ttsIndex + 1}/${track.segments.length}`}
          </span>
          <div
            className={clsx(
              'h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.07]',
              usingRealAudio && duration && 'cursor-pointer'
            )}
            onClick={seek}
            role={usingRealAudio ? 'slider' : undefined}
            aria-label="播放进度"
            title={usingRealAudio ? '点击跳转' : '辅助朗读按段落推进'}
          >
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="font-mono text-[10.5px] text-ink-mute">
            {usingRealAudio ? formatClock(duration) : `${Math.round(pct)}%`}
          </span>
        </div>

        <div className="flex items-center gap-0.5 rounded-lg border hairline p-0.5">
          {[0.75, 1, 1.25, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRate(r);
                if (audioRef.current) audioRef.current.playbackRate = r;
                if (playing && !usingRealAudio) speakSegment(ttsIndex);
              }}
              className={clsx(
                'h-6 rounded px-1.5 font-mono text-[10.5px] transition',
                rate === r ? 'bg-brand-600 text-white' : 'text-ink-soft hover:bg-black/[0.04]'
              )}
            >
              {r}×
            </button>
          ))}
        </div>

        <button
          onClick={() => setLoop((x) => !x)}
          className={clsx('btn h-7 px-2 text-[11.5px]', loop ? 'bg-brand-600 text-white' : 'btn-ghost')}
          title={currentQ ? `单题循环：重复当前第 ${currentQ} 题所在段落` : '单段循环：重复当前段落'}
        >
          <Repeat size={13} /> 单题循环{currentQ ? ` Q${currentQ}` : ''}
        </button>

        {!usingRealAudio && voices.length > 0 && (
          <label className="flex items-center gap-1 text-[11px] text-ink-mute">
            发音
            <select
              className="h-7 max-w-[150px] rounded-lg border hairline bg-transparent px-1.5 text-[11px] text-ink-soft"
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              title="选择英语发音风格（辅助朗读，非考试原音）"
            >
              <option value="">浏览器默认</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name}（{v.lang}）
                </option>
              ))}
            </select>
          </label>
        )}

        <button className="btn btn-ghost h-7 px-2 text-[11.5px]" onClick={onToggleTranscript}>
          <Volume2 size={13} /> {showTranscript ? '隐藏原文' : '显示原文'}
        </button>
      </div>

      <div className="flex flex-wrap gap-1 border-t hairline px-3 py-2">
        {track.segments.map((s, i) => (
          <button
            key={s.id}
            onClick={() => selectSegment(i)}
            className={clsx(
              'rounded-md px-2 py-1 text-[11.5px] transition',
              i === ttsIndex ? 'bg-brand-50 font-medium text-brand-700' : 'text-ink-soft hover:bg-black/[0.04]'
            )}
          >
            {s.label}
            {s.questionNo && <span className="ml-1 font-mono text-[10px] text-ink-faint">Q{s.questionNo}</span>}
          </button>
        ))}
      </div>

      {usingRealAudio && (
        <audio
          ref={audioRef}
          src={track.src}
          hidden
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            setProgress(el.currentTime);
            setDuration(el.duration || 0);
          }}
          onEnded={() => setPlaying(false)}
        />
      )}

      {!usingRealAudio && (
        <div className="border-t hairline bg-black/[0.015] px-4 py-2 text-[11px] text-ink-mute">
          本段未收录真题原始听力录音（官方不公开发布）。当前为独立的辅助朗读功能，由浏览器语音合成朗读站内文本，
          仅作对照参考，不是考试原音，不用于替代真题录音。
        </div>
      )}

      {showTranscript && (
        <div className="space-y-2 border-t hairline px-4 py-3">
          {track.segments.map((s, i) => (
            <div key={s.id} className={clsx('rounded-lg px-3 py-2', i === ttsIndex && 'bg-brand-50')}>
              <div className="mb-1 flex items-center gap-2 text-[10.5px] text-ink-mute">
                <span className="font-semibold">{s.label}</span>
                {s.questionNo && <span className="font-mono">Q{s.questionNo}</span>}
                {i === ttsIndex && playing && <span className="text-brand-600">播放中</span>}
              </div>
              <p className="font-serif text-[13px] leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
