import type { ClinicalCase, Episode, Quiz, Series } from '../domain/types.ts';
import { autoimunidadeEpisodes, autoimunidadeSeries } from './series/autoimunidade.ts';
import { imunodeficienciasEpisodes, imunodeficienciasSeries } from './series/imunodeficiencias.ts';
import { hipersensibilidadesEpisodes, hipersensibilidadesSeries } from './series/hipersensibilidades.ts';
import { futureSeries } from './series/futuras.ts';
import { casoA } from './cases/caso-a.ts';
import { casoB } from './cases/caso-b.ts';
import { casoC } from './cases/caso-c.ts';
import { quizAutoimunidade } from './quizzes/quiz-autoimunidade.ts';
import { quizImunodeficiencias } from './quizzes/quiz-imunodeficiencias.ts';
import { quizHipersensibilidades } from './quizzes/quiz-hipersensibilidades.ts';

/** Registro único do catálogo. Para incluir conteúdo, edite apenas este arquivo e os dados. */
export const allSeries: Series[] = [
  autoimunidadeSeries,
  imunodeficienciasSeries,
  hipersensibilidadesSeries,
  ...futureSeries,
].sort((a, b) => a.order - b.order);

export const allEpisodes: Episode[] = [
  ...autoimunidadeEpisodes,
  ...imunodeficienciasEpisodes,
  ...hipersensibilidadesEpisodes,
];

export const allCases: ClinicalCase[] = [casoA, casoB, casoC];

export const allQuizzes: Quiz[] = [quizAutoimunidade, quizImunodeficiencias, quizHipersensibilidades];

/* ---------------- consultas ---------------- */

const seriesMap = new Map(allSeries.map((s) => [s.id, s]));
const episodeMap = new Map(allEpisodes.map((e) => [e.id, e]));
const caseMap = new Map(allCases.map((c) => [c.id, c]));
const quizMap = new Map(allQuizzes.map((q) => [q.id, q]));

export const getSeries = (id: string) => seriesMap.get(id);
export const getEpisode = (id: string) => episodeMap.get(id);
export const getCase = (id: string) => caseMap.get(id);
export const getQuiz = (id: string) => quizMap.get(id);

export const availableSeries = () => allSeries.filter((s) => s.status === 'disponivel');
export const comingSoonSeries = () => allSeries.filter((s) => s.status === 'em-breve');

/** Episódios de uma série na ordem das temporadas. */
export function episodesOf(seriesId: string): Episode[] {
  const s = seriesMap.get(seriesId);
  if (!s) return [];
  return s.seasons.flatMap((season) => season.episodeIds.map((id) => episodeMap.get(id)).filter((e): e is Episode => !!e));
}

/** Vizinhos (anterior/próximo) dentro da série. */
export function neighbors(episodeId: string): { prev?: Episode; next?: Episode } {
  const ep = episodeMap.get(episodeId);
  if (!ep) return {};
  const list = episodesOf(ep.seriesId);
  const i = list.findIndex((e) => e.id === episodeId);
  return { prev: list[i - 1], next: list[i + 1] };
}
