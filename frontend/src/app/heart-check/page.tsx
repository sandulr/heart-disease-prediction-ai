
"use client";

import { useState } from "react";
import Step1Personal from "./Step1Personal";
import Step2Lifestyle from "./Step2Lifestyle";
import Step3Medical from "./Step3Medical";
import Step4Vitals from "./Step4Vitals";
import Step5Review from "./Step5Review";

export default function HeartCheckPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const totalSteps = 5;

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert(`Prediction: ${result.prediction}`);
    } catch (err) {
      console.error(err);
      alert("Failed to get prediction. Try again later.");
    }
  };

  return (

    <div className="absolute w-full min-h-screen">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{filter:'blur(8px)'}}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      >
        <source src="/videos/heart.mp4" type="video/mp4" />
      </video>

      <div className=""></div>

      <div className="ios-wrapper z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-8">
          <h1 className="opacity-90 ios-title alfa-slab-one-regular redText text-3xl font-bold text-blue-800 mb-6 text-center animate-fade-in">
          Heart Disease Prediction
        </h1>
          <p className="whitTitle text-xl opacity-90">
            A modern AI-powered health insight tool
          </p><div className="w-full bg-green-100 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
        <p style={{fontSize:20}} className="noto-serif-notto text-center font-medium text-gray-600 mb-4">
          Step {step} of {totalSteps}
        </p>



  {step === 1 && <Step1Personal onNext={handleNext} defaultValues={formData} />}
        {step === 2 && <Step2Lifestyle onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
        {step === 3 && <Step3Medical onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
        {step === 4 && <Step4Vitals onNext={handleNext} onBack={handleBack} defaultValues={formData} />}
        {step === 5 && <Step5Review data={formData} onBack={handleBack} onSubmit={handleSubmit} />}
  
        
        </div>
      </div>

    </div>


  );
}
