import React, { useState, useRef } from 'react';
import {
  Upload,
  FileCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
  Trash2,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { useLending } from '../../context/LendingContext';
import {
  computeFactorScores,
  calculateTrustScore,
  getRiskLevel,
  computeRecommendation,
  RawBorrowerInputs,
} from '../../utils/riskEngine';
import { Borrower, EvidenceItem, FraudCheck, AuditStep } from '../../types';
import { analyzeBorrowerWithBackend, uploadDocumentWithBackend } from '../../services/api';

interface BorrowerFormProps {
  onStartAnalysis: (borrowerData: Borrower) => void;
}

interface DocItem {
  uploaded: boolean;
  readable: boolean;
  ready: boolean;
  name: string;
  size?: string;
}

export const BorrowerForm: React.FC<BorrowerFormProps> = ({ onStartAnalysis }) => {
  const { addToast } = useLending();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File Input Refs for real file selection
  const identityInputRef = useRef<HTMLInputElement>(null);
  const incomeInputRef = useRef<HTMLInputElement>(null);
  const bankInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState('Rahul Sharma');
  const [age, setAge] = useState(29);
  const [occupation, setOccupation] = useState('Software Engineer');
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'Self-Employed' | 'Freelance' | 'Business Owner'>('Salaried');
  const [employmentDuration, setEmploymentDuration] = useState('3+ Years');
  const [location, setLocation] = useState('Bengaluru, Karnataka');

  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEmi, setExistingEmi] = useState(10000);
  const [requestedLoan, setRequestedLoan] = useState(100000);
  const [preferredTenure, setPreferredTenure] = useState(8);
  const [previousLoans, setPreviousLoans] = useState(3);
  const [successfulRepayments, setSuccessfulRepayments] = useState(3);
  const [latePayments, setLatePayments] = useState(0);
  const [defaults, setDefaults] = useState(0);

  // Document state with real file support & demo initial values
  const [docs, setDocs] = useState<Record<'identity' | 'income' | 'bank', DocItem>>({
    identity: { uploaded: true, readable: true, ready: true, name: 'aadhaar_pan_card.pdf', size: '340 KB' },
    income: { uploaded: true, readable: true, ready: true, name: 'salary_slips_q2_2026.pdf', size: '512 KB' },
    bank: { uploaded: true, readable: true, ready: true, name: 'hdfc_bank_statement_6m.pdf', size: '1.2 MB' },
  });

  const [isUploadingDoc, setIsUploadingDoc] = useState<string | null>(null);

  // Real File Upload handler
  const handleRealFileUpload = async (key: 'identity' | 'income' | 'bank', file: File) => {
    setIsUploadingDoc(key);
    try {
      const res = await uploadDocumentWithBackend(file, key);
      const formattedSize =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      setDocs((prev) => ({
        ...prev,
        [key]: {
          uploaded: true,
          readable: res.readable,
          ready: res.verified,
          name: file.name,
          size: formattedSize,
        },
      }));
      addToast('Document Verified', `${file.name} (${formattedSize}) parsed & verified by AI.`, 'success');
    } catch (err: any) {
      addToast('Upload Error', err.message || 'Could not verify document', 'error');
    } finally {
      setIsUploadingDoc(null);
    }
  };

  // Remove uploaded document
  const handleRemoveDoc = (key: 'identity' | 'income' | 'bank') => {
    setDocs((prev) => ({
      ...prev,
      [key]: { uploaded: false, readable: false, ready: false, name: '', size: undefined },
    }));
    if (key === 'identity' && identityInputRef.current) identityInputRef.current.value = '';
    if (key === 'income' && incomeInputRef.current) incomeInputRef.current.value = '';
    if (key === 'bank' && bankInputRef.current) bankInputRef.current.value = '';
    addToast('Document Removed', 'Upload zone reset. You can now select or drop a new file.', 'info');
  };

  // Simulate quick demo document upload
  const simulateDocUpload = (key: 'identity' | 'income' | 'bank', filename: string) => {
    setIsUploadingDoc(key);
    setTimeout(() => {
      setDocs((prev) => ({
        ...prev,
        [key]: { uploaded: true, readable: true, ready: true, name: filename, size: '280 KB' },
      }));
      setIsUploadingDoc(null);
      addToast('Demo Document Loaded', `${filename} loaded and parsed successfully.`, 'success');
    }, 600);
  };

  const applyPreset = (type: 'rahul' | 'priya' | 'amit' | 'clean') => {
    if (type === 'rahul') {
      setName('Rahul Sharma');
      setAge(29);
      setOccupation('Software Engineer');
      setEmploymentType('Salaried');
      setEmploymentDuration('3+ Years');
      setLocation('Bengaluru, Karnataka');
      setMonthlyIncome(50000);
      setExistingEmi(10000);
      setRequestedLoan(100000);
      setPreferredTenure(8);
      setPreviousLoans(3);
      setSuccessfulRepayments(3);
      setLatePayments(0);
      setDefaults(0);
      setDocs({
        identity: { uploaded: true, readable: true, ready: true, name: 'rahul_aadhaar_pan.pdf' },
        income: { uploaded: true, readable: true, ready: true, name: 'salary_statement_50k.pdf' },
        bank: { uploaded: true, readable: true, ready: true, name: 'bank_statement_6m.pdf' },
      });
      addToast('Preset Loaded', 'Rahul Sharma (Medium Risk baseline) loaded.', 'info');
    } else if (type === 'priya') {
      setName('Priya Patel');
      setAge(34);
      setOccupation('Senior Architect');
      setEmploymentType('Salaried');
      setEmploymentDuration('5+ Years');
      setLocation('Ahmedabad, Gujarat');
      setMonthlyIncome(120000);
      setExistingEmi(15000);
      setRequestedLoan(150000);
      setPreferredTenure(12);
      setPreviousLoans(5);
      setSuccessfulRepayments(5);
      setLatePayments(0);
      setDefaults(0);
      setDocs({
        identity: { uploaded: true, readable: true, ready: true, name: 'priya_kyc_aadhaar.pdf' },
        income: { uploaded: true, readable: true, ready: true, name: 'form16_tax_returns.pdf' },
        bank: { uploaded: true, readable: true, ready: true, name: 'icici_salary_account.pdf' },
      });
      addToast('Preset Loaded', 'Priya Patel (Low Risk profile) loaded.', 'info');
    } else if (type === 'amit') {
      setName('Amit Verma');
      setAge(24);
      setOccupation('Gig Delivery Partner');
      setEmploymentType('Freelance');
      setEmploymentDuration('8 Months');
      setLocation('Delhi NCR');
      setMonthlyIncome(22000);
      setExistingEmi(8500);
      setRequestedLoan(90000);
      setPreferredTenure(6);
      setPreviousLoans(2);
      setSuccessfulRepayments(1);
      setLatePayments(2);
      setDefaults(1);
      setDocs({
        identity: { uploaded: true, readable: true, ready: true, name: 'amit_aadhaar_card.pdf' },
        income: { uploaded: false, readable: false, ready: false, name: '' },
        bank: { uploaded: true, readable: true, ready: true, name: 'paytm_payments_bank.pdf' },
      });
      addToast('Preset Loaded', 'Amit Verma (High Risk profile) loaded.', 'warning');
    } else if (type === 'clean') {
      setName('');
      setAge(25);
      setOccupation('');
      setEmploymentType('Salaried');
      setEmploymentDuration('1+ Years');
      setLocation('');
      setMonthlyIncome(30000);
      setExistingEmi(0);
      setRequestedLoan(50000);
      setPreferredTenure(6);
      setPreviousLoans(0);
      setSuccessfulRepayments(0);
      setLatePayments(0);
      setDefaults(0);
      setDocs({
        identity: { uploaded: false, readable: false, ready: false, name: '' },
        income: { uploaded: false, readable: false, ready: false, name: '' },
        bank: { uploaded: false, readable: false, ready: false, name: '' },
      });
      addToast('Form Cleared', 'Ready for new custom applicant entry.', 'info');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Missing Required Field', 'Please provide borrower full name.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the FastAPI + RandomForest ML backend (with automatic fallback to local engine)
      const analyzedBorrower = await analyzeBorrowerWithBackend({
        name,
        age: Number(age),
        occupation,
        employmentType,
        employmentDuration,
        location,
        monthlyIncome: Number(monthlyIncome),
        existingEmi: Number(existingEmi),
        requestedLoan: Number(requestedLoan),
        preferredTenure: Number(preferredTenure),
        previousLoans: Number(previousLoans),
        successfulRepayments: Number(successfulRepayments),
        latePayments: Number(latePayments),
        defaults: Number(defaults),
        identityVerified: docs.identity.ready,
        incomeProofVerified: docs.income.ready,
        bankStatementVerified: docs.bank.ready,
      });

      onStartAnalysis(analyzedBorrower);
    } catch (err: any) {
      console.error('[BorrowerForm] Error analyzing borrower:', err);
      addToast('Analysis Error', 'Fallback engine engaged.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Quick Presets Bar */}
      <div className="bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-colors">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <div>
            <p className="text-xs font-bold text-brand-900 dark:text-brand-200">Hackathon Quick Test Presets</p>
            <p className="text-[11px] text-brand-700 dark:text-brand-400">Pre-fill realistic borrower profiles in 1-click</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset('rahul')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300 hover:bg-brand-100/50 dark:hover:bg-slate-700 transition-all shadow-xs"
          >
            Rahul Sharma (Medium)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('priya')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all shadow-xs"
          >
            Priya Patel (Low)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('amit')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-all shadow-xs"
          >
            Amit Verma (High)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('clean')}
            className="text-xs font-medium px-2.5 py-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800 transition-all"
          >
            Clear Form
          </button>
        </div>
      </div>

      {/* SECTION A — PERSONAL INFORMATION */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Personal Information</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Identity and demographic indicators</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Age (Years) *
            </label>
            <input
              type="number"
              required
              min={18}
              max={85}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Occupation *
            </label>
            <input
              type="text"
              required
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Employment Type
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as any)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            >
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Freelance">Freelance / Gig Worker</option>
              <option value="Business Owner">Business Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Employment Duration
            </label>
            <select
              value={employmentDuration}
              onChange={(e) => setEmploymentDuration(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            >
              <option value="<1 Year">&lt; 1 Year</option>
              <option value="1+ Years">1+ Years</option>
              <option value="2+ Years">2+ Years</option>
              <option value="3+ Years">3+ Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* SECTION B — FINANCIAL INFORMATION */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
            B
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Financial Information</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Income, debt liabilities, and repayment history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Monthly Net Income (₹) *
            </label>
            <input
              type="number"
              step={1000}
              required
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Existing Monthly EMI (₹)
            </label>
            <input
              type="number"
              step={500}
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Requested Loan Amount (₹) *
            </label>
            <input
              type="number"
              step={5000}
              required
              value={requestedLoan}
              onChange={(e) => setRequestedLoan(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-700 dark:text-brand-400 rounded-xl px-3.5 py-2.5 font-mono font-bold focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred Tenure (Months)
            </label>
            <input
              type="number"
              min={1}
              max={36}
              value={preferredTenure}
              onChange={(e) => setPreferredTenure(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Previous Loans Taken
            </label>
            <input
              type="number"
              min={0}
              value={previousLoans}
              onChange={(e) => setPreviousLoans(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Successful Repayments
            </label>
            <input
              type="number"
              min={0}
              value={successfulRepayments}
              onChange={(e) => setSuccessfulRepayments(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Late Payment Incidents
            </label>
            <input
              type="number"
              min={0}
              value={latePayments}
              onChange={(e) => setLatePayments(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Past Loan Defaults
            </label>
            <input
              type="number"
              min={0}
              value={defaults}
              onChange={(e) => setDefaults(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-mono focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* SECTION C — DOCUMENT VERIFICATION */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
            C
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Document Verification</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive simulated upload and automated document integrity parsing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Identity Document */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between transition-colors">
            <input
              type="file"
              ref={identityInputRef}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleRealFileUpload('identity', f);
              }}
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">1. Identity Document</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Aadhaar / PAN</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                Digital government ID authentication for biometric token check.
              </p>
            </div>

            {isUploadingDoc === 'identity' ? (
              <div className="p-5 text-center bg-white dark:bg-slate-800 rounded-xl border border-brand-200 dark:border-brand-900 animate-pulse">
                <Loader2 className="w-5 h-5 text-brand-600 dark:text-brand-400 animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-700 dark:text-brand-300">Parsing OCR & Verifying...</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Connecting to FastAPI DocEngine</p>
              </div>
            ) : docs.identity.uploaded ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="truncate font-mono text-[11px] font-semibold">{docs.identity.name}</p>
                      {docs.identity.size && <p className="text-[10px] text-slate-400 font-mono">{docs.identity.size} • Verified</p>}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Document uploaded</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Document readable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Verification ready</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => identityInputRef.current?.click()}
                    className="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3 text-slate-500" />
                    <span>Change File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc('identity')}
                    className="py-1.5 px-2 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1 transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  onClick={() => identityInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleRealFileUpload('identity', f);
                  }}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 p-4 rounded-xl text-center bg-white dark:bg-slate-800/80 hover:bg-brand-50/40 dark:hover:bg-slate-700/50 transition-all cursor-pointer group"
                >
                  <Upload className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Click to upload ID Proof</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PDF, PNG, JPG (Aadhaar/PAN)</p>
                </div>
                <button
                  type="button"
                  onClick={() => simulateDocUpload('identity', 'aadhaar_card_demo.pdf')}
                  className="w-full text-center text-[10px] text-brand-600 dark:text-brand-400 hover:underline font-medium py-0.5"
                >
                  + Use demo sample file
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Income Proof */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between transition-colors">
            <input
              type="file"
              ref={incomeInputRef}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleRealFileUpload('income', f);
              }}
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">2. Income Proof</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Salary Slip / ITR</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                Validates regular employer credit or verified tax filings.
              </p>
            </div>

            {isUploadingDoc === 'income' ? (
              <div className="p-5 text-center bg-white dark:bg-slate-800 rounded-xl border border-brand-200 dark:border-brand-900 animate-pulse">
                <Loader2 className="w-5 h-5 text-brand-600 dark:text-brand-400 animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-700 dark:text-brand-300">Analyzing Pay Slip...</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Validating salary deposits against declaration</p>
              </div>
            ) : docs.income.uploaded ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="truncate font-mono text-[11px] font-semibold">{docs.income.name}</p>
                      {docs.income.size && <p className="text-[10px] text-slate-400 font-mono">{docs.income.size} • Verified</p>}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Document uploaded</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Document readable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Verification ready</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => incomeInputRef.current?.click()}
                    className="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3 text-slate-500" />
                    <span>Change File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc('income')}
                    className="py-1.5 px-2 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1 transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  onClick={() => incomeInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleRealFileUpload('income', f);
                  }}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 p-4 rounded-xl text-center bg-white dark:bg-slate-800/80 hover:bg-brand-50/40 dark:hover:bg-slate-700/50 transition-all cursor-pointer group"
                >
                  <Upload className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Click to upload Salary/ITR</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PDF, PNG, JPG (Pay slip / Form 16)</p>
                </div>
                <button
                  type="button"
                  onClick={() => simulateDocUpload('income', 'salary_slip_demo.pdf')}
                  className="w-full text-center text-[10px] text-brand-600 dark:text-brand-400 hover:underline font-medium py-0.5"
                >
                  + Use demo sample file
                </button>
              </div>
            )}
          </div>

          {/* Card 3: Bank Statement */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between transition-colors">
            <input
              type="file"
              ref={bankInputRef}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleRealFileUpload('bank', f);
              }}
            />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">3. Bank Statement</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">6-Month Cash Flow</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                Scans daily balances, recurring outflows, and UPI micro-patterns.
              </p>
            </div>

            {isUploadingDoc === 'bank' ? (
              <div className="p-5 text-center bg-white dark:bg-slate-800 rounded-xl border border-brand-200 dark:border-brand-900 animate-pulse">
                <Loader2 className="w-5 h-5 text-brand-600 dark:text-brand-400 animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-brand-700 dark:text-brand-300">Parsing 6M Statements...</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Evaluating cash flow stability & debt ratio</p>
              </div>
            ) : docs.bank.uploaded ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="truncate font-mono text-[11px] font-semibold">{docs.bank.name}</p>
                      {docs.bank.size && <p className="text-[10px] text-slate-400 font-mono">{docs.bank.size} • Verified</p>}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Document uploaded</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Document readable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>✓ Verification ready</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => bankInputRef.current?.click()}
                    className="flex-1 py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3 text-slate-500" />
                    <span>Change File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveDoc('bank')}
                    className="py-1.5 px-2 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1 transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  onClick={() => bankInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleRealFileUpload('bank', f);
                  }}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 p-4 rounded-xl text-center bg-white dark:bg-slate-800/80 hover:bg-brand-50/40 dark:hover:bg-slate-700/50 transition-all cursor-pointer group"
                >
                  <Upload className="w-5 h-5 text-brand-600 dark:text-brand-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Click to upload Statement</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">PDF, CSV, PNG (6M Bank statement)</p>
                </div>
                <button
                  type="button"
                  onClick={() => simulateDocUpload('bank', 'bank_statement_demo.pdf')}
                  className="w-full text-center text-[10px] text-brand-600 dark:text-brand-400 hover:underline font-medium py-0.5"
                >
                  + Use demo sample file
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="bg-slate-900 dark:bg-slate-800/90 text-white rounded-2xl p-6 shadow-xl border border-transparent dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Transparent Decision Support
            </span>
            <span className="text-[10px] bg-slate-800 dark:bg-slate-900 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
              v3.2 Model
            </span>
          </div>
          <p className="text-sm font-semibold text-white mt-1">
            Generate explainable audit evidence and personalized terms
          </p>
          <p className="text-xs text-slate-400">
            Final lending decisions remain strictly with the human lender.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 hover:scale-102 active:scale-98 transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Running ML Inference...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run AI Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
