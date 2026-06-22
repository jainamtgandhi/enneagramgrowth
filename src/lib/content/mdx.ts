import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface MdxFile<T = Record<string, unknown>> {
  slug: string;
  frontmatter: T;
  content: string;
}

export function getContentFile<T = Record<string, unknown>>(
  directory: string,
  slug: string
): MdxFile<T> | null {
  const filePath = path.join(CONTENT_DIR, directory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as T, content };
}

export function getAllContentFiles<T = Record<string, unknown>>(
  directory: string
): MdxFile<T>[] {
  const dir = path.join(CONTENT_DIR, directory);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as T, content };
    });
}

export interface TypeFrontmatter {
  title: string;
  altName: string;
  number: number;
  center: "body" | "heart" | "head";
  brief: string;
}

export interface LessonFrontmatter {
  title: string;
  order: number;
  description: string;
  relatedSlugs?: string[];
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  order: number;
  relatedSlugs?: string[];
  relatedTypes?: number[];
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Extract H2/H3 headings from raw MDX content (server-side). */
export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\{#[\w-]+\}/, "")
      .replace(/\*\*/g, "")
      .trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}
