"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { QuizState, QuizAction } from "@/lib/quiz/types";

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  startedAt: new Date().toISOString(),
  isSubmitting: false,
  error: null,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };
    case "NEXT":
      return { ...state, currentIndex: state.currentIndex + 1 };
    case "PREV":
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, error: action.error };
    case "RESET":
      return { ...initialState, startedAt: new Date().toISOString() };
    default:
      return state;
  }
}

interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, {
    ...initialState,
    startedAt: new Date().toISOString(),
  });

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within QuizProvider");
  }
  return context;
}
