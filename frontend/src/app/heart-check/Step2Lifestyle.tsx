"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const schema = z.object({
  smoking: z.enum(["Current", "Former", "Never"]),
  alcohol: z.enum(["None", "Low", "Moderate", "High"]),
  activity: z.enum(["Sedentary", "Moderate", "Active"]),
  diet: z.enum(["Unhealthy", "Average", "Healthy"]),
  stress: z.enum(["Low", "Medium", "High"]),
});




export default function Step2Lifestyle({ onNext, defaultValues, onBack }: { onNext: (data: any) => void; defaultValues?: any; onBack: () => void }) {

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      smoking: defaultValues?.smoking ?? "Never",
      alcohol: defaultValues?.alcohol ??  "None",
      activity: defaultValues?.activity ??  "Moderate",
      diet: defaultValues?.diet ??  "Average",
      stress: defaultValues?.stress ??  "Medium",
    },
    
  });

  const handleSubmit = (values: any) => {
    console.log("Step 2 values:", values);
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
        Lifestyle & Habits
      </h1>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="ios-form"
      >
        
        <div className="field">

            <select


          {...form.register("smoking")}


            defaultValue="Never"
              
            className="fancy-select"
            >
              <option value="">Smoking Status</option>
              <option value="Current">Current</option>
              <option value="Former">Former</option>
              <option value="Never">Never</option>
            </select>


          </div>


          <div className="field">

            <select

            {...form.register("alcohol")}
            defaultValue="None"
              
              className="fancy-select"
            >
              <option value="">Alcohol Intake</option>
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>

          </div>


          <div className="field">

            <select

            {...form.register("activity")}
            defaultValue="Moderate"
              
              className="fancy-select"
            >
              <option value="">Physical Activity</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>

          </div>

          <div className="field">

            <select

            {...form.register("diet")}
            defaultValue="Average"
              
              className="fancy-select"
            >
              <option value="">Diet Quality</option>
              <option value="Unhealthy">Unhealthy</option>
              <option value="Average">Average</option>
              <option value="Healthy">Healthy</option>
            </select>
          
          </div>


          <div className="field">

            <select
            {...form.register("stress")}
            defaultValue="Medium"
              
              className="fancy-select"
            >
              <option value="">Stress Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          
          </div>



          <div className="flex justify-between mt-4">
            <button className="ios-btn" onClick={onBack}>← Back</button>
            
            <button className="ios-btn" type="submit">Next Step →</button>
            
          </div>

       
      </form>
    </div>
    </motion.div>



    
  );
}
