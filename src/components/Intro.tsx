import { useEffect, useRef, useState } from 'react';

/**
 * Abertura original do MAPD-Flix (≈ 3 s): tela preta, um traçado de monitor
 * cardíaco percorre a tela em vermelho, o pico forma o anticorpo da marca e o
 * nome aparece com brilho. Som próprio sintetizado (Web Audio): dois bipes de
 * monitor seguidos de um acorde grave que cresce. Não reutiliza marcas de
 * terceiros.
 */
function playSting() {
  try {
    const AC = (globalThis as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
      ?? (globalThis as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    const t0 = ctx.currentTime + 0.05;

    // dois bipes de monitor
    [0, 0.38].forEach((d) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 988; // si5
      g.gain.setValueAtTime(0, t0 + d);
      g.gain.linearRampToValueAtTime(0.35, t0 + d + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + d + 0.16);
      o.connect(g).connect(master);
      o.start(t0 + d);
      o.stop(t0 + d + 0.2);
    });

    // acorde grave que cresce (ré menor com nona) + sub
    const chordAt = t0 + 0.85;
    [73.42, 146.83, 220.0, 293.66, 329.63].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lp = ctx.createBiquadFilter();
      o.type = i === 0 ? 'sine' : 'sawtooth';
      o.frequency.value = f;
      o.detune.value = (i % 2 ? 1 : -1) * 6;
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(300, chordAt);
      lp.frequency.exponentialRampToValueAtTime(2400, chordAt + 1.1);
      const peak = i === 0 ? 0.5 : 0.09;
      g.gain.setValueAtTime(0, chordAt);
      g.gain.linearRampToValueAtTime(peak, chordAt + 0.35);
      g.gain.exponentialRampToValueAtTime(0.001, chordAt + 2.2);
      o.connect(lp).connect(g).connect(master);
      o.start(chordAt);
      o.stop(chordAt + 2.3);
    });
    setTimeout(() => void ctx.close(), 3600);
  } catch {
    /* sem áudio: a abertura continua em silêncio */
  }
}

export function Intro({ onDone, sound = true }: { onDone: () => void; sound?: boolean }) {
  const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [phase, setPhase] = useState<'trace' | 'logo' | 'out'>(reduce ? 'logo' : 'trace');
  const done = useRef(false);

  useEffect(() => {
    if (sound) playSting();
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };
    const timers = reduce
      ? [setTimeout(finish, 900)]
      : [setTimeout(() => setPhase('logo'), 1150), setTimeout(() => setPhase('out'), 2700), setTimeout(finish, 3250)];
    const onKey = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') && finish();
    addEventListener('keydown', onKey);
    return () => {
      timers.forEach(clearTimeout);
      removeEventListener('keydown', onKey);
    };
  }, [onDone, reduce, sound]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black" role="img" aria-label="Abertura MAPD-Flix" data-testid="intro">
      <style>{`
        @keyframes mapd-trace { from { stroke-dashoffset: 1400 } to { stroke-dashoffset: 0 } }
        @keyframes mapd-glow { 0% { opacity: 0; transform: scale(.6); filter: blur(12px) } 60% { opacity: 1; transform: scale(1.06); filter: blur(0) } 100% { opacity: 1; transform: scale(1) } }
        @keyframes mapd-out { to { opacity: 0; transform: scale(3.2); filter: blur(6px) } }
        @keyframes mapd-rays { 0% { opacity: 0; transform: scaleX(.2) } 50% { opacity: .9 } 100% { opacity: 0; transform: scaleX(1.6) } }
      `}</style>
      {phase === 'trace' && (
        <svg viewBox="0 0 1000 300" className="w-[92vw] max-w-[1100px]" aria-hidden="true">
          <defs>
            <filter id="intro-glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0 170 H330 l20 -18 l18 18 H420 l22 26 l40 -176 l36 236 l26 -86 H600 l18 -14 l16 14 H1000"
            fill="none"
            stroke="#e3122b"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#intro-glow)"
            style={{ strokeDasharray: 1400, animation: 'mapd-trace 1.1s cubic-bezier(.5,0,.3,1) forwards' }}
          />
        </svg>
      )}
      {phase !== 'trace' && (
        <div className="relative flex flex-col items-center" style={{ animation: phase === 'out' ? 'mapd-out .55s ease-in forwards' : 'mapd-glow .9s ease-out both' }}>
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-24 w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/60 to-transparent blur-2xl" style={{ animation: 'mapd-rays 1.4s ease-out both' }} />
          <svg viewBox="0 0 64 64" className="h-28 w-28 drop-shadow-[0_0_28px_rgba(227,18,43,.9)] md:h-40 md:w-40" aria-hidden="true">
            <path d="M32 34v22M32 34 14 12M32 34l18-22" stroke="#e3122b" strokeWidth="8" strokeLinecap="round" fill="none" />
          </svg>
          <span className="mt-2 font-title text-6xl tracking-[0.06em] text-brand drop-shadow-[0_0_24px_rgba(227,18,43,.8)] md:text-8xl">MAPD·FLIX</span>
        </div>
      )}
      <button type="button" style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))', right: 'max(1.5rem, env(safe-area-inset-right))' }} className="absolute rounded border border-white/40 px-4 py-2 text-sm text-white/80 hover:border-white hover:text-white" onClick={() => { if (!done.current) { done.current = true; onDone(); } }} data-testid="pular-abertura">
        Pular abertura
      </button>
    </div>
  );
}
