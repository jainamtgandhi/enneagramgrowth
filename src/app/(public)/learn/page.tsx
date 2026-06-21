import type { Metadata } from "next";
import Link from "next/link";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { LessonFrontmatter } from "@/lib/content/mdx";

export const metadata: Metadata = {
  title: "Learn the Enneagram",
  description:
    "A free, self-paced introduction to the Enneagram — from the basics to finding your type.",
};

export default function LearnHubPage() {
  const lessons = getAllContentFiles<LessonFrontmatter>("learn").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );

  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Learn the Enneagram
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        A free, self-paced primer. No login, no rush — just a clear path
        through the essentials, at your own pace.
      </p>

      <ol className="space-y-4">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              href={`/learn/${lesson.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-border p-5 hover:border-brand hover:shadow-card transition-all"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-soft text-brand font-serif font-bold text-ui">
                {lesson.frontmatter.order}
              </span>
              <div>
                <h2 className="text-body font-medium text-ink group-hover:text-brand transition-colors">
                  {lesson.frontmatter.title}
                </h2>
                <p className="text-small text-ink-muted mt-1">
                  {lesson.frontmatter.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-12 p-6 rounded-xl bg-surface-sunken text-center">
        <p className="text-body text-ink-muted mb-3">
          Ready to explore your type?
        </p>
        <Link
          href="/discover"
          className="inline-block rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
        >
          Start the Discovery process
        </Link>
      </div>
    </main>
  );
}
