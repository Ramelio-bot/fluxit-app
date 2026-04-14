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
        "relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 flex items-center justify-center min-h-[100px] m-4",
        className
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-medium">Advertisement</span>
        <div className="w-12 h-px bg-slate-200" />
      </div>
      
      {/* Actual AdSense script container would go here */}
      <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] italic">
        Ad Slot: {slot}
      </div>
      
      <div className="absolute top-4 right-4 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
      </div>
    </div>
  );
};
