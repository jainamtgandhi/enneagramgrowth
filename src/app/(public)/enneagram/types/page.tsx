import type { Metadata } from "next";
import Link from "next/link";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import { EnneagramDiagram } from "@/components/enneagram/enneagram-diagram";

export const metadata: Metadata = {
  title: "The Nine Types",
  description:
    "Explore all nine Enneagram types — their core patterns, motivations, and paths to growth.",
};

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

export default function TypesOverviewPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        The Nine Types
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        Nine patterns of attention, motivation, and habit. Each a different way
        of navigating the world — none better than another.
      </p>

      <div className="mx-auto max-w-[400px] mb-16">
        <EnneagramDiagram />
      </div>

      {CENTER_ORDER.map((center) => {
        const info = CENTER_INFO[center];
        return (
          <section key={center} className="mb-16">
            <h2
              className={`font-serif text-h2 font-semibold text-center-${center}-ink mb-2`}
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
                    href={`/enneagram/types/${n}`}
                    className={`group rounded-xl border border-border p-6 hover:border-center-${center} hover:shadow-card transition-all`}
                  >
                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className={`font-serif text-h2 font-bold text-center-${center}-ink`}
                      >
                        {n}
                      </span>
                      <span className="font-serif text-body-lg font-medium text-ink">
                        {type.name}
                      </span>
                    </div>
                    <p className="text-small text-ink-muted">{type.brief}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {type.keywords.map((kw) => (
                        <span
                          key={kw}
                          className={`rounded-full bg-center-${center}-soft px-2.5 py-0.5 text-small text-center-${center}-ink`}
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
