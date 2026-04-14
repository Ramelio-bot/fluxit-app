"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileItem } from "@/lib/types";
import { File, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

interface QueueManagerProps {
  files: FileItem[];
  onRemoveFn?: (id: string) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export const QueueManager = ({ files, onRemoveFn }: QueueManagerProps) => {
  if (files.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Queue Layout</h4>
        <span className="text-xs text-brand-primary">{files.length} payload(s) loaded</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {files.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
              className="antigravity-glass rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group border border-white/5"
            >
              <div className="relative w-12 h-12 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {item.previewUrl ? (
                  <img src={item.previewUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <File size={20} className="text-brand-secondary" />
                )}
                
                {/* Circular Progress Overlay */}
                {item.status === 'converting' && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8 transform -rotate-90">
                      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-slate-700" />
                      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="88" strokeDashoffset={88 - (88 * item.progress) / 100} className="text-brand-primary transition-all duration-300" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <p className="text-sm text-white font-medium truncate">{item.file.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 uppercase">{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span className="text-[10px] text-brand-secondary px-1.5 py-0.5 rounded bg-brand-secondary/10 uppercase">TO {item.formatOut}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {item.status === 'idle' && onRemoveFn && (
                  <button onClick={() => onRemoveFn(item.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                )}
                {item.status === 'converting' && <Loader2 size={16} className="text-brand-primary animate-spin" />}
                {item.status === 'success' && <CheckCircle2 size={16} className="text-green-400" />}
                {item.status === 'error' && <AlertCircle size={16} className="text-red-400" />}
              </div>

              {/* Success background glow */}
              {item.status === 'success' && (
                <div className="absolute inset-0 bg-green-400/5 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
