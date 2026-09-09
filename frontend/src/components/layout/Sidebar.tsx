import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  SlidersHorizontal,
  ShieldAlert,
  FileText,
  Settings,
  ShieldCheck,
  Award,
  Globe,
  X,
  Radio,
  Eye,
} from 'lucide-react';
import { useLending } from '../../context/LendingContext';
import { ActivePage } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activePage, setActivePage } = useLending();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      page: 'dashboard' as ActivePage,
      badge: null,
    },
    {
      id: 'borrowers',
      label: 'Borrowers',
      icon: Users,
      page: 'borrowers' as ActivePage,
      badge: '8 Active',
    },
    {
      id: 'analyze',
      label: 'Analyze Borrower',
      icon: UserPlus,
      page: 'analyze' as ActivePage,
      badge: 'New',
    },
    {
      id: 'result',
      label: 'Recommendations',
      icon: Award,
      page: 'result' as ActivePage,
      badge: null,
    },
    {
      id: 'simulator',
      label: 'Loan Simulator',
      icon: SlidersHorizontal,
      page: 'simulator' as ActivePage,
      badge: 'What-If',
    },
    {
      id: 'risk-intelligence',
      label: 'Risk Intelligence',
      icon: ShieldAlert,
      page: 'risk-intelligence' as ActivePage,
      badge: null,
    },
    {
      id: 'fraud-intelligence',
      label: 'Fraud Intelligence',
      icon: Eye,
      page: 'fraud-intelligence' as ActivePage,
      badge: 'Live Scan',
    },
    {
      id: 'reports',
      label: 'Audit Reports',
      icon: FileText,
      page: 'reports' as ActivePage,
      badge: null,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      page: 'settings' as ActivePage,
      badge: null,
    },
  ];

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => handleNavigate('landing')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                  TrustLend
                </span>
                <span className="bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Explainable Decision Core
              </p>
            </div>
          </button>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Lending Platform
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.page)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-brand-200/80 dark:bg-brand-900/60 text-brand-800 dark:text-brand-200'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick link to public presentation / landing */}
          <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Presentation
          </div>
          <button
            onClick={() => handleNavigate('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activePage === 'landing'
                ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Public Landing Page</span>
          </button>
        </div>

        {/* System Status & Auditor Badge */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                AI Inference Engine
              </span>
              <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded font-bold border border-emerald-200 dark:border-emerald-800">
                ONLINE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              Transparent SHAP factor weights active. Latency: 42ms.
            </p>
          </div>

          <div className="mt-3 pt-2 flex items-center gap-2.5 px-1">
            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs">
              AM
            </div>
            <div className="text-[11px] leading-tight">
              <p className="font-bold text-slate-800 dark:text-slate-200">Dr. Arvind Mehta</p>
              <p className="text-slate-400 dark:text-slate-500 text-[10px]">Senior Auditor</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
