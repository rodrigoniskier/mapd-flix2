import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Episode, Series } from '../domain/types.ts';
import { videos } from '../data/videos.ts';
import { buildSlides, clampSlide, type Slide } from '../lib/slides.ts';
import { useProgress } from '../lib/store.tsx';
import { BlockView, CheckQuestion } from './blocks.tsx';
import { References } from './References.tsx';
import { VideoCard } from './VideoCard.tsx';
import { Icon, Rich } from './ui.tsx';

const H = 'font-title text-4xl tracking-wide text-white md:text-5xl';

/** Apresentação em slides (carrossel) em tela cheia; “Voltar à navegação” retorna ao modo rolagem. */
export function SlideShow({ episode, series, onClose }: { episode: Episode; series: Series; onClose: () => void }) {
  const { state, answerActivity } = useProgress();
  const video = videos.find((v) => v.episodeIds.includes(episode.id));
  const slides = useMemo(() => buildSlides(episode, !!video), [episode, video]);
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement | null>(null);
  const body = useRef<HTMLDivElement | null>(null);
  const total = slides.length;
  const go = useCallback((n: number) => setI(clampSlide(n, total)), [total]);

  // Tela cheia nativa (quando o navegador permite); sem ela, a sobreposição já ocupa toda a janela.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    root.current?.focus();
    let entered = false;
    root.current
      ?.requestFullscreen?.()
      .then(() => {
        entered = true;
      })
      .catch(() => {});
    const onFs = () => {
      if (entered && !document.fullscreenElement) onClose();
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      document.body.style.overflow = prevOverflow;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      prevFocus?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    body.current?.scrollTo({ top: 0 });
  }, [i]);

  const onKey = (e: { key?: string; preventDefault(): void }) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      go(i - 1);
    } else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(total - 1);
  };

  const slide = slides[i]!;
  return (
    <div
      ref={root}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Apresentação: ${episode.title}`}
      onKeyDown={onKey}
      className="no-print fixed inset-0 z-[100] flex flex-col bg-ink text-white outline-none"
      data-testid="slideshow"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2 sm:px-6">
        <span className="rounded-[2px] bg-brand px-1 pb-px pt-[3px] font-title text-base leading-none tracking-wider text-white">MAPD</span>
        <span className="min-w-0 flex-1 truncate text-sm text-soft">
          {series.title} · Ep. {episode.number}: {episode.title}
        </span>
        <button type="button" onClick={onClose} className="btn btn-ghost !px-3 !py-1.5 text-sm" data-testid="sair-slides">
          <Icon name="x" className="h-4 w-4" /> Voltar à navegação
        </button>
      </div>

      <div ref={body} className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-10 md:px-16" data-testid="slide-corpo">
        <div key={i} className="mx-auto flex min-h-full w-full max-w-5xl animate-fade-up flex-col justify-center text-lg" data-slide={slide.kind}>
          <SlideBody slide={slide} episode={episode} series={series} activities={state.activities} answer={answerActivity} video={video} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line px-4 py-2 sm:px-6">
        <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className="btn btn-ghost !px-3 !py-1.5 disabled:opacity-40" aria-label="Slide anterior" data-testid="slide-anterior">
          <Icon name="chevronLeft" className="h-5 w-5" /> <span className="hidden sm:inline">Anterior</span>
        </button>
        <div className="flex-1">
          <div className="h-[3px] w-full bg-white/20" role="progressbar" aria-label="Progresso da apresentação" aria-valuemin={1} aria-valuemax={total} aria-valuenow={i + 1}>
            <div className="h-full bg-brand transition-[width] duration-200" style={{ width: `${((i + 1) / total) * 100}%` }} />
          </div>
          <div className="mt-1 text-center text-xs text-soft" aria-live="polite" data-testid="slide-contador">
            Slide {i + 1} de {total}
          </div>
        </div>
        {i < total - 1 ? (
          <button type="button" onClick={() => go(i + 1)} className="btn btn-primary !px-3 !py-1.5" aria-label="Próximo slide" data-testid="slide-proximo">
            <span className="hidden sm:inline">Próximo</span> <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        ) : (
          <button type="button" onClick={onClose} className="btn btn-primary !px-3 !py-1.5" data-testid="slide-fim">
            Concluir
          </button>
        )}
      </div>
    </div>
  );
}

function SlideBody({
  slide,
  episode,
  series,
  activities,
  answer,
  video,
}: {
  slide: Slide;
  episode: Episode;
  series: Series;
  activities: Record<string, string>;
  answer: (questionId: string, optionId: string) => void;
  video: (typeof videos)[number] | undefined;
}) {
  switch (slide.kind) {
    case 'capa':
      return (
        <div>
          <div className="text-sm font-bold uppercase tracking-[0.25em] text-white/90">
            {series.title} · Episódio {episode.number}
          </div>
          <h2 className="mt-2 font-title text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9] tracking-wide [overflow-wrap:anywhere]">{episode.title}</h2>
          <p className="mt-4 max-w-3xl text-xl text-white/90">{episode.tagline}</p>
          <p className="mt-6 text-sm text-soft">Use as setas ← → do teclado ou os botões abaixo. Esc volta à navegação.</p>
        </div>
      );
    case 'pergunta':
      return (
        <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/15 to-transparent p-6 md:p-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-2">Pergunta orientadora</h2>
          <p className="mt-3 font-display text-3xl font-semibold leading-snug md:text-4xl">{episode.guidingQuestion}</p>
        </div>
      );
    case 'objetivos':
      return (
        <div>
          <h2 className={H}>Objetivos de aprendizagem</h2>
          <ul className="mt-5 space-y-3">
            {episode.objectives.map((o) => (
              <li key={o} className="flex gap-3 rounded-xl bg-white/[0.04] px-4 py-3">
                <Icon name="check" className="mt-1.5 h-5 w-5 shrink-0 text-ok" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'conceitos':
      return (
        <div>
          <h2 className={H}>{slide.title}</h2>
          <dl className="mt-5 grid gap-3 md:grid-cols-2">
            {slide.terms.map((t) => (
              <div key={t.term} className="card-surface p-4">
                <dt className="font-display font-bold text-white">{t.term}</dt>
                <dd className="mt-1 text-base">
                  <Rich text={t.definition} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case 'bloco':
      return (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-2">{slide.title}</h2>
          <div className="mt-3">
            <BlockView block={slide.block} />
          </div>
        </div>
      );
    case 'questao':
      return (
        <div>
          <h2 className={H}>Atividade de fixação</h2>
          <div className="mt-4">
            <CheckQuestion q={slide.question} index={slide.index} selected={activities[slide.question.id]} onAnswer={(o) => answer(slide.question.id, o)} />
          </div>
        </div>
      );
    case 'sintese':
      return (
        <div>
          <h2 className={H}>Síntese do episódio</h2>
          <ol className="mt-5 space-y-3">
            {episode.synthesis.map((s, n) => (
              <li key={n} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/20 text-sm font-bold">{n + 1}</span>
                <span className="pt-0.5">
                  <Rich text={s} />
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-xl bg-white/[0.04] px-4 py-3 text-base">
            <strong>Volte à pergunta orientadora:</strong> {episode.guidingQuestion} — sua hipótese inicial mudou?
          </p>
        </div>
      );
    case 'video':
      return (
        <div>
          <h2 className={H}>Vídeo complementar</h2>
          <div className="mt-4 max-w-3xl">
            <VideoCard video={video} />
          </div>
        </div>
      );
    case 'referencias':
      return <References citations={episode.citations} />;
  }
}
