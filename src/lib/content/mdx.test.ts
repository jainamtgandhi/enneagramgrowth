import { describe, it, expect } from "vitest";
import { getContentFile, getAllContentFiles } from "./mdx";
import type { TypeFrontmatter, LessonFrontmatter, ArticleFrontmatter } from "./mdx";

describe("getContentFile", () => {
  it("reads a type MDX file", () => {
    const file = getContentFile<TypeFrontmatter>("types", "type-1");
    expect(file).not.toBeNull();
    expect(file!.slug).toBe("type-1");
    expect(file!.frontmatter.title).toContain("Reformer");
    expect(file!.frontmatter.number).toBe(1);
    expect(file!.frontmatter.center).toBe("body");
    expect(file!.content.length).toBeGreaterThan(500);
  });

  it("returns null for nonexistent file", () => {
    const file = getContentFile("types", "nonexistent");
    expect(file).toBeNull();
  });

  it("returns null for nonexistent directory", () => {
    const file = getContentFile("nonexistent-dir", "anything");
    expect(file).toBeNull();
  });
});

describe("getAllContentFiles", () => {
  it("finds all 9 type files", () => {
    const files = getAllContentFiles<TypeFrontmatter>("types");
    expect(files).toHaveLength(9);
  });

  it("finds all learn lesson files", () => {
    const files = getAllContentFiles<LessonFrontmatter>("learn");
    expect(files.length).toBeGreaterThanOrEqual(7);
  });

  it("finds all enneagram article files", () => {
    const files = getAllContentFiles<ArticleFrontmatter>("enneagram");
    expect(files.length).toBeGreaterThanOrEqual(7);
  });

  it("returns empty array for nonexistent directory", () => {
    const files = getAllContentFiles("nonexistent-dir");
    expect(files).toEqual([]);
  });
});

describe("type content integrity", () => {
  const types = getAllContentFiles<TypeFrontmatter>("types");

  it("all type files have valid frontmatter", () => {
    for (const file of types) {
      expect(file.frontmatter.title).toBeTruthy();
      expect(file.frontmatter.number).toBeGreaterThanOrEqual(1);
      expect(file.frontmatter.number).toBeLessThanOrEqual(9);
      expect(["body", "heart", "head"]).toContain(file.frontmatter.center);
      expect(file.frontmatter.brief.length).toBeGreaterThan(20);
    }
  });

  it("all type files have substantial content (2000+ words)", () => {
    for (const file of types) {
      const wordCount = file.content.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThan(2000);
    }
  });

  it("all type files contain key sections", () => {
    const requiredSections = [
      "At a Glance",
      "Core Motivation",
      "Passion",
      "Three Subtypes",
    ];
    for (const file of types) {
      for (const section of requiredSections) {
        expect(file.content).toContain(section);
      }
    }
  });

  it("type numbers 1-9 are all covered", () => {
    const numbers = types.map((t) => t.frontmatter.number).sort();
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe("lesson content integrity", () => {
  const lessons = getAllContentFiles<LessonFrontmatter>("learn");

  it("all lesson files have valid frontmatter", () => {
    for (const lesson of lessons) {
      expect(lesson.frontmatter.title).toBeTruthy();
      expect(lesson.frontmatter.order).toBeGreaterThanOrEqual(1);
      expect(lesson.frontmatter.description).toBeTruthy();
    }
  });

  it("lesson orders are unique", () => {
    const orders = lessons.map((l) => l.frontmatter.order);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("lessons have non-trivial content", () => {
    for (const lesson of lessons) {
      const wordCount = lesson.content.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThan(100);
    }
  });
});
