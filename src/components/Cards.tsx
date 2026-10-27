import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { ClinicalCase, Episode, Quiz, Series } from '../domain/types.ts';
import { EpisodeCover, SeriesPoster } from '../illustrations/index.tsx';
import { getSeries, episodesOf } from '../data/catalog.ts';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import { completion } from '../lib/progress.ts';
import { Icon, ProgressBar } from './ui.tsx';

export function Rail({ title, id, children, subtitle }: { title: string; id?: string; subtitle?: string; children?: ReactNode }) {
  const hid = id ? `${id}-titulo` : undefined;
  const ref = useRef<HTMLUListElement | null>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <section id={id} aria-labelledby={hid} className="scroll-mt-20 py-3">
      <div className="container-page flex items-end justify-between gap-4">
        <div>
          <h2 id={hid} className="text-lg font-bold md:text-xl">
            {title}
          </h2>
          {subtitle && <p className="text-sm text-mute">{subtitle}</p>}
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" className="btn btn-ghost h-9 min-h-0 w-9 p-0" onClick={() => scroll(-1)} aria-label={`Rolar ${title} para a esquerda`}>
            <Icon name="chevronLeft" className="h-4 w-4" />
          </button>
          <button type="button" className="btn btn-ghost h-9 min-h-0 w-9 p-0" onClick={() => scroll(1)} aria-label={`Rolar ${title} para a direita`}>
            <Icon name="chevronRight" className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="container-page">
        <ul className="rail" role="list" ref={ref}>
          {children}
        </ul>
      </div>
    </section>
  );
}

export function SeriesCard({ series }: { series: Series }) {
  const { state } = useProgress();
  const eps = episodesOf(series.id);
  const pct = completion(state, eps.map((e) => e.id));
  const available = series.status === 'disponivel';
  const inner = (
    <>
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
        <SeriesPoster theme={series.theme} title={series.title} className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]" />
        <div className="poster-shine absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/70">Série {series.order}</div>
          <div className="font-display text-lg font-extrabold leading-tight text-white [overflow-wrap:anywhere]">{series.title}</div>
          {available ? (
            <div className="mt-1 text-xs text-white/80">{eps.length} episódios + caso clínico</div>
          ) : (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white">
              <Icon name="lock" className="h-3.5 w-3.5" /> EM BREVE · indisponível
            </div>
          )}
        </div>
        {!available && <div className="absolute inset-0 bg-black/35" aria-hidden="true" />}
      </div>
      {available && pct > 0 && <ProgressBar value={pct} label={`Progresso em ${series.title}`} className="mt-2" />}
    </>
  );
  return (
    <li className="w-[42vw] max-w-[220px] min-w-[150px] sm:w-[200px]">
      {available ? (
        <a href={href.series(series.id)} className="group block rounded-xl" aria-label={`${series.title} — ${series.tagline}`} data-series-card={series.id}>
          {inner}
        </a>
      ) : (
        <div className="group block cursor-not-allowed rounded-xl" aria-disabled="true" aria-label={`${series.title} — em breve, ainda indisponível`} data-coming-soon={series.id}>
          {inner}
        </div>
      )}
    </li>
  );
}

export function EpisodeCard({ episode, wide = false }: { episode: Episode; wide?: boolean }) {
  const { state } = useProgress();
  const s = getSeries(episode.seriesId)!;
  const done = !!state.episodes[episode.id];
  return (
    <li className={wide ? 'w-full' : 'w-[72vw] max-w-[320px] min-w-[230px] sm:w-[300px]'}>
      <a href={href.episode(episode.id)} className="group block rounded-xl" data-episode-card={episode.id}>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/5 shadow-[var(--shadow-card)]">
          <EpisodeCover theme={s.theme} illustration={episode.cover} number={episode.number} title={episode.title} className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink">
              <Icon name="play" className="h-6 w-6" />
            </span>
          </div>
          {done && (
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-ok px-2 py-0.5 text-xs font-bold text-ink">
              <Icon name="check" className="h-3.5 w-3.5" /> Concluído
            </span>
          )}
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">{episode.durationMinutes} min</span>
        </div>
        <div className="mt-2">
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: s.theme.accent }}>
            {s.shortTitle} · Ep. {episode.number}
          </div>
          <div className="font-semibold leading-snug text-white group-hover:underline">{episode.title}</div>
          <p className="mt-0.5 line-clamp-2 text-sm text-mute">{episode.tagline}</p>
        </div>
      </a>
    </li>
  );
}

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const { state } = useProgress();
  const s = getSeries(quiz.seriesId)!;
  const best = state.quizzes[quiz.id]?.best;
  return (
    <li className="w-[72vw] max-w-[340px] min-w-[240px] sm:w-[320px]">
      <a href={href.quiz(quiz.id)} className="group block overflow-hidden rounded-xl border border-white/10" data-quiz-card={quiz.id}>
        <div className="relative aspect-[16/9] p-4" style={{ background: `linear-gradient(135deg, #0b0c12 0%, ${s.theme.via} 60%, ${s.theme.to} 130%)` }}>
          <div className="chip bg-black/40">
            <Icon name="trophy" className="h-3.5 w-3.5" /> Filme especial
          </div>
          <div className="mt-3 font-display text-2xl font-extrabold leading-tight text-white">
            Desafio Clínico:
            <br />
            {s.title}
          </div>
          <div className="absolute bottom-3 left-4 text-xs text-white/85">{quiz.questions.length} questões · feedback imediato</div>
          {best !== undefined && <div className="absolute bottom-3 right-4 rounded-full bg-black/50 px-2 py-0.5 text-xs font-bold text-white">Melhor: {best}%</div>}
        </div>
      </a>
    </li>
  );
}

export function CaseCard({ c }: { c: ClinicalCase }) {
  const { state } = useProgress();
  const s = getSeries(c.seriesId)!;
  const prog = state.cases[c.id];
  return (
    <li className="w-[72vw] max-w-[340px] min-w-[240px] sm:w-[320px]">
      <a href={href.case(c.id)} className="group block overflow-hidden rounded-xl border border-white/10" data-case-card={c.id}>
        <div className="relative aspect-[16/9] p-4" style={{ background: `radial-gradient(circle at 80% 20%, ${s.theme.to}55, transparent 60%), linear-gradient(160deg, ${s.theme.from}, #07080d)` }}>
          <div className="chip bg-black/40">
            <Icon name="stethoscope" className="h-3.5 w-3.5" /> Episódio especial · Caso clínico
          </div>
          <div className="mt-3 font-display text-lg font-bold leading-snug text-white">{c.title.replace(/^Caso Clínico [A-C] — /, '')}</div>
          <p className="mt-1 line-clamp-2 text-sm text-white/80">{c.hook}</p>
          {prog?.completedAt && <div className="absolute bottom-3 right-4 rounded-full bg-ok px-2 py-0.5 text-xs font-bold text-ink">Resolvido</div>}
        </div>
      </a>
    </li>
  );
}
