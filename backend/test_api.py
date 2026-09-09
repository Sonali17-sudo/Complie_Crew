import urllib.request
import json

def test():
    print("--- 1. Testing GET /api/health ---")
    req = urllib.request.Request("http://127.0.0.1:8000/api/health")
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print(json.dumps(res, indent=2))
        assert res["status"] == "ok"
        assert res["model_loaded"] is True

    print("\n--- 2. Testing POST /api/analyze-borrower ---")
    borrower_data = {
        "name": "Rahul Sharma",
        "age": 29.0,
        "gender": "male",
        "education": "Bachelor",
        "monthly_income": 65000.0,
        "employment_experience": 4.0,
        "home_ownership": "RENT",
        "requested_loan": 75000.0,
        "loan_intent": "PERSONAL",
        "preferred_tenure": 12,
        "credit_score": 720,
        "credit_history_length": 5.0,
        "previous_defaults": "No",
        "existing_emi": 5000.0,
        "identity_verified": True,
        "income_verified": True,
        "bank_verified": True,
        "repayment_history": {
            "previousLoans": 3,
            "successfulRepayments": 3,
            "latePayments": 0,
            "defaults": 0
        }
    }

    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/analyze-borrower",
        data=json.dumps(borrower_data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print(f"Borrower: {res['borrower_name']}")
        print(f"Trust Score: {res['trust_score']}/100")
        print(f"Risk Score: {res['risk_score']}% ({res['risk_level']})")
        print(f"ML Default Probability: {res['model_default_probability']}")
        print(f"Confidence: {res['confidence']}%")
        print(f"Recommended Loan: INR {res['recommended_loan']:,} @ {res['recommended_interest_rate']}% for {res['recommended_tenure']} mos")
        print(f"Positive Factors: {len(res['positive_factors'])}")
        print(f"Risk Factors: {len(res['risk_factors'])}")
        print(f"Suspicious Patterns: {len(res['suspicious_patterns'])}")
        print(f"Evidences: {len(res['evidences'])}")
        print(f"AI Explanation: {res['ai_explanation'].encode('ascii', 'replace').decode('ascii')}")
        print(f"Audit ID: {res['audit_id']}")

    print("\n--- 3. Testing POST /api/simulate-loan ---")
    sim_data = {
        "monthly_income": 65000.0,
        "loan_amount": 75000.0,
        "interest_rate": 12.0,
        "tenure_months": 12,
        "existing_emi": 5000.0,
        "credit_score": 720
    }

    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/simulate-loan",
        data=json.dumps(sim_data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print(f"Loan Amount: INR {res['loan_amount']:,}")
        print(f"Estimated EMI: INR {res['estimated_emi']:,}/month")
        print(f"Total Repayment: INR {res['total_repayment']:,}")
        print(f"DTI Ratio: {res['debt_to_income_ratio']}%")
        print(f"Simulated Risk Level: {res['simulated_risk_level']} (Score: {res['simulated_risk_score']})")
        print(f"Simulated Trust Score: {res['simulated_trust_score']}")
        print(f"Recommendation: {res['recommendation']}")

    print("\nALL API TESTS PASSED SUCCESSFULLY! 100% WORKING.")

if __name__ == "__main__":
    test()
