import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/content/queries";
import { PostCard } from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, reflections, and practical guidance on the Enneagram and personal growth.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
      <h1 className="font-serif text-display font-semibold text-ink">Blog</h1>
      <p className="mt-3 text-body-lg text-ink-muted max-w-[52ch]">
        Insights, reflections, and practical guidance on the Enneagram and
        personal growth.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-body text-ink-muted">
            No posts yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
