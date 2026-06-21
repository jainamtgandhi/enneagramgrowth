import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export type Comment = Database["public"]["Tables"]["comments"]["Row"];

export type CommentWithReplies = Comment & {
  replies: CommentWithReplies[];
};

/**
 * Fetches approved comments for a given post and nests replies under parents.
 * Returns a tree structure with top-level comments containing nested replies.
 */
export async function getApprovedComments(
  postType: string,
  postSlug: string
): Promise<CommentWithReplies[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_type", postType)
    .eq("post_slug", postSlug)
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  if (error) throw error;

  const comments = data ?? [];
  return nestComments(comments);
}

/**
 * Fetches all pending comments for moderation.
 * Ordered by oldest first so moderators process them in submission order.
 */
export async function getPendingComments(): Promise<Comment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/**
 * Returns aggregate counts of comments grouped by status.
 * Useful for moderation dashboard badges.
 */
export async function getCommentStats(): Promise<{
  pending: number;
  approved: number;
  flagged: number;
}> {
  const supabase = await createClient();

  const [pending, approved, flagged] = await Promise.all([
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "flagged"),
  ]);

  return {
    pending: pending.count ?? 0,
    approved: approved.count ?? 0,
    flagged: flagged.count ?? 0,
  };
}

/**
 * Converts a flat list of comments into a nested tree.
 * Top-level comments (parent_id === null) are roots;
 * replies are attached under their parent recursively.
 */
function nestComments(flat: Comment[]): CommentWithReplies[] {
  const map = new Map<string, CommentWithReplies>();
  const roots: CommentWithReplies[] = [];

  // Initialize each comment with an empty replies array
  for (const comment of flat) {
    map.set(comment.id, { ...comment, replies: [] });
  }

  // Attach children to their parents
  for (const comment of flat) {
    const node = map.get(comment.id)!;
    if (comment.parent_id && map.has(comment.parent_id)) {
      map.get(comment.parent_id)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
