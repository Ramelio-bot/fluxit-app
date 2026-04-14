"use client";

import React, { useState, useEffect, use } from "react";
import { DropZone } from "@/components/converter/DropZone";
import { OptionsPanel } from "@/components/converter/OptionsPanel";
import { ResultsArea } from "@/components/converter/ResultsArea";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";
import { motion, AnimatePresence } from "framer-motion";

export default function ConverterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Format the title from the slug (e.g. webp-converter -> WebP Converter)
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);

  // Mock conversion process
  const triggerConversion = () => {
    setIsConverting(true);
    // Simulate a 3-second network/edge conversion delay
    setTimeout(() => {
      setIsConverting(false);
      setConversionComplete(true);
    }, 3000);
  };

  const resetPipeline = () => {
    setSelectedFile(null);
    setConversionComplete(false);
    setIsConverting(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative flex-1 flex flex-col">
      {/* Background Glows Specific to converters */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] bg-brand-primary/10 blur-[150px] rounded-[100%]" />
      </div>

      <div className="text-center mb-12 relative z-10 hidden md:block">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h1>
        <p className="text-slate-400">Secure, lightning-fast edge conversion.</p>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row gap-8 relative z-10 w-full mb-20">
        
        {/* Main Interface Content */}
        <div className="flex-1 flex flex-col justify-center max-w-5xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {!conversionComplete ? (
              <motion.div
                key="dropzone-flow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col"
              >
                <DropZone 
                  selectedFile={selectedFile} 
                  onFileSelect={(file) => setSelectedFile(file)} 
                  onClear={resetPipeline}
                />
                
                <AnimatePresence>
                  {selectedFile && (
                    <OptionsPanel onConvert={triggerConversion} isConverting={isConverting} />
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <ResultsArea originalFile={selectedFile!} onReset={resetPipeline} key="results" />
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
