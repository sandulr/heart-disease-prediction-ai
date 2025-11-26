"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const schema = z.object({
  hypertension: z.enum(["Yes", "No"]),
  diabetes: z.enum(["Yes", "No"]),
  hyperlipidemia: z.enum(["Yes", "No"]),
  familyHistory: z.enum(["Yes", "No"]),
  previousHeartAttack: z.enum(["Yes", "No"]),
});



export default function Step3Medical({ onNext, defaultValues, onBack }: { onNext: (data: any) => void; defaultValues?: any; onBack: () => void }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      hypertension: defaultValues?.hypertension ?? "No",
      diabetes: defaultValues?.diabetes ?? "No",
      hyperlipidemia: defaultValues?.hyperlipidemia ?? "No",
      familyHistory: defaultValues?.familyHistory ?? "No",
      previousHeartAttack: defaultValues?.previousHeartAttack ?? "No",
    },
  });


  const handleSubmit = (values: any) => {
    console.log("Step 3 values:", values);
    onNext(values);
  };


  const yesNoRadio = (fieldName: any, label: any) => (
   
  <div className="custom-radio-wrapper">
    <label className="custom-radio-label foschange">{label}</label>

    <div className="custom-radio-group">
      <label className="radio-option">
        <input
          type="radio"
          value="Yes"
          defaultChecked={false}

          {...form.register(fieldName)}
        />
        <span className="radio-btn foschange">Yes</span>
      </label>

      <label className="radio-option">
        <input
          type="radio"
          value="No"
          defaultChecked={true}
          {...form.register(fieldName)}
        />
        <span className="radio-btn foschange">No</span>
      </label>
    </div>
  </div>
);


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
    <div className="p-6 ios-card card-upgrade">
      <h1 style={{color:'wheat'}} className="text-4xl font-extrabold mb-8 text-center">
        Medical History
      </h1>


      <form onSubmit={form.handleSubmit(handleSubmit)} className="ios-form">
          {yesNoRadio("hypertension", "Hypertension")}
          {yesNoRadio("diabetes", "Diabetes")}
          {yesNoRadio("hyperlipidemia", "Hyperlipidemia")}
          {yesNoRadio("familyHistory", "Family History of Heart Disease")}
          {yesNoRadio("previousHeartAttack", "Previous Heart Attack")}

          <div className="flex justify-between mt-4">
            <button className="ios-btn" onClick={onBack}>← Back</button>
            
            <button className="ios-btn" type="submit">Next Step →</button>
          </div>
        </form>

    </div>
    </motion.div>
  );
}
