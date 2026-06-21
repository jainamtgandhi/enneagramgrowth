"use client";

import { QUIZ_CONFIG } from "@/lib/quiz/constants";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-2">
        {QUIZ_CONFIG.likertLabels.map((label, index) => {
          const likertValue = index + 1;
          const isSelected = value === likertValue;

          return (
            <button
              key={likertValue}
              type="button"
              onClick={() => onChange(likertValue)}
              className={cn(
                "flex-1 rounded-xl border-2 py-3 px-2 text-xs sm:text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground scale-105 shadow-md"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-0.5">{likertValue}</div>
                <div className="hidden sm:block leading-tight">{label}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground sm:hidden px-1">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
}
