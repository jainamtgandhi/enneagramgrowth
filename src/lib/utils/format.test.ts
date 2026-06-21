import { describe, it, expect } from "vitest";
import { formatDate, estimateReadingTime, slugify } from "./format";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    const result = formatDate("2025-03-15T00:00:00Z");
    expect(result).toBe("March 15, 2025");
  });

  it("formats a Date object", () => {
    const result = formatDate(new Date("2024-12-25"));
    expect(result).toContain("December");
    expect(result).toContain("25");
    expect(result).toContain("2024");
  });

  it("handles different date formats", () => {
    const result = formatDate("2026-01-01");
    expect(result).toContain("2026");
    expect(result).toContain("January");
  });
});

describe("estimateReadingTime", () => {
  it("returns 1 for very short text", () => {
    expect(estimateReadingTime("Hello world")).toBe(1);
  });

  it("returns 1 for empty string", () => {
    expect(estimateReadingTime("")).toBe(1);
  });

  it("estimates correctly for ~200 words (1 minute)", () => {
    const words = Array(200).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(1);
  });

  it("estimates correctly for ~400 words (2 minutes)", () => {
    const words = Array(400).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(2);
  });

  it("estimates correctly for ~1000 words (5 minutes)", () => {
    const words = Array(1000).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(5);
  });

  it("rounds up for fractional minutes", () => {
    const words = Array(250).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(2);
  });
});

describe("slugify", () => {
  it("converts to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugify("foo bar baz")).toBe("foo-bar-baz");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! World? #1")).toBe("hello-world-1");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("hello---world")).toBe("hello-world");
  });

  it("handles already-slugified text", () => {
    expect(slugify("hello-world")).toBe("hello-world");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles strings with only special chars", () => {
    expect(slugify("!!!")).toBe("");
  });

  it("preserves numbers", () => {
    expect(slugify("Type 9 - The Peacemaker")).toBe("type-9-the-peacemaker");
  });
});
