"use client";

import React from "react";
import { Settings2, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface OptionsPanelProps {
  onConvert: () => void;
  isConverting: boolean;
}

export const OptionsPanel = ({ onConvert, isConverting }: OptionsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-6 flex flex-col md:flex-row gap-6 relative z-10"
    >
      <div className="flex-1 antigravity-glass rounded-3xl p-6 border-white/5 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Settings2 size={16} /> Parameters
          </h4>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="text-[10px] uppercase text-slate-500 mb-1 block">Convert To</label>
            <select className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-brand-primary">
              <option>PNG (Lossless)</option>
              <option>JPEG (Compressed)</option>
              <option>AVIF (Next-Gen)</option>
              <option>GIF (Animated)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-[10px] uppercase text-slate-500 mb-1 block">Quality</label>
            <select className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-brand-primary">
              <option>High (100%)</option>
              <option>Medium (80%)</option>
              <option>Low (60%)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={onConvert}
        disabled={isConverting}
        className={`md:w-64 h-[130px] rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-950 font-bold text-xl transition-all relative overflow-hidden group ${isConverting ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-white shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]'}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isConverting ? "Extracting..." : "CONVERT"} <Zap size={20} className={isConverting ? "animate-pulse" : ""} />
        </span>
        
        {!isConverting && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        {isConverting && (
          <div className="absolute bottom-0 left-0 h-1 bg-brand-primary animate-pulse z-0 w-full" />
        )}
      </button>
    </motion.div>
  );
};
