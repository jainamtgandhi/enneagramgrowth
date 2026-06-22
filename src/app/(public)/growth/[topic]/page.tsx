import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getContentFile,
  getAllContentFiles,
  extractHeadings,
} from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { MdxArticle } from "@/components/shared/mdx-article";
import { TypeSelectorBar } from "@/components/enneagram/type-selector-bar";
import { TableOfContents } from "@/components/shared/table-of-contents";
import { SECTIONS } from "@/lib/content/sections";

const SLUGS = [
  "core-process",
  "by-center",
  "by-type",
  "weekly-plan",
  "principles",
] as const;

export function generateStaticParams() {
  return SLUGS.map((topic) => ({ topic }));
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const file = getContentFile<ArticleFrontmatter>("growth", topic);
  if (!file) return { title: "Not Found" };

  const { title, description } = file.frontmatter;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Enneagram Growth`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Enneagram Growth`,
      description,
    },
  };
}

export default async function GrowthTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const file = getContentFile<ArticleFrontmatter>("growth", topic);
  if (!file) notFound();

  const allTopics = getAllContentFiles<ArticleFrontmatter>("growth").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
  const currentIndex = allTopics.findIndex((t) => t.slug === topic);
  const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const next =
    currentIndex < allTopics.length - 1
      ? allTopics[currentIndex + 1]
      : null;
  const readTime = estimateReadingTime(file.content);
  const headings = extractHeadings(file.content);
  const topicConfig = SECTIONS.growth.topics.find((t) => t.slug === topic);
  const showTypeSelector = topicConfig?.hasTypeAnchors ?? false;
  const showCenterSelector = topicConfig?.hasCenterAnchors ?? false;

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className={headings.length >= 4 ? "lg:grid lg:grid-cols-[200px_1fr] lg:gap-12" : ""}>
        {headings.length >= 4 && <TableOfContents headings={headings} />}

        <main>
          <Breadcrumbs
            items={[
              { label: "Growth Practices", href: "/growth" },
              { label: file.frontmatter.title },
            ]}
          />

          <h1 className="font-serif text-display font-semibold text-ink mb-4">
            {file.frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-small text-ink-muted mb-4">
            <span>~{readTime} min read</span>
          </div>
          <p className="text-body-lg text-ink-muted mb-12">
            {file.frontmatter.description}
          </p>

          {showTypeSelector && <TypeSelectorBar mode="type" />}
          {showCenterSelector && <TypeSelectorBar mode="center" />}

          <MdxArticle source={file.content} />

          {!next && (
            <div className="mt-12 p-6 rounded-xl bg-brand-soft/30 border border-brand/20 text-center">
              <p className="font-serif text-h3 font-semibold text-ink mb-2">
                Ready to put this into practice?
              </p>
              <p className="text-body text-ink-muted mb-4">
                Try the Discovery process: a guided reflection to help you see
                which patterns resonate most.
              </p>
              <Link
                href="/discover"
                className="inline-block rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
              >
                Start the Discovery process
              </Link>
            </div>
          )}

          <nav className="mt-16 flex justify-between gap-4">
            {prev ? (
              <Link
                href={`/growth/${prev.slug}`}
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
                href={`/growth/${next.slug}`}
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
      </div>
    </div>
  );
}
