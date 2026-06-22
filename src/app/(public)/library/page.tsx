import type { Metadata } from "next";
import Link from "next/link";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { EnneagramDiagram } from "@/components/enneagram/enneagram-diagram";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { ArticleFrontmatter, ContentLevel } from "@/lib/content/mdx";
import { LevelBadge } from "@/components/shared/level-badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";


export const metadata: Metadata = {
  title: "The Enneagram",
  description:
    "Explore the Enneagram: nine paths to self-understanding. Learn about the types, centers, wings, arrows, and more.",
  openGraph: {
    title: "The Enneagram | Enneagram Growth",
    description:
      "A map of nine ways people meet the world. Explore types, centers, wings, arrows, instincts, relationships, and growth practices.",
    images: [
      {
        url: "/images/hero-nature.jpg",
        width: 1200,
        height: 630,
        alt: "The Enneagram - nine paths to self-understanding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Enneagram | Enneagram Growth",
    description:
      "A map of nine ways people meet the world. Explore types, centers, wings, arrows, instincts, relationships, and growth practices.",
  },
};

const articleGroups = [
  {
    title: "Foundations",
    description: "Start here. These build on each other.",
    articles: [
      { href: "/library/what-is-it", label: "What Is the Enneagram?", description: "The basics: a map, not a box." },
      { href: "/library/centers", label: "The Three Centers", description: "Body, Heart, and Head intelligence." },
      { href: "/library/wings", label: "Wings", description: "The types that shade your core pattern." },
      { href: "/library/arrows", label: "Arrows & Growth Paths", description: "How you move in growth and stress." },
    ],
  },
  {
    title: "Going Deeper",
    description: "Nuances that deepen your understanding.",
    articles: [
      { href: "/library/instincts", label: "The Three Instincts", description: "Self-preservation, social, and one-to-one." },
      { href: "/library/mistyping", label: "Common Misidentifications", description: "Why types get confused, and how to tell." },
      { href: "/library/glossary", label: "Glossary", description: "Key terms and definitions." },
    ],
  },
  {
    title: "Living It",
    description: "From theory to practice.",
    articles: [
      { href: "/growth", label: "Growth Practices", description: "From autopilot to awareness: practices for every type." },
      { href: "/relationships", label: "Relationships", description: "How to love and connect with each type." },
      { href: "/workplace", label: "The Enneagram at Work", description: "How each type shows up in teams, conflict, and leadership." },
      { href: "/coping", label: "Coping & Solutions", description: "When your patterns take over: practical strategies by struggle." },
      { href: "/library/responsible-use", label: "Using It Responsibly", description: "Principles for ethical application." },
    ],
  },
];

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

export default function EnneagramHubPage() {
  const articles = getAllContentFiles<ArticleFrontmatter>("enneagram");
  const levelBySlug: Record<string, ContentLevel> = {};
  for (const article of articles) {
    if (article.frontmatter.level) {
      levelBySlug[article.slug] = article.frontmatter.level;
    }
  }

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <Breadcrumbs items={[{ label: "Library" }]} />
        <h1 className="font-serif text-display font-semibold text-ink mb-4">
          The Enneagram
        </h1>
        <p className="text-body-lg text-ink-muted max-w-[68ch] mb-8">
          A map of nine ways people meet the world, not to label, but to notice.
          Start wherever draws you.
        </p>

        {/* Start Here CTA */}
        <div className="rounded-xl border border-brand bg-brand-soft/30 p-6 mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-serif text-h3 font-semibold text-ink mb-1">
              New here? Start with the basics.
            </h2>
            <p className="text-body text-ink-muted">
              Our free 7-lesson primer takes you from &ldquo;what is
              this?&rdquo; to &ldquo;I see it in myself&rdquo;, no login
              needed.
            </p>
          </div>
          <Button
            render={<Link href="/learn" />}
            className="rounded-full px-6 shrink-0"
          >
            Start learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* The Nine Types */}
        <section className="mb-20">
          <h2 className="font-serif text-h2 font-semibold text-ink mb-8">
            The Nine Types
          </h2>
          <div className="mx-auto max-w-[400px] mb-12">
            <EnneagramDiagram />
          </div>
          {CENTER_ORDER.map((center) => {
            const info = CENTER_INFO[center];
            return (
              <div key={center} className="mb-8">
                <h3
                  className={`text-ui font-medium text-center-${center}-ink mb-3`}
                >
                  {info.label}
                </h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {info.types.map((n) => {
                    const type = TYPE_INFO[n];
                    return (
                      <Link
                        key={n}
                        href={`/types/${n}`}
                        className={`rounded-lg border border-border bg-surface p-4 hover:border-center-${center} hover:shadow-card transition-all`}
                      >
                        <span
                          className={`font-serif text-h3 font-bold text-center-${center}-ink`}
                        >
                          {n}
                        </span>
                        <span className="ml-2 text-body font-medium text-ink">
                          {type.name}
                        </span>
                        <p className="text-small text-ink-muted mt-1 line-clamp-2">
                          {type.brief}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <Link
            href="/types"
            className="text-ui font-medium text-brand hover:text-brand-hover transition-colors"
          >
            View all types &rarr;
          </Link>
        </section>

        {/* Explore the System - grouped articles */}
        <section>
          <h2 className="font-serif text-h2 font-semibold text-ink mb-3">
            Explore the System
          </h2>
          <p className="text-body text-ink-muted mb-10 max-w-[56ch]">
            Go deeper into the framework. Start with the foundations, then
            explore at your own pace.
          </p>
          <div className="space-y-12">
            {articleGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-serif text-h3 font-semibold text-ink mb-1">
                  {group.title}
                </h3>
                <p className="text-small text-ink-muted mb-4">
                  {group.description}
                </p>
                <div className="space-y-3">
                  {group.articles.map((article) => {
                    const slug = article.href.split("/").pop() ?? "";
                    const level = levelBySlug[slug];
                    return (
                      <Link
                        key={article.href}
                        href={article.href}
                        className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 hover:border-brand hover:shadow-card transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-body font-medium text-ink group-hover:text-brand transition-colors">
                              {article.label}
                            </h4>
                            {level && <LevelBadge level={level} />}
                          </div>
                          <p className="text-small text-ink-muted mt-0.5">
                            {article.description}
                          </p>
                        </div>
                        <span className="text-ink-muted group-hover:text-brand transition-colors mt-1">
                          &rarr;
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
  );
}
