import { describe, it, expect } from "vitest";
import {
  scoreCenterPhase,
  getDominantCenter,
  scoreTypePhase,
  getCandidateTypes,
  computeResult,
} from "./scoring";
import type { DiscoveryOption } from "./questions";

describe("scoreCenterPhase", () => {
  it("counts center selections correctly", () => {
    const answers: DiscoveryOption[] = [
      { label: "a", center: "body" },
      { label: "b", center: "body" },
      { label: "c", center: "heart" },
      { label: "d", center: "head" },
    ];
    const scores = scoreCenterPhase(answers);
    expect(scores).toEqual({ body: 2, heart: 1, head: 1 });
  });

  it("returns zeros when no answers have centers", () => {
    const answers: DiscoveryOption[] = [
      { label: "a" },
      { label: "b" },
    ];
    const scores = scoreCenterPhase(answers);
    expect(scores).toEqual({ body: 0, heart: 0, head: 0 });
  });

  it("handles empty answers array", () => {
    const scores = scoreCenterPhase([]);
    expect(scores).toEqual({ body: 0, heart: 0, head: 0 });
  });

  it("counts all three centers independently", () => {
    const answers: DiscoveryOption[] = [
      { label: "a", center: "body" },
      { label: "b", center: "heart" },
      { label: "c", center: "head" },
    ];
    const scores = scoreCenterPhase(answers);
    expect(scores.body).toBe(1);
    expect(scores.heart).toBe(1);
    expect(scores.head).toBe(1);
  });
});

describe("getDominantCenter", () => {
  it("returns the center with highest score", () => {
    expect(getDominantCenter({ body: 1, heart: 3, head: 2 })).toBe("heart");
    expect(getDominantCenter({ body: 5, heart: 2, head: 1 })).toBe("body");
    expect(getDominantCenter({ body: 0, heart: 0, head: 3 })).toBe("head");
  });

  it("breaks ties with priority: heart > body > head", () => {
    expect(getDominantCenter({ body: 2, heart: 2, head: 0 })).toBe("heart");
    expect(getDominantCenter({ body: 2, heart: 0, head: 2 })).toBe("body");
    expect(getDominantCenter({ body: 0, heart: 2, head: 2 })).toBe("heart");
  });

  it("breaks three-way tie with heart priority", () => {
    expect(getDominantCenter({ body: 3, heart: 3, head: 3 })).toBe("heart");
  });

  it("handles all-zero scores", () => {
    expect(getDominantCenter({ body: 0, heart: 0, head: 0 })).toBe("heart");
  });
});

describe("scoreTypePhase", () => {
  it("accumulates type weights within a center", () => {
    const answers: DiscoveryOption[] = [
      { label: "a", typeWeights: { 8: 2, 9: 1 } },
      { label: "b", typeWeights: { 9: 3, 1: 1 } },
    ];
    const scores = scoreTypePhase(answers, "body");
    expect(scores[8]).toBe(2);
    expect(scores[9]).toBe(4);
    expect(scores[1]).toBe(1);
  });

  it("ignores type weights outside the given center", () => {
    const answers: DiscoveryOption[] = [
      { label: "a", typeWeights: { 2: 5, 8: 3 } },
    ];
    const scores = scoreTypePhase(answers, "body");
    expect(scores[8]).toBe(3);
    expect(scores[2]).toBeUndefined();
  });

  it("initializes all center types to zero", () => {
    const scores = scoreTypePhase([], "heart");
    expect(scores).toEqual({ 2: 0, 3: 0, 4: 0 });
  });

  it("handles answers without typeWeights", () => {
    const answers: DiscoveryOption[] = [
      { label: "a", center: "body" },
    ];
    const scores = scoreTypePhase(answers, "body");
    expect(scores).toEqual({ 8: 0, 9: 0, 1: 0 });
  });
});

describe("getCandidateTypes", () => {
  it("returns all types scoring >= 50% of max", () => {
    const candidates = getCandidateTypes({ 8: 10, 9: 6, 1: 4 });
    expect(candidates).toContain(8);
    expect(candidates).toContain(9);
    expect(candidates).not.toContain(1);
  });

  it("returns all types when all scores are zero", () => {
    const candidates = getCandidateTypes({ 2: 0, 3: 0, 4: 0 });
    expect(candidates).toEqual([2, 3, 4]);
  });

  it("returns single type when one clearly dominates", () => {
    const candidates = getCandidateTypes({ 5: 10, 6: 2, 7: 1 });
    expect(candidates).toEqual([5]);
  });

  it("includes tied top scorers", () => {
    const candidates = getCandidateTypes({ 5: 5, 6: 5, 7: 1 });
    expect(candidates).toContain(5);
    expect(candidates).toContain(6);
  });

  it("returns empty array for empty input", () => {
    expect(getCandidateTypes({})).toEqual([]);
  });
});

describe("computeResult", () => {
  it("produces a full result from center and type answers", () => {
    const centerAnswers: DiscoveryOption[] = [
      { label: "a", center: "head" },
      { label: "b", center: "head" },
      { label: "c", center: "body" },
    ];
    const typeAnswers: DiscoveryOption[] = [
      { label: "x", typeWeights: { 5: 3, 6: 1, 7: 0 } },
      { label: "y", typeWeights: { 5: 2, 6: 2, 7: 1 } },
    ];
    const result = computeResult(centerAnswers, typeAnswers);

    expect(result.center).toBe("head");
    expect(result.centerScores.head).toBe(2);
    expect(result.typeScores[5]).toBe(5);
    expect(result.candidateTypes).toContain(5);
  });

  it("handles minimal input without errors", () => {
    const result = computeResult([], []);
    expect(result.center).toBeDefined();
    expect(result.centerScores).toBeDefined();
  });

  it("combines phase 2 and phase 3 type answers", () => {
    const centerAnswers: DiscoveryOption[] = [
      { label: "a", center: "body" },
      { label: "b", center: "body" },
      { label: "c", center: "head" },
    ];
    const typeAnswers: DiscoveryOption[] = [
      { label: "x", typeWeights: { 8: 2 } },
    ];
    const confirmAnswers: DiscoveryOption[] = [
      { label: "y", typeWeights: { 8: 3 } },
      { label: "z", typeWeights: { 9: 2 } },
    ];
    const result = computeResult(centerAnswers, typeAnswers, confirmAnswers);
    expect(result.center).toBe("body");
    expect(result.typeScores[8]).toBe(5);
    expect(result.typeScores[9]).toBe(2);
  });
});
