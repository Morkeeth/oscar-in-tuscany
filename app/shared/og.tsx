import { ImageResponse } from 'next/og';
import { OSCAR, STATS, modelBySlug, EVAL_MODELS, COMPARE_META } from './data';

// One card, four skins. The furniture (accent row, name, blurb, stats) is identical
// on every model; only the accent and the blurb change. Same idea as the site itself.
// Note: next/og runs on satori, which needs an explicit display on any multi-child div.
export const ogSize = { width: 1200, height: 630 };

export function modelOgImage(slug: string) {
  const m = modelBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#060606',
          color: '#f0ede8',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          borderTop: `12px solid ${m.color}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: m.color }} />
          <div style={{ fontSize: 26, color: m.color, letterSpacing: 1 }}>{m.name}</div>
          <div style={{ fontSize: 26, color: '#4a4842' }}>·</div>
          <div style={{ fontSize: 26, color: '#74726c' }}>{m.badge}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
            {OSCAR.name.toLowerCase()}
          </div>
          <div style={{ fontSize: 30, color: '#74726c', lineHeight: 1.4 }}>{m.desc}</div>
        </div>

        <div style={{ display: 'flex', gap: 56, fontSize: 26, color: '#74726c' }}>
          <span style={{ color: '#f0ede8' }}>{STATS.hackathonWins} hackathon wins</span>
          <span style={{ color: '#f0ede8' }}>{STATS.prizes} in prizes</span>
          <span style={{ color: '#f0ede8' }}>{STATS.terminals} terminals at 3am</span>
        </div>
      </div>
    ),
    ogSize
  );
}

// The compare card. Same furniture as the four model cards above — accent rail on
// top, name row, big lowercase name, blurb, stats row — with exactly ONE thing
// changed: where a model card carries a single accent, this carries all four.
// That IS the page's argument (the model is the only variable), so the card makes
// it at thumbnail size instead of describing it. Copy comes from COMPARE_META, the
// same source /compare's own metadata reads.
export function compareOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#060606',
          color: '#f0ede8',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* The accent rail: one segment per model under eval, in rail order.
            Sits where a model card's single borderTop goes. */}
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0 }}>
          {EVAL_MODELS.map((m) => (
            <div key={m.id} style={{ display: 'flex', flex: 1, height: 12, background: m.color }} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          {EVAL_MODELS.map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: 7, background: m.color }} />
              <div style={{ fontSize: 22, color: m.color, letterSpacing: 1 }}>{m.name}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
            {OSCAR.name.toLowerCase()}
          </div>
          {/* ONE blurb, same slot as a model card's m.desc. The full description
              would only restate this line ("the model is the only variable"), and
              a card that argues its point twice argues it weakly. */}
          <div style={{ fontSize: 30, color: '#74726c', lineHeight: 1.4 }}>{COMPARE_META.cardLine}</div>
        </div>

        <div style={{ display: 'flex', gap: 56, fontSize: 26, color: '#74726c' }}>
          <span style={{ color: '#f0ede8' }}>{EVAL_MODELS.length} models</span>
          <span style={{ color: '#f0ede8' }}>1 brief</span>
          <span style={{ color: '#f0ede8' }}>{STATS.hackathonWins} hackathon wins</span>
          <span style={{ color: '#f0ede8' }}>{STATS.prizes} in prizes</span>
        </div>
      </div>
    ),
    ogSize
  );
}
