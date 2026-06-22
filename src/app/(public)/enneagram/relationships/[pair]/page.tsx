import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPairRelationship, TYPE_PAIR_RELATIONSHIPS } from "@/lib/enneagram/relationships";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_TO_CENTER } from "@/lib/enneagram/types";
import type { EnneagramType } from "@/lib/enneagram/types";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

function parsePair(pair: string): [EnneagramType, EnneagramType] | null {
  const match = pair.match(/^([1-9])-([1-9])$/);
  if (!match) return null;
  const a = Number(match[1]) as EnneagramType;
  const b = Number(match[2]) as EnneagramType;
  if (a > b) return null;
  return [a, b];
}

export function generateStaticParams() {
  return TYPE_PAIR_RELATIONSHIPS.map((p) => ({
    pair: `${p.type1}-${p.type2}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) return {};
  const rel = getPairRelationship(parsed[0], parsed[1]);
  if (!rel) return {};
  const title = `Type ${rel.type1} & Type ${rel.type2} Relationship | Enneagram Growth`;
  const description = rel.overview.slice(0, 160);
  return {
    title: `Type ${rel.type1} & Type ${rel.type2} Relationship`,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PairPage({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();

  const rel = getPairRelationship(parsed[0], parsed[1]);
  if (!rel) notFound();

  const info1 = TYPE_INFO[rel.type1];
  const info2 = TYPE_INFO[rel.type2];
  const center1 = TYPE_TO_CENTER[rel.type1];
  const center2 = TYPE_TO_CENTER[rel.type2];

  return (
    <main className="mx-auto max-w-[720px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { label: "Enneagram", href: "/enneagram" },
          { label: "Relationships", href: "/enneagram/relationships" },
          { label: `Type ${rel.type1} & Type ${rel.type2}` },
        ]}
      />

      {/* Type badges */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/enneagram/types/${rel.type1}`}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-small font-medium bg-center-${center1}-soft text-center-${center1}-ink hover:ring-2 hover:ring-center-${center1}/40 transition-all`}
        >
          <span className="font-bold">{rel.type1}</span> {info1.name}
        </Link>
        <span className="text-ink-muted">&</span>
        <Link
          href={`/enneagram/types/${rel.type2}`}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-small font-medium bg-center-${center2}-soft text-center-${center2}-ink hover:ring-2 hover:ring-center-${center2}/40 transition-all`}
        >
          <span className="font-bold">{rel.type2}</span> {info2.name}
        </Link>
      </div>

      <h1 className="font-serif text-[1.75rem] sm:text-display font-semibold text-ink mb-4">
        {rel.title}
      </h1>

      <p className="text-body-lg text-ink-muted mb-12">{rel.overview}</p>

      {/* Strengths */}
      <section className="mb-10">
        <h2 className="font-serif text-h3 font-semibold text-ink mb-4">
          What Works
        </h2>
        <ul className="space-y-2">
          {rel.strengths.map((s, i) => (
            <li key={i} className="flex gap-3 text-body text-ink">
              <span className="text-brand mt-0.5 shrink-0">+</span>
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section className="mb-10">
        <h2 className="font-serif text-h3 font-semibold text-ink mb-4">
          Watch For
        </h2>
        <ul className="space-y-2">
          {rel.challenges.map((c, i) => (
            <li key={i} className="flex gap-3 text-body text-ink">
              <span className="text-ink-muted mt-0.5 shrink-0">&ndash;</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* Growth tips */}
      <section className="mb-10">
        <h2 className="font-serif text-h3 font-semibold text-ink mb-4">
          Growth Tips
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className={`text-small font-medium text-center-${center1}-ink mb-2`}>
              For the {info1.name} (Type {rel.type1})
            </p>
            <p className="text-body text-ink">{rel.tipForType1}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className={`text-small font-medium text-center-${center2}-ink mb-2`}>
              For the {info2.name} (Type {rel.type2})
            </p>
            <p className="text-body text-ink">{rel.tipForType2}</p>
          </div>
        </div>
      </section>

      {/* Key insight */}
      <section className="mb-12 rounded-xl bg-brand-soft/30 border border-brand/20 p-6">
        <p className="font-serif text-h3 font-semibold text-ink mb-2">
          The Key Insight
        </p>
        <p className="text-body text-ink">{rel.keyInsight}</p>
      </section>

      {/* Navigation */}
      <div className="mt-16 flex flex-col sm:flex-row gap-4">
        <Link
          href="/enneagram/relationships"
          className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
        >
          &larr; All relationships
        </Link>
        <span className="hidden sm:inline text-ink-muted">&middot;</span>
        <Link
          href={`/enneagram/types/${rel.type1}`}
          className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
        >
          Type {rel.type1}: {info1.name}
        </Link>
        {rel.type1 !== rel.type2 && (
          <>
            <span className="hidden sm:inline text-ink-muted">&middot;</span>
            <Link
              href={`/enneagram/types/${rel.type2}`}
              className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
            >
              Type {rel.type2}: {info2.name}
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
