import type { EnneagramType } from "@/lib/enneagram/types";
import type { QuizItem, QuizAnswer, QuizResult } from "./types";

export function scoreQuiz(
  items: QuizItem[],
  answers: QuizAnswer[]
): QuizResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]));
  const rawScores: Record<number, number> = {};
  const maxScores: Record<number, number> = {};

  // Initialize
  for (let t = 1; t <= 9; t++) {
    rawScores[t] = 0;
    maxScores[t] = 0;
  }

  // Calculate raw scores
  for (const item of items) {
    const answerValue = answerMap.get(item.id);
    if (answerValue === undefined) continue;

    const score = item.reverseScored ? 6 - answerValue : answerValue;
    rawScores[item.targetType] += score * item.weight;
    maxScores[item.targetType] += 5 * item.weight; // max possible
  }

  // Normalize to 0-100
  const normalizedScores = {} as Record<EnneagramType, number>;
  for (let t = 1; t <= 9; t++) {
    const type = t as EnneagramType;
    normalizedScores[type] =
      maxScores[t] > 0
        ? Math.round((rawScores[t] / maxScores[t]) * 100)
        : 0;
  }

  // Find primary type
  const sortedTypes = (Object.entries(normalizedScores) as [string, number][])
    .sort(([, a], [, b]) => b - a)
    .map(([type]) => Number(type) as EnneagramType);

  const primaryType = sortedTypes[0];
  const primaryScore = normalizedScores[primaryType];
  const secondScore = normalizedScores[sortedTypes[1]];

  // Calculate wing (highest adjacent type)
  const wing = calculateWing(primaryType, normalizedScores);

  // Calculate confidence
  const gap = primaryScore - secondScore;
  const confidence: "low" | "medium" | "high" =
    gap >= 15 ? "high" : gap >= 8 ? "medium" : "low";

  return {
    primaryType,
    wing,
    confidence,
    scores: normalizedScores,
  };
}

function calculateWing(
  primaryType: EnneagramType,
  scores: Record<EnneagramType, number>
): EnneagramType {
  const lower = primaryType === 1 ? 9 : ((primaryType - 1) as EnneagramType);
  const upper = primaryType === 9 ? 1 : ((primaryType + 1) as EnneagramType);

  return scores[lower] >= scores[upper] ? lower : upper;
}
