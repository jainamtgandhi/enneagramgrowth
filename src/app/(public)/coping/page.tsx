import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LevelBadge } from "@/components/shared/level-badge";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";

export const metadata: Metadata = {
  title: "Coping & Solutions",
  description:
    "When your patterns take over: understanding what's happening, why, and what you can actually do about it.",
  openGraph: {
    title: "Coping & Solutions | Enneagram Growth",
    description:
      "When your patterns take over: understanding what's happening, why, and what you can actually do about it.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Coping & Solutions - Enneagram Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coping & Solutions | Enneagram Growth",
    description:
      "When your patterns take over: understanding what's happening, why, and what you can actually do about it.",
  },
};

export default function CopingHubPage() {
  const topics = getAllContentFiles<ArticleFrontmatter>("coping").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );

  return (
    <main className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs items={[{ label: "Coping & Solutions" }]} />

      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Coping &amp; Solutions
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        When your patterns take over: understanding what&rsquo;s happening, why,
        and what you can actually do about it.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/coping/${topic.slug}`}
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
