"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useVisited } from "@/hooks/use-visited";

export function VisitMarker() {
  const pathname = usePathname();
  const { markVisited } = useVisited();
  useEffect(() => {
    markVisited(pathname);
  }, [pathname, markVisited]);
  return null;
}
