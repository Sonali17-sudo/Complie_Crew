# TrustLend AI – AI-Powered Lending Intelligence Platform

TrustLend AI enables individuals, families, and community lenders to make safer, data-backed lending decisions with explainable risk scoring, trust verification, and auditability.

---

## 📁 Project Architecture

The project is cleanly separated into dedicated `frontend` and `backend` services:

```text
Complie_Crew/
├── frontend/                     # React + TypeScript + Vite + Tailwind CSS
│   ├── src/                      # UI Components, Pages, State, Context
│   ├── public/                   # Static assets
│   ├── package.json              # Node dependencies
│   └── vite.config.ts            # Vite configuration
│
├── backend/                      # Python 3.11+ FastAPI + Scikit-Learn ML
│   ├── main.py                   # FastAPI application & REST endpoints
│   ├── train_model.py            # Random Forest Classifier training script
│   ├── test_api.py               # Automated endpoint verification test
│   ├── requirements.txt          # Python dependencies
│   ├── README.md                 # Backend documentation
│   └── models/                   # Serialized ML artifacts
│       ├── risk_model.pkl        # Trained Random Forest model (89.2% acc, 0.97 ROC-AUC)
│       └── preprocessor.pkl      # Categorical & Numerical feature pipeline
│
└── loan_data.csv                 # 45,000-record lending training dataset
```

---

## 🚀 Getting Started

### 1. Backend (FastAPI + Machine Learning)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

- **Interactive API Docs (Swagger UI)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check**: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

#### Key Endpoints:
- `GET /api/health` — Service status & ML model verification.
- `POST /api/analyze-borrower` — Full risk analysis (RandomForest prediction, 0-100 Trust Score, anomaly flags, recommended terms, explainability breakdown, SHA-256 audit hash).
- `POST /api/simulate-loan` — Interactive loan parameter simulation (EMI, interest, DTI, repayment burden).

### 2. Frontend (React + TypeScript + Tailwind CSS)

```bash
cd frontend
npm install
npm run dev
```

- **Application URL**: [http://localhost:5173](http://localhost:5173)
- Includes full Light Mode & Dark Mode theme switching, interactive loan simulator, borrower credibility analysis, explainability charts, and audit trail ledger.

