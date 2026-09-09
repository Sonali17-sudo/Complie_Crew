import React, { useState } from 'react';
import { useLending } from '../../context/LendingContext';
import { useTheme, Theme } from '../../context/ThemeContext';
import {
  Settings,
  User,
  Bell,
  Sliders,
  Shield,
  LogOut,
  Save,
  CheckCircle2,
  Lock,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { addToast, setActivePage } = useLending();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [riskTolerance, setRiskTolerance] = useState<'conservative' | 'balanced' | 'growth'>('balanced');
  const [minTrustScore, setMinTrustScore] = useState<number>(65);
  const [maxDtiThreshold, setMaxDtiThreshold] = useState<number>(45);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [anomalySmsAlerts, setAnomalySmsAlerts] = useState<boolean>(true);

  const handleSave = () => {
    addToast(
      'Settings Updated',
      'AI risk thresholds, appearance, and notification preferences successfully saved.',
      'success'
    );
  };

  const handleLogout = () => {
    addToast('Logged Out', 'Demo session ended. Returning to Landing Page.', 'info');
    setActivePage('landing');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            <Settings className="w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Platform Settings & AI Risk Configuration
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Configure underwriting risk thresholds, decision support preferences, interface theme, and notification pipelines
        </p>
      </div>

      {/* Section 0: Appearance & Theme Preference */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Sun className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Appearance & Theme Mode</h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select Color Scheme (Current active: <span className="text-brand-600 dark:text-brand-400 font-bold capitalize">{resolvedTheme}</span>)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'light' as Theme,
                title: 'Light Mode',
                desc: 'Clean fintech white & light-gray surfaces with crisp dark text',
                icon: Sun,
              },
              {
                id: 'dark' as Theme,
                title: 'Dark Mode',
                desc: 'Deep slate surfaces with high-contrast glowing indicators and reduced glare',
                icon: Moon,
              },
              {
                id: 'system' as Theme,
                title: 'System Default',
                desc: 'Automatically adapts to your operating system appearance preferences',
                icon: Monitor,
              },
            ].map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{opt.title}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 1: Auditor Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <User className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">1. Underwriter Profile</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Evaluator Name</label>
            <input
              type="text"
              readOnly
              value="Dr. Arvind Mehta"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Role / Authorization Level</label>
            <input
              type="text"
              readOnly
              value="Senior Credit Officer • Community Desk"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Institutional Email</label>
            <input
              type="email"
              readOnly
              value="arvind.mehta@trustlend.ai"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Environment</label>
            <input
              type="text"
              readOnly
              value="National Hackathon Demo (Sandbox Active)"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-medium cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Section 2: AI Risk Preferences & Thresholds */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Sliders className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            2. AI Risk Policy & Decision Support Thresholds
          </h3>
        </div>

        {/* Risk Appetite Buttons */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Lending Risk Appetite Strategy
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'conservative',
                title: 'Conservative',
                desc: 'Strict DTI (<35%), favors verified collateral and salaried income',
              },
              {
                id: 'balanced',
                title: 'Balanced (Recommended)',
                desc: 'Standard informal community baseline with 70-80% loan capping',
              },
              {
                id: 'growth',
                title: 'Financial Inclusion',
                desc: 'Expands micro-credit to thin-file and gig economy workers with short tenures',
              },
            ].map((strategy) => (
              <button
                key={strategy.id}
                type="button"
                onClick={() => setRiskTolerance(strategy.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  riskTolerance === strategy.id
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{strategy.title}</span>
                  {riskTolerance === strategy.id && (
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {strategy.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Minimum Trust Score for Fast-Track</span>
              <span className="font-mono font-bold text-brand-700 dark:text-brand-400">{minTrustScore} / 100</span>
            </div>
            <input
              type="range"
              min={50}
              max={85}
              value={minTrustScore}
              onChange={(e) => setMinTrustScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-brand-600 dark:accent-brand-500"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              Applicants with scores below {minTrustScore} require secondary manual verification.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Maximum Allowable Debt-to-Income (DTI)</span>
              <span className="font-mono font-bold text-brand-700 dark:text-brand-400">{maxDtiThreshold}%</span>
            </div>
            <input
              type="range"
              min={30}
              max={65}
              value={maxDtiThreshold}
              onChange={(e) => setMaxDtiThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-brand-600 dark:accent-brand-500"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              Loans pushing combined debt obligations beyond {maxDtiThreshold}% generate high-risk alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Notifications & Alert Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Bell className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">3. Anomaly & Audit Notifications</h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Instant Fraud Variance Alerts
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Notify when OCR bank statement deposits deviate &gt;15% from declared income
              </span>
            </div>
            <input
              type="checkbox"
              checked={anomalySmsAlerts}
              onChange={(e) => setAnomalySmsAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 dark:bg-slate-800 dark:border-slate-700"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Weekly Portfolio Health Digest
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Summary of total recommended capital, active risk distributions, and closed loans
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 dark:bg-slate-800 dark:border-slate-700"
            />
          </label>
        </div>
      </div>

      {/* Section 4: Security & Logout */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Cryptographic Session Active</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Audit logging enabled with immutable SHA-256 action ledger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
