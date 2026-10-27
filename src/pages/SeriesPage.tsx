import { useEffect } from 'react';
import { episodesOf, getCase, getQuiz, getSeries } from '../data/catalog.ts';
import { videoById } from '../data/videos.ts';
import { CaseCard, EpisodeCard, QuizCard } from '../components/Cards.tsx';
import { References } from '../components/References.tsx';
import { VideoCard } from '../components/VideoCard.tsx';
import { Icon, ProgressBar } from '../components/ui.tsx';
import { SeriesBanner, SeriesPoster } from '../illustrations/index.tsx';
import { completion } from '../lib/progress.ts';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import { NotFound } from './NotFound.tsx';

export function SeriesPage({ id }: { id: string }) {
  const s = getSeries(id);
  const { state, visit } = useProgress();
  const available = s?.status === 'disponivel';
  useEffect(() => {
    if (s && available) {
      document.title = `${s.title} — MAPD-Flix`;
      visit('series', s.id);
    }
  }, [s, available, visit]);

  // Séries "em breve" não têm página: evita navegação para conteúdo vazio.
  if (!s || !available) return <NotFound message={s ? `A série “${s.title}” ainda não está disponível — em breve.` : undefined} />;

  const eps = episodesOf(s.id);
  const pct = completion(state, eps.map((e) => e.id));
  const doneCount = eps.filter((e) => state.episodes[e.id]).length;
  const nextEp = eps.find((e) => !state.episodes[e.id]) ?? eps[0];
  const quiz = s.quizId ? getQuiz(s.quizId) : undefined;
  const cc = s.caseId ? getCase(s.caseId) : undefined;
  const video = s.videoId ? videoById.get(s.videoId) : undefined;

  return (
    <div>
      <section className="relative -mt-16 overflow-hidden">
        <SeriesBanner theme={s.theme} title={s.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-page relative grid grid-cols-1 gap-8 pb-10 pt-28 md:grid-cols-[220px_minmax(0,1fr)] md:pb-14">
          <div className="hidden md:block">
            <SeriesPoster theme={s.theme} title={s.title} className="w-full rounded-xl shadow-2xl" />
          </div>
          <div className="max-w-3xl">
            <nav aria-label="Trilha" className="text-sm text-mute">
              <a href={href.home()} className="hover:text-white">Início</a> <span aria-hidden="true">›</span> Série {s.order}
            </nav>
            <h1 className="mt-2 font-display text-4xl font-extrabold md:text-6xl">{s.title}</h1>
            <p className="mt-2 text-lg text-white/90">{s.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="chip">{eps.length} episódios</span>
              {cc && <span className="chip">+ caso clínico</span>}
              {quiz && <span className="chip">+ desafio com {quiz.questions.length} questões</span>}
              <span className="chip">{eps.reduce((a, e) => a + e.durationMinutes, 0)} min de estudo</span>
            </div>
            <p className="mt-4 text-soft">{s.synopsis}</p>
            <div className="mt-5 max-w-md">
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold text-white">Seu progresso</span>
                <span>
                  {doneCount}/{eps.length} episódios
                </span>
              </div>
              <ProgressBar value={pct} label={`Progresso em ${s.title}`} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={href.episode(nextEp.id)} className="btn btn-primary" data-testid="assistir-episodio">
                <Icon name="play" className="h-5 w-5" /> {doneCount === 0 ? 'Começar: Episódio 1' : `Continuar: Ep. ${nextEp.number}`}
              </a>
              {cc && (
                <a href={href.case(cc.id)} className="btn btn-ghost">
                  <Icon name="stethoscope" className="h-5 w-5" /> Caso clínico
                </a>
              )}
              {quiz && (
                <a href={href.quiz(quiz.id)} className="btn btn-ghost">
                  <Icon name="trophy" className="h-5 w-5" /> Desafio clínico
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <section aria-labelledby="episodios">
            {s.seasons.map((season) => (
              <div key={season.number}>
                <h2 id="episodios" className="text-xl font-bold">
                  Episódios <span className="text-base font-medium text-mute">· {season.title}</span>
                </h2>
                <ul className="mt-4 grid gap-6 sm:grid-cols-2" role="list">
                  {eps.map((e) => (
                    <EpisodeCard key={e.id} episode={e} wide />
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section aria-labelledby="especiais" className="mt-10">
            <h2 id="especiais" className="text-xl font-bold">
              Episódio especial e desafio
            </h2>
            <ul className="mt-4 flex flex-wrap gap-6" role="list">
              {cc && <CaseCard c={cc} />}
              {quiz && <QuizCard quiz={quiz} />}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section aria-labelledby="objetivos" className="card-surface p-5">
            <h2 id="objetivos" className="text-lg font-bold">
              Objetivos de aprendizagem
            </h2>
            <ul className="mt-3 space-y-2 text-[0.95rem]">
              {s.learningObjectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-ok" /> {o}
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-mute">Competências (DCN/ABEM)</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {s.competencies.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="video-serie">
            <h2 id="video-serie" className="mb-2 text-lg font-bold">
              Vídeo complementar
            </h2>
            <VideoCard video={video} topicFallback={s.title} />
          </section>

          <section aria-labelledby="imprimir-serie" className="card-surface p-5">
            <h2 id="imprimir-serie" className="text-lg font-bold">
              Material de estudo
            </h2>
            <div className="mt-3 grid gap-2">
              <a className="btn btn-ghost justify-start" href={href.printSeries(s.id, 'resumo')}>
                <Icon name="print" className="h-5 w-5" /> Imprimir resumo da série
              </a>
              <a className="btn btn-ghost justify-start" href={href.printSeries(s.id, 'completo')}>
                <Icon name="print" className="h-5 w-5" /> Imprimir conteúdo completo
              </a>
            </div>
          </section>

          <References citations={s.citations} />
        </aside>
      </div>
    </div>
  );
}
