"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";


const FormSchema = z.object({
  age: z.number().min(1, "Age is required").max(120, "Enter a valid age"),
  gender: z.string().nonempty("Gender is required"),
  height: z.number().min(50, "Enter a valid height"),
  weight: z.number().min(20, "Enter a valid weight"),
});


interface Step1Props {
  onNext: (data: any) => void;
  defaultValues?: any;
}
export default function Step1Personal({ onNext, defaultValues }: { onNext: (data: any) => void; defaultValues?: any; }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      age: defaultValues?.age ?? undefined,
      gender: defaultValues?.gender ?? "",
      height: defaultValues?.height ?? undefined,
      weight: defaultValues?.weight ?? undefined,
    },
  });

  const handleSubmit = (values: any) => {
    console.log("Step 1 values:", values);
    onNext(values);
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
    <div className="p-6 ios-card card-upgrade">
      <h1 style={{color:'wheat'}} className="text-4xl font-extrabold mb-8 text-center">
        Personal Details
      </h1>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="ios-form"
      >
        <div className="field">
            <input
            type="number"
            {...form.register("age", { valueAsNumber: true })}
            
          />
            <label>Age</label>
          </div>

        <div className="field">
           <div className="select-arrow">
            <select
              {...form.register("gender")}
              
              className="fancy-select w-full px-3 py-2 mt-1 rounded-xl
           bg-white/10 backdrop-blur-xl
           border border-white/20
           text-white placeholder-white/50
           focus:border-pink-300 focus:ring-2 focus:ring-pink-300/40
           transition-all cursor-pointer">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            </div>
          </div>


        <div className="field">
            <input
            type="number"
            {...form.register("height", { valueAsNumber: true })}
            
            className="fancy-input"
          />
            <label>Height</label>
          </div>
        

        <div className="field">
            <input
            type="number"
            {...form.register("weight", { valueAsNumber: true })}
            
            className="fancy-input"
          />
            <label>Weight</label>
          </div>


        <div className="md:col-span-2 mt-8">
          
          <button className="ios-btn" type="submit">Next Step →</button>


        </div>
      </form>
    </div>
    </motion.div>
  );
}
