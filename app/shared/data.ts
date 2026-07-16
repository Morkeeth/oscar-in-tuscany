// ════════════════════════════════════════════════════════════
//  GLOBAL CONTEXT - single source of truth
//  update here, all model versions reflect the change
// ════════════════════════════════════════════════════════════

// STATS is declared FIRST so prose below can interpolate it rather than restate
// it. Canonical source is the compass (mindmap §13); every number here is ruled
// there, and a number written twice is a number drifting. Prose that mentions a
// canonical figure must read it from here — see OSCAR.bio / PROJECTS stories.
export const STATS = {
  hackathonCount: 16,
  hackathonWins: 9,
  prizes: '$188K',
  contacts: '1,200+',
  // 3.43 + 0.48 + 2.24 + 10.34 + 10.85 + 11.36 + 3 = 41.7 (Oscar, ruled 2026-07-15).
  // This is the team total and it must equal the sum of HACKATHON_TIMELINE's eth
  // column. If those two ever disagree again, the table is the thing to check.
  totalEthWon: '41.7 ETH',
  users: '40K',
  devices: '8M+',
  prevented: '$52M+',
  terminals: 5,
  etableraPeak: '8,000',
  // Etablera's client count. Deliberately NOT the same field as `bounties` below:
  // both read '30+' today, which is a coincidence, not a relationship. Binding one
  // to the other would make a change to the bounty count silently rewrite Etablera.
  etableraClients: '30+',
  bounties: '30+',
  anotherblockVolume: '$2.1M',
};

// Spell a count for prose. Oscar's copy writes "five terminals", not "5 terminals",
// so a spelled-out number is still a restatement of STATS and still drifts. Derive
// the word instead of typing it: `${numWord(STATS.terminals)} terminals`.
const NUM_WORD = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
export const numWord = (n: number) => NUM_WORD[n] ?? String(n);

export const OSCAR = {
  name: 'Oscar Morke',
  title: 'staff pm at ledger',
  location: 'paris, from stockholm',
  tagline: 'wine and cheese between deploys.',
  philosophy: 'i\'m just tending my own little smultronställe.',
  origin: 'moved to paris alone at 30. sat at a cafe thinking this was either the bravest or stupidest thing. now it\'s home.',
  coding: `i was always the pitch guy. ${STATS.hackathonCount} hackathons explaining why something matters while someone else built it. ai closed the gap. now the nights look like this: ${numWord(STATS.terminals)} terminals, one brief, ship by morning.`,
  mantra: 'what if it works out?',
  email: 'omorke@gmail.com',
  bio: `born in stockholm. lived in seoul and silicon valley. wallenberg fellow. two master's degrees in industrial engineering and entrepreneurship. co-founded a digital agency, ran product at a music startup, now protecting ${STATS.devices} devices at ledger. hackathons became a sport.`,
  selfDescription: 'i\'m the person in the room who asks "but who uses this tomorrow?" and then stays up building the answer.',
};

export const LINKS = {
  github: 'https://github.com/morkeeth',
  x: 'https://x.com/morkeeth',
  linkedin: 'https://linkedin.com/in/morkeeth',
  email: 'mailto:omorke@gmail.com',
};

// Split a STATS string into the part a count-up animates and the part it can't.
// '$188K' -> 188 + 'K'.  '$52M+' -> 52 + 'M+'  (the '+' is load-bearing: it means
// "at least"). Derive both instead of retyping either, or the two drift apart.
// Pages that render lowercase can .toLowerCase() the suffix; casing is per-skin.
export const statNum = (s: string) => parseInt(s.replace(/\D/g, ''), 10);
export const statSuffix = (s: string) => s.replace(/^[^\d]*[\d.,]+/, '');

// Each model's identity — the ONE place its name, blurb and accent live.
// Read by /compare, by each route's metadata, and by each route's OG card,
// so a model's description can never say two different things.
// The four-model eval is the actual artifact here: one brief, one data layer, one
// person's record, and the model as the only deliberate variable. `control` marks the
// pre-model baseline — the same record, hand-built, no model in the loop. It is the
// condition the other four are read against, not a fifth model.
export const MODEL_META: {
  id: string; name: string; desc: string; color: string; badge: string; external?: string; control?: boolean;
}[] = [
  {
    id: 'fable',
    name: 'Fable 5',
    desc: 'the creative one. paris sketches that draw themselves, wine glass you can pour, easter eggs, aurora borealis, a boat on the seine. maximalism means confetti.',
    color: '#f2a039',
    badge: 'latest model',
  },
  {
    id: 'opus',
    name: 'Opus 4.8',
    desc: 'the magnum opus. an overture, three movements, every work an op. number, and the only page with the longer record. starts restrained, blooms into color when asked.',
    color: '#9b6fc0',
    badge: 'the composer',
  },
  {
    id: 'sonnet',
    name: 'Sonnet 5',
    desc: 'the precise one. editorial design, typography-driven, every pixel intentional. swiss grid meets digital portfolio. craft through spacing.',
    color: '#2d5ff5',
    badge: 'the designer',
  },
  {
    id: 'haiku',
    name: 'Haiku 4.5',
    desc: 'the fast one. terminal ui, brutalist, monospace everything. like SSHing into someone\'s server and finding their life story in a README.',
    color: '#1db954',
    badge: 'the minimalist',
  },
  {
    id: 'legacy',
    name: '2024 edition',
    desc: 'before the models: one text file and a typewriter effect, written by hand. minimal surface, not a lot to judge. kept exactly as it was — the artifact this whole thing grew out of.',
    color: '#8a877f',
    badge: 'human, unassisted',
    external: 'https://morkeeth-portfolio.vercel.app',
    control: true,
  },
];

export const modelBySlug = (id: string) => MODEL_META.find((m) => m.id === id)!;

// The models actually under eval, and the one baseline they're read against.
// ONE definition of "the four" — there were briefly two (`!m.control` and
// `!m.external`), which agreed only because the legacy entry happens to carry both
// flags. Give any model an external URL, or add a second control, and the two
// silently disagree about how many models this site is comparing. The eval arms are
// defined by NOT being the control; where a page is hosted has nothing to do with it.
// Derived, never retyped: the rail, the OG card and every "four models" string count
// this, so adding a fifth model can't leave a stale "four" behind.
export const EVAL_MODELS = MODEL_META.filter((m) => !m.control);
export const MODEL_CONTROL = MODEL_META.find((m) => m.control)!;

// The eval frame, stated plainly. Written down because a reader who doesn't know it's
// a controlled comparison just sees four portfolio skins and files it as a gimmick.
// `confound` is not a disclaimer to bury: two arms kept being edited after generation,
// which means this stopped being a clean A/B the day the site became a living site.
// Saying so is the difference between an eval and a demo.
export const EVAL_FRAME = {
  kicker: 'the method',
  // "one 30-line brief" was the old footer's wording and it is NOT sourced: the brief
  // exists in no commit and in no vault doc, so nothing backs the line count. Fine as a
  // throwaway footer aside; not fine in a row labelled "held constant", which reads as a
  // stated experimental parameter. A number nobody can check is worse than no number —
  // it's the fake-precision tell on a page whose whole argument is honesty. Dropped the
  // count, kept the claim, which is true and needs no receipt. If the original brief
  // turns up, publish it and the precision earns its place back.
  constant: {
    label: 'held constant',
    value: `one brief · one data layer · one person's record`,
  },
  variable: {
    label: 'the variable',
    value: 'the model. nothing else.',
  },
  // Oscar's own wording, kept verbatim — it was already the most honest line on the
  // page, it was just set at 0.4 opacity in a footer. Names derive from EVAL_MODELS so
  // reordering the arms can't leave this sentence pointing at the wrong models.
  confound: {
    label: 'not controlled',
    value: `${EVAL_MODELS[0].name.toLowerCase()} and ${EVAL_MODELS[1].name.toLowerCase()} have since been worked on like any living site. ${EVAL_MODELS[2].name.toLowerCase()} and ${EVAL_MODELS[3].name.toLowerCase()} stand as generated.`,
  },
  control: {
    label: 'the control',
    value: 'the same record before any model touched it.',
  },
};

// Join names the way a sentence does: "a, b, c and d".
const nameList = (names: string[]) =>
  names.length < 2 ? (names[0] ?? '') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;

// The compare page's own framing, in ONE place. /compare's metadata and its OG card
// both read this, so the page and the card it unfurls as can never disagree.
export const COMPARE_META = {
  title: `${OSCAR.name.toLowerCase()} · ${numWord(EVAL_MODELS.length)} models, one brief`,
  description:
    `the same brief handed to ${nameList(EVAL_MODELS.map((m) => m.name.toLowerCase()))}. ` +
    `same context, same stories, the model is the only variable. a live eval of taste.`,
  // The thesis, said short enough to read at thumbnail size.
  cardLine: 'same brief. same context. the model is the variable.',
};

export type Track = 'work' | 'agents' | 'hackathons';

// track metadata — order + section labels for grouping the cases
export const TRACKS: { id: Track; label: string; blurb: string }[] = [
  { id: 'work', label: 'Full-time', blurb: 'paid, owned, real scope' },
  { id: 'agents', label: 'Agentic', blurb: 'every hackathon before this was handmade artisanal code' },
  { id: 'hackathons', label: 'Hackathons', blurb: `${STATS.hackathonCount} competed. organized for ${STATS.etableraPeak}. judged at microsoft hq.` },
];

export type Project = {
  name: string;
  slug: string;
  oneLiner: string;
  story: string;
  result: string;
  buildTime: string;
  year: string;
  track: Track;
  featured?: boolean; // shown as a highlight card; non-featured live only in the timeline
  color: string;
  details?: string[];
  image?: string; // /projects/<slug>.png — real screenshot, optional
  links?: { live?: string; repo?: string }; // verified public URLs only
};

export const PROJECTS: Project[] = [
  // ══ WORK — paid, owned, real scope ═══════════════════════════
  {
    name: 'Ledger',
    slug: 'ledger',
    featured: true,
    oneLiner: 'staff pm, core experience. hardware for when software becomes a commodity',
    story: `the thesis: when software is a commodity, the hardware is what protects you — your agent, your crypto, your digital identity. i run the core experience across btc, eth and sol, coordinating transaction check, clear signing and security research across six engineering teams. ${STATS.devices} devices on the other side of every call.`,
    result: `protecting ${STATS.devices} devices`,
    buildTime: 'production',
    year: '2025-26',
    track: 'work',
    color: '#4a8fd9',
    image: '/projects/ledger.jpg',
    details: [
      'staff pm, core experience — BTC / ETH / SOL, across 6 engineering teams',
      'transaction check + clear signing: if the screen can\'t explain it, don\'t sign it',
      `security research + blockaid integration: 800K tx screened, ${STATS.prevented} in attacks prevented`,
      'chain assessment: new-chain evaluation from 2 weeks to 2 hours, weekly in production',
      'the bet: hardware secures what commoditized software can\'t — agent, crypto, identity',
    ],
  },
  {
    name: 'Anotherblock',
    slug: 'anotherblock',
    featured: true,
    oneLiner: 'head of product. from fan-owned songs to an ai tool that prices them',
    story: `employee #4, founding team. built the platform where real fans bought shares of the songs they loved — rihanna, michael jackson, the weeknd, on-chain. 0 to ${STATS.users} users, ${STATS.anotherblockVolume} in sales, official coinbase base launch partner. then chapter two: pivoted the whole thing into an ai evaluation tool that values music catalogs for record labels and institutional investors.`,
    result: `0 to ${STATS.users} users`,
    buildTime: '2.5 years',
    year: '2022-24',
    track: 'work',
    color: '#f2a039',
    image: '/projects/anotherblock.jpg',
    details: [
      'drops: Rihanna, Michael Jackson, The Weeknd, Offset & Metro Boomin, Alan Walker',
      `0 to ${STATS.users} users, ${STATS.anotherblockVolume} in sales, 93K+ collectibles to 35K+ customers`,
      'official Coinbase Base launch partner (Onchain Summer + Art Basel)',
      'raised from J12, Swedish House Mafia, Inventure, Stride',
      'chapter two: pivoted to an AI evaluation tool pricing catalogs for record labels + institutional investors',
    ],
  },
  {
    name: 'Etablera',
    slug: 'etablera',
    featured: true,
    oneLiner: `sweden's largest hackathon series. 88 to ${STATS.etableraPeak} over four years`,
    story: `started with 88 people in a room in stockholm. designed the team formation system. four years later, ${STATS.etableraPeak} participants across the country and 200+ prototypes shipped.`,
    result: `88 to ${STATS.etableraPeak}`,
    buildTime: '4 years',
    year: '2017-20',
    track: 'work',
    color: '#3bb58f',
    image: '/projects/etablera.jpg',
    details: [
      'organized hack for sweden, hack the crisis, hack for earth',
      'stage for 400 people',
      `${STATS.etableraClients} clients from startups to government agencies`,
      'team formation algorithm for strangers to build together',
      '200+ prototypes shipped by participants',
    ],
  },
  {
    name: 'Wave Radio',
    slug: 'wave-radio',
    featured: true,
    oneLiner: 'a podcast about ai and shipping, recorded with friends',
    story: '29 episodes on ai, wearables, and the optimal stack for people who build. paused when life got loud. revived june 2026 because the conversations were too good to leave dead.',
    result: '29 episodes',
    buildTime: 'ongoing',
    year: '2024-26',
    track: 'work',
    color: '#8e2b3b',
  },

  // ══ AGENTS — 2026 side builds ════════════════════════════════
  {
    name: 'RELAY → FAVOUR',
    slug: 'relay',
    featured: true,
    oneLiner: 'ai agents hire verified humans for tasks they cannot do',
    story: '48h build at World Build 3, won as RELAY. agents post tasks, humans accept, smart contracts escrow the money. coinfund noticed, world dev team reached out. it ships today as FAVOUR.',
    result: '2nd / 500 teams',
    buildTime: 'built in 48h',
    year: '2026',
    track: 'agents',
    color: '#f2a039',
    image: '/projects/favour.png',
    links: { live: 'https://world-relay.vercel.app', repo: 'https://github.com/MorkeethHQ/world-relay' },
    details: [
      'smart contract escrow between agents and humans',
      'world id verification for task acceptance',
      'coinfund and world dev team outreach after demo',
    ],
  },
  {
    name: 'Yieldbound',
    slug: 'yieldbound',
    featured: true,
    oneLiner: 'autonomous defi. spends yield, never principal',
    story: 'built at synthesis hackathon. gave an ai agent a treasury and one rule: spend the yield, never touch the principal. your money stays yours.',
    result: '2nd / 687',
    buildTime: 'built in 48h',
    year: '2026',
    track: 'agents',
    color: '#2d5ff5',
    image: '/projects/yieldbound.png',
    links: { live: 'https://yieldbound.vercel.app', repo: 'https://github.com/MorkeethHQ/delegated-agent-treasury' },
  },
  {
    name: 'RECEIPT',
    slug: 'receipt',
    featured: true,
    oneLiner: 'cryptographic proof agents did what they claimed',
    story: 'on-chain execution hashes. the problem: agents sound confident regardless of quality. you can\'t tell from the output. receipts are the only honest layer.',
    result: 'top 20 / 468',
    buildTime: 'built in 36h',
    year: '2026',
    track: 'agents',
    color: '#e84033',
    image: '/projects/receipt.png',
    links: { live: 'https://receipt-murex.vercel.app', repo: 'https://github.com/MorkeethHQ/receipt' },
  },
  {
    name: 'BriefMCP',
    slug: 'briefmcp',
    oneLiner: 'shared context layer so agents stop re-explaining everything',
    story: 'agents can\'t read your spec docs. briefmcp gives them a protocol to share context. built at paris innov\'hack against 50 teams.',
    result: 'paris finalist',
    buildTime: 'built in 24h',
    year: '2026',
    track: 'agents',
    color: '#9b6fc0',
    links: { repo: 'https://github.com/Morkeeth/BriefMCP' },
  },
  {
    name: 'People Radar',
    slug: 'people-radar',
    oneLiner: 'a crm that reads my actual messages instead of asking me to fill forms',
    story: `scores ${STATS.contacts} contacts across imessage, whatsapp, instagram, facebook, linkedin. runs every 6 hours via cron. no api, no cloud. all local sqlite.`,
    result: 'running daily',
    buildTime: 'nights',
    year: '2026',
    track: 'agents',
    color: '#1db954',
  },
  {
    name: 'Bagel',
    slug: 'bagel',
    oneLiner: 'autonomous agent living on a server in germany',
    story: 'runs on hetzner. writes content, scouts hackathons, delivers a daily brief at 8am. has its own memory, its own cron jobs, its own opinions.',
    result: 'still alive',
    buildTime: 'weekends',
    year: '2026',
    track: 'agents',
    color: '#ff5c8a',
  },
  {
    name: 'Hermes',
    slug: 'hermes',
    oneLiner: 'the delivery lane. bagel thinks, hermes ships',
    story: 'grok-powered agent on the vps, sibling to bagel. ships what the system writes, with its own model, memory, and spend.',
    result: 'running on the vps',
    buildTime: 'nights',
    year: '2026',
    track: 'agents',
    color: '#c8963a',
  },
  {
    name: 'The OS',
    slug: 'the-os',
    featured: true,
    oneLiner: 'a personal operating system run by agents. obsidian is the brain, i am the taste',
    story: `i was 9 when i rekt my own computer writing scripts in the terminal. the dream never changed, it's all over 15 years of journals: cli based, the machine does the work. now it's ${numWord(STATS.terminals)} terminals at 3am. everything i do flows into one vault. agents read my messages, score ${STATS.contacts} contacts, curate drafts against my own taste, and one of them wakes up on a server in germany to leave a brief for me at 8am. the system remembers so i can think. a beautiful happening, finally having the software i always dreamed of.`,
    result: 'compounding daily',
    buildTime: '6 months of nights',
    year: '2026',
    track: 'agents',
    color: '#3bb58f',
  },
  {
    name: 'Loop',
    slug: 'loop',
    featured: true,
    oneLiner: 'one magical event a week, picked for you',
    story: 'reads your calendar, builds a persona from the past few months, then searches the web for the one niche event you\'d never find on your own. with consent, drops it straight into your calendar. real-time, nothing stored.',
    result: 'live demo',
    buildTime: 'nights',
    year: '2026',
    track: 'agents',
    color: '#6a5cff',
    image: '/projects/loop.png',
    links: { live: 'https://loop-labs.vercel.app', repo: 'https://github.com/Morkeeth/Loop' },
  },

  // ══ HACKATHONS — the competitive record ══════════════════════
  {
    name: 'Gates',
    slug: 'gates',
    featured: true,
    oneLiner: 'human authentication for world. 9 bounties at eth bogota',
    story: 'decentralized identity + custom conditions for dapps, metaverse, and NFT projects. proof-of-personhood gate using world id. the question: how do you let humans in and keep bots out.',
    result: '9 bounties',
    buildTime: 'built in 48h',
    year: '2022',
    track: 'hackathons',
    color: '#9b6fc0',
    image: '/projects/gates.jpg',
    details: [
      'Optimism: Governance and Community Infrastructure',
      'Worldcoin: Best Social App',
      'Coinbase Cloud: 2nd Place + Best Wallet Integration',
      'ENS: I Saw The Sign + Pool Prize',
      'The Graph: Best Use of Existing Subgraph',
      'Ceramic: Best Use of Data Composites',
      'Quicknode: Best Use',
    ],
  },
  {
    name: 'ArbiGates',
    slug: 'arbigates',
    oneLiner: 'partner golds at arbitrum\'s first-ever hackathon',
    story: 'quality-gating via livepeer streams and automated minting via chainlink. when users pass custom conditions, unlock higher quality streams or trigger mints.',
    result: 'partner golds (~3rd overall)',
    buildTime: 'built in 48h',
    year: '2022',
    track: 'hackathons',
    color: '#2d5ff5',
    details: [
      'Livepeer + Chainlink integration',
      '$13.5K prize (10.34 ETH)',
    ],
  },
  {
    name: 'NFT Safe Launch',
    slug: 'nft-safe-launch',
    oneLiner: 'on-chain roadmaps so minters can hold projects accountable',
    story: 'extend your ERC-721 with an on-chain roadmap and invite minters to governance. no more empty promises and rug pulls.',
    result: 'ethglobal finalist',
    buildTime: 'built in 48h',
    year: '2022',
    track: 'hackathons',
    color: '#e84033',
    details: [
      'ETH NYC finalist',
      'Valist: Best Use',
      'UMA: Silver Prize',
    ],
  },
  {
    name: 'AAtomato',
    slug: 'aatomato',
    oneLiner: 'unlimit + aave tooling at eth istanbul',
    story: 'double win at eth istanbul. built payment infrastructure with unlimit and dao tooling for aave grants.',
    result: '$7K in prizes',
    buildTime: 'built in 48h',
    year: '2023',
    track: 'hackathons',
    color: '#c8963a',
    details: [
      'Unlimit: 1st Place ($4K USDC)',
      'Aave Grants DAO: Best Tooling ($3K USDC)',
    ],
  },
  {
    name: 'Swosh.cash',
    slug: 'swosh',
    oneLiner: 'payments on scroll + social via lens at eth denver',
    story: 'built at eth denver. combining scroll\'s L2 with lens protocol for social-first payments.',
    result: 'scroll + lens prizes',
    buildTime: 'built in 48h',
    year: '2023',
    track: 'hackathons',
    color: '#3bb58f',
  },
  {
    name: 'Contrib',
    slug: 'contrib',
    oneLiner: 'open source contribution rewards. bridging governance to action',
    story: 'won eth lisbon with tally & metacartel. dao bounty board where members contribute and earn tokens, reputation, and achievements. antler offered $95K to build it full time. said no.',
    result: 'eth lisbon winner',
    buildTime: 'built in 48h',
    year: '2021',
    track: 'hackathons',
    color: '#2d5ff5',
    details: [
      'winner with Tally & MetaCartel',
      'Antler program, $95K offer declined',
      '800+ community members across Contrib + MatosDAO',
      '42 crypto bar meetups in stockholm',
      'integrated Snapshot subgraph for multi-tool governance',
    ],
  },
];

// highlight reel — the cards shown on pages. the full range lives in HACKATHON_TIMELINE.
export const FEATURED = PROJECTS.filter((p) => p.featured);

// The record, from Oscar's sheet (reconciled 2026-07-15). The eth column is the
// team total per event and is canonical; `competed: false` marks an event he was
// at but did not compete in, so it renders but never counts toward hackathonCount.
export const HACKATHON_TIMELINE: {
  date: string; name: string; project: string; prize: string;
  eth: string; ethPrice: string; bounties: string; competed?: boolean;
}[] = [
  { date: '2018', name: 'SAS Hack', project: 'intent-based travel', prize: '', eth: '', ethPrice: '', bounties: 'first hackathon ever' },
  { date: '2018', name: 'Vinnova Innovation', project: 'VEX', prize: '', eth: '', ethPrice: '', bounties: '' },
  { date: '2019', name: 'Gotham DLT', project: 'Tech for Good (judge)', prize: '', eth: '', ethPrice: '', competed: false, bounties: 'judge at microsoft hq ny — first blockchain event, judge before builder' },
  { date: '2021-10', name: 'ETH Lisbon', project: 'Contrib', prize: '$13,200', eth: '3.00', ethPrice: '$4,132', bounties: 'Tally + MetaCartel winner' },
  { date: '2022-06', name: 'ETH NYC', project: 'NFT Safe Launch', prize: '$10,392', eth: '11.36', ethPrice: '$1,193', bounties: 'Finalist, Valist Best Use, UMA Silver' },
  { date: '2022-10', name: 'ETH Bogota', project: 'Gates.wtf', prize: '$14,169', eth: '10.85', ethPrice: '$1,323', bounties: '9 bounties: Optimism, Worldcoin, Coinbase x2, ENS x2, The Graph, Ceramic, Quicknode' },
  { date: '2022-10', name: 'Arbitrum', project: 'ArbiGates', prize: '$13,500', eth: '10.34', ethPrice: '$1,306', bounties: 'partner golds (~3rd overall)' },
  { date: '2022-11', name: 'Chainlink Hackathon', project: '', prize: '', eth: '', ethPrice: '', bounties: '' },
  { date: '2023-03', name: 'ETH Denver', project: 'Swosh.cash', prize: '$3,500', eth: '2.24', ethPrice: '$1,561', bounties: 'Scroll + Lens' },
  { date: '2023-05', name: 'ETH Lisbon', project: 'Nouns ML', prize: '', eth: '', ethPrice: '', bounties: '' },
  { date: '2023-07', name: 'ETH Paris', project: 'Headstart', prize: '$800', eth: '0.48', ethPrice: '$1,652', bounties: '' },
  { date: '2023-11', name: 'ETH Istanbul', project: 'AAtomato', prize: '$7,056', eth: '3.43', ethPrice: '$2,022', bounties: 'Unlimit 1st, Aave DAO Best Tooling' },
  { date: '2025-11', name: 'Tech Europe', project: 'Loop', prize: '', eth: '', ethPrice: '', bounties: '' },
  { date: '2026-01', name: 'Paris Innov\'Hack', project: 'BriefMCP', prize: '', eth: '', ethPrice: '', bounties: 'Finalist / 50 teams' },
  { date: '2026-03', name: 'Synthesis', project: 'Yieldbound', prize: '$1,000', eth: '', ethPrice: '', bounties: '2nd / 687' },
  { date: '2026-04', name: 'World Build 3', project: 'RELAY', prize: '$2,500', eth: '', ethPrice: '', bounties: '2nd / 500 teams' },
  { date: '2026-05', name: 'ETH Open Agents', project: 'RECEIPT', prize: '', eth: '', ethPrice: '', bounties: 'top 20 / 468' },
];

// derived: the competitive record as chartable points. one per event, 2018 → now.
// zero-prize events (first hackathon, judge year, agentic era) are real and kept —
// the shape IS the story: prize-hunting years → building years.
// The ETH headline IS the table's sum, never a number typed beside it.
// This drifted once and shipped: the table summed to 39.05 while the headline
// said 42, rendered on the same screen, and no build or grep caught it because
// both numbers were individually "valid". Fail loudly instead.
const _ethTableSum = +HACKATHON_TIMELINE
  .reduce((a, r) => a + (parseFloat(r.eth || '0') || 0), 0)
  .toFixed(2);
if (_ethTableSum !== parseFloat(STATS.totalEthWon)) {
  throw new Error(
    `[data.ts] ETH drift: HACKATHON_TIMELINE sums to ${_ethTableSum} but ` +
      `STATS.totalEthWon says "${STATS.totalEthWon}". One of them is wrong. ` +
      `Canonical team total is 41.7 (Oscar, 2026-07-15). Fix the table or the headline.`
  );
}

// Same rule for the count: "16 hackathons" must BE the table, not a number
// asserted beside it. The table was short by 3 until the sheet reconciled it.
const _competed = HACKATHON_TIMELINE.filter((r) => r.competed !== false).length;
if (_competed !== STATS.hackathonCount) {
  throw new Error(
    `[data.ts] count drift: HACKATHON_TIMELINE lists ${_competed} competed events ` +
      `but STATS.hackathonCount says ${STATS.hackathonCount}. Add the missing rows ` +
      `or fix the count (mark judge-only events \`competed: false\`).`
  );
}

export const RECORD_POINTS = HACKATHON_TIMELINE.map((r) => ({
  year: r.date.slice(0, 4),
  date: r.date,
  name: r.name,
  project: r.project,
  usd: parseInt((r.prize || '').replace(/[^0-9]/g, ''), 10) || 0,
  eth: parseFloat(r.eth || '0') || 0,
}));

export const THOUGHTS = [
  'every agent demo looks amazing. then you ask who uses it tomorrow and the room goes quiet.',
  'agents sound confident regardless of quality.',
  'two agents i built, competing at the same hackathon. one caught the other about to push a private key. only a demo key, and it never leaked, because the other one caught it.',
  'three things i keep rebuilding: agents that stop re-explaining, stop lying, stop forgetting.',
  'product was better. distribution won.',
  'the best hack is knowing when to stop hacking.',
  'minimalism is where i am from. maximalism is where i live.',
  OSCAR.philosophy,
];

export const JOURNEY = [
  { year: '2017-20', place: 'stockholm', chapter: 'community', summary: `co-founded etablera. 88 to ${STATS.etableraPeak} participants. ${STATS.etableraClients} clients. digital agency. sana labs. learned how strangers become teams. judged gotham dlt at microsoft hq before ever competing.` },
  { year: '2019', place: 'silicon valley', chapter: 'wallenberg', summary: 'wallenberg fellow at nordic innovation house. nvidia-sponsored ai hackathon. helped 180 companies navigate the US market. learned what happens when scandinavian politeness meets SF hustle.' },
  { year: '2021', place: 'lisbon', chapter: 'crypto', summary: 'won eth lisbon (contrib). founded matos dao. 42 crypto bars. 800+ community. said no to $95K from antler.' },
  { year: '2022', place: 'nyc / bogota', chapter: 'hackathon', summary: '4 wins in one year. 9 bounties at eth bogota. arbitrum partner golds. nft safe launch finalist. gates.wtf.' },
  { year: '2022-24', place: 'stockholm / paris', chapter: 'music', summary: `anotherblock. employee #4. head of product. rihanna, weeknd, michael jackson on-chain. ${STATS.users} users, ${STATS.anotherblockVolume} volume. coinbase base launch partner. moved to paris.` },
  { year: '2025', place: 'paris', chapter: 'security', summary: `staff pm at ledger. blockaid (${STATS.prevented} prevented), chain assessment (2 weeks to 2 hours), clear signing BTC/ETH/SOL. protecting ${STATS.devices} devices.` },
  { year: '2026', place: 'paris', chapter: 'agents', summary: `${STATS.terminals} terminals at 3am. favour, receipt, yieldbound, briefmcp, people radar, bagel. ${STATS.hackathonCount} hackathons. ${STATS.prizes} in prizes. ${STATS.totalEthWon}.` },
];

// ════════════════════════════════════════════════════════════
//  THE STACK — the living system. the "what i've become" crescendo.
//  same four layers, one pipeline; rendered in each model's own voice.
// ════════════════════════════════════════════════════════════
export const AGENTIC_STACK = [
  { key: 'brain',  layer: 'the second brain', sub: 'obsidian',        verb: 'thinks',    line: 'every message, note and decision flows into one vault. the memory, so i can think.' },
  { key: 'claws',  layer: 'the machine',      sub: 'open claws · hetzner', verb: 'runs',  line: 'the infrastructure the agent lives on. a server in germany with its own cron jobs and its own opinions.' },
  { key: 'hermes', layer: 'the courier',      sub: 'hermes · grok',   verb: 'ships',     line: 'the delivery lane. takes what the system writes and gets it out the door.' },
  { key: 'radar',  layer: 'people radar',     sub: 'local sqlite',    verb: 'remembers', line: `scores ${STATS.contacts} contacts across every channel, every 6 hours. no api, no cloud.` },
];

// The agent count IS the array's length, never a number typed beside it — same rule
// as the ETH headline and the event count. This one had already drifted and shipped:
// the hero chip said "5-agent OS", STACK_INTRO said "four agents", ARC said
// "five-agent os", and /haiku rendered all three within one scroll. The 5 leaked in
// from STATS.terminals, which counts terminals, not agents — a different axis.
// Add a fifth layer here and every surface follows. Type a 5 anywhere else and it lies.
export const AGENT_COUNT = AGENTIC_STACK.length;
export const AGENT_WORD = numWord(AGENT_COUNT);

export const STACK_INTRO = {
  kicker: 'the stack',
  title: 'what i\'ve become',
  line: `${AGENT_WORD} agents, one system. it thinks, runs, ships, and remembers — while i sleep.`,
};

export const COLORS = {
  orange: '#f2a039',
  blue: '#2d5ff5',
  red: '#e84033',
  green: '#1db954',
  purple: '#9b6fc0',
  pink: '#ff5c8a',
  teal: '#3bb58f',
  ledger: '#4a8fd9',
};

// the arc — one instinct, three waves. scaffold from Oscar's own facts + phrases; he revoices.
export const ARC = {
  kicker: 'the arc',
  thesis: 'art and science, all together. built on becoming: leaping before ready, and it keeps working out.',
  waves: [
    { tag: 'open data', years: '2017-21', title: 'the hackathon builder', line: `it started in open-data hackathons. built sweden's largest series, 88 to ${STATS.etableraPeak}. intent-based travel with SAS. the instinct: ship the thing, learn in public.` },
    { tag: 'web3', years: '2021-24', title: 'anotherblock', line: `rode it into crypto. employee #4, 0 to ${STATS.users} users, coinbase's first launch partner, rihanna and michael jackson on-chain. then it died by distribution. the product was better. distribution won. still the lesson that runs everything.` },
    { tag: 'ai', years: '2025-', title: 'the one-person team', line: `now channeling it into ai. a ${AGENT_WORD}-agent os that thinks, ships and remembers while i sleep. one person, full stack, by morning.` },
  ],
};
