import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import { EnneagramDiagram } from "@/components/enneagram/enneagram-diagram";
import { YourTypeBadge } from "@/components/enneagram/your-type-badge";

const centerHeadingClass: Record<Center, string> = {
  body: "text-center-body-ink",
  heart: "text-center-heart-ink",
  head: "text-center-head-ink",
};

const centerHoverBorder: Record<Center, string> = {
  body: "hover:border-center-body",
  heart: "hover:border-center-heart",
  head: "hover:border-center-head",
};

const centerNumberClass: Record<Center, string> = {
  body: "text-center-body-ink",
  heart: "text-center-heart-ink",
  head: "text-center-head-ink",
};

const centerTagClass: Record<Center, string> = {
  body: "bg-center-body-soft text-center-body-ink",
  heart: "bg-center-heart-soft text-center-heart-ink",
  head: "bg-center-head-soft text-center-head-ink",
};

export const metadata: Metadata = {
  title: "The Nine Types",
  description:
    "Explore all nine Enneagram types: their core patterns, motivations, and paths to growth.",
  openGraph: {
    title: "The Nine Enneagram Types | Enneagram Growth",
    description:
      "Explore all nine Enneagram types: their core patterns, motivations, and paths to growth.",
  },
};

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

export default function TypesOverviewPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        The Nine Types
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-8">
        Nine patterns of attention, motivation, and habit. Each a different way
        of navigating the world, none better than another.
      </p>

      <div className="rounded-xl border border-brand/20 bg-brand-soft/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12">
        <div className="flex-1">
          <p className="text-body font-medium text-ink">
            Not sure which type you are?
          </p>
          <p className="text-small text-ink-muted mt-0.5">
            Try our guided discovery process: 30 questions, three phases, no diagnosis.
          </p>
        </div>
        <Link
          href="/discover"
          className="text-ui font-medium text-brand hover:text-brand-hover transition-colors shrink-0"
        >
          Start discovering &rarr;
        </Link>
      </div>

      <div className="mx-auto max-w-[400px] mb-16">
        <EnneagramDiagram />
      </div>

      {CENTER_ORDER.map((center) => {
        const info = CENTER_INFO[center];
        return (
          <section key={center} className="mb-16">
            <h2
              className={`font-serif text-h2 font-semibold ${centerHeadingClass[center]} mb-2`}
            >
              {info.label}
            </h2>
            <p className="text-body text-ink-muted mb-8 max-w-[60ch]">
              {info.theme}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {info.types.map((n) => {
                const type = TYPE_INFO[n];
                return (
                  <Link
                    key={n}
                    href={`/types/${n}`}
                    className={`group rounded-xl border border-border p-6 ${centerHoverBorder[center]} hover:shadow-card transition-all`}
                  >
                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className={`font-serif text-h2 font-bold ${centerNumberClass[center]}`}
                      >
                        {n}
                      </span>
                      <span className="font-serif text-body-lg font-medium text-ink">
                        {type.name}
                      </span>
                      <YourTypeBadge typeNum={n} />
                    </div>
                    <p className="text-small text-ink-muted">{type.brief}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {type.keywords.map((kw) => (
                        <span
                          key={kw}
                          className={`rounded-full px-2.5 py-0.5 text-small ${centerTagClass[center]}`}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
