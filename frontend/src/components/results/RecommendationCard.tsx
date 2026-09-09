import React from 'react';
import {
  Sparkles,
  Check,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
  Info,
  Calendar,
} from 'lucide-react';
import { Borrower } from '../../types';
import { formatINR } from '../../utils/formatters';
import { RiskBadge } from '../common/RiskBadge';
import { useLending } from '../../context/LendingContext';

interface RecommendationCardProps {
  borrower: Borrower;
  onAdjustTerms?: () => void;
  onGenerateReport?: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  borrower,
  onAdjustTerms,
  onGenerateReport,
}) => {
  const { updateBorrowerStatus, setActivePage } = useLending();

  const handleAccept = () => {
    updateBorrowerStatus(borrower.id, 'Accepted');
  };

  const handleAdjust = () => {
    if (onAdjustTerms) {
      onAdjustTerms();
    } else {
      setActivePage('simulator');
    }
  };

  const handleReport = () => {
    if (onGenerateReport) {
      onGenerateReport();
    } else {
      setActivePage('reports');
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-3xl border-2 border-brand-200/90 dark:border-brand-900/60 p-6 sm:p-8 shadow-md relative overflow-hidden transition-colors">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
              Personalized Lending Recommendation
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Optimal Risk-Balanced Terms
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RiskBadge level={borrower.riskLevel} size="md" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full shadow-xs">
            Confidence: <strong className="text-slate-900 dark:text-slate-100">{borrower.confidence}%</strong>
          </span>
        </div>
      </div>

      {/* Numerical Comparison Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {/* Requested Loan */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Requested Loan
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-1">
            {formatINR(borrower.requestedLoan)}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
            {borrower.preferredTenure} Months tenure
          </span>
        </div>

        {/* AI Recommended Loan */}
        <div className="bg-brand-50/70 dark:bg-brand-950/70 p-4 rounded-2xl border border-brand-300 dark:border-brand-700 shadow-xs ring-1 ring-brand-200 dark:ring-brand-800">
          <span className="text-[11px] font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-600 dark:text-brand-400" />
            AI Recommended
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-brand-900 dark:text-brand-100 mt-1">
            {formatINR(borrower.recommendedLoan)}
          </div>
          <span className="text-xs text-brand-700 dark:text-brand-300 font-semibold mt-0.5 block">
            {borrower.recommendedLoan < borrower.requestedLoan
              ? `-${formatINR(borrower.requestedLoan - borrower.recommendedLoan)} risk buffer`
              : '100% matched'}
          </span>
        </div>

        {/* Recommended Tenure */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            Recommended Tenure
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-800 dark:text-slate-100 mt-1">
            {borrower.recommendedTenure} <span className="text-sm font-sans font-bold text-slate-500 dark:text-slate-400">Months</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
            Optimized debt service
          </span>
        </div>

        {/* Current Status */}
        <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Decision Status
          </span>
          <div className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">
            {borrower.status}
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 block">
            Audited {borrower.lastAnalysisDate}
          </span>
        </div>
      </div>

      {/* Why This Recommendation? - AI Natural Language Explanation */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-2xl p-5 sm:p-6 shadow-inner border border-transparent dark:border-slate-800 mb-6">
        <div className="flex items-center gap-2 mb-2 text-brand-300 dark:text-brand-400">
          <Info className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">
            Why This Recommendation?
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 leading-relaxed">
          {borrower.aiExplanation}
        </p>
      </div>

      {/* Buttons & Decision Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleAccept}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
              borrower.status === 'Accepted'
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white cursor-default'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30 hover:scale-102 active:scale-98'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{borrower.status === 'Accepted' ? 'Recommendation Accepted' : 'Accept Recommendation'}</span>
          </button>

          <button
            onClick={handleAdjust}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Adjust Terms</span>
          </button>

          <button
            onClick={handleReport}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Generate Report</span>
          </button>
        </div>

        {/* Human in the loop mandatory disclaimer */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
          <span>AI Decision Support — Final decision remains with lender.</span>
        </div>
      </div>
    </div>
  );
};
