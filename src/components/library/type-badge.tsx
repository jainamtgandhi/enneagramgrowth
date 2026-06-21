import { TYPE_COLORS } from "@/lib/enneagram/colors";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import type { EnneagramType } from "@/lib/enneagram/types";

interface TypeBadgeProps {
  type: EnneagramType;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TypeBadge({ type, showName = false, size = "md" }: TypeBadgeProps) {
  const info = TYPE_INFO[type];
  const sizeClasses = {
    sm: "h-6 px-2 text-xs",
    md: "h-7 px-2.5 text-sm",
    lg: "h-8 px-3 text-base",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: TYPE_COLORS[type] }}
    >
      <span>{type}</span>
      {showName && <span>{info.name}</span>}
    </span>
  );
}
