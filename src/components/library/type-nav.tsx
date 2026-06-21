"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_COLORS } from "@/lib/enneagram/colors";
import { ALL_TYPES } from "@/lib/enneagram/descriptions";
import { cn } from "@/lib/utils";

export function TypeNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {ALL_TYPES.map((type) => {
        const info = TYPE_INFO[type];
        const href = `/library/type-${type}`;
        const isActive = pathname === href;

        return (
          <Link
            key={type}
            href={href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary/10 text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <div
              className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: TYPE_COLORS[type] }}
            >
              {type}
            </div>
            {info.name}
          </Link>
        );
      })}
      <Link
        href="/library/responsible-use"
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
          pathname === "/library/responsible-use"
            ? "bg-primary/10 text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[10px]">
          !
        </div>
        Responsible Use
      </Link>
    </nav>
  );
}
