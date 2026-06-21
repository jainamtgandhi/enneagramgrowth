"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { QuizProvider, useQuizContext } from "@/components/quiz/quiz-provider";
import { QuestionCard } from "@/components/quiz/question-card";
import { QuizProgressBar } from "@/components/quiz/progress-bar";
import { QUICK_MODE_ITEMS } from "@/lib/quiz/items";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let current = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    current = (current * 16807) % 2147483647;
    const j = current % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function QuizEngine() {
  const router = useRouter();
  const { state, dispatch } = useQuizContext();

  const items = useMemo(() => {
    const seed = new Date(state.startedAt).getTime() % 2147483647;
    return shuffleWithSeed(QUICK_MODE_ITEMS, seed);
  }, [state.startedAt]);

  const currentItem = items[state.currentIndex];
  const answeredCount = Object.keys(state.answers).length;
  const isLastQuestion = state.currentIndex === items.length - 1;
  const currentAnswer = state.answers[currentItem.id];
  const allAnswered = answeredCount === items.length;

  const handleAnswer = (value: number) => {
    dispatch({ type: "ANSWER", questionId: currentItem.id, value });
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (isLastQuestion && allAnswered) {
      handleSubmit();
    } else {
      dispatch({ type: "NEXT" });
    }
  };

  const handleSubmit = async () => {
    dispatch({ type: "SUBMIT_START" });
    try {
      const answers = Object.entries(state.answers).map(
        ([questionId, value]) => ({
          questionId,
          value,
        })
      );

      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          mode: "quick",
          startedAt: state.startedAt,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      dispatch({ type: "SUBMIT_SUCCESS" });
      router.push(`/discovery/results?session=${data.sessionId}`);
    } catch {
      dispatch({ type: "SUBMIT_ERROR", error: "Failed to submit quiz" });
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <QuizProgressBar current={answeredCount} total={items.length} />

      <div className="mt-8">
        <QuestionCard
          item={currentItem}
          answer={currentAnswer}
          onAnswer={handleAnswer}
          index={state.currentIndex}
          total={items.length}
        />
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => dispatch({ type: "PREV" })}
          disabled={state.currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!currentAnswer || state.isSubmitting}
        >
          {state.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Submitting...
            </>
          ) : isLastQuestion && allAnswered ? (
            "See Results"
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizEngine />
    </QuizProvider>
  );
}
