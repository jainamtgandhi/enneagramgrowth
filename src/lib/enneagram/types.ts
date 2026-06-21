export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Center = "body" | "heart" | "head";

export interface CenterInfo {
  name: string;
  label: string;
  types: EnneagramType[];
  theme: string;
}

export interface TypeInfo {
  number: EnneagramType;
  name: string;
  altName: string;
  center: Center;
  brief: string;
  keywords: string[];
}

export const CENTER_INFO: Record<Center, CenterInfo> = {
  body: {
    name: "body",
    label: "Body Center",
    types: [8, 9, 1],
    theme: "Anger and autonomy: how you assert boundaries and move through the world.",
  },
  heart: {
    name: "heart",
    label: "Heart Center",
    types: [2, 3, 4],
    theme: "Shame and identity: how you seek value, connection, and a sense of self.",
  },
  head: {
    name: "head",
    label: "Head Center",
    types: [5, 6, 7],
    theme: "Fear and security: how you seek certainty, safety, and understanding.",
  },
};

export const TYPE_TO_CENTER: Record<EnneagramType, Center> = {
  1: "body",
  2: "heart",
  3: "heart",
  4: "heart",
  5: "head",
  6: "head",
  7: "head",
  8: "body",
  9: "body",
};

export const ALL_TYPES: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
