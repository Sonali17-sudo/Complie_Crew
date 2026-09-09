import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Database, CheckCircle2, Sparkles } from 'lucide-react';

interface AIAnalysisLoaderProps {
  onComplete: () => void;
  borrowerName: string;
}

export const AIAnalysisLoader: React.FC<AIAnalysisLoaderProps> = ({
  onComplete,
  borrowerName,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Analyzing borrower profile...',
      description: 'Parsing digital identity records, employment longevity, and demographic variables',
      icon: Cpu,
    },
    {
      title: 'Checking financial indicators...',
      description: 'Evaluating monthly cash flows, existing debt obligations, and disposable margins',
      icon: Database,
    },
    {
      title: 'Evaluating repayment behavior...',
      description: 'Cross-referencing informal community ledgers, defaults, and timeliness patterns',
      icon: ShieldCheck,
    },
    {
      title: 'Generating explainable recommendation...',
      description: 'Synthesizing transparent SHAP multi-factor attribution and safe loan terms',
      icon: Sparkles,
    },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 750);
    const timer2 = setTimeout(() => setCurrentStep(2), 1600);
    const timer3 = setTimeout(() => setCurrentStep(3), 2500);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl max-w-xl mx-auto my-8 text-center animate-fade-in transition-colors">
      {/* Animated Glowing AI Core */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-brand-600/30 animate-pulse" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
          <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        Running Explainable AI Inference
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
        Evaluating credibility matrix for <strong className="text-slate-800 dark:text-slate-200">{borrowerName}</strong>
      </p>

      {/* Progress Steps List */}
      <div className="mt-8 space-y-3 text-left">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const StepIcon = step.icon;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3.5 ${
                isCurrent
                  ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 shadow-xs'
                  : isDone
                  ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-800 dark:text-slate-200'
                  : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 opacity-40'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-brand-600 text-white animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-bold ${
                      isCurrent
                        ? 'text-brand-900 dark:text-brand-300'
                        : isDone
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  {isCurrent && (
                    <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold animate-pulse">
                      In Progress...
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500">
        Transparent audit pipeline active • Cryptographic hash generation in progress
      </div>
    </div>
  );
};
