import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, BookOpen, Brain } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [blogResult, libraryResult, quizResult] = await Promise.all([
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("library_articles").select("id", { count: "exact", head: true }),
    supabase.from("quiz_sessions").select("id", { count: "exact", head: true }),
  ]);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <FileText className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{blogResult.count ?? 0}</div>
            <p className="text-sm text-muted-foreground">Blog Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{libraryResult.count ?? 0}</div>
            <p className="text-sm text-muted-foreground">Library Articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Brain className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{quizResult.count ?? 0}</div>
            <p className="text-sm text-muted-foreground">Quiz Sessions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
