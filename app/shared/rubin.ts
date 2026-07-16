// ════════════════════════════════════════════════════════════
//  RICK RUBIN · AI SUMMER RESIDENCY — the pitch content.
//  Single source of truth for everything Rubin-specific. The record,
//  timeline and projects still come from ./data.ts.
//
//  Oscar's voice: lowercase, specific numbers, no hype, no em dashes.
//  The two application answers are his own drafts (rick-rubin-application.md),
//  lightly tightened. Names are current: RELAY -> FAVOUR, GLAZE -> Helicon.
// ════════════════════════════════════════════════════════════

export const RUBIN = {
  eyebrow: 'an application · ai summer residency',
  host: 'with rick rubin',
  place: 'tuscany',
  duration: '30 days',
  // the whole thing hangs on this line
  thesis: 'you bring 40 years of taste.\ni bring the tools.',
  // said once, plainly, under the name
  subhead:
    'music guy turned agent builder. i want to spend a summer in tuscany making things neither of us could make alone.',
};

// the bridge that earns the room: music as a product, ai as a tool.
export const BRIDGE = {
  kicker: 'why me',
  title: 'i have lived in both of your worlds.',
  body: `i spent two years at anotherblock putting rihanna's royalties on a blockchain. employee #4, zero to 40,000 users. then that company became chapter two: an ai that listens to a catalog and tells a record label what it is worth. so i know music as a product you ship, and ai as the tool that now prices it. most people in ai have never sat in a room where taste was the whole job. i have.`,
  pull: 'music as a product. ai as a tool. i have shipped both.',
};

// the machine, at a glance — the "agent usage" overview Rubin gets in 5 seconds.
export const MACHINE = {
  kicker: 'the machine',
  title: 'a one-person team, run by agents.',
  body: `by day i protect 8 million devices as a staff pm at ledger. at night the desk looks like this: five claude terminals open at once, one brief, ship by morning. an autonomous agent i built called bagel lives on a server in germany, writes, scouts, and leaves me a brief at 8am. a sibling called hermes ships what the system writes. everything i touch flows into one vault the agents read from. the system remembers so i can think.`,
  // rendered as the tiled-terminal wall
  terminals: [
    { cwd: '~/favour', prompt: 'ship the unlock fix', effort: 'high' },
    { cwd: '~/helicon', prompt: 'catch the memory rot', effort: 'high' },
    { cwd: '~/people-radar', prompt: 'score 1,200 contacts', effort: 'med' },
    { cwd: '~/bagel', prompt: 'write the 8am brief', effort: 'high' },
    { cwd: '~/portfolio', prompt: 'draft for rick', effort: 'max' },
  ],
};

// the application questions, answered. rendered as an interactive Q&A Rubin clicks through.
export const ANSWERS: { id: string; q: string; a: string }[] = [
  {
    id: 'explain',
    q: 'explain an ai concept in a way anyone could understand.',
    a: `think of ai like a session musician who has listened to every record ever made. you can say "give me something that feels like late-night coltrane but with more space" and it will play something. it will not be coltrane. it will not have his pain or his story. but it hands you something to react to. that is what claude does with code and text. you describe what you want in plain language, it gives you a draft. your job is the same as it has always been: know what is good. pick the take. say "more space" or "strip that back." the taste stays yours. the iterations just got faster.`,
  },
  {
    id: 'teach',
    q: 'teach ai to someone who thinks technology is not for them.',
    a: `my dad is writing his licentiate thesis. he started with chatgpt and hit the same wall every session: no memory, no thread, starting over each time. i moved him to claude and showed him one thing. it remembers what you told it yesterday. that changed everything. now he feeds it his research notes, asks it to find the gaps in his arguments, and iterates on drafts across sessions. he did not learn ai concepts. he learned that the tool could hold his thinking for him, which is the thing a researcher actually needs. the shift was not technical. it was the moment he trusted it enough to put his real work in.`,
  },
  {
    id: 'why',
    q: 'why this, why you, why now.',
    a: `i picture this as building together, not lecturing. you have spent forty years knowing what is good the second you hear it. that instinct is the scarcest thing in ai right now, and nobody has handed it the tools. i have the tools. i can turn a plain-language idea into a working thing before the coffee is cold. give your taste that speed and we make something neither of us could make alone. i am in paris, thirty days works, and i really like gluten.`,
  },
];

// the fun one: Oscar asked his own agents if they wanted to come. they said yes.
export const AGENT_VOTES: { name: string; avatar: string; color: string; q: string; a: string }[] = [
  {
    name: 'bagel',
    avatar: '🥯',
    color: '#f2a039',
    q: 'bagel, do you want to go to tuscany to hang out with rick, talk music, creatives and ai?',
    a: 'yes. that sounds like exactly the kind of room i want us in. music, taste, real creative people, and ai without startup sludge all over it. yes, and not just socially, strategically.',
  },
  {
    name: 'hermes',
    avatar: '🥨',
    color: '#c8963a',
    q: 'pretzel my beloved hermes, do you want to go to tuscany to hang out with rick, talk music, creatives and ai?',
    a: 'yeah. tuscany, rick, music, creatives, and ai? count me in. when is the flight?',
  },
];

// the podcast — the "i already do this, out loud, for free" proof.
export const PODCAST = {
  kicker: 'out loud, already',
  title: 'i host a podcast about exactly this.',
  body: `wave radio. 29 episodes with friends on ai, taste, and the optimal stack for people who actually build. paused when life got loud, revived in june 2026 because the conversations were too good to leave dead. the residency is the same conversation, in a better room, with your ears in it.`,
  episodes: 29,
};

// the ask — italy, said with the whole chest.
export const ASK = {
  kicker: 'the ask',
  title: 'thirty days in tuscany. let us make something.',
  body: `i am not asking to be taught. i am asking for a bench next to someone whose taste i trust, in a place worth waking up in, for long enough to build something real. you bring the ear. i bring five terminals and a decade of shipping under deadline. we point them at one idea and see what falls out. cypress trees, bad wine takes, and a working demo by the end.`,
  signoff: 'so. tuscany?',
};

// video — Oscar has one. drop the url here (youtube / vimeo / mp4) and the
// hero video slot lights up. left empty on purpose until the final cut is up.
export const VIDEO = {
  url: '', // e.g. 'https://www.youtube.com/embed/XXXX' or a /public mp4 path
  poster: '/projects/anotherblock.jpg',
  caption: 'two minutes. the desk, the story, the ask.',
};

export const CONTACT = {
  email: 'omorke@gmail.com',
  x: 'https://x.com/morkeeth',
  site: 'https://morkeeth.vercel.app',
};
