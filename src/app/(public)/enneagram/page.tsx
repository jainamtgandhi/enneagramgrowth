import type { Metadata } from "next";
import Link from "next/link";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { EnneagramDiagram } from "@/components/enneagram/enneagram-diagram";

export const metadata: Metadata = {
  title: "The Enneagram",
  description:
    "Explore the Enneagram — nine paths to self-understanding. Learn about the types, centers, wings, arrows, and more.",
};

const articles = [
  { href: "/enneagram/what-is-it", label: "What Is the Enneagram?" },
  { href: "/enneagram/centers", label: "The Three Centers" },
  { href: "/enneagram/wings", label: "Wings" },
  { href: "/enneagram/arrows", label: "Arrows & Growth Paths" },
  { href: "/enneagram/instincts", label: "The Three Instincts" },
  { href: "/enneagram/mistyping", label: "Common Misidentifications" },
  { href: "/enneagram/responsible-use", label: "Using It Responsibly" },
  { href: "/enneagram/glossary", label: "Glossary" },
];

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

export default function EnneagramHubPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-16">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        The Enneagram
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-16">
        A map of nine ways people meet the world — not to label, but to notice.
        Start wherever draws you.
      </p>

      <section className="mb-16">
        <h2 className="font-serif text-h2 font-semibold text-ink mb-8">
          The Nine Types
        </h2>
        <div className="mx-auto max-w-[400px] mb-12">
          <EnneagramDiagram />
        </div>
        {CENTER_ORDER.map((center) => {
          const info = CENTER_INFO[center];
          return (
            <div key={center} className="mb-8">
              <h3
                className={`text-ui font-medium text-center-${center}-ink mb-3`}
              >
                {info.label}
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {info.types.map((n) => {
                  const type = TYPE_INFO[n];
                  return (
                    <Link
                      key={n}
                      href={`/enneagram/types/${n}`}
                      className={`rounded-lg border border-border p-4 hover:border-center-${center} hover:shadow-card transition-all`}
                    >
                      <span
                        className={`font-serif text-h3 font-bold text-center-${center}-ink`}
                      >
                        {n}
                      </span>
                      <span className="ml-2 text-body font-medium text-ink">
                        {type.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
        <Link
          href="/enneagram/types"
          className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
        >
          View all types &rarr;
        </Link>
      </section>

      <section>
        <h2 className="font-serif text-h2 font-semibold text-ink mb-8">
          Explore the System
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-lg border border-border p-4 hover:border-brand hover:shadow-card transition-all"
            >
              <span className="text-body font-medium text-ink">
                {article.label}
              </span>
              <span className="ml-2 text-ink-muted">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
