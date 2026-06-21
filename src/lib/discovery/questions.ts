import type { Center } from "@/lib/enneagram/types";

export interface DiscoveryQuestion {
  id: string;
  phase: 1 | 2 | 3;
  text: string;
  options: DiscoveryOption[];
}

export interface DiscoveryOption {
  label: string;
  center?: Center;
  typeWeights?: Partial<Record<number, number>>;
}

/* ─── Phase 1: Center Discovery (12 questions) ───────────────────────── */

export const PHASE_1_QUESTIONS: DiscoveryQuestion[] = [
  {
    id: "p1-q1",
    phase: 1,
    text: "When you're under stress, what tends to happen first?",
    options: [
      {
        label:
          "I feel a surge of frustration or tension in my body — I want to act, fix, or push back.",
        center: "body",
      },
      {
        label:
          "I feel a wave of emotion — hurt, shame, or a need to connect with someone.",
        center: "heart",
      },
      {
        label:
          "My mind starts racing — I analyze, worry, or plan my way through it.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q2",
    phase: 1,
    text: "Which question do you find yourself asking most often, even unconsciously?",
    options: [
      { label: '"Is this fair? Is this right?"', center: "body" },
      { label: '"Am I valued? Do people see me?"', center: "heart" },
      { label: '"Am I safe? What could go wrong?"', center: "head" },
    ],
  },
  {
    id: "p1-q3",
    phase: 1,
    text: "How do you typically make important decisions?",
    options: [
      {
        label:
          "I go with my gut — I have a strong sense of what's right and I trust it.",
        center: "body",
      },
      {
        label:
          "I consider how the decision affects people and relationships — feelings matter most.",
        center: "heart",
      },
      {
        label:
          "I research, weigh options, and think it through carefully before committing.",
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
        label:
          "To do something about it — take action, fix the problem, or protect them.",
        center: "body",
      },
      {
        label:
          "To feel with them — I attune to their emotions and want them to feel seen.",
        center: "heart",
      },
      {
        label:
          "To understand what happened — I try to figure out the situation and offer perspective.",
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
        label:
          "Feeling powerless or out of control — when I can't act on what I know is right.",
        center: "body",
      },
      {
        label:
          "Feeling invisible or unappreciated — when my efforts go unnoticed.",
        center: "heart",
      },
      {
        label:
          "Feeling overwhelmed or unprepared — when things feel chaotic and unpredictable.",
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
        label:
          "I hold my ground — I either confront directly or go quiet while tension builds inside.",
        center: "body",
      },
      {
        label:
          "I focus on the relationship — I worry about how the other person sees me and try to repair the connection.",
        center: "heart",
      },
      {
        label:
          "I step back to think — I analyze the situation and try to figure out who's right before responding.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q7",
    phase: 1,
    text: "What are you most likely to lose track of?",
    options: [
      {
        label:
          "My own needs — I'm so focused on what's right or what needs doing that I forget to rest.",
        center: "body",
      },
      {
        label:
          "My own feelings — I'm so tuned into others that I lose sight of what I actually want.",
        center: "heart",
      },
      {
        label:
          "The present moment — I get caught in my head and miss what's happening right in front of me.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q8",
    phase: 1,
    text: "When you walk into a room full of people, what do you notice first?",
    options: [
      {
        label:
          "The energy and power dynamics — who's in charge, who's being overlooked, what feels off.",
        center: "body",
      },
      {
        label:
          "The emotional temperature — who's happy, who's uncomfortable, how people feel about each other.",
        center: "heart",
      },
      {
        label:
          "The setup and situation — I observe, assess, and figure out how things work before engaging.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q9",
    phase: 1,
    text: "When something goes wrong that isn't your fault, what happens inside you?",
    options: [
      {
        label:
          "Irritation or anger — it feels unjust and I want to set things straight.",
        center: "body",
      },
      {
        label:
          "I still feel responsible somehow — I wonder if I could have prevented it or if people blame me.",
        center: "heart",
      },
      {
        label:
          "I try to understand how it happened — I want to know the cause so it doesn't happen again.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q10",
    phase: 1,
    text: "What does your inner world feel like most of the time?",
    options: [
      {
        label:
          "A steady hum of physical energy — sometimes tense, sometimes grounded, but always present in my body.",
        center: "body",
      },
      {
        label:
          "A flow of emotions and impressions — I'm constantly registering feelings, mine and others'.",
        center: "heart",
      },
      {
        label:
          "A stream of thoughts and questions — my mind is always processing, connecting, anticipating.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q11",
    phase: 1,
    text: "When you're at your worst, people close to you would probably say you become:",
    options: [
      {
        label:
          "Controlling, rigid, or confrontational — I push too hard or shut people out.",
        center: "body",
      },
      {
        label:
          "Needy, image-conscious, or dramatic — I get caught up in how things look and feel.",
        center: "heart",
      },
      {
        label:
          "Detached, anxious, or scattered — I retreat into my head and lose connection.",
        center: "head",
      },
    ],
  },
  {
    id: "p1-q12",
    phase: 1,
    text: "What do you secretly wish people understood about you?",
    options: [
      {
        label:
          "That my intensity comes from caring — I push hard because things matter to me deeply.",
        center: "body",
      },
      {
        label:
          "That I'm not as confident as I seem — I work hard to be loved and I need to know it's real.",
        center: "heart",
      },
      {
        label:
          "That I'm not cold or distant — I need space to think, but that doesn't mean I don't care.",
        center: "head",
      },
    ],
  },
];

/* ─── Phase 2: Type Narrowing (9 questions per center) ───────────────── */

export const PHASE_2_BODY: DiscoveryQuestion[] = [
  {
    id: "p2-body-q1",
    phase: 2,
    text: "How do you relate to anger?",
    options: [
      {
        label:
          "I express it directly — people know when I'm upset. I'd rather confront than suppress.",
        typeWeights: { 8: 3 },
      },
      {
        label:
          "I rarely feel angry. I tend to go along with things and keep the peace.",
        typeWeights: { 9: 3 },
      },
      {
        label:
          "I feel it as tension and self-criticism. I try to channel it into doing things the right way.",
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
        label:
          "The one who takes charge and makes things happen — I don't wait for permission.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "The one who keeps harmony — I see all sides and help people get along.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "The one who holds standards — I notice what needs improving and feel responsible for quality.",
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
        label:
          "Showing vulnerability — I'd rather be strong than let people see me struggle.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "Asserting myself — I'd rather keep things smooth than rock the boat.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Making mistakes — I hold myself to high standards and hate getting things wrong.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p2-body-q4",
    phase: 2,
    text: "How do you handle other people's expectations?",
    options: [
      {
        label:
          "I set my own rules. If someone's expectations don't align with mine, I push back.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "I tend to absorb them. I merge with what others want and lose track of my own priorities.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "I try to exceed them. I feel an obligation to meet or surpass every reasonable standard.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p2-body-q5",
    phase: 2,
    text: "When you think about control, which resonates most?",
    options: [
      {
        label:
          "I need control over my environment — I protect myself and the people I care about.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "I avoid control altogether — I don't want to dominate and I don't want to be dominated.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "I need self-control — I hold myself to an internal standard and feel uneasy when I slip.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p2-body-q6",
    phase: 2,
    text: "What happens when someone crosses a boundary?",
    options: [
      {
        label:
          "I confront them immediately and directly. I don't let things slide.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "I minimize it. I tell myself it's not a big deal, even when it is.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "I feel resentful but try to handle it \"correctly\" — I don't want to overreact.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p2-body-q7",
    phase: 2,
    text: "Your deepest fear is probably closest to:",
    options: [
      {
        label:
          "Being controlled or betrayed by others — losing my autonomy or being taken advantage of.",
        typeWeights: { 8: 3 },
      },
      {
        label:
          "Losing connection and inner peace — being separated from the people and harmony I need.",
        typeWeights: { 9: 3 },
      },
      {
        label:
          "Being corrupt or defective — not living up to the moral standard I hold for myself.",
        typeWeights: { 1: 3 },
      },
    ],
  },
  {
    id: "p2-body-q8",
    phase: 2,
    text: "How do you show love to the people closest to you?",
    options: [
      {
        label:
          "By protecting them — I put myself between them and anything that could hurt them.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "By being steady and accepting — I create a calm, comfortable space where they can be themselves.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "By helping them improve — I give honest feedback because I believe in their potential.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p2-body-q9",
    phase: 2,
    text: "What do you avoid feeling?",
    options: [
      {
        label:
          "Weakness. I keep moving and staying strong so I never have to feel small or helpless.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "My own anger. It's uncomfortable to acknowledge, so I numb out or distract myself.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Being wrong. The thought of acting immorally or irresponsibly fills me with dread.",
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
        label:
          "By being helpful and indispensable to others — if people need me, I matter.",
        typeWeights: { 2: 3 },
      },
      {
        label:
          "By achieving and excelling — I feel valuable when I succeed and others notice.",
        typeWeights: { 3: 3 },
      },
      {
        label:
          "By being authentic and unique — I need to express something no one else can.",
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
        label:
          "I reach out more — I give, help, and try to make myself needed.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "I double down on work and achievement — I prove my worth through performance.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I withdraw into my inner world — I feel misunderstood and lean into melancholy.",
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
        label:
          "I often deflect attention from myself — I'd rather focus on others.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "I'm comfortable in the spotlight — I know how to present myself well.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I want to be truly seen, but I feel like most people don't understand me.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p2-heart-q4",
    phase: 2,
    text: "How do you handle failure or falling short?",
    options: [
      {
        label:
          "I shift focus to how I can help others — my value is in being needed, not in winning.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "It stings deeply. I feel like failure reflects on who I am, not just what I did.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I feel it confirms something I already suspected — that something is fundamentally missing in me.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p2-heart-q5",
    phase: 2,
    text: "When you're alone for a long stretch, what tends to happen?",
    options: [
      {
        label:
          "I feel restless — I start thinking about who might need me or how I can be useful.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "I get productive — I plan, organize, and work toward my goals.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I go deep inward — I reflect, create, or sit with emotions that don't have space elsewhere.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p2-heart-q6",
    phase: 2,
    text: "How do you handle compliments?",
    options: [
      {
        label:
          "I deflect them but secretly need them — I want to know I matter to people.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "I take them as confirmation that I'm on the right track — they motivate me.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I'm skeptical — I wonder if the person really sees me or just the surface.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p2-heart-q7",
    phase: 2,
    text: "Your deepest fear is probably closest to:",
    options: [
      {
        label:
          "Being unwanted or unloved — that without my giving, no one would choose me.",
        typeWeights: { 2: 3 },
      },
      {
        label:
          "Being worthless or a failure — that without my achievements, I am nothing.",
        typeWeights: { 3: 3 },
      },
      {
        label:
          "Having no identity or significance — that I'm ordinary, with nothing unique to offer.",
        typeWeights: { 4: 3 },
      },
    ],
  },
  {
    id: "p2-heart-q8",
    phase: 2,
    text: "What makes you feel most alive?",
    options: [
      {
        label:
          "Knowing I made a real difference in someone's life — that I was truly there for them.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "Accomplishing something impressive — the moment of recognition after hard work.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Experiencing deep beauty or emotion — a song, a conversation, a moment that feels completely real.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p2-heart-q9",
    phase: 2,
    text: "What do you avoid feeling?",
    options: [
      {
        label:
          "My own needs. I'm so focused on others that admitting I need something feels selfish.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "My own emptiness. I stay busy and successful so I never have to sit with who I am without doing.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Ordinariness. I'd rather feel pain than feel nothing — being average is worse than being sad.",
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
        label:
          "I withdraw to think and observe — I need to understand before I can act.",
        typeWeights: { 5: 3 },
      },
      {
        label:
          "I prepare for the worst — I scan for threats and seek reassurance or challenge the danger.",
        typeWeights: { 6: 3 },
      },
      {
        label:
          "I reframe and move on — I focus on possibilities and keep things light.",
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
        label:
          "Engaging with the world — I conserve my energy and can feel disconnected from people.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Trusting myself and others — I second-guess decisions and worry about loyalty.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Staying present — I get restless and chase the next exciting thing to avoid discomfort.",
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
        label:
          "I collect it deeply — I want to master one thing rather than skim many.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "I use it for safety — I want to know what to expect so I can prepare.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "I use it for options — I want to know what's possible so I can stay free.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p2-head-q4",
    phase: 2,
    text: "When someone you care about is emotionally overwhelmed, what do you do?",
    options: [
      {
        label:
          "I give them space and stay calm — I offer perspective when they're ready, but I don't merge with their feelings.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "I feel their anxiety alongside them — I worry with them and try to find the practical solution.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "I try to lift the mood — I suggest something fun, remind them it'll pass, or redirect the energy.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p2-head-q5",
    phase: 2,
    text: "How do you relate to authority?",
    options: [
      {
        label:
          "I mostly ignore it — I prefer to figure things out on my own and don't need approval.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "I have a complicated relationship with it — I either seek it out for guidance or push back against it.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "I resist anything that limits my freedom — I don't like being told what to do or pinned down.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p2-head-q6",
    phase: 2,
    text: "What does your ideal weekend look like?",
    options: [
      {
        label:
          "Quiet and solitary — reading, researching, or working on a personal project without interruption.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Structured but relaxed — time with trusted people and a general plan for the day.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Full of possibilities — trying something new, seeing friends, spontaneous adventure.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p2-head-q7",
    phase: 2,
    text: "Your deepest fear is probably closest to:",
    options: [
      {
        label:
          "Being incapable or helpless — not having the knowledge or resources to handle what comes.",
        typeWeights: { 5: 3 },
      },
      {
        label:
          "Being without support or guidance — facing a dangerous world alone without anything to hold onto.",
        typeWeights: { 6: 3 },
      },
      {
        label:
          "Being trapped in pain or deprivation — stuck in a situation with no escape and nothing good ahead.",
        typeWeights: { 7: 3 },
      },
    ],
  },
  {
    id: "p2-head-q8",
    phase: 2,
    text: "What do you need most from your close friends?",
    options: [
      {
        label:
          "Respect for my space and boundaries — I need people who don't demand too much of my energy.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Reliability and loyalty — I need to know I can count on them when things get hard.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Fun and possibility — I need people who are up for anything and keep things exciting.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p2-head-q9",
    phase: 2,
    text: "What do you avoid feeling?",
    options: [
      {
        label:
          "Intrusion. I guard my inner world carefully — too much contact, too many demands, and I shut down.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Uncertainty. The not-knowing is the hardest part — I'd rather have bad news than no news.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Pain and limitation. I keep things light and moving so I never have to sit in darkness for long.",
        typeWeights: { 7: 2 },
      },
    ],
  },
];

/* ─── Phase 3: Depth & Confirmation (9 questions per center) ─────────── */

export const PHASE_3_BODY: DiscoveryQuestion[] = [
  {
    id: "p3-body-q1",
    phase: 3,
    text: "Think back to childhood. Which pattern feels most familiar?",
    options: [
      {
        label:
          "I learned early that the world is harsh, and only the strong survive. I decided I would never be weak.",
        typeWeights: { 8: 3 },
      },
      {
        label:
          "I learned to keep the peace — to not make waves, to be easy, to not ask for too much.",
        typeWeights: { 9: 3 },
      },
      {
        label:
          "I learned that being good meant being right — I internalized a voice that constantly evaluated me.",
        typeWeights: { 1: 3 },
      },
    ],
  },
  {
    id: "p3-body-q2",
    phase: 3,
    text: "When you're with someone you deeply trust, what comes out that surprises people?",
    options: [
      {
        label:
          "Tenderness. Under all the toughness, there's a softness I rarely show.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "Strong opinions. I actually have deep preferences and passions — I just rarely voice them.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Playfulness and silliness. I'm not always serious — but it takes trust for me to let go.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q3",
    phase: 3,
    text: "What does your inner monologue sound like on a typical day?",
    options: [
      {
        label:
          "Strategic — assessing who's trustworthy, what needs handling, where the power lies.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "Quiet — more like background music than a running commentary. Sometimes I'm not sure what I think until someone asks.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Evaluative — a constant commentary on what's right, what's wrong, and what I should be doing better.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q4",
    phase: 3,
    text: "Which shadow behavior do you recognize in yourself?",
    options: [
      {
        label:
          "Intimidation — using my intensity to control situations, even when I don't mean to.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "Passive resistance — agreeing on the surface but quietly digging in or withdrawing.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Moral superiority — believing I'm right and others are lazy, careless, or wrong.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q5",
    phase: 3,
    text: "What triggers shame for you?",
    options: [
      {
        label:
          "Being caught in a moment of vulnerability or weakness — someone seeing me when I'm not in control.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "Being called out for not caring enough or not having an opinion — being seen as irrelevant.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Being caught in a moral lapse — acting in a way that contradicts my own standards.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q6",
    phase: 3,
    text: "In a long-term relationship, what pattern tends to emerge?",
    options: [
      {
        label:
          "I become protective and sometimes controlling — I want to be relied on, but I struggle to rely on others.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "I merge with my partner's preferences and lose myself — then one day I realize I've been going along with everything.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "I become critical — I point out what could be better, and my partner starts to feel they can never be good enough.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q7",
    phase: 3,
    text: "What does growth look like for you?",
    options: [
      {
        label:
          "Letting people in. Showing the soft side. Learning that I don't have to be the strong one every time.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "Waking up to my own desires. Saying what I actually want instead of going along with the group.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "Loosening the grip. Allowing imperfection — in myself and others — without the running commentary.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q8",
    phase: 3,
    text: "When you're exhausted and have nothing left, what happens?",
    options: [
      {
        label:
          "I lash out or isolate. I become blunt and aggressive because I can't hold it back anymore.",
        typeWeights: { 8: 2 },
      },
      {
        label:
          "I shut down completely. I numb out, zone out, and become unreachable.",
        typeWeights: { 9: 2 },
      },
      {
        label:
          "I become moody and self-pitying — suddenly everything feels unfair and no one appreciates me.",
        typeWeights: { 1: 2 },
      },
    ],
  },
  {
    id: "p3-body-q9",
    phase: 3,
    text: "Which statement resonates most deeply?",
    options: [
      {
        label:
          "The world tries to make you small. I refuse to let it. If I don't stand up, who will?",
        typeWeights: { 8: 3 },
      },
      {
        label:
          "I just want everyone to get along. Is it so hard to just be at peace?",
        typeWeights: { 9: 3 },
      },
      {
        label:
          "If I don't hold the line, everything falls apart. Someone has to care about doing things right.",
        typeWeights: { 1: 3 },
      },
    ],
  },
];

export const PHASE_3_HEART: DiscoveryQuestion[] = [
  {
    id: "p3-heart-q1",
    phase: 3,
    text: "Think back to childhood. Which pattern feels most familiar?",
    options: [
      {
        label:
          "I learned that love had to be earned through giving. I became the helpful one to feel like I belonged.",
        typeWeights: { 2: 3 },
      },
      {
        label:
          "I learned that I was valued for what I accomplished. Being good at things meant being loved.",
        typeWeights: { 3: 3 },
      },
      {
        label:
          "I felt fundamentally different from others — like something was missing in me that everyone else had.",
        typeWeights: { 4: 3 },
      },
    ],
  },
  {
    id: "p3-heart-q2",
    phase: 3,
    text: "When you're with someone you deeply trust, what comes out that surprises people?",
    options: [
      {
        label:
          "Frustration and resentment. I finally admit how much I give and how little I feel I receive.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "Vulnerability and confusion. Without the mask of success, I'm not sure who I actually am.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Warmth and humor. I'm lighter than my intensity suggests — when I feel safe, I can be genuinely silly.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q3",
    phase: 3,
    text: "What does your inner monologue sound like on a typical day?",
    options: [
      {
        label:
          "Scanning for needs — who might need help, who seems off today, what I could do to make things better.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "Task-focused — what I need to accomplish, how I'm performing, what impression I'm making.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Emotional — a rich inner narrative comparing how I feel to how everyone else seems to feel.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q4",
    phase: 3,
    text: "Which shadow behavior do you recognize in yourself?",
    options: [
      {
        label:
          "Manipulation through helpfulness — giving in order to create obligation, even if I won't admit it.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "Shape-shifting — becoming whoever the audience wants me to be, losing myself in the process.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Envy and self-sabotage — undermining good things because they don't match the intensity I crave.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q5",
    phase: 3,
    text: "What triggers shame for you?",
    options: [
      {
        label:
          "Being told I'm selfish — the suggestion that my giving has strings attached devastates me.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "Public failure — being seen as incompetent or unsuccessful feels like the ground falling away.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Being called \"too much\" or \"too dramatic\" — it confirms my fear that my feelings make me unlovable.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q6",
    phase: 3,
    text: "In a long-term relationship, what pattern tends to emerge?",
    options: [
      {
        label:
          "I give and give until I'm depleted, then feel hurt that my partner doesn't reciprocate without being asked.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "I focus on us looking good together — shared goals, shared success — and struggle when things get messy or emotional.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I idealize the relationship, then feel let down by reality. I create intensity to test whether the love is real.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q7",
    phase: 3,
    text: "What does growth look like for you?",
    options: [
      {
        label:
          "Asking for what I need directly, instead of giving until someone notices. Letting myself receive.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "Pausing long enough to feel what I feel — not what I should feel, not what looks good, but what's actually there.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "Staying with the ordinary. Finding beauty in what's here instead of longing for what's absent.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q8",
    phase: 3,
    text: "When you're exhausted and have nothing left, what happens?",
    options: [
      {
        label:
          "I become possessive and demanding — I need proof that people value me after everything I've given.",
        typeWeights: { 2: 2 },
      },
      {
        label:
          "I feel like a fraud. The performance drops and I'm terrified of what's underneath.",
        typeWeights: { 3: 2 },
      },
      {
        label:
          "I spiral into despair — everything feels hopeless, and I push people away to see if they'll come back.",
        typeWeights: { 4: 2 },
      },
    ],
  },
  {
    id: "p3-heart-q9",
    phase: 3,
    text: "Which statement resonates most deeply?",
    options: [
      {
        label:
          "I need to be needed. Without that, I'm not sure I have a place in anyone's life.",
        typeWeights: { 2: 3 },
      },
      {
        label:
          "I need to succeed. Without that, I don't know who I am underneath the résumé.",
        typeWeights: { 3: 3 },
      },
      {
        label:
          "I need to feel deeply. Without that, life is just wallpaper — pleasant but meaningless.",
        typeWeights: { 4: 3 },
      },
    ],
  },
];

export const PHASE_3_HEAD: DiscoveryQuestion[] = [
  {
    id: "p3-head-q1",
    phase: 3,
    text: "Think back to childhood. Which pattern feels most familiar?",
    options: [
      {
        label:
          "I learned that the world was intrusive, so I built a rich inner world where I felt safe and competent.",
        typeWeights: { 5: 3 },
      },
      {
        label:
          "I learned that the world was unpredictable, so I became vigilant — always watching for what could go wrong.",
        typeWeights: { 6: 3 },
      },
      {
        label:
          "I learned that pain was avoidable if I stayed positive and kept moving toward the next good thing.",
        typeWeights: { 7: 3 },
      },
    ],
  },
  {
    id: "p3-head-q2",
    phase: 3,
    text: "When you're with someone you deeply trust, what comes out that surprises people?",
    options: [
      {
        label:
          "Deep emotion. I feel more than anyone realizes — I just keep it private.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Courage and decisiveness. When I feel safe, I stop second-guessing and act with real conviction.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Sadness and depth. Underneath all the energy and plans, there's a well of feeling I rarely visit.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q3",
    phase: 3,
    text: "What does your inner monologue sound like on a typical day?",
    options: [
      {
        label:
          "Analytical — categorizing, connecting ideas, observing patterns. Mostly about understanding, not doing.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Questioning — is this right? Can I trust this? What if? What then? A loop of doubt and preparation.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Excited planning — what's next, what's possible, what could be fun. Always moving forward.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q4",
    phase: 3,
    text: "Which shadow behavior do you recognize in yourself?",
    options: [
      {
        label:
          "Withholding — hoarding knowledge, energy, or time. Giving too little of myself to the world.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Suspicion and projection — assuming others have hidden motives, reading threats that aren't there.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Escapism and excess — filling my life with plans, stimulation, and novelty so I never face what's underneath.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q5",
    phase: 3,
    text: "What triggers shame for you?",
    options: [
      {
        label:
          "Being caught without the answer — being seen as ignorant or unprepared.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Being accused of disloyalty or cowardice — the suggestion that I'm not dependable or brave enough.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Being seen as superficial or irresponsible — people dismissing me as someone who can't be serious.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q6",
    phase: 3,
    text: "In a long-term relationship, what pattern tends to emerge?",
    options: [
      {
        label:
          "I need more space than most people can give. I love deeply but struggle when closeness becomes constant.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "I test the relationship — pushing for reassurance, looking for cracks, questioning whether it'll last.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "I'm there for the exciting parts but struggle with the mundane — routine feels like a trap.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q7",
    phase: 3,
    text: "What does growth look like for you?",
    options: [
      {
        label:
          "Engaging with life instead of observing it. Letting people in. Giving my knowledge away instead of hoarding it.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "Trusting myself. Acting without needing to eliminate all doubt first. Learning that courage means acting afraid.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "Sitting still. Being with pain instead of reframing it. Discovering that depth is not the opposite of joy.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q8",
    phase: 3,
    text: "When you're exhausted and have nothing left, what happens?",
    options: [
      {
        label:
          "I disappear. I cut off from everyone and retreat into the smallest, most private version of my life.",
        typeWeights: { 5: 2 },
      },
      {
        label:
          "I become rigid and paranoid. I lash out at the people closest to me and see enemies everywhere.",
        typeWeights: { 6: 2 },
      },
      {
        label:
          "I become impulsive and scattered. I make rash decisions, overspend, or throw myself into something reckless.",
        typeWeights: { 7: 2 },
      },
    ],
  },
  {
    id: "p3-head-q9",
    phase: 3,
    text: "Which statement resonates most deeply?",
    options: [
      {
        label:
          "The world takes more than it gives. I have to be careful with what I have — my energy, my time, my inner life.",
        typeWeights: { 5: 3 },
      },
      {
        label:
          "You can't trust anything at face value. I have to stay alert, question everything, and be ready for what's coming.",
        typeWeights: { 6: 3 },
      },
      {
        label:
          "Life is too short to suffer. There's always another possibility, another experience, another way to look at things.",
        typeWeights: { 7: 3 },
      },
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */

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

export function getPhase3Questions(center: Center): DiscoveryQuestion[] {
  switch (center) {
    case "body":
      return PHASE_3_BODY;
    case "heart":
      return PHASE_3_HEART;
    case "head":
      return PHASE_3_HEAD;
  }
}
