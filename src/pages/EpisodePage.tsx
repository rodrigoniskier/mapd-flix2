import { useCallback, useEffect, useState } from 'react';
import { getEpisode, getSeries, neighbors, episodesOf } from '../data/catalog.ts';
import { EpisodeContent, episodeSectionAnchors } from '../components/EpisodeContent.tsx';
import { Icon } from '../components/ui.tsx';
import { SlideShow } from '../components/SlideShow.tsx';
import { Photo } from '../components/Photo.tsx';
import { ListButton, RateButton } from '../components/Cards.tsx';
import { photoFor } from '../data/media.ts';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import { NotFound } from './NotFound.tsx';

export function EpisodePage({ id }: { id: string }) {
  const ep = getEpisode(id);
  const { state, setCompleted, visit, readEpisode } = useProgress();
  const [read, setRead] = useState(0);
  const [slides, setSlides] = useState(false);
  const closeSlides = useCallback(() => setSlides(false), []);
  // Ao trocar de episódio, volta ao modo de navegação.
  useEffect(() => setSlides(false), [id]);
  useEffect(() => {
    if (ep) {
      document.title = `Ep. ${ep.number}: ${ep.title} — MAPD-Flix`;
      visit('episode', ep.id);
    }
  }, [ep, visit]);
  // Barra de progresso de leitura (como a linha do tempo de um player) e registro para “Continuar estudando”.
  useEffect(() => {
    if (!ep) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const f = max > 0 ? Math.min(1, scrollY / max) : 0;
        setRead(f);
      });
    };
    on();
    addEventListener('scroll', on, { passive: true });
    return () => {
      removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, [ep]);
  useEffect(() => {
    if (ep && read > 0.05) {
      const t = setTimeout(() => readEpisode(ep.id, read), 400);
      return () => clearTimeout(t);
    }
  }, [ep, read, readEpisode]);
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
      <div className="no-print fixed inset-x-0 top-0 z-50 h-[3px] bg-white/15" aria-hidden="true">
        <div className="h-full bg-brand transition-[width] duration-150" style={{ width: `${read * 100}%` }} />
      </div>
      <header className="relative overflow-hidden">
        <div className="relative h-[62vh] max-h-[620px] min-h-[420px]">
          <Photo photo={photoFor(ep.id)} className="absolute inset-0 h-full w-full" eager />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 md:hidden" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
          <div className="container-page relative flex h-full flex-col justify-end pb-10">
            <nav aria-label="Trilha" className="text-sm text-soft">
              <a href={href.home()} className="hover:text-white">Início</a> <span aria-hidden="true">›</span>{' '}
              <a href={href.series(s.id)} className="hover:text-white">{s.title}</a> <span aria-hidden="true">›</span> Episódio {ep.number}
            </nav>
            <div className="mt-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-white/90">
              <span className="rounded-[2px] bg-brand px-1 pb-px pt-[3px] font-title text-base leading-none tracking-wider text-white">MAPD</span> {s.title} · E{ep.number} de {total}
            </div>
            <h1 className="mt-1 max-w-4xl font-title text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] [overflow-wrap:anywhere] tracking-wide text-white drop-shadow-lg">{ep.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90">{ep.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-bold text-ok">{done ? 'Concluído' : read > 0.05 ? `${Math.round(read * 100)}% lido` : 'Novo'}</span>
              <span className="text-soft">{ep.durationMinutes} min</span>
              <span className="rounded-sm border border-white/40 px-1.5 text-[11px] text-soft">MED</span>
              <span className="text-soft">{ep.keyTerms.length} conceitos · {ep.activity.length} questões</span>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {completeBtn}
              <button type="button" onClick={() => setSlides(true)} className="btn btn-ghost" data-testid="ver-tela-cheia">
                <Icon name="expand" className="h-5 w-5" /> Ver em tela cheia
              </button>
              <a href={href.printEpisode(ep.id)} className="btn btn-ghost" data-testid="imprimir-episodio">
                <Icon name="print" className="h-5 w-5" /> Imprimir
              </a>
              <ListButton itemKey={`episode:${ep.id}`} label={ep.title} size="lg" />
              <RateButton itemKey={`episode:${ep.id}`} label={ep.title} size="lg" />
            </div>
          </div>
        </div>
      </header>

      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="hidden lg:block">
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
        </div>
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
      {next && read > 0.85 && (
        <a href={href.episode(next.id)} style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))', right: 'max(1.5rem, env(safe-area-inset-right))' }} className="no-print fixed z-40 flex items-center gap-2 rounded bg-white px-5 py-3 font-bold text-black shadow-2xl animate-fade-up hover:bg-white/85" data-testid="proximo-flutuante">
          <Icon name="play" className="h-5 w-5" /> Próximo episódio
        </a>
      )}
      {slides && <SlideShow episode={ep} series={s} onClose={closeSlides} />}
    </article>
  );
}
