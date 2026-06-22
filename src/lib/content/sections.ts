import type { ArticleFrontmatter, LessonFrontmatter } from "./mdx";
import { getAllContentFiles } from "./mdx";

export interface SectionTopic {
  slug: string;
  title: string;
  hasTypeAnchors?: boolean;
  hasCenterAnchors?: boolean;
}

export interface SectionConfig {
  label: string;
  basePath: string;
  contentDir: string;
  topics: SectionTopic[];
}

export const SECTIONS: Record<string, SectionConfig> = {
  workplace: {
    label: "Workplace",
    basePath: "/workplace",
    contentDir: "workplace",
    topics: [
      { slug: "type-styles", title: "How Each Type Shows Up", hasTypeAnchors: true },
      { slug: "team-dynamics", title: "Team Dynamics", hasCenterAnchors: true },
      { slug: "managing", title: "Managing Each Type", hasTypeAnchors: true },
      { slug: "conflict", title: "Conflict Resolution", hasCenterAnchors: true },
      { slug: "stress", title: "Stress & Burnout", hasTypeAnchors: true },
      { slug: "exercises", title: "Practice This" },
    ],
  },
  coping: {
    label: "Coping & Solutions",
    basePath: "/coping",
    contentDir: "coping",
    topics: [
      { slug: "controlling", title: "Controlling" },
      { slug: "over-giving", title: "Over-Giving" },
      { slug: "performing", title: "Performing" },
      { slug: "sadness", title: "Sadness" },
      { slug: "withdrawing", title: "Withdrawing" },
      { slug: "anxiety", title: "Anxiety" },
      { slug: "restlessness", title: "Restlessness" },
      { slug: "anger", title: "Anger" },
      { slug: "numbing", title: "Numbing" },
      { slug: "shame", title: "Shame" },
      { slug: "fear", title: "Fear" },
    ],
  },
  growth: {
    label: "Growth Practices",
    basePath: "/growth",
    contentDir: "growth",
    topics: [
      { slug: "core-process", title: "The Core Process" },
      { slug: "by-center", title: "By Center", hasCenterAnchors: true },
      { slug: "by-type", title: "By Type", hasTypeAnchors: true },
      { slug: "weekly-plan", title: "Weekly Plan" },
      { slug: "principles", title: "Key Principles" },
    ],
  },
  learn: {
    label: "Learn",
    basePath: "/learn",
    contentDir: "learn",
    topics: [
      { slug: "what-is-the-enneagram", title: "What Is the Enneagram?" },
      { slug: "the-three-centers", title: "The Three Centers" },
      { slug: "the-nine-types", title: "The Nine Types" },
      { slug: "wings-arrows-growth", title: "Wings & Arrows" },
      { slug: "finding-your-type", title: "Finding Your Type" },
      { slug: "using-it-responsibly", title: "Using It Responsibly" },
      { slug: "going-deeper", title: "Going Deeper" },
    ],
  },
  library: {
    label: "Library",
    basePath: "/library",
    contentDir: "enneagram",
    topics: [
      { slug: "what-is-it", title: "What Is the Enneagram?" },
      { slug: "centers", title: "The Three Centers" },
      { slug: "wings", title: "Wings" },
      { slug: "arrows", title: "Arrows & Growth Paths" },
      { slug: "instincts", title: "The Three Instincts" },
      { slug: "mistyping", title: "Mistyping" },
      { slug: "glossary", title: "Glossary" },
      { slug: "responsible-use", title: "Responsible Use" },
    ],
  },
};

/** Get topics for a section, optionally pulling titles from MDX frontmatter */
export function getSectionTopics(sectionKey: string): SectionTopic[] {
  const section = SECTIONS[sectionKey];
  if (!section) return [];
  return section.topics;
}

/** Find which section a given basePath belongs to */
export function getSectionByPath(basePath: string): SectionConfig | null {
  return Object.values(SECTIONS).find((s) => s.basePath === basePath) ?? null;
}
