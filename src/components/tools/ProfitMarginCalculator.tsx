"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { TrendingUp, DollarSign } from "lucide-react";

export const ProfitMarginCalculator = () => {
  const [revenue, setRevenue] = useState<string>("1000");
  const [cost, setCost] = useState<string>("600");
  const [profit, setProfit] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);

  useEffect(() => {
    const rev = parseFloat(revenue) || 0;
    const cst = parseFloat(cost) || 0;
    const prof = rev - cst;
    const marg = rev > 0 ? (prof / rev) * 100 : 0;

    setProfit(prof);
    setMargin(marg);
  }, [revenue, cost]);

  return (
    <Card className="h-full flex flex-col justify-between border-brand-secondary/20">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-brand-secondary/10 text-brand-secondary">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-xl font-semibold">Profit Margin</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1 block uppercase tracking-wider">Revenue</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-secondary transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-1 block uppercase tracking-wider">Cost of Goods</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand-secondary transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">Gross Profit</p>
          <p className="text-2xl font-mono font-bold text-white">
            ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-brand-secondary/10 p-4 rounded-2xl border border-brand-secondary/20">
          <p className="text-[10px] text-brand-secondary/60 mb-1 uppercase tracking-widest font-bold">Margin</p>
          <p className="text-2xl font-mono font-bold text-brand-secondary">
            {margin.toFixed(1)}%
          </p>
        </div>
      </div>
    </Card>
  );
};
