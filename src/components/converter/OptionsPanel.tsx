"use client";

import React from "react";
import { Settings2, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface OptionsPanelProps {
  onConvert: () => void;
  isConverting: boolean;
  masterProgress: number;
  globalFormat: string;
  setGlobalFormat: (fmt: string) => void;
}

export const OptionsPanel = ({ onConvert, isConverting, masterProgress, globalFormat, setGlobalFormat }: OptionsPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-6 flex flex-col md:flex-row gap-4 relative z-10"
    >
      <div className="flex-1 antigravity-glass rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex items-center gap-2">
          <Settings2 size={16} className="text-slate-400" />
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Global Control
          </h4>
        </div>
        
        <div className="flex-1 w-full flex items-center gap-4">
          <label className="text-xs uppercase text-slate-500 whitespace-nowrap hidden sm:block">Apply to All:</label>
          <select 
            value={globalFormat}
            onChange={(e) => setGlobalFormat(e.target.value)}
            disabled={isConverting}
            className="w-full sm:max-w-xs bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-brand-primary disabled:opacity-50"
          >
            <option value="PNG">PNG (Lossless)</option>
            <option value="JPEG">JPEG (Compressed)</option>
            <option value="AVIF">AVIF (Next-Gen)</option>
            <option value="GIF">GIF (Animated)</option>
          </select>
        </div>
        
        {/* Master Progress Bar */}
        {isConverting && (
          <div className="w-full sm:max-w-[200px] flex flex-col items-end gap-1">
            <span className="text-xs font-mono text-brand-primary">{Math.round(masterProgress)}%</span>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300" 
                style={{ width: `${masterProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onConvert}
        disabled={isConverting}
        className={`md:w-56 h-[90px] rounded-2xl flex items-center justify-center gap-2 text-slate-950 font-bold text-lg transition-all relative overflow-hidden group ${isConverting ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-white shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]'}`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isConverting ? "Extracting..." : "BATCH CONVERT"} <Zap size={18} className={isConverting ? "animate-pulse" : ""} />
        </span>
        
        {!isConverting && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    </motion.div>
  );
};
