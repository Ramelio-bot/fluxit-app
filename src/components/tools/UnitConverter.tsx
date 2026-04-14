"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Ruler } from "lucide-react";
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
        <div className="flex items-center gap-3 mb-8">
          <div className="text-brand-primary">
            <Ruler size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-medium text-slate-800">Unit Converter</h3>
        </div>

        <div className="flex gap-2 mb-8 p-1 bg-slate-50 rounded-xl border border-slate-100">
          {(["length", "mass", "temp"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg transition-all text-sm capitalize font-medium",
                category === cat
                  ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
              >
                {category === "temp"
                  ? ["C", "F", "K"].map((u) => <option key={u}>{u}</option>)
                  : Object.keys(UNITS[category]).map((u) => (
                      <option key={u}>{u}</option>
                    ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-medium">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none"
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

      <div className="mt-10 pt-8 border-t border-slate-100">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-medium">Result</p>
        <div className="text-4xl font-mono text-slate-800 truncate">
          {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
          <span className="text-xl text-slate-400 font-sans">{toUnit}</span>
        </div>
      </div>
    </Card>
  );
};
