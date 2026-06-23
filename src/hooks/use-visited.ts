"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "enneagram-visited";

function getVisited(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveVisited(paths: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paths));
}

export function useVisited() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getVisited());
  }, []);

  const isVisited = useCallback(
    (path: string) => visited.includes(path),
    [visited]
  );

  const markVisited = useCallback(
    (path: string) => {
      if (visited.includes(path)) return;
      const updated = [...visited, path];
      setVisited(updated);
      saveVisited(updated);
    },
    [visited]
  );

  const visitedCount = useCallback(
    (prefix: string) => visited.filter((p) => p.startsWith(prefix)).length,
    [visited]
  );

  return { isVisited, markVisited, visitedCount, visited };
}
