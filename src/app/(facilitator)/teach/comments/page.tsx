import { createClient } from "@/lib/supabase/server";
import { getCommentStats } from "@/lib/content/comments";
import { CommentModerationList } from "./comment-moderation-list";
import type { Comment } from "@/lib/content/comments";

export default async function TeachCommentsPage() {
  const supabase = await createClient();

  const [pendingResult, approvedResult, flaggedResult, stats] =
    await Promise.all([
      supabase
        .from("comments")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("comments")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("comments")
        .select("*")
        .eq("status", "flagged")
        .order("created_at", { ascending: false }),
      getCommentStats(),
    ]);

  const pending = (pendingResult.data ?? []) as Comment[];
  const approved = (approvedResult.data ?? []) as Comment[];
  const flagged = (flaggedResult.data ?? []) as Comment[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-h1 font-semibold text-ink">Comments</h1>
        <p className="text-body text-ink-muted mt-1">
          Review and moderate reader comments across your site.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 mb-8">
        <div className="rounded-lg border border-border p-4">
          <p className="text-small font-medium text-warning">Pending</p>
          <p className="text-h2 font-bold text-ink">{stats.pending}</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-small font-medium text-success">Approved</p>
          <p className="text-h2 font-bold text-ink">{stats.approved}</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <p className="text-small font-medium text-danger">Flagged</p>
          <p className="text-h2 font-bold text-ink">{stats.flagged}</p>
        </div>
      </div>

      <CommentModerationList
        pending={pending}
        approved={approved}
        flagged={flagged}
      />
    </div>
  );
}
