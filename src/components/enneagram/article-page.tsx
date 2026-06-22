import Link from "next/link";
import { getContentFile, getAllContentFiles, extractHeadings } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LevelBadge } from "@/components/shared/level-badge";
import { SuggestedReading } from "@/components/shared/suggested-reading";
import { SectionMobilePills } from "@/components/layout/section-sidebar";
import { SECTIONS } from "@/lib/content/sections";
import { MdxArticle } from "@/components/shared/mdx-article";
import { TableOfContents } from "@/components/shared/table-of-contents";

type ContentDir = "enneagram" | "learn" | "coping" | "workplace" | "growth";

interface ArticlePageProps {
  slug: string;
  contentDir?: ContentDir;
  basePath?: string;
  hubLabel?: string;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function ArticlePage({
  slug,
  contentDir = "enneagram",
  basePath = "/library",
  hubLabel = "Library",
}: ArticlePageProps) {
  const file = getContentFile<ArticleFrontmatter>(contentDir, slug);

  if (!file) {
    return (
      <div className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <h1 className="font-serif text-display font-semibold text-ink mb-4">
          Coming Soon
        </h1>
        <p className="text-body-lg text-ink-muted">
          This article is being written.
        </p>
      </div>
    );
  }

  const allArticles = getAllContentFiles<ArticleFrontmatter>(contentDir).sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const next =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;
  const readTime = estimateReadingTime(file.content);
  const headings = extractHeadings(file.content);

  const sectionKey = Object.keys(SECTIONS).find(
    (key) => SECTIONS[key].basePath === basePath
  );
  const section = sectionKey ? SECTIONS[sectionKey] : null;

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className={headings.length >= 4 ? "lg:grid lg:grid-cols-[200px_1fr] lg:gap-12" : ""}>
        {headings.length >= 4 && <TableOfContents headings={headings} />}

        <main>
          <Breadcrumbs
            items={[
              { label: hubLabel, href: basePath },
              { label: file.frontmatter.title },
            ]}
          />

          <h1 className="font-serif text-display font-semibold text-ink mb-4">
            {file.frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-small text-ink-muted mb-4">
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

          <MdxArticle source={file.content} />

          {!next && (
            <div className="mt-12 p-6 rounded-xl bg-brand-soft/30 border border-brand/20 text-center">
              <p className="font-serif text-h3 font-semibold text-ink mb-2">
                You&apos;ve explored the full system!
              </p>
              <p className="text-body text-ink-muted mb-4">
                Ready to see which patterns resonate most? Try the Discovery
                process: a guided reflection, not a test.
              </p>
              <Link
                href="/discover"
                className="inline-block rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
              >
                Start the Discovery process
              </Link>
            </div>
          )}

          {file.frontmatter.relatedSlugs && file.frontmatter.relatedSlugs.length > 0 && (
            <SuggestedReading
              slugs={file.frontmatter.relatedSlugs}
              contentType={contentDir}
            />
          )}

          {/* More in this section */}
          {allArticles.length > 1 && (
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-small font-semibold text-ink-muted uppercase tracking-wider mb-4">
                More in {hubLabel}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {allArticles
                  .filter((a) => a.slug !== slug)
                  .slice(0, 4)
                  .map((a) => (
                    <Link
                      key={a.slug}
                      href={`${basePath}/${a.slug}`}
                      className="rounded-xl border border-border p-4 hover:border-brand hover:shadow-card transition-all"
                    >
                      <p className="text-ui font-medium text-ink">
                        {a.frontmatter.title}
                      </p>
                      {a.frontmatter.description && (
                        <p className="text-small text-ink-muted mt-1 line-clamp-2">
                          {a.frontmatter.description}
                        </p>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {section && (
            <SectionMobilePills
              sectionLabel={section.label}
              basePath={section.basePath}
              topics={section.topics}
              currentSlug={slug}
            />
          )}
        </main>
      </div>
    </div>
  );
}
