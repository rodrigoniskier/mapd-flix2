import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { ClinicalCase, Episode, Quiz, Series } from '../domain/types.ts';
import { episodesOf, getSeries } from '../data/catalog.ts';
import { photoFor, seriesArt } from '../data/media.ts';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import { completion } from '../lib/progress.ts';
import { Photo } from './Photo.tsx';
import { Icon } from './ui.tsx';

/* ------------------------------------------------------------------ */
/* Fileira (carrossel) com setas laterais                              */
/* ------------------------------------------------------------------ */

export function Rail({ title, id, children, subtitle, action }: { title: string; id?: string; subtitle?: string; children?: ReactNode; action?: ReactNode }) {
  const hid = id ? `${id}-titulo` : undefined;
  const ref = useRef<HTMLUListElement | null>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.85, behavior: 'smooth' });
  return (
    <section id={id} aria-labelledby={hid} className="group/row relative scroll-mt-20 py-2 md:py-3" data-row={id}>
      <div className="container-page flex items-baseline gap-3">
        <h2 id={hid} className="text-[1.05rem] font-bold text-soft md:text-[1.4rem]">
          {title}
        </h2>
        {subtitle && <span className="hidden text-sm text-mute md:inline">{subtitle}</span>}
        {action && <span className="ml-auto">{action}</span>}
      </div>
      <div className="relative">
        <ul className="rail container-page" role="list" ref={ref}>
          {children}
        </ul>
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={`Anteriores em ${title}`}
          className="absolute inset-y-0 left-0 z-10 hidden w-12 place-items-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/row:opacity-100 md:grid"
        >
          <Icon name="chevronLeft" className="h-9 w-9" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={`Próximos em ${title}`}
          className="absolute inset-y-0 right-0 z-10 hidden w-12 place-items-center bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/row:opacity-100 md:grid"
        >
          <Icon name="chevronRight" className="h-9 w-9" />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Botões de ação do cartão (Minha lista, gostei, mais informações)    */
/* ------------------------------------------------------------------ */

export function ListButton({ itemKey, label, size = 'md' }: { itemKey: string; label: string; size?: 'md' | 'lg' }) {
  const { state, toggleList } = useProgress();
  const on = state.myList.includes(itemKey);
  return (
    <button
      type="button"
      className={`icon-btn ${size === 'lg' ? 'h-11 w-11' : 'h-8 w-8'}`}
      aria-pressed={on}
      aria-label={on ? `Remover ${label} da Minha lista` : `Adicionar ${label} à Minha lista`}
      title={on ? 'Remover da Minha lista' : 'Adicionar à Minha lista'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleList(itemKey);
      }}
      data-list-button={itemKey}
    >
      <Icon name={on ? 'check' : 'plus'} className={size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'} />
    </button>
  );
}

export function RateButton({ itemKey, label, size = 'md' }: { itemKey: string; label: string; size?: 'md' | 'lg' }) {
  const { state, rateItem } = useProgress();
  const on = state.ratings[itemKey] === 'up';
  return (
    <button
      type="button"
      className={`icon-btn ${size === 'lg' ? 'h-11 w-11' : 'h-8 w-8'}`}
      aria-pressed={on}
      aria-label={`Gostei de ${label}`}
      title="Gostei"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        rateItem(itemKey, 'up');
      }}
    >
      <Icon name="thumbUp" className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Cartão de título (episódio, caso, desafio) com expansão no hover    */
/* ------------------------------------------------------------------ */

interface TitleCardProps {
  to: string;
  photoKey: string;
  kicker: string;
  title: string;
  meta: string[];
  itemKey: string;
  seriesId?: string;
  badge?: ReactNode;
  progress?: number;
  dataAttr: Record<string, string>;
}

function TitleCard({ to, photoKey, kicker, title, meta, itemKey, seriesId, badge, progress, dataAttr }: TitleCardProps) {
  const photo = photoFor(photoKey);
  return (
    <li className="title-card w-[58vw] max-w-[300px] min-w-[200px] sm:w-[270px]">
      <div className="title-card__inner relative overflow-hidden rounded-[4px] bg-panel">
        <a href={to} className="block" {...dataAttr} aria-label={`${kicker}: ${title}`}>
          <div className="relative flex aspect-video overflow-hidden bg-panel">
            <Photo photo={photo} className="h-full w-full" decorative />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 via-50% to-transparent to-90%" />
            <span className="absolute left-2 top-2 rounded-[2px] bg-brand px-1 pb-px pt-[3px] font-title text-sm leading-none tracking-wider text-white">MAPD</span>
            {badge && <span className="absolute right-2 top-2">{badge}</span>}
            <span className="absolute inset-x-2 bottom-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-white">{kicker}</span>
              <span className="line-clamp-2 block font-bold leading-snug text-white drop-shadow">{title}</span>
            </span>
            {progress !== undefined && progress > 0 && (
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/30" aria-hidden="true">
                <span className="block h-full bg-brand" style={{ width: `${Math.round(progress * 100)}%` }} />
              </span>
            )}
          </div>
        </a>
        {/* painel revelado no hover/foco (desktop) */}
        <div className="title-card__panel absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-black/60 p-2.5">
          <div className="flex items-center gap-2">
            <a href={to} className="grid h-8 w-8 place-items-center rounded-full bg-white text-black hover:bg-white/80" aria-label={`Assistir: ${title}`} tabIndex={-1}>
              <Icon name="play" className="h-4 w-4" />
            </a>
            <ListButton itemKey={itemKey} label={title} />
            <RateButton itemKey={itemKey} label={title} />
            {seriesId && (
              <a href={href.series(seriesId)} className="icon-btn ml-auto h-8 w-8" aria-label={`Mais informações sobre a série`} title="Mais informações" tabIndex={-1}>
                <Icon name="chevronDown" className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            {meta.map((m, i) => (
              <span key={m} className={i === 0 ? 'font-bold text-ok' : 'text-soft'}>
                {i > 0 && <span className="mr-2 text-mute">•</span>}
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export function EpisodeCard({ episode }: { episode: Episode }) {
  const { state } = useProgress();
  const s = getSeries(episode.seriesId)!;
  const done = !!state.episodes[episode.id];
  const reading = done ? 1 : state.reading[episode.id];
  return (
    <TitleCard
      to={href.episode(episode.id)}
      photoKey={episode.id}
      kicker={`${s.shortTitle} · Ep. ${episode.number}`}
      title={episode.title}
      meta={[done ? 'Concluído' : `Episódio ${episode.number}`, `${episode.durationMinutes} min`, `${episode.keyTerms.length} conceitos`]}
      itemKey={`episode:${episode.id}`}
      seriesId={s.id}
      badge={done ? <span className="rounded-sm bg-ok px-1.5 py-0.5 text-[10px] font-bold text-black">CONCLUÍDO</span> : undefined}
      progress={reading}
      dataAttr={{ 'data-episode-card': episode.id }}
    />
  );
}

export function CaseCard({ c }: { c: ClinicalCase }) {
  const { state } = useProgress();
  const s = getSeries(c.seriesId)!;
  const prog = state.cases[c.id];
  return (
    <TitleCard
      to={href.case(c.id)}
      photoKey={c.id}
      kicker={`Caso clínico · ${s.shortTitle}`}
      title={c.title.replace(/^Caso Clínico [A-C] — /, '')}
      meta={[prog?.completedAt ? 'Resolvido' : 'Episódio especial', `${c.steps.length} etapas`, 'Decisões clínicas']}
      itemKey={`case:${c.id}`}
      seriesId={s.id}
      badge={<span className="rounded-sm bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">CASO</span>}
      progress={prog ? (prog.step + 1) / c.steps.length : undefined}
      dataAttr={{ 'data-case-card': c.id }}
    />
  );
}

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const { state } = useProgress();
  const s = getSeries(quiz.seriesId)!;
  const best = state.quizzes[quiz.id]?.best;
  return (
    <TitleCard
      to={href.quiz(quiz.id)}
      photoKey={quiz.id}
      kicker="Filme especial · Desafio clínico"
      title={s.title}
      meta={[best !== undefined ? `Melhor: ${best}%` : 'Novo', `${quiz.questions.length} questões`, 'Feedback imediato']}
      itemKey={`quiz:${quiz.id}`}
      seriesId={s.id}
      badge={<span className="rounded-sm bg-white px-1.5 py-0.5 text-[10px] font-bold text-black">DESAFIO</span>}
      dataAttr={{ 'data-quiz-card': quiz.id }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Pôster de série (vertical)                                          */
/* ------------------------------------------------------------------ */

export function SeriesCard({ series }: { series: Series }) {
  const { state, toggleRemind } = useProgress();
  const eps = episodesOf(series.id);
  const pct = completion(state, eps.map((e) => e.id));
  const available = series.status === 'disponivel';
  const art = seriesArt[series.id];
  const reminded = state.reminders.includes(series.id);
  const poster = (
    <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] bg-panel" style={{ containerType: 'inline-size' }}>
      <Photo photo={art?.poster} className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.05] ${available ? '' : 'grayscale-[40%]'}`} decorative />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-55% to-black/20 to-90%" />
      <span className="absolute left-2 top-2 rounded-[2px] bg-brand px-1 pb-px pt-[3px] font-title text-sm leading-none tracking-wider text-white">MAPD</span>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-white">Série</div>
        <div className="font-title leading-[0.95] tracking-wide text-white [overflow-wrap:break-word]" style={{ fontSize: 'min(2rem, 11.5cqw)' }}>{series.title}</div>
        {available ? (
          <div className="mt-1 text-xs text-white/85">{eps.length} episódios · caso · desafio</div>
        ) : (
          <div className="mt-2 inline-flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 text-[11px] font-bold text-white">
            <Icon name="lock" className="h-3.5 w-3.5" /> EM BREVE · indisponível
          </div>
        )}
      </div>
      {available && pct > 0 && (
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/30" aria-hidden="true">
          <span className="block h-full bg-brand" style={{ width: `${Math.round(pct * 100)}%` }} />
        </span>
      )}
    </div>
  );
  return (
    <li className="relative w-[38vw] max-w-[210px] min-w-[140px] sm:w-[190px]">
      <div>
        {available ? (
          <a href={href.series(series.id)} className="group block" aria-label={`${series.title} — ${series.tagline}`} data-series-card={series.id}>
            {poster}
          </a>
        ) : (
          <div className="group" aria-label={`${series.title} — em breve, ainda indisponível`} data-coming-soon={series.id}>
            <div aria-disabled="true">{poster}</div>
            <button
              type="button"
              className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-sm py-1.5 text-xs font-bold ${reminded ? 'bg-white text-black' : 'bg-white/15 text-white hover:bg-white/25'}`}
              aria-pressed={reminded}
              onClick={() => toggleRemind(series.id)}
            >
              <Icon name={reminded ? 'check' : 'bell'} className="h-4 w-4" /> {reminded ? 'Lembrete ativado' : 'Lembre-me'}
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Top 10 (número grande + pôster)                                     */
/* ------------------------------------------------------------------ */

export function Top10Card({ episode, rank, count }: { episode: Episode; rank: number; count: number }) {
  const s = getSeries(episode.seriesId)!;
  return (
    <li className="flex w-[64vw] max-w-[310px] min-w-[220px] items-end sm:w-[290px]" data-top10={rank}>
      <span className="rank-number" aria-hidden="true">
        {rank}
      </span>
      <a
        href={href.episode(episode.id)}
        className="group relative -ml-[6%] block aspect-[2/3] w-[54%] shrink-0 overflow-hidden rounded-[4px] bg-panel"
        aria-label={`Top ${rank}: ${episode.title} — cobrado em ${count} questões dos desafios`}
      >
        <Photo photo={photoFor(episode.id)} className="h-full w-full transition-transform duration-300 group-hover:scale-105" decorative />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-60% to-black/30" />
        <span className="absolute left-1.5 top-1.5 rounded-[2px] bg-brand px-1 pb-px pt-[3px] font-title text-sm leading-none tracking-wider text-white">MAPD</span>
        <span className="absolute inset-x-2 bottom-2">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-white">{s.shortTitle}</span>
          <span className="line-clamp-3 block text-sm font-bold leading-tight text-white">{episode.title}</span>
        </span>
      </a>
    </li>
  );
}
