/**
 * Roteamento por hash (#/...). Funciona em hospedagem estática (Vercel,
 * GitHub Pages, Artifact) sem configuração de servidor.
 */
export type Route =
  | { name: 'home' }
  | { name: 'series'; id: string }
  | { name: 'episode'; id: string }
  | { name: 'case'; id: string }
  | { name: 'quiz'; id: string }
  | { name: 'search'; q: string }
  | { name: 'about' }
  | { name: 'my-list' }
  | { name: 'browse'; kind: 'series' | 'casos' | 'desafios' }
  | { name: 'print-episode'; id: string }
  | { name: 'print-series'; id: string; mode: 'resumo' | 'completo' }
  | { name: 'print-quiz'; id: string; answers: boolean }
  | { name: 'print-result'; id: string }
  | { name: 'not-found'; path: string };

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart = ''] = raw.split('?');
  const params = new URLSearchParams(queryPart);
  const seg = pathPart.split('/').filter(Boolean).map(decodeURIComponent);

  if (seg.length === 0) return { name: 'home' };
  const [a, b, c] = seg;
  switch (a) {
    case 'serie':
      if (b && seg.length === 2) return { name: 'series', id: b };
      break;
    case 'episodio':
      if (b && seg.length === 2) return { name: 'episode', id: b };
      break;
    case 'caso':
      if (b && seg.length === 2) return { name: 'case', id: b };
      break;
    case 'quiz':
      if (b && seg.length === 2) return { name: 'quiz', id: b };
      break;
    case 'busca':
      if (seg.length === 1) return { name: 'search', q: params.get('q') ?? '' };
      break;
    case 'sobre':
      if (seg.length === 1) return { name: 'about' };
      break;
    case 'minha-lista':
      if (seg.length === 1) return { name: 'my-list' };
      break;
    case 'navegar':
      if (b === 'series' || b === 'casos' || b === 'desafios') return { name: 'browse', kind: b };
      break;
    case 'imprimir':
      if (b === 'episodio' && c) return { name: 'print-episode', id: c };
      if (b === 'serie' && c) return { name: 'print-series', id: c, mode: seg[3] === 'completo' ? 'completo' : 'resumo' };
      if (b === 'quiz' && c) return { name: 'print-quiz', id: c, answers: params.get('gabarito') === '1' };
      if (b === 'resultado' && c) return { name: 'print-result', id: c };
      break;
  }
  return { name: 'not-found', path: raw };
}

export const href = {
  home: () => '#/',
  series: (id: string) => `#/serie/${id}`,
  episode: (id: string) => `#/episodio/${id}`,
  case: (id: string) => `#/caso/${id}`,
  quiz: (id: string) => `#/quiz/${id}`,
  search: (q = '') => (q ? `#/busca?q=${encodeURIComponent(q)}` : '#/busca'),
  about: () => '#/sobre',
  myList: () => '#/minha-lista',
  browse: (kind: 'series' | 'casos' | 'desafios') => `#/navegar/${kind}`,
  printEpisode: (id: string) => `#/imprimir/episodio/${id}`,
  printSeries: (id: string, mode: 'resumo' | 'completo') => `#/imprimir/serie/${id}/${mode}`,
  printQuiz: (id: string, answers: boolean) => `#/imprimir/quiz/${id}${answers ? '?gabarito=1' : ''}`,
  printResult: (id: string) => `#/imprimir/resultado/${id}`,
};
