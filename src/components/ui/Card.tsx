"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Card = ({ children, className, delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bg-white p-10 rounded-3xl overflow-hidden relative group border border-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
