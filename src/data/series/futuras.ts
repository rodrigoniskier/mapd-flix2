import type { Series } from '../../domain/types.ts';

/**
 * Séries futuras. Para ativar uma delas:
 *  1. altere `status` para 'disponivel';
 *  2. crie o arquivo de episódios (mesmo formato de `autoimunidade.ts`);
 *  3. preencha `seasons[].episodeIds`, `synopsis` e `learningObjectives`;
 *  4. registre os episódios em `src/data/catalog.ts`.
 * Nenhum componente precisa ser alterado.
 */
export const futureSeries: Series[] = [
  {
    id: 'imunidade-antitumoral',
    slug: 'imunidade-antitumoral',
    order: 4,
    status: 'em-breve',
    title: 'Imunidade Antitumoral',
    shortTitle: 'Antitumoral',
    tagline: 'Vigilância, escape e imunoterapia.',
    synopsis: '',
    learningObjectives: [],
    theme: { from: '#111827', via: '#4c1d95', to: '#db2777', accent: '#f472b6', motif: 'tumor' },
    seasons: [],
    citations: [],
    competencies: [],
  },
  {
    id: 'imunidade-transplantes',
    slug: 'imunidade-transplantes',
    order: 5,
    status: 'em-breve',
    title: 'Imunidade nos Transplantes',
    shortTitle: 'Transplantes',
    tagline: 'HLA, aloreconhecimento e rejeição.',
    synopsis: '',
    learningObjectives: [],
    theme: { from: '#0c1a2b', via: '#1e3a8a', to: '#0ea5e9', accent: '#7dd3fc', motif: 'transplante' },
    seasons: [],
    citations: [],
    competencies: [],
  },
];
