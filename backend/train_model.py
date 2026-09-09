import os
import sys
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report,
)

def find_dataset():
    candidates = [
        os.path.join(os.path.dirname(__file__), '..', 'loan_data.csv'),
        os.path.join(os.path.dirname(__file__), 'data', 'loan_data.csv'),
        os.path.join(os.getcwd(), 'loan_data.csv'),
        os.path.join(os.getcwd(), '..', 'loan_data.csv'),
        r'C:\Complie_Crew\loan_data.csv'
    ]
    for p in candidates:
        abs_p = os.path.abspath(p)
        if os.path.isfile(abs_p):
            return abs_p
    raise FileNotFoundError("Could not find loan_data.csv in expected locations.")

def train():
    csv_path = find_dataset()
    print(f"[TrustLend AI] Loading dataset from: {csv_path}")
    df = pd.read_csv(csv_path)
    print(f"[TrustLend AI] Total records loaded: {len(df):,}")

    target_col = 'loan_status'
    if target_col not in df.columns:
        raise ValueError(f"Target column '{target_col}' not found in dataset. Columns: {df.columns.tolist()}")

    # Define actual columns based on inspection
    num_cols = [
        'person_age',
        'person_income',
        'person_emp_exp',
        'loan_amnt',
        'loan_int_rate',
        'loan_percent_income',
        'cb_person_cred_hist_length',
        'credit_score',
    ]

    cat_cols = [
        'person_gender',
        'person_education',
        'person_home_ownership',
        'loan_intent',
        'previous_loan_defaults_on_file',
    ]

    # Verify features exist
    available_num = [c for c in num_cols if c in df.columns]
    available_cat = [c for c in cat_cols if c in df.columns]

    print(f"[TrustLend AI] Numerical features ({len(available_num)}): {available_num}")
    print(f"[TrustLend AI] Categorical features ({len(available_cat)}): {available_cat}")

    X = df[available_num + available_cat]
    y = df[target_col].astype(int)

    # Class balance check
    class_dist = y.value_counts(normalize=True).to_dict()
    print(f"[TrustLend AI] Target distribution (0: Repaid, 1: Default): {class_dist}")

    # Build preprocessing pipelines
    num_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler()),
    ])

    cat_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False)),
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', num_pipeline, available_num),
            ('cat', cat_pipeline, available_cat),
        ]
    )

    # Train-test split (80/20 stratified)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"[TrustLend AI] Training set: {len(X_train):,}, Test set: {len(X_test):,}")

    print("[TrustLend AI] Fitting preprocessor and training RandomForestClassifier...")
    X_train_proc = preprocessor.fit_transform(X_train)
    X_test_proc = preprocessor.transform(X_test)

    # RandomForest with 100 trees, balanced weights
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=12,
        min_samples_split=5,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1,
    )
    model.fit(X_train_proc, y_train)

    # Predictions and probabilities
    y_pred = model.predict(X_test_proc)
    y_proba = model.predict_proba(X_test_proc)[:, 1]

    # Metrics
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, zero_division=0)
    rec = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)
    auc = roc_auc_score(y_test, y_proba)
    cm = confusion_matrix(y_test, y_pred)

    print("\n" + "="*50)
    print("      TRUSTLEND AI - MODEL EVALUATION METRICS     ")
    print("="*50)
    print(f" Accuracy:       {acc:.4f} ({acc*100:.2f}%)")
    print(f" Precision:      {prec:.4f} ({prec*100:.2f}%)")
    print(f" Recall:         {rec:.4f} ({rec*100:.2f}%)")
    print(f" F1-Score:       {f1:.4f}")
    print(f" ROC-AUC Score:  {auc:.4f}")
    print("\nConfusion Matrix:")
    print(f" [[TN={cm[0,0]}  FP={cm[0,1]}]")
    print(f"  [FN={cm[1,0]}  TP={cm[1,1]}]]")
    print("="*50 + "\n")

    # Create models directory
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(models_dir, exist_ok=True)

    model_path = os.path.join(models_dir, 'risk_model.pkl')
    preprocessor_path = os.path.join(models_dir, 'preprocessor.pkl')

    joblib.dump(model, model_path)
    joblib.dump(preprocessor, preprocessor_path)

    print(f"[TrustLend AI] Model saved to: {model_path}")
    print(f"[TrustLend AI] Preprocessor saved to: {preprocessor_path}")
    print("[TrustLend AI] Training complete successfully!")

    return {
        "accuracy": acc,
        "precision": prec,
        "recall": rec,
        "f1_score": f1,
        "roc_auc": auc,
        "confusion_matrix": cm.tolist(),
        "records": len(df),
    }

if __name__ == '__main__':
    train()
