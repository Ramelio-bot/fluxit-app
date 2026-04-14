"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { TrendingUp } from "lucide-react";

export const ProfitMarginCalculator = () => {
  const [revenue, setRevenue] = useState<string>("1000");
  const [cost, setCost] = useState<string>("600");

  const rev = parseFloat(revenue) || 0;
  const cst = parseFloat(cost) || 0;
  const profit = rev - cst;
  const margin = rev > 0 ? (profit / rev) * 100 : 0;

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="text-brand-primary">
            <TrendingUp size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-medium text-slate-800">Business Suite</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">Revenue</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-mono text-lg"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">Cost of Goods</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-mono text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest font-medium">Gross Profit</p>
          <p className="text-3xl font-mono text-slate-800">
            ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#D4AF37]/5 p-6 rounded-2xl border border-[#D4AF37]/20">
          <p className="text-xs text-brand-primary mb-2 uppercase tracking-widest font-medium">Margin</p>
          <p className="text-3xl font-mono text-brand-primary">
            {margin.toFixed(1)}%
          </p>
        </div>
      </div>
    </Card>
  );
};
