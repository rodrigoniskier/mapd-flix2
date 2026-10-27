import { useCallback, useEffect, useRef, useState } from 'react';
import { Footer, Header, Page } from './components/Layout.tsx';
import { Intro } from './components/Intro.tsx';
import { ProfessorModal, ProfileGate } from './components/Profiles.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { BrowsePage, MyListPage } from './pages/BrowsePage.tsx';
import { CasePage } from './pages/CasePage.tsx';
import { EpisodePage } from './pages/EpisodePage.tsx';
import { Home } from './pages/Home.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { PrintEpisode, PrintQuiz, PrintResult, PrintSeries } from './pages/PrintPages.tsx';
import { QuizPage } from './pages/QuizPage.tsx';
import { SearchPage } from './pages/SearchPage.tsx';
import { SeriesPage } from './pages/SeriesPage.tsx';
import { ProfileProvider, ProgressProvider, useProfiles, useRoute } from './lib/store.tsx';
import type { Route } from './lib/router.ts';

function routeKey(r: Route): string {
  // A janela da série abre sobre o catálogo: não reinicia a rolagem.
  return JSON.stringify(r);
}

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case 'home':
      return <Home />;
    case 'series':
      return <SeriesPage id={route.id} />;
    case 'episode':
      return <EpisodePage id={route.id} />;
    case 'case':
      return <CasePage id={route.id} />;
    case 'quiz':
      return <QuizPage id={route.id} />;
    case 'search':
      return <SearchPage q={route.q} />;
    case 'about':
      return <AboutPage />;
    case 'my-list':
      return <MyListPage />;
    case 'browse':
      return <BrowsePage kind={route.kind} />;
    default:
      return <NotFound />;
  }
}

function Shell() {
  const route = useRoute();
  const key = routeKey(route);
  const first = useRef(true);
  const prev = useRef<Route>(route);
  const [showProfessor, setShowProfessor] = useState(false);

  useEffect(() => {
    const isCatalog = (r: Route) => r.name === 'home' || r.name === 'series';
    // Abrir/fechar a janela de uma série não mexe na rolagem do catálogo.
    if (!(isCatalog(prev.current) && isCatalog(route))) scrollTo({ top: 0 });
    prev.current = route;
    // Em navegações internas, leva o foco ao conteúdo (leitores de tela anunciam a nova página).
    if (first.current) first.current = false;
    else if (route.name !== 'series') document.getElementById('conteudo')?.focus({ preventScroll: true });
  }, [key]);

  if (route.name === 'print-episode') return <PrintEpisode id={route.id} />;
  if (route.name === 'print-series') return <PrintSeries id={route.id} mode={route.mode} />;
  if (route.name === 'print-quiz') return <PrintQuiz id={route.id} answers={route.answers} />;
  if (route.name === 'print-result') return <PrintResult id={route.id} />;

  const homeLike = route.name === 'home' || route.name === 'series';
  return (
    <>
      <Header route={route} onProfessor={() => setShowProfessor(true)} />
      <Page>
        <Screen key={homeLike ? 'home' : key} route={route} />
      </Page>
      <Footer onProfessor={() => setShowProfessor(true)} />
      {showProfessor && <ProfessorModal onClose={() => setShowProfessor(false)} />}
    </>
  );
}

function Gate() {
  const { active, introSeen, markIntroSeen, store } = useProfiles();
  const done = useCallback(() => markIntroSeen(), [markIntroSeen]);
  if (!active) return <ProfileGate />;
  if (!introSeen) return <Intro onDone={done} />;
  return (
    <ProgressProvider key={active.id} profileId={active.id} store={store}>
      <Shell />
    </ProgressProvider>
  );
}

export function App() {
  return (
    <ProfileProvider>
      <Gate />
    </ProfileProvider>
  );
}
