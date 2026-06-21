import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LibraryForm } from "@/components/admin/library-form";
import type { LibraryArticle } from "@/lib/content/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLibraryArticle({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article, error } = await supabase
    .from("library_articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !article) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">
        Edit Library Article
      </h1>
      <LibraryForm article={article as LibraryArticle} />
    </div>
  );
}
