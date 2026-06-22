import "server-only";

import { getAllContentFiles, getContentFile } from "@/lib/content/mdx";
import type {
  TypeFrontmatter,
  LessonFrontmatter,
  ArticleFrontmatter,
} from "@/lib/content/mdx";
import { ALL_TYPES } from "@/lib/enneagram/types";

interface TypeSectionFrontmatter {
  title: string;
  description: string;
}
import type { SearchEntry } from "./types";

// Re-export types so the server can access everything from one import
export type { SearchEntry, SearchResult, SearchResultKind } from "./types";
export { searchContent } from "./types";

// ---------------------------------------------------------------------------
// Markdown stripping (server-only helper)
// ---------------------------------------------------------------------------

/** Strip markdown / MDX syntax so we search against readable text. */
function stripMarkdown(raw: string): string {
  return (
    raw
      // Remove frontmatter (should already be stripped by gray-matter, but be safe)
      .replace(/^---[\s\S]*?---/, "")
      // Remove MDX imports / components
      .replace(/^import\s.*$/gm, "")
      .replace(/<[A-Z][A-Za-z]*[^>]*\/>/g, "")
      .replace(/<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g, "")
      // Remove images
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      // Convert links to just text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      // Remove headings markers
      .replace(/^#{1,6}\s+/gm, "")
      // Remove emphasis markers
      .replace(/(\*{1,3}|_{1,3})(.*?)\1/g, "$2")
      // Remove blockquote markers
      .replace(/^>\s*/gm, "")
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, "")
      // Remove inline code
      .replace(/`([^`]+)`/g, "$1")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove list markers
      .replace(/^[-*+]\s+/gm, "")
      .replace(/^\d+\.\s+/gm, "")
      // Collapse whitespace
      .replace(/\n{2,}/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
  );
}

// ---------------------------------------------------------------------------
// Build the search index (server-only, reads filesystem)
// ---------------------------------------------------------------------------

/**
 * Build the search index from all MDX content files.
 * This function uses `fs` (via getAllContentFiles) and can only be called
 * server-side (at build time or in a Server Component / Route Handler).
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const BODY_LIMIT = 800;

  // 1. Type profiles  ->  /types/{number}
  const types = getAllContentFiles<TypeFrontmatter>("types");
  for (const file of types) {
    const fm = file.frontmatter;
    const body = stripMarkdown(file.content);
    entries.push({
      title: fm.title,
      description: fm.brief,
      url: `/types/${fm.number}`,
      kind: "type",
      body: body.slice(0, BODY_LIMIT),
    });
  }

  // 2. Learn lessons  ->  /learn/{slug}
  const lessons = getAllContentFiles<LessonFrontmatter>("learn");
  for (const file of lessons) {
    const fm = file.frontmatter;
    const body = stripMarkdown(file.content);
    entries.push({
      title: fm.title,
      description: fm.description,
      url: `/learn/${file.slug}`,
      kind: "lesson",
      body: body.slice(0, BODY_LIMIT),
    });
  }

  // 3. Library articles  ->  /library/{slug}
  const articles = getAllContentFiles<ArticleFrontmatter>("enneagram");
  for (const file of articles) {
    const fm = file.frontmatter;
    const body = stripMarkdown(file.content);
    entries.push({
      title: fm.title,
      description: fm.description,
      url: `/library/${file.slug}`,
      kind: "article",
      body: body.slice(0, BODY_LIMIT),
    });
  }

  // 4. Coping topics  ->  /coping/{slug}
  const copingTopics = getAllContentFiles<ArticleFrontmatter>("coping");
  for (const file of copingTopics) {
    const fm = file.frontmatter;
    const body = stripMarkdown(file.content);
    entries.push({
      title: fm.title,
      description: fm.description,
      url: `/coping/${file.slug}`,
      kind: "article",
      body: body.slice(0, BODY_LIMIT),
    });
  }

  // 5. Workplace topics  ->  /workplace/{slug}
  const workplaceTopics = getAllContentFiles<ArticleFrontmatter>("workplace");
  for (const file of workplaceTopics) {
    const fm = file.frontmatter;
    const body = stripMarkdown(file.content);
    entries.push({
      title: fm.title,
      description: fm.description,
      url: `/workplace/${file.slug}`,
      kind: "article",
      body: body.slice(0, BODY_LIMIT),
    });
  }

  // 6. Growth topics  ->  /growth/{slug}
  const growthTopics = getAllContentFiles<ArticleFrontmatter>("growth");
  for (const file of growthTopics) {
    const fm = file.frontmatter;
    const body = stripMarkdown(file.content);
    entries.push({
      title: fm.title,
      description: fm.description,
      url: `/growth/${file.slug}`,
      kind: "article",
      body: body.slice(0, BODY_LIMIT),
    });
  }

  // 7. Type sub-pages  ->  /types/{n}/{section}
  const typeSections = ["childhood", "communication", "famous", "careers", "relationships", "growth-path", "subtypes", "parenting", "leadership", "spiritual"];
  for (const n of ALL_TYPES) {
    for (const section of typeSections) {
      const file = getContentFile<TypeSectionFrontmatter>(`types/type-${n}`, section);
      if (file) {
        const body = stripMarkdown(file.content);
        entries.push({
          title: file.frontmatter.title,
          description: file.frontmatter.description,
          url: `/types/${n}/${section}`,
          kind: "type",
          body: body.slice(0, BODY_LIMIT),
        });
      }
    }
  }

  return entries;
}
