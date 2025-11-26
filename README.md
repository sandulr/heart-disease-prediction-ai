
---

# 🌟 **Healthful — AI-Powered Heart Disease Risk Prediction Web App**

A modern full-stack HealthTech application that predicts heart disease risk using **XGBoost**, served through a **FastAPI** backend, and visualized via a beautifully designed **Next.js + TypeScript** frontend with glass-morphism UI and a heart-themed animated background.

<div align="center">

💻 **Next.js (Frontend)** • ⚙️ **FastAPI (Backend API)** • 🤖 **XGBoost (Machine Learning Model)**
🎨 **Tailwind CSS + Custom UI** • 🧠 **Real-time Inference**

</div>

---

## 📌 **Table of Contents**

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [AI Model](#ai-model)
* [Project Structure](#project-structure)
* [Setup & Installation](#setup--installation)
* [Running the Project](#running-the-project)
* [Screenshots](#screenshots)
* [Future Improvements](#future-improvements)
* [Disclaimer](#disclaimer)

---

# 🩺 **Overview**

**Healthful** is an AI-driven web application that helps users understand whether they fall into a **low, moderate, or high risk range** for potential heart-related issues based on lifestyle and vitals data.

Users complete a guided **multi-step form**, and the model generates a prediction in real-time through a FastAPI backend.

This project showcases:

* Practical use of **Machine Learning in HealthTech**
* Modern **UI/UX design with glass-morphism**
* Full-stack integration between **Next.js ↔ FastAPI ↔ ML model**
* Real-world application of **XGBoost** for structured data


---

# ✨ **Features**

### 🔹 **AI Prediction (XGBoost)**

* Trained on structured health & lifestyle metrics
* Evaluated using **Accuracy, Precision, Recall, ROC-AUC**
* Optimized for real-time prediction

### 🔹 **FastAPI Backend**

* Clean API endpoint for ML inference
* Handles preprocessing & validation
* Fast & production-ready

### 🔹 **Next.js Frontend (TypeScript)**

* Step-by-step guided input form
* Persistent values when navigating between steps
* Clean, modern design with:

  * Glass-morphism cards
  * Gradient buttons
  * Large health-themed icons
  * Heart-animated background video

### 🔹 **Friendly Result Output**

* Displays **Low**, **Moderate**, or **High** risk
* Offers helpful supportive guidance
* User-centered tone

---

# 🧠 **AI Model**

### **Algorithm Used:**

➡️ **XGBoost Classifier** — chosen for its strong performance on structured/tabular data.

### **Important Features Used**

* Age
* BMI
* Smoking & Alcohol Intake
* Physical Activity
* Stress Level
* Hypertension / Diabetes / Hyperlipidemia
* Blood Pressure
* Blood Sugar
* Cholesterol

### **Evaluation Metrics:**

* Accuracy
* Precision & Recall
* F1 Score
* ROC-AUC

The model balances sensitivity and specificity to ensure reliable predictions.

---

# ⚙️ **Tech Stack**

### **Frontend**

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* custom glass styles
* Framer Motion (optional animations)

### **Backend**

* FastAPI
* Uvicorn
* Pydantic (data validation)

### **Machine Learning**

* XGBoost
* scikit-learn
* pandas / numpy
* joblib (model saving)

---

# 📁 **Project Structure**

```
📦 Healthful
├── backend/
│   ├── app/
│       ├── features_list.joblib
│       ├── imputer.joblib
│       ├── scaler.joblib
│       ├── xgb_clf.joblib
│       ├── requirements.txt
│       └── main.py
│
│
├── frontend/
│   ├── app/
│   │   ├── heart-check/
│   │       └── page.tsx        
│   │   
│   ├── public/
│   └── package.json
│
└── README.md
```

---


# 🚀 **Future Improvements**

* Add user authentication
* Store user history securely
* Add charts & health analytics
* Deploy to cloud (Vercel + Railway)
* Add explainability (SHAP)
* Multi-language support

---

# ⚠️ **Disclaimer**

This project is built **for demonstration purposes only**.
It is **not a medical device** and should **not** be used for clinical diagnosis or treatment decisions.

---
