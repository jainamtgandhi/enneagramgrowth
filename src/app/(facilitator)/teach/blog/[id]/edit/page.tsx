"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BlogPostForm } from "@/components/blog/post-form";
import type { PostData } from "@/components/blog/post-form";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<PostData | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.push("/teach/blog");
        return;
      }

      setPost({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || "",
        body_md: data.body_md,
        tags: data.tags || [],
        status: data.status,
        cover_image_url: data.cover_image_url || "",
        reading_time_min: data.reading_time_min,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        published_at: data.published_at || "",
      });
      setLoading(false);
    }
    load();
  }, [id, router]);

  async function handleSave(data: PostData) {
    setSaving(true);
    const supabase = createClient();
    const isPublishing = data.status === "published";
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        body_md: data.body_md,
        tags: data.tags.length > 0 ? data.tags : null,
        status: data.status,
        is_published: isPublishing,
        published_at: data.published_at
          ? data.published_at
          : isPublishing
            ? new Date().toISOString()
            : null,
        cover_image_url: data.cover_image_url || null,
        reading_time_min: data.reading_time_min,
        seo_title: data.seo_title || null,
        seo_description: data.seo_description || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      alert(`Error: ${error.message}`);
      setSaving(false);
      return;
    }

    router.push("/teach/blog");
  }

  if (loading) {
    return (
      <div>
        <h1 className="font-serif text-h1 font-semibold text-ink mb-8">
          Edit Post
        </h1>
        <p className="text-body text-ink-muted">Loading...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div>
      <h1 className="font-serif text-h1 font-semibold text-ink mb-8">
        Edit Post
      </h1>
      <BlogPostForm initialData={post} onSave={handleSave} saving={saving} />
    </div>
  );
}
