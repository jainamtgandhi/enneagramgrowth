import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/content/queries";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, reflections, and practical guidance on the Enneagram and personal growth.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeader
        title="Blog"
        description="Insights, reflections, and practical guidance on the Enneagram and personal growth."
      />

      {posts.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            No posts yet. Check back soon!
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
