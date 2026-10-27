import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { episodesOf, getEpisode, getQuiz, getSeries } from '../data/catalog.ts';
import { EpisodeContent } from '../components/EpisodeContent.tsx';
import { References } from '../components/References.tsx';
import { Icon, Rich } from '../components/ui.tsx';
import { performanceLabel } from '../lib/quiz.ts';
import { href } from '../lib/router.ts';
import { PrintModeProvider, isEmbedded, useProgress } from '../lib/store.tsx';
import { NotFound } from './NotFound.tsx';

function PrintShell({ title, back, children }: { title: string; back: string; children?: ReactNode }) {
  useEffect(() => {
    document.title = `${title} — MAPD-Flix (impressão)`;
  }, [title]);
  return (
    <div className="min-h-screen bg-[#e9ebf0] pb-10 print:bg-white print:pb-0">
      <div className="no-print sticky top-0 z-30 border-b border-black/10 bg-ink/95 backdrop-blur" data-no-print>
        <div className="container-page flex flex-wrap items-center gap-3 py-3">
          <a href={back} className="btn btn-ghost">
            <Icon name="chevronLeft" className="h-5 w-5" /> Voltar
          </a>
          {isEmbedded() ? (
            <span className="text-sm text-soft">
              Pré-visualização do material em A4. Esta versão hospedada não abre o diálogo de impressão: para imprimir ou salvar em PDF, use o MAPD-Flix publicado na Vercel ou executado localmente.
            </span>
          ) : (
            <>
              <button type="button" className="btn btn-brand" onClick={() => print()} data-testid="botao-imprimir">
                <Icon name="print" className="h-5 w-5" /> Imprimir / Salvar como PDF
              </button>
              <span className="text-sm text-mute">Formato A4 · fundo branco · sem menus. No diálogo, escolha “Salvar como PDF”.</span>
            </>
          )}
        </div>
      </div>
      <PrintModeProvider value={true}>
        <article className="print-doc mx-auto mt-6 w-full max-w-[210mm] px-[14mm] py-[14mm] shadow-xl print:mt-0 print:max-w-none print:p-0 print:shadow-none" data-testid="print-doc">
          {children}
        </article>
      </PrintModeProvider>
    </div>
  );
}

function DocHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-6 border-b-2 pb-3">
      <div className="text-xs font-bold uppercase tracking-[0.2em] print-muted">MAPD-Flix · {kicker}</div>
      <h1 className="mt-1 font-display text-3xl font-extrabold">{title}</h1>
      {subtitle && <p className="mt-1 text-base print-muted">{subtitle}</p>}
      <p className="mt-1 text-xs print-muted">Gerado em {new Date().toLocaleDateString('pt-BR')} · Material educacional</p>
    </header>
  );
}

export function PrintEpisode({ id }: { id: string }) {
  const ep = getEpisode(id);
  if (!ep) return <NotFound />;
  const s = getSeries(ep.seriesId)!;
  return (
    <PrintShell title={ep.title} back={href.episode(ep.id)}>
      <DocHeader kicker={`${s.title} · Episódio ${ep.number}`} title={ep.title} subtitle={ep.tagline} />
      <EpisodeContent episode={ep} />
    </PrintShell>
  );
}

export function PrintSeries({ id, mode }: { id: string; mode: 'resumo' | 'completo' }) {
  const s = getSeries(id);
  if (!s || s.status !== 'disponivel') return <NotFound />;
  const eps = episodesOf(s.id);
  return (
    <PrintShell title={`${s.title} — ${mode}`} back={href.series(s.id)}>
      <DocHeader kicker={`Série ${s.order} · ${mode === 'resumo' ? 'Resumo' : 'Conteúdo completo'}`} title={s.title} subtitle={s.tagline} />
      <p>{s.synopsis}</p>
      <h2 className="mt-5 text-xl font-bold">Objetivos de aprendizagem da série</h2>
      <ul className="mt-2 list-disc space-y-1 pl-6">
        {s.learningObjectives.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
      {mode === 'resumo' ? (
        <div className="mt-6 space-y-6">
          {eps.map((e) => (
            <section key={e.id} className="avoid-break border-t pt-4">
              <h2 className="text-xl font-bold">
                Episódio {e.number} — {e.title}
              </h2>
              <p className="mt-1 italic">Pergunta orientadora: {e.guidingQuestion}</p>
              <h3 className="mt-3 font-bold">Conceitos fundamentais</h3>
              <ul className="mt-1 space-y-1 text-sm">
                {e.keyTerms.map((t) => (
                  <li key={t.term}>
                    <strong>{t.term}:</strong> <Rich text={t.definition} />
                  </li>
                ))}
              </ul>
              <h3 className="mt-3 font-bold">Síntese</h3>
              <ol className="mt-1 list-decimal space-y-1 pl-6 text-sm">
                {e.synthesis.map((x, i) => (
                  <li key={i}>
                    <Rich text={x} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <References citations={[...s.citations, ...eps.flatMap((e) => e.citations)]} />
        </div>
      ) : (
        <div className="mt-6">
          {eps.map((e) => (
            <section key={e.id} className="page-break pt-2">
              <div className="mb-4 border-b pb-2">
                <div className="text-xs font-bold uppercase tracking-[0.2em] print-muted">Episódio {e.number}</div>
                <h2 className="font-display text-2xl font-extrabold">{e.title}</h2>
              </div>
              <EpisodeContent episode={e} />
            </section>
          ))}
        </div>
      )}
    </PrintShell>
  );
}

export function PrintQuiz({ id, answers }: { id: string; answers: boolean }) {
  const quiz = getQuiz(id);
  if (!quiz) return <NotFound />;
  return (
    <PrintShell title={quiz.title} back={href.quiz(quiz.id)}>
      <DocHeader kicker={answers ? 'Questões com gabarito comentado' : 'Questões (sem gabarito)'} title={quiz.title} subtitle={quiz.tagline} />
      {!answers && <p className="mb-4 text-sm">Nome: ______________________________________ Data: ____/____/______</p>}
      <ol className="space-y-5">
        {quiz.questions.map((q, i) => (
          <li key={q.id} className="avoid-break" data-print-question={q.id}>
            <div className="font-bold">Questão {i + 1}</div>
            {q.stem && <p className="mt-1">{q.stem}</p>}
            <p className="mt-1 font-semibold">{q.prompt}</p>
            <ol className="mt-1 space-y-0.5 pl-1">
              {q.options.map((o, k) => (
                <li key={o.id}>
                  ({String.fromCharCode(65 + k)}) {o.text}
                </li>
              ))}
            </ol>
            {answers && (
              <div className="mt-2 rounded border-l-4 pl-3 text-sm">
                <div>
                  <strong>Resposta: {String.fromCharCode(65 + q.options.findIndex((o) => o.id === q.correctOptionId))}</strong> — {q.explanation}
                </div>
                <ul className="mt-1 space-y-0.5">
                  {q.options
                    .filter((o) => o.id !== q.correctOptionId)
                    .map((o) => (
                      <li key={o.id}>
                        ({String.fromCharCode(65 + q.options.indexOf(o))}) {o.feedback}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
      {!answers && (
        <p className="mt-6 text-xs print-muted">Gabarito disponível na versão “com gabarito” do MAPD-Flix.</p>
      )}
      <div className="mt-6">
        <References citations={quiz.citations} />
      </div>
    </PrintShell>
  );
}

export function PrintResult({ id }: { id: string }) {
  const quiz = getQuiz(id);
  const { state } = useProgress();
  if (!quiz) return <NotFound />;
  const attempts = state.quizzes[quiz.id]?.attempts ?? [];
  const r = attempts[attempts.length - 1];
  return (
    <PrintShell title={`Resultado — ${quiz.title}`} back={href.quiz(quiz.id)}>
      <DocHeader kicker="Resultado do desafio" title={quiz.title} />
      {!r ? (
        <p data-testid="sem-resultado">Nenhuma tentativa registrada neste navegador. Faça o desafio para gerar o resultado.</p>
      ) : (
        <>
          <p className="text-lg">
            <strong>
              {r.correct} de {r.total} acertos ({r.percent}%)
            </strong>{' '}
            — {performanceLabel(r.percent)} · {new Date(r.finishedAt).toLocaleString('pt-BR')}
          </p>
          <table className="mt-4 w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="px-2 py-1">Questão</th>
                <th className="px-2 py-1">Sua resposta</th>
                <th className="px-2 py-1">Correta</th>
                <th className="px-2 py-1">Situação</th>
              </tr>
            </thead>
            <tbody>
              {quiz.questions.map((q, i) => {
                const a = r.answers.find((x) => x.questionId === q.id);
                const letter = (oid?: string) => (oid ? String.fromCharCode(65 + q.options.findIndex((o) => o.id === oid)) : '—');
                return (
                  <tr key={q.id}>
                    <td className="px-2 py-1">{i + 1}</td>
                    <td className="px-2 py-1">{letter(a?.optionId)}</td>
                    <td className="px-2 py-1">{letter(q.correctOptionId)}</td>
                    <td className="px-2 py-1">{a?.correct ? 'Acerto' : 'Erro'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {r.reviewEpisodes.length > 0 && (
            <>
              <h2 className="mt-6 text-xl font-bold">Revisão recomendada</h2>
              <ul className="mt-2 list-disc pl-6">
                {r.reviewEpisodes.map((x) => {
                  const e = getEpisode(x.episodeId);
                  return e ? (
                    <li key={x.episodeId}>
                      {getSeries(e.seriesId)?.title} — Ep. {e.number}: {e.title} ({x.misses} {x.misses === 1 ? 'erro' : 'erros'})
                    </li>
                  ) : null;
                })}
              </ul>
            </>
          )}
        </>
      )}
    </PrintShell>
  );
}
