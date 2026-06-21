import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentFile, getAllContentFiles } from "@/lib/content/mdx";
import type { LessonFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

const VALID_LESSONS = [
  "what-is-the-enneagram",
  "the-three-centers",
  "the-nine-types",
  "wings-arrows-growth",
  "finding-your-type",
  "using-it-responsibly",
  "going-deeper",
];

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function generateStaticParams() {
  return VALID_LESSONS.map((lesson) => ({ lesson }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lesson: string }>;
}): Promise<Metadata> {
  const { lesson } = await params;
  if (!VALID_LESSONS.includes(lesson)) return {};
  const file = getContentFile<LessonFrontmatter>("learn", lesson);
  if (!file) return {};
  return {
    title: file.frontmatter.title,
    description: file.frontmatter.description,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const { lesson } = await params;
  if (!VALID_LESSONS.includes(lesson)) notFound();

  const file = getContentFile<LessonFrontmatter>("learn", lesson);
  if (!file) notFound();

  const allLessons = getAllContentFiles<LessonFrontmatter>("learn").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
  const currentIndex = allLessons.findIndex((l) => l.slug === lesson);
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const next =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const readTime = estimateReadingTime(file.content);

  return (
    <main className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn" },
          { label: file.frontmatter.title },
        ]}
      />

      <div className="mb-8 flex items-center gap-3 text-small text-ink-muted">
        <span>
          Lesson {file.frontmatter.order} of {allLessons.length}
        </span>
        <span>&middot;</span>
        <span>~{readTime} min read</span>
      </div>

      <h1 className="font-serif text-h1 font-semibold text-ink mb-4">
        {file.frontmatter.title}
      </h1>
      <p className="text-body-lg text-ink-muted mb-12">
        {file.frontmatter.description}
      </p>

      <article className="prose prose-ink max-w-none">
        <MDXRemote source={file.content} />
      </article>

      {/* Last lesson CTA → discovery */}
      {!next && (
        <div className="mt-12 p-6 rounded-xl bg-brand-soft/30 border border-brand/20 text-center">
          <p className="font-serif text-h3 font-semibold text-ink mb-2">
            You&apos;ve completed the primer!
          </p>
          <p className="text-body text-ink-muted mb-4">
            Ready to explore which patterns resonate most? Try the Discovery
            process, a guided reflection, not a test.
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
            href={`/learn/${prev.slug}`}
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
            href={`/learn/${next.slug}`}
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
