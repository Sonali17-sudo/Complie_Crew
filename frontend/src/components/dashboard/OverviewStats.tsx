import React from 'react';
import { Users, ShieldCheck, AlertTriangle, AlertOctagon, IndianRupee } from 'lucide-react';
import { useLending } from '../../context/LendingContext';
import { StatCard } from '../common/StatCard';
import { formatINR } from '../../utils/formatters';

export const OverviewStats: React.FC = () => {
  const { borrowers, setActivePage } = useLending();

  const totalBorrowers = borrowers.length;
  const lowRiskCount = borrowers.filter((b) => b.riskLevel === 'LOW').length;
  const mediumRiskCount = borrowers.filter((b) => b.riskLevel === 'MEDIUM').length;
  const highRiskCount = borrowers.filter((b) => b.riskLevel === 'HIGH').length;

  const totalRecommended = borrowers.reduce(
    (acc, b) => acc + (b.recommendedLoan || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Borrowers"
        value={totalBorrowers}
        subtitle="Active pipeline & registry"
        icon={Users}
        iconColor="text-brand-600"
        iconBg="bg-brand-50"
        badgeText="+2 this week"
        badgeType="neutral"
        onClick={() => setActivePage('borrowers')}
      />

      <StatCard
        title="Low Risk"
        value={lowRiskCount}
        subtitle={`${Math.round((lowRiskCount / totalBorrowers) * 100)}% of total portfolio`}
        icon={ShieldCheck}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
        badgeText="High Safety"
        badgeType="positive"
        onClick={() => setActivePage('risk-intelligence')}
      />

      <StatCard
        title="Medium Risk"
        value={mediumRiskCount}
        subtitle="Requires structured terms"
        icon={AlertTriangle}
        iconColor="text-amber-600"
        iconBg="bg-amber-50"
        badgeText="Balanced"
        badgeType="warning"
        onClick={() => setActivePage('risk-intelligence')}
      />

      <StatCard
        title="High Risk"
        value={highRiskCount}
        subtitle="Elevated default probability"
        icon={AlertOctagon}
        iconColor="text-rose-600"
        iconBg="bg-rose-50"
        badgeText="Restricted"
        badgeType="negative"
        onClick={() => setActivePage('risk-intelligence')}
      />

      <StatCard
        title="Recommended Capital"
        value={formatINR(totalRecommended)}
        subtitle="Safe aggregate ceiling"
        icon={IndianRupee}
        iconColor="text-indigo-600"
        iconBg="bg-indigo-50"
        badgeText="AI Optimized"
        badgeType="positive"
        onClick={() => setActivePage('simulator')}
      />
    </div>
  );
};
