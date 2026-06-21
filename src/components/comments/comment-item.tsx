"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommentForm } from "./comment-form";
import type { CommentWithReplies } from "@/lib/content/comments";

/** Max nesting depth for replies (0-indexed). Prevents deeply nested threads. */
const MAX_DEPTH = 2;

interface CommentItemProps {
  comment: CommentWithReplies;
  postType: "blog" | "type" | "article";
  postSlug: string;
  depth?: number;
}

export function CommentItem({
  comment,
  postType,
  postSlug,
  depth = 0,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div
      className={depth > 0 ? "ml-6 border-l border-border pl-4" : ""}
    >
      <div className="py-4">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">
            {comment.author_name}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeDate(comment.created_at)}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-foreground/90 whitespace-pre-line leading-relaxed">
          {comment.body}
        </p>

        {depth < MAX_DEPTH && (
          <div className="mt-2">
            {showReplyForm ? (
              <div className="mt-3">
                <CommentForm
                  postType={postType}
                  postSlug={postSlug}
                  parentId={comment.id}
                  onCancel={() => setShowReplyForm(false)}
                  onSuccess={() => setShowReplyForm(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(true)}
                className="text-muted-foreground hover:text-foreground -ml-2.5"
              >
                Reply
              </Button>
            )}
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postType={postType}
              postSlug={postSlug}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Formats a timestamp into a human-friendly relative string.
 * Falls back to a short date for anything older than 30 days.
 */
function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 30)
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  }).format(date);
}
