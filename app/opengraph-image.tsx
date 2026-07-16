import { ImageResponse } from 'next/og';
import { COLORS } from './shared/data';
import { RUBIN } from './shared/rubin';

// link-preview card — light tuscan: warm cream, matisse dots, the thesis, a tricolore.
export const alt = 'oscar in tuscany — an application to rick rubin. you bring 40 years of taste, i bring the tools.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const DOTS = [COLORS.orange, COLORS.green, COLORS.red, COLORS.blue, COLORS.purple, '#f2a039'];

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
          background: '#faf6ef',
          color: '#181614',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', height: 22, borderRadius: 4, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,0.12)' }}>
            <div style={{ width: 16, background: '#009246' }} />
            <div style={{ width: 16, background: '#f7f7f0' }} />
            <div style={{ width: 16, background: '#ce2b37' }} />
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: '#74726c' }}>
            {RUBIN.eyebrow} · {RUBIN.host}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 92, fontWeight: 500, letterSpacing: -2, lineHeight: 1 }}>oscar in tuscany</div>
          <div style={{ fontSize: 46, color: '#8e2b3b', lineHeight: 1.15 }}>
            you bring 40 years of taste. i bring the tools.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'sans-serif', fontSize: 26, color: '#74726c' }}>
            music guy turned agent builder · 30 days · toscana
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {DOTS.map((c, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: 10, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
