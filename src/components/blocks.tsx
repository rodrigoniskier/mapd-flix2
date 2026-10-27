import { useId, useState } from 'react';
import type { CalloutVariant, ChainStage, ContentBlock, Question, VisualResource } from '../domain/types.ts';
import { Illustration } from '../illustrations/index.tsx';
import { usePrintMode } from '../lib/store.tsx';
import { Icon, Rich } from './ui.tsx';

/* ------------------------------------------------------------------ */
/** Remove instruções de interação (ex.: “(clique em cada etapa)”) na impressão. */
const stripHint = (t: string | undefined, print: boolean) => (t && print ? t.replace(/\s*\((clique|toque)[^)]*\)/i, '') : t);

export function BlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="prose-mapd max-w-3xl">
          {block.title && <h3 className="mb-1 mt-4 text-base font-bold">{block.title}</h3>}
          {block.paragraphs.map((p, i) => (
            <p key={i}>
              <Rich text={p} />
            </p>
          ))}
        </div>
      );
    case 'expandable':
      return <Expandables title={block.title} items={block.items} />;
    case 'flow':
      return <Flow title={block.title} intro={block.intro} steps={block.steps} />;
    case 'timeline':
      return <Timeline title={block.title} events={block.events} />;
    case 'compare':
      return <Compare title={block.title} columns={block.columns} rows={block.rows} note={block.note} />;
    case 'figure':
      return <Figure visual={block.visual} />;
    case 'chain':
      return <Chain title={block.title} links={block.links} />;
    case 'callout':
      return <Callout variant={block.variant} title={block.title} body={block.body} />;
    case 'list':
      return (
        <div className="max-w-3xl">
          {block.title && <h3 className="mb-2 text-base font-bold">{block.title}</h3>}
          {block.ordered ? (
            <ol className="list-decimal space-y-1.5 pl-6">
              {block.items.map((it, i) => (
                <li key={i}>
                  <Rich text={it} />
                </li>
              ))}
            </ol>
          ) : (
            <ul className="space-y-1.5">
              {block.items.map((it, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    <Rich text={it} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
  }
}

/* ------------------------------------------------------------------ */
function Expandables({ title, items }: { title?: string; items: { title: string; body: string }[] }) {
  const print = usePrintMode();
  const [open, setOpen] = useState<Set<number>>(new Set());
  const base = useId();
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  return (
    <div className="max-w-3xl">
      {title && <h3 className="mb-2 text-base font-bold">{stripHint(title, print)}</h3>}
      <div className="space-y-2" data-component="expandable">
        {items.map((it, i) => {
          const isOpen = print || open.has(i);
          const pid = `${base}-p${i}`;
          return (
            <div key={i} className="card-surface avoid-break overflow-hidden">
              {print ? (
                <h4 className="px-4 pt-3 font-semibold text-white">{it.title}</h4>
              ) : (
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-white hover:bg-white/5"
                  aria-expanded={isOpen}
                  aria-controls={pid}
                  onClick={() => toggle(i)}
                >
                  <span>{it.title}</span>
                  <Icon name="chevronDown" className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              )}
              {isOpen && (
                <div id={pid} className="prose-mapd px-4 pb-3 text-[0.95rem]">
                  <p>
                    <Rich text={it.body} />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Flow({ title, intro, steps }: { title: string; intro?: string; steps: { label: string; detail: string }[] }) {
  const print = usePrintMode();
  const [revealed, setRevealed] = useState(1);
  const [active, setActive] = useState(0);
  const shown = print ? steps.length : revealed;
  return (
    <div className="card-surface avoid-break max-w-4xl p-4 md:p-5" data-component="flow">
      <h3 className="text-base font-bold">{stripHint(title, print)}</h3>
      {intro && <p className="mt-1 text-sm text-mute">{intro}</p>}
      <ol className="mt-4 space-y-2">
        {steps.slice(0, shown).map((s, i) => {
          const isActive = print || i === active;
          return (
            <li key={i} className="animate-fade-up">
              {print ? (
                <div className="flex gap-3">
                  <span className="font-bold">{i + 1}.</span>
                  <div>
                    <strong>{s.label}</strong> — <Rich text={s.detail} />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex w-full gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                    isActive ? 'border-brand/70 bg-brand/10' : 'border-line bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${isActive ? 'bg-brand text-white' : 'bg-white/10 text-white'}`}>
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{s.label}</span>
                    {isActive && (
                      <span className="mt-1 block text-[0.95rem]">
                        <Rich text={s.detail} />
                      </span>
                    )}
                  </span>
                </button>
              )}
            </li>
          );
        })}
      </ol>
      {!print && (
        <div className="mt-3 flex flex-wrap gap-2">
          {revealed < steps.length ? (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setRevealed((r) => r + 1);
                setActive(revealed);
              }}
            >
              Revelar próxima etapa <Icon name="chevronRight" className="h-4 w-4" />
            </button>
          ) : (
            <span className="chip">Todas as etapas reveladas</span>
          )}
          {revealed < steps.length && (
            <button type="button" className="btn btn-ghost" onClick={() => setRevealed(steps.length)}>
              Mostrar todas
            </button>
          )}
          <span className="sr-only" aria-live="polite">
            {`${revealed} de ${steps.length} etapas reveladas`}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Timeline({ title, events }: { title: string; events: { time: string; label: string; detail: string }[] }) {
  return (
    <div className="max-w-4xl avoid-break" data-component="timeline">
      <h3 className="mb-3 text-base font-bold">{title}</h3>
      <ol className="relative ml-3 border-l-2 border-line pl-6">
        {events.map((e, i) => (
          <li key={i} className="relative mb-5 last:mb-0">
            <span aria-hidden="true" className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-2 border-ink bg-brand-2" />
            <div className="text-xs font-bold uppercase tracking-wider text-brand-2">{e.time}</div>
            <div className="font-semibold text-white">{e.label}</div>
            <p className="text-[0.95rem]">
              <Rich text={e.detail} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Compare({ title, columns, rows, note }: { title: string; columns: string[]; rows: { label: string; cells: string[] }[]; note?: string }) {
  const print = usePrintMode();
  const [focus, setFocus] = useState<number | null>(null);
  return (
    <figure className="avoid-break max-w-5xl" data-component="compare">
      <figcaption className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold">{title}</h3>
        {!print && columns.length > 2 && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Destacar coluna">
            {columns.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-pressed={focus === i}
                onClick={() => setFocus(focus === i ? null : i)}
                className={`chip cursor-pointer ${focus === i ? 'bg-brand text-white' : 'hover:bg-white/15'}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </figcaption>
      <div className="overflow-x-auto rounded-xl border border-line" tabIndex={0} aria-label={`Tabela: ${title}`}>
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white/[0.06]">
              <th scope="col" className="w-40 px-3 py-2.5 font-semibold text-white"><span className="sr-only">Critério</span></th>
              {columns.map((c, i) => (
                <th key={c} scope="col" className={`px-3 py-2.5 font-semibold text-white ${focus === i ? 'bg-brand/20' : ''}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line align-top">
                <th scope="row" className="px-3 py-2.5 font-semibold text-white">
                  {r.label}
                </th>
                {r.cells.map((cell, i) => (
                  <td key={i} className={`px-3 py-2.5 ${focus !== null && focus !== i ? 'opacity-40' : ''} ${focus === i ? 'bg-brand/10' : ''}`}>
                    <Rich text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-2 text-sm text-mute">{note}</p>}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
export function Figure({ visual }: { visual: VisualResource }) {
  const print = usePrintMode();
  const [active, setActive] = useState<number | null>(null);
  const hs = visual.hotspots ?? [];
  return (
    <figure className="avoid-break max-w-4xl" data-component="figure">
      <div className="relative rounded-2xl border border-line bg-[#0b0e16] p-2 text-soft md:p-4 print:bg-white print:text-black">
        <Illustration id={visual.illustration} title={visual.alt} className="h-auto w-full" />
        {!print &&
          hs.map((h, i) => (
            <button
              key={i}
              type="button"
              className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 text-sm font-bold shadow-lg transition-transform hover:scale-110 ${
                active === i ? 'border-white bg-brand text-white' : 'border-white/80 bg-ink/80 text-white'
              }`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={`Ponto ${i + 1}: ${h.label}`}
              aria-pressed={active === i}
              onClick={() => setActive(active === i ? null : i)}
            >
              {i + 1}
            </button>
          ))}
      </div>
      {!print && hs.length > 0 && (
        <div className="mt-2 min-h-[3rem] rounded-xl bg-white/[0.04] px-4 py-3 text-[0.95rem]" aria-live="polite">
          {active === null ? (
            <span className="text-mute">Toque nos pontos numerados da imagem para explorar cada estrutura.</span>
          ) : (
            <>
              <strong className="text-white">{hs[active].label}:</strong> <Rich text={hs[active].detail} />
            </>
          )}
        </div>
      )}
      {print && hs.length > 0 && (
        <ol className="mt-2 list-decimal space-y-1 pl-6 text-sm">
          {hs.map((h, i) => (
            <li key={i}>
              <strong>{h.label}:</strong> {h.detail}
            </li>
          ))}
        </ol>
      )}
      {visual.caption && <figcaption className="mt-2 text-sm text-mute">{visual.caption}</figcaption>}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
const STAGE: Record<ChainStage, { label: string; color: string }> = {
  mecanismo: { label: 'Mecanismo imunológico', color: '#a78bfa' },
  alteracao: { label: 'Alteração funcional', color: '#60a5fa' },
  lesao: { label: 'Lesão tecidual', color: '#f87171' },
  manifestacao: { label: 'Manifestação clínica', color: '#fbbf24' },
  investigacao: { label: 'Investigação', color: '#34d399' },
  conduta: { label: 'Conduta', color: '#22d3ee' },
};

function Chain({ title, links }: { title?: string; links: { stage: ChainStage; text: string }[] }) {
  const print = usePrintMode();
  const [shown, setShown] = useState(print ? links.length : 1);
  const n = print ? links.length : shown;
  return (
    <div className="card-surface avoid-break max-w-4xl p-4 md:p-5" data-component="chain">
      <h3 className="text-base font-bold">{title ? `Do mecanismo à conduta — ${title}` : 'Do mecanismo à conduta'}</h3>
      <ol className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {links.slice(0, n).map((l, i) => (
          <li key={i} className="animate-fade-up rounded-xl border-l-4 bg-white/[0.04] px-3 py-2.5" style={{ borderColor: STAGE[l.stage].color }}>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: STAGE[l.stage].color }}>
              {i + 1}. {STAGE[l.stage].label}
            </div>
            <div className="text-[0.95rem]">
              <Rich text={l.text} />
            </div>
          </li>
        ))}
      </ol>
      {!print && (
        <div className="mt-3 flex gap-2">
          {shown < links.length ? (
            <>
              <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + 1)}>
                Próximo elo: {STAGE[links[shown].stage].label} <Icon name="chevronRight" className="h-4 w-4" />
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setShown(links.length)}>
                Ver cadeia completa
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-ghost" onClick={() => setShown(1)}>
              <Icon name="reset" className="h-4 w-4" /> Recomeçar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
const CALLOUT: Record<CalloutVariant, { label: string; cls: string }> = {
  clinica: { label: 'Na clínica', cls: 'border-info/60 bg-info/10' },
  atencao: { label: 'Atenção', cls: 'border-warn/60 bg-warn/10' },
  sus: { label: 'SUS e realidade brasileira', cls: 'border-ok/60 bg-ok/10' },
  distincao: { label: 'Distinção essencial', cls: 'border-brand/60 bg-brand/10' },
  conceito: { label: 'Conceito', cls: 'border-white/30 bg-white/5' },
};

export function Callout({ variant, title, body }: { variant: CalloutVariant; title: string; body: string }) {
  const c = CALLOUT[variant];
  return (
    <div role="note" className={`avoid-break max-w-3xl rounded-xl border-l-4 px-4 py-3 ${c.cls}`} data-component="callout">
      <div className="text-xs font-bold uppercase tracking-wider text-white/80">{c.label}</div>
      <div className="font-semibold text-white">{title}</div>
      <p className="mt-1 text-[0.95rem]">
        <Rich text={body} />
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/** Pergunta de múltipla escolha com feedback imediato (atividades de fixação). */
export function CheckQuestion({
  q,
  index,
  selected,
  onAnswer,
}: {
  q: Question;
  index: number;
  selected?: string;
  onAnswer?: (optionId: string) => void;
}) {
  const print = usePrintMode();
  const answered = selected !== undefined && selected !== '';
  const name = useId();
  return (
    <div className="card-surface avoid-break p-4 md:p-5" data-component="question">
      <div className="text-xs font-bold uppercase tracking-wider text-brand-2">Questão {index + 1}</div>
      {q.stem && (
        <p className="mt-1 text-[0.95rem]">
          <Rich text={q.stem} />
        </p>
      )}
      <p className="mt-1 font-semibold text-white" id={`${name}-p`}>
        <Rich text={q.prompt} />
      </p>
      <div className="mt-3 space-y-2" role={print ? undefined : 'radiogroup'} aria-labelledby={`${name}-p`}>
        {q.options.map((o, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSel = selected === o.id;
          const isCorrect = o.id === q.correctOptionId;
          let state = 'border-line bg-white/[0.03] hover:bg-white/[0.07]';
          if (answered && isCorrect) state = 'border-ok bg-ok/15';
          else if (answered && isSel) state = 'border-bad bg-bad/15';
          return print ? (
            <div key={o.id} className="flex gap-2">
              <span className="font-bold">{letter})</span>
              <span>{o.text}</span>
            </div>
          ) : (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={isSel}
              disabled={answered}
              onClick={() => onAnswer?.(o.id)}
              className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors disabled:cursor-default ${state}`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">{letter}</span>
              <span className="pt-0.5">{o.text}</span>
              {answered && isCorrect && <Icon name="check" className="ml-auto h-5 w-5 shrink-0 text-ok" label="Correta" />}
              {answered && isSel && !isCorrect && <Icon name="x" className="ml-auto h-5 w-5 shrink-0 text-bad" label="Sua resposta" />}
            </button>
          );
        })}
      </div>
      {answered && !print && <AnswerFeedback q={q} selected={selected!} />}
    </div>
  );
}

export function AnswerFeedback({ q, selected }: { q: Question; selected: string }) {
  const ok = selected === q.correctOptionId;
  const sel = q.options.find((o) => o.id === selected);
  return (
    <div className="mt-4 space-y-3 animate-fade-up" aria-live="polite" data-feedback={ok ? 'correct' : 'incorrect'}>
      <div className={`rounded-xl px-4 py-3 ${ok ? 'bg-ok/15' : 'bg-bad/15'}`}>
        <div className="font-bold text-white">{ok ? 'Correto!' : 'Ainda não.'}</div>
        {sel && <p className="text-[0.95rem]">{sel.feedback}</p>}
      </div>
      <div className="rounded-xl bg-white/[0.04] px-4 py-3">
        <div className="text-sm font-bold text-white">Justificativa</div>
        <p className="text-[0.95rem]">
          <Rich text={q.explanation} />
        </p>
      </div>
      <details className="rounded-xl bg-white/[0.03] px-4 py-3">
        <summary className="cursor-pointer text-sm font-semibold text-white">Por que as outras alternativas estão erradas?</summary>
        <ul className="mt-2 space-y-1.5 text-[0.95rem]">
          {q.options
            .filter((o) => o.id !== q.correctOptionId)
            .map((o) => (
              <li key={o.id}>
                <strong className="text-white">{String.fromCharCode(65 + q.options.indexOf(o))})</strong> {o.feedback}
              </li>
            ))}
        </ul>
      </details>
    </div>
  );
}
