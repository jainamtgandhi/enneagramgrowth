import type { EnneagramType } from "./types";

export interface TypePairRelationship {
  type1: EnneagramType;
  type2: EnneagramType;
  title: string;
  overview: string;
  strengths: string[];
  challenges: string[];
  tipForType1: string;
  tipForType2: string;
  keyInsight: string;
}

function pair(
  type1: EnneagramType,
  type2: EnneagramType,
  title: string,
  overview: string,
  strengths: string[],
  challenges: string[],
  tipForType1: string,
  tipForType2: string,
  keyInsight: string
): TypePairRelationship {
  return { type1, type2, title, overview, strengths, challenges, tipForType1, tipForType2, keyInsight };
}

export const TYPE_PAIR_RELATIONSHIPS: TypePairRelationship[] = [
  // ── Type 1 pairs ──────────────────────────────────────────────
  pair(1, 1, "The Reformer & The Reformer",
    "Two Ones share a deep commitment to integrity, fairness, and doing things right. They understand each other's inner critic without explanation. The risk is that two perfectionists can create an atmosphere of relentless self-improvement where neither feels permission to simply be.",
    [
      "Shared moral compass and commitment to quality",
      "Deep mutual respect for each other's principles",
      "Both follow through on commitments reliably",
      "Shared desire to improve the world around them",
    ],
    [
      "Double inner critic can make the home feel like an audit",
      "Both suppress anger, leading to silent resentment buildup",
      "Difficulty relaxing together; rest feels like irresponsibility",
      "Competing standards when their 'right way' differs",
    ],
    "Practice saying 'good enough' out loud. Your partner's inner critic is already loud, so don't become a second one.",
    "Let some things be imperfect on purpose. Model the grace you both need but rarely give yourselves.",
    "Two Ones thrive when they become allies against perfectionism rather than enforcers of it."
  ),

  pair(1, 2, "The Reformer & The Helper",
    "Ones and Twos share a desire to be good and to serve others, but they approach it differently. Ones focus on principles and correctness; Twos focus on people and emotional connection. Together they can build something purposeful and warm, or clash when the One's criticism meets the Two's need for appreciation.",
    [
      "Shared commitment to making things better for others",
      "The Two softens the One's rigidity with warmth and empathy",
      "The One gives the Two structure and principled direction",
      "Both are hardworking and responsible in commitments",
    ],
    [
      "Ones critique to improve; Twos hear criticism as rejection",
      "Twos want emotional validation; Ones express love through action, not words",
      "The Two may feel the One cares more about being right than being kind",
      "The One may feel the Two is manipulating through helpfulness",
    ],
    "Lead with appreciation before correction. Your Two needs to hear what they're doing right before they can hear what could be better.",
    "Don't take the One's feedback personally. Their desire to improve things is how they show they care; it's not a statement about your worth.",
    "This pair works beautifully when the One learns to praise and the Two learns to receive honest feedback as love."
  ),

  pair(1, 3, "The Reformer & The Achiever",
    "Ones and Threes are both driven, disciplined, and hardworking. They share a commitment to excellence but define it differently: Ones measure quality by internal standards, Threes measure success by external recognition. Together they're a powerhouse, or a pressure cooker.",
    [
      "Both are goal-oriented and get things done efficiently",
      "The Three brings energy, optimism, and social polish",
      "The One brings depth, integrity, and quality control",
      "Mutual respect for competence and work ethic",
    ],
    [
      "Ones value substance; Threes value image, and this creates friction",
      "The One may see the Three as superficial or corner-cutting",
      "The Three may see the One as rigid, slow, and overly critical",
      "Both avoid vulnerability: the One hides behind principles, the Three behind achievements",
    ],
    "Appreciate the Three's ability to adapt and succeed without seeing it as compromising. Flexibility isn't the same as dishonesty.",
    "Show the One you care about quality, not just results. Slow down enough to do things thoroughly, and they'll notice and respect you for it.",
    "This pair thrives when the One trusts the Three's adaptability and the Three respects the One's depth."
  ),

  pair(1, 4, "The Reformer & The Individualist",
    "An unlikely but powerful pairing. Ones bring structure, clarity, and principled action. Fours bring emotional depth, creativity, and authenticity. Each has what the other lacks, but the gap can also feel like a chasm when the One wants solutions and the Four wants to be felt.",
    [
      "The Four helps the One access buried emotions and creativity",
      "The One helps the Four ground intense feelings into practical action",
      "Both value authenticity and dislike pretense",
      "Shared idealism, as both believe things should be better than they are",
    ],
    [
      "The One's fix-it instinct collides with the Four's need to sit with feelings",
      "Fours may find Ones emotionally unavailable or dismissive",
      "Ones may find Fours self-absorbed or impractical",
      "Different relationships with emotion: Ones suppress, Fours amplify",
    ],
    "When the Four is emotional, resist the urge to problem-solve. Sometimes 'I see you' is more helpful than 'Here's what to do.'",
    "Appreciate the One's steadiness as a form of love. They show care through action and reliability, not always through emotional expression.",
    "This pair transforms when the One learns to feel and the Four learns to act."
  ),

  pair(1, 5, "The Reformer & The Investigator",
    "Both are serious, principled, and value competence. Ones operate from moral conviction; Fives operate from intellectual clarity. They share a love of getting things right and can build a relationship of quiet mutual respect, or one of cold parallel lives if neither bridges the emotional gap.",
    [
      "Deep mutual respect for competence and thoroughness",
      "Both value independence and personal space",
      "The Five's objectivity balances the One's moral intensity",
      "The One's decisiveness complements the Five's analytical nature",
    ],
    [
      "Both can be emotionally withholding; someone needs to go first",
      "The One wants engagement and action; the Five wants space and time",
      "Disagreements become intellectual debates where neither yields",
      "Risk of living side-by-side without real emotional intimacy",
    ],
    "Give the Five time to process before expecting a response. Pressing for immediate answers triggers their withdrawal reflex.",
    "Share your inner world voluntarily. The One won't pry, so if you don't offer, they'll assume you don't want connection.",
    "This pair's growth edge is emotional vulnerability: the thing neither finds natural."
  ),

  pair(1, 6, "The Reformer & The Loyalist",
    "Both are responsible, dutiful, and take their commitments seriously. They're the pair most likely to show up on time, follow through, and build a life that works. The risk is that their shared seriousness becomes a cage: all duty, no delight.",
    [
      "Rock-solid reliability: both follow through on promises",
      "Shared values around responsibility and doing the right thing",
      "The Six's loyalty meets the One's integrity for deep trust",
      "Both are thoughtful decision-makers who consider consequences",
    ],
    [
      "Double anxiety: the One worries about doing it wrong, the Six worries about what could go wrong",
      "The One's certainty can feel dismissive of the Six's doubt",
      "The Six's questioning can feel like distrust to the One",
      "Both struggle to relax and enjoy the present moment",
    ],
    "When the Six raises concerns, don't dismiss them as irrational. Their radar catches things you miss. Listen, then help them sort signal from noise.",
    "Trust the One's consistency. They say what they mean, so you don't need to read between lines or test their loyalty.",
    "This pair flourishes when they balance their shared responsibility with intentional play and lightness."
  ),

  pair(1, 7, "The Reformer & The Enthusiast",
    "Opposites on the Enneagram, and growth arrows for each other. The One brings discipline, depth, and follow-through. The Seven brings spontaneity, optimism, and joy. This pair has extraordinary potential if they let each other's strengths rub off rather than treating differences as flaws.",
    [
      "The Seven loosens the One up; the One grounds the Seven",
      "Connected by growth arrows, each embodies what the other needs to develop",
      "The Seven brings adventure and lightness to the One's serious world",
      "The One brings depth and completion to the Seven's scattered plans",
    ],
    [
      "The One sees the Seven as irresponsible and undisciplined",
      "The Seven sees the One as rigid, judgmental, and no fun",
      "Different coping: One controls harder under stress, Seven escapes",
      "The Seven's avoidance of pain frustrates the One's desire to address problems head-on",
    ],
    "The Seven isn't being irresponsible; they're managing anxiety through optimism. Learn from their lightness instead of trying to correct it.",
    "The One isn't trying to ruin your fun; they want things to work well. Show them you can follow through, and they'll trust your spontaneity.",
    "This is the pair where growth arrows come alive: the One learns joy, the Seven learns depth."
  ),

  pair(1, 8, "The Reformer & The Challenger",
    "Two strong-willed Body Center types who care deeply about justice. Both are willing to fight for what's right, but they fight differently. Ones channel anger through moral reasoning; Eights express it directly. Together they're a force for change, or an immovable standoff.",
    [
      "Shared passion for justice and making things right",
      "Both are action-oriented and willing to take on difficult things",
      "The Eight's directness cuts through the One's over-thinking",
      "The One's principles give the Eight's power moral direction",
    ],
    [
      "Power struggles over who's right, as both are certain",
      "The One judges the Eight's intensity as excessive; the Eight finds the One self-righteous",
      "Different anger styles: cold resentment (One) vs. hot confrontation (Eight)",
      "Neither backs down easily; conflicts can become entrenched",
    ],
    "The Eight isn't reckless; they're decisive. Not every action needs moral justification before it's taken.",
    "The One isn't weak for wanting to think things through. Their restraint takes more strength than you realize.",
    "This pair is powerful when the One provides moral clarity and the Eight provides the force to act on it."
  ),

  pair(1, 9, "The Reformer & The Peacemaker",
    "Connected by a growth arrow, these two share more than they initially seem to. Ones push forward with principled action; Nines hold space with patient acceptance. The One needs the Nine's ability to let go; the Nine needs the One's ability to take a stand.",
    [
      "The Nine's calm acceptance balances the One's inner tension",
      "The One helps the Nine find their voice and take action",
      "Both value harmony and want to do the right thing",
      "The Nine's patience creates safety for the One to soften",
    ],
    [
      "The One's criticism is the thing the Nine fears most: being told they're not enough",
      "The Nine's passivity frustrates the One's desire for improvement",
      "The One may become the 'parent' while the Nine becomes the 'child'",
      "Conflict avoidance on both sides: One converts anger to righteousness, Nine goes numb",
    ],
    "Your Nine isn't lazy; they're overwhelmed by the pressure to meet standards. Lower the volume on your suggestions and they'll show up more.",
    "Your One's criticism comes from caring, not contempt. Express your own opinions more; they actually want to hear them.",
    "Growth happens when the One learns the Nine's acceptance and the Nine learns the One's clarity."
  ),

  // ── Type 2 pairs ──────────────────────────────────────────────
  pair(2, 2, "The Helper & The Helper",
    "Two Twos create an intensely warm, emotionally attuned relationship. Both lead with generosity and care. The danger is a silent competition over who's giving more, and a shared inability to receive or ask for what they need.",
    [
      "Extraordinary warmth, generosity, and emotional availability",
      "Both instinctively know how to make the other feel cared for",
      "Shared language of love through service and attentiveness",
      "Deep empathy and emotional understanding",
    ],
    [
      "Neither asks for help; both wait for the other to notice what they need",
      "Unspoken score-keeping: 'I do so much, and you don't even see it'",
      "Both repress their own needs, creating hidden resentment",
      "Over-focusing on the relationship can crowd out individual identity",
    ],
    "Practice asking for what you need directly. Don't wait for your partner to read your mind; that's your move, not theirs.",
    "Say 'I need help with this' out loud at least once a week. Model the receiving you both need to learn.",
    "Two Twos grow when they stop competing to be the more selfless one and learn to receive as gracefully as they give."
  ),

  pair(2, 3, "The Helper & The Achiever",
    "One of the most interpersonally magnetic pairings. Twos bring warmth and emotional attunement; Threes bring energy and ambition. They make each other look and feel good. The risk is that everything stays on the surface, both performing their roles without showing who they really are underneath.",
    [
      "High social energy; they light up every room together",
      "The Two makes the Three feel loved beyond their achievements",
      "The Three gives the Two someone to champion and be proud of",
      "Both are adaptable and attuned to what others need",
    ],
    [
      "Both shape-shift for approval, so who's being real?",
      "The Two may feel used for support while the Three gets the spotlight",
      "The Three may feel smothered by the Two's emotional needs",
      "When hurt, the Two guilts and the Three withdraws, and neither addresses the real issue",
    ],
    "Let the Three succeed without making it about you. Their achievements aren't a reflection of your worth.",
    "Show the Two they matter to you beyond what they do for you. 'I love who you are' hits harder than 'Thanks for your help.'",
    "This pair shines when both stop performing and let each other see the unpolished, real person underneath."
  ),

  pair(2, 4, "The Helper & The Individualist",
    "Both are Heart Center types deeply concerned with identity, love, and emotional connection. Twos express emotion outward through care; Fours turn it inward for self-understanding. Together they create extraordinary emotional depth, or an exhausting cycle of 'give me attention / give me space.'",
    [
      "Deep emotional conversations and genuine heart connection",
      "Both value authenticity and resist superficial relationships",
      "The Two brings warmth and practical care to the Four's inner world",
      "The Four helps the Two connect with their own emotions, not just others'",
    ],
    [
      "The Two's relentless helpfulness can feel smothering to the Four",
      "The Four's emotional withdrawal feels like rejection to the Two",
      "Both can become dramatic when unmet needs surface",
      "The Two gives to get; the Four pulls away to feel, and these patterns collide",
    ],
    "The Four's withdrawal isn't rejection; it's how they process. Give space without taking it personally.",
    "The Two's helpfulness isn't control; it's their love language. Receive it gracefully, even when you'd rather be alone.",
    "This pair heals when the Two learns to need and the Four learns to give."
  ),

  pair(2, 5, "The Helper & The Investigator",
    "Perhaps the most challenging pairing in terms of fundamental needs. Twos move toward people; Fives move away. Twos crave emotional connection; Fives crave solitude. Yet this very tension holds enormous growth potential, as each has exactly what the other needs to develop.",
    [
      "The Five teaches the Two the value of boundaries and self-sufficiency",
      "The Two teaches the Five the value of emotional connection and vulnerability",
      "When it works, they create a relationship with both depth and warmth",
      "The Five's steadiness provides a calm anchor for the Two's emotional waves",
    ],
    [
      "The Two's pursuit feels invasive to the Five's need for privacy",
      "The Five's withdrawal feels like abandonment to the Two",
      "Fundamentally different energy needs: together vs. alone",
      "The Two expresses love through closeness; the Five through independence",
    ],
    "Respect the Five's need for solitude without interpreting it as rejection. Schedule connection so neither has to chase or flee.",
    "Initiate contact and share feelings before the Two has to ask. Small, voluntary gestures mean more to them than grand ones extracted under pressure.",
    "This pair's superpower is balance, if the Two can learn space and the Five can learn closeness."
  ),

  pair(2, 6, "The Helper & The Loyalist",
    "Both are deeply loyal and relationship-focused. They share a commitment to being there for the people they love, though for different reasons: the Two to be needed, the Six to be safe. Together they can create a profoundly stable and caring bond.",
    [
      "Exceptional loyalty: both show up consistently for the people they love",
      "Shared value of commitment and reliability in relationships",
      "The Two provides emotional warmth that helps the Six feel secure",
      "The Six provides steadfast loyalty that the Two deeply needs to feel",
    ],
    [
      "Both can be anxious and reactive when they feel the relationship is threatened",
      "The Two may feel hurt when the Six questions their motives",
      "The Six may feel manipulated by the Two's helpfulness",
      "When stressed, the Two becomes possessive and the Six becomes suspicious",
    ],
    "Don't take the Six's questioning as distrust. They test everyone; it's actually a sign they care enough to verify.",
    "Reassure the Two through specifics, not generalities. 'I appreciate you' is nice; 'I noticed you did X and it meant a lot' is better.",
    "This pair builds deep trust when the Two stops managing and the Six stops testing."
  ),

  pair(2, 7, "The Helper & The Enthusiast",
    "A high-energy, socially vibrant pair. Both are optimistic, people-oriented, and move toward others, but for different reasons. The Two seeks connection through helping; the Seven seeks stimulation through experience. Together they light up the room, but may avoid the deeper, harder emotional work.",
    [
      "Fun, energetic, and socially engaging as a couple",
      "Both are generous and enjoy making others happy",
      "The Seven brings adventure and spontaneity to the Two's caring nature",
      "The Two brings emotional grounding to the Seven's restless energy",
    ],
    [
      "Both avoid pain: the Two by focusing on others, the Seven by reframing or escaping",
      "The Two wants depth; the Seven wants breadth",
      "The Seven may feel trapped by the Two's emotional intensity",
      "The Two may feel abandoned when the Seven chases the next experience",
    ],
    "Let the Seven have adventures without guilt-tripping them about time together. They come back more present when they don't feel caged.",
    "Slow down enough to sit with the Two's emotions. You don't have to fix or reframe everything; sometimes just being present is the adventure they need.",
    "This pair grows when they learn to have fun AND go deep, not one at the expense of the other."
  ),

  pair(2, 8, "The Helper & The Challenger",
    "A surprising but powerful pairing. The Two's warmth meets the Eight's strength. Both are big-hearted and protective of the people they love. The Two does it through care; the Eight does it through power. Together they create a safe haven, or a control battle.",
    [
      "Both are protective and will fight for the people they love",
      "The Eight gives the Two permission to be strong and assert their needs",
      "The Two shows the Eight that vulnerability isn't weakness",
      "Intense, passionate connection with deep loyalty on both sides",
    ],
    [
      "Both want to be in charge of the relationship's emotional climate",
      "The Two may feel bulldozed by the Eight's intensity",
      "The Eight may feel manipulated by the Two's indirect approach",
      "When threatened, the Two guilts and the Eight dominates, creating escalation risk",
    ],
    "Be direct. The Eight respects honesty more than hints. Say what you need instead of hoping they'll figure it out.",
    "Soften your delivery without softening your message. The Two can handle truth; they can't handle being steamrolled.",
    "This pair is magnificent when the Two learns directness and the Eight learns tenderness."
  ),

  pair(2, 9, "The Helper & The Peacemaker",
    "One of the warmest, most accommodating pairings. Both are gentle, relationship-focused, and prioritize others' needs. The danger is that neither asserts their own needs, creating a pleasant surface over a growing well of unspoken frustrations.",
    [
      "Naturally warm, easy-going, and deeply caring toward each other",
      "Both are excellent listeners and create safe emotional space",
      "The Two brings energy and initiative to the Nine's calm stability",
      "The Nine's unconditional acceptance is balm for the Two's need to earn love",
    ],
    [
      "Neither states their needs; both expect the other to notice",
      "The Two becomes resentful from over-giving; the Nine becomes numb from over-accommodating",
      "Decision-making paralysis: 'Whatever you want' becomes a frustrating loop",
      "The Two may unknowingly dominate while the Nine passively withdraws",
    ],
    "Don't mistake the Nine's compliance for happiness. Ask what they want, then wait long enough for a real answer.",
    "Share your preferences even when you don't feel strongly. The Two needs you to have opinions so they're not always guessing.",
    "This gentle pair grows when both learn the radical act of saying 'I want.'"
  ),

  // ── Type 3 pairs ──────────────────────────────────────────────
  pair(3, 3, "The Achiever & The Achiever",
    "Two Threes are a high-performance couple: ambitious, polished, and impressively capable. They understand each other's drive without explanation. The risk is that life becomes a shared performance where neither shows the anxious, imperfect person behind the achievements.",
    [
      "Shared ambition creates a dynamic, forward-moving partnership",
      "Both understand the drive to succeed without needing to explain it",
      "Efficient and effective as a team; they get things done",
      "Mutual admiration for each other's competence and social grace",
    ],
    [
      "Competition can creep in: whose career matters more?",
      "Both avoid failure and vulnerability, so real intimacy stays shallow",
      "Image management doubles: they may project a 'perfect couple' facade",
      "When both are stressed, there's no one to slow down the machine",
    ],
    "Be the first to show imperfection. Your partner is waiting for permission to be human too.",
    "Celebrate being, not just doing. Schedule time with no agenda, no productivity, just existing together.",
    "Two Threes transform when they compete less with each other and more against the shared enemy of inauthenticity."
  ),

  pair(3, 4, "The Achiever & The Individualist",
    "Heart Center neighbors with very different strategies. The Three pursues value through achievement; the Four pursues value through emotional authenticity. The Three brings polish and drive; the Four brings depth and meaning. Each can feel the other is missing the point entirely.",
    [
      "The Four gives the Three emotional depth and authenticity",
      "The Three gives the Four structure and outward confidence",
      "Both care about standing out, just in different arenas",
      "Together they can create something both beautiful and successful",
    ],
    [
      "The Three's focus on image feels hollow to the Four",
      "The Four's emotional intensity feels unproductive to the Three",
      "The Three moves on quickly from feelings; the Four lingers in them",
      "The Four may feel unseen; the Three may feel unappreciated",
    ],
    "Stop and feel. The Four doesn't need you to fix their sadness or reframe it; they need you to sit in it with them.",
    "Appreciate the Three's efficiency as a gift, not a flaw. Not everything needs to be processed through emotion to be meaningful.",
    "This pair bridges the gap between achievement and authenticity, the very thing both types need."
  ),

  pair(3, 5, "The Achiever & The Investigator",
    "The Three brings social energy and ambition; the Five brings intellectual depth and independence. Both are competent and self-sufficient. Together they can build something impressively effective, or live in parallel universes of action and thought.",
    [
      "Mutual respect for competence and expertise",
      "The Three's energy motivates the Five to engage with the world",
      "The Five's depth gives the Three substance beyond performance",
      "Both value efficiency and dislike wasted time",
    ],
    [
      "The Three wants to be seen; the Five wants to be left alone",
      "The Three may find the Five withholding and emotionally unavailable",
      "The Five may find the Three superficial and performative",
      "Neither naturally initiates vulnerable emotional conversations",
    ],
    "Respect the Five's need for solitude without interpreting it as disinterest. They re-engage more when they don't feel drained.",
    "Offer your thoughts and presence voluntarily. The Three can't celebrate what they don't see, so share your inner world.",
    "This pair excels when the Three learns depth and the Five learns visibility."
  ),

  pair(3, 6, "The Achiever & The Loyalist",
    "The Three brings confidence and forward momentum; the Six brings caution and loyalty. The Three reassures the Six that things will work out; the Six helps the Three think through risks. Together they balance optimism with realism.",
    [
      "The Three's confidence helps the Six feel secure and optimistic",
      "The Six's loyalty provides a steady foundation the Three can count on",
      "Complementary strengths: vision (Three) + risk assessment (Six)",
      "Both are hardworking and take their commitments seriously",
    ],
    [
      "The Three's pace can feel reckless to the cautious Six",
      "The Six's doubt can feel like a wet blanket on the Three's enthusiasm",
      "Under stress, the Three deceives (even themselves) and the Six suspects, creating a toxic cycle",
      "The Three avoids failure; the Six anticipates it, with different anxieties but the same avoidance",
    ],
    "Take the Six's concerns seriously instead of dismissing them with optimism. They're not being negative; they're being thorough.",
    "Trust the Three's track record. They've been successful before, and your anxiety about outcomes doesn't mean they'll fail.",
    "This pair thrives when confidence and caution are treated as complementary strengths, not opposing forces."
  ),

  pair(3, 7, "The Achiever & The Enthusiast",
    "A high-energy, optimistic, and forward-looking pair. Both are driven, social, and oriented toward the positive. They can accomplish remarkable things together, but may never slow down enough to process the emotions underneath all that activity.",
    [
      "Infectious energy and enthusiasm as a couple",
      "Both are adaptable, resourceful, and good at networking",
      "Shared optimism and future orientation keep the relationship dynamic",
      "They motivate each other to dream bigger and act bolder",
    ],
    [
      "Both reframe negative emotions instead of processing them",
      "The relationship can become all activity and no depth",
      "The Three wants focused achievement; the Seven wants variety, causing conflict over priorities",
      "When pain comes (loss, failure, grief), neither knows how to sit still with it",
    ],
    "Let the Seven explore without needing every adventure to be goal-oriented. Not everything has to be productive to be valuable.",
    "Finish things. The Three respects follow-through, so show them you can commit to a plan, not just start one.",
    "This pair transforms when they learn to be as good at being still as they are at being in motion."
  ),

  pair(3, 8, "The Achiever & The Challenger",
    "Two assertive, goal-oriented powerhouses. The Three achieves through adaptation and charm; the Eight achieves through force and directness. Both respect strength, but they define it differently.",
    [
      "Dynamic, action-oriented partnership that gets results",
      "Mutual respect for ambition and competence",
      "The Eight's directness grounds the Three's tendency to shape-shift",
      "The Three's social intelligence complements the Eight's raw power",
    ],
    [
      "Power struggles: who leads, who follows?",
      "The Eight sees the Three's adaptability as weakness or dishonesty",
      "The Three may feel the Eight's bluntness damages their carefully built image",
      "Both want to be in charge; compromise feels like losing",
    ],
    "Be more direct with the Eight. They don't trust charm; they trust honesty. Drop the performance and say what you really think.",
    "Appreciate the Three's social intelligence. Their adaptability isn't weakness; it's a different kind of power.",
    "This pair is formidable when they stop competing for dominance and start complementing each other's strengths."
  ),

  pair(3, 9, "The Achiever & The Peacemaker",
    "The Three brings drive and ambition; the Nine brings acceptance and calm. The Three motivates the Nine to engage with life; the Nine reminds the Three that they're valuable beyond what they accomplish. A naturally complementary pair, if the Three doesn't steamroll the Nine's voice.",
    [
      "The Nine's unconditional acceptance is deeply healing for the Three",
      "The Three inspires the Nine to set goals and pursue their potential",
      "Complementary energies: ambition balanced by peace",
      "Both are adaptable and can create a smooth-running household",
    ],
    [
      "The Three may unconsciously take over decision-making",
      "The Nine's passivity frustrates the Three's desire for a partner, not a passenger",
      "The Nine may lose themselves in the Three's agenda and goals",
      "The Three's pace can overwhelm the Nine into numbing out",
    ],
    "Slow down and create space for the Nine's voice. Ask their opinion, then wait. Silence isn't agreement, it's processing.",
    "Share your goals and opinions proactively. The Three needs you to show up as a full person, not just a supportive presence.",
    "This pair grows when the Three learns to be without doing and the Nine learns to do without losing themselves."
  ),

  // ── Type 4 pairs ──────────────────────────────────────────────
  pair(4, 4, "The Individualist & The Individualist",
    "Two Fours create a relationship of extraordinary emotional depth and creative resonance. They understand each other's inner world in ways few others can. The risk is a shared emotional intensity that amplifies highs and lows, without anyone to ground the ship.",
    [
      "Unparalleled emotional understanding and empathy",
      "Shared creative sensibility and appreciation for beauty",
      "Both value authenticity and refuse shallow connection",
      "Deep, meaningful conversations that go where others can't",
    ],
    [
      "Emotional amplification: sadness feeds sadness, intensity feeds intensity",
      "Both feel misunderstood, even by each other, creating frustration",
      "Competition over who feels more deeply or suffers more",
      "No natural stabilizer; both ride the emotional waves without anchor",
    ],
    "Resist the pull to match your partner's emotional intensity. One of you being steady is a gift, not a betrayal of connection.",
    "Celebrate ordinary moments. Not every experience needs to be profound; sometimes 'fine' is actually fine.",
    "Two Fours thrive when they use their shared depth to build, not just to feel."
  ),

  pair(4, 5, "The Individualist & The Investigator",
    "Both are withdrawn types who value their inner world above social performance. The Four processes through emotion; the Five processes through intellect. Together they create a private, rich relationship, or two isolated people sharing a roof.",
    [
      "Both value privacy, depth, and independence",
      "The Four brings emotional richness; the Five brings intellectual richness",
      "Neither demands the other be socially active or performative",
      "Shared appreciation for complexity and nuance",
    ],
    [
      "The Four craves emotional connection; the Five needs emotional distance",
      "The Four may feel the Five is cold and detached",
      "The Five may feel the Four's emotional demands are overwhelming",
      "Both withdraw under stress, and the relationship can become isolating",
    ],
    "The Five's emotional distance isn't a judgment of you. They process internally, so give them time and they'll share their inner world.",
    "Show emotion, even small amounts. The Four needs some emotional signal to feel connected; they can't read detachment as love.",
    "This pair creates a beautifully private world when the Four allows thinking and the Five allows feeling."
  ),

  pair(4, 6, "The Individualist & The Loyalist",
    "Both are anxious and self-questioning, but in different domains. The Four questions identity: 'Am I who I should be?' The Six questions safety: 'Is this secure?' Together they can either validate each other's worries or help each other find solid ground.",
    [
      "Both understand insecurity from the inside, creating genuine empathy",
      "The Six's loyalty is deeply comforting to the Four's fear of abandonment",
      "The Four's authenticity helps the Six trust their own feelings",
      "Shared intensity and willingness to go beneath the surface",
    ],
    [
      "Double anxiety can create a feedback loop of worry and doubt",
      "The Four amplifies emotions; the Six scans for threats, and stress compounds",
      "The Six may find the Four's emotional drama exhausting",
      "The Four may find the Six's worst-case thinking suffocating",
    ],
    "The Six's worry isn't about you; it's about safety. Don't take their anxiety personally or interpret it as lack of faith in the relationship.",
    "The Four's intensity isn't drama; it's how they process reality. Don't try to solve their feelings; just be present and steady.",
    "This pair stabilizes when the Four offers the Six emotional safety and the Six offers the Four unwavering loyalty."
  ),

  pair(4, 7, "The Individualist & The Enthusiast",
    "A study in contrasts. The Four moves toward pain to find meaning; the Seven moves away from pain to find joy. The Four goes deep; the Seven goes wide. Yet each carries a secret version of the other: the Four's hidden desire for lightness, the Seven's hidden capacity for depth.",
    [
      "The Seven brings lightness and humor to the Four's intensity",
      "The Four brings depth and meaning to the Seven's breadth",
      "Both are creative, imaginative, and drawn to novel experiences",
      "Each has what the other secretly wants but can't easily access",
    ],
    [
      "The Four wants to process pain; the Seven wants to transcend it, a fundamental conflict",
      "The Seven may seem emotionally shallow to the Four",
      "The Four may seem emotionally heavy to the Seven",
      "The Four craves being understood; the Seven reframes everything, leaving the Four feeling dismissed",
    ],
    "Not every emotion needs to be reframed as a lesson or silver lining. Sometimes the Seven's lightness is what you need, so let it in.",
    "Not every feeling needs to be escaped. Sometimes sitting with the Four's intensity is exactly the depth you've been running from.",
    "This pair is transformative when the Four borrows the Seven's joy and the Seven borrows the Four's depth."
  ),

  pair(4, 8, "The Individualist & The Challenger",
    "Two intense types who share a commitment to authenticity and emotional honesty. The Four expresses vulnerability openly; the Eight expresses strength openly. Together they create a passionate, no-pretense relationship, or an emotional battlefield.",
    [
      "Both are intense, authentic, and hate pretense",
      "The Eight's strength makes the Four feel protected",
      "The Four's vulnerability helps the Eight access their own tender feelings",
      "Passionate, honest, and deeply loyal when committed",
    ],
    [
      "The Eight's directness can crush the Four's sensitive feelings",
      "The Four's emotional withdrawal can feel like betrayal to the Eight",
      "Both can be reactive, and confrontations escalate quickly",
      "The Eight dismisses vulnerability; the Four dwells in it, so timing never aligns",
    ],
    "The Eight isn't dismissing your feelings; they're protecting their own. Their armor comes off when they feel safe, not when they're confronted.",
    "The Four isn't weak; they're brave enough to feel. Soften your delivery without weakening your message.",
    "This pair reaches extraordinary depth when the Eight learns vulnerability isn't weakness and the Four learns strength isn't heartlessness."
  ),

  pair(4, 9, "The Individualist & The Peacemaker",
    "Both are withdrawn types who can appear dreamy and introspective. But where the Four amplifies emotions to feel real, the Nine minimizes emotions to maintain peace. They share a gentle, imaginative quality, and a tendency to avoid direct action.",
    [
      "Both are gentle, creative, and appreciate a slower pace of life",
      "The Nine's acceptance helps the Four feel unconditionally loved",
      "The Four helps the Nine access feelings they tend to ignore",
      "Shared love of beauty, nature, and reflective experiences",
    ],
    [
      "The Four intensifies; the Nine numbs, with different responses to the same discomfort",
      "The Nine's emotional flatness frustrates the Four's need for resonance",
      "The Four's emotional storms overwhelm the Nine into shutdown",
      "Both can fall into inertia, waiting for someone to energize the relationship",
    ],
    "The Nine's calm isn't indifference; it's their way of holding space. Not everyone needs to match your emotional frequency to love you.",
    "Show the Four you have feelings too. Your calm acceptance is beautiful, but they need to see your inner world to feel connected.",
    "This pair blossoms when the Four appreciates the Nine's peace and the Nine engages with the Four's depth."
  ),

  // ── Type 5 pairs ──────────────────────────────────────────────
  pair(5, 5, "The Investigator & The Investigator",
    "Two Fives create a relationship of extraordinary intellectual depth and mutual independence. Both respect boundaries, value privacy, and share a commitment to understanding the world. The danger is a relationship that functions perfectly on paper but lacks emotional warmth.",
    [
      "Deep intellectual connection and shared curiosity",
      "Both respect each other's need for space without taking it personally",
      "Independence is built-in; neither feels smothered",
      "Fascinating conversations that go deep into subjects they care about",
    ],
    [
      "Emotional avoidance squared: who initiates vulnerability?",
      "The relationship can become two parallel lives that rarely intersect emotionally",
      "Both conserve energy, so neither invests in maintaining emotional connection",
      "Physical and emotional intimacy can wither from mutual neglect",
    ],
    "Share something personal today, not just interesting. Your partner won't judge you; they'll be relieved you went first.",
    "Schedule connection. It sounds unromantic, but two Fives won't accidentally stumble into emotional intimacy. Be deliberate.",
    "Two Fives transform when they treat emotional sharing as another form of knowledge, the kind you can only learn together."
  ),

  pair(5, 6, "The Investigator & The Loyalist",
    "Both are Head Center types driven by different flavors of fear. The Five manages fear through knowledge and withdrawal; the Six manages fear through loyalty and vigilance. Together they can create a thoughtful, deeply considered partnership, or a fortress of anxiety.",
    [
      "Both value intelligence, preparation, and thinking things through",
      "The Six's loyalty provides the Five with rare security",
      "The Five's calm analysis steadies the Six's anxious mind",
      "Shared intellectual curiosity and problem-solving orientation",
    ],
    [
      "The Six wants reassurance; the Five finds reassurance-seeking draining",
      "The Five's detachment triggers the Six's abandonment anxiety",
      "Both can overthink decisions into paralysis",
      "The Six questions everything (including the Five); the Five retreats when questioned",
    ],
    "Reassure the Six proactively. Brief, consistent check-ins cost you little but mean everything to them.",
    "Trust the Five's silence. They're not hiding things; they're processing. Ask once, then give them time.",
    "This Head Center pair excels when the Five offers consistent presence and the Six offers trust without interrogation."
  ),

  pair(5, 7, "The Investigator & The Enthusiast",
    "Head Center opposites connected by a growth arrow. The Five goes deep; the Seven goes wide. The Five conserves energy; the Seven generates it. Each embodies the growth direction the other needs, making this a pair with remarkable transformation potential.",
    [
      "The Seven draws the Five out of isolation and into experience",
      "The Five gives the Seven depth and focus",
      "Both are intellectually curious and love learning",
      "Connected by growth arrows, each has what the other needs to develop",
    ],
    [
      "The Seven's pace exhausts the Five's energy reserves",
      "The Five's withdrawal frustrates the Seven's need for engagement",
      "The Seven wants more, faster; the Five wants less, slower",
      "Different social needs: the Seven collects people, the Five limits them",
    ],
    "Let the Seven's energy be a gift, not an intrusion. You don't have to match their pace; just join sometimes.",
    "Respect the Five's boundaries around time and energy. Quality time for them means focused, not marathon. Less is more.",
    "This pair unlocks growth when the Five learns the Seven's expansiveness and the Seven learns the Five's depth."
  ),

  pair(5, 8, "The Investigator & The Challenger",
    "A pairing of power and knowledge. The Five brings intellectual mastery; the Eight brings decisive action. Both are independent, direct, and respect strength. Together they can be enormously effective, or locked in a standoff between mind and force.",
    [
      "Both value independence and self-sufficiency",
      "The Eight's decisiveness activates the Five's knowledge into action",
      "The Five's objectivity tempers the Eight's impulse to dominate",
      "Mutual respect for competence; neither tolerates incompetence",
    ],
    [
      "The Eight's intensity can overwhelm the Five's energy boundaries",
      "The Five's detachment can feel like disengagement to the Eight",
      "Different conflict styles: the Eight escalates, the Five withdraws",
      "The Eight wants immediate action; the Five wants more data first",
    ],
    "The Eight isn't being reckless; they have instincts that don't always need analysis. Trust their decisiveness sometimes.",
    "The Five isn't stalling; they need to process before acting. Give them time without interpreting caution as weakness.",
    "This pair becomes powerful when the Five provides strategy and the Eight provides execution, without either dismissing the other's approach."
  ),

  pair(5, 9, "The Investigator & The Peacemaker",
    "Two of the most withdrawn types on the Enneagram. Both are gentle, non-intrusive, and comfortable with silence. They create a peaceful, low-conflict relationship, but risk a gentle drift into disconnection where neither demands enough of the other.",
    [
      "Both are calm, patient, and non-confrontational",
      "Mutual respect for personal space and quiet",
      "The Nine's warmth gently draws the Five out of isolation",
      "The Five's clarity can help the Nine make decisions",
    ],
    [
      "Both avoid conflict, and problems accumulate silently",
      "The Five withdraws into thoughts; the Nine withdraws into comfort, a parallel retreat",
      "Neither initiates difficult conversations",
      "Low energy investment can make the relationship feel neglected",
    ],
    "Initiate connection even when the Nine seems fine. 'Fine' is the Nine's default, so check beneath it.",
    "Engage with the Five's ideas actively. Saying 'that's interesting' and moving on feels dismissive, so ask follow-up questions.",
    "This gentle pair thrives when they deliberately create moments of active connection instead of comfortable parallel existence."
  ),

  // ── Type 6 pairs ──────────────────────────────────────────────
  pair(6, 6, "The Loyalist & The Loyalist",
    "Two Sixes build a relationship grounded in loyalty, mutual protection, and shared vigilance. They understand each other's anxiety without explanation. The danger is a relationship organized entirely around fear, scanning for threats together instead of building toward joy.",
    [
      "Unshakable loyalty and commitment to each other",
      "Both understand anxiety from the inside, with no judgment",
      "Excellent problem-solving and contingency planning as a team",
      "Shared humor, as Sixes have some of the best self-aware wit",
    ],
    [
      "Double anxiety can amplify worry into paralysis",
      "Both test loyalty, creating a cycle of doubt and reassurance",
      "Worst-case thinking squared; fear feeds fear",
      "Neither fully trusts, even when trust has been earned repeatedly",
    ],
    "Practice trusting the evidence. Your partner has proven their loyalty, so let the track record speak louder than the anxiety.",
    "Catch yourself testing and stop. If you need reassurance, ask directly instead of setting up loyalty tests.",
    "Two Sixes thrive when they become each other's safe base rather than each other's threat detector."
  ),

  pair(6, 7, "The Loyalist & The Enthusiast",
    "Head Center neighbors with opposite strategies. The Six prepares for the worst; the Seven plans for the best. The Six seeks safety; the Seven seeks freedom. Yet they're deeply connected; the Seven's optimism genuinely helps the Six, and the Six's groundedness helps the Seven.",
    [
      "The Seven's optimism lightens the Six's heavy mental load",
      "The Six's realism grounds the Seven's impractical ideas",
      "Both are mentally quick and intellectually engaging",
      "The Seven helps the Six take risks; the Six helps the Seven follow through",
    ],
    [
      "The Six wants security; the Seven wants novelty, a fundamental tension",
      "The Seven's escapism frustrates the Six's need to address problems",
      "The Six's worry dampens the Seven's enthusiasm",
      "Under stress, the Seven flees and the Six clings, escalating both patterns",
    ],
    "The Seven's optimism isn't denial; it's a different strategy for managing the same fear you feel. Let it complement your caution.",
    "The Six's worry isn't negativity; it's intelligence applied to risk. Appreciate their thoroughness instead of trying to cheer them out of it.",
    "This pair balances beautifully when the Six learns to trust possibility and the Seven learns to trust preparation."
  ),

  pair(6, 8, "The Loyalist & The Challenger",
    "A pairing of complementary strengths: the Six brings caution, loyalty, and awareness of danger; the Eight brings courage, directness, and protective force. The Eight makes the Six feel safe; the Six gives the Eight someone worth protecting.",
    [
      "The Eight's strength provides the security the Six craves",
      "The Six's loyalty is the devotion the Eight secretly treasures",
      "Both are protective of the people they love",
      "The Eight's decisiveness calms the Six's analysis paralysis",
    ],
    [
      "The Eight's aggression can trigger the Six's fear responses",
      "The Six's questioning can feel like doubt or disloyalty to the Eight",
      "Counterphobic Sixes may challenge the Eight, creating power struggles",
      "The Eight demands trust immediately; the Six gives it incrementally",
    ],
    "The Eight's bluntness isn't anger at you; it's just how they communicate. Look at their actions, not their volume.",
    "The Six's questioning isn't disloyalty; it's how they build trust. Be patient with the process; the loyalty you earn will be iron-clad.",
    "This pair creates genuine security when the Eight protects without dominating and the Six trusts without requiring constant proof."
  ),

  pair(6, 9, "The Loyalist & The Peacemaker",
    "One of the most common pairings, and often one of the most stable. Both value security, harmony, and reliable routine. The Six brings alertness and planning; the Nine brings calm and acceptance. Together they create a warm, safe home, though potentially one that avoids necessary change.",
    [
      "Natural stability: both value security and consistency",
      "The Nine's calm is deeply soothing for the Six's anxiety",
      "The Six's alertness protects the Nine who tends to overlook problems",
      "Both are warm, loyal, and create a nurturing home environment",
    ],
    [
      "The Six pushes for action on problems; the Nine resists being pushed",
      "The Nine's avoidance of conflict drives the Six's anxiety higher",
      "Both can settle into routines that feel safe but limit growth",
      "The Six wants to discuss worst cases; the Nine wants to believe everything is fine",
    ],
    "The Nine's calm isn't apathy; it's genuine trust that things will work out. Let their steadiness comfort you instead of interpreting it as denial.",
    "Engage with the Six's concerns openly instead of tuning out. A 10-minute conversation about their worry saves days of escalating anxiety.",
    "This pair builds a beautiful life when the Six trusts the Nine's peace and the Nine engages with the Six's preparedness."
  ),

  // ── Type 7 pairs ──────────────────────────────────────────────
  pair(7, 7, "The Enthusiast & The Enthusiast",
    "Two Sevens create the most energetic, fun, and adventure-filled relationship on the Enneagram. Life is a shared playground of ideas, experiences, and possibilities. The danger is that neither ever stops to process pain, loss, or the deeper emotions that make a relationship real.",
    [
      "Unmatched energy, enthusiasm, and sense of adventure",
      "Both are optimistic and resilient; they bounce back from setbacks",
      "Endless creative ideas and plans for the future",
      "Fun, humor, and spontaneity are built into the relationship's DNA",
    ],
    [
      "Both avoid pain, so who processes the hard stuff?",
      "Commitment can feel like limitation; both may keep options open",
      "Difficulty with depth: conversations stay stimulating but never go deep enough",
      "When real suffering comes, neither has practiced sitting with it",
    ],
    "Choose this relationship deliberately every day. Freedom isn't the absence of commitment; it's choosing the same person when you could choose anyone.",
    "Practice being bored together. If the relationship only works when it's exciting, it's entertainment, not intimacy.",
    "Two Sevens transform when they discover that going deep together is the greatest adventure of all."
  ),

  pair(7, 8, "The Enthusiast & The Challenger",
    "Two assertive, big-energy types who take up space unapologetically. The Seven brings ideas and enthusiasm; the Eight brings force and follow-through. Together they're unstoppable, a pair that pursues life with intensity, passion, and scale.",
    [
      "Enormous energy and vitality as a couple",
      "The Eight's decisiveness channels the Seven's scattered ideas into action",
      "The Seven keeps the Eight laughing and light",
      "Both are independent, confident, and take initiative",
    ],
    [
      "Both want to lead, and power dynamics surface quickly",
      "The Eight's control can feel stifling to the Seven's freedom",
      "The Seven's evasiveness frustrates the Eight's desire for directness",
      "Excess amplification: too much of everything: spending, stimulation, conflict",
    ],
    "Be direct when you're unhappy. The Eight won't respect hinting or deflecting; they need your honest voice, even when it's uncomfortable.",
    "Give the Seven room to wander without interpreting it as disloyalty. Their best ideas come from unexpected places.",
    "This pair conquers the world when they share power instead of fighting over it."
  ),

  pair(7, 9, "The Enthusiast & The Peacemaker",
    "A warm, easygoing pair that shares a desire for comfort and positive experiences. The Seven brings energy and initiative; the Nine brings calm and accommodation. Both avoid conflict and pain, which makes life pleasant and growth difficult.",
    [
      "Naturally warm, optimistic, and enjoyable to be around",
      "The Seven energizes the Nine to try new things",
      "The Nine's groundedness keeps the Seven from spinning into excess",
      "Both are flexible and adaptable in daily life",
    ],
    [
      "Both avoid conflict, and problems build up silently",
      "The Seven may unknowingly dominate while the Nine quietly disappears",
      "The Nine feels overwhelmed by the Seven's pace but won't say so",
      "Difficult emotions get bypassed: the Seven reframes, the Nine numbs",
    ],
    "Check in with the Nine regularly. Their 'I'm fine' often means 'I'm overwhelmed but don't want to rock the boat.' Create safety for honesty.",
    "Speak up before you're resentful. The Seven isn't intentionally overwhelming you; they genuinely don't know unless you tell them.",
    "This pair grows when they match their warmth with willingness to face hard truths together."
  ),

  // ── Type 8 pairs ──────────────────────────────────────────────
  pair(8, 8, "The Challenger & The Challenger",
    "Two Eights create a relationship of extraordinary intensity: passionate, direct, and honest. Both respect strength and despise weakness. Together they're either the most loyal, truest partnership imaginable or an escalating battle where neither backs down.",
    [
      "Unmatched honesty and directness, with no games and no pretense",
      "Both are fiercely protective of each other",
      "Passionate intensity in all dimensions of the relationship",
      "Shared sense of justice and willingness to fight for what matters",
    ],
    [
      "Power struggles can become truly destructive",
      "Neither backs down; conflicts escalate to dangerous levels",
      "Vulnerability is the hardest thing for either to show",
      "Tenderness may be reserved for crisis moments rather than daily life",
    ],
    "Practice being gentle when nothing is wrong. Tenderness shouldn't require a crisis to surface.",
    "Back down first sometimes, not because you're wrong, but because winning the argument matters less than keeping the person.",
    "Two Eights become legendary when they reserve their fighting instinct for the world and bring softness home."
  ),

  pair(8, 9, "The Challenger & The Peacemaker",
    "One of the most common and complementary pairings. The Eight brings energy, decisiveness, and protection. The Nine brings acceptance, patience, and peace. The Eight feels softened; the Nine feels strengthened. The risk is that the Eight dominates and the Nine disappears.",
    [
      "The Eight protects the Nine; the Nine gentles the Eight",
      "Complementary energies that create natural balance",
      "The Nine's acceptance is one of few things that melts the Eight's armor",
      "The Eight's strength helps the Nine feel safe enough to engage with life",
    ],
    [
      "The Eight may steamroll the Nine's needs without realizing it",
      "The Nine's passive resistance (stubbornness, forgetting) infuriates the Eight",
      "The Nine adapts until they lose themselves; then explodes or leaves",
      "The Eight mistakes the Nine's compliance for agreement",
    ],
    "Lower your volume. The Nine is listening; they just respond to gentleness, not force. Ask instead of telling.",
    "Don't let peace-keeping erase your identity. The Eight actually wants a partner with opinions, not a mirror. Your voice matters.",
    "This pair reaches its potential when the Eight learns gentleness and the Nine learns to take up space."
  ),

  // ── Type 9 pair ───────────────────────────────────────────────
  pair(9, 9, "The Peacemaker & The Peacemaker",
    "Two Nines create one of the most harmonious, gentle, and accepting relationships possible. Both are patient, accommodating, and genuinely nice. The danger is that the relationship drifts on autopilot, comfortable and kind, but without the friction that generates growth.",
    [
      "Extraordinary acceptance and unconditional positive regard",
      "Low-conflict, warm, and deeply comfortable together",
      "Both are patient listeners who make the other feel truly heard",
      "A genuinely peaceful, nurturing home environment",
    ],
    [
      "Neither initiates change, confrontation, or difficult conversations",
      "Problems accumulate silently because both prioritize harmony over honesty",
      "Decision paralysis: 'What do you want?' 'I don't know, what do you want?'",
      "The relationship may feel stagnant, comfortable but not growing",
    ],
    "Make a decision today without asking your partner's permission. Practice having preferences out loud.",
    "Disagree with something small this week. Conflict isn't the end of peace; it's sometimes the beginning of real connection.",
    "Two Nines transform when they discover that growth doesn't require losing their peace; it requires bringing their full selves to it."
  ),
];

export function getPairKey(type1: EnneagramType, type2: EnneagramType): string {
  const low = Math.min(type1, type2);
  const high = Math.max(type1, type2);
  return `${low}-${high}`;
}

export function getPairRelationship(
  type1: EnneagramType,
  type2: EnneagramType
): TypePairRelationship | undefined {
  const low = Math.min(type1, type2) as EnneagramType;
  const high = Math.max(type1, type2) as EnneagramType;
  return TYPE_PAIR_RELATIONSHIPS.find(
    (p) => p.type1 === low && p.type2 === high
  );
}

export function getPairsForType(type: EnneagramType): TypePairRelationship[] {
  return TYPE_PAIR_RELATIONSHIPS.filter(
    (p) => p.type1 === type || p.type2 === type
  );
}
