"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BlogPostForm } from "@/components/blog/post-form";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSave(data: {
    title: string;
    slug: string;
    excerpt: string;
    body_md: string;
    tags: string[];
    status: "draft" | "published" | "archived";
  }) {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").insert({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      body_md: data.body_md,
      tags: data.tags.length > 0 ? data.tags : null,
      status: data.status,
      is_published: data.status === "published",
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
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
