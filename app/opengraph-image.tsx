import { ImageResponse } from 'next/og';
import { OSCAR, STATS, COLORS } from './shared/data';

// link-preview card — fable aesthetic: near-black, warm off-white, matisse dots
export const alt = 'oscar morke — pm at ledger, builds agents at night';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DOTS = [COLORS.orange, COLORS.blue, COLORS.red, COLORS.green, COLORS.purple, COLORS.pink];

export default function OpengraphImage() {
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
        <div style={{ display: 'flex', gap: 14 }}>
          {DOTS.map((c) => (
            <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{OSCAR.name.toLowerCase()}</div>
          <div style={{ fontSize: 34, color: '#74726c' }}>
            pm at ledger. i make things on nights and weekends, some of them win prizes.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 56, fontSize: 26, color: '#74726c' }}>
          <span style={{ color: '#f0ede8' }}>{STATS.hackathonWins} hackathon wins</span>
          <span style={{ color: '#f0ede8' }}>{STATS.prizes} in prizes</span>
          <span style={{ color: '#f0ede8' }}>{STATS.terminals} terminals at 3am</span>
        </div>
      </div>
    ),
    size
  );
}
