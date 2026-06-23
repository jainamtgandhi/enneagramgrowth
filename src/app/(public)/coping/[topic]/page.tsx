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
import { TableOfContents } from "@/components/shared/table-of-contents";
import { ReadingProgress } from "@/components/shared/reading-progress";
import { VisitMarker } from "@/components/shared/visit-marker";

const COPING_BY_CENTER: {
  label: string;
  colorClass: string;
  slugs: string[];
}[] = [
  {
    label: "Body Patterns",
    colorClass: "text-center-body-ink",
    slugs: ["controlling", "anger", "numbing"],
  },
  {
    label: "Heart Patterns",
    colorClass: "text-center-heart-ink",
    slugs: ["over-giving", "performing", "sadness", "shame"],
  },
  {
    label: "Head Patterns",
    colorClass: "text-center-head-ink",
    slugs: ["withdrawing", "anxiety", "restlessness", "fear"],
  },
];

export function generateStaticParams() {
  const files = getAllContentFiles<ArticleFrontmatter>("coping");
  return files.map((file) => ({ topic: file.slug }));
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
  const file = getContentFile<ArticleFrontmatter>("coping", topic);
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

export default async function CopingTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const file = getContentFile<ArticleFrontmatter>("coping", topic);
  if (!file) notFound();

  const allTopics = getAllContentFiles<ArticleFrontmatter>("coping").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
  const readTime = estimateReadingTime(file.content);
  const headings = extractHeadings(file.content);

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <ReadingProgress />
      <VisitMarker />
      <div className={headings.length >= 4 ? "lg:grid lg:grid-cols-[200px_1fr] lg:gap-12" : ""}>
        {headings.length >= 4 && <TableOfContents headings={headings} />}

        <main>
          <Breadcrumbs
            items={[
              { label: "Coping & Solutions", href: "/coping" },
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

          <MdxArticle source={file.content} />

          {/* More patterns — grouped by center */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-small font-semibold text-ink-muted uppercase tracking-wider mb-6">
              More in Coping &amp; Solutions
            </p>
            {COPING_BY_CENTER.map((center) => {
              const centerTopics = center.slugs
                .map((s) => allTopics.find((t) => t.slug === s))
                .filter((t): t is typeof allTopics[number] => !!t && t.slug !== topic);
              if (centerTopics.length === 0) return null;
              return (
                <div key={center.label} className="mb-4">
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${center.colorClass}`}>
                    {center.label}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {centerTopics.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/coping/${t.slug}`}
                        className="rounded-lg border border-border px-4 py-3 hover:border-brand hover:shadow-card transition-all"
                      >
                        <p className="text-ui font-medium text-ink">
                          {t.frontmatter.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
