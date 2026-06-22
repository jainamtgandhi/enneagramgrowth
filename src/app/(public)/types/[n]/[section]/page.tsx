import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentFile } from "@/lib/content/mdx";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER, ALL_TYPES } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { TypeNav } from "@/components/library/type-nav";
import { MdxArticle } from "@/components/shared/mdx-article";

interface TypeSectionFrontmatter {
  title: string;
  description: string;
}

const VALID_TYPES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SECTION_META: Record<string, { label: string }> = {
  childhood: { label: "How the Pattern Forms" },
  communication: { label: "Communication Style" },
  famous: { label: "Famous Examples" },
  careers: { label: "Career Matches" },
  relationships: { label: "Relationship Guide" },
  "growth-path": { label: "Growth Path" },
  subtypes: { label: "Subtypes" },
  parenting: { label: "Parenting" },
  leadership: { label: "Leadership Style" },
  spiritual: { label: "Spiritual Growth" },
};

const VALID_SECTIONS = Object.keys(SECTION_META);

export function generateStaticParams() {
  const params: { n: string; section: string }[] = [];
  for (const n of VALID_TYPES) {
    for (const section of VALID_SECTIONS) {
      params.push({ n, section });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string; section: string }>;
}): Promise<Metadata> {
  const { n, section } = await params;
  if (!VALID_TYPES.includes(n) || !VALID_SECTIONS.includes(section)) return {};

  const num = Number(n) as EnneagramType;
  const info = TYPE_INFO[num];
  const sectionLabel = SECTION_META[section]?.label ?? section;
  const file = getContentFile<TypeSectionFrontmatter>(
    `types/type-${n}`,
    section
  );

  const title = file
    ? file.frontmatter.title
    : `${sectionLabel} - Type ${n}: ${info.name}`;
  const description = file
    ? file.frontmatter.description
    : `${sectionLabel} for Enneagram Type ${n}: ${info.name}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Enneagram Growth`,
      description,
    },
  };
}

export default async function TypeSectionPage({
  params,
}: {
  params: Promise<{ n: string; section: string }>;
}) {
  const { n, section } = await params;
  if (!VALID_TYPES.includes(n) || !VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const num = Number(n) as EnneagramType;
  const info = TYPE_INFO[num];
  const center = TYPE_TO_CENTER[num];
  const file = getContentFile<TypeSectionFrontmatter>(
    `types/type-${n}`,
    section
  );

  if (!file) notFound();

  const currentSectionIndex = VALID_SECTIONS.indexOf(section);

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
        {/* Sidebar */}
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
                <li>
                  <Link
                    href={`/types/${n}`}
                    className="block rounded-lg px-3 py-1.5 text-small text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
                  >
                    Full Profile
                  </Link>
                </li>
                {VALID_SECTIONS.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/types/${n}/${s}`}
                      className={`block rounded-lg px-3 py-1.5 text-small transition-colors ${
                        s === section
                          ? "bg-brand-soft text-brand font-medium"
                          : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
                      }`}
                    >
                      {SECTION_META[s].label}
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
              { label: `Type ${n}: ${info.name}`, href: `/types/${n}` },
              { label: file.frontmatter.title },
            ]}
          />

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-block rounded-full px-3 py-1 text-small font-medium bg-center-${center}-soft text-center-${center}-ink`}
            >
              Type {n}
            </span>
          </div>

          <h1 className="font-serif text-[2rem] sm:text-display font-semibold text-ink mb-4">
            {file.frontmatter.title}
          </h1>
          <p className="text-body-lg text-ink-muted mb-12 max-w-[60ch]">
            {file.frontmatter.description}
          </p>

          <MdxArticle source={file.content} />

          {/* Section nav */}
          <nav className="mt-16 flex justify-between gap-4">
            {currentSectionIndex > 0 ? (
              <Link
                href={`/types/${n}/${VALID_SECTIONS[currentSectionIndex - 1]}`}
                className="flex-1 rounded-xl border border-border p-4 hover:border-brand hover:shadow-card transition-all"
              >
                <span className="text-small text-ink-muted">
                  &larr; Previous
                </span>
                <p className="text-ui font-medium text-ink mt-1">
                  {SECTION_META[VALID_SECTIONS[currentSectionIndex - 1]].label}
                </p>
              </Link>
            ) : (
              <Link
                href={`/types/${n}`}
                className="flex-1 rounded-xl border border-border p-4 hover:border-brand hover:shadow-card transition-all"
              >
                <span className="text-small text-ink-muted">
                  &larr; Back to
                </span>
                <p className="text-ui font-medium text-ink mt-1">
                  Type {n} Profile
                </p>
              </Link>
            )}
            {currentSectionIndex < VALID_SECTIONS.length - 1 ? (
              <Link
                href={`/types/${n}/${VALID_SECTIONS[currentSectionIndex + 1]}`}
                className="flex-1 rounded-xl border border-border p-4 text-right hover:border-brand hover:shadow-card transition-all"
              >
                <span className="text-small text-ink-muted">Next &rarr;</span>
                <p className="text-ui font-medium text-ink mt-1">
                  {SECTION_META[VALID_SECTIONS[currentSectionIndex + 1]].label}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>

          {/* Mobile: other types + sections */}
          <div className="mt-12 lg:hidden">
            <h3 className="text-ui font-medium text-ink-muted mb-3">
              More about Type {n}
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href={`/types/${n}`}
                className="rounded-full border border-border px-4 py-1.5 text-small font-medium text-ink-muted hover:text-brand hover:border-brand transition-colors"
              >
                Full Profile
              </Link>
              {VALID_SECTIONS.filter((s) => s !== section).map((s) => (
                <Link
                  key={s}
                  href={`/types/${n}/${s}`}
                  className="rounded-full border border-border px-4 py-1.5 text-small font-medium text-ink-muted hover:text-brand hover:border-brand transition-colors"
                >
                  {SECTION_META[s].label}
                </Link>
              ))}
            </div>

            <h3 className="text-ui font-medium text-ink-muted mb-3">
              Explore other types
            </h3>
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.filter((t) => t !== num).map((t) => {
                const typeCenter = TYPE_TO_CENTER[t];
                return (
                  <Link
                    key={t}
                    href={`/types/${t}/${section}`}
                    className={`rounded-full border border-border px-4 py-1.5 text-small font-medium text-ink-muted hover:text-center-${typeCenter}-ink hover:border-center-${typeCenter} hover:bg-center-${typeCenter}-soft/30 transition-colors`}
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
