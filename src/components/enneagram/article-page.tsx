import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentFile } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CommentSection } from "@/components/comments/comment-section";

interface ArticlePageProps {
  slug: string;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function ArticlePage({ slug }: ArticlePageProps) {
  const file = getContentFile<ArticleFrontmatter>("enneagram", slug);

  if (!file) {
    return (
      <main className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <h1 className="font-serif text-display font-semibold text-ink mb-4">
          Coming Soon
        </h1>
        <p className="text-body-lg text-ink-muted">
          This article is being written.
        </p>
      </main>
    );
  }

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
        <span>~{readTime} min read</span>
      </div>
      <p className="text-body-lg text-ink-muted mb-12">
        {file.frontmatter.description}
      </p>

      <article className="prose prose-ink max-w-none">
        <MDXRemote source={file.content} />
      </article>

      <CommentSection postType="article" postSlug={slug} />

      <div className="mt-16">
        <Link
          href="/enneagram"
          className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
        >
          &larr; Back to the Enneagram
        </Link>
      </div>
    </main>
  );
}
