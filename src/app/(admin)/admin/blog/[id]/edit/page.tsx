import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/blog-form";
import type { BlogPost } from "@/lib/content/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPost({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm post={post as BlogPost} />
    </div>
  );
}
