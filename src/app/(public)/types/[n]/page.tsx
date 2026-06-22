import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentFile } from "@/lib/content/mdx";
import type { TypeFrontmatter } from "@/lib/content/mdx";
import { MdxArticle } from "@/components/shared/mdx-article";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TypeNav } from "@/components/library/type-nav";
import { ResonanceChecklist } from "@/components/enneagram/resonance-checklist";

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
            <h3 className="text-small font-medium text-ink-muted mb-3">
              The Nine Types
            </h3>
            <TypeNav />

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-small font-medium text-ink-muted mb-3">
                Type {n} Deep Dives
              </h3>
              <ul className="space-y-1">
                {[
                  { slug: "childhood", label: "How the Pattern Forms" },
                  { slug: "communication", label: "Communication Style" },
                  { slug: "careers", label: "Career Matches" },
                  { slug: "famous", label: "Famous Examples" },
                  { slug: "relationships", label: "Relationship Guide" },
                  { slug: "growth-path", label: "Growth Path" },
                  { slug: "subtypes", label: "Subtypes" },
                  { slug: "parenting", label: "Parenting" },
                  { slug: "leadership", label: "Leadership Style" },
                  { slug: "spiritual", label: "Spiritual Growth" },
                ].map((s) => (
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
              className={`inline-block rounded-full px-3 py-1 text-small font-medium bg-center-${center}-soft text-center-${center}-ink`}
            >
              {CENTER_LABEL[center]}
            </span>
            {readTime > 0 && (
              <span className="text-small text-ink-muted">
                ~{readTime} min read
              </span>
            )}
          </div>

          <h1 className="font-serif text-[2rem] sm:text-display font-semibold text-ink mb-2">
            Type {n}: {info.name}
          </h1>
          <p className="text-body-lg text-ink-muted mb-2">{info.altName}</p>
          <p className="text-body text-ink-muted mb-12 max-w-[60ch]">{info.brief}</p>

          {file ? (
            <MdxArticle source={file.content} />
          ) : (
            <p className="text-body text-ink-muted">
              Full type page content coming soon.
            </p>
          )}

          {/* Deep Dives */}
          <div className="mt-16 mb-8">
            <h2 className="font-serif text-h2 font-semibold text-ink mb-6">
              Go Deeper
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { slug: "childhood", label: "How the Pattern Forms", desc: "The childhood experience that shaped this type" },
                { slug: "communication", label: "Communication Style", desc: "How to talk with and understand this type" },
                { slug: "careers", label: "Career Matches", desc: "Work strengths and ideal career paths" },
                { slug: "famous", label: "Famous Examples", desc: "Well-known figures who share this pattern" },
                { slug: "relationships", label: "Relationship Guide", desc: "How this type connects, loves, and navigates partnership" },
                { slug: "growth-path", label: "Growth Path", desc: "A structured program for lasting personal change" },
                { slug: "subtypes", label: "Subtypes", desc: "Self-pres, social, and sexual variants of this type" },
                { slug: "parenting", label: "Parenting", desc: "Parenting gifts, blind spots, and what your kids need" },
                { slug: "leadership", label: "Leadership Style", desc: "How this type leads and their development edge" },
                { slug: "spiritual", label: "Spiritual Growth", desc: "Contemplative practices and the path to virtue" },
              ].map((section) => (
                <Link
                  key={section.slug}
                  href={`/types/${n}/${section.slug}`}
                  className={`group rounded-xl border border-border p-5 hover:border-center-${center} hover:shadow-card transition-all`}
                >
                  <h3 className="text-body font-medium text-ink group-hover:text-brand transition-colors mb-1">
                    {section.label}
                  </h3>
                  <p className="text-small text-ink-muted">{section.desc}</p>
                </Link>
              ))}
            </div>
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
                { href: `/workplace/type-styles#type-${n}-${info.name.toLowerCase().replace("the ", "")}`, label: "Workplace Style" },
                { href: `/workplace/managing#type-${n}-${info.name.toLowerCase().replace("the ", "")}`, label: "Being Managed" },
                { href: `/workplace/stress#type-${n}-${info.name.toLowerCase().replace("the ", "")}`, label: "Stress at Work" },
                { href: `/growth/by-type#type-${n}-${info.name.toLowerCase().replace("the ", "")}`, label: "Growth Practices" },
                { href: `/relationships`, label: "Relationship Pairings" },
                { href: `/coping`, label: "Coping Strategies" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border border-border px-4 py-2 text-small font-medium text-ink-muted hover:text-center-${center}-ink hover:border-center-${center} hover:bg-center-${center}-soft/30 transition-colors`}
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
                    className={`rounded-full border border-border px-5 py-2 text-small font-medium text-ink-muted hover:text-center-${typeCenter}-ink hover:border-center-${typeCenter} hover:bg-center-${typeCenter}-soft/30 transition-colors`}
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
