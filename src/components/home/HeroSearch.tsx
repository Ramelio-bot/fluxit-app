"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { antigravityHover } from "@/lib/animations";

export const HeroSearch = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    { text: "webp to png", category: "Image" },
    { text: "mp4 to gif", category: "Video" },
    { text: "pdf to word", category: "Document" },
    { text: "kg to lbs", category: "Utility" }
  ];

  const filtered = suggestions.filter(s => s.text.includes(query.toLowerCase()));

  return (
    <section className="relative w-full max-w-4xl mx-auto pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="px-4 py-1.5 rounded-full antigravity-glass text-xs font-semibold text-brand-primary tracking-widest uppercase mb-6 inline-block">
          The Ultimate File Utility
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
          Convert Anything. <br />
          <span className="text-gradient">Defy Limits.</span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
          Drag, drop, and transform files instantly on the edge. High-fidelity conversion powered by Antigravity engine.
        </p>
      </motion.div>

      {/* Omni-search Bar */}
      <motion.div
        variants={antigravityHover}
        initial="rest"
        whileHover="hover"
        className="relative w-full max-w-3xl z-30"
      >
        <div className={`relative rounded-3xl transition-all duration-500 ${isFocused ? 'shadow-[0_0_40px_rgba(0,240,255,0.2)]' : 'shadow-2xl'}`}>
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-brand-primary' : 'text-slate-500'}`} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Type 'webp to png' or search tools..."
            className="w-full antigravity-glass bg-slate-900/60 rounded-3xl py-6 pl-16 pr-6 text-xl text-white placeholder-slate-500 focus:outline-none border border-white/10 focus:border-brand-primary/50 transition-all font-medium"
          />
          <button className="absolute inset-y-2 right-2 px-6 antigravity-glass bg-white/5 hover:bg-brand-primary hover:text-slate-900 hover:border-brand-primary rounded-2xl flex items-center gap-2 transition-all font-semibold">
            <span>Convert</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Suggestion Dropdown */}
        <AnimatePresence>
          {isFocused && query.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-full left-0 right-0 mt-4 antigravity-glass rounded-2xl overflow-hidden p-2 text-left"
            >
              {filtered.length > 0 ? (
                filtered.map((s, idx) => (
                  <Link href={`/${s.text.replace(/\s+/g, "-")}`} key={idx}>
                    <div className="px-4 py-3 rounded-xl flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group">
                      <div className="flex items-center gap-3">
                        <Zap size={16} className="text-slate-500 group-hover:text-brand-secondary transition-colors" />
                        <span className="text-white text-lg font-medium">{s.text}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">{s.category}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-slate-500">
                  No explicit converter found. Press enter to search all tools.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
