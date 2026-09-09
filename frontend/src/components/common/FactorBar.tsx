import React from 'react';

interface FactorBarProps {
  label: string;
  score: number; // 0 to 100
  subtitle?: string;
  weight?: string;
}

export const FactorBar: React.FC<FactorBarProps> = ({
  label,
  score,
  subtitle,
  weight,
}) => {
  let barColor = 'bg-emerald-500 dark:bg-emerald-400';
  let textColor = 'text-emerald-700 dark:text-emerald-400';

  if (score < 65) {
    barColor = 'bg-rose-500 dark:bg-rose-400';
    textColor = 'text-rose-700 dark:text-rose-400';
  } else if (score < 80) {
    barColor = 'bg-amber-500 dark:bg-amber-400';
    textColor = 'text-amber-700 dark:text-amber-400';
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-700 dark:text-slate-200">{label}</span>
          {weight && (
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              wt: {weight}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-bold font-mono ${textColor}`}>{score}</span>
          <span className="text-slate-400 dark:text-slate-500">/100</span>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
        />
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{subtitle}</p>
      )}
    </div>
  );
};
