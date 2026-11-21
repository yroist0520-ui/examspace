import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock3,
  Flame,
  Layers,
  NotebookPen,
  Target
} from 'lucide-react';
import { useDbVersion } from '@/state/AppContext';
import { listAttempts, listBookmarks, listDaily, listMistakes, listWords, loadSettings, todayKey } from '@/db';
import { paperById, paperMetas, availableExamCodes, warmupPopular } from '@/data/papers';
import { exams, examMap } from '@/data/exams';
import { accuracyOf, totalMinutes } from '@/lib/score';
import { streakDays } from '@/lib/srs';
import { Progress, SectionTitle, StatTile } from '@/components/ui';
import type { Attempt, DailyStat, MistakeRecord, Settings, WordEntry } from '@/types/paper';
import { relativeDay } from '@/lib/text';

export default function Home() {
  const [v] = useDbVersion();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [daily, setDaily] = useState<DailyStat[]>([]);
  const [bookmarks, setBookmarks] = useState<{ paperId: string }[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    Promise.all([listAttempts(20), listWords(), listMistakes(), listDaily(30), listBookmarks(), loadSettings()]).then(
      ([a, w, m, d, b, s]) => {
        setAttempts(a);
        setWords(w);
        setMistakes(m);
        setDaily(d);
        setBookmarks(b);
        setSettings(s);
      }
    );
  }, [v]);

  // 首屏渲染完成后，后台预热最近四六级真题正文，点开即秒开；不阻塞首屏。
  useEffect(() => {
    const timer = window.setTimeout(() => warmupPopular(), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const today = daily.find((d) => d.date === todayKey());
  const todayMinutes = today?.minutes ?? 0;
  const goal = settings?.dailyGoalMinutes ?? 40;
  const streak = streakDays(daily.map((d) => d.date));
  const overallAccuracy = accuracyOf(attempts);
  const dueWords = words.filter((w) => !w.mastered && w.nextReviewAt <= Date.now()).length;
  const openMistakes = mistakes.filter((m) => !m.mastered);
  const inProgress = attempts.find((a) => !a.submittedAt);
  const recent = attempts.filter((a) => a.submittedAt).slice(0, 3);

  const daysUntilExam = useMemo(() => {
    if (!settings?.examDate) return null;
    const target = new Date(`${settings.examDate}T09:00:00`);
    const diff = Math.ceil((target.getTime() - Date.now()) / 86400000);
    return diff > 0 ? diff : null;
  }, [settings?.examDate]);

  const focusPaper = inProgress ? paperById(inProgress.paperId) : undefined;

  return (
    <div className="space-y-8">
      {/* 顶部概况 */}
      <section className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <div className="card relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="label">Today</div>
              <h1 className="mt-1.5 font-serif text-[24px] leading-tight tracking-tight sm:text-[27px]">
                今天读一篇，胜过收藏十篇
              </h1>
              <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-ink-mute">
                {daysUntilExam
                  ? `距考试还有 ${daysUntilExam} 天。先完成今天的 ${goal} 分钟，再决定要不要多读一段。`
                  : `先完成今天的 ${goal} 分钟，再决定要不要多读一段。`}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border hairline px-3 py-2">
              <Flame size={15} className="text-amber-500" />
              <div className="leading-none">
                <div className="font-serif text-[19px]">{streak}</div>
                <div className="mt-1 text-[10.5px] text-ink-mute">连续天数</div>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-medium">今日学习时长</span>
              <span className="text-ink-mute">
                {todayMinutes} / {goal} 分钟
              </span>
            </div>
            <div className="mt-2">
              <Progress value={(todayMinutes / goal) * 100} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-ink-mute">
              <span>答题 {today?.answered ?? 0} 题</span>
              <span>新增生词 {today?.wordsAdded ?? 0}</span>
              <span>正确率 {today && today.answered > 0 ? Math.round((today.correct / today.answered) * 100) : 0}%</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {focusPaper ? (
              <Link to={`/read/${focusPaper.id}`} className="btn btn-primary">
                继续阅读 · {focusPaper.title}
                <ArrowRight size={14} />
              </Link>
            ) : (
              <Link to="/library" className="btn btn-primary">
                进入真题库
                <ArrowRight size={14} />
              </Link>
            )}
            <Link to="/practice" className="btn btn-ghost">
              练习中心
            </Link>
            <Link to="/exam/cet4-2024-12-01" className="btn btn-ghost">
              开始一次模考
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <StatTile label="完成试卷" value={attempts.filter((a) => a.submittedAt).length} unit="套" icon={<BookOpen size={14} />} />
          <StatTile label="累计时长" value={totalMinutes(attempts)} unit="分钟" icon={<Clock3 size={14} />} />
          <StatTile label="总正确率" value={overallAccuracy} unit="%" icon={<Target size={14} />} />
          <StatTile label="生词积累" value={words.length} unit="词" hint={dueWords > 0 ? `今日待复习 ${dueWords}` : '暂无待复习'} icon={<NotebookPen size={14} />} />
        </div>
      </section>

      {/* 今日计划 */}
      <section>
        <SectionTitle
          title="今日学习计划"
          hint="三步即可完成今天的量，完成后自动记录到统计"
          action={<Link to="/practice" className="text-[12px] text-brand-600 hover:underline">全部练习 →</Link>}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <PlanCard
            index="01"
            title="精读一篇 Passage"
            detail="选一篇真题阅读，逐段标注 + 查词"
            to="/read/cet4-2024-12-01"
            icon={<Layers size={15} />}
            done={today && today.answered >= 5}
          />
          <PlanCard
            index="02"
            title={`复习 ${dueWords} 个生词`}
            detail={dueWords > 0 ? '按遗忘曲线到期，先复习再新增' : '暂无到期词，可继续积累'}
            to="/words"
            icon={<NotebookPen size={15} />}
            done={dueWords === 0}
          />
          <PlanCard
            index="03"
            title={`重做 ${Math.min(5, openMistakes.length)} 道错题`}
            detail={openMistakes.length > 0 ? '错题本按错误次数排序' : '暂无未掌握错题'}
            to="/mistakes"
            icon={<CheckCircle2 size={15} />}
            done={openMistakes.length === 0}
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* 最近学习 */}
        <section>
          <SectionTitle title="最近学习的试卷" hint="含未提交的答题进度" action={<Link to="/stats" className="text-[12px] text-brand-600 hover:underline">学习记录 →</Link>} />
          <div className="card divide-y hairline">
            {inProgress && (
              <PaperRow
                paperId={inProgress.paperId}
                meta={`进行中 · ${inProgress.mode === 'exam' ? '模考模式' : '练习模式'} · ${Object.keys(inProgress.answers).length} 题已答`}
                action="继续"
                to={`/read/${inProgress.paperId}`}
                highlight
              />
            )}
            {recent.map((a) => (
              <PaperRow
                key={a.id}
                paperId={a.paperId}
                meta={`${relativeDay(a.submittedAt!)} · 正确率 ${
                  a.result ? Math.round((a.result.correct / Math.max(1, a.result.correct + a.result.wrong + a.result.unanswered)) * 100) : 0
                }% · ${Math.round(a.elapsedSec / 60)} 分钟`}
                action="查看"
                to={`/result/${a.id}`}
              />
            ))}
            {!inProgress && recent.length === 0 && (
              <div className="px-4 py-8 text-center text-[13px] text-ink-mute">还没有学习记录，从真题库挑一套开始吧。</div>
            )}
          </div>
        </section>

        {/* 右侧：错题 + 收藏 */}
        <div className="space-y-6">
          <section>
            <SectionTitle title="最近错题" hint={`${openMistakes.length} 道未掌握`} action={<Link to="/mistakes" className="text-[12px] text-brand-600 hover:underline">错题本 →</Link>} />
            <div className="card divide-y hairline">
              {openMistakes.slice(0, 4).map((m) => (
                <Link key={m.id} to={`/mistakes`} className="block px-4 py-3 transition hover:bg-black/[0.02]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12.5px] font-medium">{examMap.get(m.exam)?.short} 第 {m.questionNo} 题</span>
                    <span className="chip shrink-0">错 {m.wrongCount} 次</span>
                  </div>
                  <div className="mt-0.5 truncate text-[11.5px] text-ink-mute">{m.paperTitle}</div>
                </Link>
              ))}
              {openMistakes.length === 0 && (
                <div className="px-4 py-6 text-center text-[12.5px] text-ink-mute">暂无错题。做完一套模考会自动收集。</div>
              )}
            </div>
          </section>

          <section>
            <SectionTitle title="收藏的试卷" action={<Link to="/library" className="text-[12px] text-brand-600 hover:underline">真题库 →</Link>} />
            <div className="card divide-y hairline">
              {bookmarks.slice(0, 3).map((b) => {
                const p = paperById(b.paperId);
                if (!p) return null;
                return (
                  <Link key={b.paperId} to={`/paper/${b.paperId}`} className="flex items-center gap-2 px-4 py-3 transition hover:bg-black/[0.02]">
                    <Bookmark size={13} className="shrink-0 text-amber-500" />
                    <div className="min-w-0">
                      <div className="truncate text-[12.5px] font-medium">{p.title}</div>
                      <div className="text-[11px] text-ink-mute">{p.subtitle}</div>
                    </div>
                  </Link>
                );
              })}
              {bookmarks.length === 0 && (
                <div className="px-4 py-6 text-center text-[12.5px] text-ink-mute">在试卷详情页点击收藏，方便下次找到。</div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* 快速进入考试 */}
      <section>
        <SectionTitle title="选择考试类型" hint="全部试卷均可在站内直接在线阅读与作答" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exams
            .filter((e) => availableExamCodes.includes(e.code))
            .map((e) => {
              const count = paperMetas.filter((p) => p.exam === e.code).length;
              return (
                <Link key={e.code} to={`/library/${e.code}`} className="card group flex flex-col px-4 py-4 transition hover:border-brand-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-semibold">{e.name}</span>
                    <span className="font-mono text-[11px] text-ink-faint">{count} 套</span>
                  </div>
                  <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-ink-mute">{e.blurb}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-1">
                      <span className="h-1.5 w-6 rounded-full" style={{ background: e.accent }} />
                      <span className="h-1.5 w-3 rounded-full opacity-50" style={{ background: e.accent }} />
                      <span className="h-1.5 w-1.5 rounded-full opacity-25" style={{ background: e.accent }} />
                    </div>
                    <span className="inline-flex items-center gap-0.5 text-[11.5px] text-brand-600 opacity-0 transition group-hover:opacity-100">
                      查看 <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      <div className="flex items-start gap-2 rounded-xl border hairline bg-black/[0.015] px-4 py-3">
        <span className="chip shrink-0" style={{ background: 'rgba(46,112,92,0.10)', color: '#1F5D4C' }}>
          版权说明
        </span>
        <p className="text-[11.5px] leading-relaxed text-ink-mute">
          站内只上线可直接阅读与作答的完整试卷，不提供任何外部跳转；题面与答案整理自公开渠道，版权归原考试机构及原发布方，
          仅供学习使用。站内不使用 AI 编造真题，听力以合成朗读呈现并明确标注，不以合成语音冒充原音。
        </p>
      </div>
    </div>
  );
}

function PlanCard({
  index,
  title,
  detail,
  to,
  icon,
  done
}: {
  index: string;
  title: string;
  detail: string;
  to: string;
  icon: React.ReactNode;
  done?: boolean;
}) {
  return (
    <Link to={to} className="card group flex items-start gap-3 px-4 py-3.5 transition hover:border-brand-300">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border hairline text-[11px] font-semibold text-ink-mute">
        {done ? <CheckCircle2 size={14} className="text-brand-600" /> : index}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[13px] font-medium">
          <span className="truncate">{title}</span>
        </div>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-mute">{detail}</p>
      </div>
      <span className="mt-1 text-ink-faint transition group-hover:text-brand-600">{icon}</span>
    </Link>
  );
}

function PaperRow({
  paperId,
  meta,
  action,
  to,
  highlight
}: {
  paperId: string;
  meta: string;
  action: string;
  to: string;
  highlight?: boolean;
}) {
  const p = paperById(paperId);
  if (!p) return null;
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-black/[0.02]">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[13px] font-medium">{p.title}</span>
          {highlight && <span className="chip" style={{ background: 'rgba(46,112,92,0.12)', color: '#1F5D4C' }}>未完成</span>}
        </div>
        <div className="mt-0.5 text-[11.5px] text-ink-mute">{meta}</div>
      </div>
      <span className="shrink-0 text-[12px] text-brand-600">{action} →</span>
    </Link>
  );
}