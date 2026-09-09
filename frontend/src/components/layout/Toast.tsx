import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useLending } from '../../context/LendingContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useLending();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-100';
        let iconClass = 'text-emerald-600 dark:text-emerald-400';

        if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/90 text-amber-900 dark:text-amber-100';
          iconClass = 'text-amber-600 dark:text-amber-400';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/90 text-rose-900 dark:text-rose-100';
          iconClass = 'text-rose-600 dark:text-rose-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-blue-200 dark:border-blue-800/80 bg-blue-50 dark:bg-blue-950/90 text-blue-900 dark:text-blue-100';
          iconClass = 'text-blue-600 dark:text-blue-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform duration-300 animate-slide-up backdrop-blur-md ${borderClass}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClass}`} />
            <div className="flex-1 text-sm">
              <p className="font-semibold">{toast.title}</p>
              {toast.message && (
                <p className="text-xs opacity-90 mt-0.5">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-0.5"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
