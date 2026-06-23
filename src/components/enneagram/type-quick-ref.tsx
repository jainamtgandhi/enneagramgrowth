import Link from "next/link";
import { TYPE_MOTIVATIONS } from "@/lib/enneagram/motivations";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";

const centerBorder = {
  body: "border-center-body/30",
  heart: "border-center-heart/30",
  head: "border-center-head/30",
} as const;

const centerBg = {
  body: "bg-center-body-soft/30",
  heart: "bg-center-heart-soft/30",
  head: "bg-center-head-soft/30",
} as const;

const centerText = {
  body: "text-center-body-ink",
  heart: "text-center-heart-ink",
  head: "text-center-head-ink",
} as const;

export function TypeQuickRef({ typeNum }: { typeNum: EnneagramType }) {
  const m = TYPE_MOTIVATIONS[typeNum];
  const info = TYPE_INFO[typeNum];
  const center = TYPE_TO_CENTER[typeNum];

  return (
    <div
      className={`rounded-xl border ${centerBorder[center]} ${centerBg[center]} p-5 sm:p-6 mb-8`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-4">
        At a glance
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
            Core Fear
          </p>
          <p className="text-small font-medium text-ink">{m.basicFear}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
            Core Desire
          </p>
          <p className="text-small font-medium text-ink">{m.basicDesire}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
            Inner Voice
          </p>
          <p className="text-small font-medium text-ink italic">
            &ldquo;{m.superego}&rdquo;
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
            Core Emotion
          </p>
          <p className="text-small font-medium text-ink">{m.coreEmotion}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center gap-x-6 gap-y-2 text-small">
        <span className="text-ink-muted">
          Growth{" "}
          <Link
            href={`/types/${m.growthArrow}`}
            className={`font-semibold ${centerText[center]} hover:underline`}
          >
            &rarr; {m.growthArrow} {TYPE_INFO[m.growthArrow].name}
          </Link>
        </span>
        <span className="text-ink-muted">
          Stress{" "}
          <Link
            href={`/types/${m.stressArrow}`}
            className="font-semibold text-ink hover:underline"
          >
            &rarr; {m.stressArrow} {TYPE_INFO[m.stressArrow].name}
          </Link>
        </span>
        <span className="text-ink-muted">
          Wings{" "}
          <Link
            href={`/types/${m.wing1}`}
            className="font-semibold text-ink hover:underline"
          >
            {m.wing1}
          </Link>
          {" & "}
          <Link
            href={`/types/${m.wing2}`}
            className="font-semibold text-ink hover:underline"
          >
            {m.wing2}
          </Link>
        </span>
      </div>
    </div>
  );
}
