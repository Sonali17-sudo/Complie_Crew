import React from 'react';
import { FactorScores } from '../../types';
import {
  Activity,
  History,
  Scale,
  TrendingUp,
  Fingerprint,
  ShieldCheck,
} from 'lucide-react';
import { FactorBar } from '../common/FactorBar';

interface FactorScoreCardsProps {
  factors: FactorScores;
}

export const FactorScoreCards: React.FC<FactorScoreCardsProps> = ({ factors }) => {
  const cards = [
    {
      label: 'Identity Confidence',
      score: factors.identityConfidence,
      weight: '15%',
      icon: Fingerprint,
      description: 'Aadhaar / PAN digital token match and cryptographic verification.',
    },
    {
      label: 'Financial Health',
      score: factors.financialHealth,
      weight: 'General',
      icon: Activity,
      description: 'Monthly disposable buffer and surplus cushion after living expenses.',
    },
    {
      label: 'Repayment Reliability',
      score: factors.repaymentReliability,
      weight: '25%',
      icon: History,
      description: 'Historical prompt settlement across prior peer lending cycles.',
    },
    {
      label: 'Debt Burden',
      score: factors.debtBurden,
      weight: '20%',
      icon: Scale,
      description: 'Existing EMI service ratio relative to monthly revenue streams.',
    },
    {
      label: 'Income Stability',
      score: factors.incomeStability,
      weight: '20%',
      icon: TrendingUp,
      description: 'Employment duration stability and regular payroll deposits.',
    },
    {
      label: 'Behavioral Reliability',
      score: factors.behavioralReliability,
      weight: '10%',
      icon: ShieldCheck,
      description: 'Community network endorsements and banking consistency score.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                Weight: {card.weight}
              </span>
            </div>

            <FactorBar
              label={card.label}
              score={card.score}
              subtitle={card.description}
            />
          </div>
        );
      })}
    </div>
  );
};
