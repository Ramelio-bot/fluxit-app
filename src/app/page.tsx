"use client";

import { BentoGrid, BentoGridItem } from "@/components/layout/BentoGrid";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { ProfitMarginCalculator } from "@/components/tools/ProfitMarginCalculator";
import { DataSpeedConverter } from "@/components/tools/DataSpeedConverter";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Hexagon, Cpu, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-800 selection:bg-brand-primary/20">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 md:py-24">
        {/* Hero Section */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4">
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm"
              >
                <Hexagon className="text-brand-primary" size={24} strokeWidth={1.5} />
              </motion.div>
              <h1 className="text-5xl font-medium tracking-tight text-slate-800">Flux-Lab</h1>
            </div>
            {/* Description text removed as per style guide */}
          </motion.div>
        </header>

        {/* Bento Grid */}
        <BentoGrid>
          {/* Main Tool: Universal Converter */}
          <BentoGridItem className="md:col-span-2 md:row-span-2">
            <UnitConverter />
          </BentoGridItem>

          {/* Tool: Business Suite */}
          <BentoGridItem className="md:col-span-2">
            <ProfitMarginCalculator />
          </BentoGridItem>

          {/* Tool: Digital Lab */}
          <BentoGridItem className="md:col-span-1">
            <DataSpeedConverter />
          </BentoGridItem>

          {/* Ad Slot: Square */}
          <BentoGridItem className="md:col-span-1">
            <AdSensePlaceholder className="h-full min-h-[300px]" slot="unit-top-right" />
          </BentoGridItem>

          {/* Small Feature Card */}
          <BentoGridItem className="md:col-span-1">
            <Card className="h-full flex flex-col justify-center items-center text-center" delay={0.3}>
              <Cpu className="text-slate-300 mb-6" size={40} strokeWidth={1} />
              <h4 className="text-sm font-medium uppercase tracking-widest text-slate-800 mb-2">Engine</h4>
            </Card>
          </BentoGridItem>

          {/* Ad Slot: Horizontal wide */}
          <BentoGridItem className="md:col-span-2">
            <AdSensePlaceholder className="h-full min-h-[150px]" slot="footer-banner" format="horizontal" />
          </BentoGridItem>
          
          {/* Pro Card */}
          <BentoGridItem className="md:col-span-1">
            <Card className="h-full flex flex-col justify-between group" delay={0.4}>
              <div>
                <h4 className="text-slate-800 font-medium text-lg flex items-center justify-between">
                  PRO
                  <ArrowUpRight size={20} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h4>
              </div>
              <button className="mt-8 w-full py-4 bg-slate-800 text-white text-sm font-medium rounded-xl hover:bg-brand-primary transition-colors">
                Upgrade
              </button>
            </Card>
          </BentoGridItem>
        </BentoGrid>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-slate-200 rounded flex items-center justify-center text-xs font-medium text-slate-400">F</div>
            <p className="text-xs text-slate-400 uppercase tracking-widest">© 2026 FLUX-LAB. ALL RIGHTS RESERVED.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-xs text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="text-xs text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">API</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
