"use client";

import Link from "next/link";
import { useMyType } from "@/contexts/my-type-context";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";

export function PersonalizedCta() {
  const { myType } = useMyType();
  if (!myType) return null;
  const info = TYPE_INFO[myType];
  return (
    <div className="mt-6 rounded-xl border border-brand/20 bg-brand-soft/20 p-4 text-center">
      <p className="text-body font-medium text-ink">
        Continue exploring your type
      </p>
      <Link
        href={`/types/${myType}`}
        className="mt-2 inline-flex items-center gap-1 text-ui font-medium text-brand hover:text-brand-hover transition-colors"
      >
        Go to Type {myType}: {info.name} &rarr;
      </Link>
    </div>
  );
}
