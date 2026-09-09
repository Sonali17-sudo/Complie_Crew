import React from 'react';
import { useLending } from '../context/LendingContext';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Fingerprint,
  TrendingUp,
  Eye,
  Activity,
  SlidersHorizontal,
  FileCheck2,
  Lock,
  ChevronRight,
  Award,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { RiskBadge } from '../components/common/RiskBadge';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const LandingPage: React.FC = () => {
  const { setActivePage, setSelectedBorrower, borrowers } = useLending();

  const handleLaunchDemo = () => {
    setActivePage('dashboard');
  };

  const handleAnalyze = () => {
    setActivePage('analyze');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-100 selection:text-brand-900 transition-colors">
      {/* Top Public Header */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
                  TrustLend
                </span>
                <span className="bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide border border-brand-200 dark:border-brand-800">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Explainable AI for Safer Informal Lending
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#preview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Platform Preview
            </a>
            <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Intelligence Features
            </a>
            <a href="#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="button" />
            <button
              onClick={handleLaunchDemo}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-600/25 transition-all hover:scale-102 active:scale-98"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-8 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-brand-700 dark:text-brand-400 font-bold">Explainable AI</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span>Empowering Individuals, Families & Communities</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Make Smarter Lending Decisions with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 dark:from-brand-400 dark:via-blue-400 dark:to-indigo-400">
              Explainable AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Evaluate borrower credibility, understand risk, detect suspicious patterns and receive personalized lending recommendations — backed by transparent evidence.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleAnalyze}
              className="px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 hover:scale-102 active:scale-98 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Borrower</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleLaunchDemo}
              className="px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 font-bold text-sm flex items-center gap-2 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-all"
            >
              <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>View Demo</span>
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> No Black-Box Models
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Verifiable SHAP Evidence
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Human Lender Decision Control
            </span>
          </div>
        </div>

        {/* VISUAL AI LENDING DASHBOARD PREVIEW */}
        <div id="preview" className="max-w-6xl mx-auto mt-12 relative">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/90 dark:border-slate-800 p-4 sm:p-8 shadow-2xl relative overflow-hidden transition-colors">
            {/* Mock Top bar of the dashboard preview */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-3 text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
                  TrustLend AI Console • Live Underwriting Preview
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sandbox
                </span>
              </div>
            </div>

            {/* Dashboard Teaser Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Rahul Sharma Evaluation Preview */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Rahul Sharma"
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Rahul Sharma</h3>
                        <RiskBadge level="MEDIUM" size="sm" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Software Engineer • 3+ Years • Bengaluru</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg font-semibold border border-slate-200 dark:border-slate-700">
                    Confidence: 87%
                  </span>
                </div>

                {/* Evidence attribution pills */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 font-medium">✓ Stable salary credit (36+ continuous months)</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">+12 Pts</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 font-medium">✓ 3 successfully repaid peer loans (0 defaults)</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">+15 Pts</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 font-medium">⚠ Requested ₹1,00,000 creates high leverage on existing EMI</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/50">-10 Pts</span>
                  </div>
                </div>

                {/* Recommendation highlight */}
                <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-brand-900 dark:text-brand-100">AI Recommendation:</span>
                    <span className="font-mono font-extrabold text-brand-700 dark:text-brand-400 text-sm">₹75,000 for 8 Months</span>
                  </div>
                  <p className="text-brand-800 dark:text-brand-200 text-[11px] leading-relaxed">
                    "A reduced loan amount of ₹75,000 balances debt burden while honoring borrower's reliable cash flows."
                  </p>
                </div>
              </div>

              {/* Right Column: Score Gauge Preview */}
              <div className="lg:col-span-5 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 text-center flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1">
                  Overall Calculated Trust Score
                </span>
                <div className="text-5xl font-black text-amber-600 dark:text-amber-400 font-mono my-2">
                  86<span className="text-xl font-medium text-slate-400 dark:text-slate-500">/100</span>
                </div>
                <div className="mb-4">
                  <RiskBadge level="MEDIUM" size="md" />
                </div>

                <div className="w-full space-y-2 text-left text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      <span>Identity Authenticity</span>
                      <span className="text-slate-800 dark:text-slate-200">98%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      <span>Repayment Reliability</span>
                      <span className="text-slate-800 dark:text-slate-200">95%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[95%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-semibold mb-1">
                      <span>Debt Burden Health</span>
                      <span className="text-slate-800 dark:text-slate-200">72%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[72%]" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedBorrower(borrowers[0]);
                    setActivePage('result');
                  }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <span>Inspect Full Evaluation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section id="features" className="py-16 px-4 sm:px-8 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Six Pillars of Lending Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Moving beyond traditional black-box scores to multi-dimensional, verifiable decision support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Fingerprint,
                title: 'Identity Verification',
                desc: 'Digital e-KYC and biometric token parsing for Aadhaar and PAN documents, preventing identity spoofing in peer circles.',
                badge: '15% Model Weight',
              },
              {
                icon: TrendingUp,
                title: 'Financial Risk Analysis',
                desc: 'Automated OCR cash flow parsing measuring monthly disposable liquidity, recurring EMI obligations, and debt-to-income ratios.',
                badge: '20% Model Weight',
              },
              {
                icon: Eye,
                title: 'Fraud Intelligence',
                desc: 'Continuous anomaly scans cross-checking declared earnings against banking inflows, detecting duplicate borrowers and loan stacking.',
                badge: 'Forensics Engine',
              },
              {
                icon: Activity,
                title: 'Trust Scoring',
                desc: 'Transparent multi-factor aggregation combining repayment reliability (25%), income stability (20%), and community endorsements.',
                badge: 'Transparent Weights',
              },
              {
                icon: Sparkles,
                title: 'Explainable AI',
                desc: 'SHAP-style exact point impact breakdown (+12, -10) showing lenders exactly why a borrower receives their rating with verifiable audit trails.',
                badge: 'Auditable Logic',
              },
              {
                icon: SlidersHorizontal,
                title: 'Personalized Loan Terms',
                desc: 'Interactive What-If Loan Simulator empowering lenders to test different principal amounts and tenures to find the optimal safety balance.',
                badge: 'Scenario Modeling',
              },
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-semibold">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300">
                    <span>Explore module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW TRUSTLEND AI WORKS SECTION */}
      <section id="how-it-works" className="py-16 px-4 sm:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How TrustLend AI Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              From raw borrower inputs to transparent, evidence-backed lending terms
            </p>
          </div>

          {/* Workflow Steps: Borrower Data → Verification → Risk Analysis → AI Intelligence → Recommendation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Borrower Data',
                desc: 'Demographic, employment longevity, and requested loan parameters submitted.',
              },
              {
                step: '02',
                title: 'Verification',
                desc: 'Digital ID tokens and 6-month banking cash flows validated via OCR engine.',
              },
              {
                step: '03',
                title: 'Risk Analysis',
                desc: 'Debt burden, surplus margins, and peer repayment reliability calculated.',
              },
              {
                step: '04',
                title: 'AI Intelligence',
                desc: 'Multi-factor transparent weighting synthesizes Trust Score and fraud alerts.',
              },
              {
                step: '05',
                title: 'Recommendation',
                desc: 'Personalized safe principal and tenure recommended for human lender approval.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs relative flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-black font-mono text-brand-600 dark:text-brand-400">
                      {step.step}
                    </span>
                    {idx < 4 && (
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden lg:block" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                  Stage {idx + 1} of 5
                </div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Ready to Experience Explainable Lending Intelligence?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Explore the interactive dashboard, test the What-If Loan Simulator, or run an analysis on mock borrower profiles.
              </p>
            </div>

            <button
              onClick={handleLaunchDemo}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-brand-600/30 hover:scale-102 active:scale-98 transition-all whitespace-nowrap"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Disclaimer: TrustLend AI provides decision-support insights. Final lending decisions remain with the lender.
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Engineered for national hackathon demonstration using transparent scoring weights and realistic simulated datasets.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              TL
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">TrustLend AI</span>
            <span>— Explainable AI for Safer Informal Lending</span>
          </div>

          <div>
            <span>© 2026 TrustLend AI • Built with React, Vite, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
