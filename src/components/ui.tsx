import React from 'react';
import clsx from 'clsx';
import type { LicenseKind, Provenance, ResourceFlag, VerifyState } from '@/types/paper';

export function Modal({
  open,
  onClose,
  title,
  children,
  width = 'max-w-lg',
  footer
}: {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  footer?: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">
      <div
        className={clsx('card rise w-full overflow-hidden rounded-b-none sm:rounded-b-2xl', width)}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b hairline px-5 py-3.5">
          <div className="text-sm font-semibold">{title}</div>
          <button className="btn btn-quiet h-8 px-2 text-lg leading-none" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t hairline px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  onChange,
  items,
  size = 'md'
}: {
  value: T;
  onChange: (v: T) => void;
  items: { value: T; label: string; icon?: React.ReactNode }[];
  size?: 'sm' | 'md';
}) {
  return (
    <div className="inline-flex rounded-lg border hairline p-0.5">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={clsx(
            'inline-flex items-center gap-1 rounded-[6px] font-medium transition',
            size === 'sm' ? 'h-7 px-2.5 text-[12px]' : 'h-8 px-3 text-[13px]',
            value === item.value ? 'bg-brand-600 text-white' : 'text-ink-soft hover:bg-black/[0.04]'
          )}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Progress({ value, tone = 'brand' }: { value: number; tone?: 'brand' | 'amber' | 'danger' }) {
  const color = tone === 'amber' ? 'bg-amber-400' : tone === 'danger' ? 'bg-danger-500' : 'bg-brand-500';
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
      <div className={clsx('h-full rounded-full transition-all', color)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function StatTile({
  label,
  value,
  unit,
  hint,
  icon
}: {
  label: string;
  value: React.ReactNode;
  unit?: string;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="card px-4 py-3.5">
      <div className="flex items-center justify-between text-ink-mute">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-60">{label}</span>
        {icon}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-serif text-[26px] leading-none tracking-tight">{value}</span>
        {unit && <span className="text-[12px] text-ink-mute">{unit}</span>}
      </div>
      {hint && <div className="mt-1.5 text-[11.5px] text-ink-mute opacity-80">{hint}</div>}
    </div>
  );
}

export function EmptyState({
  title,
  desc,
  action
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <div className="font-serif text-[17px]">{title}</div>
      {desc && <div className="max-w-sm text-[13px] leading-relaxed text-ink-mute">{desc}</div>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function SampleBadge({ label = '示例数据' }: { label?: string }) {
  return (
    <span className="chip" style={{ background: 'rgba(196,143,43,0.12)', color: '#8A6416' }}>
      {label}
    </span>
  );
}

/** 资源状态徽标文案与配色 */
const flagMeta: Record<ResourceFlag, { text: string; bg: string; color: string }> = {
  collected: { text: '已收录', bg: 'rgba(46,120,92,0.12)', color: '#1F5D4C' },
  'external-only': { text: '仅外部链接', bg: 'rgba(59,110,165,0.12)', color: '#2C4E77' },
  'no-audio': { text: '缺少听力', bg: 'rgba(196,143,43,0.14)', color: '#8A6416' },
  'no-answers': { text: '缺少答案', bg: 'rgba(196,143,43,0.14)', color: '#8A6416' },
  'no-analysis': { text: '缺少解析', bg: 'rgba(196,143,43,0.14)', color: '#8A6416' },
  pending: { text: '待核验', bg: 'rgba(196,143,43,0.14)', color: '#8A6416' },
  'no-legal-resource': { text: '暂无合法可用资源', bg: 'rgba(180,65,58,0.12)', color: '#9E3A35' }
};

export function ResourceBadge({ flag }: { flag: ResourceFlag }) {
  const m = flagMeta[flag];
  return (
    <span className="chip" style={{ background: m.bg, color: m.color }}>
      {m.text}
    </span>
  );
}

export function ResourceBadges({ flags }: { flags: ResourceFlag[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {flags.map((f) => (
        <ResourceBadge key={f} flag={f} />
      ))}
    </span>
  );
}

export const licenseLabel: Record<LicenseKind, string> = {
  authorized: '已获授权',
  'link-only': '仅外部链接（无转载授权）',
  unknown: '授权状态待确认',
  none: '无可用授权'
};

export const verifyLabel: Record<VerifyState, string> = {
  verified: '内容已核验',
  pending: '待人工核验',
  unverified: '未核验'
};

const kindColor: Record<LicenseKind, string> = {
  authorized: 'text-brand-700',
  'link-only': 'text-[#2C4E77]',
  unknown: 'text-amber-700',
  none: 'text-danger-700'
};

/** 授权/核验状态行 */
export function LicenseLine({ provenance }: { provenance: Provenance }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px]">
      <span className={kindColor[provenance.license]}>{licenseLabel[provenance.license]}</span>
      <span className="text-ink-mute">{verifyLabel[provenance.verification]}</span>
      {provenance.checkedAt && <span className="font-mono text-ink-faint">核验于 {provenance.checkedAt}</span>}
    </div>
  );
}

export function SectionTitle({
  title,
  hint,
  action
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
        {hint && <p className="mt-0.5 text-[12px] text-ink-mute">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border hairline bg-black/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-ink-mute">
      {children}
    </kbd>
  );
}