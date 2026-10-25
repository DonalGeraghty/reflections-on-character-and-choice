// Hand-authored illustrations of the manuscript, keyed by its stable routes.
// These are reading aids, not another copy of the manuscript or personal records.
const steps = (title, prompt, ...items) => ({ type: 'steps', title, prompt, items });
const compare = (title, prompt, ...items) => ({ type: 'compare', title, prompt, items });
const checks = (title, prompt, ...items) => ({ type: 'checks', title, prompt, items });
const reveal = (title, prompt, label, text) => ({ type: 'reveal', title, prompt, label, text });
const choices = (title, prompt, ...items) => ({ type: 'choices', title, prompt, items });

export const explorerDefinitions = {
  'living-with-intention/1-live-while-life-is-yours': reveal(
    "Remember the opportunity of today", "Consider what deserves attention while time is available.",
    "Consider the day ahead", "Life's uncertainty need not cause fear. It can help direct attention towards people, purposes and moments worth living."),

  'stoic-wisdom/18-the-road-not-taken': reveal(
    "Turn towards the road ahead", "Consider the comparison between a lived life and an imagined alternative.",
    "Return to what is known", "The path not taken can be imagined but not experienced. Attention can return to the choices still available."),

  'stoic-wisdom/19-let-regret-become-wisdom': reveal(
    "Carry the lesson forward", "Distinguish what can be repaired from what must be accepted.",
    "Choose the next useful action", "Where possible, make amends. Otherwise, learn what can be learned without repeating the same self-punishment."),

  'stoic-wisdom/20-wisdom-comes-with-time': reveal(
    "Use what experience has taught", "Consider what your younger self could not yet have known.",
    "Apply today's understanding", "What was learned later was not necessarily available earlier. The lesson has value in the choices made now."),

  'stoic-wisdom/24-do-not-live-in-the-minds-of-others': reveal(
    "Give attention back to your own conduct", "Consider whether an imagined judgement deserves your attention.",
    "Return to your own choices", "Consider useful criticism, but do not let speculation about another person's opinion govern your day."),

  'character-and-integrity/5-take-time-before-responding': reveal(
    "Give thought its proper space", "Not every question needs an answer in the moment.",
    "Allow a considered reply", "Acknowledging a request without answering immediately can create the space needed for sound judgement."),

  'character-and-integrity/7-do-not-depend-on-recognition': reveal(
    "Work without requiring applause", "Consider the difference between fulfilling an obligation and seeking approval.",
    "Offer what you need not demand", "Take pride in careful work. Acknowledge others generously without making recognition a condition of your own effort."),

  'exercise/4-train-beyond-comfort': reveal(
    "Distinguish challenge from mere duration", "Consider the purpose and appropriate demands of a training session.",
    "Meet appropriate difficulty", "Training for improvement calls for sufficient challenge, sound technique and recovery, not exhaustion for its own sake."),

  'living-with-intention/2-if-nothing-changes-nothing-changes': steps(
    'Bring a wish into the day', 'Follow an intention until it has something practical to change.',
    ['Wish', 'A different result', 'Recognising the need for change gives a direction. The next meal, session or conversation still needs a different action.'],
    ['Action', 'One visible difference', 'Choose a small adjustment that can actually happen at the next opportunity.'],
    ['Review', 'Something to learn from', 'Notice what changed. An unsatisfactory result calls for another look at the approach.']),

  'living-with-intention/3-do-things-with-intention': choices(
    'Give the action a purpose', 'Choose an ordinary activity and bring its purpose into view.',
    ['Conversation', 'Make room to understand', 'An intention to listen becomes visible in the space allowed for another person’s words.'],
    ['Training', 'Give the session a direction', 'Decide what the session is for before beginning the work.'],
    ['Rest', 'Allow the pause', 'Time chosen for rest deserves the same attention as time chosen for work.']),

  'living-with-intention/5-make-decisions-in-moments-of-clarity': compare(
    'Move a decision to a clearer moment', 'Compare where the work of deciding falls.',
    ['Leave it late', 'Decide under pressure', 'Hunger, fatigue and urgency arrive alongside a choice still waiting to be made.'],
    ['Prepare earlier', 'Leave a simpler next step', 'Meals, training or bedtime can be considered while rested, with room to revise when circumstances change.']),

  'living-with-intention/6-begin-with-intention-end-with-reflection': steps(
    'A day with room to reflect', 'Move through the day without turning it into a trial.',
    ['Morning', 'Prepare', 'What matters today, and what predictable difficulty can be prepared for?'],
    ['During the day', 'Pause', 'Does the next action still serve the intention?'],
    ['Evening', 'Learn', 'Notice what went well and carry one useful lesson forward. Allow the day to end.']),

  'living-with-intention/4-create-a-vision-of-the-future-self': steps(
    'Bring the future closer', 'Translate a hoped-for quality into ordinary practice.',
    ['Quality', 'Name what is worth becoming', 'Consider the qualities that would be visible in a worthwhile future life.'],
    ['Practice', 'Find what the quality asks', 'Fitness asks for training time; integrity asks for honesty when it is inconvenient.'],
    ['Today', 'Give it a place', 'Choose one ordinary occasion to practise that quality before the whole vision feels within reach.']),

  'living-with-intention/7-give-ambitious-goals-a-realistic-pace': compare(
    'Size the next commitment', 'Keep the ambition in view while examining the next step.',
    ['The distant goal', 'A direction worth keeping', 'A large ambition can remain meaningful even when the present ability is modest.'],
    ['The ordinary day', 'A commitment that fits', 'Choose a demand that can be repeated with the time and energy actually available. Let evidence guide an increase.']),

  'living-with-intention/8-build-systems-that-support-the-intention': checks(
    'Prepare for an unmotivated day', 'Tap an arrangement to see how it supports beginning. These checks are temporary.',
    ['A reliable cue', 'A familiar time, place or existing routine gives the action somewhere to begin.'],
    ['Materials ready', 'Clothes, food or equipment prepared earlier remove a decision from the difficult moment.'],
    ['An obvious first step', 'A small, clear beginning asks less of a tired mind than an intention still needing a plan.']),

  'living-with-intention/9-prepare-the-environment': compare(
    'Change what is within reach', 'The surroundings can add effort or remove it.',
    ['An obstacle nearby', 'The beginning asks for more', 'Missing equipment, a cluttered work space or a ready distraction makes the same intention harder to follow.'],
    ['A useful cue nearby', 'The beginning becomes clearer', 'Set out what the task needs and put distractions a little further away.']),

  'living-with-intention/10-prepare-for-obstacles': choices(
    'Give a likely obstacle an answer', 'Choose an interruption and examine the preparation it calls for.',
    ['A late finish', 'Keep an alternative ready', 'A prepared frozen meal can leave dinner available when there is no time to cook.'],
    ['Less time', 'Plan a smaller version', 'Decide what remains worthwhile when the full commitment no longer fits.'],
    ['A needed pause', 'Leave a way to resume', 'Illness or urgent responsibilities may call for stopping. The next suitable opportunity can provide a beginning again.']),

  'living-with-intention/12-let-leisure-be-leisure': reveal(
    'Let enjoyment be sufficient', 'A game, a novel or an unhurried afternoon need not earn its place through another benefit.',
    'Remove the need to justify it', 'Was the time chosen and enjoyed, with room left for the other things that matter? That is a more useful question than what it produced.'),

  'living-with-intention/14-choose-how-far-to-pursue-mastery': compare(
    'Consider the next stretch', 'Further progress is possible. Whether it is worthwhile remains a choice.',
    ['Continue', 'Give depth its due', 'Further practice may offer enough meaning and satisfaction to deserve the time it asks.'],
    ['Stop here', 'Make room for something else', 'A skill may already have provided what was sought. Its value remains even when attention moves elsewhere.']),

  'character-and-integrity/1-speak-about-others-with-care': checks(
    'Give a story a moment of care', 'Before repeating a private detail, examine what the telling serves.',
    ['Fairness', 'Could the same words be said fairly in the absent person’s presence?'],
    ['Purpose', 'Does sharing help address a concern, or merely make an interesting story?'],
    ['Discretion', 'Share only what a person able to help needs to know. Truth alone does not make every detail suitable to repeat.']),

  'character-and-integrity/2-let-repeated-actions-define-identity': steps(
    'Give a quality evidence', 'Follow the movement from description to conduct.',
    ['The description', 'A quality is named', 'Honest, kind or disciplined: a word gives a direction, but says little by itself.'],
    ['The action', 'An occasion to practise', 'Tell the inconvenient truth, treat someone with care or keep a manageable commitment.'],
    ['The pattern', 'A description with substance', 'Repeated choices give the word something real to refer to. A lapse still leaves room for repair.']),

  'character-and-integrity/3-share-with-discernment': choices(
    'Choose the audience with care', 'Openness can take different forms in different settings.',
    ['An acquaintance', 'Keep the detail proportionate', 'Limited context or untested discretion can be a reason to keep a personal account brief.'],
    ['A trusted relationship', 'Allow a fuller account', 'Demonstrated care can make room for uncertainty, difficulty and contradictions.'],
    ['A learning setting', 'Leave room for an honest question', 'Privacy need not become a demand to appear certain about something still being learned.']),

  'character-and-integrity/4-contribute-to-the-conversation-worth-having': compare(
    'Widen the picture', 'Neither half gives a complete account on its own.',
    ['What needs attention', 'Name the real problem', 'A concern can inform, expose a wrong or lead to useful action.'],
    ['What deserves notice', 'Remember what is improving', 'An act of kindness, an improvement or a problem being solved can add perspective without denying the concern.']),

  'character-and-integrity/6-let-a-decision-stand-on-its-own': compare(
    'Notice what an explanation is doing', 'The same reason can be shared freely or offered under pressure.',
    ['Share a reason', 'An explanation with a purpose', 'Offer context when it helps understanding or serves a responsibility.'],
    ['Seek permission', 'A settled choice becomes a defence', 'Repeated justification can invite negotiation where the decision has already received enough consideration.']),

  'stoic-wisdom/10-find-freedom-from-excess': choices(
    'See what a limit protects', 'Choose a limit and look beyond what it declines.',
    ['A spending limit', 'Money for chosen purposes', 'Enough remains for the needs, enjoyment and future uses already judged worthwhile.'],
    ['A stopping time', 'Room in the evening', 'An enjoyable activity can end while other worthwhile parts of life still have time.'],
    ['Fewer commitments', 'Attention available', 'Leaving some capacity free can give existing responsibilities the care they deserve.']),

  'stoic-wisdom/12-endurance-is-easier-when-the-purpose-is-clear': steps(
    'Reconnect effort with purpose', 'Bring a distant reason down to the next action.',
    ['The demand', 'What is difficult now?', 'Repetition, inconvenience or slow progress may be the immediate experience.'],
    ['The purpose', 'What makes it worthwhile?', 'Name what the effort serves beyond this difficult stretch.'],
    ['The next step', 'Does this still serve it?', 'A clear purpose can support persistence or reveal a reason to change the approach.']),

  'stoic-wisdom/4-a-calm-mind-is-a-stronger-fortress-than-anger': steps(
    'Keep judgement available', 'A provocation can be met in more than one moment.',
    ['Notice', 'Anger has arrived', 'A strong first feeling need not decide the reply.'],
    ['Pause', 'Establish what happened', 'Was the remark understood correctly, and what would a response accomplish?'],
    ['Respond', 'Be clear and firm', 'A boundary can be stated without an insult. The difficulty still receives an answer.']),

  'stoic-wisdom/6-embody-the-philosophy': choices(
    'Give a principle somewhere to live', 'Choose an ordinary occasion for practice.',
    ['An interruption', 'Patience in the reply', 'Allow the manner of responding to give patience its substance.'],
    ['A mistake', 'Honesty in the acknowledgement', 'Admit what happened and make a repair where possible.'],
    ['A confidence', 'Discretion without an announcement', 'Keeping private information private lets the action serve its purpose quietly.']),

  'stoic-wisdom/5-meet-this-moment-with-reason-and-good-character': checks(
    'Find one reasonable next action', 'Bring a difficulty back to what is close enough to act upon.',
    ['Establish a fact', 'Separate what is known from the first impression or assumption.'],
    ['Choose the manner', 'Honesty, fairness and care can guide the way an action is carried out.'],
    ['Meet the next demand', 'Listen, correct a mistake, fulfil a responsibility or ask for time to think. The whole future need not be settled first.']),

  'stoic-wisdom/14-make-room-for-a-new-beginning': steps(
    'Allow a transition its space', 'An ending need not be rushed into a replacement.',
    ['Acknowledge', 'Let the past have its value', 'Something can have been worthwhile and still come to an end.'],
    ['Make room', 'Attend to what must finish', 'Consider the responsibilities and honesty that a thoughtful ending requires.'],
    ['Begin', 'Allow the first step to be small', 'Take what has been learned without demanding certainty about the whole next stage.']),

  'stoic-wisdom/8-keep-appetite-within-the-bounds-of-choice': steps(
    'Place a pause inside an urge', 'A familiar want can be noticed before it is answered.',
    ['Notice the want', 'Another episode or another look', 'Name the urge without making it a command.'],
    ['Leave it unanswered', 'Make room to consider', 'Is this still enjoyable? Is there a reason to continue?'],
    ['Choose', 'Enough remains possible', 'Enjoyment can have a place without repeatedly displacing other things that matter.']),

  'stoic-wisdom/9-wanting-less-is-often-easier-than-acquiring-more': checks(
    'Examine the promise of more', 'Give an attractive addition a little attention before pursuing it.',
    ['What it provides', 'Name the need, worthwhile activity or lasting enjoyment it would make possible.'],
    ['What it asks', 'Consider the money, work and other purposes that would have to be given up.'],
    ['What is already enough', 'A useful possession need not become inadequate because a newer version exists.']),

  'stoic-wisdom/3-examine-the-weight-added-by-judgement': compare(
    'Separate the demand from the addition', 'Consider a task that still needs an hour of work.',
    ['The demand', 'An hour of work remains', 'The task can be described plainly and approached through a manageable beginning.'],
    ['The addition', 'Resentment occupies the morning', 'Repeating that it should not need doing can consume attention without moving the task forward.']),

  'stoic-wisdom/2-pause-between-the-event-and-the-judgement': compare(
    'Read the same event twice', 'A reply has not arrived.',
    ['First interpretation', 'Rejection or disrespect', 'An explanation may appear quickly while its evidence remains incomplete.'],
    ['Plain observation', 'A message is unanswered', 'The reason remains unknown. Allow time or seek clarification before treating an assumption as a fact.']),

  'stoic-wisdom/7-seek-mastery-over-desire': compare(
    'Hold an outcome more lightly', 'A preference can guide effort without becoming a demand.',
    ['Demand', 'Agreement must follow', 'Satisfaction becomes dependent on a decision that belongs to someone else.'],
    ['Preference', 'Agreement would be welcome', 'Prepare and speak with care while leaving another person room to decide.']),

  'stoic-wisdom/16-allow-the-awkwardness-of-learning': steps(
    'Give a beginner room', 'An unfamiliar task offers something a polished appearance cannot.',
    ['Ask', 'Make uncertainty visible', 'An elementary question can reveal the next useful step.'],
    ['Attempt', 'Allow an imperfect beginning', 'An honest attempt gives instruction and correction something to work with.'],
    ['Adjust', 'Let the correction help', 'Notice what changes on the next attempt. Competence needs occasions to develop.']),

  'stoic-wisdom/21-life-is-long-enough-when-it-is-used-well': choices(
    'Give today something worthwhile', 'Different uses of time can each deserve a place.',
    ['Connection', 'A conversation given time', 'Make room for a relationship to be lived rather than repeatedly postponed.'],
    ['Practice', 'An intention given an occasion', 'Learning or a commitment becomes part of life through time actually given to it.'],
    ['Enjoyment', 'An afternoon worth choosing', 'Rest, play and unhurried company can be good uses of the day without producing an achievement.']),

  'stoic-wisdom/11-simple-living-leaves-more-room-for-good-living': reveal(
    'Leave some space unclaimed', 'A cleared room or an uncommitted evening offers capacity.',
    'Leave the space open', 'Nothing needs to be added immediately. Live with the simpler arrangement long enough to enjoy the room it creates.'),

  'stoic-wisdom/22-know-the-destination': checks(
    'Give an opportunity a direction', 'Consider where an appealing path would actually lead.',
    ['The purpose', 'Which quality or commitment would this opportunity serve?'],
    ['The exchange', 'What time, money or care would become unavailable elsewhere?'],
    ['The direction', 'Does this bring life closer to what matters, or mainly offer novelty, praise or urgency?']),

  'stoic-wisdom/15-not-everything-that-leaves-is-a-loss': reveal(
    'Look at the space that remains', 'Something familiar is no longer present.',
    'Consider what becomes possible', 'Its absence may leave peace, freedom, time or space. What has gone is only one part of the change.'),

  'stoic-wisdom/23-speak-with-purpose-not-compulsion': choices(
    'Choose a contribution', 'A discussion does not require the same response every time.',
    ['Listen', 'Understand before entering', 'Allow other views time to become clear before deciding what would be useful to add.'],
    ['Speak', 'Offer a considered perspective', 'A view can be expressed honestly and calmly without needing to win agreement.'],
    ['Let it rest', 'An opinion need not become a reply', 'An urge to correct or be seen as right can pass without determining the next words.']),

  'stoic-wisdom/17-remember-what-experience-has-taught': compare(
    'Recall the part that slips from mind', 'Two different attractions can hide the same gap in attention.',
    ['Worthwhile effort', 'The beginning looms largest', 'Reluctance to run or read can eclipse the satisfaction familiar from afterwards.'],
    ['Fleeting pleasure', 'The enjoyment looms largest', 'Anticipated taste can eclipse discomfort that followed on previous occasions. Recall the whole experience.']),

  'stoic-wisdom/13-turn-obstacles-into-opportunities': choices(
    'Find what remains possible', 'A difficulty does not require one fixed response.',
    ['Practise', 'Use the occasion', 'A disagreement may offer practice in patience and fairness.'],
    ['Adapt', 'Learn from the interruption', 'A failed approach may reveal a different way forward.'],
    ['Step away', 'Allow judgement to change the path', 'Some obstacles deserve removal or avoidance. Perseverance is not the only reasonable response.']),

  'food-and-nutrition/1-give-weight-to-what-has-worked': choices(
    'Remember the useful evidence', 'These are observations from the approach described, with room for revision.',
    ['Fullness', 'Less constant hunger', 'Meals higher in fat and protein were filling even on fewer calories.'],
    ['Comfort', 'Less bloating noticed', 'Comfort after meals was part of what made the approach feel effective.'],
    ['Revision', 'A starting point remains open', 'Keep the qualities that proved useful while reviewing the details as experience changes.']),

  'food-and-nutrition/2-make-eating-well-easier-to-sustain': checks(
    'Give a meal a place in the routine', 'Select the qualities worth remembering when planning meals.',
    ['Filling', 'Has this meal left a useful sense of fullness on ordinary days?'],
    ['Enjoyable', 'Is the food something worth returning to, rather than merely enduring?'],
    ['Practical', 'Can it be prepared with the time and effort usually available?']),

  'food-and-nutrition/3-consider-how-long-pleasure-lasts': steps(
    'Give a brief pleasure its proportion', 'Follow the experience described rather than only its anticipation.',
    ['Before', 'The imagined taste', 'Anticipation can give a short enjoyment a large place in attention.'],
    ['During', 'The pleasure is real', 'Something briefly enjoyable can still be worth choosing.'],
    ['Later', 'The satisfaction has passed', 'The foods described left little satisfaction an hour or two later. Fullness, comfort and longer intentions deserve a place in the choice too.']),

  'food-and-nutrition/4-consider-the-hours-after-a-meal': compare(
    'Extend the view beyond the plate', 'A meal includes more than its first few bites.',
    ['At the table', 'Taste is immediate', 'Enjoyment receives attention while the meal is being chosen and eaten.'],
    ['Afterwards', 'Comfort still matters', 'Recall the recurring ease or discomfort that followed a familiar food. Let that memory inform the next choice.']),

  'food-and-nutrition/5-review-what-actually-happens': steps(
    'Let the plan learn', 'A recurring difficulty provides information.',
    ['Observe', 'Look at ordinary days', 'Notice fullness, enjoyment and the practical demands of preparation.'],
    ['Find a pattern', 'Look beyond one occasion', 'Which meals or arrangements repeatedly work, and which repeatedly become difficult?'],
    ['Revise', 'Change the arrangement', 'Keep what proves useful and adjust what does not, rather than repeating the same resolution.']),

  'food-and-nutrition/6-keep-an-honest-record-of-food': checks(
    'Look beyond the main meals', 'Select the easily overlooked parts of a day’s record. This is a reminder, not a food log.',
    ['Drinks', 'Include drinks consumed alongside and between meals.'],
    ['Snacks and small bites', 'An unplanned choice still belongs in the account.'],
    ['Sauces and portions', 'Familiarity with a meal does not settle the quantity eaten. Estimates deserve care and consistency.']),

  'food-and-nutrition/7-decide-meals-while-the-mind-is-relaxed': steps(
    'Prepare a simpler evening', 'Let a calm decision carry through to the moment of hunger.',
    ['Choose', 'Settle the meal earlier', 'Decide the food and portions while there is room to think.'],
    ['Prepare', 'Make the choice available', 'Buy what is needed and prepare ahead where practical.'],
    ['Keep an alternative', 'Allow for a late finish', 'A prepared frozen meal can leave an earlier choice available when the original plan no longer fits.']),

  'food-and-nutrition/8-shop-with-a-plan': checks(
    'Give each item a purpose', 'The considered shop begins before entering the shop.',
    ['Meals chosen', 'A meal plan gives the ingredients a reason to be bought.'],
    ['Cupboards checked', 'Notice what is already available before buying more.'],
    ['List and quantities ready', 'Buy what will be used, with its cost in view. Extra food is not better value if it goes to waste.']),

  'exercise/1-build-through-progressive-overload': steps(
    'Let the next demand be earned', 'Progress can be considered without prescribing a load or a schedule.',
    ['Present capacity', 'Begin with what is possible', 'Give the current ability an honest place in the plan.'],
    ['Repeated work', 'Look across sessions', 'A single demanding session says less than what is becoming possible over time.'],
    ['Next demand', 'Increase with patience', 'Review whether a small increase is earned. Every session need not surpass the last.']),

  'exercise/2-give-aerobic-fitness-a-central-place': compare(
    'Make room for both kinds of capacity', 'Consider the purpose of training beyond appearance.',
    ['Strength', 'Capacity to meet resistance', 'Strength has a place in the longer effort to remain capable.'],
    ['Aerobic fitness', 'Capacity to sustain effort', 'Give sustained activity a deliberate place alongside strength. A measurement is a reference point, not a promise about lifespan.']),

  'exercise/3-arrange-training-in-advance': checks(
    'Make the start straightforward', 'A session can be arranged before motivation is tested.',
    ['Time and place', 'Fit the session into the actual day rather than waiting for spare time.'],
    ['Purpose and equipment', 'Leave the intended work clear and its materials ready.'],
    ['An alternative', 'Consider a shorter session or another time, with room for illness, injury and recovery.']),

  'sleep-and-recovery/1-give-sleep-the-priority-it-deserves': compare(
    'Bring tomorrow into the evening', 'Consider a familiar extension of the night.',
    ['Another hour awake', 'What is it offering?', 'Notice whether the extra time is chosen for something worthwhile or simply continues by habit.'],
    ['Tomorrow morning', 'What does the trade ask?', 'Give the rest needed for the next day a place in the decision before the evening runs away.']),

  'sleep-and-recovery/2-keep-a-consistent-sleep-schedule': steps(
    'Return to a workable rhythm', 'A routine supports rest without demanding a perfect night.',
    ['Set a pattern', 'Give waking and bedtime a place', 'Choose an arrangement that allows sufficient rest on most days.'],
    ['Notice drift', 'Look at the return', 'Consider when ordinary variations make the usual pattern difficult to resume.'],
    ['Begin again', 'One disrupted night is not a verdict', 'Return to a reasonable routine without trying to force sleep to arrive.']),

  'sleep-and-recovery/3-prepare-the-environment-for-rest': checks(
    'Remove a small obstacle to rest', 'Choose an aspect of the room to consider while there is time to change it.',
    ['Light and noise', 'Notice what enters the room and what can reasonably be reduced.'],
    ['Comfort', 'Consider bedding and a comfortable temperature. The aim is a workable room, not a perfect one.'],
    ['Distractions', 'A phone need not remain within reach of the place intended for rest.']),

  'sleep-and-recovery/4-allow-the-mind-to-settle-before-bed': steps(
    'Let the evening change pace', 'A transition can make stopping easier.',
    ['Finish', 'Close what can be closed', 'Attend to pressing tasks where possible rather than carrying them all into bed.'],
    ['Slow', 'Choose a quieter activity', 'Reading, preparing for morning or sitting without a screen can mark a change in pace.'],
    ['Set aside', 'Leave tomorrow its work', 'If a matter cannot be settled tonight, acknowledge it without demanding an immediate answer.']),

  'sleep-and-recovery/5-protect-sleep-through-daytime-choices': choices(
    'Look earlier in the day', 'Choose a part of the day to review against repeated experience.',
    ['Daylight and activity', 'Notice the daytime pattern', 'Consider how time outdoors and activity fit into the ordinary day.'],
    ['Food and drink', 'Notice timing', 'Review whether the timing of caffeine, alcohol or a heavy meal seems to interfere with rest.'],
    ['Across several nights', 'Look for recurrence', 'A single good or bad night offers less to work with than a pattern noticed over time.']),

  'sleep-and-recovery/6-rest-is-not-wasted-time': compare(
    'Distinguish a pause from avoidance', 'Consider what is asking for attention now.',
    ['Ordinary reluctance', 'Beginning feels difficult', 'Recall what experience has shown after a worthwhile activity. A manageable beginning may help.'],
    ['A need for recovery', 'Rest deserves its place', 'Exhaustion or a genuine need to recover can make a pause the reasonable choice. Constant activity is not the measure of discipline.']),
};
