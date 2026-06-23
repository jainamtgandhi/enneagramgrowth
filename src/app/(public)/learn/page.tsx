import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { LessonFrontmatter } from "@/lib/content/mdx";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

import { ProgressTracker } from "@/components/learn/progress-tracker";
import { LearnPath } from "@/components/learn/learn-path";

export const metadata: Metadata = {
  title: "Learn the Enneagram",
  description:
    "A free, self-paced introduction to the Enneagram, from the basics to finding your type.",
  openGraph: {
    title: "Learn the Enneagram | Enneagram Growth",
    description:
      "A free, self-paced primer: 7 lessons from 'what is this?' to reading your own patterns. No login, no rush.",
    images: [
      {
        url: "/images/learn-books.jpg",
        width: 1200,
        height: 630,
        alt: "Learn the Enneagram - books and learning materials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn the Enneagram | Enneagram Growth",
    description:
      "A free, self-paced primer: 7 lessons from 'what is this?' to reading your own patterns. No login, no rush.",
  },
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
    <div className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Learn" },
          ]}
        />

        <div className="relative rounded-2xl overflow-hidden mb-10 h-40 sm:h-56">
          <Image
            src="/images/learn-books.jpg"
            alt="Books and learning materials"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent" />
        </div>

        <h1 className="font-serif text-display font-semibold text-ink mb-4">
          Learn the Enneagram
        </h1>
        <p className="text-body-lg text-ink-muted max-w-[68ch] mb-3">
          A free, self-paced primer. No login, no rush, just a clear path
          through the essentials, at your own pace.
        </p>
        <p className="text-small text-ink-muted mb-4">
          {lessons.length} lessons &middot; ~{totalTime} min total reading time
        </p>
        <p className="text-small text-ink-muted mb-8">
          Already familiar with the basics?{" "}
          <Link
            href="/discover"
            className="text-brand font-medium hover:text-brand-hover transition-colors"
          >
            Skip to Find Your Type &rarr;
          </Link>
        </p>

        <div className="mb-8">
          <ProgressTracker
            totalLessons={lessons.length}
            lessonSlugs={lessons.map((l) => l.slug)}
          />
        </div>

        <LearnPath
          lessons={lessons.map((lesson) => ({
            slug: lesson.slug,
            title: lesson.frontmatter.title,
            description: lesson.frontmatter.description,
            order: lesson.frontmatter.order,
            readTime: estimateReadingTime(lesson.content),
          }))}
        />

        <div className="mt-12 p-6 rounded-xl bg-brand-soft/30 border border-brand/20 text-center">
          <p className="font-serif text-h3 font-semibold text-ink mb-2">
            Ready to explore your type?
          </p>
          <p className="text-body text-ink-muted mb-4">
            After the primer, try the Discovery process, a guided reflection to
            notice which patterns resonate most.
          </p>
          <Link
            href="/discover"
            className="inline-block rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
          >
            Start the Discovery process
          </Link>
        </div>
      </div>
  );
}
