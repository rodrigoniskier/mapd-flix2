import type { ReactNode } from 'react';
import type { SeriesTheme } from '../domain/types.ts';
import { mechanismIllustrations } from './mechanisms.tsx';
import { Ab, Cell, Microbe, P } from './primitives.tsx';

export const illustrationIds = Object.keys(mechanismIllustrations);

export function hasIllustration(id: string): boolean {
  return id in mechanismIllustrations;
}

/** Renderiza uma ilustração de mecanismo como SVG acessível. */
export function Illustration({ id, title, className = '' }: { id: string; title: string; className?: string }) {
  const Comp = mechanismIllustrations[id];
  if (!Comp) {
    return (
      <div role="img" aria-label={title} className={`grid place-items-center text-sm text-mute ${className}`}>
        Ilustração indisponível
      </div>
    );
  }
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label={title} className={className} data-illustration={id}>
      <title>{title}</title>
      <Comp />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Capas de séries                                                     */
/* ------------------------------------------------------------------ */

function Motif({ motif }: { motif: SeriesTheme['motif'] }): ReactNode {
  switch (motif) {
    case 'autoimunidade':
      return (
        <g>
          {Array.from({ length: 6 }, (_, i) =>
            Array.from({ length: 4 }, (_, j) => (
              <rect key={`${i}-${j}`} x={150 + i * 42} y={60 + j * 42 + (i % 2) * 18} width={34} height={34} rx={8} fill="#fff" fillOpacity={0.07} stroke="#fff" strokeOpacity={0.18} />
            )),
          )}
          {[[180, 70, 150], [260, 120, 200], [330, 90, 170], [220, 200, 120], [300, 230, 220]].map(([x, y, r], i) => (
            <Ab key={i} x={x} y={y} rot={r} s={1.8} color={i % 2 ? '#c4b5fd' : '#fde68a'} />
          ))}
          <Cell x={90} y={150} r={46} fill="#a78bfa" />
        </g>
      );
    case 'imunodeficiencia':
      return (
        <g>
          <path d="M200 40 l90 30 v70 c0 60 -45 95 -90 115 c-45 -20 -90 -55 -90 -115 v-70 z" fill="#fff" fillOpacity={0.06} stroke="#6ee7b7" strokeOpacity={0.6} strokeWidth={3} />
          <path d="M200 40 l-14 70 l26 30 l-20 70" stroke="#04202c" strokeWidth={6} fill="none" />
          <path d="M200 40 l-14 70 l26 30 l-20 70" stroke="#6ee7b7" strokeWidth={2} fill="none" strokeDasharray="4 4" />
          {[[330, 80], [350, 170], [70, 90], [60, 200], [300, 240]].map(([x, y], i) => (
            <Microbe key={i} x={x} y={y} s={1.6} color="#bef264" />
          ))}
        </g>
      );
    case 'hipersensibilidade':
      return (
        <g>
          <circle cx={200} cy={150} r={80} fill="#fff" fillOpacity={0.06} stroke="#fdba74" strokeOpacity={0.7} strokeWidth={3} />
          {Array.from({ length: 22 }, (_, i) => {
            const a = (i / 22) * Math.PI * 2;
            const d = 95 + (i % 4) * 22;
            return <circle key={i} cx={200 + Math.cos(a) * d} cy={150 + Math.sin(a) * d * 0.8} r={6 + (i % 3) * 2} fill={i % 2 ? '#fde68a' : '#fb923c'} fillOpacity={0.85} />;
          })}
          {[[170, 72], [200, 68], [230, 72]].map(([x, y], i) => (
            <Ab key={i} x={x} y={y + 8} rot={0} s={1.4} color="#f9a8d4" />
          ))}
        </g>
      );
    case 'tumor':
      return (
        <g>
          {[[200, 150, 50], [150, 120, 34], [250, 115, 38], [230, 200, 32], [165, 195, 30]].map(([x, y, r], i) => (
            <Cell key={i} x={x} y={y} r={r} fill="#f472b6" />
          ))}
          <Cell x={330} y={90} r={28} fill="#60a5fa" />
          <Cell x={80} y={220} r={24} fill="#60a5fa" />
        </g>
      );
    case 'transplante':
      return (
        <g>
          <path d="M110 90 h80 v30 a18 18 0 1 0 0 36 v30 h-80 z" fill="#38bdf8" fillOpacity={0.3} stroke="#7dd3fc" strokeWidth={3} />
          <path d="M210 90 h80 v96 h-80 v-30 a18 18 0 1 1 0 -36 z" fill="#a78bfa" fillOpacity={0.3} stroke="#c4b5fd" strokeWidth={3} />
          <Cell x={320} y={60} r={22} fill="#60a5fa" />
        </g>
      );
  }
}

/** Arte de capa de série (proporção 2:3 — pôster). */
export function SeriesPoster({ theme, title, className = '' }: { theme: SeriesTheme; title: string; className?: string }) {
  const gid = `g-${theme.motif}`;
  return (
    <svg viewBox="0 0 400 600" role="img" aria-label={`Capa da série ${title}`} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={theme.from} />
          <stop offset="0.55" stopColor={theme.via} />
          <stop offset="1" stopColor={theme.to} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="0.7" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={400} height={600} fill={`url(#${gid})`} />
      <rect width={400} height={600} fill={`url(#${gid}-glow)`} />
      <g transform="translate(0 40)">
        <Motif motif={theme.motif} />
      </g>
    </svg>
  );
}

/** Arte de banner horizontal (16:9) com motivo da série. */
export function SeriesBanner({ theme, title, className = '' }: { theme: SeriesTheme; title: string; className?: string }) {
  const gid = `b-${theme.motif}`;
  return (
    <svg viewBox="0 0 800 450" role="img" aria-label={`Arte da série ${title}`} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor={theme.from} />
          <stop offset="0.6" stopColor={theme.via} />
          <stop offset="1" stopColor={theme.to} />
        </linearGradient>
      </defs>
      <rect width={800} height={450} fill={`url(#${gid})`} />
      <g transform="translate(360 40) scale(1.1)">
        <Motif motif={theme.motif} />
      </g>
    </svg>
  );
}

/** Capa de episódio: gradiente da série + ilustração do mecanismo. */
export function EpisodeCover({ theme, illustration, number, title, className = '' }: { theme: SeriesTheme; illustration: string; number: number; title: string; className?: string }) {
  const Comp = mechanismIllustrations[illustration];
  const gid = `e-${theme.motif}`;
  return (
    <svg viewBox="0 0 400 225" role="img" aria-label={`Capa do episódio ${number}: ${title}`} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={theme.from} />
          <stop offset="1" stopColor={theme.via} />
        </linearGradient>
      </defs>
      <rect width={400} height={225} fill={`url(#${gid})`} />
      <g transform="translate(120 10) scale(0.7)" color="#e5e7eb" opacity={0.85}>
        {Comp ? <Comp /> : null}
      </g>
      <text x={18} y={200} fontSize={88} fontWeight={800} fill="#fff" fillOpacity={0.16} fontFamily="Sora, Inter, sans-serif">
        {String(number).padStart(2, '0')}
      </text>
    </svg>
  );
}

/** Marca MAPD-Flix: anticorpo estilizado + logotipo em caixa alta condensada. */
export function Logo({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label="MAPD-Flix">
      <svg viewBox="0 0 64 64" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M32 34v22M32 34 14 12M32 34l18-22" stroke="#e3122b" strokeWidth="9" strokeLinecap="round" fill="none" />
      </svg>
      {!compact && (
        <span className="hidden font-title text-[1.9rem] leading-none tracking-[0.04em] text-brand min-[420px]:inline" aria-hidden="true">
          MAPD·FLIX
        </span>
      )}
    </span>
  );
}

export { P };
