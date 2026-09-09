import React from 'react';
import { useLending } from '../../context/LendingContext';
import {
  Eye,
  ShieldCheck,
  AlertTriangle,
  FileWarning,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const FraudIntelligenceView: React.FC = () => {
  const { borrowers, selectedBorrower, setSelectedBorrower, setActivePage } = useLending();
  const b = selectedBorrower;

  // Profiles with simulated fraud checks
  const flaggedBorrowers = borrowers.filter((item) => item.fraudRisk !== 'LOW');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Eye className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Simulated AI Fraud Intelligence & Document Forensics
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Cross-checks declared income against OCR statements, detects synthetic identity fingerprints, and identifies duplicate ring requests
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-mono border border-transparent dark:border-slate-700">
            <span>Mode: Hackathon Simulation</span>
          </div>
        </div>
      </div>

      {/* Active Borrower Fraud Scan Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={b.avatar}
              alt={b.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Integrity Audit: {b.name}
                </h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono border border-transparent dark:border-slate-700">
                  {b.occupation}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Application ID: <span className="font-mono text-slate-700 dark:text-slate-300">{b.id.toUpperCase()}</span> • Requested: {formatINR(b.requestedLoan)}
              </p>
            </div>
          </div>

          {/* Fraud Risk Indicator */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">
                Calculated Fraud Risk
              </span>
              <span
                className={`text-lg font-black tracking-wide ${
                  b.fraudRisk === 'LOW'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : b.fraudRisk === 'MEDIUM'
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}
              >
                {b.fraudRisk} RISK
              </span>
            </div>
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                b.fraudRisk === 'LOW'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : b.fraudRisk === 'MEDIUM'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
              }`}
            >
              {b.fraudRisk === 'LOW' ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <AlertTriangle className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>

        {/* 5 Core Integrity Checks */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Automated Forensic Integrity Checks (5/5)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {b.fraudChecks.map((check, idx) => {
              const isPassed = check.status === 'passed';
              const isWarning = check.status === 'warning';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isPassed
                      ? 'border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : isWarning
                      ? 'border-amber-200/80 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20'
                      : 'border-rose-200/80 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      )}
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {check.name}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isPassed
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {check.status}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {check.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Warning Cards for Anomalies Detected Across Portfolio */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Active Network Anomaly Warnings ({flaggedBorrowers.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500">Heuristic rules triggered</span>
        </div>

        <div className="space-y-3">
          {/* Example 1: Amit Verma Income/OCR discrepancy */}
          <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Income Flow Variance Flag — Amit Verma
                  </h4>
                  <span className="text-[10px] bg-amber-200/80 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded">
                    Volatile Gig Inflows
                  </span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-0.5 leading-relaxed">
                  "Potential mismatch between declared income (₹22,000) and uploaded financial evidence: UPI inflows fluctuate widely (₹16k - ₹24k) with high existing debt burden (39% DTI)."
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const found = borrowers.find((item) => item.id === 'tl-103');
                if (found) setSelectedBorrower(found);
                setActivePage('result');
              }}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-slate-700 text-xs font-bold whitespace-nowrap"
            >
              Inspect Profile
            </button>
          </div>

          {/* Example 2: Deepak Joshi Chit Fund Default */}
          <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-800/80 bg-rose-50/50 dark:bg-rose-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 mt-0.5">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                    Community Ledger Delinquency — Deepak Joshi
                  </h4>
                  <span className="text-[10px] bg-rose-200/80 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-bold px-1.5 py-0.5 rounded">
                    Past Chit Fund Default
                  </span>
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-300/90 mt-0.5 leading-relaxed">
                  "Historical default record matched against informal merchant chit fund in Jaipur wholesale market. Declared turnover does not cover current aggregate EMI liabilities."
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const found = borrowers.find((item) => item.id === 'tl-107');
                if (found) setSelectedBorrower(found);
                setActivePage('result');
              }}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-slate-700 text-xs font-bold whitespace-nowrap"
            >
              Inspect Profile
            </button>
          </div>
        </div>

        {/* Demo note */}
        <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>* All anomaly flags and OCR forensic simulations are structured for hackathon demonstration.</span>
          <span className="font-mono text-slate-400 dark:text-slate-500">Rule Engine v2.1</span>
        </div>
      </div>
    </div>
  );
};
