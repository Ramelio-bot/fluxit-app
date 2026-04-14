"use client";

import React, { useState, useEffect, use, useRef } from "react";
import { DropZone } from "@/components/converter/DropZone";
import { OptionsPanel } from "@/components/converter/OptionsPanel";
import { ResultsArea } from "@/components/converter/ResultsArea";
import { QueueManager } from "@/components/converter/QueueManager";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";
import { motion, AnimatePresence } from "framer-motion";
import { FileItem, FileStatus, WorkerMessage } from "@/lib/types";

export default function ConverterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const [files, setFiles] = useState<FileItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState("PNG");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  
  // Keep track of active workers to terminate them if reset
  const workersRef = useRef<Worker[]>([]);

  // Calculate Master Progress
  const totalProgress = files.reduce((acc, f) => acc + f.progress, 0);
  const masterProgress = files.length > 0 ? (totalProgress / files.length) : 0;

  useEffect(() => {
    // Check if all files are complete
    if (files.length > 0 && files.every(f => f.status === "success" || f.status === "error")) {
      if (isConverting) {
        setIsConverting(false);
        setConversionComplete(true);
      }
    }
  }, [files, isConverting]);

  // Clean up workers on unmount
  useEffect(() => {
    return () => {
      workersRef.current.forEach(w => w.terminate());
    };
  }, []);

  const handleFilesSelect = (payload: File[]) => {
    const newItems: FileItem[] = payload.map(f => ({
      id: Math.random().toString(36).substring(7),
      file: f,
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
      status: "idle",
      progress: 0,
      formatOut: globalFormat
    }));
    setFiles(prev => [...prev, ...newItems].slice(0, 50)); // Enforce hard cap
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const triggerBatchConversion = () => {
    if (files.length === 0) return;
    setIsConverting(true);

    // Apply global format to all files just before converting
    setFiles(prev => prev.map(f => ({
      ...f, 
      formatOut: globalFormat,
      status: "converting" as FileStatus
    })));

    // Maximum concurrent workers based on hardware concurrency or default 4
    const maxWorkers = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
    
    // We simulate by assigning a worker to each file, relying on browser's internal pooling, 
    // or we explicitly pool. For the mock, we can just spin up a worker per file since it's just setTimeouts.
    files.forEach(f => {
      const worker = new Worker(new URL('../../workers/converter.worker.ts', import.meta.url));
      workersRef.current.push(worker);

      worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
        setFiles(current => current.map(item => {
          if (item.id === e.data.id) {
            return {
              ...item,
              progress: e.data.progress ?? item.progress,
              status: e.data.status ?? item.status
            };
          }
          return item;
        }));

        if (e.data.status === "success" || e.data.status === "error") {
          worker.terminate();
        }
      };

      worker.postMessage({ id: f.id, formatOut: globalFormat, file: f.file });
    });
  };

  const resetPipeline = () => {
    workersRef.current.forEach(w => w.terminate());
    workersRef.current = [];
    files.forEach(f => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setFiles([]);
    setConversionComplete(false);
    setIsConverting(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative flex-1 flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] bg-brand-primary/10 blur-[150px] rounded-[100%]" />
      </div>

      <div className="text-center mb-12 relative z-10 hidden md:block">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h1>
        <p className="text-slate-400">Secure, lightning-fast batch processing engine.</p>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-8 relative z-10 w-full mb-20">
        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {!conversionComplete ? (
              <motion.div
                key="dropzone-flow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col"
              >
                {files.length === 0 ? (
                  <DropZone 
                    onFilesSelect={handleFilesSelect} 
                    disabled={isConverting}
                  />
                ) : (
                  <div className="flex flex-col gap-6 w-full">
                    <QueueManager files={files} onRemoveFn={removeFile} />
                    
                    <div className="flex items-center justify-between mt-4 mb-2 px-2">
                       <button 
                         onClick={() => setFiles([])} 
                         disabled={isConverting}
                         className="text-sm font-medium text-slate-500 hover:text-white transition-colors disabled:opacity-50"
                       >
                         Clear All
                       </button>
                       <button
                         onClick={() => {
                           const input = document.createElement('input');
                           input.type = 'file';
                           input.multiple = true;
                           input.onchange = (e) => {
                             const target = e.target as HTMLInputElement;
                             if (target.files) handleFilesSelect(Array.from(target.files));
                           };
                           input.click();
                         }}
                         disabled={isConverting}
                         className="text-sm font-medium text-brand-primary hover:text-white transition-colors disabled:opacity-50"
                       >
                         + Add More Files
                       </button>
                    </div>

                    <OptionsPanel 
                      onConvert={triggerBatchConversion} 
                      isConverting={isConverting} 
                      masterProgress={masterProgress}
                      globalFormat={globalFormat}
                      setGlobalFormat={setGlobalFormat}
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              <ResultsArea files={files} onReset={resetPipeline} key="results" />
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Ads */}
        <div className="hidden xl:flex flex-col gap-6 w-full max-w-[300px]">
          <AdSensePlaceholder slot="converter-sidebar-1" format="vertical" className="h-[400px]" />
          <AdSensePlaceholder slot="converter-sidebar-2" format="rectangle" className="h-[250px]" />
        </div>
      </div>
    </div>
  );
}
