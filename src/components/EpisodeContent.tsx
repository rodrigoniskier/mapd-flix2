import type { Episode } from '../domain/types.ts';
import { videos } from '../data/videos.ts';
import { useProgress, usePrintMode } from '../lib/store.tsx';
import { BlockView, CheckQuestion } from './blocks.tsx';
import { References } from './References.tsx';
import { VideoCard } from './VideoCard.tsx';
import { Icon, Rich } from './ui.tsx';

export const episodeSectionAnchors = (e: Episode) => [
  { id: 'pergunta', t: 'Pergunta orientadora' },
  { id: 'objetivos', t: 'Objetivos' },
  { id: 'conceitos', t: 'Conceitos fundamentais' },
  ...e.sections.map((s) => ({ id: `sec-${s.id}`, t: s.title })),
  { id: 'atividade', t: 'Atividade de fixação' },
  { id: 'sintese', t: 'Síntese' },
  ...(videos.some((v) => v.episodeIds.includes(e.id)) ? [{ id: 'video', t: 'Vídeo complementar' }] : []),
  { id: 'referencias', t: 'Referências' },
];

/** Corpo didático de um episódio — usado na tela e na impressão. */
export function EpisodeContent({ episode }: { episode: Episode }) {
  const print = usePrintMode();
  const { state, answerActivity } = useProgress();
  const video = videos.find((v) => v.episodeIds.includes(episode.id));
  const H = 'text-xl font-bold md:text-2xl';

  return (
    <div className="space-y-10">
      <section id="pergunta" aria-labelledby="h-pergunta" className="avoid-break scroll-mt-24">
        <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/15 to-transparent p-5 md:p-6">
          <h2 id="h-pergunta" className="text-xs font-bold uppercase tracking-[0.18em] text-brand-2">
            Pergunta orientadora
          </h2>
          <p className="mt-2 font-display text-xl font-semibold leading-snug text-white md:text-2xl">{episode.guidingQuestion}</p>
          {!print && <p className="mt-2 text-sm text-mute">Formule sua hipótese antes de avançar. Você voltará a ela na síntese.</p>}
        </div>
      </section>

      <section id="objetivos" aria-labelledby="h-objetivos" className="scroll-mt-24">
        <h2 id="h-objetivos" className={H}>
          Objetivos de aprendizagem
        </h2>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {episode.objectives.map((o) => (
            <li key={o} className="flex gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-ok" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="conceitos" aria-labelledby="h-conceitos" className="scroll-mt-24">
        <h2 id="h-conceitos" className={H}>
          Conceitos fundamentais
        </h2>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {episode.keyTerms.map((t) => (
            <div key={t.term} className="card-surface avoid-break p-4">
              <dt className="font-display font-bold text-white">{t.term}</dt>
              <dd className="mt-1 text-[0.95rem]">
                <Rich text={t.definition} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {episode.sections.map((s) => (
        <section key={s.id} id={`sec-${s.id}`} aria-labelledby={`h-${s.id}`} className="scroll-mt-24">
          <h2 id={`h-${s.id}`} className={H}>
            {s.title}
          </h2>
          <div className="mt-4 space-y-6">
            {s.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
        </section>
      ))}

      <section id="atividade" aria-labelledby="h-atividade" className="scroll-mt-24">
        <h2 id="h-atividade" className={H}>
          Atividade de fixação
        </h2>
        {!print && <p className="mt-1 text-sm text-mute">Responda e leia o feedback — inclusive das alternativas erradas.</p>}
        <div className="mt-4 grid gap-4">
          {episode.activity.map((q, i) => (
            <CheckQuestion key={q.id} q={q} index={i} selected={state.activities[q.id]} onAnswer={(o) => answerActivity(q.id, o)} />
          ))}
        </div>
        {print && (
          <div className="mt-3 text-sm">
            <strong>Gabarito:</strong>{' '}
            {episode.activity.map((q, i) => `${i + 1}) ${String.fromCharCode(65 + q.options.findIndex((o) => o.id === q.correctOptionId))}`).join(' · ')}
          </div>
        )}
      </section>

      <section id="sintese" aria-labelledby="h-sintese" className="avoid-break scroll-mt-24">
        <h2 id="h-sintese" className={H}>
          Síntese do episódio
        </h2>
        <ol className="mt-3 space-y-2">
          {episode.synthesis.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/20 text-sm font-bold text-white">{i + 1}</span>
              <span className="pt-0.5">
                <Rich text={s} />
              </span>
            </li>
          ))}
        </ol>
        {!print && (
          <p className="mt-4 rounded-xl bg-white/[0.04] px-4 py-3 text-sm">
            <strong className="text-white">Volte à pergunta orientadora:</strong> {episode.guidingQuestion} — sua hipótese inicial mudou?
          </p>
        )}
      </section>

      {video && (
        <section id="video" aria-labelledby="h-video" className="scroll-mt-24">
          <h2 id="h-video" className={H}>
            Vídeo complementar
          </h2>
          <div className="mt-3 max-w-3xl">
            <VideoCard video={video} />
          </div>
        </section>
      )}

      <div id="referencias" className="scroll-mt-24">
        <References citations={episode.citations} />
      </div>
    </div>
  );
}
