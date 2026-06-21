import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/40 to-paper">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 sm:py-32 text-center">
          <h1 className="font-serif text-display font-semibold tracking-tight sm:text-[3.5rem] lg:text-[4rem]">
            The internet is full of places
            <br />
            that tell you what you are.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-body-lg text-ink-muted">
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

      {/* Centers Preview */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            Nine Types, Three Centers
          </h2>
          <p className="mt-3 text-body text-ink-muted max-w-[52ch] mx-auto">
            The Enneagram organizes nine patterns of attention around three
            centers of intelligence — Body, Heart, and Head.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Body Center */}
          <div className="rounded-lg border border-border bg-center-body-soft/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-center-body" />
              <h3 className="font-serif text-h3 font-semibold text-center-body-ink">
                Body Center
              </h3>
            </div>
            <p className="text-ui text-ink-muted mb-4">
              Types 8, 9, 1 — grounded in instinct and action.
            </p>
            <div className="space-y-2">
              <Link href="/enneagram/types/8" className="block text-ui text-ink hover:text-brand transition-colors">Type 8 · The Challenger</Link>
              <Link href="/enneagram/types/9" className="block text-ui text-ink hover:text-brand transition-colors">Type 9 · The Peacemaker</Link>
              <Link href="/enneagram/types/1" className="block text-ui text-ink hover:text-brand transition-colors">Type 1 · The Reformer</Link>
            </div>
          </div>

          {/* Heart Center */}
          <div className="rounded-lg border border-border bg-center-heart-soft/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-center-heart" />
              <h3 className="font-serif text-h3 font-semibold text-center-heart-ink">
                Heart Center
              </h3>
            </div>
            <p className="text-ui text-ink-muted mb-4">
              Types 2, 3, 4 — attuned to feeling and identity.
            </p>
            <div className="space-y-2">
              <Link href="/enneagram/types/2" className="block text-ui text-ink hover:text-brand transition-colors">Type 2 · The Helper</Link>
              <Link href="/enneagram/types/3" className="block text-ui text-ink hover:text-brand transition-colors">Type 3 · The Achiever</Link>
              <Link href="/enneagram/types/4" className="block text-ui text-ink hover:text-brand transition-colors">Type 4 · The Individualist</Link>
            </div>
          </div>

          {/* Head Center */}
          <div className="rounded-lg border border-border bg-center-head-soft/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-center-head" />
              <h3 className="font-serif text-h3 font-semibold text-center-head-ink">
                Head Center
              </h3>
            </div>
            <p className="text-ui text-ink-muted mb-4">
              Types 5, 6, 7 — oriented by thinking and planning.
            </p>
            <div className="space-y-2">
              <Link href="/enneagram/types/5" className="block text-ui text-ink hover:text-brand transition-colors">Type 5 · The Investigator</Link>
              <Link href="/enneagram/types/6" className="block text-ui text-ink hover:text-brand transition-colors">Type 6 · The Loyalist</Link>
              <Link href="/enneagram/types/7" className="block text-ui text-ink hover:text-brand transition-colors">Type 7 · The Enthusiast</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery CTA */}
      <section className="bg-brand-soft/40">
        <div className="mx-auto max-w-[720px] px-4 py-16 sm:px-6 text-center">
          <h2 className="font-serif text-h1 font-semibold text-ink">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-body text-ink-muted max-w-[48ch] mx-auto">
            A short guided reflection — not a quiz, not a verdict. Just a
            starting point to notice which patterns resonate.
          </p>
          <Button
            render={<Link href="/discover" />}
            size="lg"
            className="mt-6 rounded-full px-8"
          >
            Find your way in
          </Button>
        </div>
      </section>

      {/* Learn CTA */}
      <section className="mx-auto max-w-[720px] px-4 py-16 sm:px-6 text-center">
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
          className="mt-6 rounded-full px-8"
        >
          Start learning
        </Button>
      </section>
    </>
  );
}
