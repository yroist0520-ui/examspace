import { useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, Download, Upload, Palette } from 'lucide-react';
import { useApp } from '@/state/AppContext';
import { clearAll, exportAll, importAll } from '@/db';
import { Modal, Segmented, SectionTitle } from '@/components/ui';

/** 设置与数据：外观、学习偏好、每日目标、数据导出/导入/清空 */
export default function Settings() {
  const { settings, update } = useApp();
  const [confirmClear, setConfirmClear] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const flash = (t: string) => {
    setMsg(t);
    window.setTimeout(() => setMsg(null), 2600);
  };

  const onExport = async () => {
    const payload = await exportAll();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const d = new Date();
    a.download = `examspace-backup-${d.getFullYear()}${`${d.getMonth() + 1}`.padStart(2, '0')}${`${d.getDate()}`.padStart(2, '0')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash('已导出全部学习数据');
  };

  const onImport = async (file: File) => {
    try {
      const payload = JSON.parse(await file.text());
      if (payload?.app !== 'EXAMSPACE' || !payload.data) throw new Error('bad format');
      await importAll(payload);
      flash('导入成功，数据已合并');
    } catch {
      flash('导入失败：文件格式不正确');
    }
  };

  const doClear = async () => {
    await clearAll();
    setConfirmClear(false);
    flash('已清空全部学习数据（设置保留）');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-[19px] font-semibold tracking-tight">设置与数据</h1>
        <p className="mt-1 text-[13px] text-ink-mute">全部数据仅保存在本机浏览器（IndexedDB），不上传服务器。</p>
      </header>

      {msg && (
        <div className="chip border border-brand-500 bg-brand-50 text-brand-700">{msg}</div>
      )}

      {/* 外观 */}
      <section>
        <SectionTitle title="外观" hint="主题与正文排版实时生效" />
        <div className="card divide-y hairline">
          <Row label="主题" desc="纸白 / 米黄护眼 / 夜间">
            <Segmented
              value={settings.theme}
              onChange={(v) => void update({ theme: v })}
              items={[
                { value: 'paper', label: '纸白' },
                { value: 'sepia', label: '米黄' },
                { value: 'night', label: '夜间' }
              ]}
            />
          </Row>
          <Row label="正文字号" desc={`${settings.paperSize}px`}>
            <input
              type="range"
              min={15}
              max={21}
              step={1}
              value={settings.paperSize}
              onChange={(e) => void update({ paperSize: Number(e.target.value) })}
              className="w-40 accent-[var(--brand-600,#2e705c)]"
              aria-label="正文字号"
            />
          </Row>
          <Row label="行距" desc={settings.lineHeight.toFixed(2)}>
            <input
              type="range"
              min={1.6}
              max={2.3}
              step={0.05}
              value={settings.lineHeight}
              onChange={(e) => void update({ lineHeight: Number(e.target.value) })}
              className="w-40 accent-[var(--brand-600,#2e705c)]"
              aria-label="行距"
            />
          </Row>
        </div>
      </section>

      {/* 学习偏好 */}
      <section>
        <SectionTitle title="学习偏好" />
        <div className="card divide-y hairline">
          <Row label="每日学习目标" desc={`${settings.dailyGoalMinutes} 分钟`}>
            <input
              type="range"
              min={10}
              max={120}
              step={5}
              value={settings.dailyGoalMinutes}
              onChange={(e) => void update({ dailyGoalMinutes: Number(e.target.value) })}
              className="w-40 accent-[var(--brand-600,#2e705c)]"
              aria-label="每日学习目标"
            />
          </Row>
          <Row label="考试日期" desc="首页倒计时使用">
            <input
              type="date"
              className="field h-8 w-auto text-[13px]"
              value={settings.examDate}
              onChange={(e) => void update({ examDate: e.target.value })}
              aria-label="考试日期"
            />
          </Row>
          <Row label="单词发音" desc="打开查词弹窗时自动朗读">
            <Toggle on={settings.wordSound} onChange={(v) => void update({ wordSound: v })} />
          </Row>
          <Row label="阅读器默认显示解析" desc="阅读页可随时切换">
            <Toggle on={settings.showAnswersInReader} onChange={(v) => void update({ showAnswersInReader: v })} />
          </Row>
        </div>
      </section>

      {/* 数据 */}
      <section>
        <SectionTitle title="数据" hint="导出为 JSON 备份，可在其他设备导入合并" />
        <div className="card space-y-3 px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-ghost gap-1.5" onClick={() => void onExport()}>
              <Download size={14} /> 导出全部数据
            </button>
            <button className="btn btn-ghost gap-1.5" onClick={() => fileRef.current?.click()}>
              <Upload size={14} /> 导入备份
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void onImport(f);
                e.target.value = '';
              }}
            />
            <button
              className="btn gap-1.5 text-danger-500 hover:bg-danger-500/10"
              onClick={() => setConfirmClear(true)}
            >
              <AlertTriangle size={14} /> 清空学习数据
            </button>
          </div>
          <p className="text-[12px] leading-relaxed text-ink-mute">
            包含：考试记录、生词本、错题本、高亮笔记、草稿、收藏、每日统计与设置。清空后不可恢复，建议先导出备份。
          </p>
        </div>
      </section>

      {/* 关于 */}
      <section>
        <SectionTitle title="关于" />
        <div className="card space-y-2 px-4 py-4 text-[12.5px] leading-relaxed text-ink-mute">
          <p>
            <Palette size={13} className="mr-1 inline text-brand-600" />
            EXAMSPACE v0.6.0 · 英语真题学习平台（React + TypeScript + Tailwind + IndexedDB，PWA 可离线使用）
          </p>
          <p>
            题面与答案整理自公开渠道，版权归原考试机构及原发布方，仅供学习使用；站内只上线可直接阅读与作答的完整试卷，
            不提供外部跳转；不使用 AI 编造真题，听力以合成朗读呈现并明确标注。
          </p>
        </div>
      </section>

      <Modal
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        title="清空全部学习数据？"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setConfirmClear(false)}>
              取消
            </button>
            <button
              className="btn bg-danger-500 text-white hover:bg-danger-600"
              onClick={() => void doClear()}
            >
              确认清空
            </button>
          </>
        }
      >
        <p className="text-[13px] leading-relaxed text-ink-soft">
          将删除本机的考试记录、生词、错题、高亮、草稿与每日统计，且<strong>无法恢复</strong>。设置项会保留。
        </p>
      </Modal>
    </div>
  );
}

function Row({ label, desc, children }: { label: string; desc?: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <div>
        <div className="text-[13.5px] font-medium">{label}</div>
        {desc && <div className="mt-0.5 text-[11.5px] text-ink-mute">{desc}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition ${on ? 'bg-brand-600' : 'bg-black/15'}`}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
        style={{ left: on ? 22 : 2 }}
      />
    </button>
  );
}
