import { useEffect, useMemo, useState } from 'react';
import { allCases, allEpisodes, allQuizzes, availableSeries, comingSoonSeries, episodesOf, getCase, getEpisode, getQuiz, getSeries } from '../data/catalog.ts';
import { seriesArt } from '../data/media.ts';
import { CaseCard, EpisodeCard, QuizCard, Rail, SeriesCard, Top10Card } from '../components/Cards.tsx';
import { Photo } from '../components/Photo.tsx';
import { Icon } from '../components/ui.tsx';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import type { ProgressState } from '../lib/progress.ts';
import { top10 } from './top10.ts';
export { top10 };

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

/** Item salvo em “Minha lista” renderizado como cartão. */
export function ListItemCard({ itemKey }: { itemKey: string }) {
  const [kind, id] = itemKey.split(':');
  if (kind === 'episode' && getEpisode(id)) return <EpisodeCard episode={getEpisode(id)!} />;
  if (kind === 'case' && getCase(id)) return <CaseCard c={getCase(id)!} />;
  if (kind === 'quiz' && getQuiz(id)) return <QuizCard quiz={getQuiz(id)!} />;
  if (kind === 'series' && getSeries(id)) return <SeriesCard series={getSeries(id)!} />;
  return null;
}

export function Home({ background = false }: { background?: boolean }) {
  const { state } = useProgress();
  const series = availableSeries();
  const lastSeries = state.recent.map((r) => (r.kind === 'series' ? r.id : r.kind === 'episode' ? getEpisode(r.id)?.seriesId : undefined)).find(Boolean);
  const [featuredIdx, setFeaturedIdx] = useState(() => Math.max(0, series.findIndex((s) => s.id === lastSeries)));
  const featured = series[featuredIdx];
  const cont = continueTarget(state);
  const top = useMemo(() => top10(), []);
  const T = background ? 'h2' : 'h1';

  useEffect(() => {
    if (!background) document.title = 'Início — MAPD-Flix';
  }, [background]);

  const watching = allEpisodes.filter((e) => !state.episodes[e.id] && (state.reading[e.id] ?? 0) > 0.02);
  const recentOthers = state.recent.filter((r) => r.kind === 'case' || r.kind === 'quiz').slice(0, 4);

  return (
    <div inert={background} aria-hidden={background || undefined}>
      {/* BILLBOARD */}
      <section aria-label={`Destaque: série ${featured.title}`} className="relative h-[82vh] max-h-[860px] min-h-[520px] overflow-hidden">
        <Photo key={featured.id} photo={seriesArt[featured.id].billboard} className="ken-burns absolute inset-0 h-full w-full" eager />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 md:hidden" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page relative flex h-full flex-col justify-end pb-[12vh]">
          <div className="max-w-2xl animate-fade-up" key={featured.id}>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.35em] text-white/90">
              <span className="rounded-[2px] bg-brand px-1 pb-px pt-[3px] font-title text-lg leading-none tracking-wider text-white">MAPD</span> Série
            </div>
            <T id="destaque" className="mt-1 font-title text-[clamp(2.6rem,6.2vw,6rem)] [overflow-wrap:break-word] leading-[0.85] tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,.6)]">
              {featured.title}
            </T>
            <div className="mt-3 flex items-center gap-2">
              <span className="grid h-7 place-items-center rounded-sm bg-brand px-1.5 font-title text-lg leading-none text-white">TOP</span>
              <span className="text-lg font-bold text-white">Série nº {featured.order} do módulo de Imunologia Clínica</span>
            </div>
            <p className="mt-3 line-clamp-3 text-base text-white drop-shadow md:text-lg">{featured.tagline} {featured.synopsis}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={cont.href} className="btn btn-primary text-lg" data-testid="continuar-estudando">
                <Icon name="play" className="h-7 w-7" /> Assistir
              </a>
              <a href={href.series(featured.id)} className="btn btn-ghost text-lg" data-testid="explorar-serie">
                <Icon name="info" className="h-7 w-7" /> Mais informações
              </a>
            </div>
          </div>
          <div className="mt-8 flex gap-2" role="group" aria-label="Escolher série em destaque">
            {series.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setFeaturedIdx(i)}
                aria-pressed={i === featuredIdx}
                aria-label={`Destacar ${s.title}`}
                className={`h-1.5 rounded-full transition-all ${i === featuredIdx ? 'w-10 bg-white' : 'w-5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
        <span className="absolute bottom-[22vh] right-0 hidden border-l-[3px] border-white/80 bg-black/60 py-1.5 pl-3 pr-12 text-lg text-white sm:block" aria-label="Nível: graduação em Medicina">
          MED
        </span>
      </section>

      <div className="relative z-10 -mt-[10vh] space-y-3 pb-4">
        {(watching.length > 0 || recentOthers.length > 0) && (
          <Rail title={`Continuar estudando`} id="recentes">
            {watching.map((e) => (
              <EpisodeCard key={e.id} episode={e} />
            ))}
            {recentOthers.map((r) =>
              r.kind === 'case' && getCase(r.id) ? <CaseCard key={r.id} c={getCase(r.id)!} /> : r.kind === 'quiz' && getQuiz(r.id) ? <QuizCard key={r.id} quiz={getQuiz(r.id)!} /> : null,
            )}
          </Rail>
        )}

        {state.myList.length > 0 && (
          <Rail title="Minha lista" id="minha-lista" action={<a href={href.myList()} className="text-sm text-mute hover:text-white">Ver tudo ›</a>}>
            {state.myList.map((k) => (
              <ListItemCard key={k} itemKey={k} />
            ))}
          </Rail>
        )}

        <Rail title="Top 10 episódios mais cobrados nos desafios" id="top10">
          {top.map((t, i) => (
            <Top10Card key={t.episodeId} episode={getEpisode(t.episodeId)!} rank={i + 1} count={t.count} />
          ))}
        </Rail>

        {series.map((s) => (
          <Rail key={s.id} title={s.title} id={`trilho-${s.id}`} subtitle={s.tagline}>
            {episodesOf(s.id).map((e) => (
              <EpisodeCard key={e.id} episode={e} />
            ))}
            {s.caseId && getCase(s.caseId) && <CaseCard c={getCase(s.caseId)!} />}
          </Rail>
        ))}

        <Rail title="Séries MAPD" id="series">
          {series.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </Rail>

        <Rail title="Filmes especiais — Desafios clínicos" id="desafios">
          {allQuizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </Rail>

        <Rail title="Casos clínicos interativos" id="casos">
          {allCases.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </Rail>

        <Rail title="Em breve" id="em-breve" subtitle="Novas séries em produção">
          {comingSoonSeries().map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </Rail>
      </div>
    </div>
  );
}
