import { describe, it, expect } from "vitest";
import {
  PHASE_1_QUESTIONS,
  PHASE_2_BODY,
  PHASE_2_HEART,
  PHASE_2_HEAD,
  getPhase2Questions,
} from "./questions";

describe("PHASE_1_QUESTIONS", () => {
  it("has 6 questions", () => {
    expect(PHASE_1_QUESTIONS).toHaveLength(6);
  });

  it("all questions are phase 1", () => {
    for (const q of PHASE_1_QUESTIONS) {
      expect(q.phase).toBe(1);
    }
  });

  it("all questions have unique IDs", () => {
    const ids = PHASE_1_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each question has exactly 3 options (one per center)", () => {
    for (const q of PHASE_1_QUESTIONS) {
      expect(q.options).toHaveLength(3);
      const centers = q.options.map((o) => o.center);
      expect(centers).toContain("body");
      expect(centers).toContain("heart");
      expect(centers).toContain("head");
    }
  });

  it("all options have non-empty labels", () => {
    for (const q of PHASE_1_QUESTIONS) {
      for (const o of q.options) {
        expect(o.label.length).toBeGreaterThan(10);
      }
    }
  });

  it("all questions have non-empty text", () => {
    for (const q of PHASE_1_QUESTIONS) {
      expect(q.text.length).toBeGreaterThan(10);
    }
  });
});

describe("PHASE_2 questions", () => {
  const phase2Sets = [
    { name: "BODY", questions: PHASE_2_BODY, types: [8, 9, 1] },
    { name: "HEART", questions: PHASE_2_HEART, types: [2, 3, 4] },
    { name: "HEAD", questions: PHASE_2_HEAD, types: [5, 6, 7] },
  ];

  for (const { name, questions, types } of phase2Sets) {
    describe(`PHASE_2_${name}`, () => {
      it("has 3 questions", () => {
        expect(questions).toHaveLength(3);
      });

      it("all questions are phase 2", () => {
        for (const q of questions) {
          expect(q.phase).toBe(2);
        }
      });

      it("has unique IDs", () => {
        const ids = questions.map((q) => q.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("each question has 3 options with typeWeights", () => {
        for (const q of questions) {
          expect(q.options).toHaveLength(3);
          for (const o of q.options) {
            expect(o.typeWeights).toBeDefined();
          }
        }
      });

      it(`type weights reference only types ${types.join(", ")}`, () => {
        for (const q of questions) {
          for (const o of q.options) {
            const weightedTypes = Object.keys(o.typeWeights!).map(Number);
            for (const t of weightedTypes) {
              expect(types).toContain(t);
            }
          }
        }
      });

      it("each option maps to exactly one type", () => {
        for (const q of questions) {
          for (const o of q.options) {
            const keys = Object.keys(o.typeWeights!);
            expect(keys).toHaveLength(1);
          }
        }
      });
    });
  }
});

describe("getPhase2Questions", () => {
  it("returns body questions for body center", () => {
    expect(getPhase2Questions("body")).toBe(PHASE_2_BODY);
  });

  it("returns heart questions for heart center", () => {
    expect(getPhase2Questions("heart")).toBe(PHASE_2_HEART);
  });

  it("returns head questions for head center", () => {
    expect(getPhase2Questions("head")).toBe(PHASE_2_HEAD);
  });
});
