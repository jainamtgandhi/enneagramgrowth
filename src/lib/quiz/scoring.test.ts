import { describe, it, expect } from "vitest";
import { scoreQuiz } from "./scoring";
import { QUICK_MODE_ITEMS } from "./items";
import type { QuizAnswer } from "./types";

function makeAnswers(
  typeScores: Partial<Record<number, number>>
): QuizAnswer[] {
  return QUICK_MODE_ITEMS.map((item) => ({
    questionId: item.id,
    value: typeScores[item.targetType] ?? 3,
  }));
}

describe("scoreQuiz", () => {
  it("identifies the primary type from highest scores", () => {
    const answers = makeAnswers({ 4: 5, 1: 1, 2: 1, 3: 1 });
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.primaryType).toBe(4);
  });

  it("returns normalized scores between 0 and 100", () => {
    const answers = makeAnswers({});
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);

    for (let t = 1; t <= 9; t++) {
      expect(result.scores[t as 1]).toBeGreaterThanOrEqual(0);
      expect(result.scores[t as 1]).toBeLessThanOrEqual(100);
    }
  });

  it("calculates high confidence when primary type leads by 15+", () => {
    // Type 7 scores 5, all others score 1 → large gap
    const answers = makeAnswers({
      7: 5,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      8: 1,
      9: 1,
    });
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.primaryType).toBe(7);
    expect(result.confidence).toBe("high");
  });

  it("calculates low confidence when scores are close", () => {
    // All types score the same
    const answers = makeAnswers({});
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.confidence).toBe("low");
  });

  it("calculates wing as highest adjacent type", () => {
    // Type 5 dominates, type 4 > type 6
    const answers = makeAnswers({ 5: 5, 4: 4, 6: 2 });
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.primaryType).toBe(5);
    expect(result.wing).toBe(4);
  });

  it("wraps wing around for type 1 (adjacent: 9 and 2)", () => {
    const answers = makeAnswers({ 1: 5, 9: 4, 2: 2 });
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.primaryType).toBe(1);
    expect(result.wing).toBe(9);
  });

  it("wraps wing around for type 9 (adjacent: 8 and 1)", () => {
    const answers = makeAnswers({ 9: 5, 1: 4, 8: 2 });
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.primaryType).toBe(9);
    expect(result.wing).toBe(1);
  });

  it("handles missing answers gracefully", () => {
    const answers: QuizAnswer[] = [
      { questionId: "q1_01", value: 5 },
      { questionId: "q1_02", value: 5 },
    ];
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    expect(result.primaryType).toBe(1);
    expect(result.scores).toBeDefined();
  });

  it("handles empty answers", () => {
    const result = scoreQuiz(QUICK_MODE_ITEMS, []);
    expect(result.scores).toBeDefined();
    for (let t = 1; t <= 9; t++) {
      expect(result.scores[t as 1]).toBe(0);
    }
  });

  it("returns all 9 type scores", () => {
    const answers = makeAnswers({});
    const result = scoreQuiz(QUICK_MODE_ITEMS, answers);
    for (let t = 1; t <= 9; t++) {
      expect(result.scores[t as 1]).toBeDefined();
    }
  });
});
