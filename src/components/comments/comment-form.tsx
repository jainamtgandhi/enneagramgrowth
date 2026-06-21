"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CommentFormSchema = z.object({
  author_name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  author_email: z.string().email("Please enter a valid email address"),
  body: z
    .string()
    .min(1, "Comment is required")
    .max(5000, "Comment must be 5,000 characters or fewer"),
});

interface CommentFormProps {
  postType: "blog" | "type" | "article";
  postSlug: string;
  parentId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function CommentForm({
  postType,
  postSlug,
  parentId,
  onCancel,
  onSuccess,
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const values = {
      author_name: formData.get("author_name") as string,
      author_email: formData.get("author_email") as string,
      body: formData.get("body") as string,
    };

    const result = CommentFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          post_type: postType,
          post_slug: postSlug,
          ...(parentId ? { parent_id: parentId } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to submit comment");
        return;
      }

      toast.success("Comment submitted for review");
      formRef.current?.reset();
      setErrors({});
      onSuccess?.();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`name-${parentId ?? "root"}`}>Name</Label>
          <Input
            id={`name-${parentId ?? "root"}`}
            name="author_name"
            placeholder="Your name"
            aria-invalid={!!errors.author_name}
            disabled={isSubmitting}
          />
          {errors.author_name && (
            <p className="text-xs text-destructive">{errors.author_name}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`email-${parentId ?? "root"}`}>Email</Label>
          <Input
            id={`email-${parentId ?? "root"}`}
            name="author_email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.author_email}
            disabled={isSubmitting}
          />
          {errors.author_email && (
            <p className="text-xs text-destructive">{errors.author_email}</p>
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`body-${parentId ?? "root"}`}>
          {parentId ? "Reply" : "Comment"}
        </Label>
        <Textarea
          id={`body-${parentId ?? "root"}`}
          name="body"
          placeholder={
            parentId ? "Write your reply..." : "Share your thoughts..."
          }
          rows={parentId ? 3 : 4}
          aria-invalid={!!errors.body}
          disabled={isSubmitting}
        />
        {errors.body && (
          <p className="text-xs text-destructive">{errors.body}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Submitting..."
            : parentId
              ? "Post Reply"
              : "Post Comment"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Your email will not be published. Comments are reviewed before appearing.
      </p>
    </form>
  );
}
