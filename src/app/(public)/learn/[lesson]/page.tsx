import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentFile, getAllContentFiles } from "@/lib/content/mdx";
import type { LessonFrontmatter } from "@/lib/content/mdx";

const VALID_LESSONS = [
  "what-is-the-enneagram",
  "the-three-centers",
  "the-nine-types",
  "wings-arrows-growth",
  "finding-your-type",
  "using-it-responsibly",
  "going-deeper",
];

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

  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/learn"
          className="text-small text-ink-muted hover:text-ink transition-colors"
        >
          &larr; All Lessons
        </Link>
        <span className="text-small text-ink-muted">
          Lesson {file.frontmatter.order} of {allLessons.length}
        </span>
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
