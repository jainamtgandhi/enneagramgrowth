import type { Metadata } from "next";
import { TypeCard } from "@/components/library/type-card";
import { SectionHeader } from "@/components/shared/section-header";
import { ALL_TYPES } from "@/lib/enneagram/descriptions";
import { getPublishedArticles } from "@/lib/content/queries";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Type Library",
  description:
    "Explore all nine Enneagram types. In-depth guides to understanding your personality, motivations, and growth path.",
};

export default async function LibraryPage() {
  const articles = await getPublishedArticles();

  const articlesByType = ALL_TYPES.reduce(
    (acc, type) => {
      const typeArticle = articles.find((a) => a.slug === `type-${type}`);
      acc[type] = typeArticle?.slug;
      return acc;
    },
    {} as Record<number, string | undefined>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeader
        title="The Nine Types"
        description="Explore each Enneagram type in depth. Understand core motivations, fears, and paths to growth."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_TYPES.map((type) => (
          <TypeCard key={type} type={type} slug={articlesByType[type]} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
        <h3 className="font-heading text-xl font-semibold">
          Using the Enneagram Responsibly
        </h3>
        <p className="mt-2 text-muted-foreground">
          The Enneagram is a tool for self-understanding, not a box to put
          people in. Learn how to use it with care and respect.
        </p>
        <Link
          href="/library/responsible-use"
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Read our responsible use guide &rarr;
        </Link>
      </div>
    </div>
  );
}
