import type { Metadata } from "next";
import Link from "next/link";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { LessonFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Learn the Enneagram",
  description:
    "A free, self-paced introduction to the Enneagram — from the basics to finding your type.",
};

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default function LearnHubPage() {
  const lessons = getAllContentFiles<LessonFrontmatter>("learn").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );

  const totalTime = lessons.reduce(
    (sum, l) => sum + estimateReadingTime(l.content),
    0
  );

  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Learn" },
        ]}
      />

      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Learn the Enneagram
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-3">
        A free, self-paced primer. No login, no rush — just a clear path
        through the essentials, at your own pace.
      </p>
      <p className="text-small text-ink-muted mb-12">
        {lessons.length} lessons &middot; ~{totalTime} min total reading time
      </p>

      <ol className="relative space-y-4">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-[20px] bottom-[20px] w-px bg-border" />

        {lessons.map((lesson) => {
          const readTime = estimateReadingTime(lesson.content);
          return (
            <li key={lesson.slug} className="relative">
              <Link
                href={`/learn/${lesson.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 hover:border-brand hover:shadow-card transition-all"
              >
                <span className="relative z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-soft text-brand font-serif font-bold text-ui border-2 border-surface">
                  {lesson.frontmatter.order}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-body font-medium text-ink group-hover:text-brand transition-colors">
                    {lesson.frontmatter.title}
                  </h2>
                  <p className="text-small text-ink-muted mt-1">
                    {lesson.frontmatter.description}
                  </p>
                  <span className="text-small text-ink-muted mt-1 block">
                    ~{readTime} min read
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 p-6 rounded-xl bg-brand-soft/30 border border-brand/20 text-center">
        <p className="font-serif text-h3 font-semibold text-ink mb-2">
          Ready to explore your type?
        </p>
        <p className="text-body text-ink-muted mb-4">
          After the primer, try the Discovery process — a guided reflection to
          notice which patterns resonate most.
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
