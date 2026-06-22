import type { ContentLevel } from "@/lib/content/mdx";

const LEVEL_STYLES: Record<ContentLevel, { label: string; className: string }> = {
  beginner: {
    label: "Beginner",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  intermediate: {
    label: "Intermediate",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  advanced: {
    label: "Advanced",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

interface LevelBadgeProps {
  level: ContentLevel;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  const style = LEVEL_STYLES[level];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium leading-tight ${style.className}`}
    >
      {style.label}
    </span>
  );
}
