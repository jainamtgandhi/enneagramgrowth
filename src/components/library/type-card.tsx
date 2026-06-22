import Link from "next/link";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";

interface TypeCardProps {
  type: EnneagramType;
}

export function TypeCard({ type }: TypeCardProps) {
  const info = TYPE_INFO[type];
  const center = TYPE_TO_CENTER[type];
  const href = `/types/${type}`;

  return (
    <Link
      href={href}
      className={`group block rounded-xl border border-border p-6 hover:border-center-${center} hover:shadow-card transition-all`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-center-${center}-soft text-center-${center}-ink font-serif font-bold text-body`}
        >
          {type}
        </div>
        <h3 className="font-serif text-body-lg font-semibold group-hover:text-brand transition-colors">
          {info.name}
        </h3>
      </div>
      <p className="text-small text-ink-muted leading-relaxed">{info.brief}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {info.keywords.slice(0, 3).map((keyword) => (
          <span
            key={keyword}
            className={`inline-block rounded-full bg-center-${center}-soft px-2 py-0.5 text-small text-center-${center}-ink`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </Link>
  );
}
