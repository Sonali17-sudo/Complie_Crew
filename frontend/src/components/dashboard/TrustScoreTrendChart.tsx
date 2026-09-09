import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const TrustScoreTrendChart: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const trendData = [
    { month: 'Apr 26', avgTrustScore: 72, approvedRatio: 68, defaultRate: 3.4 },
    { month: 'May 26', avgTrustScore: 75, approvedRatio: 72, defaultRate: 2.8 },
    { month: 'Jun 26', avgTrustScore: 74, approvedRatio: 70, defaultRate: 2.5 },
    { month: 'Jul 26', avgTrustScore: 79, approvedRatio: 76, defaultRate: 2.1 },
    { month: 'Aug 26', avgTrustScore: 82, approvedRatio: 81, defaultRate: 1.8 },
    { month: 'Sep 26', avgTrustScore: 84, approvedRatio: 84, defaultRate: 1.4 },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Network Trust Score & Health Trend</h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <TrendingUp className="w-3 h-3" /> +12 pts (6mo)
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Continuous risk mitigation through explainable underwriting</p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 dark:bg-brand-500"></span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-[11px]">Avg Trust Score</span>
          </div>
        </div>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTrust" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? '#1e293b' : '#f1f5f9'}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
              axisLine={false}
              tickLine={false}
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
              formatter={(value, name) => [
                `${value} pts`,
                name === 'avgTrustScore' ? 'Avg Trust Score' : name,
              ]}
            />
            <Area
              type="monotone"
              dataKey="avgTrustScore"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTrust)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <span>Portfolio Default Rate: <strong className="text-slate-800 dark:text-slate-200 font-mono">1.4%</strong> (vs 4.8% benchmark)</span>
        <span>Decision Accuracy: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">94.2%</strong></span>
      </div>
    </div>
  );
};
