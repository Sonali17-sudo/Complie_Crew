import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useLending } from '../../context/LendingContext';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

export const RiskDistributionChart: React.FC = () => {
  const { borrowers } = useLending();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const lowCount = borrowers.filter((b) => b.riskLevel === 'LOW').length;
  const mediumCount = borrowers.filter((b) => b.riskLevel === 'MEDIUM').length;
  const highCount = borrowers.filter((b) => b.riskLevel === 'HIGH').length;

  const data = [
    { name: 'Low Risk', value: lowCount, color: '#10b981', desc: 'Trust Score 80-100' },
    { name: 'Medium Risk', value: mediumCount, color: '#f59e0b', desc: 'Trust Score 65-79' },
    { name: 'High Risk', value: highCount, color: '#ef4444', desc: 'Trust Score <65' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Portfolio Risk Breakdown</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Live classification of active applicants</p>
        </div>
        <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-semibold">
          N={borrowers.length}
        </span>
      </div>

      <div className="h-52 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value, name) => [`${value} Profiles`, name]}
              contentStyle={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderRadius: '12px',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                fontSize: '12px',
                color: isDark ? '#f8fafc' : '#0f172a',
              }}
              itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label inside donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">Total</span>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{borrowers.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/80">
          <div className="flex items-center justify-center gap-1 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Low</span>
          </div>
          <p className="text-lg font-extrabold text-emerald-800 dark:text-emerald-200 mt-0.5">{lowCount}</p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Safe Lending</span>
        </div>

        <div className="p-2 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/80">
          <div className="flex items-center justify-center gap-1 text-amber-700 dark:text-amber-300 font-bold text-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Medium</span>
          </div>
          <p className="text-lg font-extrabold text-amber-800 dark:text-amber-200 mt-0.5">{mediumCount}</p>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Capped Loan</span>
        </div>

        <div className="p-2 rounded-xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800/80">
          <div className="flex items-center justify-center gap-1 text-rose-700 dark:text-rose-300 font-bold text-xs">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>High</span>
          </div>
          <p className="text-lg font-extrabold text-rose-800 dark:text-rose-200 mt-0.5">{highCount}</p>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">High Hazard</span>
        </div>
      </div>
    </div>
  );
};
