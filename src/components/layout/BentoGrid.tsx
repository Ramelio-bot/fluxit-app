import React from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("row-span-1 col-span-1", className)}>
      {children}
    </div>
  );
};
