// ---------------------------------------------------------------------------
// Search types and client-safe search function.
// This module has NO server-only dependencies (no fs, no path, no gray-matter)
// and can be safely imported in client components.
// ---------------------------------------------------------------------------

export type SearchResultKind = "type" | "lesson" | "article";

/** A single entry in the search index, serializable to JSON for the client. */
export interface SearchEntry {
  title: string;
  description: string;
  url: string;
  kind: SearchResultKind;
  /**
   * Truncated plain-text body used for matching and excerpt generation.
   * Kept under ~800 chars per entry to limit payload size.
   */
  body: string;
}

export interface SearchResult {
  title: string;
  description: string;
  url: string;
  kind: SearchResultKind;
  excerpt: string;
  score: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a short excerpt (~160 chars) around the first occurrence of any
 * query word in the body text. Falls back to the opening of the body.
 */
function buildExcerpt(body: string, queryWords: string[]): string {
  const maxLen = 160;
  const lower = body.toLowerCase();

  // Find the earliest matching word position
  let earliest = -1;
  for (const word of queryWords) {
    const idx = lower.indexOf(word);
    if (idx !== -1 && (earliest === -1 || idx < earliest)) {
      earliest = idx;
    }
  }

  if (earliest === -1) {
    // No match found in body -- return the start
    return body.length <= maxLen
      ? body
      : body.slice(0, maxLen).replace(/\s\S*$/, "") + "...";
  }

  // Try to start a bit before the match for context
  const start = Math.max(0, earliest - 40);
  const slice = body.slice(start, start + maxLen);

  const prefix = start > 0 ? "..." : "";
  const suffix = start + maxLen < body.length ? "..." : "";

  // Trim to word boundary at edges
  let trimmed = slice;
  if (start > 0) {
    trimmed = trimmed.replace(/^\S*\s/, "");
  }
  if (start + maxLen < body.length) {
    trimmed = trimmed.replace(/\s\S*$/, "");
  }

  return prefix + trimmed + suffix;
}

// ---------------------------------------------------------------------------
// Client-safe search function
// ---------------------------------------------------------------------------

/**
 * Search a pre-built index with simple word-matching scoring.
 *
 * Scoring rules:
 *  - Each query word that appears in the title scores +10
 *  - Each query word that appears in the description scores +5
 *  - Each query word that appears in the body scores +1
 *  - Exact phrase match in title scores an additional +20
 *
 * Results are sorted by score descending and capped at 20.
 */
export function searchContent(
  entries: SearchEntry[],
  query: string
): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const words = trimmed
    .split(/\s+/)
    .filter((w) => w.length >= 2); // ignore single-char queries

  if (words.length === 0) return [];

  const scored: SearchResult[] = [];

  for (const entry of entries) {
    const titleLower = entry.title.toLowerCase();
    const descLower = entry.description.toLowerCase();
    const bodyLower = entry.body.toLowerCase();

    let score = 0;

    for (const word of words) {
      if (titleLower.includes(word)) score += 10;
      if (descLower.includes(word)) score += 5;
      if (bodyLower.includes(word)) score += 1;
    }

    // Bonus for exact phrase match in title
    if (words.length > 1 && titleLower.includes(trimmed)) {
      score += 20;
    }

    if (score > 0) {
      scored.push({
        title: entry.title,
        description: entry.description,
        url: entry.url,
        kind: entry.kind,
        excerpt: buildExcerpt(entry.body, words),
        score,
      });
    }
  }

  // Sort by score descending, then alphabetically by title for ties
  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  return scored.slice(0, 20);
}
