"use client";
import { useState } from "react";
import RiskModal from "./RiskModal";
import { motion } from "framer-motion";

interface Step5ReviewProps {
  data: any;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step5Review({ data, onBack, onSubmit }: Step5ReviewProps) {
  
  
  function capitalizeKeys(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
    newObj[capitalKey] = obj[key];
  }

  return newObj;
}


const keyMap = {
  alcohol: "Alcohol_Intake",
  activity: "Physical_Activity",
  stress: "Stress_Level",
  systolicBP: "Systolic_BP",
  diastolicBP: "Diastolic_BP",
  familyHistory: "Family_History",
  previousHeartAttack: "Previous_Heart_Attack",
  heartRate: "Heart_Rate",
  fastingBloodSugar: "Blood_Sugar_Fasting",
  cholesterolTotal: "Cholesterol_Total"
};


const valueReplacements = {
  familyHistory: { "No": 0, "Yes": 1 },
  hyperlipidemia: { "No": 0, "Yes": 1 },
  diabetes: { "No": 0, "Yes": 1 },
  hypertension: { "No": 0, "Yes": 1 },
  previousHeartAttack:  { "No": 0, "Yes": 1 }
};


function transformKeys(
  obj: { [x: string]: any; },
  replacements: Record<string, string> = {},
  conditionalValues: Record<string, Record<string | number, any>> = {}
) {
  const result: Record<string, any> = {};

  for (const key in obj) {

    const newKeyRaw = replacements[key] || key;
    const newKey = newKeyRaw.charAt(0).toUpperCase() + newKeyRaw.slice(1);

    let value = obj[key];

    if (typeof value === "string") {
      const cleaned = value.replace(/,/g, "").trim();
      const num = parseFloat(cleaned);
      value = isNaN(num) ? value : num;
    }

    const condMap = conditionalValues[key];
    if (condMap && Object.prototype.hasOwnProperty.call(condMap, String(value))) {
      value = condMap[String(value)];
    }

    result[newKey] = value;
  }

  return result;
}




  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"low" | "moderate" | "high">("low");

  const handleSubmit = async () => {
  const updated = transformKeys(data, keyMap, valueReplacements);


    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const result = await res.json();

      const probVal = result.probability;

      if (probVal > 0.7) {
      setType("high"); setOpen(true); 
      

    } else if (probVal > 0.4) {
      setType("moderate"); setOpen(true); 
      
    } else {
      setType("low"); setOpen(true); 
      
    }

      


    } catch (err) {
      console.error(err);
      alert("Failed to get prediction. Try again later.");
    }
  };


  return (


    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      className=""
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
  
    >
    <div style={{width: '100%'}} className="ios-card card-upgrade">
      <h1 style={{color:'wheat'}} className="text-4xl font-extrabold mb-8 text-center">
        Review Your Information
      </h1>


      <div className="grid-container">

      <div className="grid-item">
    <h3 className="font-semibold text-blue-600">Personal Details</h3>
          <p>Age: {data.age}</p>
          <p>Gender: {data.gender}</p>
          <p>Height: {data.height} cm</p>
          <p>Weight: {data.weight} kg</p>
          <p>BMI: {data.bmi?.toFixed(1) ?? (data.weight / ((data.height / 100) * (data.height / 100))).toFixed(1)}</p>
  </div>
        


  
  <div className="grid-item">
    <h3 className="font-semibold text-blue-600">Lifestyle & Habits</h3>
          <p>Smoking: {data.smoking}</p>
          <p>Alcohol Intake: {data.alcohol}</p>
          <p>Physical Activity: {data.activity}</p>
          <p>Diet: {data.diet}</p>
          <p>Stress Level: {data.stress}</p>
  </div>
  <div className="grid-item">
    <h3 className="font-semibold text-blue-600">Medical History</h3>
          <p>Hypertension: {data.hypertension}</p>
          <p>Diabetes: {data.diabetes}</p>
          <p>Hyperlipidemia: {data.hyperlipidemia}</p>
          <p>Family History: {data.familyHistory}</p>
          <p>Previous Heart Attack: {data.previousHeartAttack}</p>
  </div>
  <div className="grid-item">
    <h3 className="font-semibold text-blue-600">Vital Signs</h3>
          <p>Systolic BP: {data.systolicBP} mmHg</p>
          <p>Diastolic BP: {data.diastolicBP} mmHg</p>
          <p>Heart Rate: {data.heartRate} bpm</p>
          <p>Fasting Blood Sugar: {data.fastingBloodSugar} mg/dL</p>
          <p>Total Cholesterol: {data.cholesterolTotal} mg/dL</p>
  </div>
  
</div>

<div className="grid-btn-container">

      <div className="grid-btn-item">
        <button className="ios-btn" onClick={onBack}>← Back</button>
      </div>
      
      <div className="grid-btn-item">
      <button className="ios-btn" onClick={handleSubmit}>Submit & Predict</button>
      </div>
         
        </div>

      {open && (
        
        <RiskModal open={open} type={type} onClose={() => setOpen(false)}  />
      )}

      

    </div>
    </motion.div>


    
  );
}
