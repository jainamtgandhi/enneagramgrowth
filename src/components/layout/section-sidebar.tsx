"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SectionSidebarProps {
  sectionLabel: string;
  basePath: string;
  topics: { slug: string; title: string }[];
}

export function SectionSidebar({
  sectionLabel,
  basePath,
  topics,
}: SectionSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <Link
          href={basePath}
          className="text-small font-semibold text-ink-muted hover:text-brand transition-colors"
        >
          {sectionLabel}
        </Link>
        <ul className="mt-3 space-y-1">
          {topics.map((topic) => {
            const href = `${basePath}/${topic.slug}`;
            const isActive = pathname === href;
            return (
              <li key={topic.slug}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-1.5 text-small transition-colors ${
                    isActive
                      ? "bg-brand-soft text-brand font-medium"
                      : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
                  }`}
                >
                  {topic.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export function SectionMobilePills({
  sectionLabel,
  basePath,
  topics,
  currentSlug,
}: SectionSidebarProps & { currentSlug: string }) {
  return (
    <div className="lg:hidden mt-12">
      <h3 className="text-ui font-medium text-ink-muted mb-3">
        More in {sectionLabel}
      </h3>
      <div className="flex flex-wrap gap-2">
        {topics
          .filter((t) => t.slug !== currentSlug)
          .map((topic) => (
            <Link
              key={topic.slug}
              href={`${basePath}/${topic.slug}`}
              className="rounded-full border border-border px-4 py-1.5 text-small font-medium text-ink-muted hover:text-brand hover:border-brand transition-colors"
            >
              {topic.title}
            </Link>
          ))}
      </div>
    </div>
  );
}
