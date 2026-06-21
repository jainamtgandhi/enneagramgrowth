"use client";

import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";
import type { CommentWithReplies } from "@/lib/content/comments";

interface CommentListProps {
  comments: CommentWithReplies[];
  postType: "blog" | "type" | "article";
  postSlug: string;
}

export function CommentList({
  comments,
  postType,
  postSlug,
}: CommentListProps) {
  return (
    <div>
      {comments.length > 0 ? (
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postType={postType}
              postSlug={postSlug}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Be the first to share your thoughts.
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Leave a comment
        </h3>
        <CommentForm postType={postType} postSlug={postSlug} />
      </div>
    </div>
  );
}
