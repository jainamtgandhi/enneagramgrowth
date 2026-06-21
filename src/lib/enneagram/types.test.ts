import { describe, it, expect } from "vitest";
import {
  CENTER_INFO,
  TYPE_TO_CENTER,
  ALL_TYPES,
  type Center,
  type EnneagramType,
} from "./types";
import { TYPE_INFO, ALL_TYPES as DESC_ALL_TYPES } from "./descriptions";

describe("CENTER_INFO", () => {
  it("has all three centers", () => {
    expect(Object.keys(CENTER_INFO)).toHaveLength(3);
    expect(CENTER_INFO.body).toBeDefined();
    expect(CENTER_INFO.heart).toBeDefined();
    expect(CENTER_INFO.head).toBeDefined();
  });

  it("body center contains types 8, 9, 1", () => {
    expect(CENTER_INFO.body.types).toEqual([8, 9, 1]);
  });

  it("heart center contains types 2, 3, 4", () => {
    expect(CENTER_INFO.heart.types).toEqual([2, 3, 4]);
  });

  it("head center contains types 5, 6, 7", () => {
    expect(CENTER_INFO.head.types).toEqual([5, 6, 7]);
  });

  it("all center types cover all 9 enneagram types", () => {
    const allTypes = [
      ...CENTER_INFO.body.types,
      ...CENTER_INFO.heart.types,
      ...CENTER_INFO.head.types,
    ].sort();
    expect(allTypes).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("each center has a label and theme", () => {
    const centers: Center[] = ["body", "heart", "head"];
    for (const c of centers) {
      expect(CENTER_INFO[c].label).toBeTruthy();
      expect(CENTER_INFO[c].theme).toBeTruthy();
    }
  });
});

describe("TYPE_TO_CENTER", () => {
  it("maps all 9 types", () => {
    expect(Object.keys(TYPE_TO_CENTER)).toHaveLength(9);
  });

  it("maps body types correctly", () => {
    expect(TYPE_TO_CENTER[1]).toBe("body");
    expect(TYPE_TO_CENTER[8]).toBe("body");
    expect(TYPE_TO_CENTER[9]).toBe("body");
  });

  it("maps heart types correctly", () => {
    expect(TYPE_TO_CENTER[2]).toBe("heart");
    expect(TYPE_TO_CENTER[3]).toBe("heart");
    expect(TYPE_TO_CENTER[4]).toBe("heart");
  });

  it("maps head types correctly", () => {
    expect(TYPE_TO_CENTER[5]).toBe("head");
    expect(TYPE_TO_CENTER[6]).toBe("head");
    expect(TYPE_TO_CENTER[7]).toBe("head");
  });

  it("is consistent with CENTER_INFO", () => {
    const centers: Center[] = ["body", "heart", "head"];
    for (const center of centers) {
      for (const type of CENTER_INFO[center].types) {
        expect(TYPE_TO_CENTER[type]).toBe(center);
      }
    }
  });
});

describe("ALL_TYPES", () => {
  it("contains exactly 9 types", () => {
    expect(ALL_TYPES).toHaveLength(9);
  });

  it("contains types 1 through 9 in order", () => {
    expect(ALL_TYPES).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe("TYPE_INFO (descriptions)", () => {
  it("has info for all 9 types", () => {
    expect(Object.keys(TYPE_INFO)).toHaveLength(9);
  });

  it("each type has required fields", () => {
    for (const n of ALL_TYPES) {
      const info = TYPE_INFO[n];
      expect(info.number).toBe(n);
      expect(info.name).toBeTruthy();
      expect(info.altName).toBeTruthy();
      expect(info.center).toMatch(/^(body|heart|head)$/);
      expect(info.brief.length).toBeGreaterThan(20);
      expect(info.keywords.length).toBeGreaterThan(0);
    }
  });

  it("type centers match TYPE_TO_CENTER mapping", () => {
    for (const n of ALL_TYPES) {
      expect(TYPE_INFO[n].center).toBe(TYPE_TO_CENTER[n]);
    }
  });

  it("ALL_TYPES from descriptions matches types module", () => {
    expect(DESC_ALL_TYPES).toEqual(ALL_TYPES);
  });

  it("each type has unique name and altName", () => {
    const names = ALL_TYPES.map((n) => TYPE_INFO[n].name);
    const altNames = ALL_TYPES.map((n) => TYPE_INFO[n].altName);
    expect(new Set(names).size).toBe(9);
    expect(new Set(altNames).size).toBe(9);
  });
});
