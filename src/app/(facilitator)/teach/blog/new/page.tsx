"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BlogPostForm } from "@/components/blog/post-form";
import type { PostData } from "@/components/blog/post-form";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSave(data: PostData) {
    setSaving(true);
    const supabase = createClient();
    const isPublishing = data.status === "published";
    const { error } = await supabase.from("blog_posts").insert({
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
    });

    if (error) {
      alert(`Error: ${error.message}`);
      setSaving(false);
      return;
    }

    router.push("/teach/blog");
  }

  return (
    <div>
      <h1 className="font-serif text-h1 font-semibold text-ink mb-8">
        New Blog Post
      </h1>
      <BlogPostForm onSave={handleSave} saving={saving} />
    </div>
  );
}
