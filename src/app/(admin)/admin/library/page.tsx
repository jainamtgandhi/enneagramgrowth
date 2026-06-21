import Link from "next/link";
import { getAllArticles } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function AdminLibraryList() {
  const articles = await getAllArticles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Library Articles</h1>
        <Button render={<Link href="/admin/library/new" />}>
          <Plus className="h-4 w-4 mr-1" /> New Article
        </Button>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.type_tag ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {article.category}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={article.is_published ? "default" : "secondary"}
                  >
                    {article.is_published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" render={<Link href={`/admin/library/${article.id}/edit`} />}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {articles.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No articles yet. Create your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
