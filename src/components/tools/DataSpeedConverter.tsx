"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Zap } from "lucide-react";

const DATA_UNITS = {
  bps: 1,
  Kbps: 1000,
  Mbps: 1000000,
  Gbps: 1000000000,
  "B/s": 8,
  "KB/s": 8000,
  "MB/s": 8000000,
  "GB/s": 8000000000,
};

export const DataSpeedConverter = () => {
  const [value, setValue] = useState<string>("100");
  const [fromUnit, setFromUnit] = useState<keyof typeof DATA_UNITS>("Mbps");
  const [toUnit, setToUnit] = useState<keyof typeof DATA_UNITS>("MB/s");
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const val = parseFloat(value) || 0;
    const bits = val * DATA_UNITS[fromUnit];
    const res = bits / DATA_UNITS[toUnit];
    setResult(res);
  }, [value, fromUnit, toUnit]);

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="text-brand-primary">
            <Zap size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-medium text-slate-800">Digital Lab</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">Speed Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-mono text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as keyof typeof DATA_UNITS)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                {Object.keys(DATA_UNITS).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as keyof typeof DATA_UNITS)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                {Object.keys(DATA_UNITS).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
        <div className="text-5xl font-mono text-slate-800 mb-2 truncate">
          {result.toLocaleString(undefined, { maximumFractionDigits: 3 })}
        </div>
        <div className="text-sm font-medium text-brand-primary uppercase tracking-widest">{toUnit}</div>
      </div>
    </Card>
  );
};
