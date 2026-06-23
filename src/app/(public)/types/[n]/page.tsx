import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentFile } from "@/lib/content/mdx";
import type { TypeFrontmatter } from "@/lib/content/mdx";
import { MdxArticle } from "@/components/shared/mdx-article";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType, Center } from "@/lib/enneagram/types";
import { centerBadge, centerHoverBorder, centerHoverText, centerHoverBgSoft30 } from "@/lib/enneagram/center-classes";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ResonanceChecklist } from "@/components/enneagram/resonance-checklist";
import { TypeQuickRef } from "@/components/enneagram/type-quick-ref";
import { StrengthsBlindSpots } from "@/components/enneagram/strengths-blindspots";
import { YourTypeBadge } from "@/components/enneagram/your-type-badge";
import { GoDeeperGrid } from "@/components/enneagram/go-deeper-grid";

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

const VALID_TYPES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const CENTER_LABEL: Record<string, string> = {
  body: "Body Center",
  heart: "Heart Center",
  head: "Head Center",
};

const SECTION_GROUPS = [
  {
    label: "Understand",
    sections: [
      { slug: "childhood", label: "How the Pattern Forms" },
      { slug: "subtypes", label: "Subtypes" },
      { slug: "communication", label: "Communication Style" },
      { slug: "famous", label: "Famous Examples" },
    ],
  },
  {
    label: "Grow",
    sections: [
      { slug: "growth-path", label: "Growth Path" },
      { slug: "spiritual", label: "Spiritual Growth" },
    ],
  },
  {
    label: "Apply",
    sections: [
      { slug: "relationships", label: "Relationship Guide" },
      { slug: "careers", label: "Career Matches" },
      { slug: "parenting", label: "Parenting" },
      { slug: "leadership", label: "Leadership Style" },
    ],
  },
];

export function generateStaticParams() {
  return VALID_TYPES.map((n) => ({ n }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  if (!VALID_TYPES.includes(n)) return {};
  const num = Number(n) as EnneagramType;
  const info = TYPE_INFO[num];
  const title = `Type ${n}: ${info.name} | Enneagram Growth`;
  const description = info.brief;
  return {
    title: `Type ${n}: ${info.name}`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/images/hero-nature.jpg",
          width: 1200,
          height: 630,
          alt: `Enneagram Type ${n}: ${info.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TypeDetailPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  if (!VALID_TYPES.includes(n)) notFound();

  const num = Number(n) as EnneagramType;
  const info = TYPE_INFO[num];
  const center = TYPE_TO_CENTER[num];
  const file = getContentFile<TypeFrontmatter>("types", `type-${n}`);

  const readTime = file ? estimateReadingTime(file.content) : 0;

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
        {/* Sidebar - desktop only */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="font-serif text-h4 font-semibold text-ink mb-0.5">
              Type {n}
            </p>
            <p className="text-small text-ink-muted mb-6">{info.name}</p>

            {SECTION_GROUPS.map((group) => (
              <div key={group.label} className="mb-5">
                <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.sections.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/types/${n}/${s.slug}`}
                        className="block rounded-lg px-3 py-1.5 text-small text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <Link
                href="/types"
                className="block px-3 py-1.5 text-small text-ink-muted hover:text-ink transition-colors"
              >
                &larr; All Types
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main>
          <Breadcrumbs
            items={[
              { label: "Types", href: "/types" },
              { label: `Type ${n}: ${info.name}` },
            ]}
          />

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-block rounded-full px-3 py-1 text-small font-medium ${centerBadge[center]}`}
            >
              {CENTER_LABEL[center]}
            </span>
            {readTime > 0 && (
              <span className="text-small text-ink-muted">
                ~{readTime} min read
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-serif text-[2rem] sm:text-display font-semibold text-ink">
              Type {n}: {info.name}
            </h1>
            <YourTypeBadge typeNum={num} />
          </div>
          <p className="text-body-lg text-ink-muted mb-2">{info.altName}</p>
          <p className="text-body text-ink-muted mb-8 max-w-[60ch]">{info.brief}</p>

          <TypeQuickRef typeNum={num} />
          <StrengthsBlindSpots typeNum={num} />

          {file ? (
            <MdxArticle source={file.content} />
          ) : (
            <p className="text-body text-ink-muted">
              Full type page content coming soon.
            </p>
          )}

          {/* Deep Dives — with visited indicators */}
          <div className="mt-16 mb-8">
            <GoDeeperGrid
              typeNum={n}
              center={center}
              sections={[
                { slug: "childhood", label: "How the Pattern Forms", desc: "The childhood experience that shaped this type" },
                { slug: "subtypes", label: "Subtypes", desc: "Self-pres, social, and sexual variants of this type" },
                { slug: "communication", label: "Communication Style", desc: "How to talk with and understand this type" },
                { slug: "relationships", label: "Relationship Guide", desc: "How this type connects, loves, and navigates partnership" },
                { slug: "parenting", label: "Parenting", desc: "Parenting gifts, blind spots, and what your kids need" },
                { slug: "careers", label: "Career Matches", desc: "Work strengths and ideal career paths" },
                { slug: "leadership", label: "Leadership Style", desc: "How this type leads and their development edge" },
                { slug: "growth-path", label: "Growth Path", desc: "A structured program for lasting personal change" },
                { slug: "spiritual", label: "Spiritual Growth", desc: "Contemplative practices and the path to virtue" },
                { slug: "famous", label: "Famous Examples", desc: "Well-known figures who share this pattern" },
              ]}
            />
          </div>

          {/* Cross-section links */}
          <div className="mt-8 mb-8">
            <h2 className="font-serif text-h2 font-semibold text-ink mb-4">
              Type {n} Across the Site
            </h2>
            <p className="text-body text-ink-muted mb-6">
              See how this type shows up in other areas of life and practice.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: `/workplace/type-styles#type-${n}-${info.name.toLowerCase().replace(/\s+/g, "-")}`, label: "Workplace Style" },
                { href: `/workplace/managing#type-${n}-${info.name.toLowerCase().replace(/\s+/g, "-")}`, label: "Being Managed" },
                { href: `/workplace/stress#type-${n}-${info.name.toLowerCase().replace(/\s+/g, "-")}`, label: "Stress at Work" },
                { href: `/growth/by-type#type-${n}-${info.name.toLowerCase().replace(/\s+/g, "-")}`, label: "Growth Practices" },
                { href: `/relationships`, label: "Relationship Pairings" },
                { href: `/coping`, label: "Coping Strategies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border border-border px-4 py-2 text-small font-medium text-ink-muted ${centerHoverText[center]} ${centerHoverBorder[center]} ${centerHoverBgSoft30[center]} transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Does this resonate? checklist */}
          <div className="mt-8">
            <ResonanceChecklist typeNum={num} />
          </div>

          {/* Mobile type pills - hidden on desktop where sidebar exists */}
          <div className="mt-20 lg:hidden">
            <h3 className="text-ui font-medium text-ink-muted mb-4">Explore other types</h3>
            <div className="flex flex-wrap gap-2.5">
              {VALID_TYPES.filter((t) => t !== n).map((t) => {
                const typeNum = Number(t) as EnneagramType;
                const typeCenter = TYPE_TO_CENTER[typeNum];
                return (
                  <Link
                    key={t}
                    href={`/types/${t}`}
                    className={`rounded-full border border-border px-5 py-2 text-small font-medium text-ink-muted ${centerHoverText[typeCenter]} ${centerHoverBorder[typeCenter]} ${centerHoverBgSoft30[typeCenter]} transition-colors`}
                  >
                    Type {t}
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
