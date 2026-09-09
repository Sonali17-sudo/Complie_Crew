import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskSignalsCardProps {
  positiveSignals: string[];
  warningSignals: string[];
}

export const RiskSignalsCard: React.FC<RiskSignalsCardProps> = ({
  positiveSignals,
  warningSignals,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Positive Signals */}
      <div className="bg-emerald-50/40 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-100 dark:border-emerald-900/40">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                Positive Risk Signals ({positiveSignals.length})
              </h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Credibility drivers increasing trust confidence
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {positiveSignals.map((signal, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                <span className="leading-relaxed font-medium">{signal}</span>
              </li>
            ))}
            {positiveSignals.length === 0 && (
              <li className="text-xs text-slate-400 dark:text-slate-500 italic">
                No strong positive signals detected.
              </li>
            )}
          </ul>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-100/60 dark:border-emerald-900/40 text-[10px] text-emerald-800 dark:text-emerald-300 font-medium">
          Source: Digital KYC verification, banking cash flow, and repayment history ledger.
        </div>
      </div>

      {/* Warning Signals */}
      <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl border border-amber-200/80 dark:border-amber-800/80 p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-100 dark:border-amber-900/40">
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                Risk & Warning Signals ({warningSignals.length})
              </h4>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                Potential friction points requiring lender vigilance
              </p>
            </div>
          </div>

          <ul className="space-y-2.5">
            {warningSignals.map((signal, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">⚠</span>
                <span className="leading-relaxed font-medium">{signal}</span>
              </li>
            ))}
            {warningSignals.length === 0 && (
              <li className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero adverse risk warnings detected for this profile.</span>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-100/60 dark:border-amber-900/40 text-[10px] text-amber-800 dark:text-amber-300 font-medium">
          Attention: Lenders should review tenure and debt service capability before issuing funds.
        </div>
      </div>
    </div>
  );
};
