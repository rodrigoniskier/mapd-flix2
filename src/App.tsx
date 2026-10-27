import { useEffect, useRef } from 'react';
import { Footer, Header, Page } from './components/Layout.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { CasePage } from './pages/CasePage.tsx';
import { EpisodePage } from './pages/EpisodePage.tsx';
import { Home } from './pages/Home.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { PrintEpisode, PrintQuiz, PrintResult, PrintSeries } from './pages/PrintPages.tsx';
import { QuizPage } from './pages/QuizPage.tsx';
import { SearchPage } from './pages/SearchPage.tsx';
import { SeriesPage } from './pages/SeriesPage.tsx';
import { ProgressProvider, useRoute } from './lib/store.tsx';
import type { Route } from './lib/router.ts';

function routeKey(r: Route): string {
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
    default:
      return <NotFound />;
  }
}

function Shell() {
  const route = useRoute();
  const key = routeKey(route);
  const first = useRef(true);
  useEffect(() => {
    scrollTo({ top: 0 });
    // Em navegações internas, leva o foco ao conteúdo (leitores de tela anunciam a nova página).
    // No carregamento inicial, o foco permanece no início do documento (link "Pular para o conteúdo").
    if (first.current) first.current = false;
    else document.getElementById('conteudo')?.focus({ preventScroll: true });
  }, [key]);

  if (route.name === 'print-episode') return <PrintEpisode id={route.id} />;
  if (route.name === 'print-series') return <PrintSeries id={route.id} mode={route.mode} />;
  if (route.name === 'print-quiz') return <PrintQuiz id={route.id} answers={route.answers} />;
  if (route.name === 'print-result') return <PrintResult id={route.id} />;

  return (
    <>
      <Header />
      <Page>
        <Screen key={key} route={route} />
      </Page>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <ProgressProvider>
      <Shell />
    </ProgressProvider>
  );
}
