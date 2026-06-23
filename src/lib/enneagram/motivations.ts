import type { EnneagramType } from "./types";

export interface TypeMotivation {
  basicFear: string;
  basicDesire: string;
  coreEmotion: string;
  superego: string;
  growthArrow: EnneagramType;
  stressArrow: EnneagramType;
  wing1: EnneagramType;
  wing2: EnneagramType;
}

export const TYPE_MOTIVATIONS: Record<EnneagramType, TypeMotivation> = {
  1: {
    basicFear: "Being corrupt, evil, or defective",
    basicDesire: "To be good, to have integrity",
    coreEmotion: "Anger (suppressed as resentment)",
    superego: "I am good or okay if I do what is right",
    growthArrow: 7,
    stressArrow: 4,
    wing1: 9,
    wing2: 2,
  },
  2: {
    basicFear: "Being unloved, unwanted, unneeded",
    basicDesire: "To be loved and appreciated",
    coreEmotion: "Pride (disguised as humility)",
    superego: "I am good or okay if I am loved by others",
    growthArrow: 4,
    stressArrow: 8,
    wing1: 1,
    wing2: 3,
  },
  3: {
    basicFear: "Being worthless or without value",
    basicDesire: "To be valuable and worthwhile",
    coreEmotion: "Vanity (image-driven self-deception)",
    superego: "I am good or okay if I am successful",
    growthArrow: 6,
    stressArrow: 9,
    wing1: 2,
    wing2: 4,
  },
  4: {
    basicFear: "Having no identity or personal significance",
    basicDesire: "To be uniquely themselves",
    coreEmotion: "Envy (longing for what is missing)",
    superego: "I am good or okay if I am true to myself",
    growthArrow: 1,
    stressArrow: 2,
    wing1: 3,
    wing2: 5,
  },
  5: {
    basicFear: "Being useless, incapable, or overwhelmed",
    basicDesire: "To be competent and capable",
    coreEmotion: "Avarice (withholding of self and resources)",
    superego: "I am good or okay if I have mastered something",
    growthArrow: 8,
    stressArrow: 7,
    wing1: 4,
    wing2: 6,
  },
  6: {
    basicFear: "Being without support or guidance",
    basicDesire: "To have security and support",
    coreEmotion: "Fear (anxiety about what could go wrong)",
    superego: "I am good or okay if I do what is expected of me",
    growthArrow: 9,
    stressArrow: 3,
    wing1: 5,
    wing2: 7,
  },
  7: {
    basicFear: "Being deprived, trapped in pain",
    basicDesire: "To be happy and fulfilled",
    coreEmotion: "Gluttony (insatiable craving for experience)",
    superego: "I am good or okay if I get what I need",
    growthArrow: 5,
    stressArrow: 1,
    wing1: 6,
    wing2: 8,
  },
  8: {
    basicFear: "Being controlled or harmed by others",
    basicDesire: "To protect themselves and be in control",
    coreEmotion: "Lust (intensity and excess)",
    superego: "I am good or okay if I am strong",
    growthArrow: 2,
    stressArrow: 5,
    wing1: 7,
    wing2: 9,
  },
  9: {
    basicFear: "Loss of connection, fragmentation",
    basicDesire: "To have inner stability and peace of mind",
    coreEmotion: "Sloth (self-forgetting and inertia)",
    superego: "I am good or okay if those around me are okay",
    growthArrow: 3,
    stressArrow: 6,
    wing1: 8,
    wing2: 1,
  },
};
