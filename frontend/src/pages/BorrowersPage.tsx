import React, { useState } from 'react';
import { useLending } from '../context/LendingContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { formatINR } from '../utils/formatters';
import { Borrower, RiskLevel } from '../types';
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const BorrowersPage: React.FC = () => {
  const {
    borrowers,
    selectedBorrower,
    setSelectedBorrower,
    setActivePage,
    searchQuery,
    setSearchQuery,
    addToast,
  } = useLending();

  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [filterVerification, setFilterVerification] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'trustScore' | 'requestedLoan' | 'name'>('trustScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  // Filter & Search
  const filtered = borrowers.filter((b) => {
    if (filterRisk !== 'ALL' && b.riskLevel !== filterRisk) return false;
    if (filterVerification !== 'ALL' && b.verificationStatus !== filterVerification) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.occupation.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let diff = 0;
    if (sortBy === 'trustScore') diff = a.trustScore - b.trustScore;
    else if (sortBy === 'requestedLoan') diff = a.requestedLoan - b.requestedLoan;
    else if (sortBy === 'name') diff = a.name.localeCompare(b.name);
    return sortOrder === 'desc' ? -diff : diff;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSelect = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
    setActivePage('result');
    addToast('Profile Selected', `Viewing ${borrower.name}'s underwriting file.`, 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                <Users className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Borrower Directory & Registry
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Complete repository of {borrowers.length} active and audited lending applicants
            </p>
          </div>

          <button
            onClick={() => setActivePage('analyze')}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-brand-600/25 transition-all self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Borrower</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-colors">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, occupation, location..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Risk Filter */}
          <select
            value={filterRisk}
            onChange={(e) => {
              setFilterRisk(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-medium text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
          >
            <option value="ALL">All Risk Tiers</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>

          {/* Verification Filter */}
          <select
            value={filterVerification}
            onChange={(e) => {
              setFilterVerification(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-medium text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
          >
            <option value="ALL">All Verification</option>
            <option value="verified">Verified</option>
            <option value="flagged">Flagged</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-medium text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
          >
            <option value="trustScore">Sort: Trust Score</option>
            <option value="requestedLoan">Sort: Loan Amount</option>
            <option value="name">Sort: Name</option>
          </select>

          {/* Asc/Desc */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle sort direction"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-5">Borrower</th>
                <th className="py-3 px-5">Trust Score</th>
                <th className="py-3 px-5">Risk Level</th>
                <th className="py-3 px-5">Requested Loan</th>
                <th className="py-3 px-5">Recommended Loan</th>
                <th className="py-3 px-5">Verification</th>
                <th className="py-3 px-5">Last Analysis</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {paginated.map((borrower) => {
                const isSelected = selectedBorrower.id === borrower.id;
                return (
                  <tr
                    key={borrower.id}
                    onClick={() => handleSelect(borrower)}
                    className={`cursor-pointer transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/60 ${
                      isSelected ? 'bg-brand-50/40 dark:bg-brand-950/40' : ''
                    }`}
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={borrower.avatar}
                          alt={borrower.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{borrower.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {borrower.occupation} • {borrower.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-extrabold font-mono text-sm text-slate-900 dark:text-slate-100">
                        {borrower.trustScore}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">/100</span>
                    </td>

                    <td className="py-4 px-5">
                      <RiskBadge level={borrower.riskLevel} size="sm" />
                    </td>

                    <td className="py-4 px-5 font-mono text-slate-800 dark:text-slate-200 font-medium">
                      {formatINR(borrower.requestedLoan)}
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-sans">
                        {borrower.preferredTenure} mos
                      </span>
                    </td>

                    <td className="py-4 px-5 font-mono text-brand-700 dark:text-brand-400 font-bold">
                      {formatINR(borrower.recommendedLoan)}
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">
                        {borrower.recommendedTenure} mos tenure
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      {borrower.verificationStatus === 'verified' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          <AlertCircle className="w-3 h-3" />
                          Flagged
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {borrower.lastAnalysisDate}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(borrower);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 border border-brand-200 dark:border-brand-800 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <span>View Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                    No borrowers match the specified filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 transition-colors">
          <span>
            Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong>{Math.min(currentPage * pageSize, sorted.length)}</strong> of{' '}
            <strong>{sorted.length}</strong> borrowers
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
