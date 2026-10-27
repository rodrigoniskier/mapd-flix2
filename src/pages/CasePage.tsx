import { useEffect, useRef } from 'react';
import type { CaseStep, DecisionOption } from '../domain/types.ts';
import { getCase, getEpisode, getSeries } from '../data/catalog.ts';
import { Figure } from '../components/blocks.tsx';
import { References } from '../components/References.tsx';
import { Icon, ProgressBar, Rich } from '../components/ui.tsx';
import { href } from '../lib/router.ts';
import { Photo } from '../components/Photo.tsx';
import { photoFor } from '../data/media.ts';
import { useProgress } from '../lib/store.tsx';
import { NotFound } from './NotFound.tsx';

const QUALITY: Record<DecisionOption['quality'], { label: string; cls: string }> = {
  prioritaria: { label: 'Decisão prioritária', cls: 'bg-ok/15 border-ok' },
  aceitavel: { label: 'Aceitável, mas não prioritária', cls: 'bg-warn/15 border-warn' },
  inadequada: { label: 'Decisão inadequada', cls: 'bg-bad/15 border-bad' },
};

function Findings({ step }: { step: CaseStep }) {
  if (!step.findings?.length) return null;
  return (
    <div className="overflow-x-auto rounded-xl border border-line" tabIndex={0} aria-label="Achados">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead className="bg-white/[0.06] text-white">
          <tr>
            <th scope="col" className="px-3 py-2">Achado</th>
            <th scope="col" className="px-3 py-2">Resultado</th>
            <th scope="col" className="px-3 py-2">Referência</th>
          </tr>
        </thead>
        <tbody>
          {step.findings.map((f) => (
            <tr key={f.label} className="border-t border-line align-top">
              <th scope="row" className="px-3 py-2 font-semibold text-white">{f.label}</th>
              <td className="px-3 py-2">
                <span className={f.flag === 'alto' || f.flag === 'baixo' || f.flag === 'alterado' ? 'font-semibold text-brand-2' : ''}>{f.value}</span>
                {f.flag && f.flag !== 'normal' && <span className="ml-2 chip">{f.flag === 'alto' ? '↑ alto' : f.flag === 'baixo' ? '↓ baixo' : 'alterado'}</span>}
              </td>
              <td className="px-3 py-2 text-mute">{f.reference ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CasePage({ id }: { id: string }) {
  const c = getCase(id);
  const { state, patchCase, restartCase, visit } = useProgress();
  const lastRef = useRef<HTMLDivElement | null>(null);
  const prog = c ? state.cases[c.id] ?? { step: 0, decisions: {} } : { step: 0, decisions: {} };

  useEffect(() => {
    if (c) {
      document.title = `${c.title} — MAPD-Flix`;
      visit('case', c.id);
    }
  }, [c, visit]);

  if (!c) return <NotFound />;
  const s = getSeries(c.seriesId)!;
  const current = Math.min(prog.step, c.steps.length - 1);
  const finished = !!prog.completedAt;

  const advance = () => {
    const nextStep = current + 1;
    if (nextStep >= c.steps.length) return;
    patchCase(c.id, { step: nextStep, ...(nextStep === c.steps.length - 1 ? { completedAt: new Date().toISOString() } : {}) });
    setTimeout(() => lastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <article className="pb-10">
      <header className="relative overflow-hidden">
        <Photo photo={photoFor(c.id)} className="absolute inset-0 h-full w-full" eager />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 md:hidden" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page relative pb-10 pt-28 md:pt-36">
          <nav aria-label="Trilha" className="text-sm text-mute">
            <a href={href.home()} className="hover:text-white">Início</a> <span aria-hidden="true">›</span>{' '}
            <a href={href.series(s.id)} className="hover:text-white">{s.title}</a> <span aria-hidden="true">›</span> Caso clínico
          </nav>
          <div className="mt-3 chip bg-black/40">
            <Icon name="stethoscope" className="h-3.5 w-3.5" /> Episódio especial · {c.setting}
          </div>
          <h1 className="mt-3 max-w-4xl font-title text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] tracking-wide text-white [overflow-wrap:anywhere]">{c.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">{c.hook}</p>
          <div className="mt-5 max-w-md">
            <div className="mb-1 flex justify-between text-sm">
              <span>Etapa {current + 1} de {c.steps.length}</span>
              {finished && <span className="font-semibold text-ok">Caso elucidado</span>}
            </div>
            <ProgressBar value={(current + 1) / c.steps.length} label="Progresso no caso" />
          </div>
        </div>
      </header>

      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          {c.steps.slice(0, current + 1).map((step, i) => {
            const chosen = prog.decisions[step.id];
            const chosenOpt = step.decision?.options.find((o) => o.id === chosen);
            const needsDecision = !!step.decision && !chosen;
            const isLast = i === current;
            return (
              <section
                key={step.id}
                ref={isLast ? lastRef : undefined}
                aria-labelledby={`h-${step.id}`}
                className={`card-surface scroll-mt-24 p-5 md:p-6 ${step.reveal ? 'border-brand/60 bg-gradient-to-br from-brand/10 to-transparent' : ''} ${isLast ? 'animate-fade-up' : ''}`}
                data-case-step={step.id}
              >
                <h2 id={`h-${step.id}`} className="text-xl font-bold">
                  {step.reveal && <span className="mr-2 chip bg-brand text-white">Revelação</span>}
                  {step.title}
                </h2>
                <div className="prose-mapd mt-2">
                  {step.narrative.map((p, k) => (
                    <p key={k}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
                <div className="mt-4 space-y-4">
                  <Findings step={step} />
                  {step.visual && <Figure visual={step.visual} />}
                </div>

                {step.decision && (
                  <fieldset className="mt-5">
                    <legend className="font-semibold text-white">
                      <Icon name="flask" className="mr-1 inline h-4 w-4" /> Decisão clínica: {step.decision.prompt}
                    </legend>
                    <div className="mt-3 space-y-2">
                      {step.decision.options.map((o, k) => {
                        const isChosen = chosen === o.id;
                        const revealAll = !!chosen;
                        return (
                          <div key={o.id}>
                            <button
                              type="button"
                              disabled={!!chosen}
                              onClick={() => patchCase(c.id, { decisions: { [step.id]: o.id } })}
                              aria-pressed={isChosen}
                              className={`flex w-full gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors disabled:cursor-default ${
                                revealAll ? (isChosen ? QUALITY[o.quality].cls : 'border-line opacity-80') : 'border-line bg-white/[0.03] hover:bg-white/[0.07]'
                              }`}
                              data-quality={revealAll ? o.quality : undefined}
                            >
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">{String.fromCharCode(65 + k)}</span>
                              <span className="pt-0.5">{o.text}</span>
                            </button>
                            {revealAll && (
                              <div className={`ml-10 mt-1 rounded-lg border-l-4 px-3 py-2 text-sm ${QUALITY[o.quality].cls}`}>
                                <div className="font-bold text-white">
                                  {isChosen ? 'Sua escolha — ' : ''}
                                  {QUALITY[o.quality].label}
                                </div>
                                <div>
                                  <strong className="text-white">Consequência:</strong> {o.consequence}
                                </div>
                                <div>
                                  <strong className="text-white">Justificativa:</strong> {o.rationale}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {chosenOpt && chosenOpt.quality !== 'prioritaria' && (
                      <p className="mt-3 rounded-lg bg-white/[0.05] px-3 py-2 text-sm" aria-live="polite">
                        Compare sua escolha com a <strong className="text-white">decisão prioritária</strong> acima antes de seguir — no caso real, essa diferença teria consequências.
                      </p>
                    )}
                  </fieldset>
                )}

                {step.teachingPoint && (!step.decision || chosen) && (
                  <div role="note" className="mt-4 rounded-xl border-l-4 border-info/60 bg-info/10 px-4 py-3 text-[0.95rem]">
                    <div className="text-xs font-bold uppercase tracking-wider text-white/80">Ponto de aprendizagem</div>
                    <Rich text={step.teachingPoint} />
                  </div>
                )}

                {isLast && i < c.steps.length - 1 && (
                  <div className="mt-5">
                    <button type="button" className="btn btn-primary" onClick={advance} disabled={needsDecision} aria-disabled={needsDecision} data-testid="avancar-etapa">
                      {i === c.steps.length - 2 ? 'Revelar diagnóstico' : 'Avançar para a próxima etapa'} <Icon name="chevronRight" className="h-5 w-5" />
                    </button>
                    {needsDecision && <p className="mt-2 text-sm text-mute">Tome a decisão clínica para liberar a próxima etapa.</p>}
                  </div>
                )}
              </section>
            );
          })}

          {finished && (
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-ghost" onClick={() => restartCase(c.id)} data-testid="reiniciar-caso">
                <Icon name="reset" className="h-5 w-5" /> Refazer o caso
              </button>
              {s.quizId && (
                <a href={href.quiz(s.quizId)} className="btn btn-primary">
                  <Icon name="trophy" className="h-5 w-5" /> Ir para o Desafio Clínico
                </a>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="card-surface p-5" aria-labelledby="obj-caso">
            <h2 id="obj-caso" className="text-lg font-bold">Objetivos do caso</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {c.objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
                  {o}
                </li>
              ))}
            </ul>
          </section>
          <section className="card-surface p-5" aria-labelledby="rel-caso">
            <h2 id="rel-caso" className="text-lg font-bold">Episódios relacionados</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {c.relatedEpisodes.map((eid) => {
                const e = getEpisode(eid);
                return e ? (
                  <li key={eid}>
                    <a href={href.episode(eid)} className="underline hover:text-white">Ep. {e.number} — {e.title}</a>
                  </li>
                ) : null;
              })}
            </ul>
          </section>
          <p className="text-xs text-mute">{c.disclaimer}</p>
          <References citations={c.citations} />
        </div>
      </div>
    </article>
  );
}
