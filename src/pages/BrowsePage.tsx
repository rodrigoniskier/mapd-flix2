import { useEffect } from 'react';
import { allCases, allQuizzes, availableSeries, comingSoonSeries, episodesOf } from '../data/catalog.ts';
import { CaseCard, EpisodeCard, QuizCard, Rail, SeriesCard } from '../components/Cards.tsx';
import { useProgress } from '../lib/store.tsx';
import { ListItemCard } from './Home.tsx';

const TITLES = { series: 'Séries', casos: 'Casos clínicos', desafios: 'Desafios clínicos' } as const;

export function BrowsePage({ kind }: { kind: 'series' | 'casos' | 'desafios' }) {
  useEffect(() => {
    document.title = `${TITLES[kind]} — MAPD-Flix`;
  }, [kind]);
  return (
    <div className="pb-10 pt-24">
      <div className="container-page mb-4">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{TITLES[kind]}</h1>
      </div>
      {kind === 'series' && (
        <>
          <Rail title="Disponíveis" id="series-disponiveis">
            {availableSeries().map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </Rail>
          {availableSeries().map((s) => (
            <Rail key={s.id} title={s.title} id={`navegar-${s.id}`}>
              {episodesOf(s.id).map((e) => (
                <EpisodeCard key={e.id} episode={e} />
              ))}
            </Rail>
          ))}
          <Rail title="Em breve" id="series-em-breve">
            {comingSoonSeries().map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </Rail>
        </>
      )}
      {kind === 'casos' && (
        <Rail title="Episódios especiais com revelação progressiva" id="casos-lista">
          {allCases.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </Rail>
      )}
      {kind === 'desafios' && (
        <Rail title="Filmes especiais" id="desafios-lista">
          {allQuizzes.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </Rail>
      )}
    </div>
  );
}

export function MyListPage() {
  const { state } = useProgress();
  useEffect(() => {
    document.title = 'Minha lista — MAPD-Flix';
  }, []);
  return (
    <div className="container-page pb-10 pt-24">
      <h1 className="text-3xl font-bold text-white md:text-4xl">Minha lista</h1>
      {state.myList.length === 0 ? (
        <p className="mt-6 max-w-xl text-soft" data-testid="lista-vazia">
          Sua lista está vazia. Use o botão <strong className="text-white">+</strong> nos cartões ou na janela de uma série para guardar episódios, casos e desafios para depois.
        </p>
      ) : (
        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-6" role="list" data-testid="minha-lista">
          {state.myList.map((k) => (
            <ListItemCard key={k} itemKey={k} />
          ))}
        </ul>
      )}
    </div>
  );
}
