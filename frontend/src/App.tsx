import React, { useState } from 'react';
import { LendingProvider, useLending } from './context/LendingContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/layout/Toast';

// Pages & Views
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { BorrowersPage } from './pages/BorrowersPage';
import { AnalysisResultView } from './components/results/AnalysisResultView';
import { LoanSimulatorView } from './components/simulator/LoanSimulatorView';
import { RiskIntelligenceView } from './components/riskIntelligence/RiskIntelligenceView';
import { FraudIntelligenceView } from './components/fraud/FraudIntelligenceView';
import { ReportGeneratorView } from './components/reports/ReportGeneratorView';
import { SettingsView } from './components/settings/SettingsView';

const AppContent: React.FC = () => {
  const { activePage } = useLending();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // If on landing page, display full-screen landing view
  if (activePage === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'analyze' && <AnalyzePage />}
          {activePage === 'borrowers' && <BorrowersPage />}
          {activePage === 'result' && <AnalysisResultView />}
          {activePage === 'simulator' && <LoanSimulatorView />}
          {activePage === 'risk-intelligence' && <RiskIntelligenceView />}
          {activePage === 'fraud-intelligence' && <FraudIntelligenceView />}
          {activePage === 'reports' && <ReportGeneratorView />}
          {activePage === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LendingProvider>
        <AppContent />
      </LendingProvider>
    </ThemeProvider>
  );
}

export default App;
