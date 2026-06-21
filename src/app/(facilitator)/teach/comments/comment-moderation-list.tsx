"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CommentModerationCard } from "@/components/comments/comment-moderation-card";
import type { Comment } from "@/lib/content/comments";

interface Props {
  pending: Comment[];
  approved: Comment[];
  flagged: Comment[];
}

export function CommentModerationList({ pending, approved, flagged }: Props) {
  const router = useRouter();

  function handleAction() {
    router.refresh();
  }

  return (
    <Tabs defaultValue={0}>
      <TabsList>
        <TabsTrigger value={0}>
          Pending ({pending.length})
        </TabsTrigger>
        <TabsTrigger value={1}>
          Approved ({approved.length})
        </TabsTrigger>
        <TabsTrigger value={2}>
          Flagged ({flagged.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value={0} className="mt-4">
        {pending.length === 0 ? (
          <EmptyState message="No pending comments. You're all caught up!" />
        ) : (
          <div className="space-y-3">
            {pending.map((comment) => (
              <CommentModerationCard
                key={comment.id}
                comment={comment}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value={1} className="mt-4">
        {approved.length === 0 ? (
          <EmptyState message="No approved comments yet." />
        ) : (
          <div className="space-y-3">
            {approved.map((comment) => (
              <CommentModerationCard
                key={comment.id}
                comment={comment}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value={2} className="mt-4">
        {flagged.length === 0 ? (
          <EmptyState message="No flagged comments." />
        ) : (
          <div className="space-y-3">
            {flagged.map((comment) => (
              <CommentModerationCard
                key={comment.id}
                comment={comment}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-border p-8 text-center">
      <p className="text-body text-ink-muted">{message}</p>
    </div>
  );
}
