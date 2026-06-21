import type { Center } from "@/lib/enneagram/types";

export interface DiscoveryQuestion {
  id: string;
  phase: 1 | 2;
  text: string;
  options: DiscoveryOption[];
}

export interface DiscoveryOption {
  label: string;
  center?: Center;
  typeWeights?: Partial<Record<number, number>>;
}

export const PHASE_1_QUESTIONS: DiscoveryQuestion[] = [
  {
    id: "p1-q1",
    phase: 1,
    text: "When you're under stress, what tends to happen first?",
    options: [
      {
        label: "I feel a surge of frustration or tension in my body — I want to act, fix, or push back.",
        center: "body",
      },
      {
        label: "I feel a wave of emotion — hurt, shame, or a need to connect with someone.",
        center: "heart",
      },
      {
        label: "My mind starts racing — I analyze, worry, or plan my way through it.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q2",
    phase: 1,
    text: "Which question do you find yourself asking most often, even unconsciously?",
    options: [
      {
        label: "\"Is this fair? Is this right?\"",
        center: "body",
      },
      {
        label: "\"Am I valued? Do people see me?\"",
        center: "heart",
      },
      {
        label: "\"Am I safe? What could go wrong?\"",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q3",
    phase: 1,
    text: "How do you typically make important decisions?",
    options: [
      {
        label: "I go with my gut — I have a strong sense of what's right and I trust it.",
        center: "body",
      },
      {
        label: "I consider how the decision affects people and relationships — feelings matter most.",
        center: "heart",
      },
      {
        label: "I research, weigh options, and think it through carefully before committing.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q4",
    phase: 1,
    text: "When someone close to you is struggling, what's your first instinct?",
    options: [
      {
        label: "To do something about it — take action, fix the problem, or protect them.",
        center: "body",
      },
      {
        label: "To feel with them — I attune to their emotions and want them to feel seen.",
        center: "heart",
      },
      {
        label: "To understand what happened — I try to figure out the situation and offer perspective.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q5",
    phase: 1,
    text: "What drains you the most?",
    options: [
      {
        label: "Feeling powerless or out of control — when I can't act on what I know is right.",
        center: "body",
      },
      {
        label: "Feeling invisible or unappreciated — when my efforts go unnoticed.",
        center: "heart",
      },
      {
        label: "Feeling overwhelmed or unprepared — when things feel chaotic and unpredictable.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q6",
    phase: 1,
    text: "In conflict, what tends to happen?",
    options: [
      {
        label: "I hold my ground — I either confront directly or go quiet while tension builds inside.",
        center: "body",
      },
      {
        label: "I focus on the relationship — I worry about how the other person sees me and try to repair the connection.",
        center: "heart",
      },
      {
        label: "I step back to think — I analyze the situation and try to figure out who's right before responding.",
        center: "head",
      },
    ],
  },
];

export const PHASE_2_BODY: DiscoveryQuestion[] = [
  {
    id: "p2-body-q1",
    phase: 2,
    text: "How do you relate to anger?",
    options: [
      {
        label: "I express it directly — people know when I'm upset. I'd rather confront than suppress.",
        typeWeights: { 8: 3 },
      },
      {
        label: "I rarely feel angry. I tend to go along with things and keep the peace.",
        typeWeights: { 9: 3 },
      },
      {
        label: "I feel it as tension and self-criticism. I try to channel it into doing things the right way.",
        typeWeights: { 1: 3 },
      },
    ],
  },
  {
    id: "p2-body-q2",
    phase: 2,
    text: "In a group, what role do you naturally fall into?",
    options: [
      {
        label: "The one who takes charge and makes things happen — I don't wait for permission.",
        typeWeights: { 8: 2 },
      },
      {
        label: "The one who keeps harmony — I see all sides and help people get along.",
        typeWeights: { 9: 2 },
      },
      {
        label: "The one who holds standards — I notice what needs improving and feel responsible for quality.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p2-body-q3",
    phase: 2,
    text: "What feels most uncomfortable to you?",
    options: [
      {
        label: "Showing vulnerability — I'd rather be strong than let people see me struggle.",
        typeWeights: { 8: 2 },
      },
      {
        label: "Asserting myself — I'd rather keep things smooth than rock the boat.",
        typeWeights: { 9: 2 },
      },
      {
        label: "Making mistakes — I hold myself to high standards and hate getting things wrong.",
        typeWeights: { 1: 2 },
      },
    ],
  },
];

export const PHASE_2_HEART: DiscoveryQuestion[] = [
  {
    id: "p2-heart-q1",
    phase: 2,
    text: "How do you seek a sense of value or worth?",
    options: [
      {
        label: "By being helpful and indispensable to others — if people need me, I matter.",
        typeWeights: { 2: 3 },
      },
      {
        label: "By achieving and excelling — I feel valuable when I succeed and others notice.",
        typeWeights: { 3: 3 },
      },
      {
        label: "By being authentic and unique — I need to express something no one else can.",
        typeWeights: { 4: 3 },
      },
    ],
  },
  {
    id: "p2-heart-q2",
    phase: 2,
    text: "When you feel disconnected from others, what happens?",
    options: [
      {
        label: "I reach out more — I give, help, and try to make myself needed.",
        typeWeights: { 2: 2 },
      },
      {
        label: "I double down on work and achievement — I prove my worth through performance.",
        typeWeights: { 3: 2 },
      },
      {
        label: "I withdraw into my inner world — I feel misunderstood and lean into melancholy.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p2-heart-q3",
    phase: 2,
    text: "What's your relationship with attention?",
    options: [
      {
        label: "I often deflect attention from myself — I'd rather focus on others.",
        typeWeights: { 2: 2 },
      },
      {
        label: "I'm comfortable in the spotlight — I know how to present myself well.",
        typeWeights: { 3: 2 },
      },
      {
        label: "I want to be truly seen, but I feel like most people don't understand me.",
        typeWeights: { 4: 2 },
      },
    ],
  },
];

export const PHASE_2_HEAD: DiscoveryQuestion[] = [
  {
    id: "p2-head-q1",
    phase: 2,
    text: "How do you respond to fear or uncertainty?",
    options: [
      {
        label: "I withdraw to think and observe — I need to understand before I can act.",
        typeWeights: { 5: 3 },
      },
      {
        label: "I prepare for the worst — I scan for threats and seek reassurance or challenge the danger.",
        typeWeights: { 6: 3 },
      },
      {
        label: "I reframe and move on — I focus on possibilities and keep things light.",
        typeWeights: { 7: 3 },
      },
    ],
  },
  {
    id: "p2-head-q2",
    phase: 2,
    text: "What do you struggle with most?",
    options: [
      {
        label: "Engaging with the world — I conserve my energy and can feel disconnected from people.",
        typeWeights: { 5: 2 },
      },
      {
        label: "Trusting myself and others — I second-guess decisions and worry about loyalty.",
        typeWeights: { 6: 2 },
      },
      {
        label: "Staying present — I get restless and chase the next exciting thing to avoid discomfort.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p2-head-q3",
    phase: 2,
    text: "How do you relate to knowledge and information?",
    options: [
      {
        label: "I collect it deeply — I want to master one thing rather than skim many.",
        typeWeights: { 5: 2 },
      },
      {
        label: "I use it for safety — I want to know what to expect so I can prepare.",
        typeWeights: { 6: 2 },
      },
      {
        label: "I use it for options — I want to know what's possible so I can stay free.",
        typeWeights: { 7: 2 },
      },
    ],
  },
];

export function getPhase2Questions(center: Center): DiscoveryQuestion[] {
  switch (center) {
    case "body":
      return PHASE_2_BODY;
    case "heart":
      return PHASE_2_HEART;
    case "head":
      return PHASE_2_HEAD;
  }
}
