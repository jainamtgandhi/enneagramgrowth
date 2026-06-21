import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const CommentSchema = z.object({
  author_name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  author_email: z.string().email("Please enter a valid email address"),
  body: z
    .string()
    .min(1, "Comment is required")
    .max(5000, "Comment must be 5,000 characters or fewer"),
  post_type: z.enum(["blog", "type", "article"]),
  post_slug: z.string().min(1, "Post slug is required"),
  parent_id: z.string().uuid("Invalid parent comment ID").optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = CommentSchema.safeParse(json);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message ?? "Validation failed" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comments")
      .insert({
        author_name: result.data.author_name,
        author_email: result.data.author_email,
        body: result.data.body,
        post_type: result.data.post_type,
        post_slug: result.data.post_slug,
        parent_id: result.data.parent_id ?? null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to insert comment:", error);
      return NextResponse.json(
        { error: "Failed to submit comment. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { id: data.id, message: "Comment submitted for review" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
