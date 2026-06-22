import Link from "next/link";
import { getContentFile } from "@/lib/content/mdx";
import type { ArticleFrontmatter, LessonFrontmatter } from "@/lib/content/mdx";
import { LevelBadge } from "@/components/shared/level-badge";

interface SuggestedReadingProps {
  slugs: string[];
  contentType: "learn" | "enneagram";
}

type ContentFrontmatter = LessonFrontmatter | ArticleFrontmatter;

export function SuggestedReading({ slugs, contentType }: SuggestedReadingProps) {
  if (slugs.length === 0) return null;

  const basePath = contentType === "learn" ? "/learn" : "/enneagram";

  const articles = slugs
    .map((slug) => {
      const file = getContentFile<ContentFrontmatter>(contentType, slug);
      if (!file) return null;
      return {
        slug: file.slug,
        title: file.frontmatter.title,
        description: file.frontmatter.description,
        level: "level" in file.frontmatter ? file.frontmatter.level : undefined,
      };
    })
    .filter((a): a is NonNullable<typeof a> => a !== null);

  if (articles.length === 0) return null;

  return (
    <aside className="mt-12 mb-4" aria-labelledby="suggested-reading-heading">
      <h2
        id="suggested-reading-heading"
        className="font-serif text-h3 font-semibold text-ink mb-4"
      >
        Where to go next
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`${basePath}/${article.slug}`}
            className="group flex flex-col rounded-xl border border-border bg-surface p-5 hover:border-brand hover:shadow-card transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-body font-medium text-ink group-hover:text-brand transition-colors">
                {article.title}
              </h3>
              {article.level && <LevelBadge level={article.level} />}
            </div>
            <p className="text-small text-ink-muted line-clamp-2 flex-1">
              {article.description}
            </p>
            <span className="text-small font-medium text-brand mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              Read article &rarr;
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
