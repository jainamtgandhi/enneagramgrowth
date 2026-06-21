import type { Center } from "@/lib/enneagram/types";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { DiscoveryOption } from "./questions";

export interface DiscoveryResult {
  center: Center;
  candidateTypes: number[];
  centerScores: Record<Center, number>;
  typeScores: Record<number, number>;
}

export function scoreCenterPhase(
  answers: DiscoveryOption[]
): Record<Center, number> {
  const scores: Record<Center, number> = { body: 0, heart: 0, head: 0 };
  for (const answer of answers) {
    if (answer.center) {
      scores[answer.center] += 1;
    }
  }
  return scores;
}

export function getDominantCenter(
  scores: Record<Center, number>
): Center {
  const entries = Object.entries(scores) as [Center, number][];
  entries.sort((a, b) => b[1] - a[1]);
  // If top two centers are tied, prefer heart (most common center of
  // misidentification), then body, then head. This is a tiebreaker
  // heuristic, not a definitive determination.
  if (entries.length >= 2 && entries[0][1] === entries[1][1]) {
    const tied = entries.filter(([, s]) => s === entries[0][1]).map(([c]) => c);
    const priority: Center[] = ["heart", "body", "head"];
    return priority.find((c) => tied.includes(c)) ?? entries[0][0];
  }
  return entries[0][0];
}

export function scoreTypePhase(
  answers: DiscoveryOption[],
  center: Center
): Record<number, number> {
  const types = CENTER_INFO[center].types;
  const scores: Record<number, number> = {};
  for (const t of types) {
    scores[t] = 0;
  }

  for (const answer of answers) {
    if (answer.typeWeights) {
      for (const [typeStr, weight] of Object.entries(answer.typeWeights)) {
        const typeNum = Number(typeStr);
        if (typeNum in scores) {
          scores[typeNum] += weight ?? 0;
        }
      }
    }
  }

  return scores;
}

export function getCandidateTypes(
  typeScores: Record<number, number>
): number[] {
  const entries = Object.entries(typeScores).map(
    ([k, v]) => [Number(k), v] as [number, number]
  );
  entries.sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) return [];

  const maxScore = entries[0][1];
  if (maxScore === 0) return entries.map(([k]) => k);

  return entries
    .filter(([, score]) => score >= maxScore * 0.5)
    .map(([type]) => type);
}

export function computeResult(
  centerAnswers: DiscoveryOption[],
  typeAnswers: DiscoveryOption[],
  confirmAnswers: DiscoveryOption[] = []
): DiscoveryResult {
  const centerScores = scoreCenterPhase(centerAnswers);
  const center = getDominantCenter(centerScores);
  const allTypeAnswers = [...typeAnswers, ...confirmAnswers];
  const typeScores = scoreTypePhase(allTypeAnswers, center);
  const candidateTypes = getCandidateTypes(typeScores);

  return {
    center,
    candidateTypes,
    centerScores,
    typeScores,
  };
}
