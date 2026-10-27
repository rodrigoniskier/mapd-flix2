import { useEffect } from 'react';
import { getEpisode, getSeries, neighbors, episodesOf } from '../data/catalog.ts';
import { EpisodeContent, episodeSectionAnchors } from '../components/EpisodeContent.tsx';
import { Icon } from '../components/ui.tsx';
import { EpisodeCover } from '../illustrations/index.tsx';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import { NotFound } from './NotFound.tsx';

export function EpisodePage({ id }: { id: string }) {
  const ep = getEpisode(id);
  const { state, setCompleted, visit } = useProgress();
  useEffect(() => {
    if (ep) {
      document.title = `Ep. ${ep.number}: ${ep.title} — MAPD-Flix`;
      visit('episode', ep.id);
    }
  }, [ep, visit]);
  if (!ep) return <NotFound />;

  const s = getSeries(ep.seriesId)!;
  const { prev, next } = neighbors(ep.id);
  const done = !!state.episodes[ep.id];
  const total = episodesOf(s.id).length;
  const anchors = episodeSectionAnchors(ep);

  const completeBtn = (
    <button
      type="button"
      onClick={() => setCompleted(ep.id, !done)}
      aria-pressed={done}
      className={`btn ${done ? 'bg-ok text-ink hover:bg-ok/90' : 'btn-brand'}`}
      data-testid="marcar-concluido"
    >
      <Icon name="check" className="h-5 w-5" /> {done ? 'Concluído ✓ (desmarcar)' : 'Marcar como concluído'}
    </button>
  );

  return (
    <article>
      <header className="relative -mt-16 overflow-hidden">
        <EpisodeCover theme={s.theme} illustration={ep.cover} number={ep.number} title={ep.title} className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page relative pb-10 pt-28">
          <nav aria-label="Trilha" className="text-sm text-mute">
            <a href={href.home()} className="hover:text-white">Início</a> <span aria-hidden="true">›</span>{' '}
            <a href={href.series(s.id)} className="hover:text-white">{s.title}</a> <span aria-hidden="true">›</span> Episódio {ep.number}
          </nav>
          <div className="mt-3 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: s.theme.accent }}>
            {s.title} · Episódio {ep.number} de {total}
          </div>
          <h1 className="mt-1 max-w-4xl font-display text-4xl font-extrabold md:text-6xl">{ep.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">{ep.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="chip">
              <Icon name="clock" className="h-3.5 w-3.5" /> {ep.durationMinutes} min
            </span>
            <span className="chip">{ep.keyTerms.length} conceitos</span>
            <span className="chip">{ep.activity.length} questões de fixação</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {completeBtn}
            <a href={href.printEpisode(ep.id)} className="btn btn-ghost" data-testid="imprimir-episodio">
              <Icon name="print" className="h-5 w-5" /> Imprimir
            </a>
          </div>
        </div>
      </header>

      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav aria-label="Seções do episódio" className="sticky top-24 text-sm">
            <div className="mb-2 font-bold uppercase tracking-wider text-mute">Neste episódio</div>
            <ul className="space-y-1 border-l border-line">
              {anchors.map((a) => (
                <li key={a.id}>
                  <a href={`#/episodio/${ep.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(a.id)?.scrollIntoView({ behavior: 'smooth' }); }} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-soft hover:border-brand hover:text-white">
                    {a.t}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="min-w-0">
          <EpisodeContent episode={ep} />

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            {completeBtn}
            <div className="flex flex-wrap gap-3">
              {prev ? (
                <a href={href.episode(prev.id)} className="btn btn-ghost" data-testid="episodio-anterior">
                  <Icon name="chevronLeft" className="h-5 w-5" /> Ep. {prev.number}: {prev.title}
                </a>
              ) : (
                <a href={href.series(s.id)} className="btn btn-ghost">
                  <Icon name="chevronLeft" className="h-5 w-5" /> Voltar à série
                </a>
              )}
              {next ? (
                <a href={href.episode(next.id)} className="btn btn-primary" data-testid="proximo-episodio">
                  Ep. {next.number}: {next.title} <Icon name="chevronRight" className="h-5 w-5" />
                </a>
              ) : s.caseId ? (
                <a href={href.case(s.caseId)} className="btn btn-primary" data-testid="proximo-episodio">
                  Caso clínico da série <Icon name="chevronRight" className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
