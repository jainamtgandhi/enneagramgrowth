"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which heading is currently active based on scroll position.
 * Returns the ID of the last heading that has scrolled past the top offset.
 */
export function useActiveHeading(headingIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headingIds.length === 0) return;

    function getActiveHeading() {
      const OFFSET = 150;
      let current: string | null = null;

      for (const id of headingIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) {
          current = id;
        } else {
          break;
        }
      }

      // Before any heading has scrolled past, highlight the first
      if (!current) current = headingIds[0] ?? null;
      return current;
    }

    function onScroll() {
      setActiveId(getActiveHeading());
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headingIds]);

  return activeId;
}
