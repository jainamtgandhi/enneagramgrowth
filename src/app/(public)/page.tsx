import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Sparkles,
  Users,
  Heart,
  Brain,
  ChevronRight,
} from "lucide-react";
import { getLatestPosts } from "@/lib/content/queries";
import { PostCard } from "@/components/blog/post-card";
import { PersonalizedCta } from "@/components/home/personalized-cta";
import { DailyPrompt } from "@/components/enneagram/daily-prompt";

export const metadata: Metadata = {
  title: "Enneagram Growth | Self-understanding through the nine types",
  description:
    "Explore the nine Enneagram types, discover your path through guided reflection, and grow at your own pace. Free, no sign-up, no paywall.",
  openGraph: {
    title: "Enneagram Growth | Self-understanding through the nine types",
    description:
      "Why do I keep doing this? The Enneagram starts with that question. Explore nine types, discover your patterns, and grow at your own pace.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Enneagram Growth - self-understanding through the nine types",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enneagram Growth | Self-understanding through the nine types",
    description:
      "Why do I keep doing this? The Enneagram starts with that question. Explore nine types, discover your patterns, and grow at your own pace.",
  },
};

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/50 via-paper to-paper" />
        <div className="relative mx-auto max-w-[860px] px-5 pt-20 pb-16 sm:px-8 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28 text-center">
          <h1 className="font-serif text-[2.25rem] sm:text-[3.25rem] lg:text-[3.75rem] font-semibold tracking-tight leading-[1.12]">
            Why do I keep
            <span className="text-brand"> doing this?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-body-lg text-ink-muted leading-relaxed">
            That question, the one you ask after the argument, the overthinking,
            the pattern you swore you&apos;d break, is where the Enneagram starts.
            Not with a label. With recognition.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              render={<Link href="/discover" />}
              size="lg"
              className="rounded-full px-8 shadow-card"
            >
              Find your type
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              render={<Link href="/learn" />}
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              Learn the basics first
            </Button>
          </div>
          <p className="mt-5 text-small text-ink-muted/70">
            Free. No sign-up. No paywall. Ever.
          </p>
        </div>
      </section>

      {/* What the Enneagram actually does */}
      <section className="mx-auto max-w-[860px] px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="font-serif text-h1 font-semibold text-ink text-center">
          It&apos;s not a personality quiz.
        </h2>
        <p className="mt-5 text-body-lg text-ink-muted max-w-[56ch] mx-auto text-center leading-relaxed">
          Most tests sort you into a box. The Enneagram shows you the box you&apos;ve
          been living in, and the door out. It maps the core motivation beneath
          your behavior: why you get defensive, why you people-please, why you
          withdraw, why you can&apos;t stop planning.
        </p>
        <p className="mt-4 text-body-lg text-ink-muted max-w-[56ch] mx-auto text-center leading-relaxed">
          Nine types. Three centers of intelligence. One system that&apos;s been
          helping people see themselves clearly for decades.
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-surface-sunken/40">
        <div className="mx-auto max-w-[1080px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="text-center mb-14">
            <p className="text-ui font-medium text-brand tracking-wide uppercase mb-3">
              How it works
            </p>
            <h2 className="font-serif text-h1 font-semibold text-ink">
              Three steps. No rush.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative rounded-2xl border border-border bg-surface p-8 hover:border-brand/40 hover:shadow-card transition-all">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                <Compass className="h-6 w-6 text-brand" />
              </div>
              <span className="absolute top-5 right-6 font-serif text-[2.5rem] font-bold text-brand/8">
                1
              </span>
              <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
                Discover
              </h3>
              <p className="text-body text-ink-muted mb-5 leading-relaxed">
                A guided reflection, not a quiz, that helps you notice which
                patterns feel like yours. Ten minutes, and you&apos;ll know where
                to look.
              </p>
              <Link
                href="/discover"
                className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
              >
                Find your way in <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative rounded-2xl border border-border bg-surface p-8 hover:border-brand/40 hover:shadow-card transition-all">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                <BookOpen className="h-6 w-6 text-brand" />
              </div>
              <span className="absolute top-5 right-6 font-serif text-[2.5rem] font-bold text-brand/8">
                2
              </span>
              <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
                Learn
              </h3>
              <p className="text-body text-ink-muted mb-5 leading-relaxed">
                Seven short lessons. What the Enneagram is, how the three centers
                work, how to read your own patterns. Start from zero.
              </p>
              <Link
                href="/learn"
                className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
              >
                Start the course <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative rounded-2xl border border-border bg-surface p-8 hover:border-brand/40 hover:shadow-card transition-all">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft">
                <Sparkles className="h-6 w-6 text-brand" />
              </div>
              <span className="absolute top-5 right-6 font-serif text-[2.5rem] font-bold text-brand/8">
                3
              </span>
              <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
                Go deep
              </h3>
              <p className="text-body text-ink-muted mb-5 leading-relaxed">
                Comprehensive profiles, 10 deep-dive topics per type, 45
                relationship guides, and real practices for growth, not
                horoscope fluff.
              </p>
              <Link
                href="/types"
                className="text-ui font-medium text-brand hover:text-brand-hover transition-colors inline-flex items-center gap-1"
              >
                Explore all types <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Preview */}
      <section className="mx-auto max-w-[1080px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-center mb-14">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            Three centers. Nine types.
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted max-w-[52ch] mx-auto leading-relaxed">
            Everyone leads from one center: Body, Heart, or Head. It shapes how
            you react before you even think about it.
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
            <p className="text-body text-ink-muted mb-1">
              Gut instinct. Anger. Boundaries.
            </p>
            <p className="text-small text-ink-muted/70 mb-5">
              The center that acts first and processes later.
            </p>
            <div className="space-y-2">
              <Link
                href="/types/8"
                className="block text-ui text-ink hover:text-center-body-ink transition-colors"
              >
                Type 8 &middot; The Challenger
              </Link>
              <Link
                href="/types/9"
                className="block text-ui text-ink hover:text-center-body-ink transition-colors"
              >
                Type 9 &middot; The Peacemaker
              </Link>
              <Link
                href="/types/1"
                className="block text-ui text-ink hover:text-center-body-ink transition-colors"
              >
                Type 1 &middot; The Reformer
              </Link>
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
            <p className="text-body text-ink-muted mb-1">
              Identity. Emotion. Connection.
            </p>
            <p className="text-small text-ink-muted/70 mb-5">
              The center that feels its way through the world.
            </p>
            <div className="space-y-2">
              <Link
                href="/types/2"
                className="block text-ui text-ink hover:text-center-heart-ink transition-colors"
              >
                Type 2 &middot; The Helper
              </Link>
              <Link
                href="/types/3"
                className="block text-ui text-ink hover:text-center-heart-ink transition-colors"
              >
                Type 3 &middot; The Achiever
              </Link>
              <Link
                href="/types/4"
                className="block text-ui text-ink hover:text-center-heart-ink transition-colors"
              >
                Type 4 &middot; The Individualist
              </Link>
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
            <p className="text-body text-ink-muted mb-1">
              Thinking. Planning. Anxiety.
            </p>
            <p className="text-small text-ink-muted/70 mb-5">
              The center that maps the world before entering it.
            </p>
            <div className="space-y-2">
              <Link
                href="/types/5"
                className="block text-ui text-ink hover:text-center-head-ink transition-colors"
              >
                Type 5 &middot; The Investigator
              </Link>
              <Link
                href="/types/6"
                className="block text-ui text-ink hover:text-center-head-ink transition-colors"
              >
                Type 6 &middot; The Loyalist
              </Link>
              <Link
                href="/types/7"
                className="block text-ui text-ink hover:text-center-head-ink transition-colors"
              >
                Type 7 &middot; The Enthusiast
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            render={<Link href="/library" />}
            variant="outline"
            className="rounded-full px-6"
          >
            Explore the full system
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* What you'll find here */}
      <section className="border-y border-border/60 bg-surface">
        <div className="mx-auto max-w-[860px] px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-serif text-h2 font-semibold text-ink text-center mb-10">
            What you&apos;ll find here
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex gap-3">
              <span className="text-brand font-semibold mt-0.5">&bull;</span>
              <p className="text-body text-ink-muted">
                <strong className="text-ink font-medium">9 in-depth type profiles</strong>:
                5,000+ words each, plus 10 deep-dive pages per type covering
                childhood patterns, subtypes, careers, relationships, and more
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-semibold mt-0.5">&bull;</span>
              <p className="text-body text-ink-muted">
                <strong className="text-ink font-medium">45 relationship guides</strong>:
                every type pairing, with dynamics, strengths, friction points,
                and growth paths for each combination
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-semibold mt-0.5">&bull;</span>
              <p className="text-body text-ink-muted">
                <strong className="text-ink font-medium">Guided discovery</strong>:
                a reflection-based process, not a Buzzfeed quiz
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-semibold mt-0.5">&bull;</span>
              <p className="text-body text-ink-muted">
                <strong className="text-ink font-medium">7 primer lessons</strong>:
                from &ldquo;what is this?&rdquo; to reading your own patterns
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-semibold mt-0.5">&bull;</span>
              <p className="text-body text-ink-muted">
                <strong className="text-ink font-medium">Workplace, growth, and coping</strong>:
                practical guides for stress, leadership, parenting, and
                spiritual development by type
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-brand font-semibold mt-0.5">&bull;</span>
              <p className="text-body text-ink-muted">
                <strong className="text-ink font-medium">No paywall</strong>:
                200+ pages of content, all free, no account needed, no upsell
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Reflection */}
      <section className="mx-auto max-w-[640px] px-5 py-12 sm:px-8">
        <DailyPrompt />
      </section>

      {/* Featured Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-[1080px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="text-center mb-14">
            <h2 className="font-serif text-h1 font-semibold text-ink">
              From the blog
            </h2>
            <p className="mt-4 text-body-lg text-ink-muted max-w-[48ch] mx-auto">
              Reflections and practical guides to support your growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
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

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/40 via-brand-soft/20 to-paper" />
        <div className="relative mx-auto max-w-[640px] px-5 py-20 sm:px-8 sm:py-28 text-center">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            You already know something&apos;s there.
          </h2>
          <p className="mt-5 text-body-lg text-ink-muted leading-relaxed">
            The pattern you can&apos;t quite name. The reaction that surprises you.
            The thing you do that you wish you didn&apos;t. The Enneagram won&apos;t
            fix it, but it will help you see it. And seeing is where change begins.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              render={<Link href="/discover" />}
              size="lg"
              className="rounded-full px-8 shadow-card"
            >
              Start the discovery process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              render={<Link href="/learn" />}
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              Or learn the basics first
            </Button>
          </div>
          <PersonalizedCta />
        </div>
      </section>
    </>
  );
}
