"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useMyType } from "@/contexts/my-type-context";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER, ALL_TYPES } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";

const centerColorMap = {
  body: "bg-center-body-soft text-center-body-ink border-center-body/30",
  heart: "bg-center-heart-soft text-center-heart-ink border-center-heart/30",
  head: "bg-center-head-soft text-center-head-ink border-center-head/30",
} as const;

const centerDotMap = {
  body: "bg-center-body",
  heart: "bg-center-heart",
  head: "bg-center-head",
} as const;

export function MyTypeButton() {
  const { myType, setMyType, clearMyType } = useMyType();
  const [showPicker, setShowPicker] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closePicker = useCallback(() => {
    setShowPicker(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!showPicker) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closePicker();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showPicker, closePicker]);

  if (!myType) {
    return (
      <Link
        href="/discover"
        className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-small font-semibold text-white hover:bg-brand-hover transition-colors shadow-sm"
      >
        Find Your Type
      </Link>
    );
  }

  const info = TYPE_INFO[myType];
  const center = TYPE_TO_CENTER[myType];
  const colors = centerColorMap[center];

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowPicker(!showPicker)}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-small font-semibold transition-colors ${colors}`}
        aria-label={`My Type: ${info.name}. Click to change.`}
        aria-expanded={showPicker}
        aria-haspopup="true"
      >
        <span className={`h-2 w-2 rounded-full ${centerDotMap[center]}`} />
        Type {myType}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${showPicker ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showPicker && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={closePicker}
            aria-hidden="true"
          />
          <div ref={panelRef} role="dialog" aria-label="Change your Enneagram type" className="absolute right-0 top-full mt-2 z-50 w-[280px] rounded-xl border border-border bg-paper p-4 shadow-lg">
            <div className="mb-3">
              <p className="text-small font-semibold text-ink">{info.name}</p>
              <Link
                href={`/types/${myType}`}
                onClick={() => setShowPicker(false)}
                className="text-small text-brand hover:text-brand-hover transition-colors"
              >
                View my type profile &rarr;
              </Link>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Change type
            </p>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {ALL_TYPES.map((n) => {
                const t = n as EnneagramType;
                const c = TYPE_TO_CENTER[t];
                const isActive = t === myType;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setMyType(t);
                      setShowPicker(false);
                    }}
                    className={`rounded-lg px-2 py-1.5 text-small font-medium transition-colors ${
                      isActive
                        ? `${centerColorMap[c]} border`
                        : "text-ink-muted hover:bg-surface-sunken"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                clearMyType();
                setShowPicker(false);
              }}
              className="w-full rounded-lg border border-border px-3 py-1.5 text-small text-ink-muted hover:bg-surface-sunken transition-colors"
            >
              Clear selection
            </button>
          </div>
        </>
      )}
    </div>
  );
}
