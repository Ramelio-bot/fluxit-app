"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, File, X } from "lucide-react";
import { antigravityHover } from "@/lib/animations";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export const DropZone = ({ onFileSelect, selectedFile, onClear }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <motion.div
      variants={antigravityHover}
      initial="rest"
      whileHover={!selectedFile ? "hover" : "rest"}
      className="w-full max-w-4xl mx-auto z-10 relative"
    >
      <div 
        className={`relative overflow-hidden antigravity-glass rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center transition-all duration-300 border-2 border-dashed ${isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-white/10'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6 text-brand-primary">
                <UploadCloud size={48} strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Select File</h3>
              <p className="text-slate-400 mb-8 max-w-md">Drag and drop your file here, or click to browse. Real-time conversion powered by Antigravity edge nodes.</p>
              
              <input type="file" ref={inputRef} onChange={handleChange} className="hidden" />
              <button 
                onClick={() => inputRef.current?.click()}
                className="px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-brand-primary hover:text-slate-900 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                Browse Files
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full flex flex-col items-center justify-center text-center"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-slate-800 flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                  <File size={48} className="text-brand-secondary" />
                </div>
                <button 
                  onClick={onClear}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-slate-700 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white truncate max-w-sm mb-2">{selectedFile.name}</h3>
              <p className="text-amber-400 text-sm tracking-widest font-mono uppercase">
                Ready for extraction
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
