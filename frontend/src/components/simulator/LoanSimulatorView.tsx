import React, { useState, useMemo, useEffect } from 'react';
import { useLending } from '../../context/LendingContext';
import { useTheme } from '../../context/ThemeContext';
import { simulateLoanScenario } from '../../utils/riskEngine';
import { simulateLoanWithBackend } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { TrustScoreGauge } from '../common/TrustScoreGauge';
import { LoanSimulation } from '../../types';
import {
  SlidersHorizontal,
  Info,
  Calendar,
  IndianRupee,
  Activity,
  Check,
  TrendingDown,
  TrendingUp,
  Loader2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export const LoanSimulatorView: React.FC = () => {
  const {
    borrowers,
    selectedBorrower,
    setSelectedBorrower,
    updateBorrowerStatus,
    addToast,
    setActivePage,
  } = useLending();

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Slider state initialized with selected borrower's values
  const [loanAmount, setLoanAmount] = useState<number>(
    selectedBorrower.recommendedLoan || 75000
  );
  const [tenureMonths, setTenureMonths] = useState<number>(
    selectedBorrower.recommendedTenure || 8
  );

  // Synchronize when borrower changes
  const handleBorrowerChange = (id: string) => {
    const b = borrowers.find((item) => item.id === id);
    if (b) {
      setSelectedBorrower(b);
      setLoanAmount(b.recommendedLoan || b.requestedLoan);
      setTenureMonths(b.recommendedTenure || b.preferredTenure);
    }
  };

  // Instant local calculation for 60fps slider drag
  const localSimulation = useMemo(() => {
    return simulateLoanScenario(selectedBorrower, loanAmount, tenureMonths);
  }, [selectedBorrower, loanAmount, tenureMonths]);

  // Real-time backend API synchronization state
  const [backendSimulation, setBackendSimulation] = useState<LoanSimulation | null>(null);
  const [isSyncingBackend, setIsSyncingBackend] = useState<boolean>(false);

  useEffect(() => {
    let isCurrent = true;
    setIsSyncingBackend(true);
    const debounceTimer = setTimeout(async () => {
      try {
        const result = await simulateLoanWithBackend(selectedBorrower, loanAmount, tenureMonths);
        if (isCurrent) {
          setBackendSimulation(result);
          setIsSyncingBackend(false);
        }
      } catch {
        if (isCurrent) setIsSyncingBackend(false);
      }
    }, 200);

    return () => {
      isCurrent = false;
      clearTimeout(debounceTimer);
    };
  }, [selectedBorrower, loanAmount, tenureMonths]);

  // Active simulation incorporates backend prediction with local fallback
  const simulation = backendSimulation || localSimulation;

  // Generate dynamic curve data: Risk Score & Trust Score across loan amounts (₹10k to ₹200k)
  const curveData = useMemo(() => {
    const points = [10000, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000];
    return points.map((amt) => {
      const sim = simulateLoanScenario(selectedBorrower, amt, tenureMonths);
      return {
        amount: amt,
        label: `₹${amt / 1000}k`,
        trustScore: sim.simulatedTrustScore,
        debtBurden: sim.debtToIncomeRatio,
        emi: sim.monthlyEmi,
      };
    });
  }, [selectedBorrower, tenureMonths]);

  const handleApplySimulatedTerms = () => {
    selectedBorrower.recommendedLoan = loanAmount;
    selectedBorrower.recommendedTenure = tenureMonths;
    selectedBorrower.trustScore = simulation.simulatedTrustScore;
    selectedBorrower.riskLevel = simulation.simulatedRiskLevel;
    updateBorrowerStatus(selectedBorrower.id, 'Terms Adjusted');
    addToast(
      'Simulated Terms Applied',
      `Updated ${selectedBorrower.name}: ${formatINR(loanAmount)} for ${tenureMonths} months.`,
      'success'
    );
    setActivePage('result');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                What-If Loan Scenario Simulator
              </h1>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                {isSyncingBackend ? (
                  <Loader2 className="w-3 h-3 animate-spin text-brand-600 dark:text-brand-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
                <span>{isSyncingBackend ? 'FastAPI Syncing...' : 'FastAPI ML Sync'}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Dynamically model loan amounts and tenures to observe real-time risk shifts, EMI obligations, and debt burden
            </p>
          </div>

          {/* Active Borrower Selector */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 pl-2">Subject:</span>
            <select
              value={selectedBorrower.id}
              onChange={(e) => handleBorrowerChange(e.target.value)}
              className="text-xs font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {borrowers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.riskLevel} Risk • {formatINR(b.monthlyIncome)}/mo)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Sliders on Left, Real-Time Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-7 transition-colors">
            {/* Control 1: Loan Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    Loan Amount
                  </label>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Adjust principal from ₹10,000 to ₹2,00,000
                  </p>
                </div>
                <span className="text-2xl font-extrabold font-mono text-brand-700 dark:text-brand-400">
                  {formatINR(loanAmount)}
                </span>
              </div>

              <input
                type="range"
                min={10000}
                max={200000}
                step={5000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-brand-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1.5">
                <span>₹10,000</span>
                <span>₹50,000</span>
                <span>₹1,00,000</span>
                <span>₹1,50,000</span>
                <span>₹2,00,000</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 self-center">Presets:</span>
                {[
                  { label: '₹50,000 (Low)', amt: 50000 },
                  { label: '₹75,000 (Safe)', amt: 75000 },
                  { label: '₹1,00,000 (Original)', amt: 100000 },
                  { label: '₹1,50,000 (Strained)', amt: 150000 },
                ].map((p) => (
                  <button
                    key={p.amt}
                    type="button"
                    onClick={() => setLoanAmount(p.amt)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      loanAmount === p.amt
                        ? 'bg-brand-50 dark:bg-brand-950/70 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300 font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    Repayment Tenure
                  </label>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Adjust installment term from 3 to 24 months
                  </p>
                </div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  {tenureMonths} <span className="text-sm font-sans font-normal text-slate-500 dark:text-slate-400">Months</span>
                </span>
              </div>

              <input
                type="range"
                min={3}
                max={24}
                step={1}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-brand-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1.5">
                <span>3 Months</span>
                <span>6 Months</span>
                <span>12 Months</span>
                <span>18 Months</span>
                <span>24 Months</span>
              </div>

              {/* Quick Tenure Presets */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 self-center">Presets:</span>
                {[3, 6, 8, 12, 18].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenureMonths(t)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      tenureMonths === t
                        ? 'bg-brand-50 dark:bg-brand-950/70 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300 font-bold shadow-xs'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t} Months
                  </button>
                ))}
              </div>
            </div>

            {/* AI Dynamic Dynamic Explanation Note */}
            <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 rounded-2xl p-4 sm:p-5 shadow-inner border border-transparent dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5 text-brand-300 dark:text-brand-400">
                <Info className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Real-Time Risk Attribution
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {simulation.explanation}
              </p>
            </div>
          </div>

          {/* VISUAL CHART: Risk & Debt Burden Curve vs Loan Amount */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Risk & Debt Burden Sensitivity Curve
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Trust Score vs. Total Debt Obligation (DTI %) across loan brackets
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-600 dark:bg-brand-500" /> Trust Score
                </span>
                <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> DTI %
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={curveData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="simTrust" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="simDti" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDark ? '#1e293b' : '#f1f5f9'}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
                  />
                  <YAxis
                    domain={[20, 100]}
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
                    formatter={(val, name) => [
                      name === 'trustScore' ? `${val} / 100` : `${val}%`,
                      name === 'trustScore' ? 'Trust Score' : 'Debt Burden (DTI)',
                    ]}
                  />
                  <ReferenceLine
                    x={`₹${Math.round(loanAmount / 1000)}k`}
                    stroke={isDark ? '#60a5fa' : '#2563eb'}
                    strokeDasharray="3 3"
                    label={{ value: 'Current Slider', fill: isDark ? '#60a5fa' : '#2563eb', fontSize: 10, position: 'top' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="trustScore"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#simTrust)"
                  />
                  <Area
                    type="monotone"
                    dataKey="debtBurden"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#simDti)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Simulated Result (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-xs flex flex-col justify-between transition-colors">
            <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Simulated AI Decision Outcome
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {selectedBorrower.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Declared Income: <strong className="text-slate-800 dark:text-slate-200">{formatINR(selectedBorrower.monthlyIncome)}/mo</strong>
              </p>
            </div>

            {/* Circular Gauge */}
            <div className="my-5 flex justify-center">
              <TrustScoreGauge
                score={simulation.simulatedTrustScore}
                riskLevel={simulation.simulatedRiskLevel}
                confidence={simulation.confidence}
                size={190}
              />
            </div>

            {/* Dynamic Metric Cards */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* Monthly EMI */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Simulated Monthly EMI
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Benchmark 14% p.a.
                    </span>
                  </div>
                </div>
                <span className="text-base font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  {formatINR(simulation.monthlyEmi)}/mo
                </span>
              </div>

              {/* Debt Burden */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    simulation.debtToIncomeRatio > 50
                      ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                      : simulation.debtToIncomeRatio > 35
                      ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                      : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Total Debt Burden (DTI)
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Existing EMI + New EMI
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-base font-extrabold font-mono ${
                    simulation.debtToIncomeRatio > 50
                      ? 'text-rose-600 dark:text-rose-400'
                      : simulation.debtToIncomeRatio > 35
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {simulation.debtToIncomeRatio}%
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">
                    {simulation.debtToIncomeRatio > 50
                      ? 'Critical Strain'
                      : simulation.debtToIncomeRatio > 35
                      ? 'Moderate'
                      : 'Comfortable'}
                  </span>
                </div>
              </div>

              {/* Shift vs Original */}
              <div className="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 text-xs">
                <div className="flex items-center justify-between font-semibold text-brand-900 dark:text-brand-300 mb-1">
                  <span>Score Shift from Base:</span>
                  <span className="font-mono font-bold flex items-center gap-0.5">
                    {simulation.simulatedTrustScore >= selectedBorrower.trustScore ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        +{simulation.simulatedTrustScore - selectedBorrower.trustScore} pts
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        {simulation.simulatedTrustScore - selectedBorrower.trustScore} pts
                      </>
                    )}
                  </span>
                </div>
                <p className="text-[11px] text-brand-700 dark:text-brand-400">
                  Original: {formatINR(selectedBorrower.requestedLoan)} • Trust Score: {selectedBorrower.trustScore}
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={handleApplySimulatedTerms}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all hover:scale-101 active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Apply Terms to Recommendation</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500">
                Updates decision memo and notifies lender review console
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
