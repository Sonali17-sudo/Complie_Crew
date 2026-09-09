import React from 'react';
import { useLending } from '../../context/LendingContext';
import { RiskBadge } from '../common/RiskBadge';
import { formatINR } from '../../utils/formatters';
import { CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Borrower } from '../../types';

interface RecentBorrowersTableProps {
  onSelectBorrower?: (borrower: Borrower) => void;
  limit?: number;
}

export const RecentBorrowersTable: React.FC<RecentBorrowersTableProps> = ({
  limit = 6,
}) => {
  const {
    borrowers,
    selectedBorrower,
    setSelectedBorrower,
    setActivePage,
    searchQuery,
  } = useLending();

  const filtered = borrowers.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.occupation.toLowerCase().includes(q) ||
      b.location.toLowerCase().includes(q) ||
      b.riskLevel.toLowerCase().includes(q)
    );
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  const handleRowClick = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
    setActivePage('result');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Recent Lending Evaluations</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any applicant profile to inspect transparent evidence, factors, and audit trails
          </p>
        </div>
        <button
          onClick={() => setActivePage('borrowers')}
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-1 hover:underline"
        >
          View Full Directory ({borrowers.length})
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4">Borrower</th>
              <th className="py-3 px-4">Trust Score</th>
              <th className="py-3 px-4">Risk Level</th>
              <th className="py-3 px-4">Requested</th>
              <th className="py-3 px-4">AI Recommended</th>
              <th className="py-3 px-4">Verification</th>
              <th className="py-3 px-4">Decision</th>
              <th className="py-3 px-4 text-right">Audit Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {displayed.map((borrower) => {
              const isSelected = selectedBorrower.id === borrower.id;
              return (
                <tr
                  key={borrower.id}
                  onClick={() => handleRowClick(borrower)}
                  className={`cursor-pointer transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/60 ${
                    isSelected ? 'bg-brand-50/40 dark:bg-brand-950/40' : ''
                  }`}
                >
                  {/* Borrower Details */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={borrower.avatar}
                        alt={borrower.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100 leading-snug">
                          {borrower.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {borrower.occupation} • {borrower.location.split(',')[0]}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Trust Score */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-extrabold font-mono text-sm text-slate-900 dark:text-slate-100">
                        {borrower.trustScore}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">/100</span>
                    </div>
                  </td>

                  {/* Risk Level */}
                  <td className="py-3.5 px-4">
                    <RiskBadge level={borrower.riskLevel} size="sm" />
                  </td>

                  {/* Requested Amount */}
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                    {formatINR(borrower.requestedLoan)}
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-sans">
                      {borrower.preferredTenure} mos
                    </span>
                  </td>

                  {/* AI Recommended Amount */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-brand-700 dark:text-brand-400">
                      {formatINR(borrower.recommendedLoan)}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">
                      {borrower.recommendedTenure} mos tenure
                    </span>
                  </td>

                  {/* Verification Status */}
                  <td className="py-3.5 px-4">
                    {borrower.verificationStatus === 'verified' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        <AlertCircle className="w-3 h-3" />
                        Flagged
                      </span>
                    )}
                  </td>

                  {/* Application Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block text-[11px] px-2 py-0.5 rounded-md font-medium ${
                        borrower.status === 'Accepted'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                          : borrower.status === 'Declined'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {borrower.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(borrower);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <span>Explain</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
