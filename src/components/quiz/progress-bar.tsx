"use client";

import { Progress } from "@/components/ui/progress";

interface QuizProgressBarProps {
  current: number;
  total: number;
}

export function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{percentage}% complete</span>
        <span>
          {current} / {total} answered
        </span>
      </div>
    </div>
  );
}
