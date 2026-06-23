import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";
import { centerBadge } from "@/lib/enneagram/center-classes";

interface TypeBadgeProps {
  type: EnneagramType;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
}

export function TypeBadge({
  type,
  showName = false,
  size = "md",
}: TypeBadgeProps) {
  const info = TYPE_INFO[type];
  const center = TYPE_TO_CENTER[type];
  const sizeClasses = {
    sm: "h-6 px-2 text-small",
    md: "h-7 px-2.5 text-ui",
    lg: "h-8 px-3 text-body",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${centerBadge[center]} ${sizeClasses[size]}`}
    >
      <span>{type}</span>
      {showName && <span>{info.name}</span>}
    </span>
  );
}
