import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="font-serif text-h1 font-semibold text-ink mb-8">Terms of Service</h1>
      <div className="prose text-body text-ink-muted space-y-4">
        <p>By using Enneagram Growth, you agree to these terms.</p>
        <p>Full terms of service content coming soon.</p>
      </div>
    </main>
  );
}
