import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Compass, Sparkles, Users, Heart, Brain } from "lucide-react";
import { getLatestPosts } from "@/lib/content/queries";
import { formatDate } from "@/lib/utils/format";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/60 via-brand-soft/20 to-paper" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-28 sm:px-6 sm:py-40 text-center">
          <p className="text-ui font-medium text-brand tracking-wide uppercase mb-6">
            Free Enneagram Resource
          </p>
          <h1 className="font-serif text-display font-semibold tracking-tight sm:text-[3.75rem] lg:text-[4.25rem] leading-[1.08]">
            Understand yourself deeply.
            <br className="hidden sm:block" />
            <span className="text-brand">Grow with intention.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[48ch] text-body-lg text-ink-muted leading-relaxed">
            The most comprehensive free Enneagram guide on the web — deep type
            profiles, a guided discovery process, and a learning path built for
            real self-awareness.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              render={<Link href="/discover" />}
              size="lg"
              className="rounded-full px-8 shadow-card"
            >
              Discover your type
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              render={<Link href="/learn" />}
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              Start the free course
            </Button>
          </div>
          <p className="mt-5 text-small text-ink-muted">
            No sign-up required. 100% free. Always.
          </p>
        </div>
      </section>

      {/* Social proof / key stats */}
      <section className="border-y border-border/60 bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
            <div>
              <p className="font-serif text-h2 font-bold text-brand">9</p>
              <p className="text-small text-ink-muted">Deep type profiles</p>
            </div>
            <div>
              <p className="font-serif text-h2 font-bold text-brand">7</p>
              <p className="text-small text-ink-muted">Free primer lessons</p>
            </div>
            <div>
              <p className="font-serif text-h2 font-bold text-brand">27</p>
              <p className="text-small text-ink-muted">Subtype descriptions</p>
            </div>
            <div>
              <p className="font-serif text-h2 font-bold text-brand">100%</p>
              <p className="text-small text-ink-muted">Free, no paywall</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            Your path to self-understanding
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted max-w-[48ch] mx-auto">
            Three steps. No rush, no test scores, no boxes. Just a
            clear path to seeing yourself more honestly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="relative rounded-2xl border border-border bg-surface p-8 text-center hover:border-brand/40 hover:shadow-card transition-all">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft">
              <BookOpen className="h-7 w-7 text-brand" />
            </div>
            <span className="absolute top-4 right-4 font-serif text-h1 font-bold text-brand/10">
              01
            </span>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-3">
              Learn the foundations
            </h3>
            <p className="text-body text-ink-muted mb-5">
              Seven bite-sized lessons take you from zero to understanding
              the core Enneagram framework — centers, types, wings, and arrows.
            </p>
            <Link
              href="/learn"
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
            >
              Start learning <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-2xl border border-border bg-surface p-8 text-center hover:border-brand/40 hover:shadow-card transition-all">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft">
              <Compass className="h-7 w-7 text-brand" />
            </div>
            <span className="absolute top-4 right-4 font-serif text-h1 font-bold text-brand/10">
              02
            </span>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-3">
              Discover your type
            </h3>
            <p className="text-body text-ink-muted mb-5">
              A guided reflection — not a quiz — that helps you notice
              which patterns resonate. Your inner compass, not a label.
            </p>
            <Link
              href="/discover"
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
            >
              Find your way in <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-2xl border border-border bg-surface p-8 text-center hover:border-brand/40 hover:shadow-card transition-all">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft">
              <Sparkles className="h-7 w-7 text-brand" />
            </div>
            <span className="absolute top-4 right-4 font-serif text-h1 font-bold text-brand/10">
              03
            </span>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-3">
              Go deep
            </h3>
            <p className="text-body text-ink-muted mb-5">
              Explore your type in full — subtypes, levels of health,
              relationship dynamics, growth practices, and daily exercises.
            </p>
            <Link
              href="/enneagram/types"
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
            >
              Explore all types <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Centers Preview */}
      <section className="bg-surface-sunken/50">
        <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-h1 font-semibold text-ink">
              Nine types. Three centers of intelligence.
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted max-w-[52ch] mx-auto">
              Every person leads from one center — Body, Heart, or Head. Understanding
              yours changes everything.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-center-body/30 bg-surface p-7 hover:shadow-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-center-body-soft">
                  <Users className="h-5 w-5 text-center-body-ink" />
                </div>
                <h3 className="font-serif text-h3 font-semibold text-center-body-ink">
                  Body Center
                </h3>
              </div>
              <p className="text-body text-ink-muted mb-5">
                Grounded in instinct, gut wisdom, and the drive to act. Navigates
                the world through boundaries and autonomy.
              </p>
              <div className="space-y-2">
                <Link href="/enneagram/types/8" className="block text-ui text-ink hover:text-center-body-ink transition-colors">Type 8 &middot; The Challenger</Link>
                <Link href="/enneagram/types/9" className="block text-ui text-ink hover:text-center-body-ink transition-colors">Type 9 &middot; The Peacemaker</Link>
                <Link href="/enneagram/types/1" className="block text-ui text-ink hover:text-center-body-ink transition-colors">Type 1 &middot; The Reformer</Link>
              </div>
            </div>

            <div className="rounded-2xl border border-center-heart/30 bg-surface p-7 hover:shadow-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-center-heart-soft">
                  <Heart className="h-5 w-5 text-center-heart-ink" />
                </div>
                <h3 className="font-serif text-h3 font-semibold text-center-heart-ink">
                  Heart Center
                </h3>
              </div>
              <p className="text-body text-ink-muted mb-5">
                Attuned to feeling, identity, and connection. Processes the world
                through emotion and relationships.
              </p>
              <div className="space-y-2">
                <Link href="/enneagram/types/2" className="block text-ui text-ink hover:text-center-heart-ink transition-colors">Type 2 &middot; The Helper</Link>
                <Link href="/enneagram/types/3" className="block text-ui text-ink hover:text-center-heart-ink transition-colors">Type 3 &middot; The Achiever</Link>
                <Link href="/enneagram/types/4" className="block text-ui text-ink hover:text-center-heart-ink transition-colors">Type 4 &middot; The Individualist</Link>
              </div>
            </div>

            <div className="rounded-2xl border border-center-head/30 bg-surface p-7 hover:shadow-card transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-center-head-soft">
                  <Brain className="h-5 w-5 text-center-head-ink" />
                </div>
                <h3 className="font-serif text-h3 font-semibold text-center-head-ink">
                  Head Center
                </h3>
              </div>
              <p className="text-body text-ink-muted mb-5">
                Oriented by thinking, planning, and perception. Makes sense of
                the world through analysis and foresight.
              </p>
              <div className="space-y-2">
                <Link href="/enneagram/types/5" className="block text-ui text-ink hover:text-center-head-ink transition-colors">Type 5 &middot; The Investigator</Link>
                <Link href="/enneagram/types/6" className="block text-ui text-ink hover:text-center-head-ink transition-colors">Type 6 &middot; The Loyalist</Link>
                <Link href="/enneagram/types/7" className="block text-ui text-ink hover:text-center-head-ink transition-colors">Type 7 &middot; The Enthusiast</Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              render={<Link href="/enneagram" />}
              variant="outline"
              className="rounded-full px-6"
            >
              Explore the full Enneagram system
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-h1 font-semibold text-ink">
              Latest from the blog
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted max-w-[48ch] mx-auto">
              Reflections, practical guides, and deeper dives to support your growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-surface p-7 hover:border-brand/40 hover:shadow-card transition-all"
              >
                <h3 className="font-serif text-h3 font-semibold text-ink group-hover:text-brand transition-colors mb-3">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-body text-ink-muted line-clamp-3 mb-5">
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

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
            >
              View all posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Discovery CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/50 via-brand-soft/30 to-paper" />
        <div className="relative mx-auto max-w-[720px] px-4 py-24 sm:px-6 text-center">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            Ready to find your type?
          </h2>
          <p className="mt-5 text-body-lg text-ink-muted max-w-[44ch] mx-auto">
            Our guided discovery process takes about 10 minutes. No account
            needed — just honest self-reflection.
          </p>
          <Button
            render={<Link href="/discover" />}
            size="lg"
            className="mt-8 rounded-full px-8 shadow-card"
          >
            Begin the Discovery process
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Learn CTA */}
      <section className="mx-auto max-w-[720px] px-4 py-20 sm:px-6 text-center">
        <h2 className="font-serif text-h2 font-semibold text-ink">
          New to the Enneagram?
        </h2>
        <p className="mt-4 text-body text-ink-muted max-w-[44ch] mx-auto">
          Start with the free primer course — seven short lessons that take you
          from &ldquo;what is this?&rdquo; to genuine self-recognition.
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
