"use client";

import { BentoGrid, BentoGridItem } from "@/components/layout/BentoGrid";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { ProfitMarginCalculator } from "@/components/tools/ProfitMarginCalculator";
import { DataSpeedConverter } from "@/components/tools/DataSpeedConverter";
import { AdSensePlaceholder } from "@/components/ads/AdSensePlaceholder";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Info, LayoutGrid, Cpu, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-brand-primary/30">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <LayoutGrid className="text-white" size={20} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white">FLUX<span className="text-brand-primary">IT</span></h1>
            </div>
            <p className="text-slate-400 max-w-md text-lg leading-relaxed">
              Ultra-minimalist utility suite for precise conversions and professional calculations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="text-right hidden md:block">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Status</p>
              <p className="text-sm text-brand-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                Live Engine v1.0
              </p>
            </div>
          </motion.div>
        </header>

        {/* Bento Grid */}
        <BentoGrid>
          {/* Main Tool: Unit Converter */}
          <BentoGridItem className="md:col-span-2 md:row-span-2">
            <UnitConverter />
          </BentoGridItem>

          {/* Tool: Profit Margin */}
          <BentoGridItem className="md:col-span-2">
            <ProfitMarginCalculator />
          </BentoGridItem>

          {/* Tool: Data Speed */}
          <BentoGridItem className="md:col-span-1">
            <DataSpeedConverter />
          </BentoGridItem>

          {/* Ad Slot: Square */}
          <BentoGridItem className="md:col-span-1">
            <AdSensePlaceholder className="h-full" slot="unit-top-right" />
          </BentoGridItem>

          {/* Small Feature Card */}
          <BentoGridItem className="md:col-span-1">
            <Card className="h-full flex flex-col justify-center items-center text-center border-white/5" delay={0.3}>
              <Cpu className="text-slate-500 mb-4" size={32} />
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Engine</h4>
              <p className="text-xs text-slate-500 px-4">Instant edge processing for micro-second precision.</p>
            </Card>
          </BentoGridItem>

          {/* Ad Slot: Horizontal wide */}
          <BentoGridItem className="md:col-span-2">
            <AdSensePlaceholder className="h-full" slot="footer-banner" format="horizontal" />
          </BentoGridItem>
          
          {/* Pro Card */}
          <BentoGridItem className="md:col-span-1">
            <Card className="h-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border-brand-primary/30 flex flex-col justify-between group" delay={0.4}>
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  FLUXIT PRO
                  <ArrowUpRight size={14} className="text-brand-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h4>
                <p className="text-xs text-slate-400">Unlock advanced financial modelling and unlimited API requests.</p>
              </div>
              <button className="mt-4 w-full py-2 bg-white text-slate-950 text-xs font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-colors">
                Upgrade Now
              </button>
            </Card>
          </BentoGridItem>
        </BentoGrid>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold text-white">F</div>
            <p className="text-xs text-slate-500">© 2026 FLUXIT UTILITY SUITE. ALL RIGHTS RESERVED.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-xs text-slate-500 hover:text-brand-primary transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-brand-primary transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="text-xs text-slate-500 hover:text-brand-primary transition-colors uppercase tracking-widest">API</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
