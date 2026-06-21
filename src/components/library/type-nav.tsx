"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { ALL_TYPES, TYPE_TO_CENTER } from "@/lib/enneagram/types";
import { cn } from "@/lib/utils";

export function TypeNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {ALL_TYPES.map((type) => {
        const info = TYPE_INFO[type];
        const center = TYPE_TO_CENTER[type];
        const href = `/enneagram/types/${type}`;
        const isActive = pathname === href;

        return (
          <Link
            key={type}
            href={href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-ui transition-colors",
              isActive
                ? "bg-brand-soft text-ink font-medium"
                : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
            )}
          >
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center text-small font-bold bg-center-${center}-soft text-center-${center}-ink`}
            >
              {type}
            </div>
            {info.name}
          </Link>
        );
      })}
    </nav>
  );
}
