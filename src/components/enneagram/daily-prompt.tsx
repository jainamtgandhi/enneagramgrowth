"use client";

import { useMyType } from "@/contexts/my-type-context";
import { getDailyPrompt } from "@/lib/enneagram/daily-prompts";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";

export function DailyPrompt() {
  const { myType } = useMyType();
  const prompt = getDailyPrompt(myType);

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
        {myType
          ? `Today's reflection for Type ${myType}: ${TYPE_INFO[myType].name}`
          : "Today's reflection"}
      </p>
      <p className="font-serif text-h4 font-medium text-ink leading-relaxed">
        {prompt}
      </p>
    </div>
  );
}
