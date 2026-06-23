import type { EnneagramType } from "./types";

export interface TypeStrengths {
  strengths: string[];
  blindSpots: string[];
}

export const TYPE_STRENGTHS: Record<EnneagramType, TypeStrengths> = {
  1: {
    strengths: [
      "Strong moral compass and integrity",
      "Reliable, responsible, and thorough",
      "Committed to improvement and fairness",
      "Self-disciplined and principled",
    ],
    blindSpots: [
      "Rigid standards that alienate others",
      "Suppressed anger that leaks as resentment",
      "Difficulty accepting imperfection",
      "Self-criticism that extends to everyone",
    ],
  },
  2: {
    strengths: [
      "Deeply empathetic and warm",
      "Generous with time and attention",
      "Skilled at reading emotional needs",
      "Creates strong bonds and community",
    ],
    blindSpots: [
      "Giving to get love in return",
      "Neglecting own needs until burnout",
      "Difficulty accepting help from others",
      "Resentment when generosity goes unnoticed",
    ],
  },
  3: {
    strengths: [
      "Driven, efficient, and goal-oriented",
      "Adaptable and socially skilled",
      "Inspires and motivates teams",
      "Turns vision into results",
    ],
    blindSpots: [
      "Confusing performance with identity",
      "Cutting corners on authenticity",
      "Difficulty sitting with failure or stillness",
      "Emotional disconnection under productivity",
    ],
  },
  4: {
    strengths: [
      "Deeply creative and emotionally honest",
      "Strong aesthetic sense and originality",
      "Comfortable with complexity and depth",
      "Empathetic toward suffering in others",
    ],
    blindSpots: [
      "Envy and longing for what others have",
      "Withdrawing when feeling misunderstood",
      "Romanticizing melancholy over action",
      "Self-absorption that pushes people away",
    ],
  },
  5: {
    strengths: [
      "Intellectually curious and insightful",
      "Independent and self-sufficient",
      "Objective and analytically sharp",
      "Respects boundaries and privacy",
    ],
    blindSpots: [
      "Withdrawing from emotional engagement",
      "Hoarding energy, time, and knowledge",
      "Detaching when connection is needed",
      "Substituting thinking for experiencing",
    ],
  },
  6: {
    strengths: [
      "Loyal, trustworthy, and dependable",
      "Excellent at anticipating problems",
      "Courageous when committed to a cause",
      "Values community and collaboration",
    ],
    blindSpots: [
      "Anxiety spirals and worst-case thinking",
      "Testing loyalty through indirect questions",
      "Difficulty trusting self and others",
      "Paralysis when certainty is unavailable",
    ],
  },
  7: {
    strengths: [
      "Enthusiastic, optimistic, and versatile",
      "Quick-thinking and imaginative",
      "Brings energy and possibility to teams",
      "Resilient and resourceful under pressure",
    ],
    blindSpots: [
      "Avoiding pain through constant stimulation",
      "Starting more than finishing",
      "Reframing problems instead of facing them",
      "Impatience with routine or depth",
    ],
  },
  8: {
    strengths: [
      "Decisive, direct, and protective",
      "Natural leader who takes action",
      "Fiercely loyal to those in their circle",
      "Confronts injustice without hesitation",
    ],
    blindSpots: [
      "Intensity that overwhelms others",
      "Difficulty showing vulnerability",
      "Controlling behavior masked as protection",
      "Blind spot for own impact on people",
    ],
  },
  9: {
    strengths: [
      "Calm, accepting, and easygoing",
      "Sees all perspectives without judgment",
      "Natural mediator and peacemaker",
      "Steady presence that stabilizes teams",
    ],
    blindSpots: [
      "Merging with others' priorities over own",
      "Numbing out to avoid conflict",
      "Passive resistance instead of direct no",
      "Difficulty knowing what they actually want",
    ],
  },
};
