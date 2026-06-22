"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which heading is currently visible in the viewport using IntersectionObserver.
 * Returns the ID of the heading nearest to the top of the visible area.
 */
export function useActiveHeading(headingIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Observe headings in the top 40% of viewport
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    // Set initial active heading based on scroll position
    if (elements.length > 0) {
      const first = elements.find(
        (el) => el.getBoundingClientRect().top >= 0
      );
      if (first) setActiveId(first.id);
      else setActiveId(elements[elements.length - 1].id);
    }

    return () => observer.disconnect();
  }, [headingIds]);

  return activeId;
}
