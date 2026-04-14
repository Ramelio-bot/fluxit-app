"use client";

import { HeroSearch } from "@/components/home/HeroSearch";
import { FeatureGrid } from "@/components/home/FeatureGrid";

export default function Home() {
  return (
    <>
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/10 blur-[150px] rounded-full animate-pulse-slow object-cover" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 blur-[130px] rounded-full animate-pulse-slow object-cover" style={{ animationDelay: '2s' }} />
      </div>

      <HeroSearch />
      <FeatureGrid />
    </>
  );
}
