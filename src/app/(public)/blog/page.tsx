import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/content/queries";
import { PostCard } from "@/components/blog/post-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, reflections, and practical guidance on the Enneagram and personal growth.",
  openGraph: {
    title: "Blog | Enneagram Growth",
    description:
      "Insights, reflections, and practical guidance on the Enneagram and personal growth.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Enneagram Growth blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Enneagram Growth",
    description:
      "Insights, reflections, and practical guidance on the Enneagram and personal growth.",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft">
            <PenLine className="h-5 w-5 text-brand" />
          </div>
          <h1 className="font-serif text-display font-semibold text-ink">
            Blog
          </h1>
        </div>
        <p className="text-body-lg text-ink-muted max-w-[56ch]">
          Insights, reflections, and practical guidance on the Enneagram and
          personal growth.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center">
          <p className="font-serif text-h3 font-semibold text-ink mb-2">
            Coming soon
          </p>
          <p className="text-body text-ink-muted max-w-[44ch] mx-auto">
            We are working on articles about applying the Enneagram to real
            life. In the meantime, explore the{" "}
            <Link
              href="/enneagram"
              className="text-brand hover:text-brand-hover transition-colors font-medium"
            >
              Library
            </Link>{" "}
            or start the{" "}
            <Link
              href="/learn"
              className="text-brand hover:text-brand-hover transition-colors font-medium"
            >
              primer course
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
