import { useEffect, useState } from 'react';
import { allCases, allQuizzes, availableSeries, comingSoonSeries, episodesOf, getCase, getEpisode, getQuiz, getSeries } from '../data/catalog.ts';
import { CaseCard, EpisodeCard, QuizCard, Rail, SeriesCard } from '../components/Cards.tsx';
import { Icon } from '../components/ui.tsx';
import { SeriesBanner } from '../illustrations/index.tsx';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import type { ProgressState } from '../lib/progress.ts';

/** Próximo conteúdo sugerido: último acessado ou primeiro episódio não concluído. */
export function continueTarget(state: ProgressState): { href: string; label: string } {
  const last = state.recent[0];
  if (last) {
    if (last.kind === 'episode' && getEpisode(last.id)) return { href: href.episode(last.id), label: getEpisode(last.id)!.title };
    if (last.kind === 'case' && getCase(last.id)) return { href: href.case(last.id), label: getCase(last.id)!.title };
    if (last.kind === 'quiz' && getQuiz(last.id)) return { href: href.quiz(last.id), label: getQuiz(last.id)!.title };
    if (last.kind === 'series' && getSeries(last.id)) return { href: href.series(last.id), label: getSeries(last.id)!.title };
  }
  for (const s of availableSeries()) {
    const ep = episodesOf(s.id).find((e) => !state.episodes[e.id]);
    if (ep) return { href: href.episode(ep.id), label: ep.title };
  }
  const first = episodesOf(availableSeries()[0].id)[0];
  return { href: href.episode(first.id), label: first.title };
}

export function Home() {
  const { state } = useProgress();
  const series = availableSeries();
  const lastSeries = state.recent.map((r) => (r.kind === 'series' ? r.id : r.kind === 'episode' ? getEpisode(r.id)?.seriesId : undefined)).find(Boolean);
  const [featuredIdx, setFeaturedIdx] = useState(() => Math.max(0, series.findIndex((s) => s.id === lastSeries)));
  const featured = series[featuredIdx];
  const cont = continueTarget(state);

  useEffect(() => {
    document.title = 'MAPD-Flix — Imunologia Clínica em séries';
  }, []);

  const recentItems = state.recent.filter((r) => r.kind !== 'series').slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section aria-labelledby="destaque" className="relative -mt-16 min-h-[78vh] overflow-hidden md:min-h-[86vh]">
        <SeriesBanner theme={featured.theme} title={featured.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="container-page relative flex min-h-[78vh] flex-col justify-end pb-16 pt-28 md:min-h-[86vh] md:pb-24">
          <div className="max-w-2xl animate-fade-up" key={featured.id}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-brand text-white">Série {featured.order}</span>
              <span className="chip">{episodesOf(featured.id).length} episódios</span>
              <span className="chip">Caso clínico interativo</span>
              <span className="chip">Desafio clínico</span>
            </div>
            <h1 id="destaque" className="mt-3 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
              {featured.title}
            </h1>
            <p className="mt-3 text-lg text-white/90 md:text-xl">{featured.tagline}</p>
            <p className="mt-3 line-clamp-3 max-w-xl text-soft">{featured.synopsis}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={href.series(featured.id)} className="btn btn-primary text-base" data-testid="explorar-serie">
                <Icon name="play" className="h-5 w-5" /> Explorar série
              </a>
              <a href={cont.href} className="btn btn-ghost text-base" data-testid="continuar-estudando">
                <Icon name="book" className="h-5 w-5" /> Continuar estudando
              </a>
            </div>
            <p className="mt-2 text-sm text-mute">
              Continuar: <span className="text-soft">{cont.label}</span>
            </p>
          </div>
          <div className="mt-8 flex gap-2" role="group" aria-label="Escolher série em destaque">
            {series.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFeaturedIdx(i)}
                aria-pressed={i === featuredIdx}
                aria-label={`Destacar ${s.title}`}
                className={`h-2.5 rounded-full transition-all ${i === featuredIdx ? 'w-10 bg-white' : 'w-5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-10 space-y-2">
        {/* Busca móvel */}
        <div className="container-page sm:hidden">
          <form role="search" onSubmit={(e) => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value; location.hash = href.search(v); }}>
            <label htmlFor="busca-home" className="sr-only">Buscar temas e conceitos</label>
            <input id="busca-home" name="q" type="search" placeholder="Buscar temas e conceitos…" className="h-12 w-full rounded-xl border border-line bg-panel px-4 text-white placeholder:text-mute" />
          </form>
        </div>

        {recentItems.length > 0 && (
          <Rail title="Acessados recentemente" id="recentes">
            {recentItems.map((r) => {
              if (r.kind === 'episode' && getEpisode(r.id)) return <EpisodeCard key={r.kind + r.id} episode={getEpisode(r.id)!} />;
              if (r.kind === 'case' && getCase(r.id)) return <CaseCard key={r.kind + r.id} c={getCase(r.id)!} />;
              if (r.kind === 'quiz' && getQuiz(r.id)) return <QuizCard key={r.kind + r.id} quiz={getQuiz(r.id)!} />;
              return null;
            })}
          </Rail>
        )}

        <Rail title="Séries" id="series" subtitle="Escolha uma série para ver os episódios">
          {series.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </Rail>

        {series.map((s) => (
          <Rail key={s.id} title={`${s.title} — episódios`} id={`trilho-${s.id}`}>
            {episodesOf(s.id).map((e) => (
              <EpisodeCard key={e.id} episode={e} />
            ))}
            {s.caseId && getCase(s.caseId) && <CaseCard c={getCase(s.caseId)!} />}
          </Rail>
        ))}

        <Rail title="Filmes especiais — Desafios clínicos" id="desafios" subtitle="Quizzes com situações clínicas, feedback imediato e revisão orientada">
          {allQuizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </Rail>

        <Rail title="Casos clínicos interativos" id="casos" subtitle="Revelação progressiva e decisões clínicas">
          {allCases.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </Rail>

        <Rail title="Em breve" id="em-breve" subtitle="Novas séries em produção — ainda indisponíveis">
          {comingSoonSeries().map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </Rail>
      </div>
    </div>
  );
}
