"use client";

import { useVisited } from "@/hooks/use-visited";

interface ProgressTrackerProps {
  totalLessons: number;
  lessonSlugs: string[];
}

export function ProgressTracker({
  totalLessons,
  lessonSlugs,
}: ProgressTrackerProps) {
  const { isVisited } = useVisited();
  const completedLessons = lessonSlugs.filter((slug) =>
    isVisited(`/learn/${slug}`)
  ).length;
  const percentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="rounded-xl bg-surface-sunken/30 p-4">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-ui font-medium text-ink">
          {completedLessons} of {totalLessons} lessons
        </span>
        {completedLessons === totalLessons && totalLessons > 0 && (
          <span className="text-small font-medium text-brand">
            All complete!
          </span>
        )}
      </div>

      <div
        className="h-2 w-full rounded-full bg-border/40 overflow-hidden"
        role="progressbar"
        aria-valuenow={completedLessons}
        aria-valuemin={0}
        aria-valuemax={totalLessons}
        aria-label={`${completedLessons} of ${totalLessons} lessons completed`}
      >
        <div
          className="h-full rounded-full bg-brand transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
