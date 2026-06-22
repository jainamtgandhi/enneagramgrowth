"use client";

/* ------------------------------------------------------------------ */
/*  Learn Progress Tracker                                             */
/*                                                                     */
/*  Skeleton version: hardcodes 0 visited lessons.                     */
/*  Sprint 4 will add localStorage / Supabase persistence.             */
/* ------------------------------------------------------------------ */

interface ProgressTrackerProps {
  /** Total number of lessons in the learn path. */
  totalLessons: number;
  /** Currently active lesson number (1-indexed), if any. */
  currentLesson?: number;
}

export function ProgressTracker({
  totalLessons,
  currentLesson,
}: ProgressTrackerProps) {
  // Skeleton: no persistence yet. Hardcode 0 completed.
  const completedLessons = 0;
  const percentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="rounded-xl bg-surface-sunken/30 p-4">
      {/* Top row: lesson count + optional current indicator */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-ui font-medium text-ink">
          {completedLessons} of {totalLessons} lessons
        </span>
        {currentLesson !== undefined && (
          <span className="text-small text-ink-muted">
            Lesson {currentLesson}
          </span>
        )}
      </div>

      {/* Progress bar */}
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

      {/* Completion message (only relevant once persistence is added) */}
      {completedLessons === totalLessons && totalLessons > 0 && (
        <p className="text-small font-medium text-brand mt-2.5">
          All lessons complete!
        </p>
      )}
    </div>
  );
}
