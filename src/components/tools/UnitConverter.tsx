"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Scale, Ruler, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "length" | "mass" | "temp";

const UNITS = {
  length: {
    m: 1,
    km: 1000,
    mile: 1609.34,
    foot: 0.3048,
    inch: 0.0254,
  },
  mass: {
    g: 1,
    kg: 1000,
    lb: 453.592,
    oz: 28.3495,
  },
};

export const UnitConverter = () => {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("km");
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit, category]);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(0);
      return;
    }

    if (category === "temp") {
      let celsius = val;
      if (fromUnit === "F") celsius = (val - 32) * (5 / 9);
      if (fromUnit === "K") celsius = val - 273.15;

      let res = celsius;
      if (toUnit === "F") res = celsius * (9 / 5) + 32;
      if (toUnit === "K") res = celsius + 273.15;
      setResult(res);
    } else {
      const units = UNITS[category];
      const baseValue = val * units[fromUnit as keyof typeof units];
      const res = baseValue / units[toUnit as keyof typeof units];
      setResult(res);
    }
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    if (cat === "length") {
      setFromUnit("m");
      setToUnit("km");
    } else if (cat === "mass") {
      setFromUnit("kg");
      setToUnit("g");
    } else {
      setFromUnit("C");
      setToUnit("F");
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
            <Ruler size={20} />
          </div>
          <h3 className="text-xl font-semibold">Unit Converter</h3>
        </div>

        <div className="flex gap-2 mb-6 bg-slate-900/50 p-1 rounded-2xl border border-white/5">
          {(["length", "mass", "temp"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "flex-1 py-2 px-3 rounded-xl transition-all text-sm capitalize",
                category === cat
                  ? "bg-brand-primary text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
              placeholder="Enter value"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-brand-primary"
              >
                {category === "temp"
                  ? ["C", "F", "K"].map((u) => <option key={u}>{u}</option>)
                  : Object.keys(UNITS[category]).map((u) => (
                      <option key={u}>{u}</option>
                    ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-brand-primary"
              >
                {category === "temp"
                  ? ["C", "F", "K"].map((u) => <option key={u}>{u}</option>)
                  : Object.keys(UNITS[category]).map((u) => (
                      <option key={u}>{u}</option>
                    ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-xs text-slate-500 mb-1">Result</p>
        <div className="text-3xl font-mono font-bold text-brand-primary truncate">
          {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
          <span className="text-base text-slate-400 font-sans">{toUnit}</span>
        </div>
      </div>
    </Card>
  );
};
