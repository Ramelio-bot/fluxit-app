"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DownloadCloud, CheckCircle2, RefreshCcw, Loader2 } from "lucide-react";
import { antigravityHover } from "@/lib/animations";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";
import { FileItem } from "@/lib/types";
import JSZip from "jszip";

interface ResultsAreaProps {
  files: FileItem[];
  onReset: () => void;
}

export const ResultsArea = ({ files, onReset }: ResultsAreaProps) => {
  const [isZipping, setIsZipping] = useState(false);

  const handleDownload = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      // In a real scenario, the worker sends back blobs. We mock it here.
      files.forEach((f, idx) => {
        // mock content since we don't have real converted blobs
        zip.file(`converted_${f.file.name.split('.')[0]}.${f.formatOut.toLowerCase()}`, `Dummy content for ${f.file.name}`);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Antigravity_Export_${new Date().getTime()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative z-10 mt-10"
    >
      <div className="relative overflow-hidden antigravity-glass rounded-3xl p-12 text-center border-brand-primary/30 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        
        {/* Mock Celebration Particles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-gradient-radial from-brand-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <CheckCircle2 size={40} className="text-brand-primary relative z-10" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-brand-primary rounded-full" 
          />
        </div>

        <h3 className="text-4xl font-bold text-white mb-2">Payload Secure</h3>
        <p className="text-slate-400 mb-10 max-w-md mx-auto">
          Successfully processed {files.length} file{files.length > 1 ? 's' : ''} utilizing distributed edge nodes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div variants={antigravityHover} initial="rest" whileHover="hover">
            <button 
              onClick={handleDownload}
              disabled={isZipping}
              className="px-8 py-4 bg-brand-primary text-slate-950 font-bold rounded-2xl flex items-center gap-3 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] disabled:opacity-70"
            >
              {isZipping ? <Loader2 size={20} className="animate-spin" /> : <DownloadCloud size={20} />}
              {isZipping ? "Packaging ZIP..." : "Download ZIP Package"}
            </button>
          </motion.div>
          
          <button 
            onClick={onReset}
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <RefreshCcw size={18} />
            New Batch
          </button>
        </div>
      </div>

      <div className="w-full mt-4">
        <AdSensePlaceholder className="min-h-[120px] rounded-2xl" slot="results-banner" format="horizontal" />
      </div>
    </motion.div>
  );
};
