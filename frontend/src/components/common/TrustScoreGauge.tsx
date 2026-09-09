import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import { RiskLevel } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface TrustScoreGaugeProps {
  score: number; // 0 to 100
  riskLevel: RiskLevel;
  confidence?: number;
  size?: number;
  showSubtitle?: boolean;
}

export const TrustScoreGauge: React.FC<TrustScoreGaugeProps> = ({
  score,
  riskLevel,
  confidence = 87,
  size = 200,
  showSubtitle = true,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#10b981'; // green for >= 80
  let glowColor = isDark ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.2)';
  let RiskIcon = ShieldCheck;

  if (score < 65) {
    strokeColor = '#ef4444'; // red
    glowColor = isDark ? 'rgba(239, 68, 68, 0.35)' : 'rgba(239, 68, 68, 0.2)';
    RiskIcon = AlertOctagon;
  } else if (score < 80) {
    strokeColor = '#f59e0b'; // amber
    glowColor = isDark ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.2)';
    RiskIcon = AlertTriangle;
  }

  const bgTrackColor = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 origin-center"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={bgTrackColor}
            strokeWidth={strokeWidth}
            className="transition-colors duration-300"
          />
          {/* Animated score circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-0.5">
            Trust Score
          </span>
          <div className="flex items-baseline justify-center">
            <span
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: strokeColor }}
            >
              {score}
            </span>
            <span className="text-base font-semibold text-slate-400 dark:text-slate-500 ml-0.5">
              /100
            </span>
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors">
            <RiskIcon className="w-3.5 h-3.5" style={{ color: strokeColor }} />
            <span>{riskLevel} RISK</span>
          </div>
        </div>
      </div>

      {showSubtitle && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span>AI Confidence: <strong className="text-slate-800 dark:text-slate-100 font-semibold">{confidence}%</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
