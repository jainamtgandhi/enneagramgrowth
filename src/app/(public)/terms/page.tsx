import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for The Practice.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Acceptance
          </h2>
          <p className="mt-2">
            By using The Practice, you agree to these terms. If you don&apos;t
            agree, please don&apos;t use the service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            The Service
          </h2>
          <p className="mt-2">
            The Practice provides Enneagram personality exploration tools,
            educational content, and self-assessment quizzes. These are not
            clinical or diagnostic tools and should not be used as substitutes
            for professional psychological assessment.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Content
          </h2>
          <p className="mt-2">
            All content on The Practice is for educational and personal growth
            purposes. We strive for accuracy but make no warranties about the
            completeness or reliability of quiz results.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Intellectual Property
          </h2>
          <p className="mt-2">
            All content, design, and code on The Practice is owned by us unless
            otherwise noted. You may share quiz results and link to content but
            may not reproduce substantial portions without permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            The Practice is provided &quot;as is&quot; without warranties of any kind.
            We are not liable for any decisions made based on quiz results or
            content on this platform.
          </p>
        </section>
      </div>
    </div>
  );
}
