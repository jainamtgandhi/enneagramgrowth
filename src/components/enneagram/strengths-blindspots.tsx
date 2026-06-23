import { TYPE_STRENGTHS } from "@/lib/enneagram/strengths";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";

export function StrengthsBlindSpots({ typeNum }: { typeNum: EnneagramType }) {
  const { strengths, blindSpots } = TYPE_STRENGTHS[typeNum];
  const center = TYPE_TO_CENTER[typeNum];

  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      <div className="rounded-xl border border-border p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
          Strengths
        </p>
        <ul className="space-y-2">
          {strengths.map((s) => (
            <li key={s} className="flex items-start gap-2 text-small text-ink">
              <span className="mt-0.5 shrink-0 text-success" aria-hidden>
                +
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
          Blind Spots
        </p>
        <ul className="space-y-2">
          {blindSpots.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-small text-ink-muted"
            >
              <span className="mt-0.5 shrink-0 text-warning" aria-hidden>
                &ndash;
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
