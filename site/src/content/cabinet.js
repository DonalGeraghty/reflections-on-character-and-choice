// Original prompts for the Thought Cabinet, keyed by title rather than chapter route.
// Each thought contains both a useful quality and the danger of taking it too far.
export const thoughtId = (title) => title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();

const entries = [
  [
    "Live while life is yours",
    "Attention to the finite time available",
    "Treating every quiet hour as a failure of ambition"
  ],
  [
    "Life is long enough when it is used well",
    "Purpose without fixation on years",
    "Demanding that every day prove its worth"
  ],
  [
    "Know the destination",
    "Direction rooted in values",
    "Letting a plan replace the life it should support"
  ],
  [
    "Do things with intention",
    "Conscious choice in ordinary moments",
    "Turning every pleasure into a task to optimise"
  ],
  [
    "Choose how far to pursue mastery",
    "The wisdom to recognise enough",
    "Giving up simply because progress grows difficult"
  ],
  [
    "Avoid the space between work and rest",
    "A clear choice between effort and recovery",
    "Treating an unplanned pause as a moral fault"
  ],
  [
    "Embody the philosophy",
    "Values made visible through action",
    "Confusing a quiet manner with good character"
  ],
  [
    "If nothing changes, nothing changes",
    "Readiness to take the next useful step",
    "Demanding change in what is not yours to govern"
  ],
  [
    "Create a vision of the future self",
    "A direction for gradual growth",
    "Measuring today's self against imagined perfection"
  ],
  [
    "Make decisions in moments of clarity",
    "Foresight before fatigue or desire arrives",
    "Refusing to adapt when the facts change"
  ],
  [
    "Begin with intention, end with reflection",
    "A daily habit of honest attention",
    "Making reflection a tribunal for small mistakes"
  ],
  [
    "Give ambitious goals a realistic pace",
    "Ambition that can endure",
    "Using realism to avoid meaningful effort"
  ],
  [
    "Build systems that support the intention",
    "Making worthwhile action easier to repeat",
    "Letting a routine become more important than its purpose"
  ],
  [
    "Prepare the environment",
    "Reducing unnecessary friction",
    "Waiting for perfect conditions before beginning"
  ],
  [
    "Prepare for obstacles",
    "Readiness when plans meet resistance",
    "Imagining so many difficulties that action never begins"
  ],
  [
    "Recognise what is up to us",
    "Responsibility for the part within reach",
    "Mistaking acceptance for passivity"
  ],
  [
    "Do not carry the weight of the world",
    "Compassion with proportion",
    "Using limited responsibility as an excuse for indifference"
  ],
  [
    "Pause between the event and the judgement",
    "Room to test first impressions",
    "Hesitating forever when action is plainly needed"
  ],
  [
    "Examine the weight added by judgement",
    "Distinguishing difficulty from interpretation",
    "Dismissing genuine pain as merely a thought"
  ],
  [
    "A calm mind is a stronger fortress than anger",
    "Composure without surrender",
    "Using calmness to avoid necessary confrontation"
  ],
  [
    "Meet this moment with reason and good character",
    "A useful next action under uncertainty",
    "Overthinking what calls for simple kindness"
  ],
  [
    "Do not live in the minds of others",
    "Independence from imagined judgement",
    "Ignoring criticism that could teach you something"
  ],
  [
    "Make room for a new beginning",
    "Courage to leave an unsuitable path",
    "Abandoning responsibilities at the first discomfort"
  ],
  [
    "Not everything that leaves is a loss",
    "Perspective when something ends",
    "Pretending a meaningful loss should not hurt"
  ],
  [
    "Allow the awkwardness of learning",
    "Patience with being a beginner",
    "Accepting avoidable mistakes without reflection"
  ],
  [
    "Remember what experience has taught",
    "Judgement informed by experience",
    "Assuming the past predicts every new circumstance"
  ],
  [
    "The road not taken",
    "Release from imagined alternatives",
    "Refusing to learn from a choice you regret"
  ],
  [
    "Accept that time moves forward",
    "Acceptance of what time changes",
    "Confusing acceptance with a refusal to remember"
  ],
  [
    "Let regret become wisdom",
    "Learning without living in remorse",
    "Excusing a wrong without trying to repair it"
  ],
  [
    "Wisdom comes with time",
    "Humility before experience",
    "Mistaking age alone for good judgement"
  ],
  [
    "Speak about others with care",
    "Fairness in another person's absence",
    "Silence when a concern should be raised"
  ],
  [
    "Let repeated actions define identity",
    "Character built through conduct",
    "Treating one lapse as a permanent identity"
  ],
  [
    "Share with discernment",
    "Trust made thoughtful",
    "Keeping every feeling hidden from those who care"
  ],
  [
    "Contribute to the conversation worth having",
    "A fuller picture of the world",
    "Using pleasant news to look away from injustice"
  ],
  [
    "Take time before responding",
    "Space for a considered answer",
    "Withholding a reply that someone reasonably needs"
  ],
  [
    "Let a decision stand on its own",
    "Confidence without a need for approval",
    "Refusing a useful explanation out of pride"
  ],
  [
    "Do not depend on recognition",
    "Integrity without applause",
    "Forgetting to acknowledge other people's work"
  ],
  [
    "Never arrive empty-handed",
    "Gratitude expressed in action",
    "Turning generosity into an obligation or display"
  ],
  [
    "Seek mastery over desire",
    "Freedom to choose rather than obey impulse",
    "Treating every pleasure as a weakness"
  ],
  [
    "Keep appetite within the bounds of choice",
    "Enjoyment with self-command",
    "Making food a source of guilt or anxiety"
  ],
  [
    "Wanting less is often easier than acquiring more",
    "Relief from endless wanting",
    "Rejecting worthwhile aspirations merely because they cost effort"
  ],
  [
    "Find freedom from excess",
    "Room for what matters",
    "Mistaking deprivation for virtue"
  ],
  [
    "Simple living leaves more room for good living",
    "Time and space for valued experiences",
    "Judging others for choosing differently"
  ],
  [
    "Speak with purpose, not compulsion",
    "Honest expression with restraint",
    "Avoiding a difficult truth to preserve comfort"
  ],
  [
    "Begin with a budget",
    "Clarity about where resources go",
    "Reducing every meaningful decision to money"
  ],
  [
    "Endurance is easier when the purpose is clear",
    "Steadiness through difficulty",
    "Staying with a harmful course for the sake of persistence"
  ],
  [
    "Turn obstacles into opportunities",
    "Resourcefulness in an imperfect world",
    "Insisting every hardship must be a gift"
  ],
  [
    "Remember how it feels afterwards",
    "Memory of the whole experience",
    "Overriding a genuine need for rest"
  ],
  [
    "Build through progressive overload",
    "Patient growth through manageable challenge",
    "Pursuing more before recovery or technique is ready"
  ],
  [
    "Give aerobic fitness a central place",
    "Care for long-term capacity",
    "Treating a metric as a measure of personal worth"
  ],
  [
    "Arrange training in advance",
    "Consistency supported by planning",
    "Ignoring a genuine need to adjust the plan"
  ],
  [
    "Train beyond comfort",
    "Willingness to meet worthwhile effort",
    "Confusing pain or injury with progress"
  ],
  [
    "Give weight to what has worked",
    "Practical learning from lived results",
    "Assuming a previous method always fits"
  ],
  [
    "Make eating well easier to sustain",
    "A nourishing routine that lasts",
    "Demanding perfection from ordinary meals"
  ],
  [
    "Consider how long pleasure lasts",
    "Perspective beyond immediate appetite",
    "Forgetting that pleasure also has a place"
  ],
  [
    "Consider the hours after a meal",
    "Attention to the full consequence of a choice",
    "Being preoccupied with every sensation"
  ],
  [
    "Review what actually happens",
    "Curiosity over assumption",
    "Treating personal observations as universal rules"
  ],
  [
    "Keep an honest record of food",
    "Useful clarity without self-deception",
    "Allowing records to become harsh self-judgement"
  ],
  [
    "Decide meals while the mind is relaxed",
    "Preparation before hunger changes priorities",
    "Forbidding flexibility and shared enjoyment"
  ],
  [
    "Shop with a plan",
    "Making good options readily available",
    "Valuing strict adherence more than real needs"
  ],
  [
    "Give sleep the priority it deserves",
    "Respect for a basic human need",
    "Allowing sleep anxiety to disturb rest itself"
  ],
  [
    "Keep a consistent sleep schedule",
    "Steadiness across ordinary days",
    "Treating every unusual evening as a failure"
  ],
  [
    "Prepare the environment for rest",
    "Space that supports recovery",
    "Waiting for ideal conditions before allowing sleep"
  ],
  [
    "Allow the mind to settle before bed",
    "A gentler passage from activity to sleep",
    "Trying to force the mind into silence"
  ],
  [
    "Protect sleep through daytime choices",
    "Awareness of what affects the night",
    "Controlling every daylight choice too rigidly"
  ],
  [
    "Rest is not wasted time",
    "Permission to recover without guilt",
    "Using rest to avoid a necessary beginning"
  ],
  [
    "Let leisure be leisure",
    "Enjoyment without a demand for productivity",
    "Losing sight of commitments that still matter"
  ]
];

export const thoughts = Object.fromEntries(entries.map(([title, cultivates, caution]) => [
  thoughtId(title), { cultivates, caution },
]));

export const thoughtFor = (title) => thoughts[thoughtId(title)];
