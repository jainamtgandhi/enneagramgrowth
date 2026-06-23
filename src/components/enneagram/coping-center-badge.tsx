"use client";

import { useMyType } from "@/contexts/my-type-context";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";

export function CopingCenterBadge({ center }: { center: Center }) {
  const { myType } = useMyType();
  if (!myType) return null;
  if (TYPE_TO_CENTER[myType] !== center) return null;
  return (
    <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
      Your center
    </span>
  );
}
