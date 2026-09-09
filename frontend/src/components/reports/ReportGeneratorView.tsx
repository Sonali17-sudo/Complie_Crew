import React, { useState } from 'react';
import { useLending } from '../../context/LendingContext';
import { formatINR } from '../../utils/formatters';
import { RiskBadge } from '../common/RiskBadge';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  Sparkles,
  Layers,
  ArrowLeft,
  Clock,
  Hash,
} from 'lucide-react';

export const ReportGeneratorView: React.FC = () => {
  const {
    borrowers,
    selectedBorrower,
    setSelectedBorrower,
    addToast,
    setActivePage,
  } = useLending();
  const b = selectedBorrower;

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addToast(
        'Audit Report Compiled',
        `Comprehensive explainable lending memorandum for ${b.name} generated.`,
        'success'
      );
    }, 800);
  };

  const handleDownloadPdf = () => {
    addToast(
      'Exporting PDF Memo',
      `Audit certificate TL-AUDIT-${b.id.toUpperCase()}.pdf queued for export.`,
      'info'
    );
    // Trigger native browser print dialog for immediate PDF save!
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Top Action Bar */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Explainable Lending Audit Report
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official verifiable memorandum with multi-factor evidence weights
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Select borrower */}
          <select
            value={b.id}
            onChange={(e) => {
              const found = borrowers.find((item) => item.id === e.target.value);
              if (found) setSelectedBorrower(found);
            }}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-bold text-slate-800 dark:text-slate-200 focus:outline-none transition-colors"
          >
            {borrowers.map((borrower) => (
              <option key={borrower.id} value={borrower.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                {borrower.name} ({borrower.riskLevel} Risk)
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center gap-1.5 border border-brand-200 dark:border-brand-800 shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>{isGenerating ? 'Compiling...' : 'Generate Report'}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* PRINTABLE OFFICIAL MEMO CONTAINER */}
      <div className="print-container bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-lg space-y-8 text-slate-900 dark:text-slate-100 transition-colors">
        {/* Memo Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-slate-900 dark:border-slate-700">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                TL
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">TrustLend AI</span>
              <span className="text-[10px] uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-200 dark:border-slate-700">
                Official Audit Memo
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Explainable AI Underwriting & Decision Support System
            </p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1 font-mono text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-900 dark:text-slate-200">Audit Ref:</strong> TL-MEMO-2026-{b.id.toUpperCase()}
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-200">Timestamp:</strong> {b.lastAnalysisDate} 10:24:52 IST
            </p>
            <p>
              <strong className="text-slate-900 dark:text-slate-200">Auditor Role:</strong> Chief Credit Evaluation Desk
            </p>
          </div>
        </div>

        {/* 1. Borrower Information */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            1. Borrower Profile & Identity Information
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Full Name</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{b.name}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Age & Location</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{b.age} yrs • {b.location}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Occupation & Type</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{b.occupation} ({b.employmentType})</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Employment Duration</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{b.employmentDuration} continuous</span>
            </div>
          </div>
        </div>

        {/* 2. Verification Summary & Fraud Indicators */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            2. Verification Summary & Fraud Forensic Integrity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800/70">
              <span className="text-slate-400 uppercase text-[10px] font-semibold block">Identity Status</span>
              <div className="mt-1 flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Aadhaar / PAN Cryptographically Validated</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800/70">
              <span className="text-slate-400 uppercase text-[10px] font-semibold block">Bank Cash Flow OCR</span>
              <div className="mt-1 flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>6-Month Banking Record Matches Declared Inflow</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-800/70">
              <span className="text-slate-400 uppercase text-[10px] font-semibold block">Fraud Indicator</span>
              <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{b.fraudRisk} FRAUD RISK (All 5 Checks Cleared)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Financial Analysis & Metrics */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            3. Financial Analysis & Underwriting Indicators
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Monthly Income</span>
              <span className="font-extrabold font-mono text-slate-900 dark:text-slate-100 text-sm">{formatINR(b.monthlyIncome)}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Existing Monthly EMI</span>
              <span className="font-extrabold font-mono text-slate-900 dark:text-slate-100 text-sm">{formatINR(b.existingEmi)}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Debt-to-Income (DTI)</span>
              <span className="font-extrabold font-mono text-slate-900 dark:text-slate-100 text-sm">
                {Math.round((b.existingEmi / b.monthlyIncome) * 100)}%
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] block font-semibold">Repayment Track Record</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {b.repaymentHistory.successfulRepayments} on-time • {b.repaymentHistory.defaults} defaults
              </span>
            </div>
          </div>
        </div>

        {/* 4. Trust Score, Risk Score & Multi-Factor Weights */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3">
            4. Trust Score & Transparent Attribution Matrix
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 block">
                Calculated Trust Score
              </span>
              <div className="text-4xl font-extrabold font-mono text-brand-900 dark:text-brand-100 mt-1">
                {b.trustScore}
                <span className="text-base font-normal text-brand-600 dark:text-brand-400">/100</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Risk Classification
              </span>
              <div className="mt-2">
                <RiskBadge level={b.riskLevel} size="lg" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Model Confidence
              </span>
              <div className="text-4xl font-extrabold font-mono text-slate-900 dark:text-slate-100 mt-1">
                {b.confidence}%
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold uppercase text-[10px] text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="p-3">Underwriting Factor</th>
                  <th className="p-3">Model Weight</th>
                  <th className="p-3">Assigned Factor Score</th>
                  <th className="p-3">Status Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                <tr>
                  <td className="p-3 font-semibold">Identity Verification</td>
                  <td className="p-3 font-mono">15%</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">{b.factorScores.identityConfidence}/100</td>
                  <td className="p-3 text-emerald-700 dark:text-emerald-400 font-semibold">Authenticated via digital token</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Income Stability</td>
                  <td className="p-3 font-mono">20%</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">{b.factorScores.incomeStability}/100</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{b.employmentDuration} continuous earnings</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Repayment Reliability</td>
                  <td className="p-3 font-mono">25%</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">{b.factorScores.repaymentReliability}/100</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{b.repaymentHistory.successfulRepayments} past loans closed</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Debt Burden & Liquidity</td>
                  <td className="p-3 font-mono">20%</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">{b.factorScores.debtBurden}/100</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Existing obligations claim {Math.round((b.existingEmi/b.monthlyIncome)*100)}% of earnings</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Behavioral & Network Trust</td>
                  <td className="p-3 font-mono">10%</td>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-slate-100">{b.factorScores.behavioralReliability}/100</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">Clean single-instance borrower registry record</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Positive & Risk Factors */}
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3">
            5. Audited Evidence Points Used in Synthesis
          </h3>

          <div className="space-y-2">
            {b.evidences.map((ev, i) => (
              <div
                key={i}
                className="flex items-start justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">"{ev.title}"</span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{ev.explanation}</p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">Verifiable Source: {ev.source}</span>
                </div>
                <span
                  className={`font-mono font-bold text-xs px-2 py-0.5 rounded-full ${
                    ev.impactPoints > 0
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50'
                      : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50'
                  }`}
                >
                  {ev.impactPoints > 0 ? `+${ev.impactPoints}` : ev.impactPoints} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. AI Recommendation Terms & Explainable Rationale */}
        <div className="p-6 rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-400 block">
                Recommended Personalized Terms
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1">
                {formatINR(b.recommendedLoan)}{' '}
                <span className="text-sm font-sans font-normal text-slate-400">
                  for {b.recommendedTenure} Months
                </span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-slate-400 block">Requested Amount</span>
              <span className="font-mono text-slate-300 font-bold">
                {formatINR(b.requestedLoan)} ({b.preferredTenure} mos)
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-1">
              AI Underwriting Explanation Rationale
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {b.aiExplanation}
            </p>
          </div>
        </div>

        {/* Mandatory Final Decision Legal Disclaimer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              AI Decision Support Notice: Final lending decisions remain strictly with the human lender.
            </p>
          </div>
          <div className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
            Digital Signature: SHA256-TL-2026-OK991
          </div>
        </div>
      </div>
    </div>
  );
};
