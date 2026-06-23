"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { EnneagramType, Center } from "@/lib/enneagram/types";
import { TYPE_MOTIVATIONS } from "@/lib/enneagram/motivations";
import { useMyType } from "@/contexts/my-type-context";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface TypeMeta {
  number: EnneagramType;
  name: string;
  center: Center;
}

const TYPES: TypeMeta[] = [
  { number: 1, name: "Reformer", center: "body" },
  { number: 2, name: "Helper", center: "heart" },
  { number: 3, name: "Achiever", center: "heart" },
  { number: 4, name: "Individualist", center: "heart" },
  { number: 5, name: "Investigator", center: "head" },
  { number: 6, name: "Loyalist", center: "head" },
  { number: 7, name: "Enthusiast", center: "head" },
  { number: 8, name: "Challenger", center: "body" },
  { number: 9, name: "Peacemaker", center: "body" },
];

const TYPE_MAP = Object.fromEntries(
  TYPES.map((t) => [t.number, t]),
) as Record<EnneagramType, TypeMeta>;

/** CSS variable for a center's color. */
const centerColor: Record<Center, string> = {
  body: "var(--center-body)",
  heart: "var(--center-heart)",
  head: "var(--center-head)",
};

const centerColorSoft: Record<Center, string> = {
  body: "var(--center-body-soft)",
  heart: "var(--center-heart-soft)",
  head: "var(--center-head-soft)",
};

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                    */
/* ------------------------------------------------------------------ */

/** SVG viewBox center and radius. */
const CX = 200;
const CY = 200;
const R = 160; // circle radius
const POINT_R = 22; // clickable point radius

/**
 * Clockwise order starting at 12 o'clock:
 * 9, 1, 2, 3, 4, 5, 6, 7, 8
 *
 * Each type is spaced 40 degrees apart.
 * Type 9 sits at -90 degrees (top of circle in SVG coords).
 */
const CLOCKWISE_ORDER: EnneagramType[] = [9, 1, 2, 3, 4, 5, 6, 7, 8];

function pointPosition(type: EnneagramType): { x: number; y: number } {
  const index = CLOCKWISE_ORDER.indexOf(type);
  // -90 to start at top; each step is 40 degrees
  const angleDeg = -90 + index * 40;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + R * Math.cos(angleRad),
    y: CY + R * Math.sin(angleRad),
  };
}

/** Return an SVG path "d" string connecting an ordered list of types. */
function polylinePath(types: EnneagramType[]): string {
  return types
    .map((t, i) => {
      const { x, y } = pointPosition(t);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .concat("Z")
    .join(" ");
}

/* Triangle: 3 -> 6 -> 9 -> 3 */
const TRIANGLE_PATH = polylinePath([3, 6, 9]);

/* Hexad: 1 -> 4 -> 2 -> 8 -> 5 -> 7 -> 1 */
const HEXAD_PATH = polylinePath([1, 4, 2, 8, 5, 7]);

/* ------------------------------------------------------------------ */
/*  Tooltip label positions - push labels slightly outward             */
/* ------------------------------------------------------------------ */

function labelPosition(type: EnneagramType): { x: number; y: number } {
  const index = CLOCKWISE_ORDER.indexOf(type);
  const angleDeg = -90 + index * 40;
  const angleRad = (angleDeg * Math.PI) / 180;
  const labelR = R + 42;
  return {
    x: CX + labelR * Math.cos(angleRad),
    y: CY + labelR * Math.sin(angleRad),
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface EnneagramDiagramProps {
  /** Optional: highlight a specific type (e.g. on a type detail page). */
  activeType?: EnneagramType;
  /** Optional: additional CSS class for the wrapper. */
  className?: string;
  /**
   * When true, clicking a type selects/deselects it in place
   * instead of navigating to the type page. Shows a tooltip
   * below the diagram with the selected type name.
   */
  interactive?: boolean;
  /** Callback when a type is selected in interactive mode. */
  onTypeSelect?: (type: EnneagramType | null) => void;
}

export function EnneagramDiagram({
  activeType,
  className,
  interactive = false,
  onTypeSelect,
}: EnneagramDiagramProps) {
  const [hoveredType, setHoveredType] = useState<EnneagramType | null>(null);
  const [selectedType, setSelectedType] = useState<EnneagramType | null>(null);
  const { myType } = useMyType();

  // In interactive mode, "active" means selected by click
  const resolvedActive = interactive ? selectedType : activeType;

  // The type whose arrows/wings to show (hovered takes priority)
  const focusedType = hoveredType ?? resolvedActive ?? null;
  const focusedMotivations = focusedType ? TYPE_MOTIVATIONS[focusedType] : null;

  const handleClick = useCallback(
    (typeNum: EnneagramType) => {
      if (!interactive) return;
      setSelectedType((prev) => {
        const next = prev === typeNum ? null : typeNum;
        onTypeSelect?.(next);
        return next;
      });
    },
    [interactive, onTypeSelect],
  );

  const selectedMeta = selectedType ? TYPE_MAP[selectedType] : null;

  return (
    <div className={className} style={{ width: "100%", maxWidth: 480 }}>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Enneagram diagram showing nine interconnected personality types"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* ---- Outer circle ---- */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="var(--border)"
          strokeWidth={2}
        />

        {/* ---- Inner triangle (3-6-9) ---- */}
        <path
          d={TRIANGLE_PATH}
          fill="none"
          stroke="var(--ink-muted)"
          strokeWidth={1.5}
          opacity={0.35}
        />

        {/* ---- Inner hexad (1-4-2-8-5-7) ---- */}
        <path
          d={HEXAD_PATH}
          fill="none"
          stroke="var(--ink-muted)"
          strokeWidth={1.5}
          opacity={0.35}
        />

        {/* ---- Arrow markers ---- */}
        <defs>
          <marker
            id="arrow-growth"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
          </marker>
          <marker
            id="arrow-stress"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
          </marker>
        </defs>

        {/* ---- Dynamic wing + arrow lines for focused type ---- */}
        {focusedType && focusedMotivations && (() => {
          const from = pointPosition(focusedType);
          const growth = pointPosition(focusedMotivations.growthArrow);
          const stress = pointPosition(focusedMotivations.stressArrow);
          const wing1 = pointPosition(focusedMotivations.wing1);
          const wing2 = pointPosition(focusedMotivations.wing2);
          return (
            <g style={{ pointerEvents: "none" }}>
              {/* Wing lines (dotted) */}
              <line x1={from.x} y1={from.y} x2={wing1.x} y2={wing1.y}
                stroke="var(--ink-muted)" strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />
              <line x1={from.x} y1={from.y} x2={wing2.x} y2={wing2.y}
                stroke="var(--ink-muted)" strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />
              {/* Growth arrow (green) */}
              <line x1={from.x} y1={from.y} x2={growth.x} y2={growth.y}
                stroke="#16a34a" strokeWidth={2.5} markerEnd="url(#arrow-growth)" opacity={0.8} />
              {/* Stress arrow (amber) */}
              <line x1={from.x} y1={from.y} x2={stress.x} y2={stress.y}
                stroke="#d97706" strokeWidth={2.5} markerEnd="url(#arrow-stress)" opacity={0.8} />
            </g>
          );
        })()}

        {/* ---- My Type persistent ring ---- */}
        {myType && !resolvedActive && (() => {
          const pos = pointPosition(myType);
          return (
            <circle
              cx={pos.x}
              cy={pos.y}
              r={POINT_R + 6}
              fill="none"
              stroke="var(--brand)"
              strokeWidth={2}
              opacity={0.6}
              style={{ pointerEvents: "none" }}
            />
          );
        })()}

        {/* ---- Points ---- */}
        {CLOCKWISE_ORDER.map((typeNum) => {
          const meta = TYPE_MAP[typeNum];
          const pos = pointPosition(typeNum);
          const labelPos = labelPosition(typeNum);
          const isHovered = hoveredType === typeNum;
          const isActive = resolvedActive === typeNum;
          const color = centerColor[meta.center];
          const softColor = centerColorSoft[meta.center];

          const pointContent = (
            <g
              onMouseEnter={() => setHoveredType(typeNum)}
              onMouseLeave={() => setHoveredType(null)}
              onFocus={() => setHoveredType(typeNum)}
              onBlur={() => setHoveredType(null)}
              onClick={
                interactive
                  ? (e) => {
                      e.preventDefault();
                      handleClick(typeNum);
                    }
                  : undefined
              }
              onKeyDown={
                interactive
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick(typeNum);
                      }
                    }
                  : undefined
              }
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? "button" : undefined}
              aria-pressed={interactive ? isActive : undefined}
              aria-label={`Type ${typeNum}: The ${meta.name}`}
              style={{ cursor: "pointer" }}
            >
              {/* Hover / active halo */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={POINT_R + 4}
                fill={softColor}
                opacity={isHovered || isActive ? 1 : 0}
                style={{
                  transition: "opacity 0.2s ease, r 0.2s ease",
                }}
              />

              {/* Main colored circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={POINT_R}
                fill={color}
                style={{
                  transition: "transform 0.2s ease",
                  transformOrigin: `${pos.x}px ${pos.y}px`,
                  transform:
                    isHovered || isActive ? "scale(1.12)" : "scale(1)",
                }}
              />

              {/* Type number */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize={15}
                fontWeight={600}
                style={{
                  pointerEvents: "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {typeNum}
              </text>

              {/* Tooltip label - visible on hover / active */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--ink)"
                fontSize={11}
                fontWeight={500}
                opacity={isHovered || isActive ? 1 : 0}
                style={{
                  pointerEvents: "none",
                  transition: "opacity 0.2s ease",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {meta.name}
              </text>
            </g>
          );

          // In interactive mode, no Link wrapper; just the SVG group
          if (interactive) {
            return (
              <g key={typeNum}>
                {pointContent}
              </g>
            );
          }

          // Default: wrap in Link for navigation
          return (
            <Link
              key={typeNum}
              href={`/types/${typeNum}`}
              aria-label={`Type ${typeNum}: The ${meta.name}`}
            >
              {pointContent}
            </Link>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2 text-[11px] text-ink-muted">
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-0.5 bg-[#16a34a]" /> Growth
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-0.5 bg-[#d97706]" /> Stress
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-0.5 border-t border-dashed border-ink-muted" style={{ width: 16 }} /> Wings
        </span>
      </div>

      {/* Interactive mode tooltip below the diagram */}
      {interactive && (
        <div
          className="mt-3 text-center transition-opacity duration-200"
          style={{ opacity: selectedMeta ? 1 : 0 }}
          aria-live="polite"
        >
          {selectedMeta && (
            <p className="text-ui font-medium text-ink">
              <span
                style={{
                  color: centerColor[selectedMeta.center],
                  fontWeight: 700,
                }}
              >
                Type {selectedMeta.number}
              </span>
              {" "}
              &mdash; The {selectedMeta.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
