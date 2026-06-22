import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LevelBadge } from "@/components/shared/level-badge";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";

export const metadata: Metadata = {
  title: "Growth Practices",
  description:
    "From autopilot to awareness: the inner process of growth, practical exercises for each type and center, and a week-long practice plan.",
  openGraph: {
    title: "Growth Practices | Enneagram Growth",
    description:
      "From autopilot to awareness: the inner process of growth, practical exercises for each type and center, and a week-long practice plan.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Growth Practices - Enneagram Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Practices | Enneagram Growth",
    description:
      "From autopilot to awareness: the inner process of growth, practical exercises for each type and center, and a week-long practice plan.",
  },
};

export default function GrowthHubPage() {
  const topics = getAllContentFiles<ArticleFrontmatter>("growth").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );

  return (
    <main className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs items={[{ label: "Growth Practices" }]} />

      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Growth Practices
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        Growth is not a flash of insight. It is the slow, unglamorous,
        deeply rewarding process of building new patterns one choice at a time.
        These guides walk you through the core mechanism, practices for your
        center and type, and a structured plan to begin.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/growth/${topic.slug}`}
            className="group rounded-2xl border border-border p-6 hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-small text-ink-muted">
                {topic.frontmatter.order} of {topics.length}
              </span>
              {topic.frontmatter.level && (
                <LevelBadge level={topic.frontmatter.level} />
              )}
            </div>
            <h2 className="font-serif text-h3 font-semibold text-ink group-hover:text-brand transition-colors mb-2">
              {topic.frontmatter.title}
            </h2>
            <p className="text-small text-ink-muted line-clamp-3">
              {topic.frontmatter.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
