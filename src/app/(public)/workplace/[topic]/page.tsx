import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getContentFile, getAllContentFiles, extractHeadings } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LevelBadge } from "@/components/shared/level-badge";
import { SectionSidebar, SectionMobilePills } from "@/components/layout/section-sidebar";
import { SECTIONS } from "@/lib/content/sections";
import { MdxArticle } from "@/components/shared/mdx-article";
import { TypeSelectorBar } from "@/components/enneagram/type-selector-bar";
import { TableOfContents } from "@/components/shared/table-of-contents";

const TOPIC_SLUGS = [
  "type-styles",
  "team-dynamics",
  "managing",
  "conflict",
  "stress",
  "exercises",
] as const;

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function generateStaticParams() {
  return TOPIC_SLUGS.map((topic) => ({ topic }));
}

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const file = getContentFile<ArticleFrontmatter>("workplace", topic);

  if (!file) {
    return { title: "Not Found" };
  }

  return {
    title: file.frontmatter.title,
    description: file.frontmatter.description,
    openGraph: {
      title: `${file.frontmatter.title} | Enneagram Growth`,
      description: file.frontmatter.description,
    },
  };
}

export default async function WorkplaceTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const file = getContentFile<ArticleFrontmatter>("workplace", topic);

  if (!file) {
    notFound();
  }

  const allTopics = getAllContentFiles<ArticleFrontmatter>("workplace").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
  const currentIndex = allTopics.findIndex((a) => a.slug === topic);
  const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const next =
    currentIndex < allTopics.length - 1
      ? allTopics[currentIndex + 1]
      : null;
  const readTime = estimateReadingTime(file.content);
  const headings = extractHeadings(file.content);
  const topicConfig = SECTIONS.workplace.topics.find((t) => t.slug === topic);
  const showTypeSelector = topicConfig?.hasTypeAnchors ?? false;
  const showCenterSelector = topicConfig?.hasCenterAnchors ?? false;
  const showToc = headings.length >= 4;

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
        <SectionSidebar
          sectionLabel={SECTIONS.workplace.label}
          basePath={SECTIONS.workplace.basePath}
          topics={SECTIONS.workplace.topics}
        />

        <main>
          <Breadcrumbs
            items={[
              { label: "Workplace", href: "/workplace" },
              { label: file.frontmatter.title },
            ]}
          />

          <h1 className="font-serif text-display font-semibold text-ink mb-4">
            {file.frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-small text-ink-muted mb-4">
            <span>
              Article {file.frontmatter.order} of {allTopics.length}
            </span>
            <span>&middot;</span>
            <span>~{readTime} min read</span>
            {file.frontmatter.level && (
              <>
                <span>&middot;</span>
                <LevelBadge level={file.frontmatter.level} />
              </>
            )}
          </div>
          <p className="text-body-lg text-ink-muted mb-12">
            {file.frontmatter.description}
          </p>

          {showTypeSelector && <TypeSelectorBar mode="type" />}
          {showCenterSelector && <TypeSelectorBar mode="center" />}

          <div className={showToc ? "xl:grid xl:grid-cols-[1fr_180px] xl:gap-8" : ""}>
            <MdxArticle source={file.content} />
            {showToc && <TableOfContents headings={headings} />}
          </div>

          <SectionMobilePills
            sectionLabel={SECTIONS.workplace.label}
            basePath={SECTIONS.workplace.basePath}
            topics={SECTIONS.workplace.topics}
            currentSlug={topic}
          />

          <nav className="mt-16 flex justify-between gap-4">
            {prev ? (
              <Link
                href={`/workplace/${prev.slug}`}
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
                href={`/workplace/${next.slug}`}
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
