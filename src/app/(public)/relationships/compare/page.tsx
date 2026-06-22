import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TypeComparison } from "@/components/enneagram/type-comparison";

export const metadata: Metadata = {
  title: "Compare Two Types",
  description:
    "See how any two Enneagram types differ in their core fears, desires, and patterns.",
  openGraph: {
    title: "Compare Two Enneagram Types | Enneagram Growth",
    description:
      "See how any two Enneagram types differ in their core fears, desires, and patterns.",
  },
};

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { label: "Relationships", href: "/relationships" },
          { label: "Compare Types" },
        ]}
      />
      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Compare Two Types
      </h1>
      <p className="text-body-lg text-ink-muted mb-12 max-w-[60ch]">
        Select any two types to see how they differ in their core patterns,
        motivations, and center of intelligence.
      </p>
      <TypeComparison />
    </main>
  );
}
