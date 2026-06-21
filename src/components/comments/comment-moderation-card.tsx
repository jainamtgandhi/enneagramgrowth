"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Flag, Trash2 } from "lucide-react";
import type { Comment } from "@/lib/content/comments";

interface CommentModerationCardProps {
  comment: Comment;
  onAction?: () => void;
}

export function CommentModerationCard({
  comment,
  onAction,
}: CommentModerationCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleAction(action: "approve" | "flag" | "delete") {
    setIsLoading(true);
    try {
      if (action === "delete") {
        const response = await fetch(`/api/comments/${comment.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to delete");
        }
        toast.success("Comment deleted");
      } else {
        const status = action === "approve" ? "approved" : "flagged";
        const response = await fetch(`/api/comments/${comment.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update");
        }
        toast.success(
          action === "approve" ? "Comment approved" : "Comment flagged"
        );
      }
      onAction?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const statusColors: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    approved: "bg-success/10 text-success",
    flagged: "bg-danger/10 text-danger",
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-body font-medium text-ink">
            {comment.author_name}
          </span>
          <span className="text-small text-ink-muted">
            {comment.author_email}
          </span>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-small font-medium ${
            statusColors[comment.status] ?? ""
          }`}
        >
          {comment.status}
        </span>
      </div>

      <div className="mb-3">
        <span className="text-small text-ink-muted">
          on{" "}
          <span className="font-medium text-ink">
            {comment.post_type}/{comment.post_slug}
          </span>
          {comment.parent_id && (
            <span className="ml-1 text-ink-muted">(reply)</span>
          )}
        </span>
      </div>

      <p className="text-body text-ink leading-relaxed whitespace-pre-line mb-4">
        {comment.body}
      </p>

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <span className="text-small text-ink-muted mr-auto">
          {new Date(comment.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>

        {comment.status !== "approved" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("approve")}
            disabled={isLoading}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Approve
          </Button>
        )}
        {comment.status !== "flagged" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("flag")}
            disabled={isLoading}
          >
            <Flag className="h-3.5 w-3.5 mr-1" />
            Flag
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAction("delete")}
          disabled={isLoading}
          className="text-danger hover:bg-danger/10"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
}
