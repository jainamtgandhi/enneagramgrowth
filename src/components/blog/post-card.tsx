import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";
import type { BlogPost } from "@/lib/content/types";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-0 shadow-sm overflow-hidden">
        {post.cover_image_url && (
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            {post.published_at && <time>{formatDate(post.published_at)}</time>}
            {post.reading_time_min && (
              <>
                <span>&middot;</span>
                <span>{post.reading_time_min} min read</span>
              </>
            )}
          </div>
          <h3 className="font-heading text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
