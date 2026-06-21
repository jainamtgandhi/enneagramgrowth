"use client";

import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_COLORS } from "@/lib/enneagram/colors";
import { ALL_TYPES } from "@/lib/enneagram/descriptions";
import type { EnneagramType } from "@/lib/enneagram/types";

interface TypeBreakdownProps {
  scores: Record<EnneagramType, number>;
  primaryType: EnneagramType;
}

export function TypeBreakdown({ scores, primaryType }: TypeBreakdownProps) {
  const sortedTypes = ALL_TYPES.slice().sort(
    (a, b) => scores[b] - scores[a]
  );

  return (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold">Score Breakdown</h3>
      {sortedTypes.map((type) => {
        const info = TYPE_INFO[type];
        const score = scores[type];
        const isPrimary = type === primaryType;

        return (
          <div key={type} className="flex items-center gap-3">
            <div className="w-28 flex items-center gap-2 shrink-0">
              <div
                className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: TYPE_COLORS[type] }}
              >
                {type}
              </div>
              <span
                className={`text-sm truncate ${isPrimary ? "font-semibold" : "text-muted-foreground"}`}
              >
                {info.name}
              </span>
            </div>
            <div className="flex-1">
              <div className="h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${score}%`,
                    backgroundColor: TYPE_COLORS[type],
                    opacity: isPrimary ? 1 : 0.6,
                  }}
                />
              </div>
            </div>
            <span className="w-10 text-right text-sm font-mono text-muted-foreground">
              {score}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
