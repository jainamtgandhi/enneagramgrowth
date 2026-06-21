import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const UpdateStatusSchema = z.object({
  status: z.enum(["approved", "flagged"]),
});

/**
 * PATCH /api/comments/[id] — Update comment status (auth required).
 * Used by moderators to approve or flag comments.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  // Verify authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const result = UpdateStatusSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Status must be 'approved' or 'flagged'" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("comments")
      .update({ status: result.data.status })
      .eq("id", id);

    if (error) {
      console.error("Failed to update comment:", error);
      return NextResponse.json(
        { error: "Failed to update comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Comment updated" });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/comments/[id] — Remove a comment (auth required).
 * Cascade delete will also remove child replies (handled by DB FK constraint).
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  // Verify authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Comment deleted" });
}
