"use client";

import Link from "next/link";
import { useMyType } from "@/contexts/my-type-context";
import { TYPE_TO_CENTER, ALL_TYPES } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";
import { getPairKey } from "@/lib/enneagram/relationships";
import { centerBadge } from "@/lib/enneagram/center-classes";

export function RelationshipMatrix() {
  const { myType } = useMyType();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-1" />
            {ALL_TYPES.map((t) => {
              const center = TYPE_TO_CENTER[t];
              const isHighlighted = myType === t;
              return (
                <th key={t} className="p-1 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-small font-bold ${centerBadge[center]} ${isHighlighted ? "ring-2 ring-brand" : ""}`}
                  >
                    {t}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ALL_TYPES.map((row) => {
            const rowCenter = TYPE_TO_CENTER[row];
            const isRowHighlighted = myType === row;
            return (
              <tr key={row}>
                <td className="p-1">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-small font-bold ${centerBadge[rowCenter]} ${isRowHighlighted ? "ring-2 ring-brand" : ""}`}
                  >
                    {row}
                  </span>
                </td>
                {ALL_TYPES.map((col) => {
                  if (col < row) {
                    return <td key={col} className="p-1" />;
                  }
                  const pairKey = getPairKey(
                    row as EnneagramType,
                    col as EnneagramType
                  );
                  const isHighlighted = myType === row || myType === col;
                  return (
                    <td key={col} className="p-1 text-center">
                      <Link
                        href={`/relationships/${pairKey}`}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border text-small font-medium transition-all ${
                          isHighlighted
                            ? "border-brand/40 bg-brand-soft/20 text-brand hover:bg-brand-soft/40"
                            : "border-border text-ink-muted hover:border-brand hover:text-brand hover:bg-brand-soft/20"
                        }`}
                        title={`Type ${row} & Type ${col}`}
                      >
                        <span className="text-[10px]">
                          {row}&times;{col}
                        </span>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
