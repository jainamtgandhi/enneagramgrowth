import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Meet Your Instructor",
  description:
    "Get to know Donna — her background, teaching philosophy, and approach to the Enneagram.",
};

export default function InstructorPage() {
  return (
    <main className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Meet Your Instructor" },
        ]}
      />

      <h1 className="font-serif text-display font-semibold text-ink mb-8">
        Meet Your Instructor
      </h1>

      <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-surface-sunken flex-shrink-0 overflow-hidden">
            {/* Replace src with /donna.jpg once the photo is saved to public/ */}
            <Image
              src="/images/about-community.jpg"
              alt="Donna — Enneagram Teacher and Facilitator"
              width={176}
              height={176}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="font-serif text-h1 font-semibold text-ink mb-1">
              Donna
            </h2>
            <p className="text-body-lg text-brand font-medium mb-4">
              Enneagram Teacher &amp; Facilitator
            </p>
            <p className="text-body text-ink-muted max-w-[52ch]">
              Donna has spent over a decade studying and teaching the Enneagram —
              not as a tool for labeling, but as a mirror for genuine
              self-understanding. She brings warmth, depth, and a commitment to
              meeting each person exactly where they are.
            </p>
          </div>
        </div>

        <div className="space-y-10 max-w-[68ch] mx-auto">
          <div>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-3">
              Background
            </h3>
            <p className="text-body text-ink-muted mb-3">
              Donna&apos;s journey with the Enneagram began in a workshop that
              changed how she understood herself and the people around her. What
              started as personal curiosity became a calling — she trained with
              experienced Enneagram teachers and spent years deepening her
              understanding through study, practice, and one-on-one work with
              individuals and groups.
            </p>
            <p className="text-body text-ink-muted">
              She holds certifications in Enneagram instruction and has
              facilitated workshops for individuals, couples, teams, and faith
              communities. Her background also includes training in
              contemplative practices, which informs her approach to inner work
              and self-observation.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-3">
              Teaching Philosophy
            </h3>
            <p className="text-body text-ink-muted mb-3">
              Donna believes the Enneagram is most powerful when it&apos;s used
              with compassion — toward yourself and toward others. She teaches it
              not as a system of boxes but as a way to notice your patterns with
              honesty and gentleness, and to discover the freedom that comes from
              that awareness.
            </p>
            <p className="text-body text-ink-muted">
              Her teaching style is warm, conversational, and grounded in lived
              experience. She draws on real stories (her own and others&apos;)
              to make the material feel personal rather than academic. She
              creates space for people to sit with uncomfortable truths without
              rushing to fix or change them — because real growth starts with
              seeing clearly.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-3">
              Approach
            </h3>
            <p className="text-body text-ink-muted mb-3">
              Donna&apos;s approach centers on self-observation rather than
              self-improvement. She encourages students to notice their automatic
              patterns — the habitual ways of thinking, feeling, and responding
              — without judgment. This is what the tradition calls &ldquo;inner
              work,&rdquo; and it&apos;s the heart of everything she teaches.
            </p>
            <p className="text-body text-ink-muted mb-3">
              She integrates insights from multiple Enneagram lineages (Riso &amp;
              Hudson, Naranjo, Palmer, Chestnut) and emphasizes subtypes and
              instinctual variants as essential layers of understanding. She
              also brings in somatic awareness — paying attention to where
              patterns live in the body — because real transformation happens
              below the neck, not just between the ears.
            </p>
            <p className="text-body text-ink-muted">
              Whether you&apos;re brand new to the Enneagram or have been
              studying it for years, Donna meets you where you are and helps you
              go deeper at your own pace.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border text-center">
          <p className="text-body text-ink-muted mb-4">
            Ready to start your own journey of self-understanding?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/discover"
              className="inline-block rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Discover your type
            </Link>
            <Link
              href="/learn"
              className="inline-block rounded-full border border-border px-6 py-2.5 text-ui font-medium text-ink hover:border-brand hover:text-brand transition-colors"
            >
              Start the free course
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
