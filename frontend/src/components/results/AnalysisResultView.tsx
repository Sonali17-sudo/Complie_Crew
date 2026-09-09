import React from 'react';
import { useLending } from '../../context/LendingContext';
import { TrustScoreGauge } from '../common/TrustScoreGauge';
import { RiskBadge } from '../common/RiskBadge';
import { FactorScoreCards } from './FactorScoreCards';
import { RiskSignalsCard } from './RiskSignalsCard';
import { RecommendationCard } from './RecommendationCard';
import { DecisionEvidenceAudit } from './DecisionEvidenceAudit';
import {
  FileText,
  SlidersHorizontal,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const AnalysisResultView: React.FC = () => {
  const { selectedBorrower, setActivePage } = useLending();
  const b = selectedBorrower;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setActivePage('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('simulator')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Open in Loan Simulator</span>
          </button>
          <button
            onClick={() => setActivePage('reports')}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Full Audit Memo</span>
          </button>
        </div>
      </div>

      {/* TOP HEADER: Profile Summary & Large Trust Score Radial Gauge */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Borrower Bio & Fast Stats (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={b.avatar}
                alt={b.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow-sm"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {b.name}
                  </h1>
                  <RiskBadge level={b.riskLevel} size="md" />
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {b.occupation} ({b.employmentDuration})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {b.location}
                  </span>
                  <span>•</span>
                  <span>Age: {b.age}y</span>
                </p>

                <div className="pt-1 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Identity & Banking Verified
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    ID: {b.id.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block">
                  Monthly Income
                </span>
                <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-100">
                  {formatINR(b.monthlyIncome)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block">
                  Existing EMI
                </span>
                <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-100">
                  {formatINR(b.existingEmi)}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                  {Math.round((b.existingEmi / b.monthlyIncome) * 100)}% DTI ratio
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 block">
                  Requested Amount
                </span>
                <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-100">
                  {formatINR(b.requestedLoan)}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                  {b.preferredTenure} Months tenure
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Trust Score Gauge (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <TrustScoreGauge
              score={b.trustScore}
              riskLevel={b.riskLevel}
              confidence={b.confidence}
              size={210}
            />
          </div>
        </div>
      </div>

      {/* 6 FACTOR SCORES */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Underwriting Factor Score Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Weighted components feeding the overall Trust Score
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-lg border border-transparent dark:border-brand-900">
            Transparent Weights
          </span>
        </div>
        <FactorScoreCards factors={b.factorScores} />
      </div>

      {/* POSITIVE & WARNING SIGNALS */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
          Credibility & Risk Signals Detected
        </h3>
        <RiskSignalsCard
          positiveSignals={b.positiveSignals}
          warningSignals={b.warningSignals}
        />
      </div>

      {/* AI LENDING RECOMMENDATION CARD */}
      <div>
        <RecommendationCard borrower={b} />
      </div>

      {/* AUDIT / EXPLAINABILITY EVIDENCE SECTION */}
      <div>
        <DecisionEvidenceAudit borrower={b} />
      </div>
    </div>
  );
};
