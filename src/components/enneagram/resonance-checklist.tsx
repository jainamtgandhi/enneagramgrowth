"use client";

import { useState, useCallback, useEffect } from "react";
import type { EnneagramType, Center } from "@/lib/enneagram/types";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { RESONANCE_STATEMENTS } from "@/lib/enneagram/resonance-data";

/* ------------------------------------------------------------------ */
/*  Center-specific color maps                                         */
/* ------------------------------------------------------------------ */

const progressBarColor: Record<Center, string> = {
  body: "bg-center-body",
  heart: "bg-center-heart",
  head: "bg-center-head",
};

const checkboxAccent: Record<Center, string> = {
  body: "accent-center-body",
  heart: "accent-center-heart",
  head: "accent-center-head",
};

const centerTextClass: Record<Center, string> = {
  body: "text-center-body-ink",
  heart: "text-center-heart-ink",
  head: "text-center-head-ink",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ResonanceChecklistProps {
  typeNum: EnneagramType;
}

export function ResonanceChecklist({ typeNum }: ResonanceChecklistProps) {
  const statements = RESONANCE_STATEMENTS[typeNum];
  const center = TYPE_TO_CENTER[typeNum];
  const info = TYPE_INFO[typeNum];

  const storageKey = `enneagram-resonance-${typeNum}`;

  const [checked, setChecked] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? new Set(JSON.parse(stored) as number[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...checked]));
    } catch {
      // Storage unavailable
    }
  }, [checked, storageKey]);

  const toggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const total = statements.length;
  const count = checked.size;
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-border p-6">
      {/* Header */}
      <h3 className="font-serif text-h3 font-semibold text-ink mb-1">
        Does This Resonate?
      </h3>
      <p className="text-small text-ink-muted mb-5">
        Check the statements that feel true for you as a{" "}
        <span className={`font-medium ${centerTextClass[center]}`}>
          {info.name}
        </span>
        .
      </p>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-small font-medium text-ink">
            {count} of {total} checked
          </span>
          <span className="text-small text-ink-muted">{percentage}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-surface-sunken overflow-hidden"
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${count} of ${total} statements checked`}
        >
          <div
            className={`h-full rounded-full ${progressBarColor[center]} transition-all duration-300 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Statements */}
      <fieldset>
        <legend className="sr-only">
          Resonance statements for Type {typeNum}: {info.name}
        </legend>
        <ul className="space-y-3">
          {statements.map((statement, index) => {
            const id = `resonance-${typeNum}-${index}`;
            const isChecked = checked.has(index);

            return (
              <li key={index}>
                <label
                  htmlFor={id}
                  className={`flex items-start gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                    isChecked
                      ? "bg-surface-sunken/50"
                      : "hover:bg-surface-sunken/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={() => toggle(index)}
                    className={`mt-0.5 h-5 w-5 shrink-0 rounded border-border ${checkboxAccent[center]} cursor-pointer`}
                  />
                  <span
                    className={`text-body leading-snug ${
                      isChecked ? "text-ink" : "text-ink-muted"
                    } transition-colors`}
                  >
                    {statement}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Summary nudge */}
      {count >= 7 && (
        <div className="mt-6 rounded-lg bg-brand-soft/50 p-4">
          <p className="text-ui text-ink">
            Strong resonance. This pattern may be a significant part of how you
            meet the world.
          </p>
        </div>
      )}
    </div>
  );
}
