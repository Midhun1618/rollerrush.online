// =====================================================================
//  ROLLER RUSH: SITE CONTENT
//  Everything you will want to edit lives in this file.
//  Lines marked  TODO  are placeholders I could not confirm from your
//  screenshots. Replace them with the real values.
// =====================================================================

export const SITE = {
  name: 'Roller Rush',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.voxcom.rollerrush',
  developerName: 'midhunvox',
  rating: '3+',
  contactEmail: 'voxcom.online@gmail.com',

  // Old privacy policy (Google Sites). Used by privacy.html until you paste
  // the full text there.
  oldPrivacyUrl:
    'https://sites.google.com/d/1Ecr4bmxwaNzxVeRXQVYgQMNv6VnbPlkX/p/1mrruKG1vYmmWb299mmtfiVaIOAWIqiHz/',

  // Trailer: paste a YouTube video id (e.g. 'dQw4w9WgXcQ') OR a file path
  // like '/video/trailer.mp4'. Leave '' to show the placeholder card.
  trailer: '', // TODO

  // Social links. Leave '' to hide a button.
  socials: {
    instagram: '', // TODO
    youtube: '', // TODO
    discord: '', // TODO
  },
};

// ---------------------------------------------------------------------
//  LEADERBOARD
//  Put the URL of your leaderboard data in `url` and the site will use
//  live data. It accepts either:
//    - a JSON array:  [{ "username": "A", "distance": 1200, "skate": "Sonic Wave" }, ...]
//    - a Firebase Realtime Database REST url (…/leaderboard.json) that returns
//      an object of such entries.
//  Field names are configurable below. Leave url '' to use the sample rows.
// ---------------------------------------------------------------------
export const LEADERBOARD = {
  url: '', // TODO
  fields: { username: 'username', distance: 'distance', skate: 'skate' },
  limit: 5,
  sample: [
    { username: 'RushRuby', distance: 4820, skate: 'Infinity' },
    { username: 'VoidRider', distance: 4311, skate: 'Void Reaper' },
    { username: 'SonicSam', distance: 3977, skate: 'Sonic Wave' },
    { username: 'DriftQueen', distance: 3560, skate: 'Drift King' },
    { username: 'PixelPop99', distance: 3102, skate: 'Pixel Pop' },
  ],
};

// ---------------------------------------------------------------------
//  SKATES (from your Skate Market screenshots)
//  stats: [speed, jump, control] out of 100.
//  Only Sonic Wave's bars were readable from your screenshot. The rest are
//  ESTIMATES. TODO: replace with real stats, or set SHOW_ESTIMATED_STATS to false.
// ---------------------------------------------------------------------
export const SHOW_ESTIMATED_STATS = true;

const lvl10 = 'Unlocks at level 10';

export const SKATES = [
  // ---- Starter
  { name: 'Red Street', tier: 'starter', ovr: 3, price: 0, tagline: 'The classic street quad. Where every run begins.', stats: [34, 42, 46] },
  { name: 'Ice Glide', tier: 'starter', ovr: 3, price: 0, tagline: 'Cool-toned quads that forgive every mistake.', stats: [32, 40, 50] },
  { name: 'Sunset Rush', tier: 'starter', ovr: 4, price: 1800, tagline: 'Flame-trim inlines with a warm-up kick.', stats: [44, 40, 42] },
  { name: 'Pixel Pop', tier: 'starter', ovr: 5, price: null, tagline: 'Pixel-art frame with retro attitude.', stats: [48, 46, 50] },
  { name: 'Night Shift', tier: 'starter', ovr: 4, price: 3000, tagline: 'Spiked purple boots for after-dark runs.', stats: [42, 38, 52] },
  // ---- Pro
  { name: 'Aero Blue', tier: 'pro', ovr: 5, price: 5200, tagline: 'Light frame, glowing wheels, clean lines.', stats: [58, 44, 54] },
  { name: 'Nitro Edge', tier: 'pro', ovr: 6, price: 7100, tagline: 'Monster wheels and a red boot with punch.', stats: [64, 52, 56] },
  { name: 'Sonic Wave', tier: 'pro', ovr: 6, price: null, tagline: 'A streamlined speed design.', stats: [80, 30, 60], realStats: true },
  { name: 'Gold Standard', tier: 'pro', ovr: 7, price: 9200, tagline: 'Gold-plated and built to be chased.', stats: [72, 56, 62] },
  { name: 'Drift King', tier: 'pro', ovr: 7, price: 10000, tagline: 'Chunky wheels for sideways style.', stats: [68, 58, 70] },
  // ---- Mythic
  { name: 'Skull Ride', tier: 'mythic', ovr: 9, price: 60000, tagline: 'Bones, big wheels and zero brakes.', stats: [86, 82, 84], new: false },
  { name: 'Cosmic Drift', tier: 'mythic', ovr: 7, unlock: lvl10, tagline: 'Galaxy glow that bends around corners.', stats: [70, 66, 78], specialties: ['Tight turns', 'Night glow'] },
  { name: 'Solar Flare', tier: 'mythic', ovr: 9, unlock: lvl10, tagline: 'Molten orange speed with a long tail of heat.', stats: [90, 76, 80], specialties: ['Top speed', 'Fast starts'] },
  { name: 'Void Reaper', tier: 'mythic', ovr: 9, unlock: lvl10, tagline: 'A dark blade frame that cuts through traffic.', stats: [84, 80, 88], new: true, specialties: ['Sharp control', 'Clean landings'] },
  { name: 'Infinity', tier: 'mythic', ovr: 10, unlock: lvl10, tagline: 'Rainbow trim. Ten out of ten.', stats: [94, 90, 92], new: true, specialties: ['Top speed', 'Big air', 'All-round'] },
];

// Apex has 6 rides in the game that were not in your screenshots.
// They show as "classified" teaser cards until you add them above
// with tier: 'apex' (and then set APEX_TEASER_COUNT to 0).
export const APEX_TEASER_COUNT = 6; // TODO

export const TIERS = [
  { id: 'all', label: 'All' },
  { id: 'starter', label: 'Starter' },
  { id: 'pro', label: 'Pro' },
  { id: 'apex', label: 'Apex' },
  { id: 'mythic', label: 'Mythic' },
];

// ---------------------------------------------------------------------
//  EVENT (placeholder). TODO: edit name, dates, rewards and rules.
// ---------------------------------------------------------------------
export const EVENT = {
  name: 'Rush Cup',
  blurb: 'Skate your farthest in one run and climb the global board before the clock hits zero.',
  endsAt: '2026-12-31T23:59:00+05:30',
  rewards: [
    { place: 'Top 1', prize: 'Exclusive skate' },
    { place: 'Top 5', prize: '5,000 coins' },
    { place: 'Everyone', prize: 'Mystery bubble' },
  ],
  rules: [
    'Beat your best distance on any skate.',
    'Only your single farthest run counts.',
    'Updates every time you finish a run.',
  ],
};

// ---------------------------------------------------------------------
//  UPDATES / ROADMAP (placeholder). TODO: edit to your real plans.
//  status: 'live' | 'next' | 'later'
// ---------------------------------------------------------------------
export const UPDATES = [
  { status: 'live', version: 'v1.0', title: 'Roller Rush is out', text: 'Endless runs, a skate market to climb through, a global leaderboard and mystery bubbles.' },
  { status: 'next', version: '', title: 'Apex series reveal', text: 'Six new Apex skates land in the market, plus fresh rewards for climbing the board.' },
  { status: 'later', version: '', title: 'More streets to skate', text: 'New stages, new obstacles and more ways to earn Rush Rubies.' },
];

// ---------------------------------------------------------------------
//  HOW TO PLAY
// ---------------------------------------------------------------------
export const MOVES = [
  { title: 'Keep the momentum', text: 'Slide, leap and react. Cones, carts and containers all want to stop you. Land on top of a container and keep rolling.', shot: 'move-1' },
  { title: 'Double tap for boost', text: 'Hit the booster when the road opens up and watch the distance counter climb.', shot: 'move-2' },
  { title: 'Pop the bubbles', text: 'Rainbow bubbles hold mystery rewards. Coins and Rush Rubies pay for better skates.', shot: 'move-3' },
];

// ---------------------------------------------------------------------
//  FAQ
// ---------------------------------------------------------------------
export const FAQ = [
  { q: 'Is Roller Rush free?', a: 'Yes. Install it from Google Play and start skating.' },
  { q: 'Which devices does it run on?', a: 'Android phones and tablets, through Google Play.' },
  { q: 'How do I use the booster?', a: 'Double tap the screen while you run.' },
  { q: 'How do I get new skates?', a: 'Earn coins by running, then open the Skate Market. Mythic skates unlock at level 10.' },
  { q: 'How does the leaderboard work?', a: 'The global board ranks players by their farthest single run, and shows the skate they used.' },
  { q: 'Who is it suitable for?', a: 'Roller Rush is rated 3+ on Google Play.' },
];

// ---------------------------------------------------------------------
//  DEVELOPER (from your portfolio)
// ---------------------------------------------------------------------
export const DEV = {
  name: 'Midhun KP',
  studio: 'VoxCom',
  role: 'Android developer and ML student',
  bio: [
    'I build Android apps and AI-powered tools that turn ambitious ideas into working software. Roller Rush started as a way to make a game that feels fast the second you open it.',
    "I'm a final-year CSE student at LPU specialising in machine learning, with hands-on experience in Kotlin, Python, React and Firebase.",
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/midhun1618' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/midhun-kp' },
    { label: 'Email', href: 'mailto:midhunkp.work@gmail.com' },
  ],
  portfolioUrl: '', // TODO: link to your portfolio site (leave '' to hide the button)
  projects: [
    { name: 'Tiki Topple', text: 'Online multiplayer strategy board game on Firebase.' },
    { name: 'VOX', text: 'Android and Windows productivity ecosystem with voice commands.' },
    { name: 'HAAi', text: 'Health assistance AI, live on Google Play.' },
    { name: 'OctoVector AI', text: 'Retrieval-augmented PDF assistant with hybrid search.' },
    { name: 'RepoScope', text: 'GitHub repository analytics with AI insights.' },
  ],
};
