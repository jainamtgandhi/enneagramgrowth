import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getArticleBySlug } from "@/lib/content/queries";
import { ArticleContent } from "@/components/library/article-content";
import { TypeNav } from "@/components/library/type-nav";
import { TypeBadge } from "@/components/library/type-badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { EnneagramType } from "@/lib/enneagram/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not Found" };

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.body_md.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: articles } = await supabase
    .from("library_articles")
    .select("slug")
    .eq("is_published", true);
  return (articles ?? []).map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <TypeNav />
          </div>
        </aside>

        <article className="min-w-0 flex-1">
          <Breadcrumbs
            items={[
              { label: "Library", href: "/library" },
              { label: article.title },
            ]}
          />

          <div className="mb-6">
            {article.type_tag && (
              <TypeBadge
                type={article.type_tag as EnneagramType}
                showName
                size="lg"
              />
            )}
            <h1 className="font-heading text-4xl font-bold tracking-tight mt-3">
              {article.title}
            </h1>
          </div>

          <ArticleContent content={article.body_md} />
        </article>
      </div>
    </div>
  );
}
