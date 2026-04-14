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
        "relative overflow-hidden rounded-2xl antigravity-glass p-6 flex flex-col items-center justify-center min-h-[100px]",
        className
      )}
    >
      <div className="absolute top-2 right-3">
        <span className="text-[9px] uppercase tracking-widest text-slate-500 font-medium">Sponsored</span>
      </div>
      
      <div className="flex flex-col items-center justify-center opacity-30 mt-2">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent mb-2" />
        <span className="text-xs text-slate-400 italic">Ad Slot: {slot}</span>
      </div>
    </div>
  );
};
