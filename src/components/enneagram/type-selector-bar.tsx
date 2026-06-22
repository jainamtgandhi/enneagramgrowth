"use client";

import { useEffect, useRef } from "react";
import {
  ALL_TYPES,
  CENTER_INFO,
  TYPE_TO_CENTER,
  type EnneagramType,
  type Center,
} from "@/lib/enneagram/types";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { useActiveHeading } from "@/hooks/use-active-heading";

interface TypeSelectorBarProps {
  mode?: "type" | "center";
  availableTypes?: EnneagramType[];
}

function typeToAnchorId(typeNum: EnneagramType): string {
  const name = TYPE_INFO[typeNum].name
    .toLowerCase()
    .replace(/\s+/g, "-");
  return `type-${typeNum}-${name}`;
}

function centerToAnchorId(center: Center): string {
  return `${center}-center-types-${CENTER_INFO[center].types.join("-")}`;
}

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

export function TypeSelectorBar({
  mode = "type",
  availableTypes,
}: TypeSelectorBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const types = availableTypes ?? ALL_TYPES;

  const headingIds =
    mode === "type"
      ? types.map(typeToAnchorId)
      : CENTER_ORDER.map(centerToAnchorId);

  const activeId = useActiveHeading(headingIds);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;
      const scrollLeft =
        active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (mode === "center") {
    return (
      <div className="mb-8 -mx-1">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-1 py-2"
        >
          {CENTER_ORDER.map((center) => {
            const info = CENTER_INFO[center];
            const id = centerToAnchorId(center);
            const isActive = activeId === id;
            return (
              <button
                key={center}
                ref={isActive ? activeRef : undefined}
                onClick={() => handleClick(id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-small font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? `bg-center-${center}-soft text-center-${center}-ink ring-2 ring-center-${center}/30`
                    : `text-ink-muted hover:bg-center-${center}-soft/50 hover:text-center-${center}-ink`
                }`}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 -mx-1">
      <div
        ref={scrollRef}
        className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-1 py-2"
      >
        {CENTER_ORDER.map((center, ci) => {
          const centerTypes = CENTER_INFO[center].types;
          return (
            <div key={center} className="flex items-center gap-1 shrink-0">
              {ci > 0 && (
                <div className="w-px h-5 bg-border mx-1.5 shrink-0" />
              )}
              {centerTypes
                .filter((t) => types.includes(t))
                .map((typeNum) => {
                  const id = typeToAnchorId(typeNum);
                  const isActive = activeId === id;
                  const info = TYPE_INFO[typeNum];
                  return (
                    <button
                      key={typeNum}
                      ref={isActive ? activeRef : undefined}
                      onClick={() => handleClick(id)}
                      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-small font-medium transition-all whitespace-nowrap ${
                        isActive
                          ? `bg-center-${center}-soft text-center-${center}-ink ring-2 ring-center-${center}/30`
                          : `text-ink-muted hover:bg-center-${center}-soft/50 hover:text-center-${center}-ink`
                      }`}
                    >
                      <span className="font-semibold">{typeNum}</span>
                      <span className="hidden sm:inline">{info.name}</span>
                    </button>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
