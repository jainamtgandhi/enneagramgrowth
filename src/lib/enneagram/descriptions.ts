import type { TypeInfo, EnneagramType } from "./types";

export const TYPE_INFO: Record<EnneagramType, TypeInfo> = {
  1: {
    number: 1,
    name: "The Reformer",
    altName: "The Perfectionist",
    center: "body",
    brief:
      "Principled, purposeful, and self-controlled. Driven by the desire to be good and to live with integrity.",
    keywords: ["integrity", "improvement", "responsibility", "idealism"],
  },
  2: {
    number: 2,
    name: "The Helper",
    altName: "The Giver",
    center: "heart",
    brief:
      "Generous, demonstrative, and people-pleasing. Driven by the desire to be loved and needed.",
    keywords: ["empathy", "generosity", "connection", "warmth"],
  },
  3: {
    number: 3,
    name: "The Achiever",
    altName: "The Performer",
    center: "heart",
    brief:
      "Adaptive, excelling, and image-conscious. Driven by the desire to be valuable and worthwhile.",
    keywords: ["ambition", "efficiency", "image", "success"],
  },
  4: {
    number: 4,
    name: "The Individualist",
    altName: "The Romantic",
    center: "heart",
    brief:
      "Expressive, dramatic, and introspective. Driven by the desire to find identity and significance.",
    keywords: ["authenticity", "creativity", "depth", "sensitivity"],
  },
  5: {
    number: 5,
    name: "The Investigator",
    altName: "The Observer",
    center: "head",
    brief:
      "Intense, cerebral, and perceptive. Driven by the desire to understand the world and protect their inner resources.",
    keywords: ["knowledge", "observation", "independence", "insight"],
  },
  6: {
    number: 6,
    name: "The Loyalist",
    altName: "The Skeptic",
    center: "head",
    brief:
      "Committed, security-oriented, and vigilant. Driven by the desire to have support and guidance.",
    keywords: ["loyalty", "courage", "preparedness", "trust"],
  },
  7: {
    number: 7,
    name: "The Enthusiast",
    altName: "The Epicure",
    center: "head",
    brief:
      "Spontaneous, versatile, and forward-looking. Driven by the desire to be happy and avoid pain.",
    keywords: ["joy", "adventure", "possibility", "freedom"],
  },
  8: {
    number: 8,
    name: "The Challenger",
    altName: "The Boss",
    center: "body",
    brief:
      "Powerful, decisive, and protective. Driven by the desire to be strong and control their environment.",
    keywords: ["strength", "justice", "protection", "leadership"],
  },
  9: {
    number: 9,
    name: "The Peacemaker",
    altName: "The Mediator",
    center: "body",
    brief:
      "Receptive, reassuring, and agreeable. Driven by the desire to maintain inner and outer peace.",
    keywords: ["harmony", "acceptance", "stability", "mediation"],
  },
};

export const ALL_TYPES: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
