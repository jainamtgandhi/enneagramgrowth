import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentFile, getAllContentFiles } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER, ALL_TYPES } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";
import { getPairKey } from "@/lib/enneagram/relationships";

export const metadata: Metadata = {
  title: "Relationships & the Enneagram",
  description:
    "How to love, support, and connect with each type: practical guidance for partners, friends, and colleagues.",
  openGraph: {
    title: "Relationships & the Enneagram | Enneagram Growth",
    description:
      "How to love, support, and connect with each type. Explore all 45 type pairings with strengths, challenges, and growth tips.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Enneagram relationships - understanding type pairings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Relationships & the Enneagram | Enneagram Growth",
    description:
      "How to love, support, and connect with each type. Explore all 45 type pairings with strengths, challenges, and growth tips.",
  },
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default function RelationshipsPage() {
  const file = getContentFile<ArticleFrontmatter>("enneagram", "relationships");
  const allArticles = getAllContentFiles<ArticleFrontmatter>("enneagram").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
  const currentIndex = allArticles.findIndex((a) => a.slug === "relationships");
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  if (!file) return null;

  const readTime = estimateReadingTime(file.content);

  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <Breadcrumbs
        items={[
          { label: "Enneagram", href: "/enneagram" },
          { label: file.frontmatter.title },
        ]}
      />

      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        {file.frontmatter.title}
      </h1>
      <div className="flex items-center gap-3 text-small text-ink-muted mb-4">
        <span>
          Article {file.frontmatter.order} of {allArticles.length}
        </span>
        <span>&middot;</span>
        <span>~{readTime} min read</span>
      </div>
      <p className="text-body-lg text-ink-muted mb-12">
        {file.frontmatter.description}
      </p>

      <article className="prose prose-ink max-w-none">
        <MDXRemote source={file.content} />
      </article>

      {/* Pair Selector Matrix */}
      <section className="mt-16 pt-12 border-t border-border">
        <h2 className="font-serif text-h2 font-semibold text-ink mb-3">
          Explore Type Pairings
        </h2>
        <p className="text-body text-ink-muted mb-8 max-w-[56ch]">
          Select any two types to see how they interact in relationships:
          strengths, challenges, and growth tips.
        </p>

        {/* Grid matrix */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-1" />
                {ALL_TYPES.map((t) => {
                  const center = TYPE_TO_CENTER[t];
                  return (
                    <th key={t} className="p-1 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-small font-bold bg-center-${center}-soft text-center-${center}-ink`}
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
                return (
                  <tr key={row}>
                    <td className="p-1">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-small font-bold bg-center-${rowCenter}-soft text-center-${rowCenter}-ink`}
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
                      const isSame = row === col;
                      return (
                        <td key={col} className="p-1 text-center">
                          <Link
                            href={`/enneagram/relationships/${pairKey}`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-small font-medium text-ink-muted hover:border-brand hover:text-brand hover:bg-brand-soft/20 transition-all"
                            title={`Type ${row} & Type ${col}`}
                          >
                            {isSame ? (
                              <span className="text-[10px]">{row}&times;{col}</span>
                            ) : (
                              <span className="text-[10px]">{row}&times;{col}</span>
                            )}
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
        <p className="text-small text-ink-muted mt-4">
          Click any cell to explore that pairing in depth.
        </p>
      </section>

      {/* Prev/next navigation */}
      <nav className="mt-16 flex justify-between gap-4">
        {prev ? (
          <Link
            href={`/enneagram/${prev.slug}`}
            className="flex-1 rounded-xl border border-border p-4 hover:border-brand hover:shadow-card transition-all"
          >
            <span className="text-small text-ink-muted">&larr; Previous</span>
            <p className="text-ui font-medium text-ink mt-1">
              {prev.frontmatter.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/enneagram/${next.slug}`}
            className="flex-1 rounded-xl border border-border p-4 text-right hover:border-brand hover:shadow-card transition-all"
          >
            <span className="text-small text-ink-muted">Next &rarr;</span>
            <p className="text-ui font-medium text-ink mt-1">
              {next.frontmatter.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </main>
  );
}
