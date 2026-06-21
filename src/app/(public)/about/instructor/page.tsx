import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Meet Your Instructor",
  description:
    "Get to know the person behind Enneagram Growth — background, teaching philosophy, and approach.",
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
        <div className="flex flex-col items-center text-center gap-6 mb-10">
          <div className="w-36 h-36 rounded-full bg-surface-sunken border border-border flex items-center justify-center">
            <span className="text-h1 text-ink-muted/40">?</span>
          </div>
          <div>
            <p className="text-body-lg text-brand font-medium mb-2">
              Enneagram Teacher &amp; Facilitator
            </p>
            <p className="text-body text-ink-muted max-w-[48ch] mx-auto">
              This section is coming soon. We&apos;re putting together a proper
              introduction to the person behind Enneagram Growth.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-surface-sunken p-6 text-center">
          <p className="text-body text-ink-muted">
            In the meantime, explore the site — everything is free and ready
            for you.
          </p>
        </div>
      </div>
    </main>
  );
}
