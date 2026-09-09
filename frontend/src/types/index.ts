export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type BorrowerStatus = 'Pending Review' | 'Accepted' | 'Terms Adjusted' | 'Declined';

export type VerificationState = 'verified' | 'pending' | 'flagged';

export interface RepaymentHistory {
  previousLoans: number;
  successfulRepayments: number;
  latePayments: number;
  defaults: number;
}

export interface FactorScores {
  identityConfidence: number; // 0-100
  financialHealth: number;    // 0-100
  repaymentReliability: number; // 0-100
  debtBurden: number;         // 0-100 (higher score = better/healthier debt load)
  incomeStability: number;    // 0-100
  behavioralReliability: number; // 0-100
}

export interface EvidenceItem {
  id: string;
  title: string;
  source: string;
  impactPoints: number; // e.g. +12, -10
  type: 'positive' | 'warning';
  explanation: string;
}

export interface AuditStep {
  date: string;
  action: string;
  actor: string;
  verifiedHash: string;
}

export interface FraudCheck {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  details: string;
}

export interface Borrower {
  id: string;
  name: string;
  age: number;
  occupation: string;
  employmentType: 'Salaried' | 'Self-Employed' | 'Freelance' | 'Business Owner';
  employmentDuration: string;
  location: string;
  avatar: string;
  phone?: string;
  email?: string;
  
  // Financial inputs
  monthlyIncome: number;
  existingEmi: number;
  requestedLoan: number;
  preferredTenure: number; // months
  
  // Repayment & credit attributes
  repaymentHistory: RepaymentHistory;
  
  // Verification flags
  identityVerified: boolean;
  incomeProofVerified: boolean;
  bankStatementVerified: boolean;
  verificationStatus: VerificationState;

  // AI Output metrics
  trustScore: number; // 0-100
  riskScore: number;  // 0-100
  riskLevel: RiskLevel;
  confidence: number; // percentage, e.g. 87%
  
  // Recommended terms
  recommendedLoan: number;
  recommendedTenure: number;
  
  factorScores: FactorScores;
  positiveSignals: string[];
  warningSignals: string[];
  aiExplanation: string;
  
  fraudRisk: RiskLevel;
  fraudChecks: FraudCheck[];
  evidences: EvidenceItem[];
  auditTrail: AuditStep[];
  
  lastAnalysisDate: string;
  status: BorrowerStatus;
}

export interface LoanSimulation {
  loanAmount: number;
  tenureMonths: number;
  monthlyEmi: number;
  debtToIncomeRatio: number;
  simulatedTrustScore: number;
  simulatedRiskLevel: RiskLevel;
  confidence: number;
  explanation: string;
}

export type ActivePage = 
  | 'landing' 
  | 'dashboard' 
  | 'analyze' 
  | 'result' 
  | 'simulator' 
  | 'risk-intelligence' 
  | 'borrowers' 
  | 'reports' 
  | 'fraud-intelligence' 
  | 'settings';
