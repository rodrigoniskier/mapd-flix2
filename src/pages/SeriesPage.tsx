import { useEffect, useRef, useState } from 'react';
import { allSeries, episodesOf, getCase, getQuiz, getSeries } from '../data/catalog.ts';
import { photoFor, professor, seriesArt } from '../data/media.ts';
import { videoById } from '../data/videos.ts';
import { ListButton, RateButton } from '../components/Cards.tsx';
import { Photo } from '../components/Photo.tsx';
import { References } from '../components/References.tsx';
import { VideoCard } from '../components/VideoCard.tsx';
import { Icon } from '../components/ui.tsx';
import { completion } from '../lib/progress.ts';
import { href } from '../lib/router.ts';
import { useProgress } from '../lib/store.tsx';
import { Home } from './Home.tsx';
import { NotFound } from './NotFound.tsx';

/** Página da série = catálogo ao fundo + janela “Mais informações”. */
export function SeriesPage({ id }: { id: string }) {
  const s = getSeries(id);
  if (!s || s.status !== 'disponivel') {
    return <NotFound message={s ? `A série “${s.title}” ainda não está disponível — em breve.` : undefined} />;
  }
  return (
    <>
      <Home background />
      <SeriesModal id={id} />
    </>
  );
}

function SeriesModal({ id }: { id: string }) {
  const s = getSeries(id)!;
  const { state, visit } = useProgress();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [season, setSeason] = useState(s.seasons[0]?.number ?? 1);

  const close = () => {
    location.hash = href.home();
  };

  useEffect(() => {
    document.title = `${s.title} — MAPD-Flix`;
    visit('series', s.id);
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [s, visit]);

  const eps = episodesOf(s.id);
  const pct = completion(state, eps.map((e) => e.id));
  const doneCount = eps.filter((e) => state.episodes[e.id]).length;
  const nextEp = eps.find((e) => !state.episodes[e.id]) ?? eps[0];
  const quiz = s.quizId ? getQuiz(s.quizId) : undefined;
  const cc = s.caseId ? getCase(s.caseId) : undefined;
  const video = s.videoId ? videoById.get(s.videoId) : undefined;
  const art = seriesArt[s.id];
  const others = allSeries.filter((x) => x.id !== s.id && x.status === 'disponivel');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70" onClick={close} data-testid="series-modal">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-serie"
        className="relative mx-auto my-0 w-full max-w-[880px] overflow-hidden bg-panel shadow-2xl outline-none animate-fade-up sm:my-8 sm:rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* cabeçalho com imagem */}
        <div className="relative aspect-[16/10] w-full sm:aspect-video">
          <Photo photo={art.billboard} className="absolute inset-0 h-full w-full" eager />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent" />
          <button type="button" onClick={close} className="icon-btn absolute right-3 top-3 z-10 h-10 w-10 border-0 bg-panel" aria-label="Fechar" data-testid="fechar-modal">
            <Icon name="x" className="h-6 w-6" />
          </button>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-12 sm:pb-10">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-white/85">
              <span className="font-title text-xl tracking-wider text-brand">MAPD</span> Série
            </div>
            <h1 id="titulo-serie" className="font-title text-[clamp(3rem,11vw,6rem)] leading-[0.9] tracking-wide text-white drop-shadow-lg [overflow-wrap:anywhere]">
              {s.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a href={href.episode(nextEp.id)} className="btn btn-primary" data-testid="assistir-episodio">
                <Icon name="play" className="h-6 w-6" /> {doneCount === 0 ? 'Assistir' : `Continuar: Ep. ${nextEp.number}`}
              </a>
              <ListButton itemKey={`series:${s.id}`} label={s.title} size="lg" />
              <RateButton itemKey={`series:${s.id}`} label={s.title} size="lg" />
            </div>
          </div>
        </div>

        {/* metadados */}
        <div className="grid gap-6 px-5 pb-6 sm:grid-cols-[2fr_1fr] sm:px-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-ok">{doneCount}/{eps.length} concluídos</span>
              <span className="text-soft">{eps.length} episódios</span>
              <span className="rounded-sm border border-white/40 px-1.5 text-[11px] text-soft">MED</span>
              <span className="text-soft">{eps.reduce((a, e) => a + e.durationMinutes, 0)} min</span>
            </div>
            <div className="mt-2 h-[3px] w-full max-w-sm bg-white/20" role="progressbar" aria-label={`Progresso em ${s.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct * 100)}>
              <div className="h-full bg-brand" style={{ width: `${pct * 100}%` }} />
            </div>
            <p className="mt-4 text-soft">{s.synopsis}</p>
          </div>
          <dl className="space-y-2 text-sm">
            <div><dt className="inline text-mute">Autor: </dt><dd className="inline text-soft">{professor.name}</dd></div>
            <div><dt className="inline text-mute">Gêneros: </dt><dd className="inline text-soft">Imunologia clínica, Patologia, Raciocínio clínico</dd></div>
            <div><dt className="inline text-mute">Esta série é: </dt><dd className="inline text-soft">Interativa, baseada em casos, contextualizada no SUS</dd></div>
          </dl>
        </div>

        {/* episódios */}
        <section aria-labelledby="episodios" className="px-5 pb-8 sm:px-12">
          <div className="flex items-center justify-between gap-4">
            <h2 id="episodios" className="text-2xl font-bold text-white">Episódios</h2>
            <label className="sr-only" htmlFor="temporada">Temporada</label>
            <select id="temporada" value={season} onChange={(e: { target: { value: string } }) => setSeason(Number(e.target.value))} className="rounded border border-white/40 bg-[#242424] px-3 py-2 text-sm font-bold text-white">
              {s.seasons.map((x) => (
                <option key={x.number} value={x.number}>Temporada {x.number}</option>
              ))}
            </select>
          </div>
          <p className="mt-1 text-sm text-mute">{s.seasons.find((x) => x.number === season)?.title}</p>
          <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {eps.map((e) => {
              const done = !!state.episodes[e.id];
              const read = done ? 1 : state.reading[e.id] ?? 0;
              return (
                <li key={e.id}>
                  <a href={href.episode(e.id)} className="group flex items-center gap-3 rounded px-2 py-4 hover:bg-[#333] sm:gap-5 sm:px-4" data-episode-row={e.id}>
                    <span className="hidden w-6 shrink-0 text-center text-2xl text-mute sm:block">{e.number}</span>
                    <span className="relative block aspect-video w-32 shrink-0 overflow-hidden rounded-[4px] sm:w-40">
                      <Photo photo={photoFor(e.id)} className="h-full w-full" decorative />
                      <span className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-black/50"><Icon name="play" className="h-5 w-5" /></span>
                      </span>
                      {read > 0 && (
                        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/30"><span className="block h-full bg-brand" style={{ width: `${read * 100}%` }} /></span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-bold text-white"><span className="sm:hidden">{e.number}. </span>{e.title}</span>
                        <span className="shrink-0 text-sm text-soft">{e.durationMinutes} min</span>
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm text-mute">{e.tagline}</span>
                      {done && <span className="mt-1 inline-block text-xs font-bold text-ok">✓ Concluído</span>}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </section>

        {/* especiais */}
        <section aria-labelledby="especiais" className="px-5 pb-8 sm:px-12">
          <h2 id="especiais" className="text-2xl font-bold text-white">Especiais desta série</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cc && (
              <a href={href.case(cc.id)} className="group overflow-hidden rounded bg-[#2f2f2f] hover:bg-[#3a3a3a]" data-case-card={cc.id}>
                <span className="relative block aspect-video">
                  <Photo photo={photoFor(cc.id)} className="h-full w-full" decorative />
                  <span className="absolute left-2 top-2 rounded-sm bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">CASO CLÍNICO</span>
                </span>
                <span className="block p-3">
                  <span className="block font-bold text-white">{cc.title.replace(/^Caso Clínico [A-C] — /, '')}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-mute">{cc.hook}</span>
                </span>
              </a>
            )}
            {quiz && (
              <a href={href.quiz(quiz.id)} className="group overflow-hidden rounded bg-[#2f2f2f] hover:bg-[#3a3a3a]" data-quiz-card={quiz.id}>
                <span className="relative block aspect-video">
                  <Photo photo={photoFor(quiz.id)} className="h-full w-full" decorative />
                  <span className="absolute left-2 top-2 rounded-sm bg-white px-1.5 py-0.5 text-[10px] font-bold text-black">DESAFIO CLÍNICO</span>
                </span>
                <span className="block p-3">
                  <span className="block font-bold text-white">{quiz.title}</span>
                  <span className="mt-1 block text-sm text-mute">{quiz.questions.length} questões · feedback imediato</span>
                </span>
              </a>
            )}
          </div>
        </section>

        <section aria-labelledby="video-serie" className="px-5 pb-8 sm:px-12">
          <h2 id="video-serie" className="mb-3 text-2xl font-bold text-white">Vídeo complementar</h2>
          <VideoCard video={video} topicFallback={s.title} />
        </section>

        {/* sobre */}
        <section aria-labelledby="sobre-serie" className="border-t border-white/10 px-5 py-8 sm:px-12">
          <h2 id="sobre-serie" className="text-2xl font-bold text-white">
            Sobre <span className="font-normal">{s.title}</span>
          </h2>
          <h3 className="mt-4 font-bold text-white">Objetivos de aprendizagem</h3>
          <ul className="mt-2 space-y-1.5 text-[0.95rem] text-soft">
            {s.learningObjectives.map((o) => (
              <li key={o} className="flex gap-2"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-ok" /> {o}</li>
            ))}
          </ul>
          <h3 className="mt-5 font-bold text-white">Competências (DCN/Abem)</h3>
          <ul className="mt-2 space-y-1 text-sm text-soft">
            {s.competencies.map((c) => <li key={c}>• {c}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-ghost text-sm" href={href.printSeries(s.id, 'resumo')}><Icon name="print" className="h-5 w-5" /> Imprimir resumo</a>
            <a className="btn btn-ghost text-sm" href={href.printSeries(s.id, 'completo')}><Icon name="print" className="h-5 w-5" /> Imprimir conteúdo completo</a>
          </div>
          <div className="mt-6">
            <References citations={s.citations} />
          </div>
        </section>

        {/* semelhantes */}
        <section aria-labelledby="semelhantes" className="px-5 pb-10 sm:px-12">
          <h2 id="semelhantes" className="text-2xl font-bold text-white">Títulos semelhantes</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {others.map((o) => (
              <a key={o.id} href={href.series(o.id)} className="overflow-hidden rounded bg-[#2f2f2f] hover:bg-[#3a3a3a]">
                <span className="relative block aspect-video">
                  <Photo photo={seriesArt[o.id].billboard} className="h-full w-full" decorative />
                  <span className="absolute bottom-2 left-2 font-title text-3xl leading-none text-white drop-shadow">{o.title}</span>
                </span>
                <span className="block p-3 text-sm text-mute">{o.tagline}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
