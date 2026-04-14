import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full mt-32 py-12 border-t border-white/5 relative z-10 antigravity-glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gradient-radial from-brand-primary to-brand-secondary opacity-80" />
          <p className="text-sm font-medium tracking-[0.2em] text-slate-400">
            © 2026 ANTIGRAVITY
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors">Terms of Service</Link>
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors">API Access</Link>
          <Link href="#" className="text-sm font-medium text-slate-400 hover:text-brand-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
};
