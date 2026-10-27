/**
 * Primitivas vetoriais originais do MAPD-Flix.
 * Cores de preenchimento funcionam em fundo escuro (app) e branco (impressão);
 * traços de texto e contornos usam `currentColor`, definido pelo contêiner.
 */
import type { ReactNode } from 'react';

export const P = {
  t: '#60a5fa',
  b: '#a78bfa',
  treg: '#34d399',
  apc: '#f59e0b',
  mac: '#fb923c',
  neu: '#f472b6',
  mast: '#f87171',
  granule: '#fde68a',
  nk: '#22d3ee',
  igg: '#fbbf24',
  ige: '#f472b6',
  comp: '#4ade80',
  self: '#94a3b8',
  microbe: '#a3e635',
  danger: '#ef4444',
  hiv: '#e879f9',
  rbc: '#ef4444',
  mhc: '#38bdf8',
  peptide: '#facc15',
};

export function Cell({
  x,
  y,
  r,
  fill,
  nucleus = true,
  nucleusShape = 'round',
  opacity = 0.9,
  children,
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
  nucleus?: boolean;
  nucleusShape?: 'round' | 'lobed' | 'kidney';
  opacity?: number;
  children?: ReactNode;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} fillOpacity={opacity * 0.35} stroke={fill} strokeWidth={2} />
      {nucleus && nucleusShape === 'round' && <circle cx={x} cy={y} r={r * 0.55} fill={fill} fillOpacity={opacity * 0.75} />}
      {nucleus && nucleusShape === 'lobed' && (
        <g fill={fill} fillOpacity={opacity * 0.8}>
          <circle cx={x - r * 0.35} cy={y - r * 0.1} r={r * 0.26} />
          <circle cx={x} cy={y + r * 0.2} r={r * 0.26} />
          <circle cx={x + r * 0.35} cy={y - r * 0.1} r={r * 0.26} />
        </g>
      )}
      {nucleus && nucleusShape === 'kidney' && (
        <path
          d={`M ${x - r * 0.45} ${y} a ${r * 0.45} ${r * 0.4} 0 1 1 ${r * 0.9} 0 q ${-r * 0.45} ${-r * 0.3} ${-r * 0.9} 0 z`}
          fill={fill}
          fillOpacity={opacity * 0.8}
        />
      )}
      {children}
    </g>
  );
}

/** Anticorpo em Y. `rot` em graus; (x,y) = base do Fc. */
export function Ab({ x, y, rot = 0, s = 1, color = P.igg }: { x: number; y: number; rot?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={color} strokeWidth={3.2} strokeLinecap="round" fill="none">
      <line x1={0} y1={0} x2={0} y2={-11} />
      <line x1={0} y1={-11} x2={-8} y2={-20} />
      <line x1={0} y1={-11} x2={8} y2={-20} />
    </g>
  );
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = 'currentColor',
  dashed = false,
  width = 2,
  head = 7,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
  width?: number;
  head?: number;
}) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx1 = x2 - head * Math.cos(a - 0.45);
  const hy1 = y2 - head * Math.sin(a - 0.45);
  const hx2 = x2 - head * Math.cos(a + 0.45);
  const hy2 = y2 - head * Math.sin(a + 0.45);
  return (
    <g stroke={color} strokeWidth={width} fill={color} opacity={0.9}>
      <line x1={x1} y1={y1} x2={x2 - (head * 0.6) * Math.cos(a)} y2={y2 - (head * 0.6) * Math.sin(a)} strokeDasharray={dashed ? '5 4' : undefined} />
      <polygon points={`${x2},${y2} ${hx1},${hy1} ${hx2},${hy2}`} stroke="none" />
    </g>
  );
}

/** Inibição (linha terminada em barra, ⊣). */
export function Block({ x1, y1, x2, y2, color = P.danger }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const px = Math.sin(a) * 7;
  const py = -Math.cos(a) * 7;
  return (
    <g stroke={color} strokeWidth={2.5} strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <line x1={x2 - px} y1={y2 - py} x2={x2 + px} y2={y2 + py} />
    </g>
  );
}

export function Label({
  x,
  y,
  children,
  anchor = 'middle',
  size = 11,
  weight = 600,
  color = 'currentColor',
  italic = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  weight?: number;
  color?: string;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      fontStyle={italic ? 'italic' : undefined}
      fontFamily="Inter, Segoe UI, system-ui, sans-serif"
    >
      {children}
    </text>
  );
}

export function Microbe({ x, y, s = 1, color = P.microbe }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-12} y={-6} width={24} height={12} rx={6} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={2} />
      <line x1={12} y1={0} x2={19} y2={-4} stroke={color} strokeWidth={1.5} />
      <line x1={-12} y1={0} x2={-19} y2={4} stroke={color} strokeWidth={1.5} />
    </g>
  );
}

/** Painel com título (para ilustrações em quadros). */
export function Panel({ x, y, w, h, title, color }: { x: number; y: number; w: number; h: number; title: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={color} fillOpacity={0.07} stroke={color} strokeOpacity={0.6} />
      <Label x={x + 10} y={y + 17} anchor="start" size={11} weight={700} color={color}>
        {title}
      </Label>
    </g>
  );
}
