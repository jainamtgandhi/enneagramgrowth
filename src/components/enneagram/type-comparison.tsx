"use client";

import { useState } from "react";
import { TYPE_INFO, ALL_TYPES } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER, CENTER_INFO } from "@/lib/enneagram/types";
import type { EnneagramType, Center } from "@/lib/enneagram/types";

/* ------------------------------------------------------------------ */
/*  Core fears and desires per type (skeleton data for comparison)      */
/* ------------------------------------------------------------------ */

const CORE_DATA: Record<
  EnneagramType,
  { coreFear: string; coreDesire: string }
> = {
  1: {
    coreFear: "Being corrupt, evil, or defective",
    coreDesire: "To be good, to have integrity, to be morally sound",
  },
  2: {
    coreFear: "Being unwanted or unworthy of love",
    coreDesire: "To be loved and needed by others",
  },
  3: {
    coreFear: "Being worthless or without inherent value",
    coreDesire: "To be valuable, successful, and admired",
  },
  4: {
    coreFear: "Having no identity or personal significance",
    coreDesire: "To find themselves and their unique significance",
  },
  5: {
    coreFear: "Being useless, helpless, or overwhelmed",
    coreDesire: "To be capable, competent, and self-sufficient",
  },
  6: {
    coreFear: "Being without support or guidance",
    coreDesire: "To have security, certainty, and reliable support",
  },
  7: {
    coreFear: "Being deprived, trapped in pain, or limited",
    coreDesire: "To be satisfied, fulfilled, and free",
  },
  8: {
    coreFear: "Being controlled or harmed by others",
    coreDesire: "To protect themselves and determine their own path",
  },
  9: {
    coreFear: "Loss, separation, and fragmentation",
    coreDesire: "To have inner stability, peace, and wholeness",
  },
};

/* ------------------------------------------------------------------ */
/*  Center color mapping for Tailwind classes                          */
/* ------------------------------------------------------------------ */

const centerBgClass: Record<Center, string> = {
  body: "bg-center-body-soft",
  heart: "bg-center-heart-soft",
  head: "bg-center-head-soft",
};

const centerTextClass: Record<Center, string> = {
  body: "text-center-body-ink",
  heart: "text-center-heart-ink",
  head: "text-center-head-ink",
};

const centerBorderClass: Record<Center, string> = {
  body: "border-center-body/30",
  heart: "border-center-heart/30",
  head: "border-center-head/30",
};

/* ------------------------------------------------------------------ */
/*  Type Select                                                        */
/* ------------------------------------------------------------------ */

interface TypeSelectProps {
  label: string;
  value: EnneagramType | null;
  onChange: (type: EnneagramType | null) => void;
  id: string;
}

function TypeSelect({ label, value, onChange, id }: TypeSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-ui font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val ? (Number(val) as EnneagramType) : null);
        }}
        className="rounded-lg border border-border bg-surface px-3 py-2.5 text-body text-ink transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      >
        <option value="">Choose a type...</option>
        {ALL_TYPES.map((n) => (
          <option key={n} value={n}>
            Type {n} - {TYPE_INFO[n].name}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison Card                                                    */
/* ------------------------------------------------------------------ */

interface ComparisonCardProps {
  typeNum: EnneagramType;
}

function ComparisonCard({ typeNum }: ComparisonCardProps) {
  const info = TYPE_INFO[typeNum];
  const center = TYPE_TO_CENTER[typeNum];
  const centerInfo = CENTER_INFO[center];
  const core = CORE_DATA[typeNum];

  return (
    <div
      className={`rounded-xl border ${centerBorderClass[center]} ${centerBgClass[center]} p-6`}
    >
      {/* Header */}
      <div className="mb-4">
        <span
          className={`font-serif text-h2 font-bold ${centerTextClass[center]}`}
        >
          {typeNum}
        </span>
        <h3 className="font-serif text-h3 font-semibold text-ink mt-1">
          {info.name}
        </h3>
        <p className="text-small text-ink-muted">{info.altName}</p>
      </div>

      {/* Brief */}
      <p className="text-body text-ink mb-5">{info.brief}</p>

      {/* Details */}
      <dl className="space-y-4">
        <div>
          <dt className="text-small font-medium text-ink-muted uppercase tracking-wide mb-1">
            Core Fear
          </dt>
          <dd className="text-body text-ink">{core.coreFear}</dd>
        </div>
        <div>
          <dt className="text-small font-medium text-ink-muted uppercase tracking-wide mb-1">
            Core Desire
          </dt>
          <dd className="text-body text-ink">{core.coreDesire}</dd>
        </div>
        <div>
          <dt className="text-small font-medium text-ink-muted uppercase tracking-wide mb-1">
            Center
          </dt>
          <dd className={`text-body font-medium ${centerTextClass[center]}`}>
            {centerInfo.label}
          </dd>
        </div>
        <div>
          <dt className="text-small font-medium text-ink-muted uppercase tracking-wide mb-1">
            Keywords
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {info.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-surface px-2.5 py-0.5 text-small text-ink-muted"
              >
                {kw}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                        */
/* ------------------------------------------------------------------ */

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface-sunken/30 p-8 text-center">
      <p className="text-body text-ink-muted">
        Select two types above to see them side by side.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function TypeComparison() {
  const [typeA, setTypeA] = useState<EnneagramType | null>(null);
  const [typeB, setTypeB] = useState<EnneagramType | null>(null);

  const bothSelected = typeA !== null && typeB !== null;
  const sameType = typeA !== null && typeA === typeB;

  return (
    <div>
      {/* Selectors */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <TypeSelect
          label="Type A"
          value={typeA}
          onChange={setTypeA}
          id="type-a-select"
        />
        <TypeSelect
          label="Type B"
          value={typeB}
          onChange={setTypeB}
          id="type-b-select"
        />
      </div>

      {/* Same-type notice */}
      {sameType && (
        <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 mb-8">
          <p className="text-ui text-ink">
            You selected the same type for both. Try picking two different types
            to see a meaningful comparison.
          </p>
        </div>
      )}

      {/* Comparison cards or empty state */}
      {bothSelected && !sameType ? (
        <div className="grid gap-6 md:grid-cols-2">
          <ComparisonCard typeNum={typeA} />
          <ComparisonCard typeNum={typeB} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
