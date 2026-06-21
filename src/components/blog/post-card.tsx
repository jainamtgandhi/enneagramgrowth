import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils/format";
import type { BlogPost } from "@/lib/content/types";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="h-full rounded-xl border border-border overflow-hidden hover:border-brand hover:shadow-card transition-all">
        {post.cover_image_url && (
          <div className="relative aspect-[16/9] overflow-hidden bg-surface-sunken">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 text-small text-ink-muted mb-2">
            {post.published_at && (
              <time>{formatDate(post.published_at)}</time>
            )}
            {post.reading_time_min && (
              <>
                <span>&middot;</span>
                <span>{post.reading_time_min} min read</span>
              </>
            )}
          </div>
          <h3 className="font-serif text-body-lg font-semibold leading-snug group-hover:text-brand transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 text-small text-ink-muted line-clamp-2">
              {post.excerpt}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-sunken px-2.5 py-0.5 text-small text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
