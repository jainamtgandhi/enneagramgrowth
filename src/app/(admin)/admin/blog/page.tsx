import Link from "next/link";
import { getAllPosts } from "@/lib/content/queries";
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
import { formatDate } from "@/lib/utils/format";
import { Plus } from "lucide-react";

export default async function AdminBlogList() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Blog Posts</h1>
        <Button render={<Link href="/admin/blog/new" />}>
          <Plus className="h-4 w-4 mr-1" /> New Post
        </Button>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant={post.is_published ? "default" : "secondary"}>
                    {post.is_published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.published_at ? formatDate(post.published_at) : "—"}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" render={<Link href={`/admin/blog/${post.id}/edit`} />}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No posts yet. Create your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
