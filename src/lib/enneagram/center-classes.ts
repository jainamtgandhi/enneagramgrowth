import type { Center } from "./types";

/**
 * Pre-computed Tailwind class maps for center-based styling.
 *
 * Dynamic string interpolation (e.g. `bg-center-${center}-soft`) is silently
 * purged by Tailwind's JIT scanner because the full class name never appears
 * in source. These maps ensure every class is a complete, scannable string.
 */

export const centerBg: Record<Center, string> = {
  body: "bg-center-body",
  heart: "bg-center-heart",
  head: "bg-center-head",
};

export const centerBgSoft: Record<Center, string> = {
  body: "bg-center-body-soft",
  heart: "bg-center-heart-soft",
  head: "bg-center-head-soft",
};

export const centerBgSoft30: Record<Center, string> = {
  body: "bg-center-body-soft/30",
  heart: "bg-center-heart-soft/30",
  head: "bg-center-head-soft/30",
};

export const centerBgSoft50: Record<Center, string> = {
  body: "bg-center-body-soft/50",
  heart: "bg-center-heart-soft/50",
  head: "bg-center-head-soft/50",
};

export const centerText: Record<Center, string> = {
  body: "text-center-body-ink",
  heart: "text-center-heart-ink",
  head: "text-center-head-ink",
};

export const centerBorder: Record<Center, string> = {
  body: "border-center-body",
  heart: "border-center-heart",
  head: "border-center-head",
};

export const centerBorderSlash30: Record<Center, string> = {
  body: "border-center-body/30",
  heart: "border-center-heart/30",
  head: "border-center-head/30",
};

export const centerHoverBorder: Record<Center, string> = {
  body: "hover:border-center-body",
  heart: "hover:border-center-heart",
  head: "hover:border-center-head",
};

export const centerHoverBgSoft30: Record<Center, string> = {
  body: "hover:bg-center-body-soft/30",
  heart: "hover:bg-center-heart-soft/30",
  head: "hover:bg-center-head-soft/30",
};

export const centerHoverBgSoft50: Record<Center, string> = {
  body: "hover:bg-center-body-soft/50",
  heart: "hover:bg-center-heart-soft/50",
  head: "hover:bg-center-head-soft/50",
};

export const centerHoverText: Record<Center, string> = {
  body: "hover:text-center-body-ink",
  heart: "hover:text-center-heart-ink",
  head: "hover:text-center-head-ink",
};

export const centerRing30: Record<Center, string> = {
  body: "ring-center-body/30",
  heart: "ring-center-heart/30",
  head: "ring-center-head/30",
};

export const centerHoverRing40: Record<Center, string> = {
  body: "hover:ring-center-body/40",
  heart: "hover:ring-center-heart/40",
  head: "hover:ring-center-head/40",
};

/** Combined: bg-soft + text-ink (e.g. for badges/tags) */
export const centerBadge: Record<Center, string> = {
  body: "bg-center-body-soft text-center-body-ink",
  heart: "bg-center-heart-soft text-center-heart-ink",
  head: "bg-center-head-soft text-center-head-ink",
};

/** Active state: bg-soft + text-ink + ring */
export const centerActiveState: Record<Center, string> = {
  body: "bg-center-body-soft text-center-body-ink ring-2 ring-center-body/30",
  heart: "bg-center-heart-soft text-center-heart-ink ring-2 ring-center-heart/30",
  head: "bg-center-head-soft text-center-head-ink ring-2 ring-center-head/30",
};

/** Inactive hover: text-muted → text-ink + bg-soft/50 */
export const centerInactiveHover: Record<Center, string> = {
  body: "text-ink-muted hover:bg-center-body-soft/50 hover:text-center-body-ink",
  heart: "text-ink-muted hover:bg-center-heart-soft/50 hover:text-center-heart-ink",
  head: "text-ink-muted hover:bg-center-head-soft/50 hover:text-center-head-ink",
};
