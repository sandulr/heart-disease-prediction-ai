"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaHeart, FaTachometerAlt, FaTint, FaVial } from "react-icons/fa";
import { JSX } from "react";
import { motion } from "framer-motion";

const schema = z.object({
  systolicBP: z.number().min(50, "Enter valid value").max(250),
  diastolicBP: z.number().min(30, "Enter valid value").max(150),
  heartRate: z.number().min(30, "Enter valid value").max(200),
  fastingBloodSugar: z.number().min(50, "Enter valid value").max(400),
  cholesterolTotal: z.number().min(100, "Enter valid value").max(500),
});



export default function Step4Vitals({ onNext, defaultValues, onBack }: { onNext: (data: any) => void; defaultValues?: any; onBack: () => void }) {
  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      systolicBP: defaultValues?.systolicBP ?? undefined,
      diastolicBP: defaultValues?.diastolicBP ?? undefined,
      heartRate: defaultValues?.heartRate ?? undefined,
      fastingBloodSugar: defaultValues?.fastingBloodSugar ?? undefined,
      cholesterolTotal: defaultValues?.cholesterolTotal ?? undefined,
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log("Step 4 values:", values);
    onNext(values);
  };

  const inputField = <K extends keyof FormValues>(fieldName: K, label: string, icon: JSX.Element, placeholder: string) => (
    <div className="custom-input-wrapper">
  <label style={{fontSize: '19px', marginBottom: '5px'}} className="custom-input-label">
    {icon} {label}
  </label>

  <input
    type="number"
    placeholder={placeholder}
    {...form.register(fieldName as any, { valueAsNumber: true })}
    className="custom-input"
  />

  {form.formState.errors[fieldName] && (
    <p className="custom-error">
      {form.formState.errors[fieldName]?.message as string}
    </p>
  )}
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
    <div className=" ios-card card-upgrade">
      <h1 style={{color:'wheat'}} className="text-4xl font-extrabold mb-8 text-center">
        Vital Signs
      </h1>


      <form onSubmit={form.handleSubmit(handleSubmit)} style={{gap: '15px'}} className="ios-form">
          {inputField("systolicBP", "Systolic Blood Pressure (mmHg)", <FaTachometerAlt />, "e.g. 120")}
          {inputField("diastolicBP", "Diastolic Blood Pressure (mmHg)", <FaTachometerAlt />, "e.g. 80")}
          {inputField("heartRate", "Heart Rate (bpm)", <FaHeart />, "e.g. 75")}
          {inputField("fastingBloodSugar", "Fasting Blood Sugar (mg/dL)", <FaTint />, "e.g. 90")}
          {inputField("cholesterolTotal", "Total Cholesterol (mg/dL)", <FaVial />, "e.g. 180")}

          <div className="flex justify-between mt-4">
            <button className="ios-btn" onClick={onBack}>← Back</button>
            
            <button className="ios-btn" type="submit">Next Step →</button>
          </div>
        </form>

    </div>
    </motion.div>


    
  );
}
