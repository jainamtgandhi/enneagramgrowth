"use client";

import { useActiveHeading } from "@/hooks/use-active-heading";
import type { TocHeading } from "@/lib/content/mdx";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const ids = headings.map((h) => h.id);
  const activeId = useActiveHeading(ids);

  if (headings.length < 4) return null;

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-[140px] self-start">
        <p className="text-small font-semibold text-ink mb-3">On this page</p>
        <ul className="space-y-1 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <button
                onClick={() => handleClick(h.id)}
                className={`block w-full text-left text-small transition-colors py-0.5 ${
                  h.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === h.id
                    ? "text-brand font-medium border-l-2 border-brand -ml-px"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible */}
      <details className="lg:hidden mb-8 rounded-xl border border-border bg-surface-sunken">
        <summary className="px-4 py-3 text-small font-semibold text-ink cursor-pointer select-none">
          On this page
        </summary>
        <ul className="px-4 pb-3 space-y-1">
          {headings.map((h) => (
            <li key={h.id}>
              <button
                onClick={(e) => {
                  handleClick(h.id);
                  // Close the details element
                  const details = (e.target as HTMLElement).closest("details");
                  if (details) details.open = false;
                }}
                className={`block w-full text-left text-small text-ink-muted hover:text-brand transition-colors py-0.5 ${
                  h.level === 3 ? "pl-4" : ""
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
