import React from 'react';
import { useLending } from '../context/LendingContext';
import { OverviewStats } from '../components/dashboard/OverviewStats';
import { RiskDistributionChart } from '../components/dashboard/RiskDistributionChart';
import { TrustScoreTrendChart } from '../components/dashboard/TrustScoreTrendChart';
import { RecentBorrowersTable } from '../components/dashboard/RecentBorrowersTable';
import {
  Sparkles,
  SlidersHorizontal,
  UserPlus,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { setActivePage } = useLending();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200/50 dark:border-brand-800/50 px-2.5 py-0.5 rounded-full">
                Underwriting Console
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">09 Sep 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Good morning, Dr. Mehta
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Here's your lending intelligence overview and active borrower risk portfolio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActivePage('analyze')}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-brand-600/25 transition-all hover:scale-102 active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>Analyze New Borrower</span>
            </button>

            <button
              onClick={() => setActivePage('simulator')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Loan Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATS CARDS (Total Borrowers, Low, Medium, High, Recommended Lending) */}
      <OverviewStats />

      {/* CHARTS: Risk Distribution + Trust Score Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <RiskDistributionChart />
        </div>
        <div className="lg:col-span-7">
          <TrustScoreTrendChart />
        </div>
      </div>

      {/* RECENT BORROWER TABLE */}
      <RecentBorrowersTable limit={6} />
    </div>
  );
};
