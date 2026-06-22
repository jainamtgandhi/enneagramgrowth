import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";

export const metadata: Metadata = {
  title: "Coping & Solutions",
  description:
    "When your patterns take over: understanding what's happening, why, and what you can actually do about it.",
  openGraph: {
    title: "Coping & Solutions | Enneagram Growth",
    description:
      "When your patterns take over: understanding what's happening, why, and what you can actually do about it.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "Coping & Solutions - Enneagram Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coping & Solutions | Enneagram Growth",
    description:
      "When your patterns take over: understanding what's happening, why, and what you can actually do about it.",
  },
};

const COPING_BY_CENTER = [
  {
    label: "Body Patterns",
    description: "When anger, control, or numbness takes over",
    colorClass: "text-center-body-ink",
    borderClass: "border-center-body/30",
    slugs: ["controlling", "anger", "numbing"],
  },
  {
    label: "Heart Patterns",
    description: "When shame, performance, or longing takes over",
    colorClass: "text-center-heart-ink",
    borderClass: "border-center-heart/30",
    slugs: ["over-giving", "performing", "sadness", "shame"],
  },
  {
    label: "Head Patterns",
    description: "When fear, anxiety, or restlessness takes over",
    colorClass: "text-center-head-ink",
    borderClass: "border-center-head/30",
    slugs: ["withdrawing", "anxiety", "restlessness", "fear"],
  },
];

export default function CopingHubPage() {
  const allTopics = getAllContentFiles<ArticleFrontmatter>("coping").sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs items={[{ label: "Coping & Solutions" }]} />

      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        Coping &amp; Solutions
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        When a pattern takes over, it helps to name it. Find the one that
        sounds like yours.
      </p>

      <div className="space-y-10">
        {COPING_BY_CENTER.map((center) => {
          const topics = center.slugs
            .map((s) => allTopics.find((t) => t.slug === s))
            .filter((t): t is typeof allTopics[number] => !!t);

          return (
            <section key={center.label}>
              <div className="mb-4">
                <h2 className={`font-serif text-h3 font-semibold ${center.colorClass}`}>
                  {center.label}
                </h2>
                <p className="text-small text-ink-muted mt-1">
                  {center.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/coping/${topic.slug}`}
                    className={`group rounded-2xl border ${center.borderClass} p-6 hover:shadow-card transition-all`}
                  >
                    <h3 className="font-serif text-h4 font-semibold text-ink group-hover:text-brand transition-colors mb-2">
                      {topic.frontmatter.title}
                    </h3>
                    <p className="text-small text-ink-muted line-clamp-3">
                      {topic.frontmatter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
