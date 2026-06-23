"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useVisited } from "@/hooks/use-visited";
import type { Center } from "@/lib/enneagram/types";
import { Check } from "lucide-react";

interface Section {
  slug: string;
  label: string;
  desc: string;
}

interface GoDeeperGridProps {
  typeNum: string;
  center: Center;
  sections: Section[];
}

export function GoDeeperGrid({ typeNum, center, sections }: GoDeeperGridProps) {
  const pathname = usePathname();
  const { isVisited, markVisited, visitedCount } = useVisited();

  useEffect(() => {
    markVisited(pathname);
  }, [pathname, markVisited]);

  const prefix = `/types/${typeNum}/`;
  const visited = visitedCount(prefix);
  const total = sections.length;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-serif text-h2 font-semibold text-ink">
          Go Deeper
        </h2>
        {visited > 0 && (
          <span className="text-small text-ink-muted">
            {visited} of {total} explored
          </span>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const path = `/types/${typeNum}/${section.slug}`;
          const wasVisited = isVisited(path);
          return (
            <Link
              key={section.slug}
              href={path}
              className={`group relative rounded-xl border border-border p-5 hover:border-center-${center} hover:shadow-card transition-all`}
            >
              {wasVisited && (
                <span className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-3 w-3" />
                </span>
              )}
              <h3 className="text-body font-medium text-ink group-hover:text-brand transition-colors mb-1">
                {section.label}
              </h3>
              <p className="text-small text-ink-muted">{section.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
