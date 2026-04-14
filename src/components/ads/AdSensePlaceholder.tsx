import React from "react";
import { cn } from "@/lib/utils";

interface AdSensePlaceholderProps {
  className?: string;
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
}

export const AdSensePlaceholder = ({
  className,
  slot = "xxxxxxxxxx",
  format = "auto",
}: AdSensePlaceholderProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-1 flex items-center justify-center min-h-[100px]",
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Advertisement</span>
        <div className="w-12 h-px bg-slate-700" />
      </div>
      
      {/* Actual AdSense script container would go here */}
      <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px] italic">
        Ad Slot: {slot}
      </div>
      
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 rounded-full bg-slate-800" />
        <div className="w-1 h-1 rounded-full bg-slate-800" />
      </div>
    </div>
  );
};
