import React, { createContext, useContext, useState } from 'react';
import { Borrower, ActivePage, BorrowerStatus } from '../types';
import { INITIAL_BORROWERS } from '../data/mockBorrowers';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface LendingContextType {
  borrowers: Borrower[];
  selectedBorrower: Borrower;
  setSelectedBorrower: (borrower: Borrower) => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  addNewBorrower: (borrower: Borrower) => void;
  updateBorrowerStatus: (id: string, status: BorrowerStatus) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  analysisStep: number;
  setAnalysisStep: (step: number) => void;
  selectBorrowerById: (id: string) => void;
}

const LendingContext = createContext<LendingContextType | undefined>(undefined);

export const LendingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [borrowers, setBorrowers] = useState<Borrower[]>(INITIAL_BORROWERS);
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower>(INITIAL_BORROWERS[0]);
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);

  const addToast = (
    title: string,
    message?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addNewBorrower = (newBorrower: Borrower) => {
    setBorrowers((prev) => [newBorrower, ...prev]);
    setSelectedBorrower(newBorrower);
    addToast(
      'New Borrower Profile Created',
      `Analysis for ${newBorrower.name} is complete and ready for review.`,
      'success'
    );
  };

  const updateBorrowerStatus = (id: string, status: BorrowerStatus) => {
    setBorrowers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    if (selectedBorrower.id === id) {
      setSelectedBorrower((prev) => ({ ...prev, status }));
    }
    addToast(
      'Borrower Decision Updated',
      `Status for this loan recommendation changed to "${status}".`,
      'info'
    );
  };

  const selectBorrowerById = (id: string) => {
    const found = borrowers.find((b) => b.id === id);
    if (found) {
      setSelectedBorrower(found);
    }
  };

  return (
    <LendingContext.Provider
      value={{
        borrowers,
        selectedBorrower,
        setSelectedBorrower,
        activePage,
        setActivePage,
        toasts,
        addToast,
        removeToast,
        addNewBorrower,
        updateBorrowerStatus,
        searchQuery,
        setSearchQuery,
        isAnalyzing,
        setIsAnalyzing,
        analysisStep,
        setAnalysisStep,
        selectBorrowerById,
      }}
    >
      {children}
    </LendingContext.Provider>
  );
};

export function useLending() {
  const context = useContext(LendingContext);
  if (!context) {
    throw new Error('useLending must be used within a LendingProvider');
  }
  return context;
}
