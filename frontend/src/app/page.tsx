"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    Age: 12, Gender: "Female", Weight:30, Height:110, BMI:23.0,
    Smoking:"Current", Alcohol_Intake:"High", Physical_Activity:"Moderate",
    Diet:"Unhealthy", Stress_Level:"High", Hypertension:1, Diabetes:1, Hyperlipidemia:1,
    Family_History:1, Previous_Heart_Attack:1, Systolic_BP:120, Diastolic_BP:80,
    Heart_Rate:72, Blood_Sugar_Fasting:90, Cholesterol_Total:180
  });
  const [result, setResult] = useState(null);

  const handleChange = (e:any) => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/predict", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form),
    });
    console.log(form);
    const data = await res.json();
    console.log(data);
    setResult(data);
  }

  return (

    <div className="relative w-full ">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      >
        <source src="/videos/heart.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white px-8">
          <h1 className="text-4xl font-bold mb-4">Heart Risk Assessment</h1>
          <p className="text-xl opacity-90">A modern AI-powered health insight tool</p>
        </div>
      </div>

    </div>

  );
}
