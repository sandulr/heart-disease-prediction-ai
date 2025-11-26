"use client";
import { useEffect, MouseEvent } from "react";
import styles from "./RiskModal.module.css";

type RiskType = "low" | "moderate" | "high";

interface RiskModalProps {
  open: boolean;
  type: RiskType;
  onClose: () => void;
}

const riskData: Record<RiskType, { title: string; desc: string }> = {
  low: {
    title: "Low Risk",
    desc: "Your indicators suggest a low risk. Keep maintaining healthy habits like regular activity, balanced meals, and proper rest."
  },
  moderate: {
    title: "Moderate Risk",
    desc: "Your results show a moderate risk. Consider improving your habits and keeping an eye on your health regularly."
  },
  high: {
    title: "High Risk",
    desc: "Your results indicate a higher risk. Consider consulting a qualified health professional for proper evaluation."
  }
};

export default function RiskModal({ open, type, onClose }: RiskModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${styles[type]}`}
        onClick={stopPropagation}
      >
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <h2 className={styles[`title_${type}`]}>{riskData[type].title}</h2>
        <p>{riskData[type].desc}</p>
      </div>
    </div>
  );
}
