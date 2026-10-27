/**
 * Ilustrações originais de mecanismos imunológicos (viewBox 400×240).
 * Representações esquemáticas e didáticas — não são microfotografias.
 */
import type { ReactNode } from 'react';
import { Ab, Arrow, Block, Cell, Label, Microbe, P, Panel } from './primitives.tsx';

/* 1 ---------------------------------------------------------------- */
function TimoSelecao() {
  return (
    <g>
      <rect x={10} y={30} width={140} height={200} rx={18} fill={P.self} fillOpacity={0.1} stroke={P.self} strokeOpacity={0.5} />
      <rect x={150} y={30} width={140} height={200} rx={18} fill={P.apc} fillOpacity={0.08} stroke={P.apc} strokeOpacity={0.5} />
      <Label x={80} y={22} size={12} weight={700}>Córtex tímico</Label>
      <Label x={220} y={22} size={12} weight={700}>Medula tímica</Label>
      {/* epitélio cortical */}
      <path d="M40 130 l12 -18 l12 18 l18 -6 l-10 18 l10 18 l-18 -6 l-12 18 l-12 -18 l-18 6 l10 -18 l-10 -18 z" fill={P.self} fillOpacity={0.5} stroke={P.self} />
      <Label x={52} y={212} size={9}>célula epitelial</Label>
      <Label x={52} y={223} size={9}>cortical (MHC próprio)</Label>
      <Cell x={105} y={80} r={14} fill={P.t} />
      <Label x={105} y={60} size={9}>CD4+CD8+</Label>
      <Cell x={112} y={150} r={12} fill={P.t} />
      <Arrow x1={64} y1={130} x2={92} y2={88} color={P.self} />
      <Label x={110} y={118} size={9} italic>reconhece fraco</Label>
      <Label x={110} y={176} size={9} italic>não reconhece →</Label>
      <Label x={110} y={187} size={9} italic>morte por negligência</Label>
      {/* medula: mTEC com AIRE */}
      <path d="M205 110 l14 -22 l14 22 l22 -7 l-12 22 l12 22 l-22 -7 l-14 22 l-14 -22 l-22 7 l12 -22 l-12 -22 z" fill={P.apc} fillOpacity={0.45} stroke={P.apc} />
      <Label x={219} y={128} size={11} weight={800}>AIRE</Label>
      <g fill={P.peptide}>
        <polygon points="255,85 262,89 262,97 255,101 248,97 248,89" />
        <rect x={252} y={140} width={10} height={10} rx={2} />
        <circle cx={182} cy={92} r={5} />
      </g>
      <Label x={220} y={175} size={9}>antígenos de tecidos</Label>
      <Label x={220} y={186} size={9}>(ex.: insulina)</Label>
      <Arrow x1={125} y1={80} x2={190} y2={98} />
      {/* desfechos */}
      <Cell x={330} y={62} r={13} fill={P.t} />
      <Arrow x1={346} y1={62} x2={388} y2={62} />
      <Label x={330} y={90} size={9}>T maduro → periferia</Label>
      <Cell x={330} y={122} r={13} fill={P.treg} />
      <Label x={330} y={149} size={9}>Treg FOXP3+</Label>
      <g stroke={P.danger} strokeWidth={2} fill="none" strokeDasharray="3 3">
        <circle cx={330} cy={185} r={13} />
      </g>
      <g fill={P.danger} fillOpacity={0.7}>
        <circle cx={324} cy={181} r={3} />
        <circle cx={335} cy={189} r={3} />
        <circle cx={331} cy={178} r={2} />
      </g>
      <Label x={330} y={213} size={9}>apoptose (alta afinidade)</Label>
      <Arrow x1={262} y1={112} x2={312} y2={70} color={P.t} />
      <Arrow x1={262} y1={118} x2={312} y2={122} color={P.treg} />
      <Arrow x1={262} y1={126} x2={312} y2={178} color={P.danger} />
    </g>
  );
}

/* 2 ---------------------------------------------------------------- */
function TregSupressao() {
  return (
    <g>
      <Cell x={80} y={140} r={34} fill={P.apc} nucleusShape="kidney" />
      <Label x={80} y={195} size={10}>Célula dendrítica</Label>
      {/* B7 */}
      <g fill={P.apc}>
        <rect x={110} y={120} width={10} height={6} rx={2} />
        <rect x={112} y={150} width={10} height={6} rx={2} />
      </g>
      <Label x={128} y={112} size={9} anchor="start">B7</Label>
      <Cell x={210} y={62} r={28} fill={P.treg} />
      <Label x={210} y={22} size={11} weight={700}>Treg (CD25+ FOXP3+)</Label>
      <Cell x={320} y={150} r={30} fill={P.t} />
      <Label x={320} y={200} size={10}>T efetor autorreativo</Label>
      <Block x1={188} y1={80} x2={124} y2={120} color={P.treg} />
      <Label x={142} y={88} size={9} anchor="end">CTLA-4</Label>
      <Label x={142} y={99} size={8} anchor="end" italic>remove/bloqueia B7</Label>
      <Block x1={232} y1={80} x2={296} y2={128} color={P.treg} />
      <Label x={280} y={88} size={9} anchor="start">IL-10, TGF-β</Label>
      {/* IL-2 consumida */}
      <g fill={P.peptide}>
        <circle cx={258} cy={45} r={4} />
        <circle cx={270} cy={58} r={4} />
        <circle cx={250} cy={30} r={4} />
      </g>
      <Arrow x1={250} y1={45} x2={236} y2={55} color={P.peptide} head={6} />
      <Label x={290} y={36} size={9} anchor="start">consome IL-2</Label>
      <Arrow x1={114} y1={140} x2={286} y2={150} dashed color="currentColor" />
      <Label x={200} y={165} size={9} italic>ativação atenuada</Label>
    </g>
  );
}

/* 3 ---------------------------------------------------------------- */
function MimetismoMolecular() {
  return (
    <g>
      <Cell x={200} y={60} r={30} fill={P.t} />
      <Label x={200} y={20} size={11} weight={700}>Linfócito T com o mesmo TCR</Label>
      {/* APC esquerda com peptídeo microbiano */}
      <Cell x={85} y={175} r={34} fill={P.apc} nucleusShape="kidney" />
      <Microbe x={30} y={128} />
      <Label x={6} y={112} size={9} anchor="start">micro-organismo</Label>
      <g transform="translate(110 140)">
        <rect x={-6} y={0} width={12} height={10} fill={P.mhc} />
        <path d="M-8 -2 q 8 -10 16 0 z" fill={P.microbe} />
      </g>
      <Label x={85} y={228} size={10}>peptídeo microbiano</Label>
      {/* APC direita com peptídeo próprio */}
      <Cell x={315} y={175} r={34} fill={P.self} nucleusShape="kidney" />
      <g transform="translate(290 140)">
        <rect x={-6} y={0} width={12} height={10} fill={P.mhc} />
        <path d="M-8 -2 q 8 -11 16 0 z" fill={P.peptide} />
      </g>
      <Label x={315} y={228} size={10}>peptídeo próprio semelhante</Label>
      <Arrow x1={180} y1={84} x2={118} y2={134} color={P.microbe} />
      <Label x={150} y={88} size={9} anchor="end">1. ativação na infecção</Label>
      <Arrow x1={220} y1={84} x2={282} y2={134} color={P.danger} />
      <Label x={272} y={100} size={9} anchor="start">2. reação cruzada</Label>
      <Label x={200} y={180} size={10} weight={700} color={P.danger}>≈</Label>
    </g>
  );
}

/* 4 ---------------------------------------------------------------- */
function MecanismosLesaoAutoimune() {
  return (
    <g>
      <Panel x={6} y={14} w={124} h={214} title="Anticorpo → alvo" color={P.igg} />
      <Panel x={138} y={14} w={124} h={214} title="Imunocomplexos" color={P.comp} />
      <Panel x={270} y={14} w={124} h={214} title="Linfócitos T" color={P.t} />
      {/* painel 1 */}
      <Cell x={68} y={120} r={32} fill={P.self} />
      <Ab x={68} y={84} rot={180} color={P.igg} />
      <Ab x={36} y={110} rot={-90} color={P.igg} />
      <Ab x={100} y={110} rot={90} color={P.igg} />
      <g fill={P.comp}>
        <circle cx={44} cy={146} r={4} />
        <circle cx={94} cy={148} r={4} />
      </g>
      <Label x={68} y={185} size={9}>lise, fagocitose ou</Label>
      <Label x={68} y={196} size={9}>alteração de receptor</Label>
      {/* painel 2 */}
      <rect x={146} y={100} width={108} height={24} fill={P.danger} fillOpacity={0.25} />
      <Label x={200} y={92} size={9}>parede do vaso / glomérulo</Label>
      {[160, 186, 212, 238].map((x) => (
        <g key={x}>
          <circle cx={x} cy={112} r={4} fill={P.peptide} />
          <Ab x={x} y={124} rot={0} s={0.6} color={P.igg} />
        </g>
      ))}
      <Cell x={200} y={165} r={18} fill={P.neu} nucleusShape="lobed" />
      <Label x={200} y={200} size={9}>C5a → neutrófilos</Label>
      <Arrow x1={200} y1={146} x2={200} y2={128} color={P.comp} />
      {/* painel 3 */}
      <g fill={P.self} fillOpacity={0.4} stroke={P.self}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={288 + i * 30} y={150} width={26} height={26} rx={4} />
        ))}
      </g>
      <Cell x={305} y={90} r={16} fill={P.t} />
      <Label x={305} y={66} size={9}>CD8+</Label>
      <Cell x={360} y={90} r={18} fill={P.mac} nucleusShape="kidney" />
      <Label x={360} y={66} size={9}>macrófago</Label>
      <Arrow x1={305} y1={108} x2={302} y2={146} color={P.t} />
      <Arrow x1={360} y1={110} x2={346} y2={146} color={P.mac} />
      <Label x={332} y={198} size={9}>citotoxicidade e citocinas</Label>
    </g>
  );
}

/* 5 ---------------------------------------------------------------- */
function AnticorpoEstrutura() {
  const arm = (dir: 1 | -1) => (
    <g transform={`translate(200 125) rotate(${dir * 42})`}>
      <rect x={-9} y={-95} width={18} height={95} rx={9} fill={P.igg} fillOpacity={0.6} stroke={P.igg} strokeWidth={2} />
      <rect x={dir * 12 - 7} y={-92} width={14} height={60} rx={7} fill={P.b} fillOpacity={0.55} stroke={P.b} strokeWidth={2} />
      <rect x={-9} y={-95} width={18} height={26} rx={9} fill={P.danger} fillOpacity={0.55} />
    </g>
  );
  return (
    <g>
      {arm(-1)}
      {arm(1)}
      <rect x={180} y={125} width={18} height={80} rx={9} fill={P.igg} fillOpacity={0.6} stroke={P.igg} strokeWidth={2} />
      <rect x={202} y={125} width={18} height={80} rx={9} fill={P.igg} fillOpacity={0.6} stroke={P.igg} strokeWidth={2} />
      {/* antígenos */}
      <polygon points="122,40 132,30 142,40 132,50" fill={P.microbe} />
      <polygon points="258,40 268,30 278,40 268,50" fill={P.microbe} />
      <Label x={110} y={70} size={12} weight={800}>Fab</Label>
      <Label x={290} y={70} size={12} weight={800}>Fab</Label>
      <Label x={240} y={185} size={12} weight={800} anchor="start">Fc</Label>
      <Label x={200} y={232} size={9}>receptores Fc (fagócitos, NK) · C1q (complemento)</Label>
      <Label x={20} y={130} size={9} anchor="start" color={P.danger}>região variável</Label>
      <Label x={20} y={142} size={9} anchor="start" color={P.b}>cadeia leve</Label>
      <Label x={20} y={154} size={9} anchor="start" color={P.igg}>cadeia pesada</Label>
    </g>
  );
}

/* 6 ---------------------------------------------------------------- */
function FanPadroes() {
  const green = '#4ade80';
  const cell = (cx: number, inner: ReactNode, name: string) => (
    <g key={name}>
      <circle cx={cx} cy={110} r={44} fill="#0b1510" stroke="#1f3b2a" />
      <ellipse cx={cx} cy={110} rx={30} ry={26} fill={green} fillOpacity={0.12} />
      {inner}
      <Label x={cx} y={180} size={10} weight={700}>{name}</Label>
    </g>
  );
  const rng = (seed: number) => () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const dots = (cx: number, n: number, r: number, seed: number) => {
    const rand = rng(seed);
    return Array.from({ length: n }, (_, i) => {
      const a = rand() * Math.PI * 2;
      const d = Math.sqrt(rand()) * 24;
      return <circle key={i} cx={cx + Math.cos(a) * d} cy={110 + Math.sin(a) * d * 0.85} r={r} fill={green} />;
    });
  };
  return (
    <g>
      {cell(52, <ellipse cx={52} cy={110} rx={30} ry={26} fill={green} fillOpacity={0.85} />, 'Homogêneo')}
      {cell(152, <g opacity={0.9}>{dots(152, 90, 1.4, 7)}</g>, 'Pontilhado')}
      {cell(
        252,
        <g fill={green}>
          <circle cx={244} cy={104} r={6} />
          <circle cx={262} cy={112} r={5} />
          <circle cx={250} cy={121} r={4} />
        </g>,
        'Nucleolar',
      )}
      {cell(352, <g>{dots(352, 40, 2.1, 31)}</g>, 'Centromérico')}
      <Label x={200} y={222} size={9} italic>Representação didática de padrões de FAN em HEp-2 (nomenclatura ICAP)</Label>
    </g>
  );
}

/* 7 ---------------------------------------------------------------- */
function ComplementoVias() {
  return (
    <g>
      <Label x={60} y={22} size={11} weight={700}>Entradas</Label>
      {[
        { y: 60, t: 'Clássica', s: 'anticorpo + C1q' },
        { y: 120, t: 'Lectinas', s: 'MBL / ficolinas' },
        { y: 180, t: 'Alternativa', s: 'ativação basal' },
      ].map((e) => (
        <g key={e.t}>
          <rect x={10} y={e.y - 20} width={104} height={40} rx={10} fill={P.comp} fillOpacity={0.12} stroke={P.comp} />
          <Label x={62} y={e.y - 3} size={11} weight={700}>{e.t}</Label>
          <Label x={62} y={e.y + 11} size={9}>{e.s}</Label>
          <Arrow x1={116} y1={e.y} x2={170} y2={120} color={P.comp} />
        </g>
      ))}
      <circle cx={196} cy={120} r={26} fill={P.comp} fillOpacity={0.35} stroke={P.comp} strokeWidth={2.5} />
      <Label x={196} y={125} size={15} weight={800}>C3</Label>
      <Label x={196} y={162} size={9}>convergência</Label>
      {[
        { y: 52, t: 'C3b', s: 'opsoniza → fagocitose' },
        { y: 120, t: 'C5a', s: 'recruta e ativa leucócitos' },
        { y: 188, t: 'C5b–9 (MAC)', s: 'poro → lise' },
      ].map((e) => (
        <g key={e.t}>
          <Arrow x1={222} y1={120} x2={268} y2={e.y} color={P.comp} />
          <Label x={274} y={e.y - 2} size={11} weight={700} anchor="start">{e.t}</Label>
          <Label x={274} y={e.y + 12} size={9} anchor="start">{e.s}</Label>
        </g>
      ))}
    </g>
  );
}

/* 8 ---------------------------------------------------------------- */
function ImunossupressaoAlvos() {
  const steps = [
    { x: 40, t: 'APC', c: P.apc },
    { x: 115, t: 'Ativação T', c: P.t },
    { x: 190, t: 'Proliferação', c: P.t },
    { x: 265, t: 'Linfócito B', c: P.b },
    { x: 345, t: 'Citocinas', c: P.danger },
  ];
  const drugs = [
    { x: 40, l1: 'Hidroxi-', l2: 'cloroquina' },
    { x: 115, l1: 'Abatacepte', l2: '(CTLA-4-Ig)' },
    { x: 190, l1: 'MTX · MMF', l2: 'azatioprina' },
    { x: 265, l1: 'Anti-CD20', l2: 'anti-BAFF' },
    { x: 345, l1: 'Anti-TNF · anti-', l2: 'IL-6R · JAKi' },
  ];
  return (
    <g>
      <rect x={8} y={20} width={384} height={26} rx={8} fill={P.self} fillOpacity={0.15} stroke={P.self} strokeOpacity={0.6} />
      <Label x={200} y={37} size={10} weight={700}>Glicocorticoides — ação ampla em várias etapas</Label>
      {steps.map((s, i) => (
        <g key={s.t}>
          <Cell x={s.x} y={95} r={20} fill={s.c} />
          <Label x={s.x} y={132} size={9} weight={700}>{s.t}</Label>
          {i < steps.length - 1 && <Arrow x1={s.x + 22} y1={95} x2={steps[i + 1].x - 22} y2={95} />}
        </g>
      ))}
      {drugs.map((d) => (
        <g key={d.l1}>
          <Block x1={d.x} y1={180} x2={d.x} y2={142} color={P.danger} />
          <Label x={d.x} y={196} size={9} weight={700}>{d.l1}</Label>
          <Label x={d.x} y={208} size={9}>{d.l2}</Label>
        </g>
      ))}
      <Label x={200} y={232} size={8} italic>Mapa didático simplificado — cada fármaco tem múltiplos efeitos</Label>
    </g>
  );
}

/* 9 ---------------------------------------------------------------- */
function ImunidadeCamadas() {
  const q = [
    { x: 6, y: 8, t: 'Anticorpos (linfócitos B)', c: P.b, m: 'encapsuladas · giárdia · enterovírus' },
    { x: 204, y: 8, t: 'Linfócitos T', c: P.t, m: 'vírus · fungos · micobactérias' },
    { x: 6, y: 124, t: 'Fagócitos', c: P.neu, m: 'S. aureus · Aspergillus · abscessos' },
    { x: 204, y: 124, t: 'Complemento', c: P.comp, m: 'Neisseria · encapsuladas' },
  ];
  return (
    <g>
      {q.map((p, i) => (
        <g key={p.t}>
          <Panel x={p.x} y={p.y} w={190} h={108} title={p.t} color={p.c} />
          {i === 0 && (
            <g>
              <Cell x={p.x + 45} y={p.y + 62} r={20} fill={P.b} />
              <Ab x={p.x + 90} y={p.y + 75} color={P.igg} />
              <Ab x={p.x + 110} y={p.y + 70} rot={20} color={P.igg} />
            </g>
          )}
          {i === 1 && <Cell x={p.x + 45} y={p.y + 62} r={20} fill={P.t} />}
          {i === 2 && <Cell x={p.x + 45} y={p.y + 62} r={22} fill={P.neu} nucleusShape="lobed" />}
          {i === 3 && (
            <g>
              <circle cx={p.x + 45} cy={p.y + 62} r={16} fill="none" stroke={P.comp} strokeWidth={6} strokeDasharray="4 3" />
            </g>
          )}
          <Microbe x={p.x + 150} y={p.y + 58} />
          <Label x={p.x + 95} y={p.y + 100} size={9} italic>{p.m}</Label>
        </g>
      ))}
    </g>
  );
}

/* 10 --------------------------------------------------------------- */
function LinfocitosBTDefeitos() {
  const bar = (x: number, y: number, label: string) => (
    <g>
      <rect x={x - 5} y={y - 26} width={10} height={52} rx={3} fill={P.danger} />
      <Label x={x} y={y + 42} size={10} weight={800} color={P.danger}>{label}</Label>
    </g>
  );
  return (
    <g>
      <Cell x={40} y={120} r={24} fill={P.self} />
      <Label x={40} y={160} size={9}>célula-tronco</Label>
      <Label x={40} y={171} size={9}>hematopoética</Label>
      <Arrow x1={66} y1={120} x2={120} y2={120} />
      <circle cx={130} cy={120} r={6} fill="currentColor" />
      <Arrow x1={134} y1={114} x2={190} y2={64} color={P.t} />
      <Arrow x1={134} y1={126} x2={170} y2={176} color={P.b} />
      {/* timo */}
      <path d="M200 40 q 30 -20 60 0 q 10 25 -5 45 q -25 12 -50 0 q -15 -20 -5 -45 z" fill={P.t} fillOpacity={0.15} stroke={P.t} />
      <Label x={268} y={36} size={9} anchor="start">timo</Label>
      <Arrow x1={262} y1={60} x2={310} y2={60} color={P.t} />
      <Cell x={330} y={60} r={18} fill={P.t} />
      <Label x={330} y={98} size={9}>linfócito T</Label>
      {/* medula óssea */}
      <Cell x={190} y={180} r={16} fill={P.b} />
      <Label x={190} y={214} size={9}>pré-B</Label>
      <Arrow x1={208} y1={180} x2={310} y2={180} color={P.b} />
      <Cell x={330} y={180} r={18} fill={P.b} />
      <Label x={330} y={216} size={9}>linfócito B → plasmócito</Label>
      {bar(88, 120, 'SCID')}
      {bar(232, 60, '22q11.2')}
      {bar(258, 180, 'XLA')}
    </g>
  );
}

/* 11 --------------------------------------------------------------- */
function HivCd4() {
  return (
    <g>
      {/* virion + célula */}
      <Cell x={70} y={150} r={42} fill={P.t} />
      <Label x={70} y={210} size={10}>linfócito T CD4+</Label>
      <rect x={105} y={118} width={8} height={18} rx={3} fill={P.t} />
      <Label x={122} y={114} size={8} anchor="start">CD4</Label>
      <rect x={108} y={146} width={8} height={14} rx={3} fill={P.mhc} />
      <Label x={122} y={162} size={8} anchor="start">CCR5/CXCR4</Label>
      <circle cx={140} cy={80} r={20} fill={P.hiv} fillOpacity={0.3} stroke={P.hiv} strokeWidth={2} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <line key={i} x1={140 + Math.cos(a) * 20} y1={80 + Math.sin(a) * 20} x2={140 + Math.cos(a) * 27} y2={80 + Math.sin(a) * 27} stroke={P.hiv} strokeWidth={3} />;
      })}
      <Label x={140} y={46} size={10} weight={700}>HIV</Label>
      <Arrow x1={128} y1={98} x2={112} y2={120} color={P.hiv} />
      {/* gráfico */}
      <line x1={200} y1={30} x2={200} y2={200} stroke="currentColor" strokeOpacity={0.6} />
      <line x1={200} y1={200} x2={390} y2={200} stroke="currentColor" strokeOpacity={0.6} />
      <path d="M200 50 C 210 120, 218 90, 230 75 S 330 120, 385 185" fill="none" stroke={P.t} strokeWidth={3} />
      <path d="M200 195 C 208 40, 218 60, 232 150 S 320 150, 385 60" fill="none" stroke={P.hiv} strokeWidth={2.5} strokeDasharray="6 4" />
      <line x1={200} y1={165} x2={390} y2={165} stroke={P.danger} strokeDasharray="3 3" />
      <Label x={388} y={160} size={8} anchor="end" color={P.danger}>CD4 &lt; 200 → AIDS</Label>
      <Label x={206} y={26} size={9} anchor="start" color={P.t}>— CD4</Label>
      <Label x={262} y={26} size={9} anchor="start" color={P.hiv}>- - carga viral</Label>
      <Label x={215} y={215} size={8}>semanas</Label>
      <Label x={300} y={215} size={8}>anos (sem TARV)</Label>
      <Label x={295} y={232} size={8} italic>curso esquemático</Label>
    </g>
  );
}

/* 12 --------------------------------------------------------------- */
function CitometriaSubpopulacoes() {
  const cats = ['CD3 (T)', 'CD4', 'CD8', 'CD19 (B)', 'NK'];
  const series = [
    { n: 'Referência', c: P.self, v: [100, 100, 100, 100, 100] },
    { n: 'SCID T−B+NK−', c: P.t, v: [3, 3, 3, 110, 4] },
    { n: 'SCID T−B−NK+', c: P.b, v: [3, 3, 3, 3, 100] },
    { n: 'XLA', c: P.igg, v: [100, 100, 100, 1, 100] },
  ];
  const x0 = 46;
  const y0 = 190;
  const h = 140;
  const gw = 66;
  return (
    <g>
      <line x1={x0} y1={y0} x2={392} y2={y0} stroke="currentColor" strokeOpacity={0.6} />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h - 10} stroke="currentColor" strokeOpacity={0.6} />
      {[0, 50, 100].map((t) => (
        <g key={t}>
          <line x1={x0 - 4} y1={y0 - (t / 120) * h} x2={392} y2={y0 - (t / 120) * h} stroke="currentColor" strokeOpacity={0.12} />
          <Label x={x0 - 7} y={y0 - (t / 120) * h + 3} size={8} anchor="end">{`${t}%`}</Label>
        </g>
      ))}
      {cats.map((c, i) => (
        <g key={c}>
          {series.map((s, j) => {
            const bh = (Math.min(s.v[i], 120) / 120) * h;
            return <rect key={s.n} x={x0 + 8 + i * gw + j * 13} y={y0 - bh} width={11} height={Math.max(bh, 1.5)} fill={s.c} fillOpacity={0.85} rx={2} />;
          })}
          <Label x={x0 + 8 + i * gw + 26} y={y0 + 14} size={9}>{c}</Label>
        </g>
      ))}
      {series.map((s, j) => (
        <g key={s.n} transform={`translate(${x0 + 6 + j * 88} 18)`}>
          <rect width={10} height={10} rx={2} fill={s.c} />
          <Label x={14} y={9} size={9} anchor="start">{s.n}</Label>
        </g>
      ))}
      <Label x={200} y={228} size={8} italic>% do valor de referência para a idade — valores ilustrativos</Label>
    </g>
  );
}

/* 13 --------------------------------------------------------------- */
function GellCoombs() {
  return (
    <g>
      <Panel x={6} y={6} w={190} h={110} title="I · IgE / mastócito" color={P.mast} />
      <Panel x={204} y={6} w={190} h={110} title="II · anticorpo contra célula" color={P.igg} />
      <Panel x={6} y={124} w={190} h={110} title="III · imunocomplexos" color={P.comp} />
      <Panel x={204} y={124} w={190} h={110} title="IV · linfócitos T" color={P.t} />
      {/* I */}
      <Cell x={80} y={72} r={28} fill={P.mast} nucleus={false} />
      {[[-12, -6], [8, -10], [-4, 10], [12, 8], [-14, 12]].map(([dx, dy], i) => (
        <circle key={i} cx={80 + dx} cy={72 + dy} r={4} fill={P.granule} />
      ))}
      <Ab x={68} y={46} rot={180} s={0.7} color={P.ige} />
      <Ab x={92} y={46} rot={180} s={0.7} color={P.ige} />
      <circle cx={80} cy={30} r={5} fill={P.microbe} />
      {[[128, 60], [140, 78], [124, 92]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill={P.granule} />)}
      <Arrow x1={108} y1={72} x2={118} y2={70} />
      <Label x={160} y={104} size={9}>minutos</Label>
      {/* II */}
      <Cell x={270} y={72} r={26} fill={P.rbc} nucleus={false} />
      <Ab x={270} y={44} rot={180} s={0.7} />
      <Ab x={246} y={66} rot={-90} s={0.7} />
      <Ab x={294} y={66} rot={90} s={0.7} />
      <Cell x={345} y={78} r={20} fill={P.mac} nucleusShape="kidney" />
      <Label x={355} y={110} size={9}>horas–dias</Label>
      {/* III */}
      <rect x={20} y={170} width={160} height={16} fill={P.danger} fillOpacity={0.25} />
      {[40, 70, 100, 130, 160].map((x) => (
        <g key={x}>
          <circle cx={x} cy={176} r={3.5} fill={P.peptide} />
          <Ab x={x} y={186} s={0.5} />
        </g>
      ))}
      <Cell x={100} y={208} r={12} fill={P.neu} nucleusShape="lobed" />
      <Label x={160} y={226} size={9}>dias</Label>
      {/* IV */}
      <Cell x={250} y={185} r={18} fill={P.t} />
      <Label x={250} y={215} size={8}>Th1</Label>
      <Arrow x1={270} y1={185} x2={310} y2={185} color={P.peptide} />
      <Label x={290} y={176} size={8}>IFN-γ</Label>
      <Cell x={335} y={185} r={20} fill={P.mac} nucleusShape="kidney" />
      <Label x={362} y={226} size={9}>24–72 h</Label>
    </g>
  );
}

/* 14 --------------------------------------------------------------- */
function MastocitoDegranulacao() {
  const granules: [number, number][] = [
    [140, 110], [175, 95], [205, 120], [150, 150], [190, 160], [220, 150], [130, 135], [170, 185], [210, 95],
  ];
  return (
    <g>
      <circle cx={175} cy={135} r={82} fill={P.mast} fillOpacity={0.15} stroke={P.mast} strokeWidth={2.5} />
      <ellipse cx={170} cy={135} rx={22} ry={18} fill={P.mast} fillOpacity={0.6} />
      {granules.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill={P.granule} fillOpacity={0.9} />
      ))}
      <Label x={175} y={232} size={11} weight={700}>Mastócito</Label>
      {/* FcεRI + IgE + alérgeno */}
      <rect x={136} y={52} width={8} height={10} fill={P.mast} />
      <rect x={160} y={50} width={8} height={10} fill={P.mast} />
      <Ab x={140} y={52} rot={0} s={0.9} color={P.ige} />
      <Ab x={164} y={50} rot={0} s={0.9} color={P.ige} />
      <rect x={136} y={20} width={36} height={12} rx={6} fill={P.microbe} />
      <Label x={108} y={26} size={9} anchor="end">alérgeno</Label>
      <Label x={108} y={58} size={9} anchor="end">IgE no FcεRI</Label>
      {/* liberação */}
      {[[278, 80], [300, 98], [290, 118], [318, 84]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill={P.granule} />
      ))}
      <Arrow x1={248} y1={110} x2={272} y2={100} />
      <Label x={330} y={66} size={10} weight={700} anchor="start">histamina</Label>
      <Label x={330} y={79} size={10} weight={700} anchor="start">triptase</Label>
      {/* lipídicos */}
      <Arrow x1={250} y1={165} x2={280} y2={178} color={P.apc} />
      <Label x={286} y={176} size={10} weight={700} anchor="start">leucotrienos</Label>
      <Label x={286} y={190} size={10} weight={700} anchor="start">PGD2 · PAF</Label>
      {/* citocinas */}
      <Arrow x1={110} y1={175} x2={78} y2={190} color={P.t} />
      <Label x={70} y={205} size={10} weight={700} anchor="end">TNF, IL-4,</Label>
      <Label x={70} y={218} size={10} weight={700} anchor="end">IL-5, IL-13</Label>
    </g>
  );
}

/* 15 --------------------------------------------------------------- */
function Tipo2Citotoxicidade() {
  return (
    <g>
      <Panel x={6} y={6} w={190} h={228} title="Destruição celular" color={P.rbc} />
      <Panel x={204} y={6} w={190} h={228} title="Alteração de receptor" color={P.igg} />
      <ellipse cx={70} cy={80} rx={34} ry={26} fill={P.rbc} fillOpacity={0.5} stroke={P.rbc} strokeWidth={2} />
      <ellipse cx={70} cy={80} rx={14} ry={9} fill={P.rbc} fillOpacity={0.2} />
      <Ab x={52} y={56} rot={200} s={0.8} />
      <Ab x={90} y={56} rot={160} s={0.8} />
      <g>
        <rect x={98} y={84} width={10} height={14} fill={P.comp} />
        <Label x={128} y={96} size={8} anchor="start">MAC</Label>
      </g>
      <Label x={100} y={124} size={9}>IgM/IgG + complemento → lise</Label>
      <Cell x={70} y={180} r={26} fill={P.mac} nucleusShape="kidney" />
      <ellipse cx={120} cy={176} rx={20} ry={14} fill={P.rbc} fillOpacity={0.45} stroke={P.rbc} />
      <Ab x={120} y={160} rot={180} s={0.6} />
      <Label x={100} y={222} size={9}>opsonização → fagocitose</Label>
      {/* receptores */}
      <rect x={214} y={110} width={170} height={10} fill={P.self} fillOpacity={0.5} />
      <Label x={299} y={140} size={9}>membrana celular</Label>
      <rect x={240} y={86} width={10} height={24} fill={P.mhc} />
      <Ab x={245} y={84} rot={180} s={0.9} color={P.igg} />
      <Arrow x1={245} y1={126} x2={245} y2={170} color={P.treg} />
      <Label x={245} y={186} size={9} weight={700}>Graves:</Label>
      <Label x={245} y={198} size={9}>estimula TSH-R</Label>
      <rect x={340} y={86} width={10} height={24} fill={P.mhc} />
      <Ab x={345} y={84} rot={180} s={0.9} color={P.igg} />
      <circle cx={322} cy={60} r={4} fill={P.peptide} />
      <Block x1={322} y1={66} x2={336} y2={82} color={P.danger} />
      <Label x={345} y={186} size={9} weight={700}>Miastenia:</Label>
      <Label x={345} y={198} size={9}>bloqueia AChR</Label>
      <Label x={316} y={52} size={8}>ACh</Label>
    </g>
  );
}

/* 16 --------------------------------------------------------------- */
function ImunocomplexoDeposicao() {
  return (
    <g>
      <rect x={0} y={20} width={400} height={44} fill={P.rbc} fillOpacity={0.08} />
      <Label x={10} y={36} size={9} anchor="start">luz do vaso</Label>
      {[60, 140, 250, 330].map((x) => (
        <g key={x}>
          <circle cx={x} cy={46} r={4} fill={P.peptide} />
          <Ab x={x} y={58} s={0.55} />
        </g>
      ))}
      <rect x={0} y={64} width={400} height={30} fill={P.danger} fillOpacity={0.22} />
      <Label x={10} y={106} size={9} anchor="start">parede / membrana basal</Label>
      {[170, 200, 230].map((x) => (
        <g key={x}>
          <circle cx={x} cy={72} r={4} fill={P.peptide} />
          <Ab x={x} y={86} s={0.55} />
        </g>
      ))}
      <g fill={P.comp}>
        <circle cx={120} cy={130} r={4} />
        <circle cx={100} cy={142} r={4} />
        <circle cx={84} cy={128} r={4} />
      </g>
      <Label x={96} y={162} size={10} weight={700} color={P.comp}>C3a / C5a</Label>
      <Arrow x1={180} y1={92} x2={128} y2={126} color={P.comp} />
      <Cell x={300} y={160} r={24} fill={P.neu} nucleusShape="lobed" />
      <Cell x={250} y={190} r={18} fill={P.neu} nucleusShape="lobed" />
      <Arrow x1={290} y1={136} x2={240} y2={96} color={P.neu} />
      {[[330, 120], [345, 140], [352, 160]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l6 -6 l6 6 l-6 6 z`} fill={P.danger} />
      ))}
      <Label x={330} y={210} size={9}>enzimas e ROS</Label>
      <Label x={330} y={222} size={9}>(fagocitose frustrada)</Label>
    </g>
  );
}

/* 17 --------------------------------------------------------------- */
function Tipo4Celular() {
  return (
    <g>
      <Cell x={70} y={85} r={28} fill={P.apc} nucleusShape="kidney" />
      <Label x={70} y={130} size={9}>APC + antígeno</Label>
      <Arrow x1={100} y1={85} x2={136} y2={85} />
      <Cell x={160} y={85} r={22} fill={P.t} />
      <Label x={160} y={124} size={9}>Th1 de memória</Label>
      {[[196, 76], [206, 90], [214, 78]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill={P.peptide} />
      ))}
      <Label x={206} y={62} size={10} weight={700}>IFN-γ, TNF</Label>
      <Arrow x1={222} y1={85} x2={280} y2={85} color={P.peptide} />
      <Cell x={312} y={85} r={30} fill={P.mac} nucleusShape="kidney" />
      <Label x={312} y={132} size={9}>macrófago ativado</Label>
      <Label x={312} y={144} size={9}>→ inflamação, granuloma</Label>
      <line x1={10} y1={156} x2={390} y2={156} stroke="currentColor" strokeOpacity={0.2} />
      <Cell x={150} y={195} r={22} fill={P.t} />
      <Label x={150} y={232} size={9}>T CD8+</Label>
      <Arrow x1={174} y1={195} x2={222} y2={195} color={P.danger} />
      <Label x={198} y={186} size={8}>perforina</Label>
      <Label x={198} y={213} size={8}>granzimas</Label>
      <g>
        <circle cx={250} cy={195} r={24} fill={P.self} fillOpacity={0.3} stroke={P.self} strokeDasharray="4 3" />
        <Label x={250} y={232} size={9}>célula-alvo</Label>
      </g>
    </g>
  );
}

/* 18 --------------------------------------------------------------- */
function TriptaseCurva() {
  // eixo x não linear (horas): posições escolhidas para legibilidade
  const xs: [string, number][] = [['0', 50], ['0,5', 85], ['1', 115], ['2', 150], ['4', 195], ['6', 230], ['12', 290], ['24', 370]];
  const X = new Map(xs);
  const yOf = (v: number) => 200 - v * 7;
  const pts = [[0, 4.1], [0.5, 12], [1, 18.4], [2, 16], [4, 11], [6, 8], [12, 5], [24, 4.1]] as const;
  const x = (h: number) => X.get(String(h).replace('.', ',')) ?? 0;
  const d = pts.map(([h, v], i) => `${i ? 'L' : 'M'}${x(h)} ${yOf(v)}`).join(' ');
  return (
    <g>
      <rect x={85} y={40} width={65} height={160} fill={P.peptide} fillOpacity={0.12} />
      <Label x={117} y={34} size={9} weight={700}>coleta aguda</Label>
      <line x1={50} y1={200} x2={390} y2={200} stroke="currentColor" strokeOpacity={0.6} />
      <line x1={50} y1={200} x2={50} y2={30} stroke="currentColor" strokeOpacity={0.6} />
      {xs.map(([t, px]) => (
        <Label key={t} x={px} y={214} size={9}>{t}</Label>
      ))}
      <Label x={220} y={232} size={9}>horas após o início da reação (escala não linear)</Label>
      <Label x={20} y={115} size={9} anchor="middle">ng/mL</Label>
      <line x1={50} y1={yOf(6.9)} x2={390} y2={yOf(6.9)} stroke={P.danger} strokeDasharray="4 4" />
      <Label x={388} y={yOf(6.9) - 5} size={8} anchor="end" color={P.danger}>limiar: basal × 1,2 + 2</Label>
      <path d={d} fill="none" stroke={P.mast} strokeWidth={3} />
      {pts.map(([h, v]) => (
        <circle key={h} cx={x(h)} cy={yOf(v)} r={3.5} fill={P.mast} />
      ))}
      <circle cx={370} cy={yOf(4.1)} r={7} fill="none" stroke={P.t} strokeWidth={2} />
      <Label x={362} y={yOf(4.1) - 12} size={9} weight={700} anchor="end" color={P.t}>basal ≥ 24 h</Label>
    </g>
  );
}

/* 19 --------------------------------------------------------------- */
function AnafilaxiaAdrenalina() {
  return (
    <g>
      {/* coxa */}
      <path d="M70 20 C 50 60, 48 140, 62 220 L 140 220 C 150 150, 152 70, 132 20 Z" fill={P.self} fillOpacity={0.18} stroke={P.self} strokeWidth={2} />
      <Label x={100} y={236} size={9}>coxa (vista anterior)</Label>
      <circle cx={122} cy={110} r={14} fill="none" stroke={P.danger} strokeWidth={3} />
      <circle cx={122} cy={110} r={4} fill={P.danger} />
      <Label x={100} y={86} size={9} weight={700} anchor="end">face</Label>
      <Label x={100} y={97} size={9} weight={700} anchor="end">ântero-</Label>
      <Label x={100} y={108} size={9} weight={700} anchor="end">lateral</Label>
      {/* seringa */}
      <g transform="translate(150 70) rotate(35)">
        <rect x={0} y={-5} width={46} height={10} rx={2} fill={P.mhc} fillOpacity={0.5} stroke={P.mhc} />
        <line x1={-14} y1={0} x2={0} y2={0} stroke="currentColor" strokeWidth={2} />
        <rect x={46} y={-7} width={6} height={14} fill={P.mhc} />
      </g>
      <Label x={220} y={30} size={12} weight={800} anchor="start">Adrenalina IM</Label>
      {[
        { y: 70, r: 'α1', t: 'vasoconstrição, ↓ edema' },
        { y: 120, r: 'β1', t: '↑ contratilidade e FC' },
        { y: 170, r: 'β2', t: 'broncodilatação ·' },
      ].map((e) => (
        <g key={e.r}>
          <circle cx={232} cy={e.y - 4} r={14} fill={P.peptide} fillOpacity={0.25} stroke={P.peptide} />
          <Label x={232} y={e.y} size={11} weight={800}>{e.r}</Label>
          <Label x={252} y={e.y} size={10} anchor="start">{e.t}</Label>
        </g>
      ))}
      <Label x={252} y={182} size={10} anchor="start">↓ liberação de mediadores</Label>
      <Label x={220} y={222} size={9} anchor="start" italic>0,01 mg/kg · máx. 0,5 mg (adulto)</Label>
    </g>
  );
}

export const mechanismIllustrations: Record<string, () => ReactNode> = {
  'timo-selecao': TimoSelecao,
  'treg-supressao': TregSupressao,
  'mimetismo-molecular': MimetismoMolecular,
  'mecanismos-lesao-autoimune': MecanismosLesaoAutoimune,
  'anticorpo-estrutura': AnticorpoEstrutura,
  'fan-padroes': FanPadroes,
  'complemento-vias': ComplementoVias,
  'imunossupressao-alvos': ImunossupressaoAlvos,
  'imunidade-camadas': ImunidadeCamadas,
  'linfocitos-b-t-defeitos': LinfocitosBTDefeitos,
  'hiv-cd4': HivCd4,
  'citometria-subpopulacoes': CitometriaSubpopulacoes,
  'gell-coombs': GellCoombs,
  'mastocito-degranulacao': MastocitoDegranulacao,
  'tipo2-citotoxicidade': Tipo2Citotoxicidade,
  'imunocomplexo-deposicao': ImunocomplexoDeposicao,
  'tipo4-celular': Tipo4Celular,
  'triptase-curva': TriptaseCurva,
  'anafilaxia-adrenalina': AnafilaxiaAdrenalina,
};
