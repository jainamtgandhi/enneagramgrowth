import type { EnneagramType } from "./types";

export const TYPE_COLORS: Record<EnneagramType, string> = {
  1: "#94A3B8", // Silver
  2: "#F43F5E", // Rose
  3: "#EAB308", // Gold
  4: "#6366F1", // Indigo
  5: "#14B8A6", // Teal
  6: "#64748B", // Slate-blue
  7: "#F97316", // Orange
  8: "#DC2626", // Crimson
  9: "#84CC16", // Olive
};

export const TYPE_COLOR_CLASSES: Record<EnneagramType, string> = {
  1: "bg-type-1",
  2: "bg-type-2",
  3: "bg-type-3",
  4: "bg-type-4",
  5: "bg-type-5",
  6: "bg-type-6",
  7: "bg-type-7",
  8: "bg-type-8",
  9: "bg-type-9",
};

export const TYPE_TEXT_CLASSES: Record<EnneagramType, string> = {
  1: "text-type-1",
  2: "text-type-2",
  3: "text-type-3",
  4: "text-type-4",
  5: "text-type-5",
  6: "text-type-6",
  7: "text-type-7",
  8: "text-type-8",
  9: "text-type-9",
};
