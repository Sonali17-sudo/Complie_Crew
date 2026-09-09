import React, { useState } from 'react';
import { useLending } from '../context/LendingContext';
import { BorrowerForm } from '../components/analyze/BorrowerForm';
import { AIAnalysisLoader } from '../components/analyze/AIAnalysisLoader';
import { Borrower } from '../types';
import { UserPlus, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  const { addNewBorrower, setActivePage } = useLending();
  const [pendingBorrower, setPendingBorrower] = useState<Borrower | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleStartAnalysis = (borrowerData: Borrower) => {
    setPendingBorrower(borrowerData);
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    if (pendingBorrower) {
      addNewBorrower(pendingBorrower);
      setIsAnalyzing(false);
      setActivePage('result');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Analyze New Borrower
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Submit applicant identity, cash flows, and repayment history for explainable AI evaluation
            </p>
          </div>

          <button
            onClick={() => setActivePage('dashboard')}
            className="self-start sm:self-auto text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel & Back</span>
          </button>
        </div>
      </div>

      {/* Main Content: Either Loader or Multi-Section Form */}
      {isAnalyzing && pendingBorrower ? (
        <AIAnalysisLoader
          borrowerName={pendingBorrower.name}
          onComplete={handleAnalysisComplete}
        />
      ) : (
        <BorrowerForm onStartAnalysis={handleStartAnalysis} />
      )}
    </div>
  );
};
