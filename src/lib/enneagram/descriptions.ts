import type { TypeInfo, EnneagramType } from "./types";

export const TYPE_INFO: Record<EnneagramType, TypeInfo> = {
  1: {
    number: 1,
    name: "The Reformer",
    brief:
      "Principled, purposeful, and self-controlled. Driven by the desire to be good and to have integrity.",
    keywords: ["integrity", "improvement", "responsibility", "idealism"],
    color: "#94A3B8",
  },
  2: {
    number: 2,
    name: "The Helper",
    brief:
      "Generous, demonstrative, and people-pleasing. Driven by the desire to be loved and needed.",
    keywords: ["empathy", "generosity", "connection", "warmth"],
    color: "#F43F5E",
  },
  3: {
    number: 3,
    name: "The Achiever",
    brief:
      "Adaptive, excelling, and driven. Motivated by the desire to be valuable and worthwhile.",
    keywords: ["ambition", "efficiency", "image", "success"],
    color: "#EAB308",
  },
  4: {
    number: 4,
    name: "The Individualist",
    brief:
      "Expressive, dramatic, and self-absorbed. Driven by the desire to be unique and authentic.",
    keywords: ["authenticity", "creativity", "depth", "sensitivity"],
    color: "#6366F1",
  },
  5: {
    number: 5,
    name: "The Investigator",
    brief:
      "Perceptive, innovative, and secretive. Driven by the desire to understand and be competent.",
    keywords: ["knowledge", "observation", "independence", "insight"],
    color: "#14B8A6",
  },
  6: {
    number: 6,
    name: "The Loyalist",
    brief:
      "Engaging, responsible, and anxious. Driven by the desire for security and support.",
    keywords: ["loyalty", "courage", "preparedness", "trust"],
    color: "#64748B",
  },
  7: {
    number: 7,
    name: "The Enthusiast",
    brief:
      "Spontaneous, versatile, and scattered. Driven by the desire to be happy and avoid pain.",
    keywords: ["joy", "adventure", "possibility", "freedom"],
    color: "#F97316",
  },
  8: {
    number: 8,
    name: "The Challenger",
    brief:
      "Self-confident, decisive, and confrontational. Driven by the desire to be strong and in control.",
    keywords: ["strength", "justice", "protection", "leadership"],
    color: "#DC2626",
  },
  9: {
    number: 9,
    name: "The Peacemaker",
    brief:
      "Receptive, reassuring, and complacent. Driven by the desire for peace and harmony.",
    keywords: ["harmony", "acceptance", "stability", "mediation"],
    color: "#84CC16",
  },
};

export const ALL_TYPES: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
