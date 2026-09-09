import React, { useState } from 'react';
import { useLending } from '../../context/LendingContext';
import { useTheme } from '../../context/ThemeContext';
import { StatCard } from '../common/StatCard';
import { RiskBadge } from '../common/RiskBadge';
import { formatINR } from '../../utils/formatters';
import { Borrower } from '../../types';
import {
  ShieldAlert,
  AlertOctagon,
  Eye,
  FileCheck2,
  Filter,
  ArrowUpRight,
  Search,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const RiskIntelligenceView: React.FC = () => {
  const { borrowers, setSelectedBorrower, setActivePage, addToast } = useLending();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Filter state
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [filterVerification, setFilterVerification] = useState<string>('ALL');
  const [filterMinAmount, setFilterMinAmount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const highRiskCount = borrowers.filter((b) => b.riskLevel === 'HIGH').length;
  const suspiciousCount = borrowers.filter((b) => b.fraudRisk !== 'LOW').length;
  const verificationIssues = borrowers.filter(
    (b) => b.verificationStatus === 'flagged' || !b.incomeProofVerified
  ).length;

  // Filtered dataset
  const filteredBorrowers = borrowers.filter((b) => {
    if (filterRisk !== 'ALL' && b.riskLevel !== filterRisk) return false;
    if (filterVerification !== 'ALL' && b.verificationStatus !== filterVerification) return false;
    if (b.requestedLoan < filterMinAmount) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.occupation.toLowerCase().includes(q) ||
        (b.warningSignals[0] && b.warningSignals[0].toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Chart data: average risk score by occupation category
  const riskByCategoryData = [
    { category: 'Salaried IT', avgTrust: 88, count: 2, fill: '#10b981' },
    { category: 'Architecture', avgTrust: 94, count: 1, fill: '#10b981' },
    { category: 'Education', avgTrust: 88, count: 1, fill: '#10b981' },
    { category: 'Retail Business', avgTrust: 89, count: 1, fill: '#10b981' },
    { category: 'Restaurant', avgTrust: 68, count: 1, fill: '#f59e0b' },
    { category: 'Automotive Wholesaler', avgTrust: 58, count: 1, fill: '#ef4444' },
    { category: 'Gig Delivery', avgTrust: 54, count: 1, fill: '#ef4444' },
  ];

  const handleInspect = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
    setActivePage('result');
    addToast('Profile Loaded', `Inspecting risk indicators for ${borrower.name}`, 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                AI Risk Intelligence & Anomaly Surveillance
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Macro portfolio risk monitoring, concentration hazards, and borrower delinquency early-warning triggers
            </p>
          </div>

          <button
            onClick={() => setActivePage('fraud-intelligence')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Eye className="w-4 h-4 text-brand-400" />
            <span>Fraud Intelligence Engine</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Portfolio Risk"
          value="LOW-MODERATE"
          subtitle="Mean Trust Score: 78.5 / 100"
          icon={Layers}
          iconColor="text-brand-600 dark:text-brand-400"
          iconBg="bg-brand-50 dark:bg-brand-950/60"
          badgeText="Healthy"
          badgeType="positive"
        />

        <StatCard
          title="High Risk Borrowers"
          value={highRiskCount}
          subtitle="Trust Score <65 (Strict Collateral)"
          icon={AlertOctagon}
          iconColor="text-rose-600 dark:text-rose-400"
          iconBg="bg-rose-50 dark:bg-rose-950/60"
          badgeText="Requires Review"
          badgeType="negative"
        />

        <StatCard
          title="Suspicious Profiles"
          value={suspiciousCount}
          subtitle="Cash flow & volume anomalies"
          icon={Eye}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          badgeText="Surveillance"
          badgeType="warning"
        />

        <StatCard
          title="Verification Flags"
          value={verificationIssues}
          subtitle="Missing formal ITR / pay slip"
          icon={FileCheck2}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          badgeText="Document Audit"
          badgeType="neutral"
        />
      </div>

      {/* Middle Chart: Risk by Sector & Loan Concentration */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Sectoral Credibility & Trust Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mean Trust Score mapped across occupational groups in active lending pipeline
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
            Benchmark: 65 pts threshold
          </span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={riskByCategoryData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={isDark ? '#1e293b' : '#f1f5f9'}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
              />
              <YAxis
                domain={[40, 100]}
                tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderRadius: '12px',
                  border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  fontSize: '12px',
                  color: isDark ? '#f8fafc' : '#0f172a',
                }}
                itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                formatter={(val) => [`${val} pts`, 'Avg Trust Score']}
              />
              <Bar dataKey="avgTrust" radius={[6, 6, 0, 0]}>
                {riskByCategoryData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filterable Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        {/* Table Filters Bar */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Filter Risk Intelligence:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search risk factor or name..."
                className="text-xs pl-8 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Risk filter */}
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="LOW">Low Risk Only</option>
              <option value="MEDIUM">Medium Risk Only</option>
              <option value="HIGH">High Risk Only</option>
            </select>

            {/* Verification filter */}
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value)}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Verification</option>
              <option value="verified">Verified Only</option>
              <option value="flagged">Flagged Only</option>
            </select>

            {/* Min Amount */}
            <select
              value={filterMinAmount}
              onChange={(e) => setFilterMinAmount(Number(e.target.value))}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value={0}>Any Loan Size</option>
              <option value={50000}>&gt; ₹50,000</option>
              <option value={100000}>&gt; ₹1,00,000</option>
              <option value={150000}>&gt; ₹1,50,000</option>
            </select>

            {(filterRisk !== 'ALL' || filterVerification !== 'ALL' || filterMinAmount > 0 || searchTerm) && (
              <button
                onClick={() => {
                  setFilterRisk('ALL');
                  setFilterVerification('ALL');
                  setFilterMinAmount(0);
                  setSearchTerm('');
                }}
                className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/75 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-5">Borrower</th>
                <th className="py-3 px-5">Trust Score</th>
                <th className="py-3 px-5">Risk Level</th>
                <th className="py-3 px-5">Requested vs Recommended</th>
                <th className="py-3 px-5">Primary Risk / Credibility Factor</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredBorrowers.map((borrower) => {
                const primaryFactor =
                  borrower.warningSignals[0] ||
                  borrower.positiveSignals[0] ||
                  'Balanced baseline financial profile';

                return (
                  <tr
                    key={borrower.id}
                    onClick={() => handleInspect(borrower)}
                    className="cursor-pointer transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/60"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={borrower.avatar}
                          alt={borrower.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{borrower.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {borrower.occupation}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <span className="font-extrabold font-mono text-sm text-slate-900 dark:text-slate-100">
                        {borrower.trustScore}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">/100</span>
                    </td>

                    <td className="py-3.5 px-5">
                      <RiskBadge level={borrower.riskLevel} size="sm" />
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="font-mono text-slate-800 dark:text-slate-200">
                        <span className="font-bold text-brand-700 dark:text-brand-400">
                          {formatINR(borrower.recommendedLoan)}
                        </span>{' '}
                        <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                          (of {formatINR(borrower.requestedLoan)})
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 max-w-xs">
                      <p className="truncate text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                        {primaryFactor}
                      </p>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspect(borrower);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <span>Audit Factors</span>
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
    </div>
  );
};
