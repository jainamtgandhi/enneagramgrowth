import type { EnneagramType } from "@/lib/enneagram/types";

export interface QuizItem {
  id: string;
  text: string;
  targetType: EnneagramType;
  weight: number;
  reverseScored: boolean;
}

export interface QuizAnswer {
  questionId: string;
  value: number; // 1-5 Likert
}

export interface QuizResult {
  primaryType: EnneagramType;
  wing: EnneagramType;
  confidence: "low" | "medium" | "high";
  scores: Record<EnneagramType, number>;
}

export interface QuizState {
  currentIndex: number;
  answers: Record<string, number>;
  startedAt: string;
  isSubmitting: boolean;
  error: string | null;
}

export type QuizAction =
  | { type: "ANSWER"; questionId: string; value: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET" };
