"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BlogPostForm } from "@/components/blog/post-form";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<{
    title: string;
    slug: string;
    excerpt: string;
    body_md: string;
    tags: string[];
    status: "draft" | "published" | "archived";
  } | null>(null);
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
      });
      setLoading(false);
    }
    load();
  }, [id, router]);

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
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        body_md: data.body_md,
        tags: data.tags.length > 0 ? data.tags : null,
        status: data.status,
        is_published: data.status === "published",
        published_at:
          data.status === "published" ? new Date().toISOString() : null,
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
