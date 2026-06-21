import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getPostBySlug } from "@/lib/content/queries";
import { ArticleContent } from "@/components/library/article-content";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Badge } from "@/components/ui/badge";
import { CommentSection } from "@/components/comments/comment-section";
import { formatDate } from "@/lib/utils/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.seo_title || post.title,
    description:
      post.seo_description || post.excerpt || post.body_md.slice(0, 160),
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true);
  return (posts ?? []).map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      {post.cover_image_url && (
        <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-surface-sunken mb-8">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="font-serif text-display font-semibold text-ink">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-small text-ink-muted">
          {post.published_at && <time>{formatDate(post.published_at)}</time>}
          {post.reading_time_min && (
            <>
              <span>&middot;</span>
              <span>{post.reading_time_min} min read</span>
            </>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <ArticleContent content={post.body_md} />

      <div className="mt-12 pt-6 border-t border-border">
        <ShareButtons title={post.title} />
      </div>

      <CommentSection postType="blog" postSlug={slug} />
    </div>
  );
}
