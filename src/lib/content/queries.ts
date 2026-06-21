import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type LibraryArticle = Database["public"]["Tables"]["library_articles"]["Row"];
type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

export async function getPublishedArticles(): Promise<LibraryArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("library_articles")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getArticleBySlug(
  slug: string
): Promise<LibraryArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("library_articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function getArticlesByType(
  typeTag: number
): Promise<LibraryArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("library_articles")
    .select("*")
    .eq("type_tag", typeTag)
    .eq("is_published", true)
    .order("position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getAllArticles(): Promise<LibraryArticle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("library_articles")
    .select("*")
    .order("position", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
