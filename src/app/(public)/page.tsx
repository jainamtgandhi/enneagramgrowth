import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";
import { getLatestPosts } from "@/lib/content/queries";
import { formatDate } from "@/lib/utils/format";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/40 to-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 sm:py-36 text-center">
          <h1 className="font-serif text-display font-semibold tracking-tight sm:text-[3.5rem] lg:text-[4rem]">
            The internet is full of places
            <br className="hidden sm:block" />
            that tell you what you are.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-body-lg text-ink-muted leading-relaxed">
            This is a place that helps you watch yourself — with depth, not
            diagnosis. Explore the Enneagram at your own pace.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              render={<Link href="/discover" />}
              size="lg"
              className="rounded-full px-8"
            >
              Find your way in
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              render={<Link href="/learn" />}
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              Start learning
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            How It Works
          </h2>
          <p className="mt-3 text-body text-ink-muted max-w-[52ch] mx-auto">
            Three natural steps — no rush, no pressure. Just a clear path to
            understanding yourself better.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
              <BookOpen className="h-6 w-6 text-brand" />
            </div>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 font-serif text-[5rem] font-bold text-brand/[0.06] leading-none">
              1
            </span>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
              Learn
            </h3>
            <p className="text-body text-ink-muted max-w-[32ch] mx-auto">
              Seven free lessons take you from &ldquo;what is this?&rdquo; to
              understanding the core framework.
            </p>
            <Link
              href="/learn"
              className="mt-4 inline-block text-ui font-medium text-brand hover:text-brand-hover transition-colors"
            >
              Start the primer
            </Link>
          </div>

          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
              <Compass className="h-6 w-6 text-brand" />
            </div>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 font-serif text-[5rem] font-bold text-brand/[0.06] leading-none">
              2
            </span>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
              Discover
            </h3>
            <p className="text-body text-ink-muted max-w-[32ch] mx-auto">
              A guided reflection — not a quiz — that helps you notice which
              patterns resonate most.
            </p>
            <Link
              href="/discover"
              className="mt-4 inline-block text-ui font-medium text-brand hover:text-brand-hover transition-colors"
            >
              Find your way in
            </Link>
          </div>

          <div className="relative text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
              <Sparkles className="h-6 w-6 text-brand" />
            </div>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 font-serif text-[5rem] font-bold text-brand/[0.06] leading-none">
              3
            </span>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
              Explore
            </h3>
            <p className="text-body text-ink-muted max-w-[32ch] mx-auto">
              Dive deep into your type — subtypes, growth paths, relationships,
              and daily practices.
            </p>
            <Link
              href="/enneagram/types"
              className="mt-4 inline-block text-ui font-medium text-brand hover:text-brand-hover transition-colors"
            >
              Browse all types
            </Link>
          </div>
        </div>
      </section>

      {/* Centers Preview */}
      <section className="bg-surface-sunken/50">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-h1 font-semibold text-ink">
              Nine Types, Three Centers
            </h2>
            <p className="mt-3 text-body text-ink-muted max-w-[52ch] mx-auto">
              The Enneagram organizes nine patterns of attention around three
              centers of intelligence — Body, Heart, and Head.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-center-body" />
                <h3 className="font-serif text-h3 font-semibold text-center-body-ink">
                  Body Center
                </h3>
              </div>
              <p className="text-ui text-ink-muted mb-4">
                Types 8, 9, 1 — grounded in instinct, gut wisdom, and action.
              </p>
              <div className="space-y-2">
                <Link href="/enneagram/types/8" className="block text-ui text-ink hover:text-center-body-ink transition-colors">Type 8 · The Challenger</Link>
                <Link href="/enneagram/types/9" className="block text-ui text-ink hover:text-center-body-ink transition-colors">Type 9 · The Peacemaker</Link>
                <Link href="/enneagram/types/1" className="block text-ui text-ink hover:text-center-body-ink transition-colors">Type 1 · The Reformer</Link>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-center-heart" />
                <h3 className="font-serif text-h3 font-semibold text-center-heart-ink">
                  Heart Center
                </h3>
              </div>
              <p className="text-ui text-ink-muted mb-4">
                Types 2, 3, 4 — attuned to feeling, identity, and connection.
              </p>
              <div className="space-y-2">
                <Link href="/enneagram/types/2" className="block text-ui text-ink hover:text-center-heart-ink transition-colors">Type 2 · The Helper</Link>
                <Link href="/enneagram/types/3" className="block text-ui text-ink hover:text-center-heart-ink transition-colors">Type 3 · The Achiever</Link>
                <Link href="/enneagram/types/4" className="block text-ui text-ink hover:text-center-heart-ink transition-colors">Type 4 · The Individualist</Link>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-center-head" />
                <h3 className="font-serif text-h3 font-semibold text-center-head-ink">
                  Head Center
                </h3>
              </div>
              <p className="text-ui text-ink-muted mb-4">
                Types 5, 6, 7 — oriented by thinking, planning, and perception.
              </p>
              <div className="space-y-2">
                <Link href="/enneagram/types/5" className="block text-ui text-ink hover:text-center-head-ink transition-colors">Type 5 · The Investigator</Link>
                <Link href="/enneagram/types/6" className="block text-ui text-ink hover:text-center-head-ink transition-colors">Type 6 · The Loyalist</Link>
                <Link href="/enneagram/types/7" className="block text-ui text-ink hover:text-center-head-ink transition-colors">Type 7 · The Enthusiast</Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/enneagram"
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
            >
              Explore the full Enneagram system &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-h1 font-semibold text-ink">
              From the Blog
            </h2>
            <p className="mt-3 text-body text-ink-muted max-w-[48ch] mx-auto">
              Reflections, guides, and deeper dives into the Enneagram.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-border bg-surface p-6 hover:border-brand hover:shadow-card transition-all"
              >
                <h3 className="font-serif text-h3 font-semibold text-ink group-hover:text-brand transition-colors mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-ui text-ink-muted line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2 text-small text-ink-muted">
                  {post.published_at && <time>{formatDate(post.published_at)}</time>}
                  {post.reading_time_min && (
                    <>
                      <span>&middot;</span>
                      <span>{post.reading_time_min} min read</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
            >
              View all posts &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Discovery CTA */}
      <section className="bg-gradient-to-b from-brand-soft/40 to-paper">
        <div className="mx-auto max-w-[720px] px-4 py-20 sm:px-6 text-center">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted max-w-[48ch] mx-auto">
            A short guided reflection — not a quiz, not a verdict. Just a
            starting point to notice which patterns resonate.
          </p>
          <Button
            render={<Link href="/discover" />}
            size="lg"
            className="mt-8 rounded-full px-8"
          >
            Begin the Discovery process
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Learn CTA */}
      <section className="mx-auto max-w-[720px] px-4 py-20 sm:px-6 text-center">
        <h2 className="font-serif text-h1 font-semibold text-ink">
          New to the Enneagram?
        </h2>
        <p className="mt-4 text-body text-ink-muted max-w-[48ch] mx-auto">
          Start with our free primer course — seven short lessons that take you
          from &ldquo;what is this?&rdquo; to &ldquo;I see it in myself.&rdquo;
        </p>
        <Button
          render={<Link href="/learn" />}
          variant="outline"
          size="lg"
          className="mt-8 rounded-full px-8"
        >
          Start learning
        </Button>
      </section>
    </>
  );
}
