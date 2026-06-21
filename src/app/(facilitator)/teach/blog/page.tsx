import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/format";

export default async function TeachBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, status, is_published, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-h1 font-semibold text-ink">
          Blog Posts
        </h1>
        <Link
          href="/teach/blog/new"
          className="rounded-full bg-brand px-6 py-2 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
        >
          New Post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="rounded-xl border border-border p-8 text-center">
          <p className="text-body text-ink-muted mb-4">No blog posts yet.</p>
          <Link
            href="/teach/blog/new"
            className="text-ui font-medium text-brand hover:text-brand-hover"
          >
            Create your first post &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/teach/blog/${post.id}/edit`}
              className="flex items-center justify-between rounded-xl border border-border p-4 hover:border-brand hover:shadow-card transition-all"
            >
              <div>
                <h2 className="text-body font-medium text-ink">{post.title}</h2>
                <p className="text-small text-ink-muted mt-1">
                  {post.published_at
                    ? `Published ${formatDate(post.published_at)}`
                    : `Created ${formatDate(post.created_at)}`}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-small font-medium ${
                  post.status === "published"
                    ? "bg-success/10 text-success"
                    : post.status === "archived"
                      ? "bg-ink-muted/10 text-ink-muted"
                      : "bg-warning/10 text-warning"
                }`}
              >
                {post.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
