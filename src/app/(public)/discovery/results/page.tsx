import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ResultCard } from "@/components/quiz/result-card";
import { TypeBreakdown } from "@/components/quiz/type-breakdown";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Button } from "@/components/ui/button";
import type { EnneagramType } from "@/lib/enneagram/types";
import type { ConfidenceLevel } from "@/types/database";
import type { QuizSession } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Your Results",
  description: "Your Enneagram Discovery Quiz results.",
};

interface PageProps {
  searchParams: Promise<{ session?: string }>;
}

export default async function ResultsPage({ searchParams }: PageProps) {
  const { session: sessionId } = await searchParams;

  if (!sessionId) notFound();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error || !data) notFound();

  const session = data as QuizSession;
  if (!session.result_type) notFound();

  const scores = (session.raw_scores || {}) as Record<EnneagramType, number>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Your Results</h1>
        <p className="mt-2 text-muted-foreground">
          Based on your responses to the Discovery Quiz
        </p>
      </div>

      <ResultCard
        primaryType={session.result_type as EnneagramType}
        wing={session.result_wing as EnneagramType}
        confidence={session.result_confidence as ConfidenceLevel}
      />

      <div className="mt-8">
        <TypeBreakdown
          scores={scores}
          primaryType={session.result_type as EnneagramType}
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button render={<Link href={`/library/type-${session.result_type}`} />}>
          Learn About Type {session.result_type}
        </Button>
        <Button variant="outline" render={<Link href="/library" />}>
          Explore All Types
        </Button>
      </div>

      <div className="mt-8 flex justify-center">
        <ShareButtons title={`I'm an Enneagram Type ${session.result_type}! Discover your type at The Practice.`} />
      </div>
    </div>
  );
}
