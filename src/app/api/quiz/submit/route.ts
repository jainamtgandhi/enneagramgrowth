import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { quizSubmissionSchema } from "@/schemas/quiz";
import { scoreQuiz } from "@/lib/quiz/scoring";
import { QUICK_MODE_ITEMS } from "@/lib/quiz/items";

function hashIP(ip: string): string {
  // Simple hash for rate limiting — not cryptographic
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quizSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { answers, mode, startedAt } = parsed.data;

    // Score the quiz
    const items = mode === "quick" ? QUICK_MODE_ITEMS : QUICK_MODE_ITEMS; // Full mode TBD
    const result = scoreQuiz(items, answers);

    // Get IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = hashIP(ip);

    // Store in Supabase (untyped client to avoid RLS type inference issues)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: session, error } = await supabase
      .from("quiz_sessions")
      .insert({
        mode,
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        result_type: result.primaryType,
        result_wing: result.wing,
        result_confidence: result.confidence,
        raw_scores: result.scores,
        answers,
        ip_hash: ipHash,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to store quiz session:", error);
      return NextResponse.json(
        { error: "Failed to save results" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sessionId: session.id,
      result,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
