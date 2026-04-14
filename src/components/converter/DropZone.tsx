"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { antigravityHover } from "@/lib/animations";

interface DropZoneProps {
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}

const MAX_FILES = 50;
const MAX_BYTES = 500 * 1024 * 1024; // 500MB

export const DropZone = ({ onFilesSelect, disabled = false }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incomingFiles = Array.from(fileList);
    
    if (incomingFiles.length > MAX_FILES) {
      setErrorMsg(`Maximum ${MAX_FILES} files allowed at once.`);
      return;
    }

    const totalSize = incomingFiles.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > MAX_BYTES) {
      setErrorMsg("Total payload exceeds 500MB limit.");
      return;
    }

    setErrorMsg(null);
    onFilesSelect(incomingFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    processFiles(e.target.files);
    // Reset so same file can be uploaded again if cleared
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <motion.div
      variants={antigravityHover}
      initial="rest"
      whileHover={typeof disabled === 'undefined' || !disabled ? "hover" : "rest"}
      className="w-full max-w-4xl mx-auto z-10 relative"
    >
      <div 
        className={`relative overflow-hidden antigravity-glass rounded-3xl p-12 min-h-[300px] flex flex-col items-center justify-center transition-all duration-300 border-2 border-dashed ${isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-white/10'} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <motion.div 
          key="upload"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center w-full"
        >
          <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mb-6 text-brand-primary">
            <UploadCloud size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Drop Batch Payload</h3>
          <p className="text-slate-400 mb-2 max-w-md">Drag up to 50 files here or click to browse.</p>
          <p className="text-xs text-brand-secondary/60 mb-6 uppercase tracking-widest font-mono">Max Payload: 500MB</p>
          
          <input 
            type="file" 
            ref={inputRef} 
            onChange={handleChange} 
            className="hidden" 
            multiple 
          />
          <button 
            onClick={() => inputRef.current?.click()}
            className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-brand-primary hover:text-slate-900 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
          >
            Select Batch
          </button>

          {errorMsg && (
            <p className="mt-6 text-red-400 text-sm font-medium bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">{errorMsg}</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
