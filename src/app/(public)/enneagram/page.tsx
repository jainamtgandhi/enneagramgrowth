import type { Metadata } from "next";
import Link from "next/link";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { EnneagramDiagram } from "@/components/enneagram/enneagram-diagram";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Enneagram",
  description:
    "Explore the Enneagram — nine paths to self-understanding. Learn about the types, centers, wings, arrows, and more.",
};

const articles = [
  { href: "/enneagram/what-is-it", label: "What Is the Enneagram?", description: "The basics — a map, not a box." },
  { href: "/enneagram/centers", label: "The Three Centers", description: "Body, Heart, and Head intelligence." },
  { href: "/enneagram/wings", label: "Wings", description: "The types that shade your core pattern." },
  { href: "/enneagram/arrows", label: "Arrows & Growth Paths", description: "How you move in growth and stress." },
  { href: "/enneagram/instincts", label: "The Three Instincts", description: "Self-preservation, social, and one-to-one." },
  { href: "/enneagram/mistyping", label: "Common Misidentifications", description: "Why types get confused — and how to tell." },
  { href: "/enneagram/responsible-use", label: "Using It Responsibly", description: "Principles for ethical application." },
  { href: "/enneagram/glossary", label: "Glossary", description: "Key terms and definitions." },
  { href: "/enneagram/growth-practices", label: "Growth Practices", description: "From autopilot to awareness — practices for every type." },
  { href: "/enneagram/relationships", label: "Relationships", description: "How to love and connect with each type." },
];

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

export default function EnneagramHubPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        The Enneagram
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-8">
        A map of nine ways people meet the world — not to label, but to notice.
        Start wherever draws you.
      </p>

      {/* Start Here CTA */}
      <div className="rounded-xl border-2 border-brand bg-brand-soft/30 p-6 mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="font-serif text-h3 font-semibold text-ink mb-1">
            New here? Start with the basics.
          </h2>
          <p className="text-body text-ink-muted">
            Our free 7-lesson primer takes you from &ldquo;what is
            this?&rdquo; to &ldquo;I see it in myself&rdquo; — no login
            needed.
          </p>
        </div>
        <Button
          render={<Link href="/learn" />}
          className="rounded-full px-6 shrink-0"
        >
          Start learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* The Nine Types */}
      <section className="mb-20">
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
                      className={`rounded-lg border border-border bg-surface p-4 hover:border-center-${center} hover:shadow-card transition-all`}
                    >
                      <span
                        className={`font-serif text-h3 font-bold text-center-${center}-ink`}
                      >
                        {n}
                      </span>
                      <span className="ml-2 text-body font-medium text-ink">
                        {type.name}
                      </span>
                      <p className="text-small text-ink-muted mt-1 line-clamp-2">
                        {type.brief}
                      </p>
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

      {/* Explore the System — numbered learning path */}
      <section>
        <h2 className="font-serif text-h2 font-semibold text-ink mb-3">
          Explore the System
        </h2>
        <p className="text-body text-ink-muted mb-8 max-w-[56ch]">
          Go deeper into the framework — concepts build on each other, so
          reading in order helps, but jump wherever you like.
        </p>
        <div className="space-y-3">
          {articles.map((article, index) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 hover:border-brand hover:shadow-card transition-all"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-soft text-brand font-serif font-bold text-ui">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="text-body font-medium text-ink group-hover:text-brand transition-colors">
                  {article.label}
                </h3>
                <p className="text-small text-ink-muted mt-0.5">
                  {article.description}
                </p>
              </div>
              <span className="text-ink-muted group-hover:text-brand transition-colors mt-1">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
