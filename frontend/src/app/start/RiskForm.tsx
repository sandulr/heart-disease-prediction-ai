"use client";

import { useState } from "react";
import Step1Personal from "../heart-check/Step1Personal";

export default function RiskForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      {step === 1 && <Step1Personal onNext={handleNext} />}
      {/* Step 2, 3, 4 will be added later */}
    </div>
  );
}
