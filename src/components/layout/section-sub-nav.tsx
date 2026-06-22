"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SectionSubNavProps {
  sectionLabel: string;
  basePath: string;
  topics: { slug: string; title: string }[];
}

export function SectionSubNav({
  sectionLabel,
  basePath,
  topics,
}: SectionSubNavProps) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;
      const scrollLeft =
        active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [pathname]);

  const isHub = pathname === basePath;

  return (
    <nav className="sticky top-[60px] z-40 w-full border-b border-border bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="flex items-center gap-4 h-11">
          <Link
            href={basePath}
            className={`hidden sm:block shrink-0 text-small font-semibold transition-colors ${
              isHub ? "text-brand" : "text-ink hover:text-brand"
            }`}
          >
            {sectionLabel}
          </Link>

          <div className="hidden sm:block w-px h-4 bg-border shrink-0" />

          <div
            ref={scrollRef}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide"
          >
            {topics.map((topic) => {
              const href = `${basePath}/${topic.slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={topic.slug}
                  href={href}
                  ref={isActive ? activeRef : undefined}
                  className={`shrink-0 rounded-full px-3 py-1 text-small font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-brand-soft text-brand"
                      : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
                  }`}
                >
                  {topic.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
