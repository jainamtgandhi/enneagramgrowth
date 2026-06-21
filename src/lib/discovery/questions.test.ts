import { describe, it, expect } from "vitest";
import {
  PHASE_1_QUESTIONS,
  PHASE_2_BODY,
  PHASE_2_HEART,
  PHASE_2_HEAD,
  PHASE_3_BODY,
  PHASE_3_HEART,
  PHASE_3_HEAD,
  getPhase2Questions,
  getPhase3Questions,
} from "./questions";

describe("PHASE_1_QUESTIONS", () => {
  it("has 12 questions", () => {
    expect(PHASE_1_QUESTIONS).toHaveLength(12);
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
      it("has 9 questions", () => {
        expect(questions).toHaveLength(9);
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

describe("PHASE_3 questions", () => {
  const phase3Sets = [
    { name: "BODY", questions: PHASE_3_BODY, types: [8, 9, 1] },
    { name: "HEART", questions: PHASE_3_HEART, types: [2, 3, 4] },
    { name: "HEAD", questions: PHASE_3_HEAD, types: [5, 6, 7] },
  ];

  for (const { name, questions, types } of phase3Sets) {
    describe(`PHASE_3_${name}`, () => {
      it("has 9 questions", () => {
        expect(questions).toHaveLength(9);
      });

      it("all questions are phase 3", () => {
        for (const q of questions) {
          expect(q.phase).toBe(3);
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

describe("all question IDs are globally unique", () => {
  it("no duplicate IDs across all phases", () => {
    const allQuestions = [
      ...PHASE_1_QUESTIONS,
      ...PHASE_2_BODY,
      ...PHASE_2_HEART,
      ...PHASE_2_HEAD,
      ...PHASE_3_BODY,
      ...PHASE_3_HEART,
      ...PHASE_3_HEAD,
    ];
    const ids = allQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
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

describe("getPhase3Questions", () => {
  it("returns body questions for body center", () => {
    expect(getPhase3Questions("body")).toBe(PHASE_3_BODY);
  });

  it("returns heart questions for heart center", () => {
    expect(getPhase3Questions("heart")).toBe(PHASE_3_HEART);
  });

  it("returns head questions for head center", () => {
    expect(getPhase3Questions("head")).toBe(PHASE_3_HEAD);
  });
});

describe("total question count", () => {
  it("each user path has 30 questions", () => {
    const centers = ["body", "heart", "head"] as const;
    for (const center of centers) {
      const total =
        PHASE_1_QUESTIONS.length +
        getPhase2Questions(center).length +
        getPhase3Questions(center).length;
      expect(total).toBe(30);
    }
  });
});
