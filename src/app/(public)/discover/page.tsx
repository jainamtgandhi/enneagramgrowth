import type { Metadata } from "next";
import { DiscoveryFlow } from "@/components/discovery/discovery-flow";

export const metadata: Metadata = {
  title: "Find Your Way In",
  description:
    "A guided, non-diagnostic reflection to help you explore which Enneagram types resonate — not a test, not a verdict.",
};

export default function DiscoverPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 py-16">
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Find Your Way In
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        This isn&apos;t a quiz and it won&apos;t tell you &ldquo;what you
        are.&rdquo; It&apos;s a short guided reflection to help you notice which
        patterns resonate — a starting point, not a verdict.
      </p>

      <DiscoveryFlow />
    </main>
  );
}
