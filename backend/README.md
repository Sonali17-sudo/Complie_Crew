# TrustLend AI - FastAPI Backend & Machine Learning Engine

FastAPI backend and machine learning risk intelligence engine for **TrustLend AI**, built for the national hackathon.

## Features

- **Trained RandomForest Risk Classifier**: Trained on `loan_data.csv` (45,000 records) with 89.23% accuracy, 91.45% recall, and 0.9727 ROC-AUC.
- **Explainable Trust Score**: 0-100 transparent multi-factor attribution across identity, income, repayment, debt burden, and behavioral integrity.
- **Suspicious Pattern Intelligence**: Real-time detection of disproportionate leverage, unverified credentials, and subprime default patterns.
- **Personalized Loan Recommendation**: Risk-adjusted loan capping, interest rate tiering, and optimal tenure calculations.
- **What-If Loan Simulator**: Real-time EMI, total repayment, and debt-to-income (DTI) sensitivity calculations.

## Quick Start (Windows)

### 1. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 2. Train Model on Dataset
```powershell
python train_model.py
```
This processes `loan_data.csv` and outputs `models/risk_model.pkl` and `models/preprocessor.pkl`.

### 3. Launch FastAPI Server
```powershell
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## API Documentation

Interactive Swagger documentation is available at:
**http://127.0.0.1:8000/docs**

### Endpoints

- `GET /api/health` - Health check and ML model load status
- `POST /api/analyze-borrower` - Comprehensive ML risk, trust score, and explainable lending analysis
- `POST /api/simulate-loan` - What-If loan parameter simulation (EMI, DTI, and risk impact)

## Verification Tests

Run the automated test suite:
```powershell
python test_api.py
```
