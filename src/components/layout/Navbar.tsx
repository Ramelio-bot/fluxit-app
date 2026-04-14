"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // In a real app we'd attach a scroll listener to set isScrolled
  // For now, it stays transparent at top

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "antigravity-glass py-3 border-b border-white/5" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full bg-gradient-radial from-brand-primary to-brand-secondary shadow-[0_0_15px_rgba(0,240,255,0.6)]"
          />
          <span className="text-xl font-bold tracking-[0.2em] text-white group-hover:text-brand-primary transition-colors">
            ANTIGRAVITY
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative group cursor-pointer flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            <div className="absolute top-full pt-4 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="antigravity-glass rounded-xl p-4 w-48 flex flex-col gap-2">
                <Link href="#" className="text-sm text-slate-300 hover:text-brand-primary">Media Studio</Link>
                <Link href="#" className="text-sm text-slate-300 hover:text-brand-primary">Document Suite</Link>
                <Link href="#" className="text-sm text-slate-300 hover:text-brand-primary">Precision Lab</Link>
              </div>
            </div>
          </div>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Blog</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full antigravity-glass text-sm font-medium text-slate-300 hover:text-white hover:border-brand-primary/50 transition-all">
            <Search size={16} className="text-brand-primary" />
            <span>Search tools...</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 ml-2">⌘K</span>
          </button>
          
          <Link href="#" className="hidden sm:block text-sm font-medium text-white hover:text-brand-primary transition-colors">
            Login
          </Link>
          
          <button className="sm:hidden text-white">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </nav>
  );
};
