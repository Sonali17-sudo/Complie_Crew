import React from 'react';
import { Borrower } from '../../types';
import { ShieldCheck, Plus, Minus, Clock, Hash, CheckCircle2 } from 'lucide-react';

interface DecisionEvidenceAuditProps {
  borrower: Borrower;
}

export const DecisionEvidenceAudit: React.FC<DecisionEvidenceAuditProps> = ({
  borrower,
}) => {
  return (
    <div className="space-y-6">
      {/* Evidence Points Impact Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                AI Decision Evidence & Point Attribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verifiable factors directly driving the calculated Trust Score
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded font-semibold border border-transparent dark:border-slate-700">
            SHAP Attribution Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {borrower.evidences.map((ev, index) => {
            const isPositive = ev.impactPoints > 0;
            return (
              <div
                key={ev.id || index}
                className={`p-4 rounded-xl border transition-all ${
                  isPositive
                    ? 'border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/30'
                    : 'border-rose-200/80 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      Evidence #{index + 1}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      "{ev.title}"
                    </h4>
                  </div>

                  <span
                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold font-mono ${
                      isPositive
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {isPositive ? (
                      <Plus className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                    {Math.abs(ev.impactPoints)} Trust Score
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] space-y-1">
                  <p className="text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-200">Source:</strong> {ev.source}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {ev.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Trail Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Auditable Verification Timeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Immutable chronological ledger of all verification and inference actions
              </p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Audit Hash Verified
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {borrower.auditTrail.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Dot */}
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-brand-600 dark:bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-950" />

              <div className="flex-1 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{step.action}</span>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    {step.date}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    Actor: <strong className="text-slate-700 dark:text-slate-300">{step.actor}</strong>
                  </span>
                  <span className="font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Hash className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                    {step.verifiedHash}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
