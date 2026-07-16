'use client';

// ════════════════════════════════════════════════════════════
//  oscar in tuscany — an application to rick rubin's ai summer residency
//  fable language (dark, matisse, hand-drawn), tuscany-tinted.
//  content: ../shared/rubin (pitch) + ../shared/data (the record)
//  the paint, the wine and the confetti live here.
// ════════════════════════════════════════════════════════════

import './fable/fable.css';
import { motion, useInView, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { OSCAR, LINKS, STATS, statNum, FEATURED, HACKATHON_TIMELINE, COLORS, AGENT_COUNT } from './shared/data';
import { RUBIN, BRIDGE, MACHINE, ANSWERS, AGENT_VOTES, PODCAST, ASK, VIDEO, CONTACT } from './shared/rubin';

const PALETTE = Object.values(COLORS);
// wine + gold live in fable.css, not the COLORS object — mirror them here for sketches
const WINE = '#8e2b3b';

// deterministic pseudo-random — rounded so SSR and client agree (see data.ts note)
function rnd(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1e6) / 1e6;
}

// ── primitives ──────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function ChapterLabel({ text }: { text: string }) {
  return <div className="mono chapter-label">{text}</div>;
}

function SketchUnderline({ width = 180, delay = 0.4 }: { width?: number; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <svg ref={ref} viewBox={`0 0 ${width} 12`} fill="none" style={{ width, height: 12, display: 'block', marginTop: 6 }}>
      {inView && (
        <motion.path
          d={`M2 8 C${width * 0.2} 3 ${width * 0.4} 11 ${width * 0.6} 6 C${width * 0.8} 2 ${width * 0.95} 9 ${width - 2} 5`}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay }}
        />
      )}
    </svg>
  );
}

function TypedText({
  text, delay = 0, speed = 26, keepCursor = false, className = 'mono', style,
}: { text: string; delay?: number; speed?: number; keepCursor?: boolean; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++; setN(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay * 1000);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [inView, text, delay, speed]);
  const done = n >= text.length;
  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, n)}
      {(!done || keepCursor) && <span className="blink">▌</span>}
    </span>
  );
}

function Counter({ to, prefix = '', suffix = '', duration = 1.4 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// ── tuscany sketches ────────────────────────────────────────

function useDrawn() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return { ref, inView };
}
const drawProps = (inView: boolean, delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: inView ? { pathLength: 1, opacity: 1 } : {},
  transition: { duration: 1.6, ease: 'easeInOut' as const, delay },
});

// rolling hills + a row of cypress trees + a vespa that putters across in maximalism
function CypressHills({ maximalism }: { maximalism: boolean }) {
  const { ref, inView } = useDrawn();
  const cypress = [70, 96, 118, 250, 276, 300, 322, 470, 496];
  return (
    <div style={{ width: '100%', maxWidth: 640, position: 'relative' }}>
      <svg ref={ref} viewBox="0 0 560 200" fill="none" className="sketch" style={{ width: '100%' }}>
        {/* sun */}
        <circle className="msf" cx="470" cy="52" r="30" fill={COLORS.orange} />
        <motion.circle cx="470" cy="52" r="30" stroke="currentColor" strokeWidth="1.4" {...drawProps(inView)} />
        {/* far hill */}
        <path className="msf" d="M0 120 C120 92 240 132 360 108 C440 92 500 116 560 104 L560 200 L0 200 Z" fill={COLORS.green} opacity={0.5} />
        <motion.path d="M0 120 C120 92 240 132 360 108 C440 92 500 116 560 104" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...drawProps(inView, 0.2)} />
        {/* near hill */}
        <path className="msf" d="M0 160 C140 138 300 176 420 150 C500 134 540 156 560 150 L560 200 L0 200 Z" fill={WINE} opacity={0.55} />
        <motion.path d="M0 160 C140 138 300 176 420 150 C500 134 540 156 560 150" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...drawProps(inView, 0.45)} />
        {/* cypress row */}
        {cypress.map((x, i) => {
          const base = 118 + (i % 3) * 8;
          const h = 46 + (i % 4) * 9;
          const d = `M${x} ${base} C${x - 6} ${base - h * 0.5} ${x - 3} ${base - h} ${x} ${base - h - 6} C${x + 3} ${base - h} ${x + 6} ${base - h * 0.5} ${x} ${base} Z`;
          return (
            <g key={x}>
              <path className="msf" d={d} fill={COLORS.teal} />
              <motion.path d={d} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" {...drawProps(inView, 0.6 + i * 0.06)} />
            </g>
          );
        })}
        {/* vespa putters across the road in maximalism */}
        <motion.g className="boat"
          animate={maximalism ? { x: [-40, 600] } : { x: -40 }}
          transition={maximalism ? { duration: 14, repeat: Infinity, ease: 'linear' } : { duration: 0 }}>
          <g transform="translate(0 178)">
            <circle cx="6" cy="6" r="6" fill="none" stroke={COLORS.red} strokeWidth="2" />
            <circle cx="30" cy="6" r="6" fill="none" stroke={COLORS.red} strokeWidth="2" />
            <path d="M6 6 L18 6 C22 6 22 -4 28 -4 L34 -4 L30 6" fill={COLORS.blue} />
            <path d="M14 -3 L20 -12 L24 -12" stroke={COLORS.blue} strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </motion.g>
      </svg>
      <span className="mono" style={{ position: 'absolute', right: 6, bottom: -14, fontSize: 9, letterSpacing: '0.18em', opacity: 0.3, textTransform: 'uppercase' }}>
        val d{'’'}orcia · 43°N
      </span>
    </div>
  );
}

// a chianti pour — click to fill, captions in italian
function ChiantiGlass() {
  const { ref, inView } = useDrawn();
  const [level, setLevel] = useState(0);
  const captions = ['versane uno', 'un bicchiere', 'e due, dai', 'salute'];
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg ref={ref} viewBox="0 0 60 100" fill="none" className="sketch"
        style={{ width: 'clamp(34px, 5vw, 48px)', cursor: 'pointer' }}
        onClick={() => setLevel((l) => (l + 1) % 4)}>
        <defs><clipPath id="chianticlip"><path d="M10 8 C10 36 20 48 30 48 C40 48 50 36 50 8 Z" /></clipPath></defs>
        <motion.rect className="wine-fill" x="8" width="44" clipPath="url(#chianticlip)"
          animate={{ y: 48 - level * 13, height: level * 13 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }} />
        <motion.path d="M10 8 C10 36 20 48 30 48 C40 48 50 36 50 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView)} />
        <motion.path d="M10 8 C18 5 42 5 50 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={0.5} {...drawProps(inView, 0.3)} />
        <motion.path d="M30 48 L30 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView, 0.5)} />
        <motion.path d="M14 90 C22 86 38 86 46 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView, 0.7)} />
      </svg>
      <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', opacity: 0.3, textTransform: 'uppercase' }}>{captions[level]}</span>
    </div>
  );
}

function Equalizer() {
  const bars = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      d: 0.45 + rnd(i) * 0.75,
      h: 20 + rnd(i * 3 + 2) * 75,
      ad: -rnd(i * 5 + 4) * 1.5,
      c: PALETTE[Math.floor(rnd(i * 11 + 7) * PALETTE.length)],
    })), []);
  return (
    <div className="eq" title="turn it up">
      {bars.map((b, i) => (
        <span key={i} style={{ '--d': `${b.d}s`, '--h': `${b.h}%`, '--ad': `${b.ad}s`, '--bar-c': b.c } as React.CSSProperties} />
      ))}
    </div>
  );
}

// ── matisse cut-outs (floating, maximalism only) ────────────

function ShapeGlyph({ shape, color, size = 14 }: { shape: number; color: string; size?: number }) {
  if (shape === 0) return <svg width={size} height={size} viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill={color} /></svg>;
  if (shape === 1) return <svg width={size} height={size * 1.6} viewBox="0 0 12 20"><path d="M6 1 C2 5 1 12 6 19 C11 12 10 5 6 1Z" fill={color} /></svg>;
  if (shape === 2) return <svg width={size} height={size} viewBox="0 0 20 20"><path d="M10 1 L12.2 7.6 L19 7.6 L13.6 12 L15.8 19 L10 14.6 L4.2 19 L6.4 12 L1 7.6 L7.8 7.6Z" fill={color} /></svg>;
  return <svg width={size} height={size} viewBox="0 0 20 20"><path d="M2 18 L2 2 L18 2 C18 11 11 18 2 18Z" fill={color} /></svg>;
}

const CUTOUTS: { shape: number; color: string; size: number; top: string; left?: string; right?: string; rot: number; beat?: boolean }[] = [
  { shape: 1, color: COLORS.orange, size: 60, top: '6%', right: '8%', rot: -14 },
  { shape: 0, color: COLORS.teal, size: 50, top: '13%', left: '6%', rot: 0 },
  { shape: 3, color: WINE, size: 42, top: '22%', right: '13%', rot: 24 },
  { shape: 2, color: COLORS.orange, size: 38, top: '30%', left: '9%', rot: 12 },
  { shape: 0, color: COLORS.red, size: 54, top: '38%', right: '7%', rot: 0, beat: true },
  { shape: 1, color: COLORS.green, size: 46, top: '46%', left: '5%', rot: 18 },
  { shape: 2, color: COLORS.orange, size: 34, top: '55%', right: '11%', rot: -20 },
  { shape: 3, color: COLORS.teal, size: 48, top: '63%', left: '8%', rot: -8 },
  { shape: 1, color: WINE, size: 52, top: '72%', right: '6%', rot: 10 },
  { shape: 0, color: COLORS.orange, size: 40, top: '80%', left: '10%', rot: 0 },
  { shape: 2, color: COLORS.green, size: 42, top: '88%', right: '12%', rot: 32 },
];

function Cutouts({ maximalism }: { maximalism: boolean }) {
  return (
    <>
      {CUTOUTS.map((c, i) => (
        <div key={i} className={`cutout ${c.beat ? 'beat' : ''}`}
          style={{ top: c.top, left: c.left, right: c.right,
            transform: `rotate(${c.rot}deg) scale(${maximalism ? 1 : 0.4})`, '--fd': `${7 + rnd(i) * 6}s` } as React.CSSProperties}>
          <ShapeGlyph shape={c.shape} color={c.color} size={c.size} />
        </div>
      ))}
    </>
  );
}

// ── confetti / cursor trail ─────────────────────────────────

type Piece = { id: number; x: number; y: number; dx: number; dy: number; rot: number; color: string; shape: number; scale: number };
function useBurst() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const counter = useRef(0);
  const burst = useCallback((x: number, y: number, count = 24, color?: string) => {
    const next: Piece[] = [];
    for (let i = 0; i < count; i++) {
      counter.current++;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.7;
      const dist = 90 + Math.random() * 240;
      next.push({ id: counter.current, x, y, dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist * 0.8 - 70,
        rot: Math.random() * 540 - 270, color: color && Math.random() > 0.4 ? color : PALETTE[Math.floor(Math.random() * PALETTE.length)],
        shape: Math.floor(Math.random() * 4), scale: 0.6 + Math.random() });
    }
    setPieces((p) => [...p, ...next]);
    const ids = new Set(next.map((p) => p.id));
    setTimeout(() => setPieces((p) => p.filter((pc) => !ids.has(pc.id))), 1800);
  }, []);
  return { pieces, burst };
}
function ConfettiLayer({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map((p) => (
        <motion.div key={p.id} className="confetti-piece" style={{ left: p.x, top: p.y }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: p.scale }}
          animate={{ x: p.dx, y: p.dy + 160, rotate: p.rot, opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 0.6, 0.4, 1] }}>
          <ShapeGlyph shape={p.shape} color={p.color} size={13} />
        </motion.div>
      ))}
    </>
  );
}
function CursorTrail({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; shape: number }[]>([]);
  const counter = useRef(0);
  useEffect(() => {
    if (!active) { setParticles([]); return; }
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.35) return;
      counter.current++;
      setParticles((prev) => [...prev.slice(-13), { id: counter.current, x: e.clientX, y: e.clientY,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)], shape: Math.floor(Math.random() * 4) }]);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [active]);
  if (!active) return null;
  return (
    <>
      {particles.map((p) => (
        <motion.div key={p.id} className="cursor-particle" style={{ left: p.x - 5, top: p.y - 5 }}
          initial={{ scale: 1, opacity: 0.85, rotate: 0 }} animate={{ scale: 0, opacity: 0, y: -34, rotate: 120 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}>
          <ShapeGlyph shape={p.shape} color={p.color} size={11} />
        </motion.div>
      ))}
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function ScatterName({ text }: { text: string }) {
  return (
    <h1 className="serif" style={{ fontSize: 'clamp(2.4rem, 8.5vw, 5.4rem)', letterSpacing: '-0.03em', lineHeight: 1, fontWeight: 400 }}>
      {text.split('').map((ch, i) => (
        ch === ' ' ? <span key={i}>&nbsp;</span> : (
          <motion.span key={i} style={{ display: 'inline-block', cursor: 'default' }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -12, rotate: rnd(i) * 16 - 8, transition: { type: 'spring', stiffness: 300, damping: 10 } }}>
            {ch}
          </motion.span>
        )
      ))}
    </h1>
  );
}

// ── the terminal wall (the "agent usage" glance, recreated live) ──

function TerminalWall({ maximalism }: { maximalism: boolean }) {
  const dots = ['#ff5f57', '#febc2e', '#28c840'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, width: '100%' }}>
      {MACHINE.terminals.map((t, i) => {
        const c = PALETTE[i % PALETTE.length];
        return (
          <Reveal key={t.cwd} delay={i * 0.09}>
            <motion.div whileHover={{ y: -4 }}
              style={{
                border: `1px solid ${maximalism ? c : 'var(--fg-faint)'}`,
                borderRadius: maximalism ? 12 : 6,
                background: maximalism ? `color-mix(in srgb, ${c} 8%, #111)` : '#0d0d0c',
                padding: '10px 12px 14px', fontFamily: 'var(--font-jetbrains-mono), monospace',
                transform: `rotate(${(rnd(i * 7 + 1) * 3 - 1.5).toFixed(2)}deg)`,
                transition: 'border-color .6s, background .6s, border-radius .6s',
                boxShadow: maximalism ? `5px 5px 0 color-mix(in srgb, ${c} 22%, transparent)` : 'none',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                {dots.map((d) => <span key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: d, opacity: 0.9 }} />)}
                <span style={{ marginLeft: 6, fontSize: 8.5, letterSpacing: '0.06em', opacity: 0.5, color: '#f0ede8' }}>Claude Code</span>
              </div>
              <div style={{ fontSize: 9.5, lineHeight: 1.7, color: '#f0ede8' }}>
                <div style={{ color: c, fontWeight: 500 }}>Opus 4.8 <span style={{ opacity: 0.5 }}>· Max</span></div>
                <div style={{ opacity: 0.45 }}>{t.cwd}</div>
                <div style={{ marginTop: 6, opacity: 0.85 }}>
                  <span style={{ color: c }}>{'>'}</span> {t.prompt}<span className="blink">▌</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4 }}>
                  bypass on · {t.effort} effort
                </div>
              </div>
            </motion.div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ── the answers (interactive accordion Rubin clicks through) ──

function QandA() {
  const [open, setOpen] = useState<string>(ANSWERS[0].id);
  return (
    <div style={{ width: '100%', maxWidth: 620 }}>
      {ANSWERS.map((item, i) => {
        const c = PALETTE[i % PALETTE.length];
        const isOpen = open === item.id;
        return (
          <Reveal key={item.id} delay={i * 0.08}>
            <div style={{ borderBottom: '1px solid color-mix(in srgb, currentColor 12%, transparent)' }}>
              <button onClick={() => setOpen(isOpen ? '' : item.id)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'inherit',
                  cursor: 'pointer', padding: '20px 0', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span className="mono" style={{ fontSize: 11, color: c, opacity: 0.9, transform: 'translateY(3px)' }}>0{i + 1}</span>
                <span className="serif" style={{ fontSize: 'clamp(1.05rem, 2.7vw, 1.4rem)', lineHeight: 1.35, flex: 1 }}>{item.q}</span>
                <motion.span className="mono" animate={{ rotate: isOpen ? 45 : 0 }} style={{ fontSize: 20, color: c, lineHeight: 1 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                    <p className="body-text" style={{ maxWidth: '100%', paddingBottom: 24, marginLeft: 28, opacity: 0.72, fontSize: 15 }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ── the agents said yes (styled telegram-ish chat cards) ────

function AgentChat() {
  return (
    <div style={{ display: 'grid', gap: 20, width: '100%', maxWidth: 600 }}>
      {AGENT_VOTES.map((v, i) => (
        <Reveal key={v.name} delay={i * 0.12}>
          <div style={{ border: `1px solid color-mix(in srgb, ${v.color} 40%, transparent)`, borderRadius: 16,
            padding: 16, background: `color-mix(in srgb, ${v.color} 5%, transparent)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{v.avatar}</span>
              <span className="mono" style={{ fontSize: 12, color: v.color, letterSpacing: '0.04em' }}>{v.name}</span>
              <span className="mono" style={{ fontSize: 9, opacity: 0.4, marginLeft: 'auto', textTransform: 'uppercase', letterSpacing: '0.12em' }}>agent · telegram</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <p style={{ fontSize: 13, lineHeight: 1.55, background: 'color-mix(in srgb, currentColor 8%, transparent)',
                padding: '9px 13px', borderRadius: '13px 13px 3px 13px', maxWidth: '85%', opacity: 0.8 }}>{v.q}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, background: `color-mix(in srgb, ${v.color} 14%, transparent)`,
                border: `1px solid color-mix(in srgb, ${v.color} 30%, transparent)`,
                padding: '10px 14px', borderRadius: '13px 13px 13px 3px', maxWidth: '90%' }}>{v.a}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ── the record (compact interactive timeline) ───────────────

function RecordTimeline() {
  const rows = HACKATHON_TIMELINE.filter((r) => r.competed !== false);
  return (
    <div style={{ width: '100%', maxWidth: 640 }}>
      {rows.map((r, i) => {
        const c = PALETTE[i % PALETTE.length];
        return (
          <div key={`${r.date}-${r.name}`} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '9px 0',
            borderBottom: '1px solid color-mix(in srgb, currentColor 7%, transparent)', flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 10, opacity: 0.4, width: 52, flexShrink: 0 }}>{r.date}</span>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0, transform: 'translateY(-1px)' }} />
            <span className="serif" style={{ fontSize: 15 }}>{r.name}</span>
            {r.project && <span style={{ fontSize: 12, opacity: 0.45 }}>{r.project}</span>}
            <span className="mono" style={{ fontSize: 10, opacity: 0.55, marginLeft: 'auto', color: c }}>
              {r.prize || (r.bounties ? r.bounties.split(',')[0] : '')}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── the video slot ──────────────────────────────────────────

function VideoBlock() {
  if (VIDEO.url) {
    const isEmbed = /youtube|vimeo|player\./.test(VIDEO.url);
    return (
      <div style={{ width: '100%', maxWidth: 640, aspectRatio: '16 / 9', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--fg-faint)', marginInline: 'auto' }}>
        {isEmbed
          ? <iframe src={VIDEO.url} style={{ width: '100%', height: '100%', border: 0 }} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          : <video src={VIDEO.url} poster={VIDEO.poster} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
    );
  }
  return (
    <div style={{ width: '100%', maxWidth: 640, aspectRatio: '16 / 9', borderRadius: 12, marginInline: 'auto',
      border: '1px dashed color-mix(in srgb, currentColor 30%, transparent)', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
      <span className="serif" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)' }}>▶ the two-minute film</span>
      <span className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: '0.06em' }}>{VIDEO.caption}</span>
      <span className="mono" style={{ fontSize: 9, opacity: 0.3, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.14em' }}>drops in here on final cut</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  page
// ════════════════════════════════════════════════════════════

const STAT_ITEMS = [
  { to: STATS.hackathonWins, prefix: '', suffix: '', label: 'hackathon wins' },
  { to: statNum(STATS.users), prefix: '', suffix: 'k', label: 'users shipped to' },
  { to: AGENT_COUNT, prefix: '', suffix: '', label: 'agents on the team' },
  { to: PODCAST.episodes, prefix: '', suffix: '', label: 'podcast episodes' },
];

export default function Home() {
  const [maximalism, setMaximalism] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pieces, burst } = useBurst();

  useEffect(() => {
    const original = document.title;
    const onVis = () => { document.title = document.hidden ? 'ci vediamo in toscana' : original; };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); document.title = original; };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = useCallback((x?: number, y?: number) => {
    setMaximalism((m) => { if (!m && x !== undefined && y !== undefined) burst(x, y, 28); return !m; });
  }, [burst]);

  return (
    <div className={`page-wrapper ${maximalism ? 'maximalism' : ''}`}
      style={{ background: maximalism ? 'var(--max-bg)' : 'var(--bg)', color: maximalism ? 'var(--max-fg)' : 'var(--fg)' }}
      onDoubleClick={(e) => { if (maximalism) burst(e.clientX, e.clientY, 12); }}>

      <ScrollProgress />
      <CursorTrail active={maximalism} />
      <ConfettiLayer pieces={pieces} />
      <Cutouts maximalism={maximalism} />

      <AnimatePresence>
        {(scrolled || maximalism) && (
          <motion.button className="mini-switch" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            onClick={(e) => toggle(e.clientX, e.clientY)}>
            {maximalism ? '○ sobrio' : '● festa'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── hero ── */}
      <section className="frame">
        <div className="boot-lines" style={{ opacity: 0.3 }}>
          {['$ ssh oscar@tuscany', '$ ./apply --to rick-rubin', 'ready.'].map((line, i) => (
            <motion.div key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.5, duration: 0.4 }}>{line}</motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', maxWidth: 760 }}>
          <motion.p className="mono" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.1, duration: 1 }}
            style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 22 }}>
            {RUBIN.eyebrow} · {RUBIN.host}
          </motion.p>
          <ScatterName text={OSCAR.name.toLowerCase()} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
            <SketchUnderline width={300} delay={1.6} />
          </motion.div>
          <motion.p className="serif" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)', lineHeight: 1.25, marginTop: 30, fontWeight: 400, whiteSpace: 'pre-line' }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} transition={{ delay: 1.7, duration: 1 }}>
            {RUBIN.thesis}
          </motion.p>
          <motion.p style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)', marginTop: 22, fontWeight: 300, opacity: 0.62, maxWidth: 540, marginInline: 'auto' }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.62 }} transition={{ delay: 2, duration: 1 }}>
            {RUBIN.subhead}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 28 }}>
            {([
              { t: 'ex-anotherblock · music on-chain', c: COLORS.orange },
              { t: `${STATS.hackathonWins}× hackathon winner`, c: COLORS.teal },
              { t: `${AGENT_COUNT}-agent os · ships by morning`, c: COLORS.green },
              { t: 'staff pm · ledger', c: COLORS.ledger },
            ] as const).map((chip) => (
              <span key={chip.t} className="mono" style={{ fontSize: 11, letterSpacing: '0.04em', padding: '7px 14px', borderRadius: 999,
                border: `1.5px solid color-mix(in srgb, ${chip.c} 55%, transparent)`, background: `color-mix(in srgb, ${chip.c} 13%, transparent)`, color: chip.c }}>
                {chip.t}
              </span>
            ))}
          </motion.div>
          <motion.p className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', marginTop: 40, textTransform: 'uppercase' }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 2.7, duration: 1 }}>scroll</motion.p>
        </div>
      </section>

      {/* ── why me: the music bridge ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal><ChapterLabel text={BRIDGE.kicker} /><h2 className="serif chapter-title">{BRIDGE.title}</h2></Reveal>
          <Reveal delay={0.15}><p className="body-text" style={{ marginTop: 22 }}>{BRIDGE.body}</p></Reveal>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 36 }}>
              <Equalizer />
              <p className="serif" style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.5rem)', marginTop: 20, opacity: 0.9 }}>{BRIDGE.pull}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the machine: agent usage at a glance ── */}
      <section className="frame">
        <div style={{ maxWidth: 720, width: '100%' }}>
          <Reveal><ChapterLabel text={MACHINE.kicker} /><h2 className="serif chapter-title">{MACHINE.title}</h2></Reveal>
          <Reveal delay={0.15}><p className="body-text" style={{ marginTop: 22, marginBottom: 34, maxWidth: 540 }}>{MACHINE.body}</p></Reveal>
          <TerminalWall maximalism={maximalism} />
        </div>
      </section>

      {/* ── numbers ── */}
      <section className="frame frame-short">
        <div style={{ display: 'flex', gap: 'clamp(30px, 6vw, 64px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {STAT_ITEMS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.12}>
              <div style={{ textAlign: 'center' }}>
                <div className="serif" style={{ fontSize: 'clamp(2rem, 6vw, 3.4rem)', lineHeight: 1 }}>
                  <Counter to={n.to} prefix={n.prefix} suffix={n.suffix} />
                </div>
                <div className="mono" style={{ fontSize: 10, opacity: 0.4, marginTop: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{n.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── the answers ── */}
      <section className="frame">
        <div style={{ maxWidth: 640, width: '100%' }}>
          <Reveal>
            <ChapterLabel text="the questions you asked" />
            <h2 className="serif chapter-title">i answered them. click through.</h2>
          </Reveal>
          <div style={{ marginTop: 34 }}><QandA /></div>
        </div>
      </section>

      {/* ── the agents said yes ── */}
      <section className="frame">
        <div style={{ maxWidth: 600, width: '100%' }}>
          <Reveal>
            <ChapterLabel text="i asked my team" />
            <h2 className="serif chapter-title">i asked my agents if they wanted in.</h2>
            <p className="body-text" style={{ marginTop: 18, marginBottom: 30 }}>
              they have memory and opinions. so i put the question to them straight. unedited replies:
            </p>
          </Reveal>
          <AgentChat />
        </div>
      </section>

      {/* ── past work ── */}
      <section className="frame">
        <div style={{ maxWidth: 640, width: '100%' }}>
          <Reveal>
            <ChapterLabel text="past work · the receipts" />
            <h2 className="serif chapter-title">a decade of shipping under deadline.</h2>
          </Reveal>
          <div style={{ marginTop: 30, display: 'grid', gap: 12 }}>
            {FEATURED.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <TiltCard>
                  <div className="project-tile" style={{ '--pc': p.color, '--tilt': '0deg', cursor: 'pointer' } as React.CSSProperties}
                    onClick={(e) => burst(e.clientX, e.clientY, 12, p.color)} title="click for confetti">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                      <h3 className="serif" style={{ fontSize: 'clamp(1.1rem, 2.6vw, 1.5rem)', color: maximalism ? p.color : 'inherit', transition: 'color .8s' }}>{p.name.toLowerCase()}</h3>
                      <span className="mono" style={{ fontSize: 10, opacity: 0.55, color: maximalism ? p.color : 'inherit' }}>{p.result} · {p.year}</span>
                    </div>
                    <p style={{ fontSize: 13.5, lineHeight: 1.6, fontWeight: 300, opacity: 0.6, marginTop: 8 }}>{p.oneLiner}</p>
                    {p.links?.live && <a href={p.links.live} target="_blank" rel="noopener" className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: maximalism ? p.color : 'inherit', opacity: 0.7, display: 'inline-block', marginTop: 10 }}>live ↗</a>}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <details style={{ marginTop: 30 }}>
              <summary className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, cursor: 'pointer' }}>
                the full hackathon record ↓
              </summary>
              <div style={{ marginTop: 20 }}><RecordTimeline /></div>
            </details>
          </Reveal>
        </div>
      </section>

      {/* ── the podcast ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal><ChapterLabel text={PODCAST.kicker} /><h2 className="serif chapter-title">{PODCAST.title}</h2></Reveal>
          <Reveal delay={0.15}><p className="body-text" style={{ marginTop: 22 }}>{PODCAST.body}</p></Reveal>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 20 }}>
              <Equalizer />
              <div>
                <div className="serif" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}><Counter to={PODCAST.episodes} /></div>
                <div className="mono" style={{ fontSize: 10, opacity: 0.4, letterSpacing: '0.12em', textTransform: 'uppercase' }}>episodes · wave radio</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the ask: italy ── */}
      <section className="frame">
        <div style={{ maxWidth: 640, width: '100%' }}>
          <Reveal><ChapterLabel text={`${ASK.kicker} · ${RUBIN.place} · ${RUBIN.duration}`} /><h2 className="serif chapter-title">{ASK.title}</h2></Reveal>
          <Reveal delay={0.15}><p className="body-text" style={{ marginTop: 22 }}>{ASK.body}</p></Reveal>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <CypressHills maximalism={maximalism} />
              <ChiantiGlass />
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginTop: 48, textAlign: 'center' }}>{ASK.signoff}</p>
          </Reveal>
        </div>
      </section>

      {/* ── the film + close ── */}
      <section className="frame">
        <div style={{ maxWidth: 640, width: '100%', textAlign: 'center' }}>
          <Reveal><VideoBlock /></Reveal>
          <Reveal delay={0.2}>
            <div style={{ marginTop: 40, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:${CONTACT.email}`} className="mode-switch">{CONTACT.email}</a>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 20, justifyContent: 'center' }}>
              <a href={CONTACT.x} target="_blank" rel="noopener" className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', opacity: 0.5 }}>x ↗</a>
              <a href={LINKS.github} target="_blank" rel="noopener" className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', opacity: 0.5 }}>github ↗</a>
              <a href={CONTACT.site} target="_blank" rel="noopener" className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', opacity: 0.5 }}>portfolio ↗</a>
            </div>
            <p className="mono" style={{ fontSize: 10, opacity: 0.3, marginTop: 40, letterSpacing: '0.1em' }}>
              made in five terminals · {OSCAR.location}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
