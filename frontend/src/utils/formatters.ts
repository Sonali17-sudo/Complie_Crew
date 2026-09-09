/**
 * Utility formatters for TrustLend AI
 */

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function getRiskColorClass(level: 'LOW' | 'MEDIUM' | 'HIGH') {
  switch (level) {
    case 'LOW':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        fill: '#10b981',
        stroke: '#059669',
        glow: 'shadow-glow-success',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        fill: '#f59e0b',
        stroke: '#d97706',
        glow: '',
      };
    case 'HIGH':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        badge: 'bg-rose-100 text-rose-800 border-rose-300',
        fill: '#ef4444',
        stroke: '#dc2626',
        glow: '',
      };
  }
}
