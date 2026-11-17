import clsx from 'clsx';
import { Check, Info, X } from 'lucide-react';
import type { Question } from '@/types/paper';

export function Options({
  question,
  value,
  onChange,
  revealed,
  disabled
}: {
  question: Question;
  value?: string;
  onChange: (v: string) => void;
  revealed?: boolean;
  disabled?: boolean;
}) {
  if (!question.options) return null;
  return (
    <div className="space-y-1.5">
      {question.options.map((opt) => {
        const selected = value === opt.key;
        const isAnswer = revealed && opt.key === question.answer;
        const isWrongPick = revealed && selected && opt.key !== question.answer;
        return (
          <button
            key={opt.key}
            disabled={disabled}
            onClick={() => onChange(opt.key)}
            className={clsx(
              'flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left transition',
              isAnswer
                ? 'border-brand-500 bg-brand-50'
                : isWrongPick
                  ? 'border-danger-500 bg-danger-50'
                  : selected
                    ? 'border-brand-400 bg-brand-50/60'
                    : 'hairline hover:border-brand-300 hover:bg-black/[0.015]',
              disabled && !revealed && 'cursor-default opacity-80'
            )}
          >
            <span
              className={clsx(
                'mt-[1px] grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full border text-[10.5px] font-semibold',
                isAnswer
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : isWrongPick
                    ? 'border-danger-500 bg-danger-500 text-white'
                    : selected
                      ? 'border-brand-400 text-brand-700'
                      : 'hairline text-ink-mute'
              )}
            >
              {isAnswer ? <Check size={11} /> : isWrongPick ? <X size={11} /> : opt.key}
            </span>
            <span className="text-[13px] leading-relaxed">{opt.text}</span>
          </button>
        );
      })}
    </div>
  );
}

export function BankChips({
  bank,
  value,
  onChange,
  revealed,
  answer,
  disabled
}: {
  bank: Record<string, string>;
  value?: string;
  onChange: (v: string) => void;
  revealed?: boolean;
  answer: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {Object.entries(bank).map(([key, word]) => {
          const selected = value === key;
          const isAnswer = revealed && key === answer;
          return (
            <button
              key={key}
              disabled={disabled}
              onClick={() => onChange(key)}
              className={clsx(
                'rounded-md border px-2 py-1 text-[12px] transition',
                isAnswer
                  ? 'border-brand-500 bg-brand-50 font-medium text-brand-700'
                  : selected
                    ? 'border-brand-400 bg-brand-50/60'
                    : 'hairline text-ink-soft hover:border-brand-300'
              )}
            >
              <span className="mr-1 font-mono text-[10px] text-ink-faint">{key}</span>
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Explanation({ question, value }: { question: Question; value?: string }) {
  const correct = value === question.answer;
  return (
    <div className="mt-3 rounded-lg border hairline bg-black/[0.015] px-3.5 py-3">
      <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
        <span className={clsx('font-semibold', correct ? 'text-brand-600' : 'text-danger-500')}>
          {correct ? '回答正确' : value ? '回答错误' : '未作答'}
        </span>
        <span className="text-ink-faint">·</span>
        <span className="text-ink-mute">
          正确答案 <span className="font-mono font-semibold text-ink">{question.answer}</span>
        </span>
      </div>
      <div className="mt-1.5 flex gap-1.5 text-[12.5px] leading-relaxed text-ink-soft">
        <Info size={13} className="mt-[3px] shrink-0 text-ink-faint" />
        <p>{question.explanation}</p>
      </div>
    </div>
  );
}

export function QuestionHead({ question, showScore }: { question: Question; showScore?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[1px] grid h-[21px] min-w-[21px] place-items-center rounded-md border hairline px-1 font-mono text-[10.5px] text-ink-mute">
        {question.number}
      </span>
      <p className="flex-1 text-[13.5px] leading-relaxed">{question.stem}</p>
      {showScore && <span className="mt-[2px] shrink-0 font-mono text-[10.5px] text-ink-faint">{question.score} 分</span>}
    </div>
  );
}