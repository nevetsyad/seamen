// Seamen - Game Data
// Prompts, rarity tiers, and ocean zones
// PERVY & FUNNY VERSION

// Rarity tiers: each has a depth range, label, and color
// Lower rarity = rarer answer = deeper descent
export const rarityTiers = {
  common: { label: 'Common', depth: 0, color: '#e87575', barClass: 'surface' },
  uncommon: { label: 'Uncommon', depth: 5, color: '#f6ad55', barClass: '' },
  rare: { label: 'Rare', depth: 12, color: '#fbbf24', barClass: 'midnight' },
  epic: { label: 'Epic', depth: 22, color: '#84cc16', barClass: 'abyssal' },
  legendary: { label: 'Legendary', depth: 38, color: '#f87171', barClass: 'hadal' },
  timeout: { label: 'Timeout', depth: -5, color: '#6b7280', barClass: 'surface' },
};

// Ocean depth zones - with personality
export const oceanZones = [
  {
    minDepth: 0,
    name: 'SURFACE',
    label: '0m',
    description: '— sun\'s out, suits out —',
    bgClass: 'surface',
    barClass: 'surface',
    emoji: '🌞',
  },
  {
    minDepth: 40,
    name: 'TWILIGHT ZONE',
    label: '— lighting gets moodier —',
    description: '— shadows, secrets, and questionable decisions —',
    bgClass: 'midnight',
    barClass: 'midnight',
    emoji: '🌙',
  },
  {
    minDepth: 80,
    name: 'MIDNIGHT ZONE',
    label: '— things get… intimate —',
    description: '— most dignity stops here —',
    bgClass: 'midnight',
    barClass: 'midnight',
    emoji: '🌃',
  },
  {
    minDepth: 140,
    name: 'ABYSSAL ZONE',
    label: '— pressure makes things… interesting —',
    description: '— the walls are closing in (and so are your pants) —',
    bgClass: 'abyssal',
    barClass: 'abyssal',
    emoji: '🦑',
  },
  {
    minDepth: 240,
    name: 'HADAL ZONE',
    label: '— named for Hades\' —',
    description: '— the deepest, darkest, horniest depths —',
    bgClass: 'hadal',
    barClass: 'hadal',
    emoji: '👹',
  },
];

// Prompt data - the real reason you're here
// Each answer has a rarity that determines depth gained
export const prompts = [
  {
    question: "What's a sailor's favorite in-flight magazine?",
    answers: [
      { text: "Titanic Traveler", rarity: "common" },
      { text: "Barely Bound", rarity: "uncommon" },
      { text: "Deep Blue Diaries", rarity: "rare" },
      { text: "Salty Secrets Monthly", rarity: "epic" },
      { text: "Kraken Kinks", rarity: "legendary" },
    ],
  },
  {
    question: "What does a mermaid use for birth control?",
    answers: [
      { text: "Sea-weed", rarity: "common" },
      { text: "Dolphin-safe condoms", rarity: "uncommon" },
      { text: "A trident with a warning label", rarity: "rare" },
      { text: "Leftover Atlantis vibes", rarity: "epic" },
      { text: "She doesn't — she's a mermaid, duh", rarity: "legendary" },
    ],
  },
  {
    question: "Why did the pirate go to the tailor?",
    answers: [
      { text: "To patch up his reputation", rarity: "common" },
      { text: "New colors for his flag", rarity: "uncommon" },
      { text: "To shorten his grog-filled sleeves", rarity: "rare" },
      { text: "For pants that actually fit below the waist", rarity: "epic" },
      { text: "His treasure map was an ass-hent", rarity: "legendary" },
    ],
  },
  {
    question: "What's a sailor's least favorite vegetable?",
    answers: [
      { text: "Leeks", rarity: "common" },
      { text: "Celery — too many 'seamen' jokes", rarity: "uncommon" },
      { text: "A whole can of worms", rarity: "rare" },
      { text: "Carrots — good for your eyesight in the dark", rarity: "epic" },
      { text: "Okra — slimy, just like your pick-up lines", rarity: "legendary" },
    ],
  },
  {
    question: "What happens when you drop a sextant?",
    answers: [
      { text: "It points to the nearest bar", rarity: "common" },
      { text: "It breaks into useful shards", rarity: "uncommon" },
      { text: "The compass spins in shame", rarity: "rare" },
      { text: "It sinks like your standards", rarity: "epic" },
      { text: "It lands tip-first between the planks", rarity: "legendary" },
    ],
  },
  {
    question: "Why do sailors make good bedtime stories?",
    answers: [
      { text: "They know how to spin yarns", rarity: "common" },
      { text: "They're experienced with long voyages", rarity: "uncommon" },
      { text: "They've got sea legs for days", rarity: "rare" },
      { text: "They're experienced with deep waters", rarity: "epic" },
      { text: "They've navigated the Bermuda Triangle of your body", rarity: "legendary" },
    ],
  },
  {
    question: "What's a sailor's favorite position?",
    answers: [
      { text: "Missionary over the poop deck", rarity: "common" },
      { text: "Doggy style on the forecastle", rarity: "uncommon" },
      { text: "Reverse cowgirl on the quarterdeck", rarity: "rare" },
      { text: "Cowgirl with full sail", rarity: "epic" },
      { text: "Deeper than the Mariana Trench", rarity: "legendary" },
    ],
  },
  {
    question: "What do you call a sailor with a sunburn in tight briefs?",
    answers: [
      { text: "A crispy sailor", rarity: "common" },
      { text: "Overcooked on the deck", rarity: "uncommon" },
      { text: "Well-done seamen", rarity: "rare" },
      { text: "A sweaty mess at 3am", rarity: "epic" },
      { text: "The main event at the bottom of the trench", rarity: "legendary" },
    ],
  },
  {
    question: "What's a sailor's idea of foreplay?",
    answers: [
      { text: "A good yarn", rarity: "common" },
      { text: "Telling sea shanties", rarity: "uncommon" },
      { text: "Waxing the planks", rarity: "rare" },
      { text: "Lubing up the rigging", rarity: "epic" },
      { text: "A thorough inspection of the cargo hold", rarity: "legendary" },
    ],
  },
  {
    question: "What does a sailor put in his lunchbox?",
    answers: [
      { text: "A sandwich", rarity: "common" },
      { text: "A sausage in a bun", rarity: "uncommon" },
      { text: "A salty dog", rarity: "rare" },
      { text: "Something that looks like a wiener", rarity: "epic" },
      { text: "His own special cargo — long and salty", rarity: "legendary" },
    ],
  },
  {
    question: "Why did the sailor bring a ladder to the bedroom?",
    answers: [
      { text: "To reach the top shelf", rarity: "common" },
      { text: "He heard the sheets were high-thread-count", rarity: "uncommon" },
      { text: "For when she says she's ready for him to 'climb aboard'", rarity: "rare" },
      { text: "To get closer to the ceiling fan", rarity: "epic" },
      { text: "Because she wanted him to 'step up his game'", rarity: "legendary" },
    ],
  },
  {
    question: "What's a sailor's worst nightmare?",
    answers: [
      { text: "Running aground", rarity: "common" },
      { text: "Getting caught in a storm", rarity: "uncommon" },
      { text: "Being seen without his hat", rarity: "rare" },
      { text: "His captain finding his dirty magazines", rarity: "epic" },
      { text: "Drying up like a prune in a desert", rarity: "legendary" },
    ],
  },
];

// Themed prompt packs
export const themedPrompts = {
  pirates: [
    {
      question: "What does a pirate use for… personal pleasure?",
      answers: [
        { text: "His own hand, arrr", rarity: "common" },
        { text: "A compass that always points south", rarity: "uncommon" },
        { text: "The captain's log (don't ask)", rarity: "rare" },
        { text: "The ship's figurehead… seriously", rarity: "epic" },
        { text: "The kraken's tentacles, shiver me timbers", rarity: "legendary" },
      ],
    },
  ],
  mermaids: [
    {
      question: "What's a mermaid's favorite position?",
      answers: [
        { text: "Top-side sunbathing", rarity: "common" },
        { text: "Current-assisted gliding", rarity: "uncommon" },
        { text: "The coral cave cuddle", rarity: "rare" },
        { text: "Deep-sea pressure romance", rarity: "epic" },
        { text: "The abyssal embrace, if you're into that", rarity: "legendary" },
      ],
    },
  ],
};

export default { prompts, themedPrompts, rarityTiers, oceanZones };