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
    <Card className="h-full flex flex-col justify-between border-brand-accent/20">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-brand-accent/10 text-brand-accent">
            <Zap size={20} />
          </div>
          <h3 className="text-xl font-semibold">Data Speed</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Speed Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as keyof typeof DATA_UNITS)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-brand-accent"
              >
                {Object.keys(DATA_UNITS).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as keyof typeof DATA_UNITS)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-brand-accent"
              >
                {Object.keys(DATA_UNITS).map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-brand-accent/5 p-6 rounded-2xl border border-brand-accent/10 text-center">
        <div className="text-4xl font-mono font-bold text-brand-accent mb-1 truncate">
          {result.toLocaleString(undefined, { maximumFractionDigits: 3 })}
        </div>
        <div className="text-sm text-slate-500 uppercase tracking-widest">{toUnit}</div>
      </div>
    </Card>
  );
};
