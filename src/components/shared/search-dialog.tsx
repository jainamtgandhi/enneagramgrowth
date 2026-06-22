"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, GraduationCap, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { searchContent } from "@/lib/search/types";
import type { SearchEntry, SearchResult, SearchResultKind } from "@/lib/search/types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SearchDialogProps {
  entries: SearchEntry[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const kindConfig: Record<
  SearchResultKind,
  { label: string; icon: typeof Search; className: string }
> = {
  type: {
    label: "Type",
    icon: Users,
    className: "bg-center-body-soft text-center-body-ink",
  },
  lesson: {
    label: "Lesson",
    icon: GraduationCap,
    className: "bg-brand-soft text-brand",
  },
  article: {
    label: "Article",
    icon: BookOpen,
    className: "bg-surface-sunken text-ink-muted",
  },
};

function KindBadge({ kind }: { kind: SearchResultKind }) {
  const config = kindConfig[kind];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium shrink-0",
        config.className
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  );
}

/** Group results by kind for display. */
function groupResults(results: SearchResult[]) {
  const groups: { kind: SearchResultKind; label: string; items: SearchResult[] }[] = [
    { kind: "type", label: "Types", items: [] },
    { kind: "lesson", label: "Lessons", items: [] },
    { kind: "article", label: "Library Articles", items: [] },
  ];

  for (const r of results) {
    const group = groups.find((g) => g.kind === r.kind);
    if (group) group.items.push(r);
  }

  return groups.filter((g) => g.items.length > 0);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SearchDialog({ entries }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to let the dialog animate in
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    } else {
      // Reset state when dialog closes
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Compute search results
  const results = useMemo(
    () => searchContent(entries, query),
    [entries, query]
  );

  const groups = useMemo(() => groupResults(results), [results]);

  // Flatten results for keyboard navigation
  const flatResults = useMemo(
    () => groups.flatMap((g) => g.items),
    [groups]
  );

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigateToResult = useCallback(
    (result: SearchResult) => {
      setOpen(false);
      router.push(result.url);
    },
    [router]
  );

  // Keyboard navigation within the results list
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (flatResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[activeIndex]) {
            navigateToResult(flatResults[activeIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [flatResults, activeIndex, navigateToResult]
  );

  // Scroll the active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(
      `[data-result-index="${activeIndex}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Pre-compute the global index offset for each group so we can map
  // group-local indices to flat-list indices without mutable state during render.
  const groupOffsets = useMemo(() => {
    const offsets = new Map<SearchResultKind, number>();
    let offset = 0;
    for (const g of groups) {
      offsets.set(g.kind, offset);
      offset += g.items.length;
    }
    return offsets;
  }, [groups]);

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        aria-label="Search site content"
      >
        <Search className="size-4" />
        <span className="hidden lg:inline text-small">Search</span>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border/60 bg-surface px-1.5 py-0.5 text-xs text-ink-muted font-mono">
          <span className="text-[10px]">&#8984;</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="top-[12%] -translate-y-0 sm:max-w-lg max-h-[min(80vh,560px)] flex flex-col gap-0 p-0 overflow-hidden"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Search site content</DialogTitle>

          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-border/40 px-4 py-3">
            <Search className="size-5 text-ink-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search types, lessons, articles..."
              className="flex-1 bg-transparent text-body text-ink placeholder:text-ink-muted/60 outline-none"
              aria-label="Search query"
              aria-activedescendant={
                flatResults.length > 0
                  ? `search-result-${activeIndex}`
                  : undefined
              }
              role="combobox"
              aria-expanded={flatResults.length > 0}
              aria-controls="search-results-list"
              aria-autocomplete="list"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-small text-ink-muted hover:text-ink transition-colors"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results area */}
          <div
            ref={listRef}
            id="search-results-list"
            role="listbox"
            aria-label="Search results"
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {query.trim().length > 0 && flatResults.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-12 px-4 text-center">
                <Search className="size-8 text-ink-muted/40" />
                <p className="text-ui text-ink-muted">
                  No results found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-small text-ink-muted/60">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

            {query.trim().length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-12 px-4 text-center">
                <p className="text-ui text-ink-muted">
                  Start typing to search across all content
                </p>
                <p className="text-small text-ink-muted/60">
                  Types, lessons, and library articles
                </p>
              </div>
            )}

            {groups.map((group) => {
              const groupOffset = groupOffsets.get(group.kind) ?? 0;

              return (
                <div key={group.kind}>
                  <div className="sticky top-0 bg-surface/95 backdrop-blur-sm px-4 py-1.5 border-b border-border/20">
                    <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                      {group.label}
                    </span>
                  </div>
                  {group.items.map((result, i) => {
                    const globalIndex = groupOffset + i;
                    const isActive = globalIndex === activeIndex;

                    return (
                      <button
                        key={result.url}
                        id={`search-result-${globalIndex}`}
                        data-result-index={globalIndex}
                        role="option"
                        aria-selected={isActive}
                        type="button"
                        onClick={() => navigateToResult(result)}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                          isActive
                            ? "bg-brand-soft/30"
                            : "hover:bg-surface-sunken/50"
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-ui font-medium text-ink truncate">
                              {result.title}
                            </span>
                            <KindBadge kind={result.kind} />
                          </div>
                          <p className="text-small text-ink-muted line-clamp-2">
                            {result.excerpt || result.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Footer with keyboard hints */}
          {flatResults.length > 0 && (
            <div className="flex items-center gap-4 border-t border-border/40 px-4 py-2 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-border/60 bg-surface px-1 py-0.5 font-mono text-[10px]">
                  &uarr;
                </kbd>
                <kbd className="rounded border border-border/60 bg-surface px-1 py-0.5 font-mono text-[10px]">
                  &darr;
                </kbd>
                navigate
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-border/60 bg-surface px-1 py-0.5 font-mono text-[10px]">
                  &crarr;
                </kbd>
                open
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-border/60 bg-surface px-1 py-0.5 font-mono text-[10px]">
                  esc
                </kbd>
                close
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
