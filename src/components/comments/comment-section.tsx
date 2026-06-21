import { getApprovedComments } from "@/lib/content/comments";
import { CommentList } from "./comment-list";

interface CommentSectionProps {
  postType: "blog" | "type" | "article";
  postSlug: string;
}

export async function CommentSection({
  postType,
  postSlug,
}: CommentSectionProps) {
  const comments = await getApprovedComments(postType, postSlug);
  const commentCount = countAllComments(comments);

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-serif text-xl font-semibold text-foreground">
        Discussion
        {commentCount > 0 && (
          <span className="ml-2 text-base font-normal text-muted-foreground">
            ({commentCount})
          </span>
        )}
      </h2>

      <CommentList
        comments={comments}
        postType={postType}
        postSlug={postSlug}
      />
    </section>
  );
}

/** Recursively counts all comments including nested replies. */
function countAllComments(
  comments: Awaited<ReturnType<typeof getApprovedComments>>
): number {
  let count = 0;
  for (const comment of comments) {
    count += 1;
    if (comment.replies.length > 0) {
      count += countAllComments(comment.replies);
    }
  }
  return count;
}
