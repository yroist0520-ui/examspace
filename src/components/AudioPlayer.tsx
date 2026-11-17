import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import clsx from 'clsx';
import { Pause, Play, Repeat, RotateCcw, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import type { AudioTrack } from '@/types/paper';
import { formatClock } from '@/lib/text';

/** 明显低质/怪异的音色（系统自带的搞怪与上世纪 macintalk 机械音），自动优选时排除 */
const ROBOTIC_VOICE =
  /\b(Albert|Bahh|Bells|Boing|Bubbles|Cellos|Wobble|Jester|Organ|Superstar|Trinoids|Zarvox|Whisper|Bad News|Good News|Fred|Ralph|Junior|Kathy)\b/i;
/** 高质量音色特征（各平台的自然/神经网络/在线增强音色） */
const HIGH_QUALITY = /(premium|enhanced|neural|natural|online|google|siri|ava|serena|aria|jenny|guy|nora|libby|sonia)/i;
/** 公认自然度高的经典音色，自动优选时优先（Samantha 为女声，作主发音；Alex 男声次之） */
const KNOWN_BEST_SAMANTHA = /\bsamantha\b/i;
const KNOWN_BEST_ALEX = /\balex\b/i;
/** 常见男声音色名：用于对话中 “Man” 轮次的第二发音 */
const MALE_VOICE =
  /\b(aaron|alex|daniel|david|guy|oliver|ryan|arthur|gordon|rocko|reed|thomas|tom|rishi|bruce|james|mark|grandpa|junior)\b/i;

/** 音色质量打分排序：让默认发音尽量落在自然度最高的英文音色上 */
function rankVoices(all: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const score = (v: SpeechSynthesisVoice): number => {
    let s = 0;
    if (HIGH_QUALITY.test(v.name)) s += 8;
    if (KNOWN_BEST_SAMANTHA.test(v.name)) s += 6;
    else if (KNOWN_BEST_ALEX.test(v.name)) s += 4;
    const lang = v.lang.toLowerCase();
    if (lang === 'en-us') s += 3;
    else if (lang === 'en-gb') s += 2;
    else if (lang.startsWith('en')) s += 1;
    if (v.localService) s += 1;
    return s;
  };
  return all
    .filter((v) => v.lang.toLowerCase().startsWith('en') && !ROBOTIC_VOICE.test(v.name))
    .map((v) => ({ v, s: score(v) }))
    .sort((a, b) => b.s - a.s || a.v.name.localeCompare(b.v.name))
    .map((x) => x.v);
}

/** 说话人轮次：把 "Man: … Woman: …" 拆成逐句轮次（标签不朗读），用于男女交替音色 */
type SpeakerRun = { who: 'A' | 'B'; text: string };
function splitSpeakerRuns(text: string): SpeakerRun[] {
  const re = /\b(Man|Woman|Male|Female|M|W|男|女)\s*[:：]/g;
  const marks: { who: 'A' | 'B'; start: number; textStart: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const label = m[1].toLowerCase();
    const who: 'A' | 'B' = label === 'man' || label === 'male' || label === 'm' || label === '男' ? 'B' : 'A';
    marks.push({ who, start: m.index, textStart: m.index + m[0].length });
  }
  if (marks.length === 0) {
    const t = text.trim();
    return t ? [{ who: 'A', text: t }] : [];
  }
  const runs: SpeakerRun[] = [];
  const lead = text.slice(0, marks[0].start).trim();
  if (lead) runs.push({ who: 'A', text: lead });
  marks.forEach((mk, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : text.length;
    const t = text.slice(mk.textStart, end).trim();
    if (t) runs.push({ who: mk.who, text: t });
  });
  return runs;
}

/** 轮次之间的呼吸停顿（自然衔接，不制造机械长停顿） */
const RUN_GAP_MS = 260;
/** 段落之间的停顿 */
const SEG_GAP_MS = 520;
/** Chrome 长语音会静默暂停，定期 resume 守护（解决“中途停住/断断续续”） */
const WATCHDOG_MS = 8000;
/** 估算朗读速度（字符/秒），用于无 boundary 事件时的进度兜底 */
const CHARS_PER_SEC = 14;

/**
 * 听力播放器（双模）：
 * - track.src 存在 → 真题原始录音播放（保留原说话人语气、口音与语速）；
 * - 否则 → 独立的“辅助朗读”功能（浏览器语音合成），界面明确标注为合成语音，
 *   绝不冒充真题原音。
 * 辅助朗读优化：
 * - 自动优选高质量英文音色（可手动切换发音风格）；
 * - 按说话人轮次整段朗读（对话 Man/Woman 交替音色），由引擎处理句读停顿，
 *   避免一句一顿的机械拼接；
 * - resume 守护 + 错误重试，解决播放中途卡住；
 * - 支持播放/暂停、进度显示、0.75–1.5× 倍速、重新播放、单题循环与原文对照。
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

  const usingRealAudio = !!track.src;
  /** 朗读链代际：切换段落/停止时递增，使旧回调失效，避免双跳或卡链 */
  const chainRef = useRef(0);

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
    const loadVoices = () => setVoices(rankVoices(window.speechSynthesis.getVoices()));
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  /** 主发音（自动优选或手动指定）；对话第二发音优先取男声（Man 轮次） */
  const voiceA = useMemo(
    () => voices.find((v) => v.voiceURI === voiceURI) ?? voices[0] ?? null,
    [voices, voiceURI]
  );
  const voiceB = useMemo(
    () =>
      voices.find((v) => v.voiceURI !== voiceA?.voiceURI && MALE_VOICE.test(v.name)) ??
      voices.find((v) => v.voiceURI !== voiceA?.voiceURI) ??
      null,
    [voices, voiceA]
  );

  const stopTts = useCallback(() => {
    playingRef.current = false;
    chainRef.current += 1;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const speakSegment = useCallback(
    (index: number) => {
      if (!ttsSupported) return;
      const myChain = ++chainRef.current;
      window.speechSynthesis.cancel();
      const seg = track.segments[index];
      if (!seg) return;
      const runs = splitSpeakerRuns(seg.text);
      const totalChars = runs.reduce((n, r) => n + r.text.length, 0) || 1;
      let doneChars = 0;
      playingRef.current = true;

      const handleSegEnd = () => {
        setTtsProgress(100);
        if (loop) {
          window.setTimeout(() => {
            if (chainRef.current === myChain && playingRef.current) speakSegment(index);
          }, 600);
          return;
        }
        const next = index + 1;
        if (next < track.segments.length) {
          setTtsIndex(next);
          setTtsProgress(0);
          onSegmentChange?.(track.segments[next].id);
          window.setTimeout(() => {
            if (playingRef.current) speakSegment(next);
          }, SEG_GAP_MS);
        } else {
          playingRef.current = false;
          setPlaying(false);
        }
      };

      const speakRun = (ri: number, attempt = 0) => {
        if (chainRef.current !== myChain || !playingRef.current) return;
        if (ri >= runs.length) {
          handleSegEnd();
          return;
        }
        const run = runs[ri];
        const u = new SpeechSynthesisUtterance(run.text);
        u.lang = 'en-US';
        u.rate = rate;
        const voice = run.who === 'B' ? voiceB ?? voiceA : voiceA;
        if (voice) u.voice = voice;

        const startChars = doneChars;
        let gotBoundary = false;
        const estMs = Math.max(1200, (run.text.length / CHARS_PER_SEC / Math.max(0.5, rate)) * 1000);
        const t0 = performance.now();
        const ticker = window.setInterval(() => {
          if (gotBoundary || chainRef.current !== myChain) return;
          const p = Math.min(99, ((performance.now() - t0) / estMs) * 100);
          const pct = ((startChars + (run.text.length * p) / 100) / totalChars) * 100;
          setTtsProgress(Math.min(100, Math.round(pct)));
        }, 250);

        const cleanup = () => window.clearInterval(ticker);
        const guard = () => chainRef.current === myChain && playingRef.current;

        u.onboundary = (e) => {
          gotBoundary = true;
          const pct = ((startChars + e.charIndex) / totalChars) * 100;
          setTtsProgress(Math.min(100, Math.round(pct)));
        };
        u.onend = () => {
          cleanup();
          if (!guard()) return;
          doneChars = startChars + run.text.length;
          setTtsProgress(Math.min(100, Math.round((doneChars / totalChars) * 100)));
          window.setTimeout(() => speakRun(ri + 1), RUN_GAP_MS);
        };
        u.onerror = () => {
          cleanup();
          // 链已被切换/停止（旧回调）则由 guard 退出；同链内被打断（系统通知、语音抢占）也走重试
          if (!guard()) return;
          if (attempt === 0) {
            // 首次错误重试当前轮次一次，避免中途无声中断
            window.setTimeout(() => speakRun(ri, 1), 150);
          } else {
            doneChars = startChars + run.text.length;
            window.setTimeout(() => speakRun(ri + 1), RUN_GAP_MS);
          }
        };
        window.speechSynthesis.speak(u);
      };

      speakRun(0);
    },
    [track.segments, rate, loop, ttsSupported, voiceA, voiceB, onSegmentChange]
  );

  useEffect(() => {
    return () => {
      playingRef.current = false;
      chainRef.current += 1;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  /** 中途卡住守护：Chrome 在长语音/后台标签时会静默暂停，定期恢复 */
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || usingRealAudio) return;
    const tick = window.setInterval(() => {
      if (playingRef.current && window.speechSynthesis.speaking) window.speechSynthesis.resume();
    }, WATCHDOG_MS);
    const onVisibility = () => {
      if (!document.hidden && playingRef.current) window.speechSynthesis.resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(tick);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [usingRealAudio]);

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
              className="h-7 max-w-[160px] rounded-lg border hairline bg-transparent px-1.5 text-[11px] text-ink-soft"
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              title="选择英语发音风格（辅助朗读，非考试原音）"
            >
              <option value="">
                自动优选{voices[0] ? `：${voices[0].name}` : ''}
              </option>
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
          本段未收录真题原始听力录音（官方不公开发布）。当前为独立的辅助朗读功能，由浏览器语音合成朗读站内文本
          （自动优选高质量英文音色，对话按说话人交替音色），仅作对照参考，不是考试原音，不用于替代真题录音。
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
