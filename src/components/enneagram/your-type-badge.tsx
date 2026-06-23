"use client";

import { useMyType } from "@/contexts/my-type-context";
import type { EnneagramType } from "@/lib/enneagram/types";

export function YourTypeBadge({ typeNum }: { typeNum: EnneagramType }) {
  const { myType } = useMyType();
  if (myType !== typeNum) return null;
  return (
    <span className="inline-flex items-center rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
      Your type
    </span>
  );
}
