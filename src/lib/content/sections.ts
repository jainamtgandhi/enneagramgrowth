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
      { slug: "controlling", title: "The Control Trap (1 & 8)" },
      { slug: "over-giving", title: "Over-Giving (2 & 9)" },
      { slug: "performing", title: "The Performance Trap (3)" },
      { slug: "sadness", title: "Persistent Sadness (4)" },
      { slug: "withdrawing", title: "Withdrawal & Isolation (5 & 4)" },
      { slug: "anxiety", title: "Anxiety & Vigilance (6 & 1)" },
      { slug: "restlessness", title: "Restlessness & Avoidance (7)" },
      { slug: "anger", title: "Anger & Resentment (8 & 1)" },
      { slug: "numbing", title: "Going Numb (9)" },
      { slug: "shame", title: "Shame (Heart: 2, 3, 4)" },
      { slug: "fear", title: "Fear & Overthinking (Head: 5, 6, 7)" },
    ],
  },
  growth: {
    label: "Growth Practices",
    basePath: "/growth",
    contentDir: "growth",
    topics: [
      { slug: "core-process", title: "The Core Process" },
      { slug: "by-center", title: "Practices by Center", hasCenterAnchors: true },
      { slug: "by-type", title: "Practices by Type", hasTypeAnchors: true },
      { slug: "weekly-plan", title: "7-Day Practice Plan" },
      { slug: "principles", title: "Key Principles" },
    ],
  },
  learn: {
    label: "Learn the Basics",
    basePath: "/learn",
    contentDir: "learn",
    topics: [
      { slug: "what-is-the-enneagram", title: "What Is the Enneagram?" },
      { slug: "the-three-centers", title: "The Three Centers" },
      { slug: "the-nine-types", title: "The Nine Types" },
      { slug: "wings-arrows-growth", title: "Wings, Arrows & Growth" },
      { slug: "finding-your-type", title: "Finding Your Type" },
      { slug: "using-it-responsibly", title: "Using It Responsibly" },
      { slug: "going-deeper", title: "Resources & Next Steps" },
    ],
  },
  library: {
    label: "Enneagram Library",
    basePath: "/library",
    contentDir: "enneagram",
    topics: [
      { slug: "what-is-it", title: "What Is the Enneagram?" },
      { slug: "centers", title: "The Three Centers" },
      { slug: "wings", title: "Wings" },
      { slug: "arrows", title: "Arrows & Growth Paths" },
      { slug: "instincts", title: "The Three Instincts" },
      { slug: "mistyping", title: "Common Misidentifications" },
      { slug: "glossary", title: "Glossary of Terms" },
      { slug: "responsible-use", title: "Using It Responsibly" },
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
