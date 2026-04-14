"use client";

import React from "react";
import { motion } from "framer-motion";
import { DownloadCloud, CheckCircle2, RefreshCcw } from "lucide-react";
import { antigravityHover } from "@/lib/animations";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";

interface ResultsAreaProps {
  originalFile: File;
  onReset: () => void;
}

export const ResultsArea = ({ originalFile, onReset }: ResultsAreaProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative z-10"
    >
      <div className="relative overflow-hidden antigravity-glass rounded-3xl p-12 text-center border-brand-primary/30 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        
        {/* Mock Celebration Particles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-radial from-brand-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-brand-primary" />
        </div>

        <h3 className="text-3xl font-bold text-white mb-2">Conversion Successful</h3>
        <p className="text-slate-400 mb-10 max-w-sm mx-auto">
          {originalFile.name} was successfully processed by the Antigravity engine.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div variants={antigravityHover} initial="rest" whileHover="hover">
            <button className="px-8 py-4 bg-brand-primary text-slate-950 font-bold rounded-2xl flex items-center gap-3 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <DownloadCloud size={20} />
              Download File
            </button>
          </motion.div>
          
          <button 
            onClick={onReset}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <RefreshCcw size={18} />
            Convert Another
          </button>
        </div>
      </div>

      <div className="w-full mt-4">
        <AdSensePlaceholder className="min-h-[120px] rounded-2xl" slot="results-banner" format="horizontal" />
      </div>
    </motion.div>
  );
};
