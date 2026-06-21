import type { TypeInfo, EnneagramType } from "./types";

export const TYPE_INFO: Record<EnneagramType, TypeInfo> = {
  1: {
    number: 1,
    name: "The Reformer",
    altName: "The Perfectionist",
    center: "body",
    brief:
      "Principled, purposeful, and self-controlled. Driven by the desire to be good and to have integrity.",
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
      "Adaptive, excelling, and driven. Motivated by the desire to be valuable and worthwhile.",
    keywords: ["ambition", "efficiency", "image", "success"],
  },
  4: {
    number: 4,
    name: "The Individualist",
    altName: "The Romantic",
    center: "heart",
    brief:
      "Expressive, dramatic, and introspective. Driven by the desire to be unique and authentic.",
    keywords: ["authenticity", "creativity", "depth", "sensitivity"],
  },
  5: {
    number: 5,
    name: "The Investigator",
    altName: "The Observer",
    center: "head",
    brief:
      "Perceptive, innovative, and secretive. Driven by the desire to understand and be competent.",
    keywords: ["knowledge", "observation", "independence", "insight"],
  },
  6: {
    number: 6,
    name: "The Loyalist",
    altName: "The Skeptic",
    center: "head",
    brief:
      "Engaging, responsible, and anxious. Driven by the desire for security and support.",
    keywords: ["loyalty", "courage", "preparedness", "trust"],
  },
  7: {
    number: 7,
    name: "The Enthusiast",
    altName: "The Epicure",
    center: "head",
    brief:
      "Spontaneous, versatile, and scattered. Driven by the desire to be happy and avoid pain.",
    keywords: ["joy", "adventure", "possibility", "freedom"],
  },
  8: {
    number: 8,
    name: "The Challenger",
    altName: "The Boss",
    center: "body",
    brief:
      "Self-confident, decisive, and confrontational. Driven by the desire to be strong and in control.",
    keywords: ["strength", "justice", "protection", "leadership"],
  },
  9: {
    number: 9,
    name: "The Peacemaker",
    altName: "The Mediator",
    center: "body",
    brief:
      "Receptive, reassuring, and agreeable. Driven by the desire for peace and harmony.",
    keywords: ["harmony", "acceptance", "stability", "mediation"],
  },
};

export const ALL_TYPES: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
