import type { QuizItem } from "./types";

export const QUICK_MODE_ITEMS: QuizItem[] = [
  // Type 1 — The Reformer
  { id: "q1_01", text: "I hold myself to high standards and feel frustrated when things are done poorly.", targetType: 1, weight: 1, reverseScored: false },
  { id: "q1_02", text: "I often notice errors and feel compelled to correct them.", targetType: 1, weight: 1, reverseScored: false },
  { id: "q1_03", text: "I believe in doing the right thing, even when it's difficult.", targetType: 1, weight: 1, reverseScored: false },

  // Type 2 — The Helper
  { id: "q2_01", text: "I naturally sense what others need and feel drawn to help them.", targetType: 2, weight: 1, reverseScored: false },
  { id: "q2_02", text: "I feel most valued when I'm making a difference in someone's life.", targetType: 2, weight: 1, reverseScored: false },
  { id: "q2_03", text: "I sometimes put others' needs ahead of my own without realizing it.", targetType: 2, weight: 1, reverseScored: false },

  // Type 3 — The Achiever
  { id: "q3_01", text: "I'm motivated by goals and feel energized when I'm accomplishing things.", targetType: 3, weight: 1, reverseScored: false },
  { id: "q3_02", text: "How I'm perceived by others matters a lot to me.", targetType: 3, weight: 1, reverseScored: false },
  { id: "q3_03", text: "I adapt my behavior to be effective in different situations.", targetType: 3, weight: 1, reverseScored: false },

  // Type 4 — The Individualist
  { id: "q4_01", text: "I feel things deeply and am drawn to expressing my emotions.", targetType: 4, weight: 1, reverseScored: false },
  { id: "q4_02", text: "I often feel different from others and value my uniqueness.", targetType: 4, weight: 1, reverseScored: false },
  { id: "q4_03", text: "I'm drawn to beauty, meaning, and authenticity in life.", targetType: 4, weight: 1, reverseScored: false },

  // Type 5 — The Investigator
  { id: "q5_01", text: "I need time alone to recharge and process my thoughts.", targetType: 5, weight: 1, reverseScored: false },
  { id: "q5_02", text: "I prefer to observe and understand before participating.", targetType: 5, weight: 1, reverseScored: false },
  { id: "q5_03", text: "I value knowledge and competence above most other things.", targetType: 5, weight: 1, reverseScored: false },

  // Type 6 — The Loyalist
  { id: "q6_01", text: "I tend to anticipate problems and prepare for worst-case scenarios.", targetType: 6, weight: 1, reverseScored: false },
  { id: "q6_02", text: "Loyalty and trust are extremely important to me in relationships.", targetType: 6, weight: 1, reverseScored: false },
  { id: "q6_03", text: "I often question authority but also seek guidance from people I trust.", targetType: 6, weight: 1, reverseScored: false },

  // Type 7 — The Enthusiast
  { id: "q7_01", text: "I love new experiences and find it hard to commit to just one thing.", targetType: 7, weight: 1, reverseScored: false },
  { id: "q7_02", text: "I naturally focus on the positive and reframe negative situations.", targetType: 7, weight: 1, reverseScored: false },
  { id: "q7_03", text: "I dislike feeling limited or trapped and seek freedom in my choices.", targetType: 7, weight: 1, reverseScored: false },

  // Type 8 — The Challenger
  { id: "q8_01", text: "I speak my mind directly and don't shy away from confrontation.", targetType: 8, weight: 1, reverseScored: false },
  { id: "q8_02", text: "I have a strong sense of justice and will protect those who are vulnerable.", targetType: 8, weight: 1, reverseScored: false },
  { id: "q8_03", text: "I prefer to be in charge rather than follow someone else's lead.", targetType: 8, weight: 1, reverseScored: false },

  // Type 9 — The Peacemaker
  { id: "q9_01", text: "I avoid conflict and seek harmony in my relationships.", targetType: 9, weight: 1, reverseScored: false },
  { id: "q9_02", text: "I can easily see multiple perspectives and struggle to take sides.", targetType: 9, weight: 1, reverseScored: false },
  { id: "q9_03", text: "I tend to go along with others' wishes to keep the peace.", targetType: 9, weight: 1, reverseScored: false },
];
