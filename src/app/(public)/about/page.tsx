import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Enneagram Growth is a place to watch yourself, with depth, care, and a teacher who knows the territory.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <div className="relative rounded-2xl overflow-hidden mb-10 h-48 sm:h-64">
        <Image
          src="/images/hero-nature.jpg"
          alt="Peaceful nature landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent" />
      </div>

      <h1 className="font-serif text-display font-semibold text-ink">
        About Enneagram Growth
      </h1>
      <p className="mt-6 text-body-lg text-ink-muted">
        The internet has a hundred free Enneagram encyclopedias and none of them
        change anyone. Change happens in a loop: practice, reflection, being
        seen by a group, a teacher reflecting your pattern back, and time.
      </p>
      <p className="mt-4 text-body text-ink-muted">
        Enneagram Growth is the container for that kind of work. Reference
        content is table stakes, built once. The living product is the journey
        : a teacher who knows the territory, a group walking beside you, and
        enough time to actually change.
      </p>

      {/* Principles from spec §2 */}
      <section className="mt-16">
        <h2 className="font-serif text-h2 font-semibold text-ink mb-6">
          Our Principles
        </h2>
        <div className="space-y-6">
          <div className="border-l-2 border-brand pl-4">
            <h3 className="font-serif text-h3 font-semibold text-ink">Reflection is sacred</h3>
            <p className="mt-1 text-body text-ink-muted">
              Private by default. A vault, not a feed. Your inner work belongs to you.
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4">
            <h3 className="font-serif text-h3 font-semibold text-ink">Never diagnose</h3>
            <p className="mt-1 text-body text-ink-muted">
              We notice patterns, never interpret pathology. A mirror, not a box.
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4">
            <h3 className="font-serif text-h3 font-semibold text-ink">Share self, never diagnose others</h3>
            <p className="mt-1 text-body text-ink-muted">
              The one inviolable norm. Share your own pattern. Never name someone
              else&apos;s type for them.
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4">
            <h3 className="font-serif text-h3 font-semibold text-ink">Calm over clever</h3>
            <p className="mt-1 text-body text-ink-muted">
              A quiet room with good light. Not a quiz app, not a clinical
              dashboard, not an occult diagram.
            </p>
          </div>
          <div className="border-l-2 border-brand pl-4">
            <h3 className="font-serif text-h3 font-semibold text-ink">Accessibility from commit one</h3>
            <p className="mt-1 text-body text-ink-muted">
              WCAG 2.2 AA. The Enneagram belongs to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Ethics guide link */}
      <div className="mt-10 rounded-xl border border-brand/20 bg-brand-soft/20 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1">
          <p className="text-body font-medium text-ink">
            Using the Enneagram Responsibly
          </p>
          <p className="text-small text-ink-muted mt-0.5">
            Our full guide to ethical application, as individuals and in community.
          </p>
        </div>
        <Link
          href="/library/responsible-use"
          className="text-ui font-medium text-brand hover:text-brand-hover transition-colors shrink-0"
        >
          Read the guide &rarr;
        </Link>
      </div>

      {/* Meet the instructor CTA */}
      <section className="mt-16 rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="font-serif text-h2 font-semibold text-ink mb-3">
          Meet Your Instructor
        </h2>
        <p className="text-body text-ink-muted mb-6">
          Get to know the teacher behind Enneagram Growth.
        </p>
        <Button
          render={<Link href="/about/instructor" />}
          variant="outline"
          className="rounded-full px-6"
        >
          Learn more
        </Button>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Button
          render={<Link href="/discover" />}
          size="lg"
          className="rounded-full px-8"
        >
          Find your way in
        </Button>
      </div>
    </div>
  );
}
