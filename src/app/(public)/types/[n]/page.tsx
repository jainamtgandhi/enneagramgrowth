import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentFile } from "@/lib/content/mdx";
import type { TypeFrontmatter } from "@/lib/content/mdx";
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
            <article className="prose prose-ink max-w-none">
              <MDXRemote source={file.content} />
            </article>
          ) : (
            <p className="text-body text-ink-muted">
              Full type page content coming soon.
            </p>
          )}

          {/* Does this resonate? checklist */}
          <div className="mt-16">
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
