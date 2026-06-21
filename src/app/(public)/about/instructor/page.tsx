import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Your Instructor",
  description: "Get to know Donna — her background, teaching philosophy, and approach to the Enneagram.",
};

export default function InstructorPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Meet Your Instructor
      </h1>
      <div className="mt-8 rounded-lg border border-border bg-surface p-8">
        {/* Photo placeholder */}
        <div className="w-32 h-32 rounded-full bg-surface-sunken mx-auto mb-6 flex items-center justify-center">
          <span className="text-ink-muted text-small">Photo</span>
        </div>
        <h2 className="font-serif text-h2 font-semibold text-ink text-center mb-2">Donna</h2>
        <p className="text-body text-ink-muted text-center mb-8">Enneagram Teacher &amp; Facilitator</p>

        <div className="space-y-6 max-w-[68ch] mx-auto">
          <div>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-2">Background</h3>
            <p className="text-body text-ink-muted">Instructor background coming soon.</p>
          </div>
          <div>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-2">Teaching Philosophy</h3>
            <p className="text-body text-ink-muted">Teaching philosophy coming soon.</p>
          </div>
          <div>
            <h3 className="font-serif text-h3 font-semibold text-ink mb-2">Approach</h3>
            <p className="text-body text-ink-muted">Approach and credentials coming soon.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
