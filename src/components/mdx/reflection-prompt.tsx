"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ReflectionOption {
  label: string;
  insight: string;
}

interface ReflectionPromptProps {
  question: string;
  labels: string;
  insights: string;
  options?: ReflectionOption[];
}

export function ReflectionPrompt({ question, labels, insights, options: directOptions }: ReflectionPromptProps) {
  const options: ReflectionOption[] = directOptions ?? labels.split("|").map((label, i) => ({
    label: label.trim(),
    insight: (insights?.split("|") ?? [])[i]?.trim() ?? "",
  }));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  /* Scroll the insight into view when revealed */
  useEffect(() => {
    if (selectedIndex !== null && insightRef.current) {
      insightRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIndex]);

  const isAnswered = selectedIndex !== null;
  const selectedOption = isAnswered ? options[selectedIndex] : null;

  return (
    <div
      className="my-8 rounded-xl border border-border bg-surface-sunken p-5 sm:p-6"
      role="region"
      aria-label="Reflection prompt"
    >
      {/* Header */}
      <p className="text-small font-semibold uppercase tracking-wide text-brand mb-2">
        Reflect
      </p>

      {/* Question */}
      <p className="text-body font-medium text-ink mb-4">
        {question}
      </p>

      {/* Options */}
      <div
        className="flex flex-wrap gap-2 mb-2"
        role="radiogroup"
        aria-label={question}
      >
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isFaded = isAnswered && !isSelected;

          return (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(index)}
              disabled={isAnswered}
              className={cn(
                "rounded-full border px-4 py-2 text-ui font-medium transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                "focus-visible:outline-none",
                isSelected
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-paper text-ink hover:border-brand hover:text-brand",
                isFaded && "opacity-40 cursor-default"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Insight reveal */}
      <div
        ref={insightRef}
        className={cn(
          "grid transition-all duration-300 ease-out",
          isAnswered ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
        aria-live="polite"
      >
        <div className="overflow-hidden">
          {selectedOption && (
            <div className="rounded-lg bg-brand-soft/50 p-4">
              <p className="text-body text-ink leading-relaxed">
                {selectedOption.insight}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reset button */}
      {isAnswered && (
        <button
          type="button"
          onClick={handleReset}
          className={cn(
            "mt-3 text-small font-medium text-ink-muted",
            "hover:text-ink transition-colors",
            "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
            "focus-visible:outline-none rounded"
          )}
        >
          Reset
        </button>
      )}
    </div>
  );
}
