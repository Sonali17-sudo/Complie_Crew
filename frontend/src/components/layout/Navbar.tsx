import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Menu,
  ShieldCheck,
  ChevronDown,
  User,
  Cpu,
} from 'lucide-react';
import { useLending } from '../../context/LendingContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { checkBackendHealth, BackendHealth } from '../../services/api';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    borrowers,
    selectedBorrower,
    setSelectedBorrower,
    searchQuery,
    setSearchQuery,
    setActivePage,
    addToast,
  } = useLending();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [health, setHealth] = useState<BackendHealth>({ online: false, modelLoaded: false });

  useEffect(() => {
    let mounted = true;
    const fetchHealth = async () => {
      const status = await checkBackendHealth();
      if (mounted) {
        setHealth(status);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const notifications = [
    {
      id: 'n1',
      title: 'Aadhaar e-KYC Verified',
      time: '12m ago',
      desc: 'Rahul Sharma passed cryptographic biometric token match.',
    },
    {
      id: 'n2',
      title: 'High Leverage Detected',
      time: '34m ago',
      desc: 'Amit Verma requested ₹90,000 against volatile gig cash flows.',
    },
    {
      id: 'n3',
      title: 'Audit Report Generated',
      time: '1h ago',
      desc: 'Priya Patel lending memo archived with cryptographic hash.',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 py-3 transition-colors duration-150">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search */}
          <div className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search borrowers, risk factors, or locations..."
              className="w-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Center: Demo Borrower Quick Preset Switcher */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            Quick Demo Profiles:
          </span>
          {borrowers.slice(0, 4).map((borrower) => {
            const isSelected = selectedBorrower.id === borrower.id;
            let riskDot = 'bg-emerald-500';
            if (borrower.riskLevel === 'MEDIUM') riskDot = 'bg-amber-500';
            if (borrower.riskLevel === 'HIGH') riskDot = 'bg-rose-500';

            return (
              <button
                key={borrower.id}
                onClick={() => {
                  setSelectedBorrower(borrower);
                  addToast(
                    `Switched to ${borrower.name}`,
                    `Profile loaded: ${borrower.riskLevel} Risk • Trust Score ${borrower.trustScore}/100`,
                    'info'
                  );
                }}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/80 dark:border-slate-700 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${riskDot}`} />
                <span>{borrower.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Theme switcher, Status badge, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* AI Status Badge - Dynamic FastAPI & ML Connection */}
          <div
            title={
              health.online
                ? `FastAPI Backend Online • Model loaded: ${health.modelLoaded ? 'RandomForest (45k rows, 89.2% Acc)' : 'Heuristic'}`
                : 'Backend offline: Running on local demo evaluation engine'
            }
            className={`hidden lg:flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border transition-all ${
              health.online
                ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/80'
                : 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/80'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {health.online && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  health.online ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              ></span>
            </span>
            <span className="font-semibold">
              {health.online ? 'FastAPI + ML Online' : 'Local Demo Engine'}
            </span>
            <span
              className={`text-[10px] font-mono px-1 rounded ${
                health.online
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40'
                  : 'text-amber-700 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-900/40'
              }`}
            >
              {health.online && health.modelLoaded ? 'RF 89% Acc' : 'Offline'}
            </span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 animate-slide-up z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Audit Alerts</h4>
                  <span className="text-[10px] bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    setActivePage('risk-intelligence');
                  }}
                  className="w-full mt-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 rounded-lg transition-colors text-center block"
                >
                  View All Risk Alerts
                </button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                AM
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Dr. Arvind Mehta</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Lead Underwriter</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 animate-slide-up z-50 text-xs">
                <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-slate-100">Dr. Arvind Mehta</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">arvind.mehta@trustlend.ai</p>
                  <span className="inline-block mt-1 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-mono">
                    Auditor Role: National Demo
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setActivePage('settings');
                  }}
                  className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Account & Model Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    setActivePage('landing');
                  }}
                  className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  View Public Landing Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
